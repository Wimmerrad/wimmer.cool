/*! Animated tab icon.
 * Firefox plays images/favicon.gif by itself. Chrome and Edge only show a GIF's first frame, so this
 * script flips the tab icon through the frames in images/favicon-frames.png (one row of 32x32 frames).
 * Safari keeps the first frame.
 *
 * Usage: <script src="timeline/favicon.js"></script>   (best inside <head>)
 * To use another GIF, remake both image files and update FRAMES and DELAY below.
 */
(function () {
  'use strict';
  var cs = document.currentScript;
  var base = cs && cs.src ? cs.src.replace(/[?#].*$/, '').replace(/[^\/]*$/, '') : 'timeline/';
  var GIF = base + 'images/favicon.gif';
  var STRIP = base + 'images/favicon-frames.png';
  var FRAMES = 19, SIZE = 32, DELAY = 40;   // the original GIF: 19 frames, 25 per second

  // Use one icon link, creating it if the page has none.
  var links = document.querySelectorAll('link[rel~="icon"]');
  for (var i = 1; i < links.length; i++) links[i].parentNode.removeChild(links[i]);
  var link = links[0];
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    (document.head || document.documentElement).appendChild(link);
  }
  link.type = 'image/gif';
  link.href = GIF;

  var firefox = /firefox/i.test(navigator.userAgent);
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (firefox || still) return;   // Firefox animates the GIF itself; reduced motion keeps it still

  var strip = new Image();
  strip.onload = function () {
    var c = document.createElement('canvas'), ctx = c.getContext('2d'), frames = [];
    c.width = c.height = SIZE;
    try {
      for (var f = 0; f < FRAMES; f++) {
        ctx.clearRect(0, 0, SIZE, SIZE);
        ctx.drawImage(strip, f * SIZE, 0, SIZE, SIZE, 0, 0, SIZE, SIZE);
        frames.push(c.toDataURL('image/png'));
      }
    } catch (e) {
      return;   // e.g. a page opened straight from disk: the browser blocks this, so the first frame stays
    }
    link.type = 'image/png';
    var n = 0;
    setInterval(function () {
      if (document.hidden) return;   // no need to animate a tab nobody is looking at
      n = (n + 1) % FRAMES;
      link.href = frames[n];
    }, DELAY);
  };
  strip.src = STRIP;
})();
