/*!
 * Connected Timeline 2.0 — transit-map style
 * Lines are eras or threads; stations are the points on them; dashed links join points across lines.
 *
 * Usage (see README.md):
 *   <link rel="stylesheet" href="timeline/timeline.css">
 *   <div data-timeline></div>
 *   <script src="timeline/timeline-data.js"></script>
 *   <script src="timeline/timeline.js"></script>
 *
 * Optional attributes on the <div>: data-height="800", data-theme="night|paper"
 * Picture paths in the data are relative to the folder this script lives in.
 */
(function (global) {
  'use strict';

  var cs = document.currentScript;
  var SCRIPT_BASE = cs && cs.src ? cs.src.replace(/[?#].*$/, '').replace(/[^\/]*$/, '') : '';

  var COLORS = {
    red: '#e8322e', orange: '#f5a623', gold: '#c9a83a', yellow: '#f5cc12', green: '#27b04a', teal: '#19a7b8',
    sky: '#5bb4ea', blue: '#2f5fd0', violet: '#8b6ee8', magenta: '#e0569b', white: '#f2f2f2', gray: '#8a8c94',
    ink: '#8a8c94', aqua: '#19a7b8'
  };
  var PALETTE = ['red', 'orange', 'gold', 'yellow', 'green', 'teal', 'sky', 'blue', 'violet', 'magenta', 'white', 'gray'];
  var DASH = { solid: '', dashed: '8 7', dotted: '0.5 7', dashdot: '10 5 0.5 5' };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Map geometry (world units = pixels at 100% zoom)
  var X0 = 70, R_T = 40, TRACK = 116, ABOVE = 88, BELOW = 58, GAP = 30, R_ST = 11;

  var ICON = {
    search: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 14 14"/></svg>',
    plus: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>',
    minus: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10"/></svg>',
    fit: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="3.5" width="11" height="9" rx="1.5"/><path d="M5.5 8h5"/></svg>',
    full: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"/></svg>',
    close: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
    left: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>',
    right: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>',
    out: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M9 3h4v4M13 3 7 9M11 9.5V13H3V5h3.5"/></svg>'
  };

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function r1(v) { return Math.round(v * 10) / 10; }
  function hex(c) {
    if (c && COLORS[c]) return COLORS[c];
    if (c && /^#[0-9a-f]{6}$/i.test(c)) return c;
    if (c && /^#[0-9a-f]{3}$/i.test(c)) return '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
    return COLORS.gray;
  }
  function onColor(c) {
    var h = hex(c), r = parseInt(h.substr(1, 2), 16) / 255, g = parseInt(h.substr(3, 2), 16) / 255, b = parseInt(h.substr(5, 2), 16) / 255;
    var lin = function (v) { return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) > 0.4 ? '#10131c' : '#ffffff';
  }
  function reducedMotion() { return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function safeUrl(u) {
    u = String(u || '').trim();
    return /^(https?:|mailto:)/i.test(u) || !/^[a-z][a-z0-9+.-]*:/i.test(u) ? u : '#';
  }
  // Wrap text into at most maxLines lines of roughly maxChars characters.
  function wrap(text, maxChars, maxLines) {
    var words = String(text || '').split(/\s+/).filter(Boolean), lines = [], cur = '';
    words.forEach(function (w) {
      if (!cur) cur = w;
      else if ((cur + ' ' + w).length <= maxChars) cur += ' ' + w;
      else { lines.push(cur); cur = w; }
    });
    if (cur) lines.push(cur);
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
    }
    return lines.map(function (l) { return l.length > maxChars + 2 ? l.slice(0, maxChars) + '…' : l; });
  }
  function kindSample(t) {
    var c = hex(t.color), dash = DASH[t.style || 'dashed'];
    return '<svg viewBox="0 0 26 10" aria-hidden="true"><line x1="1" y1="5" x2="' + (t.directed === false ? 25 : 19) + '" y2="5" stroke="' + c +
      '" stroke-width="2.4" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + (t.style === 'dotted' ? '0.5 5' : '5 4') + '"' : '') + '/>' +
      (t.directed === false ? '' : '<path d="M25,5L18,1.5L18,8.5Z" fill="' + c + '"/>') + '</svg>';
  }

  // ---------- dates ----------
  // "1804", "1945-06", "1948-06-21"; negative years are BCE. Any year number works, so invented calendars are fine too.
  function parseDate(v) {
    if (v == null || v === '') return null;
    if (typeof v === 'number') return isFinite(v) ? { y: Math.trunc(v), m: 0, d: 0 } : null;
    var m = String(v).trim().match(/^(-?\d{1,7})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/);
    if (!m) return null;
    var mo = m[2] ? clamp(parseInt(m[2], 10), 1, 12) : 0;
    return { y: parseInt(m[1], 10), m: mo, d: m[3] && mo ? clamp(parseInt(m[3], 10), 1, 31) : 0 };
  }
  function dateToString(p) {
    if (!p) return '';
    var s = String(p.y);
    if (p.m) s += '-' + String(p.m).padStart(2, '0');
    if (p.m && p.d) s += '-' + String(p.d).padStart(2, '0');
    return s;
  }
  function dateValue(p) { return p ? p.y + (p.m ? (p.m - 1 + (p.d ? (p.d - 1) / 31 : 0)) / 12 : 0) : NaN; }
  function fmtYear(y) { return y < 0 ? (-y) + ' BCE' : String(y); }
  function formatDate(p, long) {
    if (!p) return '';
    var Y = fmtYear(p.y);
    if (!p.m) return Y;
    var M = (long ? MONTHS_LONG : MONTHS)[p.m - 1];
    return p.d ? p.d + ' ' + M + ' ' + Y : M + ' ' + Y;
  }
  function pointDate(p, long) {
    if (p.dateLabel) return p.dateLabel;
    if (!p._start) return '';
    var s = formatDate(p._start, long);
    if (p._end) s += ' – ' + formatDate(p._end, long);
    return (p.circa ? 'c. ' : '') + s;
  }

  // ---------- data ----------
  function normalize(raw) {
    var src = raw && typeof raw === 'object' ? raw : {};
    var data = {
      settings: Object.assign({ title: '', subtitle: '', view: 'map', showTitle: true, spacing: 210, theme: 'night' }, src.settings || {}),
      lines: [], types: [], points: [], connections: []
    };
    var rawLines = Array.isArray(src.lines) ? src.lines : Array.isArray(src.lanes) ? src.lanes : [];
    rawLines.forEach(function (l) {
      if (!l || !l.id) return;
      data.lines.push(Object.assign({}, l, {
        label: l.label || String(l.name || l.id).split(/\s+/).map(function (w) { return w[0]; }).join('').toUpperCase().slice(0, 4),
        _color: hex(l.color), continues: l.continues !== false
      }));
    });
    if (!data.lines.length) data.lines.push({ id: 'main', label: 'A', name: 'Timeline', color: 'blue', _color: hex('blue'), continues: true });
    data.types = (Array.isArray(src.types) ? src.types : []).filter(function (t) { return t && t.id; });
    if (!data.types.length) data.types.push({ id: 'related', name: 'Related to', color: 'white', style: 'dashed', directed: false });
    data.lineById = new Map(data.lines.map(function (l) { return [l.id, l]; }));
    data.typeById = new Map(data.types.map(function (t) { return [t.id, t]; }));
    data.byId = new Map();
    var lastT = {};
    (Array.isArray(src.points) ? src.points : []).forEach(function (p, idx) {
      if (!p || !p.id || data.byId.has(p.id)) return;
      var q = Object.assign({}, p);
      q._line = data.lineById.has(p.line || p.lane) ? (p.line || p.lane) : data.lines[0].id;
      q._start = parseDate(p.date);
      var end = parseDate(p.end);
      q._end = end && q._start && dateValue(end) >= dateValue(q._start) ? end : null;
      q._t = q._start ? dateValue(q._start) : (lastT[q._line] != null ? lastT[q._line] : -Infinity);
      lastT[q._line] = q._t;
      q._idx = idx;
      q._track = clamp(parseInt(p.track, 10) || 0, -3, 3);
      q.images = (Array.isArray(p.images) ? p.images : []).filter(function (i) { return i && i.src; });
      q.links = (Array.isArray(p.links) ? p.links : []).filter(function (l) { return l && l.url; });
      q.tags = Array.isArray(p.tags) ? p.tags.filter(Boolean) : [];
      data.points.push(q);
      data.byId.set(q.id, q);
    });
    data.points.sort(function (a, b) { return a._t - b._t || a._idx - b._idx; });
    (Array.isArray(src.connections) ? src.connections : []).forEach(function (c, i) {
      if (!c || c.from === c.to || !data.byId.has(c.from) || !data.byId.has(c.to)) return;
      data.connections.push(Object.assign({}, c, { id: c.id || 'c' + i, _type: data.typeById.has(c.type) ? c.type : data.types[0].id }));
    });
    return data;
  }

  function matches(p, line, q) {
    if (!q) return false;
    var hay = [p.title, p.summary, p.caption, p.description, pointDate(p, true), line && line.name, line && line.label, (p.tags || []).join(' ')]
      .join(' \u0001 ').toLowerCase();
    return q.split(/\s+/).every(function (w) { return !w || hay.indexOf(w) >= 0; });
  }

  // Rounded orthogonal path through a list of [x, y] points (transit-map corners).
  function roundedPath(pts, r) {
    var d = 'M' + r1(pts[0][0]) + ',' + r1(pts[0][1]);
    for (var i = 1; i < pts.length - 1; i++) {
      var p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
      var l1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), l2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
      var rr = Math.min(r, l1 / 2, l2 / 2);
      if (!rr) { d += 'L' + r1(p1[0]) + ',' + r1(p1[1]); continue; }
      var a = [p1[0] + (p0[0] - p1[0]) * rr / l1, p1[1] + (p0[1] - p1[1]) * rr / l1];
      var b = [p1[0] + (p2[0] - p1[0]) * rr / l2, p1[1] + (p2[1] - p1[1]) * rr / l2];
      d += 'L' + r1(a[0]) + ',' + r1(a[1]) + 'Q' + r1(p1[0]) + ',' + r1(p1[1]) + ' ' + r1(b[0]) + ',' + r1(b[1]);
    }
    var last = pts[pts.length - 1];
    return d + 'L' + r1(last[0]) + ',' + r1(last[1]);
  }

  // Work out where every line, branch and station sits.
  function layout(data) {
    var s = data.settings, SP = clamp(parseInt(s.spacing, 10) || 210, 140, 420);
    var titleLines = s.showTitle !== false && s.title ? wrap(s.title, 18, 2) : [];
    var top = titleLines.length ? 40 + titleLines.length * 70 + (s.subtitle ? 44 : 0) : 20;
    var pos = new Map(), lines = [], y = top, right = 0;
    data.lines.forEach(function (line) {
      var pts = data.points.filter(function (p) { return p._line === line.id; });
      var startCol = 0, startPt = line.start && pos.get(line.start);
      if (startPt) startCol = startPt.col;
      var minT = 0, maxT = 0;
      pts.forEach(function (p) { minT = Math.min(minT, p._track); maxT = Math.max(maxT, p._track); });
      var y0 = y + Math.max(ABOVE - minT * TRACK, R_T + 10) + (startPt ? 20 : 0);
      var tx = X0 + startCol * SP;
      pts.forEach(function (p, i) {
        var col = startCol + i + 1;
        pos.set(p.id, { x: X0 + col * SP, y: y0 + p._track * TRACK, y0: y0, col: col, line: line, p: p });
      });
      var rec = { line: line, x: tx, y: y0, pts: pts, start: startPt || null, SP: SP };
      lines.push(rec);
      y = y0 + maxT * TRACK + BELOW + GAP;
      var lastX = pts.length ? pos.get(pts[pts.length - 1].id).x : tx;
      right = Math.max(right, lastX + SP);
    });
    // Branches: consecutive stations on the same non-zero track leave the main line
    // at the station before them and rejoin at the next main-line station.
    lines.forEach(function (L) {
      L.branches = [];
      var pts = L.pts, i = 0;
      while (i < pts.length) {
        var t = pts[i]._track;
        if (!t) { i++; continue; }
        var j = i;
        while (j + 1 < pts.length && pts[j + 1]._track === t) j++;
        var prev = null, next = null, k;
        for (k = i - 1; k >= 0; k--) if (!pts[k]._track) { prev = pos.get(pts[k].id); break; }
        for (k = j + 1; k < pts.length; k++) if (!pts[k]._track) { next = pos.get(pts[k].id); break; }
        L.branches.push({ track: t, from: prev, to: next, first: pos.get(pts[i].id), last: pos.get(pts[j].id) });
        i = j + 1;
      }
      var mains = pts.filter(function (p) { return !p._track; });
      L.lastMainX = mains.length ? pos.get(mains[mains.length - 1].id).x : L.x;
    });
    var width = Math.max(right + 40, 700);
    lines.forEach(function (L) { L.endX = L.line.continues ? width : L.lastMainX; });
    return { pos: pos, lines: lines, width: width, height: y + 10, top: top, titleLines: titleLines, SP: SP };
  }

  function arrowPath(tip, from, size) {
    var dx = tip[0] - from[0], dy = tip[1] - from[1], len = Math.hypot(dx, dy) || 1, s = size || 11;
    dx /= len; dy /= len;
    var bx = tip[0] - dx * s, by = tip[1] - dy * s, nx = -dy * s * 0.5, ny = dx * s * 0.5;
    return 'M' + r1(tip[0]) + ',' + r1(tip[1]) + 'L' + r1(bx + nx) + ',' + r1(by + ny) + 'L' + r1(bx - nx) + ',' + r1(by - ny) + 'Z';
  }

  function textLines(lines, x, yLast, lh, attrs) {
    var y0 = yLast - (lines.length - 1) * lh;
    return '<text ' + attrs + '>' + lines.map(function (l, i) {
      return '<tspan x="' + r1(x) + '" y="' + r1(y0 + i * lh) + '">' + esc(l) + '</tspan>';
    }).join('') + '</text>';
  }

  // Build the SVG markup for the whole map.
  function drawMap(data, L, img) {
    var s = data.settings, SP = L.SP, out = [];
    // Title
    if (L.titleLines.length) {
      out.push(textLines(L.titleLines, X0 - 36, 30 + L.titleLines.length * 70 - 12, 70, 'class="ctl-maptitle" font-size="68"'));
      if (s.subtitle) out.push(textLines(wrap(s.subtitle, 90, 2).slice(0, 1), X0 - 34, 30 + L.titleLines.length * 70 + 26, 20, 'class="ctl-mapsub" font-size="16"'));
    }
    // Where a line begins from a station on another line
    L.lines.forEach(function (R) {
      if (!R.start) return;
      out.push('<path class="ctl-startlink" stroke="' + R.line._color + '" d="M' + R.start.x + ',' + (R.start.y + R_ST + 4) + 'V' + (R.y - R_T - 4) + '"/>');
    });
    // Tracks: branches first, then the main line on top
    L.lines.forEach(function (R) {
      var c = R.line._color;
      R.branches.forEach(function (b) {
        var yt = R.y + b.track * TRACK, xa = b.from ? b.from.x : R.x;
        var pts = [[xa, R.y], [xa, yt]];
        if (b.to) pts.push([b.to.x, yt], [b.to.x, R.y]);
        else pts.push([b.last.x + SP * 0.6, yt]);
        out.push('<path class="ctl-track" stroke="' + c + '" d="' + roundedPath(pts, 24) + '"/>');
      });
      if (R.endX > R.x) out.push('<path class="ctl-track" stroke="' + c + '" d="M' + R.x + ',' + R.y + 'H' + r1(R.endX) + '"/>');
    });
    // Links between stations on different lines
    data.connections.forEach(function (c) {
      var a = L.pos.get(c.from), b = L.pos.get(c.to);
      if (!a || !b || a.line === b.line) return;
      var t = data.typeById.get(c._type), col = hex(t.color), dy = b.y - a.y, dx = b.x - a.x;
      var vertical = Math.abs(dy) > Math.abs(dx) * 0.35;
      var c1 = vertical ? [a.x, a.y + dy * 0.5] : [a.x + dx * 0.5, a.y], c2 = vertical ? [b.x, b.y - dy * 0.5] : [b.x - dx * 0.5, b.y];
      var off = function (p, q, d) { var l = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1; return [p[0] + (q[0] - p[0]) * d / l, p[1] + (q[1] - p[1]) * d / l]; };
      var A = off([a.x, a.y], c1, R_ST + 5), B = off([b.x, b.y], c2, R_ST + 5);
      var d = 'M' + r1(A[0]) + ',' + r1(A[1]) + 'C' + r1(c1[0]) + ',' + r1(c1[1]) + ' ' + r1(c2[0]) + ',' + r1(c2[1]) + ' ' + r1(B[0]) + ',' + r1(B[1]);
      var dash = DASH[t.style || 'dashed'];
      out.push('<g class="ctl-link" data-c="' + esc(c.id) + '" data-from="' + esc(c.from) + '" data-to="' + esc(c.to) + '">' +
        '<path class="ctl-link-hit" d="' + d + '"/>' +
        '<path class="ctl-link-line" d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.6" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
        (t.directed === false ? '' : '<path class="ctl-link-arrow" fill="' + col + '" d="' + arrowPath(B, c2) + '"/>') + '</g>');
    });
    // Line terminals
    L.lines.forEach(function (R) {
      var l = R.line, fg = onColor(l.color), label = String(l.label || '');
      var fs = label.length <= 4 ? 25 : label.length <= 6 ? 19 : 15;
      var name = wrap(l.name || '', 11, 2);
      out.push('<g class="ctl-term"><circle cx="' + R.x + '" cy="' + R.y + '" r="' + R_T + '" fill="' + l._color + '"/>' +
        '<text class="ctl-term-label" x="' + R.x + '" y="' + (R.y + (name.length ? -3 : fs / 3)) + '" text-anchor="middle" font-size="' + fs + '" fill="' + fg + '">' + esc(label) + '</text>' +
        (name.length ? textLines(name, R.x, R.y + (name.length > 1 ? 24 : 15), 11, 'class="ctl-term-name" text-anchor="middle" font-size="10" fill="' + fg + '"') : '') +
        '<title>' + esc(l.name || label) + '</title></g>');
    });
    // Stations
    L.pos.forEach(function (P, id) {
      var p = P.p, x = P.x, y = P.y, c = P.line._color, h = '';
      var pic = p.mapImage && p.images[0];
      if (pic) {
        h += '<image href="' + esc(img(pic.src)) + '" x="' + (x - 10) + '" y="' + (y - 84) + '" width="' + (SP - 24) + '" height="62" preserveAspectRatio="xMinYMax meet"/>';
      } else {
        h += textLines(wrap(p.title || 'Untitled', Math.floor((SP - 16) / 10), 3), x - 10, y - 24, 21, 'class="ctl-st-title" font-size="18"');
      }
      var date = pointDate(p).toUpperCase(), max = Math.floor((SP - 34) / 7.3);
      if (date) h += '<text class="ctl-st-date" x="' + (x + R_ST + 6) + '" y="' + (y + 3.6) + '" font-size="11.5" fill="' + c + '">' + esc(date.length > max ? date.slice(0, max - 1) + '…' : date) + ' »</text>';
      if (p.caption) h += textLines(wrap(p.caption, Math.floor((SP - 12) / 7.1), 2), x - 10, y + 31 + (wrap(p.caption, Math.floor((SP - 12) / 7.1), 2).length - 1) * 16, 16, 'class="ctl-st-cap" font-size="13.5" fill="' + c + '"');
      out.push('<g class="ctl-st" data-id="' + esc(id) + '" tabindex="0" role="button" aria-label="' + esc((p.title || 'Untitled') + (date ? ', ' + pointDate(p, true) : '')) + '" style="--c:' + c + '">' +
        '<rect class="ctl-hit" x="' + (x - 18) + '" y="' + (y - 90) + '" width="' + (SP - 10) + '" height="' + (p.caption ? 136 : 106) + '" rx="8"/>' + h +
        '<circle class="ctl-halo" cx="' + x + '" cy="' + y + '" r="' + (R_ST + 7) + '"/>' +
        '<circle class="ctl-ring" cx="' + x + '" cy="' + y + '" r="' + R_ST + '" stroke="' + c + '"/></g>');
    });
    return out.join('');
  }

  // =====================================================================
  function Timeline(root, data, opts) {
    this.root = root;
    this.opts = Object.assign({ panel: true, base: null, resolveImage: null, readHash: true, onSelect: null }, opts || {});
    this.v = { s: 1, tx: 0, ty: 0 };
    this.q = '';
    this.selected = null;
    this.pointers = new Map();
    this._build();
    this.setData(data, { fit: true });
    if (this.opts.readHash && global.location && location.hash.length > 1) {
      var id = decodeURIComponent(location.hash.slice(1));
      if (this.data.byId.has(id)) this.select(id);
    }
  }
  var P = Timeline.prototype;

  P._build = function () {
    var self = this, root = this.root, o = this.opts;
    root.classList.add('ctl');
    if (o.theme) root.setAttribute('data-theme', o.theme);
    if (o.height) this._setHeight(o.height);
    var coarse = global.matchMedia && global.matchMedia('(pointer: coarse)').matches;
    root.innerHTML =
      '<div class="ctl-stage">' +
        '<svg class="ctl-map" role="group" aria-label="Timeline map"><g class="ctl-world"></g></svg>' +
        '<div class="ctl-empty" hidden>This timeline has no points yet.</div>' +
        '<div class="ctl-list" hidden></div>' +
        '<div class="ctl-tools">' +
          '<label class="ctl-search">' + ICON.search + '<input type="search" placeholder="Search" aria-label="Search the timeline"></label>' +
          '<div class="ctl-seg" role="group" aria-label="View"><button type="button" data-view="map">Map</button><button type="button" data-view="list">List</button></div>' +
          '<button type="button" class="ctl-iconbtn" data-act="zoom-out" aria-label="Zoom out" title="Zoom out">' + ICON.minus + '</button>' +
          '<button type="button" class="ctl-iconbtn" data-act="zoom-in" aria-label="Zoom in" title="Zoom in">' + ICON.plus + '</button>' +
          '<button type="button" class="ctl-iconbtn" data-act="fit" aria-label="Show the whole map" title="Show the whole map">' + ICON.fit + '</button>' +
          '<button type="button" class="ctl-iconbtn" data-act="fullscreen" aria-label="Full screen" title="Full screen">' + ICON.full + '</button>' +
        '</div>' +
        '<div class="ctl-legend"></div>' +
        '<aside class="ctl-panel" aria-label="Details">' +
          '<button type="button" class="ctl-grab" data-act="grab" aria-label="Show more or less of the details"></button>' +
          '<div class="ctl-panel-top"><span class="ctl-linechip"></span><button type="button" class="ctl-iconbtn" data-act="close" aria-label="Close details">' + ICON.close + '</button></div>' +
          '<div class="ctl-panel-body"></div>' +
          '<div class="ctl-panel-nav"><button type="button" class="ctl-btn" data-act="prev">' + ICON.left + 'Previous stop</button><button type="button" class="ctl-btn" data-act="next">Next stop' + ICON.right + '</button></div>' +
        '</aside>' +
        '<div class="ctl-tip" hidden></div>' +
      '</div>';
    var $ = function (s) { return root.querySelector(s); };
    this.stage = $('.ctl-stage'); this.svg = $('.ctl-map'); this.world = $('.ctl-world');
    this.emptyEl = $('.ctl-empty'); this.listEl = $('.ctl-list'); this.tools = $('.ctl-tools');
    this.searchEl = $('.ctl-search input'); this.legend = $('.ctl-legend');
    this.panel = $('.ctl-panel'); this.panelBody = $('.ctl-panel-body'); this.panelLine = $('.ctl-linechip'); this.tip = $('.ctl-tip');
    this.hint = coarse ? 'Swipe sideways to move · pinch to zoom' : 'Drag to move · Ctrl + scroll to zoom';
    if (!root.requestFullscreen) $('[data-act="fullscreen"]').hidden = true;

    this.tools.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.view) self.setView(b.dataset.view);
      else if (b.dataset.act === 'zoom-in') self.zoomAt(1.4, self.W / 2, self.H / 2);
      else if (b.dataset.act === 'zoom-out') self.zoomAt(1 / 1.4, self.W / 2, self.H / 2);
      else if (b.dataset.act === 'fit') self.fit(true, true);
      else if (b.dataset.act === 'fullscreen') {
        if (document.fullscreenElement === root) document.exitFullscreen();
        else root.requestFullscreen().catch(function () {});
      }
    });
    this.searchEl.addEventListener('input', function () { self.setQuery(self.searchEl.value); });
    this.searchEl.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var hits = self.data.points.filter(function (p) { return matches(p, self.data.lineById.get(p._line), self.q); });
      if (!hits.length) return;
      var i = hits.findIndex(function (p) { return p.id === self.selected; });
      self.select(hits[(i + 1) % hits.length].id);
    });

    // Stations
    this.svg.addEventListener('click', function (e) {
      var g = e.target.closest('.ctl-st');
      if (g && !self._dragged) self.select(g.dataset.id === self.selected && self.opts.panel ? null : g.dataset.id, { pan: false });
    });
    this.svg.addEventListener('keydown', function (e) {
      var g = e.target.closest && e.target.closest('.ctl-st');
      if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); self.select(g.dataset.id); }
    });
    this.svg.addEventListener('focusin', function (e) {
      var g = e.target.closest && e.target.closest('.ctl-st');
      if (g && !self._pointerFocus) self._ensureVisible(g.dataset.id);
    });
    this.svg.addEventListener('pointerover', function (e) {
      var g = e.target.closest('.ctl-link');
      if (g && !self.drag) self._linkTip(g, e);
    });
    this.svg.addEventListener('pointerout', function (e) { if (e.target.closest('.ctl-link')) self.tip.hidden = true; });

    // Pan & zoom
    this.svg.addEventListener('pointerdown', function (e) { self._down(e); });
    this.svg.addEventListener('pointermove', function (e) { self._move(e); });
    this.svg.addEventListener('pointerup', function (e) { self._up(e); });
    this.svg.addEventListener('pointercancel', function (e) { self._up(e); });
    this.stage.addEventListener('wheel', function (e) { self._wheel(e); }, { passive: false });
    this.stage.addEventListener('gesturestart', function (e) { e.preventDefault(); self._gs = self.v.s; }, { passive: false });
    this.stage.addEventListener('gesturechange', function (e) {
      e.preventDefault();
      var r = self.stage.getBoundingClientRect();
      self.zoomAt(self._gs * e.scale / self.v.s, e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });

    // Panel & list
    this.panel.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.act === 'close') self.select(null);
      else if (b.dataset.act === 'grab') { if (!self._sheetDragged) self.panel.classList.toggle('is-expanded'); }
      else if (b.dataset.act === 'prev') self.step(-1);
      else if (b.dataset.act === 'next') self.step(1);
      else if (b.dataset.go) self.select(b.dataset.go);
      else if (b.dataset.img != null) self._showFigure(+b.dataset.img);
      else if (b.dataset.zoom != null) self._openLightbox(+b.dataset.zoom);
    });
    // Phone bottom sheet: drag the handle down to shrink or close it, up to expand it; tap the handle to toggle.
    var sheet = null;
    this.panel.addEventListener('pointerdown', function (e) {
      if (!root.classList.contains('ctl-narrow') || !e.target.closest('.ctl-grab, .ctl-panel-top') || e.target.closest('[data-act="close"]')) return;
      sheet = { id: e.pointerId, y: e.clientY, dy: 0 };
      self._sheetDragged = false;
      try { self.panel.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      self.panel.style.transition = 'none';
    });
    this.panel.addEventListener('pointermove', function (e) {
      if (!sheet || sheet.id !== e.pointerId) return;
      sheet.dy = e.clientY - sheet.y;
      if (Math.abs(sheet.dy) > 6) self._sheetDragged = true;
      self.panel.style.transform = 'translateY(' + Math.max(0, sheet.dy) + 'px)';
    });
    var endSheet = function (e) {
      if (!sheet || sheet.id !== e.pointerId) return;
      var dy = sheet.dy;
      sheet = null;
      self.panel.style.transition = '';
      self.panel.style.transform = '';
      if (dy > 70) {
        if (self.panel.classList.contains('is-expanded')) self.panel.classList.remove('is-expanded');
        else self.select(null);
      } else if (dy < -40) self.panel.classList.add('is-expanded');
      setTimeout(function () { self._sheetDragged = false; }, 0);
    };
    this.panel.addEventListener('pointerup', endSheet);
    this.panel.addEventListener('pointercancel', endSheet);

    this.listEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]');
      if (b) self.select(b.dataset.go);
    });
    root.addEventListener('keydown', function (e) {
      if (self.lightbox) return;
      var typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
      if (e.key === 'Escape' && self.selected && !(typing && e.target.value)) { self.select(null); e.preventDefault(); }
      else if (!typing && self.selected && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { self.step(e.key === 'ArrowRight' ? 1 : -1, true); e.preventDefault(); }
    });

    document.addEventListener('fullscreenchange', this._onFs = function () { self._resize(true); });
    if (global.ResizeObserver) { this._ro = new ResizeObserver(function () { self._resize(); }); this._ro.observe(this.stage); }
    else global.addEventListener('resize', this._onWin = function () { self._resize(); });
  };

  // A number (pixels), any CSS height, or "full" to fill the whole browser window edge to edge.
  P._setHeight = function (h) {
    var full = String(h).trim().toLowerCase() === 'full';
    this.root.classList.toggle('ctl-full', full);
    if (full) this.root.style.removeProperty('--ctl-height');
    else this.root.style.setProperty('--ctl-height', /^\d+$/.test(String(h)) ? h + 'px' : String(h));
  };

  P._resize = function (refit) {
    var W = this.stage.clientWidth, H = this.stage.clientHeight;
    if (!W || !H || !this.L) return;
    var changed = W !== this.W || H !== this.H;
    this.W = W; this.H = H;
    this.root.classList.toggle('ctl-narrow', W < 640);
    if (refit || (changed && this.autoFit)) this.fit(false, this._wholeFit);
    else this._apply();
  };

  // ---------- data ----------
  P.setData = function (raw, o) {
    o = o || {};
    this._raw = raw;
    this.data = normalize(raw);
    var s = this.data.settings, self = this;
    if (!this._inited) this.viewMode = s.view === 'list' ? 'list' : 'map';
    if (!this.opts.theme) this.root.setAttribute('data-theme', s.theme === 'paper' ? 'paper' : 'night');
    if (s.height && !this.opts.height) this._setHeight(s.height);
    if (this.selected && !this.data.byId.has(this.selected)) this.selected = null;
    this.L = layout(this.data);
    this.world.innerHTML = drawMap(this.data, this.L, function (src) { return self._img(src); });
    this.emptyEl.hidden = this.data.points.length > 0;
    var used = new Set(this.data.connections.filter(function (c) {
      return self.data.byId.get(c.from)._line !== self.data.byId.get(c.to)._line;
    }).map(function (c) { return c._type; }));
    this.legend.innerHTML = this.data.types.filter(function (t) { return used.has(t.id); }).map(function (t) {
      return '<span title="' + esc(t.description || '') + '">' + kindSample(t) + esc(t.name) + '</span>';
    }).join('') + '<span class="ctl-hint">' + this.hint + '</span>';
    this._syncTools();
    this.W = this.stage.clientWidth || 800;
    this.root.classList.toggle('ctl-narrow', this.W < 640);
    this.H = this.stage.clientHeight || 500;
    if (!this._inited || o.fit) { this._inited = true; this.fit(false); } else this._apply();
    this._classes();
    if (this.viewMode === 'list') this._renderList();
    if (this.selected && this.opts.panel) this._renderPanel(); else if (!this.selected) this._closePanel();
  };

  P._img = function (src) {
    if (!src) return '';
    if (this.opts.resolveImage) { var u = this.opts.resolveImage(src); if (u) return u; }
    if (/^(data:|blob:|https?:|\/)/i.test(src)) return src;
    return (this.opts.base != null ? this.opts.base : SCRIPT_BASE) + src;
  };

  P._syncTools = function () {
    var self = this, map = this.viewMode === 'map';
    this.tools.querySelectorAll('[data-view]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.view === self.viewMode)); });
    this.tools.querySelectorAll('[data-act^="zoom"],[data-act="fit"]').forEach(function (b) { b.hidden = !map; });
    this.listEl.hidden = map;
    this.legend.hidden = !map;
  };

  P.setView = function (v) {
    this.viewMode = v === 'list' ? 'list' : 'map';
    this._syncTools();
    this.tip.hidden = true;
    if (this.viewMode === 'list') this._renderList();
  };

  P.setQuery = function (q) {
    q = String(q || '');
    if (this.searchEl.value !== q) this.searchEl.value = q;
    this.q = q.trim().toLowerCase();
    this._classes();
    if (this.viewMode === 'list') this._renderList();
  };

  P._classes = function () {
    var self = this, d = this.data, f = this.selected, on = new Set();
    if (f) {
      on.add(f);
      d.connections.forEach(function (c) { if (c.from === f) on.add(c.to); if (c.to === f) on.add(c.from); });
    }
    this.svg.classList.toggle('has-focus', !!f);
    this.svg.classList.toggle('has-query', !!this.q);
    this.world.querySelectorAll('.ctl-st').forEach(function (g) {
      var id = g.dataset.id, p = d.byId.get(id);
      g.classList.toggle('is-selected', id === f);
      g.classList.toggle('is-on', on.has(id));
      g.classList.toggle('is-match', !!self.q && matches(p, d.lineById.get(p._line), self.q));
    });
    this.world.querySelectorAll('.ctl-link').forEach(function (g) {
      g.classList.toggle('is-on', !!f && (g.dataset.from === f || g.dataset.to === f));
    });
  };

  // ---------- view ----------
  P._apply = function () {
    var v = this.v, L = this.L, W = this.W, H = this.H, mw = L.width * v.s, mh = L.height * v.s;
    v.tx = mw <= W ? clamp(v.tx, -20, W - mw + 20) : clamp(v.tx, W - mw - 60, 60);
    v.ty = mh <= H ? clamp(v.ty, -20, Math.max(H - mh + 20, 44)) : clamp(v.ty, H - mh - 60, 60);
    this.world.setAttribute('transform', 'translate(' + r1(v.tx) + ' ' + r1(v.ty) + ') scale(' + Math.round(v.s * 1000) / 1000 + ')');
  };

  // whole=true fits everything; otherwise fill the width (never tinier than 55%) and start at the top-left.
  P.fit = function (animate, whole) {
    var L = this.L, W = this.W, H = this.H, s;
    this._wholeFit = !!whole;
    if (whole) {
      s = clamp(Math.min(W / L.width, H / L.height), 0.2, 1.2);
      this._animTo(s, (W - L.width * s) / 2, (H - L.height * s) / 2, animate);
    } else {
      // phones get a readable size and pan sideways; larger screens fill the width
      s = W < 640 ? 0.9 : clamp(W / L.width, 0.68, 1);
      // start a little lower when the floating toolbar would sit on top of the title
      this._animTo(s, L.width * s < W ? (W - L.width * s) / 2 : 0, W < 1000 ? 48 : 0, false);
    }
    this.autoFit = true;
  };

  P._animTo = function (s, tx, ty, animate) {
    var self = this, from = { s: this.v.s, tx: this.v.tx, ty: this.v.ty };
    cancelAnimationFrame(this._raf);
    if (!animate || reducedMotion()) { this.v = { s: s, tx: tx, ty: ty }; this._apply(); return; }
    var t0 = performance.now();
    var tick = function (now) {
      var k = Math.min(1, (now - t0) / 320), e = 1 - Math.pow(1 - k, 3);
      self.v = { s: from.s + (s - from.s) * e, tx: from.tx + (tx - from.tx) * e, ty: from.ty + (ty - from.ty) * e };
      self._apply();
      if (k < 1) self._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  };

  P.zoomAt = function (f, sx, sy) {
    if (this.viewMode !== 'map' || !isFinite(f)) return;
    var s1 = clamp(this.v.s * f, 0.2, 2.5), k = s1 / this.v.s;
    if (Math.abs(k - 1) < 1e-4) return;
    cancelAnimationFrame(this._raf);
    this.v.tx = sx - (sx - this.v.tx) * k;
    this.v.ty = sy - (sy - this.v.ty) * k;
    this.v.s = s1;
    this.autoFit = false;
    this.tip.hidden = true;
    this._apply();
  };

  P._wheel = function (e) {
    if (this.viewMode !== 'map') return;
    var r = this.stage.getBoundingClientRect();
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      this.zoomAt(Math.exp(-(e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY) * 0.0025), e.clientX - r.left, e.clientY - r.top);
      return;
    }
    var k = e.deltaMode === 1 ? 16 : 1, dx = e.deltaX * k, dy = e.deltaY * k;
    if (e.shiftKey && !dx) { dx = dy; dy = 0; }
    var before = { tx: this.v.tx, ty: this.v.ty };
    this.v.tx -= dx;
    this.v.ty -= dy;
    this._apply();
    // Only keep the scroll when the map actually moved; otherwise let the page scroll.
    if (Math.abs(before.tx - this.v.tx) > 0.1 || Math.abs(before.ty - this.v.ty) > 0.1) { e.preventDefault(); this.autoFit = false; }
  };

  P._down = function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    this._pointerFocus = true;
    var self = this;
    setTimeout(function () { self._pointerFocus = false; }, 0);
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 1) {
      this.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, tx: this.v.tx, ty: this.v.ty, moved: false, vert: e.pointerType !== 'touch' || this.root.classList.contains('ctl-full') };
      this._dragged = false;
    } else if (this.pointers.size === 2) {
      var p = Array.from(this.pointers.values());
      this.pinch = { d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1, s: this.v.s };
      this.drag = null;
    }
  };
  P._move = function (e) {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pinch && this.pointers.size >= 2) {
      var p = Array.from(this.pointers.values()), r = this.stage.getBoundingClientRect();
      this.zoomAt(this.pinch.s * Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) / this.pinch.d / this.v.s, (p[0].x + p[1].x) / 2 - r.left, (p[0].y + p[1].y) / 2 - r.top);
      return;
    }
    var g = this.drag;
    if (!g || g.id !== e.pointerId) return;
    var dx = e.clientX - g.x, dy = e.clientY - g.y;
    if (!g.moved) {
      if (Math.hypot(dx, dy) < 5) return;
      g.moved = true;
      this._dragged = true;
      try { this.svg.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      this.stage.classList.add('is-panning');
      this.tip.hidden = true;
      this.autoFit = false;
      cancelAnimationFrame(this._raf);
    }
    this.v.tx = g.tx + dx;
    if (g.vert) this.v.ty = g.ty + dy;   // touch on an embedded map leaves vertical swipes to page scrolling
    this._apply();
  };
  P._up = function (e) {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinch = null;
    if (this.drag && this.drag.id === e.pointerId) {
      var self = this;
      this.drag = null;
      this.stage.classList.remove('is-panning');
      setTimeout(function () { self._dragged = false; }, 0);
    }
  };

  P._ensureVisible = function (id) {
    var P0 = this.L.pos.get(id);
    if (!P0 || this.viewMode !== 'map') return;
    var v = this.v, open = this.opts.panel && this.selected, narrow = this.W < 640;
    // on wide screens the panel covers the right side; on phones the sheet covers the bottom
    var panelW = open && !narrow ? Math.min(400, this.W - 24) + 24 : 0;
    var sheetH = open && narrow ? this.panel.offsetHeight : 0;
    var x = v.tx + P0.x * v.s, y = v.ty + P0.y * v.s, room = this.W - panelW, roomH = this.H - sheetH;
    var tx = v.tx, ty = v.ty;
    if (x < (narrow ? 30 : 60) || x > room - 120 * v.s) tx = room * (narrow ? 0.3 : 0.4) - P0.x * v.s;
    if (y < (narrow ? 70 : 110 * v.s) || y > roomH - 40) ty = roomH * 0.5 - P0.y * v.s;
    if (tx !== v.tx || ty !== v.ty) { this.autoFit = false; this._animTo(v.s, tx, ty, true); }
  };

  P._linkTip = function (g, e) {
    var d = this.data, c = d.connections.find(function (x) { return x.id === g.dataset.c; });
    if (!c) return;
    var t = d.typeById.get(c._type), a = d.byId.get(c.from), b = d.byId.get(c.to), r = this.stage.getBoundingClientRect();
    this.tip.innerHTML = '<em>' + esc(t.name) + '</em><br><b>' + esc(a.title || 'Untitled') + '</b>' + (t.directed === false ? ' ↔ ' : ' → ') +
      '<b>' + esc(b.title || 'Untitled') + '</b>' + (c.note ? '<br>' + esc(c.note) : '');
    this.tip.hidden = false;
    this.tip.style.left = r1(clamp(e.clientX - r.left + 12, 8, this.W - this.tip.offsetWidth - 8)) + 'px';
    this.tip.style.top = r1(clamp(e.clientY - r.top + 16, 8, this.H - this.tip.offsetHeight - 8)) + 'px';
  };

  // ---------- selection ----------
  P.select = function (id, o) {
    o = o || {};
    this.selected = id && this.data.byId.has(id) ? id : null;
    this._classes();
    if (this.selected) {
      if (this.opts.panel) this._renderPanel();
      this._ensureVisible(this.selected);
    } else this._closePanel();
    if (this.viewMode === 'list') this._markList();
    if (this.opts.onSelect && !o.silent) this.opts.onSelect(this.selected);
  };

  P._lineStops = function (p) {
    return this.data.points.filter(function (x) { return x._line === p._line; });
  };

  P.step = function (dir, focus) {
    var p = this.data.byId.get(this.selected);
    if (!p) return;
    var stops = this._lineStops(p), i = stops.indexOf(p), next = stops[i + dir];
    if (!next) return;
    this.select(next.id);
    if (focus) {
      var g = this.world.querySelector('.ctl-st[data-id="' + (global.CSS && CSS.escape ? CSS.escape(next.id) : next.id) + '"]');
      if (g) g.focus({ preventScroll: true });
    }
  };

  P._renderPanel = function () {
    var p = this.data.byId.get(this.selected);
    if (!p) { this._closePanel(); return; }
    var d = this.data, self = this, line = d.lineById.get(p._line), c = line._color;
    this.panel.style.setProperty('--c', c);
    this.panelLine.innerHTML = '<span class="ctl-dot"></span>' + esc((line.label ? line.label + ' · ' : '') + (line.name || ''));
    var h = '';
    var date = pointDate(p, true);
    if (date) h += '<div class="ctl-bigdate">' + esc(date) + '</div>';
    h += '<h3 class="ctl-ptitle">' + esc(p.title || 'Untitled') + '</h3>';
    if (p.caption) h += '<p class="ctl-caption">' + esc(p.caption) + '</p>';
    if (p.images.length) {
      h += this._figureHTML(p, 0);
      if (p.images.length > 1) {
        h += '<div class="ctl-thumbs">' + p.images.map(function (im, i) {
          return '<button type="button" data-img="' + i + '" aria-label="Show picture ' + (i + 1) + '" aria-current="' + (i === 0) + '"><img src="' + esc(self._img(im.src)) + '" alt=""></button>';
        }).join('') + '</div>';
      }
    }
    if (p.summary) h += '<p class="ctl-summary">' + esc(p.summary) + '</p>';
    if (p.description) {
      h += '<div class="ctl-desc">' + String(p.description).split(/\n\s*\n/).map(function (para) {
        return '<p>' + esc(para.trim()).replace(/\n/g, '<br>') + '</p>';
      }).join('') + '</div>';
    }
    var rel = d.connections.filter(function (x) { return x.from === p.id || x.to === p.id; });
    if (rel.length) {
      h += '<div class="ctl-slabel">Connections</div>' + rel.map(function (x) {
        var t = d.typeById.get(x._type), out = x.from === p.id, other = d.byId.get(out ? x.to : x.from);
        var label = t.directed === false || out ? t.name : (t.inverse || t.name);
        return '<button type="button" class="ctl-conn" data-go="' + esc(other.id) + '"><span>' +
          '<span class="ctl-conn-kind">' + kindSample(t) + esc(label) + '</span>' +
          '<span class="ctl-conn-title">' + esc(other.title || 'Untitled') + '</span>' +
          (x.note ? '<span class="ctl-conn-note">' + esc(x.note) + '</span>' : '') + '</span>' +
          '<span class="ctl-conn-date">' + esc(pointDate(other)) + '</span></button>';
      }).join('');
    }
    if (p.links.length) {
      h += '<div class="ctl-slabel">Links</div><ul class="ctl-links">' + p.links.map(function (l) {
        return '<li><a href="' + esc(safeUrl(l.url)) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label || l.url) + ICON.out + '</a></li>';
      }).join('') + '</ul>';
    }
    if (p.tags.length) h += '<div class="ctl-tags">' + p.tags.map(function (t) { return '<span class="ctl-tag">' + esc(t) + '</span>'; }).join('') + '</div>';
    this.panelBody.innerHTML = h;
    if (this._panelFor !== p.id) { this.panelBody.scrollTop = 0; this._panelFor = p.id; }
    var stops = this._lineStops(p), i = stops.indexOf(p);
    this.panel.querySelector('[data-act="prev"]').disabled = i <= 0;
    this.panel.querySelector('[data-act="next"]').disabled = i >= stops.length - 1;
    this.panel.classList.add('is-open');
    this.root.classList.add('ctl-sheet-open');
  };

  P._figureHTML = function (p, i) {
    var im = p.images[i];
    return '<figure class="ctl-figure"><button type="button" class="ctl-figure-btn" data-zoom="' + i + '" aria-label="Enlarge picture">' +
      '<img src="' + esc(this._img(im.src)) + '" alt="' + esc(im.alt || im.caption || '') + '"></button>' +
      (im.caption || im.credit ? '<figcaption>' + esc(im.caption || '') + (im.credit ? ' <span>' + esc(im.credit) + '</span>' : '') + '</figcaption>' : '') + '</figure>';
  };
  P._showFigure = function (i) {
    var p = this.data.byId.get(this.selected), fig = this.panelBody.querySelector('.ctl-figure');
    if (!p || !fig || !p.images[i]) return;
    fig.outerHTML = this._figureHTML(p, i);
    this.panelBody.querySelectorAll('.ctl-thumbs button').forEach(function (b) { b.setAttribute('aria-current', String(+b.dataset.img === i)); });
  };
  P._closePanel = function () {
    this.panel.classList.remove('is-open', 'is-expanded');
    this.root.classList.remove('ctl-sheet-open');
    this._panelFor = null;
  };

  P._openLightbox = function (i) {
    var p = this.data.byId.get(this.selected);
    if (!p || !p.images.length) return;
    var self = this, lb = document.createElement('div'), back = document.activeElement, n = p.images.length;
    lb.className = 'ctl-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Pictures for ' + (p.title || 'this point'));
    var show = function (j) {
      i = (j + n) % n;
      var im = p.images[i];
      lb.innerHTML = '<div class="ctl-lb-top"><span>' + esc(p.title || '') + (n > 1 ? ' · ' + (i + 1) + ' of ' + n : '') + '</span>' +
        '<button type="button" class="ctl-iconbtn" data-lb="close" aria-label="Close">' + ICON.close + '</button></div>' +
        '<div class="ctl-lb-stage"><button type="button" class="ctl-iconbtn" data-lb="prev" aria-label="Previous picture"' + (n < 2 ? ' disabled' : '') + '>' + ICON.left + '</button>' +
        '<img src="' + esc(self._img(im.src)) + '" alt="' + esc(im.alt || im.caption || '') + '">' +
        '<button type="button" class="ctl-iconbtn" data-lb="next" aria-label="Next picture"' + (n < 2 ? ' disabled' : '') + '>' + ICON.right + '</button></div>' +
        '<div class="ctl-lb-cap">' + esc(im.caption || '') + (im.credit ? ' <span>' + esc(im.credit) + '</span>' : '') + '</div>';
      lb.querySelector('[data-lb="close"]').focus();
    };
    var close = function () {
      lb.remove();
      self.lightbox = null;
      document.removeEventListener('keydown', onKey, true);
      if (back && back.focus) back.focus();
    };
    var onKey = function (e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
      else if (e.key === 'ArrowRight' && n > 1) { e.preventDefault(); show(i + 1); }
      else if (e.key === 'ArrowLeft' && n > 1) { e.preventDefault(); show(i - 1); }
      else if (e.key === 'Tab') {
        var bs = Array.from(lb.querySelectorAll('button:not(:disabled)')), k = bs.indexOf(document.activeElement);
        e.preventDefault();
        bs[(k + (e.shiftKey ? bs.length - 1 : 1)) % bs.length].focus();
      }
    };
    lb.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lb]');
      if (b) { if (b.dataset.lb === 'close') close(); else show(i + (b.dataset.lb === 'next' ? 1 : -1)); }
      else if (e.target === lb || e.target.classList.contains('ctl-lb-stage')) close();
    });
    document.addEventListener('keydown', onKey, true);
    this.root.appendChild(lb);
    this.lightbox = lb;
    show(i);
  };

  // ---------- list view ----------
  P._renderList = function () {
    var self = this, d = this.data, q = this.q, h = '';
    d.lines.forEach(function (line) {
      var pts = d.points.filter(function (p) { return p._line === line.id && (!q || matches(p, line, q)); });
      if (!pts.length) return;
      h += '<section class="ctl-lgroup" style="--c:' + line._color + ';--on:' + onColor(line.color) + '">' +
        '<div class="ctl-lhead"><b>' + esc(line.label) + '</b><span>' + esc(line.name || '') + '</span></div>' +
        pts.map(function (p) {
          return '<div class="ctl-li' + (p.id === self.selected ? ' is-selected' : '') + '" data-id="' + esc(p.id) + '"><span class="ctl-li-dot"></span><div>' +
            (pointDate(p) ? '<div class="ctl-li-date">' + esc(pointDate(p)) + '</div>' : '') +
            '<button type="button" class="ctl-li-title" data-go="' + esc(p.id) + '">' + esc(p.title || 'Untitled') + '</button>' +
            (p.summary || p.caption ? '<p class="ctl-li-sum">' + esc(p.summary || p.caption) + '</p>' : '') + '</div></div>';
        }).join('') + '</section>';
    });
    this.listEl.innerHTML = h || '<p class="ctl-empty">' + (q ? 'Nothing matches “' + esc(q) + '”.' : 'No points yet.') + '</p>';
  };
  P._markList = function () {
    var self = this;
    this.listEl.querySelectorAll('.ctl-li').forEach(function (a) { a.classList.toggle('is-selected', a.dataset.id === self.selected); });
  };

  // ---------- public ----------
  P.setOptions = function (o) {
    Object.assign(this.opts, o);
    if (!this.opts.panel) this._closePanel(); else if (this.selected) this._renderPanel();
  };
  P.refresh = function () { this.setData(this._raw, {}); };
  P.destroy = function () {
    if (this._ro) this._ro.disconnect();
    if (this._onWin) global.removeEventListener('resize', this._onWin);
    document.removeEventListener('fullscreenchange', this._onFs);
    this.root.innerHTML = '';
    this.root.classList.remove('ctl', 'ctl-narrow');
  };

  function mount(el, data, opts) { return new Timeline(el, data, opts); }
  // Phones only render at their real width when the page has a viewport tag; add one if the page lacks it.
  function ensureViewport() {
    if (document.querySelector('meta[name="viewport"]')) return;
    var m = document.createElement('meta');
    m.name = 'viewport';
    m.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    (document.head || document.documentElement).appendChild(m);
  }

  function autoMount() {
    if (document.querySelector('[data-timeline]')) ensureViewport();
    Array.prototype.forEach.call(document.querySelectorAll('[data-timeline]'), function (el) {
      if (el._ctl) return;
      var name = el.getAttribute('data-timeline') || 'TIMELINE_DATA';
      var data = /^[A-Za-z_$][\w$]*$/.test(name) ? global[name] : null;
      if (!data) { el.textContent = 'Timeline data not found. Load timeline-data.js before timeline.js.'; return; }
      el._ctl = mount(el, data, { height: el.getAttribute('data-height') || null, theme: el.getAttribute('data-theme') || null });
    });
  }

  global.ConnectedTimeline = {
    version: '2.0',
    mount: mount,
    autoMount: autoMount,
    parseDate: parseDate,
    formatDate: formatDate,
    dateToString: dateToString,
    pointDate: function (p) { var n = normalize({ points: [p] }).points[0]; return n ? pointDate(n, true) : ''; },
    colors: Object.assign({}, COLORS),
    palette: PALETTE.slice(),
    hex: hex,
    onColor: onColor,
    kindSample: kindSample
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoMount);
  else autoMount();
})(window);
