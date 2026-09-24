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
    out: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M9 3h4v4M13 3 7 9M11 9.5V13H3V5h3.5"/></svg>',
    play: '<svg class="ctl-i ctl-fill" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.2v9.6L12.8 8z"/></svg>',
    pause: '<svg class="ctl-i ctl-fill" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 3h2.6v10H4.5zM8.9 3h2.6v10H8.9z"/></svg>',
    prevTrack: '<svg class="ctl-i ctl-fill" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 3h1.8v10H3.5zM13 3.2v9.6L6.2 8z"/></svg>',
    nextTrack: '<svg class="ctl-i ctl-fill" viewBox="0 0 16 16" aria-hidden="true"><path d="M10.7 3h1.8v10h-1.8zM3 3.2v9.6L9.8 8z"/></svg>',
    vol: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.5l3.5-3v10l-3.5-3H2.5z" fill="currentColor"/><path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8"/></svg>',
    volLow: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.5l3.5-3v10l-3.5-3H2.5z" fill="currentColor"/><path d="M11 5.5a3.5 3.5 0 0 1 0 5"/></svg>',
    mute: '<svg class="ctl-i" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 6h2.5l3.5-3v10l-3.5-3H2.5z" fill="currentColor"/><path d="M11 6l3.5 4M14.5 6 11 10"/></svg>'
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
      settings: Object.assign({ title: '', subtitle: '', view: 'map', showTitle: true, spacing: 210, theme: 'night', display: 'stations', coverWidth: 150, linkShape: 'curve' }, src.settings || {}),
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

  // Sizes for the two looks: small "ring" stations, or large framed "covers".
  function coverGeom(s) {
    var cw = clamp(parseInt(s.coverWidth, 10) || 150, 90, 320), ch = Math.round(cw * 1.42);
    return { covers: true, CW: cw, CH: ch, TRACK: ch + 170, ABOVE: ch / 2 + 34, BELOW: ch / 2 + 118, MINSP: cw + 70 };
  }
  var RING_GEOM = { covers: false, TRACK: TRACK, ABOVE: ABOVE, BELOW: BELOW, MINSP: 140 };

  // Each point picks its own look: "cover", "ring", or (unset) the timeline's default look.
  function isCover(p, s) { return p.look === 'cover' || (p.look !== 'ring' && s.display === 'covers'); }

  // Work out where every line, branch and station sits.
  function layout(data) {
    var s = data.settings, CG = coverGeom(s);
    data.points.forEach(function (p) { p._cover = isCover(p, s); });
    var anyCover = data.points.some(function (p) { return p._cover; });
    // spacing is shared by all lines so columns stay aligned; widen it when covers are in use
    var SP = Math.max(clamp(parseInt(s.spacing, 10) || 210, 140, 600), anyCover ? CG.MINSP : RING_GEOM.MINSP);
    var titleLines = s.showTitle !== false && s.title ? wrap(s.title, 18, 2) : [];
    var top = titleLines.length ? 40 + titleLines.length * 70 + (s.subtitle ? 44 : 0) : 20;
    var pos = new Map(), lines = [], y = top, right = 0, bottom = 0;
    data.lines.forEach(function (line) {
      var pts = data.points.filter(function (p) { return p._line === line.id; });
      var startPt = line.start && pos.get(line.start);
      // a line with any covers on it gets the taller rows covers need
      var LG = pts.some(function (p) { return p._cover; }) ? CG : RING_GEOM;
      var TRACK = LG.TRACK, ABOVE = LG.ABOVE, BELOW = LG.BELOW;
      var minT = 0, maxT = 0;
      pts.forEach(function (p) { minT = Math.min(minT, p._track); maxT = Math.max(maxT, p._track); });
      // A line placed by hand (dragged in the editor) keeps its spot; others stack below each other.
      var manual = line.pos && isFinite(line.pos.x) && isFinite(line.pos.y);
      var tx = manual ? +line.pos.x : startPt ? startPt.x : X0;
      var y0 = manual ? +line.pos.y : y + Math.max(ABOVE - minT * TRACK, R_T + 10) + (startPt ? 20 : 0);
      pts.forEach(function (p, i) {
        pos.set(p.id, { x: tx + (i + 1) * SP, y: y0 + p._track * TRACK, y0: y0, line: line, p: p });
      });
      var rec = { line: line, x: tx, y: y0, pts: pts, start: startPt || null, SP: SP, manual: manual, G: LG };
      lines.push(rec);
      if (!manual) y = y0 + maxT * TRACK + BELOW + GAP;
      bottom = Math.max(bottom, y0 + maxT * TRACK + BELOW + GAP);
      var lastX = pts.length ? pos.get(pts[pts.length - 1].id).x : tx;
      right = Math.max(right, lastX + SP);
    });
    y = Math.max(y, bottom);
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
    return { pos: pos, lines: lines, width: width, height: y + 10, top: top, titleLines: titleLines, SP: SP, G: CG };
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
  // One station in the "covers" look: a framed picture on the line, with its title, date and caption underneath.
  function drawCover(P, id, G, img) {
    var p = P.p, x = P.x, y = P.y, c = P.line._color, hw = G.CW / 2, hh = G.CH / 2, pic = p.images[0], h = '';
    var box = 'x="' + r1(x - hw) + '" y="' + r1(y - hh) + '" width="' + G.CW + '" height="' + G.CH + '"';
    h += '<rect class="ctl-cover-bg" ' + box + ' rx="4"/>';
    if (pic) h += '<image href="' + esc(img(pic.src)) + '" ' + box + ' preserveAspectRatio="xMidYMid meet"/>';
    else {
      var tl = wrap(p.title || 'Untitled', Math.floor(G.CW / 10.5), 5);
      h += textLines(tl, x, y + (tl.length - 1) * 10, 20, 'class="ctl-st-title" text-anchor="middle" font-size="17"');
    }
    h += '<rect class="ctl-cover-frame" ' + box + ' rx="4" stroke="' + c + '"/>';
    h += '<rect class="ctl-halo" x="' + r1(x - hw - 8) + '" y="' + r1(y - hh - 8) + '" width="' + (G.CW + 16) + '" height="' + (G.CH + 16) + '" rx="8"/>';
    // text under the cover
    var width = G.CW + 50, ty = y + hh + 24;
    if (pic) {   // without a picture the title is already inside the frame
      var title = wrap(p.title || 'Untitled', Math.floor(width / 9.5), 2);
      h += textLines(title, x, ty + (title.length - 1) * 19, 19, 'class="ctl-st-title" text-anchor="middle" font-size="16"');
      ty += (title.length - 1) * 19 + 19;
    } else ty -= 4;
    var date = pointDate(p);
    if (date) { h += '<text class="ctl-cv-date" x="' + x + '" y="' + ty + '" text-anchor="middle" font-size="12" fill="' + c + '">' + esc(date) + '</text>'; ty += 18; }
    if (p.caption) {
      var cap = wrap(p.caption, Math.floor(width / 7.2), 2);
      h += textLines(cap, x, ty + (cap.length - 1) * 16, 16, 'class="ctl-st-cap" text-anchor="middle" font-size="13" fill="' + c + '"');
    }
    return '<g class="ctl-st ctl-cover" data-id="' + esc(id) + '" tabindex="0" role="button" aria-label="' + esc((p.title || 'Untitled') + (date ? ', ' + pointDate(p, true) : '')) + '" style="--c:' + c + '">' +
      '<rect class="ctl-hit" x="' + r1(x - hw - 4) + '" y="' + r1(y - hh - 4) + '" width="' + (G.CW + 8) + '" height="' + (G.CH + 8) + '" rx="6"/>' + h + '</g>';   // click zone: the cover, plus its own text
  }

  // The area a cover and the text under it take up, around its centre
  function coverBoxOf(P, G) { return { l: P.x - G.CW / 2 - 6, r: P.x + G.CW / 2 + 6, t: P.y - G.CH / 2 - 6, b: P.y + G.CH / 2 + 84 }; }
  function offTowards(p, q, d) { var l = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1; return [p[0] + (q[0] - p[0]) * d / l, p[1] + (q[1] - p[1]) * d / l]; }

  // Automatic corners for a straight link: down-across-down, or across-down-across, meeting halfway.
  function autoBends(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y;
    if (Math.abs(dy) > Math.abs(dx) * 0.35) { var my = Math.round((a.y + dy / 2) / 10) * 10; return [[a.x, my], [b.x, my]]; }
    var mx = Math.round((a.x + dx / 2) / 10) * 10;
    return [[mx, a.y], [mx, b.y]];
  }
  function savedBends(c) {
    return Array.isArray(c.bends) ? c.bends.filter(function (q) { return q && isFinite(q[0]) && isFinite(q[1]); }).map(function (q) { return [+q[0], +q[1]]; }) : null;
  }

  // Shape of one link. "curve": a smooth S-curve. "straight": straight segments through its corners.
  // bends overrides the corners (used while dragging one in the editor).
  function linkGeom(c, a, b, s, G, bends) {
    var straight = (c.route || s.linkShape) === 'straight';
    // each end leaves from the edge of its cover (or the text under it), or from just outside its ring
    var endA = function (toward) { return a.p._cover ? boxEdge([a.x, a.y], toward, coverBoxOf(a, G)) : offTowards([a.x, a.y], toward, R_ST + 5); };
    var endB = function (toward) { return b.p._cover ? offTowards(boxEdge([b.x, b.y], toward, coverBoxOf(b, G)), toward, 4) : offTowards([b.x, b.y], toward, R_ST + 5); };
    if (!straight) {
      var dy = b.y - a.y, dx = b.x - a.x, vertical = Math.abs(dy) > Math.abs(dx) * 0.35;
      var c1 = vertical ? [a.x, a.y + dy * 0.5] : [a.x + dx * 0.5, a.y], c2 = vertical ? [b.x, b.y - dy * 0.5] : [b.x - dx * 0.5, b.y];
      var A = endA(c1), B = endB(c2);
      return {
        straight: false, A: A, B: B, tail: c2,
        d: 'M' + r1(A[0]) + ',' + r1(A[1]) + 'C' + r1(c1[0]) + ',' + r1(c1[1]) + ' ' + r1(c2[0]) + ',' + r1(c2[1]) + ' ' + r1(B[0]) + ',' + r1(B[1]),
        mid: [(A[0] + 3 * c1[0] + 3 * c2[0] + B[0]) / 8, (A[1] + 3 * c1[1] + 3 * c2[1] + B[1]) / 8]
      };
    }
    var corners = bends || savedBends(c) || autoBends(a, b);
    var first = corners.length ? corners[0] : [b.x, b.y], last = corners.length ? corners[corners.length - 1] : [a.x, a.y];
    var pts = [endA(first)].concat(corners, [endB(last)]);
    return { straight: true, corners: corners, pts: pts, A: pts[0], B: pts[pts.length - 1], tail: last, mid: pathMid(pts), d: polyD(pts) };
  }

  function polyD(pts) { return 'M' + pts.map(function (q) { return r1(q[0]) + ',' + r1(q[1]); }).join('L'); }
  // The point halfway along a path of straight segments (where its note goes).
  function pathMid(pts) {
    var total = 0, lens = [];
    for (var i = 1; i < pts.length; i++) { var l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); lens.push(l); total += l; }
    var half = total / 2;
    for (var j = 0; j < lens.length; j++) {
      if (half <= lens[j]) { var k = lens[j] ? half / lens[j] : 0; return [pts[j][0] + (pts[j + 1][0] - pts[j][0]) * k, pts[j][1] + (pts[j + 1][1] - pts[j][1]) * k]; }
      half -= lens[j];
    }
    return pts[0];
  }

  // The drop line from a station down to the big circle of a main point that starts there.
  // Curved, or straight with movable corners (startShape, else the timeline's link shape).
  function startGeom(R, G, s, bends) {
    var sx = R.start.x, sy = R.start.y + (R.start.p._cover ? G.CH / 2 + 90 : R_ST + 4), ex = R.x, ey = R.y - R_T - 4, my = (sy + ey) / 2;
    if ((R.line.startShape || s.linkShape) !== 'straight') {
      return { straight: false, mid: [(sx + ex) / 2, my], side: sx === ex,
        d: 'M' + r1(sx) + ',' + r1(sy) + 'C' + r1(sx) + ',' + r1(my) + ' ' + r1(ex) + ',' + r1(my) + ' ' + r1(ex) + ',' + r1(ey) };
    }
    var m10 = Math.round(my / 10) * 10;
    var corners = bends || savedBends({ bends: R.line.startBends }) || (Math.abs(sx - ex) < 1 ? [[sx, m10]] : [[sx, m10], [ex, m10]]);
    var pts = [[sx, sy]].concat(corners, [[ex, ey]]), mid = pathMid(pts);
    return { straight: true, corners: corners, pts: pts, mid: mid, side: true, d: polyD(pts) };
  }
  function startInner(R, geo) {
    var l = R.line, style = l.startStyle || 'dashed', dash = style === 'dashed' ? '7 7' : DASH[style] || '', note = '';
    if (l.startNote) {   // optional note written beside the drop line, at its middle
      var nl = wrap(l.startNote, 26, 3);
      note = textLines(nl, geo.mid[0] + (geo.side ? 10 : 0), geo.mid[1] + (nl.length - 1) * 7.5, 15,
        'class="ctl-start-note" text-anchor="' + (geo.side ? 'start' : 'middle') + '" font-size="11.5" fill="' + l._color + '"');
    }
    return '<path class="ctl-start-hit" d="' + geo.d + '"/>' +
      '<path class="ctl-startlink" fill="none" stroke="' + l._color + '" stroke-linejoin="' + (geo.straight ? 'miter' : 'round') + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' d="' + geo.d + '"/>' + note;
  }

  // Inside of one link's group: wide invisible click area, the visible line, the arrow and the note.
  function linkInner(c, t, geo, s, a, b) {
    var col = hex(t.color), dash = DASH[t.style || 'dashed'], note = '';
    if (c.note && (s.display === 'covers' || a.p._cover || b.p._cover)) {
      // write the note along the link, like the notes on a hand-made chart
      var nl = wrap(c.note, 26, 3);
      note = textLines(nl, geo.mid[0], geo.mid[1] + (nl.length - 1) * 7.5, 15, 'class="ctl-link-note" text-anchor="middle" font-size="11.5" fill="' + col + '"');
    }
    return '<path class="ctl-link-hit" d="' + geo.d + '"/>' +
      '<path class="ctl-link-line" d="' + geo.d + '" fill="none" stroke="' + col + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="' + (geo.straight ? 'miter' : 'round') + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
      (t.directed === false ? '' : '<path class="ctl-link-arrow" fill="' + col + '" d="' + arrowPath(geo.B, geo.tail) + '"/>') + note;
  }

  // Distance from point p to the segment a-b.
  function segDist(p, a, b) {
    var dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy;
    var k = l2 ? clamp(((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2, 0, 1) : 0;
    return Math.hypot(p[0] - (a[0] + dx * k), p[1] - (a[1] + dy * k));
  }

  // Where a straight line from the centre of box b (towards q) leaves the box.
  function boxEdge(c, q, b) {
    var dx = q[0] - c[0], dy = q[1] - c[1];
    var tx = dx > 0 ? (b.r - c[0]) / dx : dx < 0 ? (b.l - c[0]) / dx : Infinity;
    var ty = dy > 0 ? (b.b - c[1]) / dy : dy < 0 ? (b.t - c[1]) / dy : Infinity;
    var t = Math.min(tx, ty, 1);
    return [c[0] + dx * t, c[1] + dy * t];
  }

  function drawMap(data, L, img) {
    var s = data.settings, SP = L.SP, G = L.G, out = [];   // G: cover sizes, for the points shown as covers
    // The area a cover and the text under it take up, around its centre
    // Title
    if (L.titleLines.length) {
      out.push(textLines(L.titleLines, X0 - 36, 30 + L.titleLines.length * 70 - 12, 70, 'class="ctl-maptitle" font-size="68"'));
      if (s.subtitle) out.push(textLines(wrap(s.subtitle, 90, 2).slice(0, 1), X0 - 34, 30 + L.titleLines.length * 70 + 26, 20, 'class="ctl-mapsub" font-size="16"'));
    }
    // Each line's track, circle and stations share one group, so the editor can drag a whole line at once.
    var per = new Map();
    L.lines.forEach(function (R) { per.set(R.line.id, { tracks: [], term: '', st: [] }); });
    // Where a line begins from a station on another line
    L.lines.forEach(function (R) {
      if (!R.start) return;
      out.push('<g class="ctl-startg" data-line="' + esc(R.line.id) + '">' + startInner(R, startGeom(R, G, s)) + '</g>');
    });
    // Tracks: branches first, then the main line on top
    L.lines.forEach(function (R) {
      var c = R.line._color, g = per.get(R.line.id);
      R.branches.forEach(function (b) {
        var yt = R.y + b.track * R.G.TRACK, xa = b.from ? b.from.x : R.x;
        var pts = [[xa, R.y], [xa, yt]];
        if (b.to) pts.push([b.to.x, yt], [b.to.x, R.y]);
        else pts.push([b.last.x + SP * 0.6, yt]);
        g.tracks.push('<path class="ctl-track" stroke="' + c + '" d="' + roundedPath(pts, 24) + '"/>');
      });
      if (R.endX > R.x) g.tracks.push('<path class="ctl-track" stroke="' + c + '" d="M' + R.x + ',' + R.y + 'H' + r1(R.endX) + '"/>');
    });
    // Links between stations on different lines
    data.connections.forEach(function (c) {
      var a = L.pos.get(c.from), b = L.pos.get(c.to);
      if (!a || !b || a.line === b.line) return;
      var t = data.typeById.get(c._type), geo = linkGeom(c, a, b, s, G);
      out.push('<g class="ctl-link' + (geo.straight ? ' is-straight' : '') + '" data-c="' + esc(c.id) + '" data-from="' + esc(c.from) + '" data-to="' + esc(c.to) + '">' +
        linkInner(c, t, geo, s, a, b) + '</g>');
    });
    // Line terminals
    L.lines.forEach(function (R) {
      var l = R.line, fg = onColor(l.color), label = String(l.label || '');
      var fs = label.length <= 4 ? 25 : label.length <= 6 ? 19 : 15;
      var name = wrap(l.name || '', 11, 2);
      per.get(l.id).term = ('<g class="ctl-term" data-line="' + esc(l.id) + '"><circle cx="' + R.x + '" cy="' + R.y + '" r="' + R_T + '" fill="' + l._color + '"/>' +
        '<text class="ctl-term-label" x="' + R.x + '" y="' + (R.y + (name.length ? -3 : fs / 3)) + '" text-anchor="middle" font-size="' + fs + '" fill="' + fg + '">' + esc(label) + '</text>' +
        (name.length ? textLines(name, R.x, R.y + (name.length > 1 ? 24 : 15), 11, 'class="ctl-term-name" text-anchor="middle" font-size="10" fill="' + fg + '"') : '') +
        '<title>' + esc(l.name || label) + '</title></g>');
    });
    // Stations
    L.pos.forEach(function (P, id) {
      var p = P.p, x = P.x, y = P.y, c = P.line._color, h = '', st = per.get(P.line.id).st;
      if (p._cover) { st.push(drawCover(P, id, G, img)); return; }
      var pic = p.mapImage && p.images[0];
      if (pic) {
        h += '<image href="' + esc(img(pic.src)) + '" x="' + (x - 10) + '" y="' + (y - 84) + '" width="' + (SP - 24) + '" height="62" preserveAspectRatio="xMinYMax meet"/>';
      } else {
        h += textLines(wrap(p.title || 'Untitled', Math.floor((SP - 16) / 10), 3), x - 10, y - 24, 21, 'class="ctl-st-title" font-size="18"');
      }
      var date = pointDate(p).toUpperCase(), max = Math.floor((SP - 34) / 7.3);
      if (date) h += '<text class="ctl-st-date" x="' + (x + R_ST + 6) + '" y="' + (y + 3.6) + '" font-size="11.5" fill="' + c + '">' + esc(date.length > max ? date.slice(0, max - 1) + '…' : date) + ' »</text>';
      if (p.caption) h += textLines(wrap(p.caption, Math.floor((SP - 12) / 7.1), 2), x - 10, y + 31 + (wrap(p.caption, Math.floor((SP - 12) / 7.1), 2).length - 1) * 16, 16, 'class="ctl-st-cap" font-size="13.5" fill="' + c + '"');
      st.push('<g class="ctl-st" data-id="' + esc(id) + '" tabindex="0" role="button" aria-label="' + esc((p.title || 'Untitled') + (date ? ', ' + pointDate(p, true) : '')) + '" style="--c:' + c + '">' +
        '<circle class="ctl-hit" cx="' + x + '" cy="' + y + '" r="20"/>' + h +   // small click zone: the ring, plus the station's own text
        '<circle class="ctl-halo" cx="' + x + '" cy="' + y + '" r="' + (R_ST + 7) + '"/>' +
        '<circle class="ctl-ring" cx="' + x + '" cy="' + y + '" r="' + R_ST + '" stroke="' + c + '"/></g>');
    });
    per.forEach(function (g, id) {
      out.push('<g class="ctl-lineg" data-line="' + esc(id) + '">' + g.tracks.join('') + g.term + g.st.join('') + '</g>');
    });
    out.push('<path class="ctl-dragline" d=""/>');   // editor: the line that follows the pointer while connecting
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
        '<div class="ctl-player" role="group" aria-label="Music player" hidden>' +
          '<button type="button" class="ctl-pbtn" data-mp="prev" aria-label="Previous track" title="Previous track">' + ICON.prevTrack + '</button>' +
          '<button type="button" class="ctl-pbtn ctl-pbtn-main" data-mp="play" aria-label="Play" title="Play">' + ICON.play + '</button>' +
          '<button type="button" class="ctl-pbtn" data-mp="next" aria-label="Next track" title="Next track">' + ICON.nextTrack + '</button>' +
          '<div class="ctl-track" title="">' +
            '<div class="ctl-track-text"><span class="ctl-track-name"></span></div>' +
            '<div class="ctl-track-bar" role="slider" aria-label="Position in the track" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><i></i></div>' +
          '</div>' +
          '<div class="ctl-vol">' +
            '<button type="button" class="ctl-pbtn" data-mp="mute" aria-label="Mute" title="Mute">' + ICON.vol + '</button>' +
            '<input type="range" class="ctl-vol-range" min="0" max="100" step="1" value="80" aria-label="Volume" title="Volume">' +
          '</div>' +
        '</div>' +
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
    this.player = $('.ctl-player');
    this._buildPlayer();
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
    // Editor only: clicking a kind in the legend opens that kind's settings
    this.legend.addEventListener('click', function (e) {
      var k = e.target.closest('[data-type]');
      if (k && self.opts.editable && self.opts.onKindClick) self.opts.onKindClick(k.getAttribute('data-type'));
    });
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
      if (self._dragged) return;
      if (g) { self._selectLine(null); self._selectLink(null); self.select(g.dataset.id === self.selected && self.opts.panel ? null : g.dataset.id, { pan: false }); return; }
      var ed = self.opts.editable;
      // Editor only: clicking a line's circle or track selects the line (so its circle can be dragged) and opens its settings
      var lg = e.target.closest('.ctl-term, .ctl-track, .ctl-startg');
      if (lg) {
        if (!ed) return;
        var lineId = lg.closest('[data-line]').getAttribute('data-line');
        if (self.selected) self.select(null, { silent: true });
        self._selectLink(null);
        self._selectLine(lineId);
        if (self.opts.onLineClick) self.opts.onLineClick(lineId);
        return;
      }
      // Editor only: clicking a dashed link opens that connection's settings
      var lk = e.target.closest('.ctl-link');
      if (lk) {
        if (!ed) return;
        self._selectLine(null);
        if (self.selected) self.select(null, { silent: true });
        self._selectLink(lk.dataset.c);   // a straight link now shows handles on its corners
        if (self.opts.onLinkClick) self.opts.onLinkClick(lk.dataset.c);
        return;
      }
      if (e.target.closest('.ctl-bend')) return;
      // Empty space: unselect
      self._selectLine(null);
      self._selectLink(null);
      if (self.selected) self.select(null);
    });
    // Editor only: double-click a line's circle to add a point to that line;
    // on a selected straight link, double-click a corner to remove it, or the link itself to add a corner there.
    this.svg.addEventListener('dblclick', function (e) {
      if (!self.opts.editable) return;
      var t = e.target.closest('.ctl-term');
      if (t && self.opts.onAddToLine) { e.preventDefault(); self.opts.onAddToLine(t.getAttribute('data-line')); return; }
      var bend = e.target.closest('.ctl-bend'), T = self._bendTarget();
      var save = T && (T.kind === 'link' ? self.opts.onMoveBends : self.opts.onMoveStartBends);
      if (!T || !save) return;
      var bends = T.geo.corners.map(function (q) { return [q[0], q[1]]; });
      var onPath = T.kind === 'link' ? e.target.closest('.ctl-link.is-selected') : e.target.closest('.ctl-startg.is-selected');
      if (bend) {
        bends.splice(+bend.getAttribute('data-i'), 1);
      } else if (onPath) {
        var w = self._toWorld(e), pts = T.geo.pts, best = 0, bestD = Infinity;
        for (var i = 0; i < pts.length - 1; i++) {   // the segment nearest the double-click
          var dd = segDist(w, pts[i], pts[i + 1]);
          if (dd < bestD) { bestD = dd; best = i; }
        }
        bends.splice(best, 0, [Math.round(w[0] / 10) * 10, Math.round(w[1] / 10) * 10]);
      } else return;
      e.preventDefault();
      save(T.id, bends);
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
    // iPhone browsers ignore parts of touch-action, so claim map drags explicitly. This stops the page
    // bouncing and Chrome's pull-to-refresh from kicking in while exploring. An embedded (not full-window)
    // map only claims pinches, so one-finger vertical swipes still scroll the page around it.
    var claimTouch = function (e) {
      if (self.viewMode !== 'map') return;
      if (root.classList.contains('ctl-full') || e.touches.length > 1) e.preventDefault();
    };
    this.svg.addEventListener('touchmove', claimTouch, { passive: false });
    this.panel.addEventListener('touchmove', function (e) {
      if (e.target.closest('.ctl-grab, .ctl-panel-top')) e.preventDefault();   // dragging the sheet handle
    }, { passive: false });
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
    if (this.opts.display) this.data.settings.display = this.opts.display;   // data-display="covers" on the page wins
    this.root.classList.toggle('ctl-covers', this.data.settings.display === 'covers');
    this.L = layout(this.data);
    this.world.innerHTML = drawMap(this.data, this.L, function (src) { return self._img(src); });
    this._dateBacks();
    this._loadPlaylist();
    this._renderBackground();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { self._dateBacks(); self._placePlayer(true); });  // widths change once the font arrives
    this.emptyEl.hidden = this.data.points.length > 0;
    var used = new Set(this.data.connections.filter(function (c) {
      return self.data.byId.get(c.from)._line !== self.data.byId.get(c.to)._line;
    }).map(function (c) { return c._type; }));
    this.legend.innerHTML = this.data.types.filter(function (t) { return used.has(t.id); }).map(function (t) {
      return '<span data-type="' + esc(t.id) + '" title="' + esc(t.description || '') + '">' + kindSample(t) + esc(t.name) + '</span>';
    }).join('') + '<span class="ctl-hint">' + (this.opts.editable
      ? 'Double-click a main point (big circle) to add an entry to it · click a main point, then drag it to move it · click a station, then drag it onto another to connect them'
      : this.hint) + '</span>';
    this.root.classList.toggle('ctl-editable', !!this.opts.editable);
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
    // encode each folder / file name, so names with spaces, "#" or "?" still load
    return (this.opts.base != null ? this.opts.base : SCRIPT_BASE) + String(src).split('/').map(function (part) {
      try { part = decodeURIComponent(part); } catch (e) { /* not encoded */ }
      return encodeURIComponent(part);
    }).join('/');
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
    else this._dateBacks();
  };

  // Put a solid block behind each date so the line stops cleanly around the text.
  P._dateBacks = function () {
    this.world.querySelectorAll('.ctl-date-bg').forEach(function (r) { r.remove(); });
    this.world.querySelectorAll('.ctl-st-date, .ctl-link-note, .ctl-start-note').forEach(function (t) {
      var b;
      try { b = t.getBBox(); } catch (e) { return; }
      if (!b || !b.width) return;   // not drawn yet (e.g. list view is showing); redone on the next render
      var r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('class', 'ctl-date-bg');
      r.setAttribute('x', r1(b.x - 5));
      r.setAttribute('y', r1(b.y - 1));
      r.setAttribute('width', r1(b.width + 10));
      r.setAttribute('height', r1(b.height + 2));
      t.parentNode.insertBefore(r, t);
    });
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
    if (this.selectedLine && !d.lineById.has(this.selectedLine)) this.selectedLine = null;
    this._selectLine(this.opts.editable ? this.selectedLine : null);
    if (this.selectedLink && !d.connections.some(function (c) { return c.id === self.selectedLink; })) this.selectedLink = null;
    this._selectLink(this.opts.editable ? this.selectedLink : null);
  };

  // ---------- view ----------
  P._apply = function () {
    var v = this.v, L = this.L, W = this.W, H = this.H, mw = L.width * v.s, mh = L.height * v.s;
    v.tx = mw <= W ? clamp(v.tx, -20, W - mw + 20) : clamp(v.tx, W - mw - 60, 60);
    v.ty = mh <= H ? clamp(v.ty, -20, Math.max(H - mh + 20, 44)) : clamp(v.ty, H - mh - 60, 60);
    this.world.setAttribute('transform', 'translate(' + r1(v.tx) + ' ' + r1(v.ty) + ') scale(' + Math.round(v.s * 1000) / 1000 + ')');
    this._placePlayer();
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
      s = W < 640 ? 1 : clamp(W / L.width, 1, 1);
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
    // Editor only: a line's circle drags the whole line; a station drags out a new connection.
    if (this.opts.editable && this.viewMode === 'map' && !this.pointers.size) {
      var bend = e.target.closest('.ctl-bend'), BT = bend && this._bendTarget();
      if (BT) {   // dragging a corner of the selected straight link or drop line
        this.edit = { kind: 'bend', tkind: BT.kind, id: BT.id, idx: +bend.getAttribute('data-i'), pid: e.pointerId, x: e.clientX, y: e.clientY, moved: false,
          bends: BT.geo.corners.map(function (q) { return [q[0], q[1]]; }) };
        this._dragged = false;
        return;
      }
      var term = e.target.closest('.ctl-term'), st = !term && e.target.closest('.ctl-st');
      if (st && st.dataset.id !== this.selected) st = null;   // connect only from the selected station; others pan the map
      if (term && term.getAttribute('data-line') !== this.selectedLine) term = null;   // move only a selected line; others pan the map
      if (term || st) {
        this.edit = { kind: term ? 'line' : 'link', id: term ? term.dataset.line : st.dataset.id, pid: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
        this._dragged = false;
        return;
      }
    }
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
    if (this.edit && this.edit.pid === e.pointerId) { this._editMove(e); return; }
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
  // Where each line's circle currently sits (the editor uses this to pin lines in place).
  P.linePositions = function () {
    var o = {};
    (this.L ? this.L.lines : []).forEach(function (R) { o[R.line.id] = { x: Math.round(R.x), y: Math.round(R.y) }; });
    return o;
  };

  // ---------- background video ----------
  // settings.background = { webm: "video/bg.webm", mp4: "video/bg.mp4", still: "video/bg-still.jpg", dim: 0.55 }
  // The video sits behind the map; a layer of the timeline's background colour (dim = how opaque) keeps everything readable.
  P._renderBackground = function () {
    var b = this.data.settings.background, st = this.stage, old = st.querySelector('.ctl-bgv'), self = this;
    if (!b || !(b.webm || b.mp4 || b.still)) {
      if (old) old.parentNode.removeChild(old);
      this.root.classList.remove('ctl-has-bg');
      return;
    }
    var key = JSON.stringify(b);
    if (old && old.getAttribute('data-key') === key) return;   // unchanged: keep playing
    if (old) old.parentNode.removeChild(old);
    // a still picture only, for people who asked for less motion or to save data
    var still = reducedMotion() || (navigator.connection && navigator.connection.saveData) || !(b.webm || b.mp4);
    var wrap = document.createElement('div');
    wrap.className = 'ctl-bgv';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.setAttribute('data-key', key);
    if (still) {
      if (b.still) wrap.innerHTML = '<img src="' + esc(this._img(b.still)) + '" alt="">';
    } else {
      wrap.innerHTML = '<video muted autoplay loop playsinline preload="auto" disablepictureinpicture' + (b.still ? ' poster="' + esc(this._img(b.still)) + '"' : '') + '>' +
        (b.webm ? '<source src="' + esc(this._img(b.webm)) + '" type="video/webm">' : '') +
        (b.mp4 ? '<source src="' + esc(this._img(b.mp4)) + '" type="video/mp4">' : '') + '</video>';
      var v = wrap.querySelector('video');
      v.muted = true;   // must be set in script too, or some browsers refuse to autoplay
      var play = function () { var p = v.play(); if (p && p.catch) p.catch(function () { /* stays on the still */ }); };
      play();
      if (!this._bgVisHook) {   // pause while the tab is hidden, to save battery
        this._bgVisHook = true;
        document.addEventListener('visibilitychange', function () {
          var vid = self.stage.querySelector('.ctl-bgv video');
          if (!vid) return;
          if (document.hidden) vid.pause(); else { var p = vid.play(); if (p && p.catch) p.catch(function () {}); }
        });
      }
    }
    var tint = document.createElement('i');
    tint.style.opacity = String(clamp(b.dim != null ? +b.dim : 0.55, 0, 1));
    wrap.appendChild(tint);
    st.insertBefore(wrap, st.firstChild);
    this.root.classList.add('ctl-has-bg');
  };

  // ---------- music player ----------
  // Tracks come from "music" in the data: [{ src: "music/file.flac", title, artist, album, ... }].
  P._buildPlayer = function () {
    var self = this, pl = this.player, bar = pl.querySelector('.ctl-track-bar');
    this.audio = new Audio();
    this.audio.preload = 'none';   // nothing downloads until someone presses play
    this.trackIdx = 0;
    this._errors = 0;
    pl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-mp]');
      if (!b) return;
      if (b.dataset.mp === 'play') self.togglePlay();
      else if (b.dataset.mp === 'mute') { self.audio.muted = !self.audio.muted; self._volState(); }
      else self.skip(b.dataset.mp === 'next' ? 1 : -1);
    });
    // Volume: remembered in this browser for next time
    var range = pl.querySelector('.ctl-vol-range'), saved = null;
    try { saved = global.localStorage.getItem('ctl-volume'); } catch (e) { /* storage blocked */ }
    this.audio.volume = saved != null && isFinite(+saved) ? clamp(+saved, 0, 1) : 0.8;
    range.value = String(Math.round(this.audio.volume * 100));
    range.addEventListener('input', function () {
      self.audio.volume = +range.value / 100;
      self.audio.muted = +range.value === 0;
      try { global.localStorage.setItem('ctl-volume', String(self.audio.volume)); } catch (e) { /* storage blocked */ }
      self._volState();
    });
    // iPhones and iPads only allow the hardware buttons to set the volume, so show just the mute button there
    var probe = new Audio();
    probe.volume = 0.5;
    if (probe.volume !== 0.5) range.hidden = true;
    this._volState();
    var seek = function (e) {
      var a = self.audio, r = bar.getBoundingClientRect();
      if (a.duration) a.currentTime = clamp((e.clientX - r.left) / r.width, 0, 1) * a.duration;
    };
    bar.addEventListener('click', seek);
    bar.addEventListener('keydown', function (e) {
      var a = self.audio;
      if (!a.duration || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
      a.currentTime = clamp(a.currentTime + (e.key === 'ArrowRight' ? 5 : -5), 0, a.duration);
      e.preventDefault();
      e.stopPropagation();
    });
    this.audio.addEventListener('timeupdate', function () { self._progress(); });
    this.audio.addEventListener('play', function () { self._errors = 0; self._playState(); });
    this.audio.addEventListener('pause', function () { self._playState(); });
    this.audio.addEventListener('ended', function () { self.skip(1, true); });
    this.audio.addEventListener('error', function () {
      if (!self.tracks || !self.tracks.length || !self.audio.getAttribute('src')) return;
      self._errors++;
      if (self._errors < self.tracks.length) self.skip(1, true);   // skip a file that won't play
      else { self._errors = 0; self._playState(); self.player.querySelector('.ctl-track-name').textContent = 'Can’t play these files'; }
    });
  };

  P._loadPlaylist = function () {
    var s = this.data.settings, raw = this._raw || {};
    var list = (Array.isArray(raw.music) ? raw.music : []).filter(function (t) { return t && t.src; });
    this.tracks = list;
    var show = list.length > 0 && s.player !== false;
    this.player.hidden = !show;
    if (!show) { if (!this.audio.paused) this.audio.pause(); return; }
    if (this.trackIdx >= list.length) this.trackIdx = 0;
    if (this._curSrc !== list[this.trackIdx].src) this._setTrack(this.trackIdx, !this.audio.paused);
    else this._showTrack();
    this._placePlayer(true);
  };

  P._setTrack = function (i, play) {
    var n = this.tracks.length;
    if (!n) return;
    this.trackIdx = ((i % n) + n) % n;
    var t = this.tracks[this.trackIdx];
    this._curSrc = t.src;
    this.audio.src = this._img(t.src);
    this._showTrack();
    this._progress();
    if (play) this.audio.play().catch(function () { /* the browser wants a click first */ });
    else this._playState();
  };

  P._showTrack = function () {
    var t = this.tracks[this.trackIdx], box = this.player.querySelector('.ctl-track'), name = this.player.querySelector('.ctl-track-name');
    var title = t.title || String(t.src).split('/').pop().replace(/\.[^.]+$/, '');
    name.textContent = title + (t.artist ? ' — ' + t.artist : '');
    box.title = [title, t.artist, t.album, t.format].filter(Boolean).join('\n') + (this.tracks.length > 1 ? '\nTrack ' + (this.trackIdx + 1) + ' of ' + this.tracks.length : '');
    // long names scroll slowly back and forth inside the box
    box.classList.remove('is-long');
    var over = name.scrollWidth - box.querySelector('.ctl-track-text').clientWidth;
    if (over > 4) { box.classList.add('is-long'); box.style.setProperty('--ctl-shift', -(over + 8) + 'px'); }
  };

  P._playState = function () {
    var b = this.player.querySelector('[data-mp="play"]'), playing = !this.audio.paused;
    b.innerHTML = playing ? ICON.pause : ICON.play;
    b.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    b.title = playing ? 'Pause' : 'Play';
    this.player.classList.toggle('is-playing', playing);
  };

  P._volState = function () {
    var a = this.audio, b = this.player.querySelector('[data-mp="mute"]'), range = this.player.querySelector('.ctl-vol-range');
    var silent = a.muted || a.volume === 0;
    b.innerHTML = silent ? ICON.mute : a.volume < 0.5 ? ICON.volLow : ICON.vol;
    b.setAttribute('aria-label', silent ? 'Unmute' : 'Mute');
    b.title = silent ? 'Unmute' : 'Mute';
    range.style.setProperty('--ctl-vol', (silent ? 0 : Math.round(a.volume * 100)) + '%');
    this.player.classList.toggle('is-muted', silent);
  };

  P._progress = function () {
    var a = this.audio, k = a.duration ? a.currentTime / a.duration : 0, bar = this.player.querySelector('.ctl-track-bar');
    bar.firstChild.style.width = (k * 100).toFixed(2) + '%';
    bar.setAttribute('aria-valuenow', String(Math.round(k * 100)));
  };

  P.togglePlay = function () {
    if (!this.tracks || !this.tracks.length) return;
    if (!this.audio.getAttribute('src')) this._setTrack(this.trackIdx, false);
    if (this.audio.paused) this.audio.play().catch(function () { /* blocked or unplayable: the error handler reports it */ });
    else this.audio.pause();
  };

  P.skip = function (dir, auto) {
    if (!this.tracks || !this.tracks.length) return;
    var a = this.audio;
    // "previous" first rewinds the current track, like most players
    if (dir < 0 && !auto && a.currentTime > 3) { a.currentTime = 0; return; }
    this._setTrack(this.trackIdx + dir, auto || !a.paused);
  };

  // Keep the player just right of the big title (or under it when there's no room), moving with the map.
  P._placePlayer = function (measure) {
    if (!this.player || this.player.hidden || !this.L) return;
    if (measure || this._titleBox === undefined) {
      var t = this.world.querySelector('.ctl-maptitle');
      try { this._titleBox = t ? t.getBBox() : null; } catch (e) { this._titleBox = null; }
    }
    var v = this.v, bb = this._titleBox, pw = this.player.offsetWidth || 330, ph = this.player.offsetHeight || 40, x = 12, y = 12;
    if (bb && bb.width) {
      x = v.tx + (bb.x + bb.width + 28) * v.s;
      y = v.ty + (bb.y + bb.height / 2) * v.s - ph / 2;
      if (x + pw > this.W - 8) { x = v.tx + bb.x * v.s; y = v.ty + (bb.y + bb.height + 6) * v.s; }   // no room beside it
    }
    this.player.style.transform = 'translate(' + r1(x) + 'px,' + r1(y) + 'px)';
  };

  // Pointer position in map coordinates.
  P._toWorld = function (e) {
    var r = this.svg.getBoundingClientRect();
    return [(e.clientX - r.left - this.v.tx) / this.v.s, (e.clientY - r.top - this.v.ty) / this.v.s];
  };

  // Everything needed to redraw one link.
  P._linkParts = function (cid, bends) {
    var d = this.data, c = d.connections.find(function (x) { return x.id === cid; });
    if (!c || !this.L) return null;
    var a = this.L.pos.get(c.from), b = this.L.pos.get(c.to);
    if (!a || !b || a.line === b.line) return null;
    return { c: c, a: a, b: b, t: d.typeById.get(c._type), geo: linkGeom(c, a, b, d.settings, this.L.G, bends) };
  };

  // Editor: select a link; a straight one shows a draggable handle on each corner.
  P._selectLink = function (cid) {
    this.selectedLink = cid || null;
    var sel = this.selectedLink;
    this.world.querySelectorAll('.ctl-link').forEach(function (g) { g.classList.toggle('is-selected', g.dataset.c === sel); });
    this._refreshHandles();
  };

  // What the corner handles belong to: the selected straight link, or the straight drop line of the selected main point.
  P._bendTarget = function (bends) {
    if (!this.opts.editable || !this.L) return null;
    if (this.selectedLink) {
      var parts = this._linkParts(this.selectedLink, bends);
      return parts && parts.geo.straight ? { kind: 'link', id: this.selectedLink, geo: parts.geo, parts: parts } : null;
    }
    var id = this.selectedLine, R = id && this.L.lines.find(function (x) { return x.line.id === id; });
    if (R && R.start) {
      var geo = startGeom(R, this.L.G, this.data.settings, bends);
      if (geo.straight) return { kind: 'start', id: id, geo: geo, R: R };
    }
    return null;
  };
  P._redrawBendTarget = function (T) {
    var g = null;
    this.world.querySelectorAll(T.kind === 'link' ? '.ctl-link' : '.ctl-startg').forEach(function (x) {
      if ((T.kind === 'link' ? x.dataset.c : x.getAttribute('data-line')) === T.id) g = x;
    });
    if (g) g.innerHTML = T.kind === 'link' ? linkInner(T.parts.c, T.parts.t, T.geo, this.data.settings, T.parts.a, T.parts.b) : startInner(T.R, T.geo);
  };
  P._refreshHandles = function () {
    var T = this._bendTarget();
    this._drawHandles(T ? T.geo.corners : null);
  };
  P._drawHandles = function (corners) {
    var old = this.world.querySelector('.ctl-bends');
    if (old) old.parentNode.removeChild(old);
    if (!corners) return;
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'ctl-bends');
    g.innerHTML = corners.map(function (q, i) {
      return '<circle class="ctl-bend" data-i="' + i + '" cx="' + r1(q[0]) + '" cy="' + r1(q[1]) + '" r="8"><title>Drag to move this corner · double-click to remove it</title></circle>';
    }).join('');
    this.world.appendChild(g);
  };

  // Editor: the selected line's circle gets a highlight and can be dragged.
  P._selectLine = function (id) {
    this.selectedLine = id || null;
    var sel = this.selectedLine;
    this.world.querySelectorAll('.ctl-term').forEach(function (t) { t.classList.toggle('is-selected', t.getAttribute('data-line') === sel); });
    this.world.querySelectorAll('.ctl-startg').forEach(function (g) { g.classList.toggle('is-selected', g.getAttribute('data-line') === sel); });
    this._refreshHandles();
  };

  // ---------- editor dragging ----------
  P._lineGroup = function (id) {
    var found = null;
    this.world.querySelectorAll('.ctl-lineg').forEach(function (g) { if (g.getAttribute('data-line') === id) found = g; });
    return found;
  };
  P._stationAt = function (e) {
    var hit = document.elementFromPoint(e.clientX, e.clientY);
    return hit && hit.closest ? hit.closest('.ctl-st') : null;
  };
  P._editMove = function (e) {
    var E = this.edit, dx = e.clientX - E.x, dy = e.clientY - E.y, s = this.v.s;
    if (!E.moved) {
      if (Math.hypot(dx, dy) < 5) return;
      E.moved = true;
      this._dragged = true;
      try { this.svg.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      this.svg.classList.add(E.kind === 'line' ? 'is-moving-line' : 'is-linking');
      this.tip.hidden = true;
    }
    if (E.kind === 'line') {
      var g = this._lineGroup(E.id);
      if (g) g.setAttribute('transform', 'translate(' + r1(dx / s) + ' ' + r1(dy / s) + ')');
      return;
    }
    if (E.kind === 'bend') {
      var w = this._toWorld(e), wx = Math.round(w[0] / 10) * 10, wy = Math.round(w[1] / 10) * 10;
      var T = this._bendTarget(E.bends);
      if (!T) return;
      // line up with the neighbouring corners (or the ends) so right angles are easy
      var pts = T.geo.pts, prev = pts[E.idx], next = pts[E.idx + 2], snap = 12 / s;
      [prev, next].forEach(function (q) {
        if (!q) return;
        if (Math.abs(w[0] - q[0]) < snap) wx = q[0];
        if (Math.abs(w[1] - q[1]) < snap) wy = q[1];
      });
      E.bends[E.idx] = [wx, wy];
      T = this._bendTarget(E.bends);
      this._redrawBendTarget(T);
      this._drawHandles(T.geo.corners);
      return;
    }
    var P0 = this.L.pos.get(E.id), r = this.svg.getBoundingClientRect();
    var wx = (e.clientX - r.left - this.v.tx) / s, wy = (e.clientY - r.top - this.v.ty) / s;
    var dl = this.world.querySelector('.ctl-dragline');
    if (dl && P0) dl.setAttribute('d', 'M' + r1(P0.x) + ',' + r1(P0.y) + 'L' + r1(wx) + ',' + r1(wy));
    var t = this._stationAt(e);
    this.world.querySelectorAll('.ctl-st.is-drop').forEach(function (x) { x.classList.remove('is-drop'); });
    if (t && t.dataset.id !== E.id) t.classList.add('is-drop');
  };
  P._editEnd = function (e) {
    var E = this.edit, self = this, s = this.v.s;
    this.edit = null;
    this.svg.classList.remove('is-moving-line', 'is-linking');
    var dl = this.world.querySelector('.ctl-dragline');
    if (dl) dl.setAttribute('d', '');
    this.world.querySelectorAll('.ctl-st.is-drop').forEach(function (x) { x.classList.remove('is-drop'); });
    setTimeout(function () { self._dragged = false; }, 0);
    if (!E.moved) return;
    var cancelled = e.type === 'pointercancel';
    if (E.kind === 'bend') {
      var save = E.tkind === 'link' ? this.opts.onMoveBends : this.opts.onMoveStartBends;
      if (!cancelled && save) save(E.id, E.bends);
      else this.refresh();
      return;
    }
    if (E.kind === 'line') {
      var R = this.L.lines.find(function (x) { return x.line.id === E.id; });
      var g = this._lineGroup(E.id);
      if (cancelled || !R || !this.opts.onMoveLine) { if (g) g.removeAttribute('transform'); return; }
      // snap to a 10px grid so lines line up easily
      var nx = Math.max(R_T + 10, Math.round((R.x + (e.clientX - E.x) / s) / 10) * 10);
      var ny = Math.max(R_T + 10, Math.round((R.y + (e.clientY - E.y) / s) / 10) * 10);
      this.opts.onMoveLine(E.id, { x: nx, y: ny });
    } else if (!cancelled) {
      var t = this._stationAt(e);
      if (t && t.dataset.id !== E.id && this.opts.onConnect) this.opts.onConnect(E.id, t.dataset.id);
    }
  };

  P._up = function (e) {
    if (this.edit && this.edit.pid === e.pointerId) { this._editEnd(e); return; }
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
    var editChanged = 'editable' in o && !!o.editable !== !!this.opts.editable;
    Object.assign(this.opts, o);
    if (editChanged) this.refresh();
    if (!this.opts.panel) this._closePanel(); else if (this.selected) this._renderPanel();
  };
  P.refresh = function () { this.setData(this._raw, {}); };
  P.destroy = function () {
    if (this.audio) { this.audio.pause(); this.audio.removeAttribute('src'); }
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
      el._ctl = mount(el, data, {
        height: el.getAttribute('data-height') || null,
        theme: el.getAttribute('data-theme') || null,
        display: el.getAttribute('data-display') || null
      });
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
