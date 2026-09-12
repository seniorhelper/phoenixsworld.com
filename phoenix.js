/* ==========================================================================
   phoenix.js — Princess Phoenix Sparkles, guide for PhoenixsWorld.com

   To put her on any page:
       <link rel="stylesheet" href="css/phoenix.css">
       <div id="phoenix"></div>
       <script src="js/phoenix.js"></script>

   She is rule-based on purpose. She can only say what is written in this
   file, so she cannot invent a fact, make a promise, or say anything
   unsuitable for a child. Nothing is collected, stored or sent. The age
   register is one variable that dies when the tab closes.

   Faces live at images/face-happy.jpg, face-talk.jpg, face-silly.jpg.
   The clip path and rotation are tuned to those exact crops — swapping in
   new photos means re-tracing the outline.
   ========================================================================== */
(function(){
  var D = document, host = D.getElementById('phoenix');
  if (!host) return;

  var SVG = "<svg class=\"pcat\" id=\"pcat\" viewBox=\"0 0 500 880\" aria-label=\"Princess Phoenix Sparkles, your guide\">\n  <defs>\n    <!-- an egg-shaped face mask: wide at the cheeks, narrow at the chin.\n         The photo is cropped to her face only, and the drawn hair overlaps\n         every edge of it, so there is no ring and no background. -->\n    <clipPath id=\"faceHole\">\n      <path d=\"M256 286\n               C 210 288 150 320 126 373 C 110 410 110 425 114 448\n               C 118 490 122 505 134 528 C 148 560 160 592 184 608\n               C 202 628 224 642 246 640 C 270 640 292 624 314 606\n               C 338 588 350 556 361 528 C 374 500 382 472 386 448\n               C 390 420 388 386 378 358 C 368 330 320 288 256 286 Z\"/>\n    </clipPath>\n    <linearGradient id=\"strawb\" x1=\"0\" y1=\"0\" x2=\"0.25\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#fff4d2\"/><stop offset=\"28%\" stop-color=\"#ffdf9a\"/>\n      <stop offset=\"62%\" stop-color=\"#f3c368\"/><stop offset=\"100%\" stop-color=\"#d9a248\"/></linearGradient>\n    <linearGradient id=\"strawb2\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#fff8e4\"/><stop offset=\"100%\" stop-color=\"#ffdf9a\"/></linearGradient>\n    <linearGradient id=\"gown\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#ffb3dd\"/><stop offset=\"42%\" stop-color=\"#f778c0\"/>\n      <stop offset=\"100%\" stop-color=\"#bf3488\"/></linearGradient>\n    <linearGradient id=\"gown2\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#ffe6f5\"/><stop offset=\"100%\" stop-color=\"#ffc2e4\"/></linearGradient>\n    <linearGradient id=\"bodice\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#a45cff\"/><stop offset=\"100%\" stop-color=\"#6b34d4\"/></linearGradient>\n    <linearGradient id=\"hatg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#cfa8ff\"/><stop offset=\"48%\" stop-color=\"#9a5cf0\"/>\n      <stop offset=\"100%\" stop-color=\"#5f2bc4\"/></linearGradient>\n    <linearGradient id=\"gold\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#ffe9a8\"/><stop offset=\"50%\" stop-color=\"#ffd84d\"/>\n      <stop offset=\"100%\" stop-color=\"#d79b12\"/></linearGradient>\n    <linearGradient id=\"ribbon\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#ff9ed2\"/><stop offset=\"100%\" stop-color=\"#e0398f\"/></linearGradient>\n    <radialGradient id=\"glow\" cx=\"50%\" cy=\"50%\" r=\"50%\">\n      <stop offset=\"0%\" stop-color=\"rgba(255,216,77,.95)\"/>\n      <stop offset=\"100%\" stop-color=\"rgba(255,216,77,0)\"/></radialGradient>\n  </defs>\n\n  <g opacity=\".2\" fill=\"#8b6bb5\">\n    <rect x=\"26\" y=\"636\" width=\"36\" height=\"98\"/><path d=\"M22 636 h44 l-9 -20 h-26 z\"/>\n    <path d=\"M44 586 l17 28 h-34 z\"/>\n    <rect x=\"66\" y=\"664\" width=\"48\" height=\"70\"/>\n    <rect x=\"436\" y=\"644\" width=\"34\" height=\"90\"/><path d=\"M432 644 h42 l-8 -18 h-26 z\"/>\n    <path d=\"M453 600 l16 26 h-32 z\"/>\n    <rect x=\"392\" y=\"670\" width=\"44\" height=\"64\"/>\n  </g>\n\n  <ellipse cx=\"250\" cy=\"846\" rx=\"140\" ry=\"18\" fill=\"#8b6bb5\" opacity=\".22\"/>\n\n  <g class=\"p-body\">\n    <g class=\"p-tail\">\n      <path d=\"M352 740 C 424 722 452 650 420 598\" fill=\"none\" stroke=\"#33234a\" stroke-width=\"28\" stroke-linecap=\"round\"/>\n      <path d=\"M352 740 C 424 722 452 650 420 598\" fill=\"none\" stroke=\"url(#strawb)\" stroke-width=\"18\" stroke-linecap=\"round\"/>\n      <path d=\"M410 618 q11 -7 20 2\" stroke=\"#b25a2c\" stroke-width=\"6\" fill=\"none\" stroke-linecap=\"round\"/>\n      <path d=\"M402 652 q11 -7 20 2\" stroke=\"#b25a2c\" stroke-width=\"6\" fill=\"none\" stroke-linecap=\"round\"/>\n      <path d=\"M386 690 q11 -7 20 2\" stroke=\"#b25a2c\" stroke-width=\"6\" fill=\"none\" stroke-linecap=\"round\"/>\n      <circle cx=\"420\" cy=\"598\" r=\"9\" fill=\"#ffd0e8\" stroke=\"#33234a\" stroke-width=\"4\"/>\n    </g>\n\n    <!-- gown -->\n    <path d=\"M250 646 C 302 652 326 696 340 742 C 354 792 374 832 388 854 L 112 854\n             C 126 832 146 792 160 742 C 174 696 198 652 250 646 Z\"\n      fill=\"url(#gown)\" stroke=\"#33234a\" stroke-width=\"7\" stroke-linejoin=\"round\"/>\n    <path d=\"M250 696 C 284 702 302 734 312 772 C 322 808 336 836 344 852 L 156 852\n             C 164 836 178 808 188 772 C 198 734 216 702 250 696 Z\"\n      fill=\"url(#gown2)\" opacity=\".92\"/>\n    <path d=\"M160 782 q90 30 180 0\" stroke=\"#fff\" stroke-width=\"9\" fill=\"none\" opacity=\".75\"/>\n    <path d=\"M140 822 q110 36 220 0\" stroke=\"#fff\" stroke-width=\"9\" fill=\"none\" opacity=\".6\"/>\n    <path d=\"M118 852 q16 -18 32 0 q16 -18 32 0 q16 -18 32 0 q16 -18 32 0 q16 -18 32 0\n             q16 -18 32 0 q16 -18 32 0 q16 -18 32 0\" fill=\"none\" stroke=\"#33234a\" stroke-width=\"5\"/>\n    <circle cx=\"208\" cy=\"746\" r=\"6\" fill=\"#fff\" opacity=\".85\"/>\n    <circle cx=\"292\" cy=\"766\" r=\"5\" fill=\"#fff\" opacity=\".8\"/>\n    <circle cx=\"250\" cy=\"806\" r=\"7\" fill=\"#fff\" opacity=\".7\"/>\n    <circle cx=\"180\" cy=\"812\" r=\"5\" fill=\"#fff\" opacity=\".7\"/>\n    <circle cx=\"322\" cy=\"822\" r=\"6\" fill=\"#fff\" opacity=\".65\"/>\n\n    <path d=\"M204 626 C 220 618 280 618 296 626 L 290 682 C 266 692 234 692 210 682 Z\"\n      fill=\"url(#bodice)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n    <path d=\"M236 632 L 264 644 M236 646 L 264 658 M236 660 L 264 672\"\n      stroke=\"#ffe9a8\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n    <path d=\"M250 688 l-13 22 h26 z\" fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n    <circle cx=\"250\" cy=\"624\" r=\"11\" fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"5\"/>\n\n    <ellipse cx=\"192\" cy=\"638\" rx=\"30\" ry=\"26\" fill=\"url(#gown)\" stroke=\"#33234a\" stroke-width=\"6\"/>\n    <ellipse cx=\"308\" cy=\"638\" rx=\"30\" ry=\"26\" fill=\"url(#gown)\" stroke=\"#33234a\" stroke-width=\"6\"/>\n\n    <path d=\"M182 658 C 156 678 148 696 168 712\" fill=\"none\" stroke=\"#33234a\" stroke-width=\"22\" stroke-linecap=\"round\"/>\n    <path d=\"M182 658 C 156 678 148 696 168 712\" fill=\"none\" stroke=\"#ffe1b8\" stroke-width=\"14\" stroke-linecap=\"round\"/>\n    <path d=\"M318 658 C 344 678 352 698 332 714\" fill=\"none\" stroke=\"#33234a\" stroke-width=\"22\" stroke-linecap=\"round\"/>\n    <path d=\"M318 658 C 344 678 352 698 332 714\" fill=\"none\" stroke=\"#ffe1b8\" stroke-width=\"14\" stroke-linecap=\"round\"/>\n    <g>\n      <circle cx=\"334\" cy=\"718\" r=\"18\" fill=\"#ffe1b8\" stroke=\"#33234a\" stroke-width=\"5\"/>\n      <circle cx=\"334\" cy=\"722\" r=\"7\" fill=\"#ff9ed2\"/>\n      <circle cx=\"326\" cy=\"710\" r=\"3.4\" fill=\"#ff9ed2\"/>\n      <circle cx=\"334\" cy=\"707\" r=\"3.4\" fill=\"#ff9ed2\"/>\n      <circle cx=\"342\" cy=\"710\" r=\"3.4\" fill=\"#ff9ed2\"/>\n    </g>\n\n    <g class=\"p-wand\">\n      <path d=\"M152 712 L 120 608\" stroke=\"#33234a\" stroke-width=\"12\" stroke-linecap=\"round\"/>\n      <path d=\"M152 712 L 120 608\" stroke=\"#f4f4f1\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <path class=\"p-rib1\" d=\"M124 626 C 98 640 94 668 108 686\" fill=\"none\" stroke=\"#ff9ed2\"\n        stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <path class=\"p-rib2\" d=\"M128 630 C 148 648 150 674 136 692\" fill=\"none\" stroke=\"#9ef0ff\"\n        stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <circle cx=\"120\" cy=\"598\" r=\"38\" fill=\"url(#glow)\"/>\n      <g class=\"p-star\">\n        <path d=\"M120 566 L130 590 L156 592 L136 609 L142 635 L120 621 L98 635 L104 609 L84 592 L110 590 Z\"\n          fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n      </g>\n      <circle cx=\"152\" cy=\"716\" r=\"18\" fill=\"#ffe1b8\" stroke=\"#33234a\" stroke-width=\"5\"/>\n      <circle cx=\"152\" cy=\"720\" r=\"7\" fill=\"#ff9ed2\"/>\n    </g>\n\n    <!-- \u2550\u2550\u2550 THE HEAD \u2014 her face at full size, framed by drawn hair \u2550\u2550\u2550 -->\n    <g class=\"p-head\">\n\n      <!-- long flowing locks, behind -->\n      <g class=\"p-lockL\">\n        <path d=\"M152 352 C 48 424 30 616 74 726 C 86 640 72 528 112 462\n                 C 84 552 92 648 122 716 C 124 598 128 456 178 400 Z\"\n          fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n        <path d=\"M150 372 C 74 444 62 606 100 704 C 108 622 100 520 134 456\n                 C 114 540 120 630 146 694 C 146 584 150 458 182 406 Z\"\n          fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\" opacity=\".96\"/>\n        <path d=\"M108 452 C 84 524 88 606 108 666\" fill=\"none\" stroke=\"#fff8e4\" stroke-width=\"6\" opacity=\".5\"/>\n        <path d=\"M132 470 C 114 532 118 596 134 648\" fill=\"none\" stroke=\"#fff8e4\" stroke-width=\"4\" opacity=\".35\"/>\n      </g>\n      <g class=\"p-lockR\">\n        <path d=\"M350 352 C 454 424 472 616 428 726 C 416 640 430 528 390 462\n                 C 418 552 410 648 380 716 C 378 598 374 456 324 400 Z\"\n          fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n        <path d=\"M352 372 C 428 444 440 606 402 704 C 394 622 402 520 368 456\n                 C 388 540 382 630 356 694 C 356 584 352 458 320 406 Z\"\n          fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\" opacity=\".96\"/>\n        <path d=\"M394 452 C 418 524 414 606 394 666\" fill=\"none\" stroke=\"#fff8e4\" stroke-width=\"6\" opacity=\".5\"/>\n        <path d=\"M370 470 C 388 532 384 596 368 648\" fill=\"none\" stroke=\"#fff8e4\" stroke-width=\"4\" opacity=\".35\"/>\n      </g>\n\n      <!-- cat ears, tucked closer to her head -->\n      <g class=\"p-earL\">\n        <path d=\"M146 320 L 120 214 L 214 276 Z\" fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n        <path d=\"M152 304 L 140 244 L 190 276 Z\" fill=\"#ff9ed2\"/>\n      </g>\n      <g class=\"p-earR\">\n        <path d=\"M356 320 L 382 214 L 288 276 Z\" fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n        <path d=\"M350 304 L 362 244 L 312 276 Z\" fill=\"#ff9ed2\"/>\n      </g>\n\n      <!-- her face, clipped to the traced outline -->\n      <g clip-path=\"url(#faceHole)\">\n        <image id=\"face\" x=\"87\" y=\"225\" width=\"360\" height=\"432\"\n          transform=\"rotate(4 262 463)\"\n          preserveAspectRatio=\"xMidYMid meet\" href=\"images/face-happy.jpg\"/>\n      </g>\n\n      <!-- hair laid over the top and sides, following the same outline -->\n      <path d=\"M256 268 C 168 266 120 310 106 380 C 100 414 100 434 104 458\n               C 110 400 132 352 178 326 C 214 304 300 306 336 332\n               C 382 358 396 406 400 458 C 404 432 404 408 400 380\n               C 386 308 344 268 256 268 Z\"\n        fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n      <path d=\"M174 328 C 214 348 276 352 330 332 C 308 370 224 378 174 328 Z\"\n        fill=\"url(#strawb2)\" opacity=\".92\"/>\n      <path d=\"M150 330 C 186 300 320 300 356 332 C 320 314 186 314 150 330 Z\"\n        fill=\"#fff8e4\" opacity=\".55\"/>\n      <path d=\"M198 316 C 228 334 276 336 312 322\" fill=\"none\" stroke=\"#ffe3bd\" stroke-width=\"5\" opacity=\".6\"/>\n      <path d=\"M120 444 C 114 384 138 334 178 318 C 148 350 130 396 130 452\n               C 130 502 138 546 150 574 C 126 536 118 492 120 444 Z\"\n        fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n      <path d=\"M382 444 C 388 384 364 334 324 318 C 354 350 372 396 372 452\n               C 372 502 364 546 352 574 C 376 536 384 492 382 444 Z\"\n        fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n\n      <!-- ribbons, moved out to the hair so they stop covering her cheeks -->\n      <g class=\"p-bowL\">\n        <path d=\"M124 506 C 100 486 88 506 98 524 C 108 540 124 528 124 506 Z\"\n          fill=\"url(#ribbon)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n        <path d=\"M124 506 C 148 486 160 506 150 524 C 140 540 124 528 124 506 Z\"\n          fill=\"url(#ribbon)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n        <circle cx=\"124\" cy=\"510\" r=\"9\" fill=\"#ffd84d\" stroke=\"#33234a\" stroke-width=\"4\"/>\n        <path d=\"M116 524 C 108 546 112 566 102 580\" fill=\"none\" stroke=\"#e0398f\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n        <path d=\"M132 524 C 140 546 138 568 148 582\" fill=\"none\" stroke=\"#e0398f\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      </g>\n      <g class=\"p-bowR\">\n        <path d=\"M378 506 C 354 486 342 506 352 524 C 362 540 378 528 378 506 Z\"\n          fill=\"url(#ribbon)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n        <path d=\"M378 506 C 402 486 414 506 404 524 C 394 540 378 528 378 506 Z\"\n          fill=\"url(#ribbon)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n        <circle cx=\"378\" cy=\"510\" r=\"9\" fill=\"#ffd84d\" stroke=\"#33234a\" stroke-width=\"4\"/>\n        <path d=\"M370 524 C 362 546 366 566 356 580\" fill=\"none\" stroke=\"#e0398f\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n        <path d=\"M386 524 C 394 546 392 568 402 582\" fill=\"none\" stroke=\"#e0398f\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      </g>\n\n      <!-- whiskers, clear of her face -->\n      <path d=\"M112 470 L 58 456 M110 496 L 52 496 M112 522 L 58 538\"\n        stroke=\"#33234a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n      <path d=\"M390 470 L 444 456 M392 496 L 450 496 M390 522 L 444 538\"\n        stroke=\"#33234a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n\n      <!-- \u2500\u2500 A PROPER CROWN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n      <g class=\"p-crown\" transform=\"translate(0,-30) rotate(-7 250 268)\">\n        <!-- five points, each tipped with a pearl -->\n        <path d=\"M148 300 L 160 216 L 198 262 L 222 186 L 250 246 L 278 186\n                 L 302 262 L 340 216 L 352 300 Z\"\n          fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"7\" stroke-linejoin=\"round\"/>\n        <path d=\"M162 268 C 200 284 300 284 338 268\" fill=\"none\" stroke=\"#fff6d0\"\n          stroke-width=\"5\" opacity=\".65\"/>\n        <!-- jewelled band -->\n        <rect x=\"142\" y=\"292\" width=\"216\" height=\"34\" rx=\"14\"\n          fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"7\"/>\n        <ellipse cx=\"250\" cy=\"309\" rx=\"17\" ry=\"14\" fill=\"#ff5fa2\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"250\" cy=\"304\" r=\"4\" fill=\"#fff\" opacity=\".85\"/>\n        <ellipse cx=\"196\" cy=\"309\" rx=\"12\" ry=\"10\" fill=\"#2bb3ff\" stroke=\"#33234a\" stroke-width=\"4.5\"/>\n        <ellipse cx=\"304\" cy=\"309\" rx=\"12\" ry=\"10\" fill=\"#8cff9e\" stroke=\"#33234a\" stroke-width=\"4.5\"/>\n        <circle cx=\"166\" cy=\"309\" r=\"6\" fill=\"#c9a2ff\" stroke=\"#33234a\" stroke-width=\"3.5\"/>\n        <circle cx=\"334\" cy=\"309\" r=\"6\" fill=\"#c9a2ff\" stroke=\"#33234a\" stroke-width=\"3.5\"/>\n        <!-- pearls on the points -->\n        <circle cx=\"160\" cy=\"212\" r=\"10\" fill=\"#fff6d0\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"222\" cy=\"182\" r=\"11\" fill=\"#fff6d0\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"278\" cy=\"182\" r=\"11\" fill=\"#fff6d0\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"340\" cy=\"212\" r=\"10\" fill=\"#fff6d0\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"250\" cy=\"240\" r=\"9\" fill=\"#ff9ed2\" stroke=\"#33234a\" stroke-width=\"4.5\"/>\n      </g>\n    </g>\n  </g>\n\n  <g id=\"fairy\"></g>\n</svg>";

  host.innerHTML =
      '<div class="gate" id="gate"><div>'
    +   '<button id="start">Tap to meet the Princess!</button>'
    +   '<p>A place to play and learn. No signing up, ever.</p>'
    + '</div></div>'
    + '<div class="stage">' + SVG + '</div>'
    + '<div class="say" id="say">Loading…</div>'
    + '<div class="picks" id="picks"></div>'
    + '<div class="askrow">'
    +   '<input id="ask" type="text" placeholder="Ask me anything!" autocomplete="off">'
    +   '<button id="send">Go!</button>'
    + '</div>';

  var FACES = { happy:'images/face-happy.jpg', talk:'images/face-talk.jpg', silly:'images/face-silly.jpg' };
  var face = document.getElementById('face'),
      pcat = document.getElementById('pcat'),
      say  = document.getElementById('say'),
      picks= document.getElementById('picks'),
      ask  = document.getElementById('ask'),
      gate = document.getElementById('gate');

  (function(){
    var g=document.getElementById('fairy'), cols=['#ffd84d','#9ef0ff','#ff9ed2','#ffffff','#c9a2ff'], i;
    for(i=0;i<13;i++){
      var x = 70 + Math.random()*360, y = 70 + Math.random()*130,
          s = 5 + Math.random()*8, c = cols[i%cols.length],
          p = document.createElementNS('http://www.w3.org/2000/svg','path');
      p.setAttribute('d','M'+x+' '+(y-s)+' Q'+(x+s*0.3)+' '+(y-s*0.3)+' '+(x+s)+' '+y+
                        ' Q'+(x+s*0.3)+' '+(y+s*0.3)+' '+x+' '+(y+s)+
                        ' Q'+(x-s*0.3)+' '+(y+s*0.3)+' '+(x-s)+' '+y+
                        ' Q'+(x-s*0.3)+' '+(y-s*0.3)+' '+x+' '+(y-s)+' Z');
      p.setAttribute('fill',c); p.setAttribute('class','fl');
      p.style.transformOrigin = x+'px '+y+'px';
      p.style.animationDuration = (3.4+Math.random()*3)+'s';
      p.style.animationDelay = (-Math.random()*5)+'s';
      g.appendChild(p);
    }
  })();

  (function(){
    var sky=document.getElementById('sky'), i, e;
    for(i=0;i<4;i++){ e=document.createElement('div'); e.className='cloud'; e.textContent='☁️';
      e.style.top=(4+i*13)+'%'; e.style.animationDuration=(34+i*11)+'s';
      e.style.animationDelay=(-i*9)+'s'; sky.appendChild(e); }
    for(i=0;i<14;i++){ e=document.createElement('div'); e.className='twink';
      e.style.left=(Math.random()*96)+'%'; e.style.top=(Math.random()*70)+'%';
      e.style.animationDelay=(Math.random()*4)+'s'; sky.appendChild(e); }
  })();

  /* ── Age register. We never ask a child for personal information — no
        birthday, no number, nothing stored or sent. Three buttons, one
        variable, gone when the tab closes. It only changes how she talks. */
  window.PWage = 'b';   /* l = little, b = big, s = super big */

  function say3(e){                       /* pick the right register */
    if (window.PWage==='l' && e.rl) return pick(e.rl);
    if (window.PWage==='s' && e.rs) return pick(e.rs);
    return pick(e.r);
  }

  /* ── The affirmations. Call and response, one line at a time. ───────── */
  var CREED = [
    "I am <b>amazing</b>.",
    "I can do <b>anything</b> I set my mind to.",
    "I am <b>kind</b>, and kind is strong.",
    "Mistakes help me <b>grow</b>.",
    "Being <b>myself</b> is the best way to be.",
    "I am <b>brave</b> even when I feel small.",
    "My words can make somebody's whole day.",
    "I am <b>loved</b>, exactly as I am."
  ];
  var creedAt = -1;
  function creedStep(){
    creedAt++;
    if (creedAt === 0)
      return "Stand up tall like a royal! Put your hands on your hips. Now <b>repeat after me</b>…<br><br>" + CREED[0];
    if (creedAt < CREED.length)
      return "Yes! Say it loud…<br><br>" + CREED[creedAt];
    creedAt = -1;
    return "And you <i>meant</i> every word. I felt it from here. That is my favourite thing we do. 👑";
  }

  var KB = [
   {id:'hi', k:'hi,hello,hey,hiya,yo,howdy,sup,good morning,hola', r:[
     "Hi hi HI! I am <b>Princess Phoenix Sparkles</b>. I am part kitty, part princess, and <i>all</i> curious. What should we learn today?",
     "Hello, friend! You found my castle. Want to learn something, or hear a silly joke?"]},
   {id:'name', k:'name,who are you,what are you,your name,princess', r:[
     "I am <b>Princess Phoenix Sparkles</b>! I have a gold crown, a wand, and a tail that will not sit still. My three favourite things are <i>learning</i>, <i>the park</i>, and <i>making art</i>."]},
   {id:'myage', k:'how old are you,your age,are you a kid,are you real', r:[
     "I am exactly <b>one sparkle</b> old, which is a royal secret amount. But YOU can tell me if you are a little kid, a big kid, or a super big kid — tap a button and I will know how to play!"]},

   /* ── learning ─────────────────────────────────────────────────────── */
   {id:'count', k:'count,number,numbers,how many,one two three,123,counting',
     rl:["Let us count together! <b>1… 2… 3… 4… 5!</b> Now hold up your fingers and do it with me. You did it!"],
     r:["Counting time! <b>1, 2, 3, 4, 5, 6, 7, 8, 9, 10.</b> Now try counting backwards from 10. That one is trickier!"],
     rs:["Let us skip count by twos: <b>2, 4, 6, 8, 10, 12, 14, 16, 18, 20.</b> Now try by fives all the way to 50!"]},
   {id:'math', k:'math,add,plus,minus,subtract,take away,sum,times,multiply',
     rl:["Here is a little one. If you have <b>1</b> apple and I give you <b>1</b> more, you have <b>2</b>! Hold up two fingers. Perfect."],
     r:["Try this: <b>3 + 4 = 7</b>. And <b>10 − 6 = 4</b>. Want a trick? Adding zero to a number leaves it exactly the same. Zero is very polite."],
     rs:["Ready for a real one? <b>7 × 8 = 56</b>. Here is a trick for nines: 9 × 6 = 54, and 5 + 4 = 9. The digits of every answer in the nine times table add up to 9. Try 9 × 7!"]},
   {id:'letters', k:'letter,letters,abc,alphabet,a b c,spell,spelling,read,reading',
     rl:["<b>A</b> is for Apple. <b>B</b> is for Butterfly. <b>C</b> is for Cat — that is me! What letter does your name start with?"],
     r:["Letters are little pictures that make sounds. The alphabet has <b>26</b> of them. Five are vowels: <b>A, E, I, O, U</b>. Every single word needs at least one!"],
     rs:["Here is a good one: the word <i>queue</i> has five letters and four of them are just standing in line doing nothing. English is very silly."]},
   {id:'shapes', k:'shape,shapes,circle,square,triangle,rectangle,oval', r:[
     "A <b>triangle</b> has 3 sides. A <b>square</b> has 4 equal sides. A <b>circle</b> has none at all — it just keeps going round. Can you find a circle in your room right now?"]},
   {id:'colors', k:'color,colours,colors,rainbow,red,blue,green,yellow,purple,pink,orange', r:[
     "Rainbow order! <b>Red, orange, yellow, green, blue, indigo, violet.</b> Mixing is the fun part: blue and yellow make <b>green</b>, red and blue make <b>purple</b>, red and yellow make <b>orange</b>.",
     "My favourite colour is <i>sparkle</i>. Is that a colour? I say YES. What is yours?"]},
   {id:'space', k:'space,planet,planets,star,stars,moon,sun,rocket,astronaut,earth,alien', r:[
     "The <b>Earth is round</b> like a ball, and it spins all the way around once every day. That spinning is what makes morning and night!",
     "The <b>Moon</b> has no wind, so footprints left up there stay for millions of years. Somebody's boot print is sitting there right now.",
     "There are <b>8 planets</b> going around our Sun. Jupiter is the biggest by far — over a thousand Earths could fit inside it."]},
   {id:'animals', k:'animal,animals,cat,kitty,dog,puppy,pet,horse,elephant,lion,bird', r:[
     "Meow! Cats sleep about <b>15 hours</b> a day. Imagine napping that much and still yawning.",
     "An <b>elephant</b> is the biggest animal on land, and a baby one can stand up the very same day it is born. Brave from minute one!",
     "Every <b>zebra</b> has stripes in a pattern no other zebra has — like a fingerprint you can see from far away."]},
   {id:'dino', k:'dinosaur,dinosaurs,t rex,trex,fossil', r:[
     "Dinosaurs lived <b>millions</b> of years ago, way before people. And here is the wild part — <b>birds</b> are their living relatives. The sparrow outside your window has dinosaur cousins!"]},
   {id:'ocean', k:'ocean,sea,fish,shark,whale,water animals,dolphin', r:[
     "The <b>blue whale</b> is the biggest animal that has ever lived — bigger than any dinosaur — and it eats tiny creatures smaller than your fingernail."]},
   {id:'bugs', k:'bug,bugs,insect,spider,bee,butterfly,ant', r:[
     "<b>Bees</b> help our food grow by carrying pollen flower to flower. No bees, no apples! Be gentle with them and they will be gentle with you.",
     "An <b>ant</b> can carry something many times heavier than itself. Small does not mean weak. Remember that one."]},
   {id:'weather', k:'weather,rain,snow,storm,cloud,wind,sun shining,thunder', r:[
     "Rain starts as water that floated up into the sky, gathered into clouds, and got too heavy to stay. The same water goes round and round forever — that is the <b>water cycle</b>!"]},
   {id:'seasons', k:'season,seasons,spring,summer,fall,autumn,winter', r:[
     "Four seasons: <b>spring, summer, fall, winter</b>. They happen because the Earth leans a little as it travels around the Sun. A leaning planet gave us snowmen AND swimming!"]},
   {id:'spanish', k:'spanish,espanol,other language,french,how do you say', r:[
     "<b>Hola</b> means hello. <b>Gracias</b> means thank you. <b>Amigo</b> means friend. Say <i>OH-lah</i> out loud — you just spoke Spanish!"]},
   {id:'art', k:'art,draw,drawing,paint,painting,color in,craft,make something,creative', r:[
     "Art is my favourite! Here is my rule: there is <b>no wrong way</b> to make art. A purple sky is allowed. A dog with six legs is allowed. Go make something and show a grown-up.",
     "Want a challenge? Draw something you have <i>never</i> seen before. Give it a name. You are the only person in the whole world who knows what it looks like."]},
   {id:'music', k:'music,sing,song,dance,instrument,piano,guitar,drum', r:[
     "Dance breaks are royal law! Put on a song and wiggle until you are giggling. Music helps your brain AND your mood — that is real science."]},
   {id:'park', k:'park,playground,outside,swing,slide,play outside,nature,walk', r:[
     "The park is the BEST. Swinging, sliding, climbing — that is your body getting stronger while you have fun. Ask a grown-up to take you, and look for three different leaves while you are there!"]},

   /* ── growing up well ──────────────────────────────────────────────── */
   {id:'veggies', k:'vegetable,vegetables,veggies,eat,food,dinner,healthy,broccoli,carrot,fruit,snack', r:[
     "Do not forget to <b>eat your vegetables</b>! They are the secret fuel that makes you grow strong and keeps your brain sharp. Carrots, broccoli, peas — pick one and be a hero at dinner tonight.",
     "Try this: make your plate a <b>rainbow</b>. Something red, something green, something orange. The more colours, the more your body gets what it needs."]},
   {id:'water', k:'water,drink,thirsty,juice,soda', r:[
     "<b>Water</b> is the best drink there is. Your body is mostly water, and it needs topping up all day. Go take a big sip right now — I will wait!"]},
   {id:'sleep', k:'sleep,bed,bedtime,tired,nap,stay up', r:[
     "Sleep is when your body grows and your brain files away everything you learned today. Going to bed when your grown-up says is a <b>superpower</b>, not a punishment."]},
   {id:'teeth', k:'teeth,brush,toothbrush,dentist,tooth', r:[
     "Brush your teeth <b>two times every day</b> — morning and before bed — for about as long as it takes to sing a little song. Your grown-up teeth are waiting, and they want a nice clean house to move into!"]},
   {id:'wash', k:'wash,hands,germ,germs,soap,clean,sick', r:[
     "Wash your hands with <b>soap and warm water</b>, and really scrub — get between the fingers! It is the number one way to stop germs. Twenty seconds. You can count that now!"]},
   {id:'exercise', k:'exercise,run,jump,strong,sport,move,workout', r:[
     "Moving your body every day makes your heart strong and your mood happy. Run, jump, dance, climb. Bodies are for <b>using</b>, not just sitting!"]},
   {id:'parents', k:'parent,parents,mom,mum,dad,grandma,grandpa,listen,rules,in trouble,grounded', r:[
     "Here is something important: <b>listen to your parents</b>. They have already been your age, and they know what is best for you. They make rules because they love you — not to spoil your fun.",
     "If you are cross with a grown-up, that is okay. Feelings are allowed. Tell them how you feel with <i>words</i>, and listen to their answer too. That is how big kids fix things."]},
   {id:'safety', k:'stranger,lost,scared of people,safe,safety,help me,emergency', r:[
     "Safety rule, and this one matters: if you ever feel scared or unsure, <b>find your grown-up straight away</b>. Never go anywhere with someone you do not know. You are allowed to say NO loudly and run to a safe person."]},
   {id:'screen', k:'tablet,ipad,phone,tv,screen,video,youtube,game time', r:[
     "Screens are fun for a little while, and then your body starts asking to move! When your grown-up says screens are done, that is your cue to go be a wild thing outside."]},
   {id:'help', k:'chore,chores,clean up,help,tidy,messy,job', r:[
     "Helping at home makes you part of the team. Pick up five things right now — just five — and watch how proud your grown-up looks. That feeling is the good stuff."]},

   /* ── heart and character ──────────────────────────────────────────── */
   {id:'affirm', k:'repeat after me,affirmation,say it with me,pep talk,motivate me,i need a boost', r:['__CREED__']},
   {id:'cant', k:'i cant,cant do it,too hard,give up,i am bad at,i quit,not good at', r:[
     "Listen very close, because this is the most important thing I know: <b>you are allowed to be bad at something first</b>. That is how everybody starts. Every single person. Try once more — I am right here cheering.",
     "Not yet is different from never. Add the word <i>yet</i> to the end: <i>I cannot do it… yet.</i> Feel how that changes everything?"]},
   {id:'mistake', k:'mistake,messed up,i broke,wrong,failed,ruined', r:[
     "Mistakes are not bad — they are <b>information</b>. Your brain literally grows when you get something wrong and try again. So really, you just got a little stronger."]},
   {id:'sad', k:'sad,cry,crying,upset,lonely,bad day,unhappy,miss', r:[
     "Oh, come sit by me. Big feelings are okay — even princesses have them. Take a <b>slow breath</b> in… and let it out. Feelings are like weather. They move through.",
     "That sounds hard, and you are allowed to feel it. Would you like a joke, or shall we just sit together a minute? Both are good answers."]},
   {id:'angry', k:'angry,mad,furious,hate,annoyed,frustrated', r:[
     "Angry is allowed! Hitting is not. Try this: squeeze your fists tight for five… then let go and shake your hands out. Now tell me with words what happened."]},
   {id:'scared', k:'scared,afraid,dark,monster,nightmare,bad dream,worried,nervous', r:[
     "Here is a secret: the dark is just your room with its eyes closed. Nothing new is in there. And brave does not mean <i>not scared</i> — brave means scared and doing it anyway.",
     "When you are nervous, breathe in while you count to four, then out while you count to four. Do it three times. Your body calms down even when your brain is still fussing."]},
   {id:'kind', k:'kind,kindness,mean,bully,friend,friends,share,sharing,nice', r:[
     "Being <b>kind</b> is the strongest thing a person can be. If somebody is mean, that is about them, not you. Tell a grown-up, and go find the people who are glad you are there.",
     "Want a mission? Say something nice to one person today and watch their face. You can hand out good days for free."]},
   {id:'sorry', k:'sorry,apologize,i hurt,my fault,forgive', r:[
     "Saying <b>sorry</b> takes real courage. A good one has three parts: say what you did, say you are sorry, and say what you will do next time. Then let it go."]},
   {id:'thankful', k:'thankful,grateful,lucky,happy,gratitude,love my', r:[
     "Gratitude is a superpower. Name <b>three things</b> you are glad about right now. Out loud! Doing that actually makes people happier — scientists checked."]},
   {id:'different', k:'different,weird,fit in,everybody else,i dont like me,ugly,shy', r:[
     "The things that make you <b>different</b> are the best things about you. Nobody ever changed the world by being exactly like everyone else. <i>Being yourself is the best way to be.</i>"]},
   {id:'unity', k:'unity,everyone,together,team,skin,colour of skin,we are all', r:[
     "Every person you meet is having a whole life as big and important as yours. Different families, different homes, different skin — all of us on one spinning planet. Be curious about people, not scared of them."]},
   {id:'dream', k:'when i grow up,dream,job,astronaut,doctor,famous,what should i be', r:[
     "You can do <b>anything</b> you set your mind to. Not by magic — by practising, over and over, on the days you feel like it and the days you do not. That is the whole secret. Everyone who is great at something was terrible at it first."]},
   {id:'practice', k:'practice,keep trying,again,how do i get good,better at', r:[
     "The fastest way to get good at something is boring and wonderful: <b>do it a little bit every day</b>. Ten minutes beats two hours once a month. Your brain builds the path while you sleep!"]},
   {id:'curious', k:'why,how does,question,i wonder,teach me,learn,something new', r:[
     "Ooh, a question! Questions are how everything interesting ever got discovered. Never stop asking them — and if I do not know, ask a grown-up together. Learning with somebody is even better."]},

   /* ── silly ────────────────────────────────────────────────────────── */
   {id:'joke', k:'joke,funny,laugh,silly,tell me a joke,make me laugh', r:[
     "Why did the kitty sit on the computer? To keep an eye on the <b>mouse</b>!",
     "What do you call a princess who will not share her cake? A little <i>crumby</i>!",
     "Knock knock. Who is there? Meow. Meow who? <b>Meow-ve over</b>, it is my turn to play!",
     "Why did the teddy bear say no to dessert? Because she was already <b>stuffed</b>!",
     "What do you call a sleeping dinosaur? A <b>dino-snore</b>!",
     "Why did the banana go to the doctor? It was not <b>peeling</b> well!",
     "What is a cat's favourite colour? <b>Purr</b>-ple!",
     "Why can you never trust the stairs? They are always <b>up to something</b>!",
     "What did the left shoe say to the right shoe? Nothing — shoes cannot talk. But if they could, I bet they would complain about socks."]},
   {id:'riddle', k:'riddle,puzzle,guess,brain teaser,quiz', r:[
     "Riddle time! <i>I have hands but cannot clap. What am I?</i> … A <b>clock</b>!",
     "<i>What gets wetter the more it dries?</i> … A <b>towel</b>!",
     "<i>What has a face and two hands but no arms or legs?</i> … A <b>clock</b> again. Clocks are sneaky like that."]},
   {id:'game', k:'play,game,bored,fun,what can you do,i spy', r:[
     "Let us play <b>I Spy</b>! I spy with my kitty eye… something <b>blue</b>. Go find it and come tell me what it was!",
     "Freeze dance! Get a grown-up to play music and stop it whenever they like. When it stops, you FREEZE. I will be over here wobbling."]},
   {id:'hair', k:'hair,pretty,beautiful,dress,crown,ribbon,sparkle,you look', r:[
     "You noticed! My hair is <b>golden blonde</b> and my crown is real gold with five pearls. But my favourite thing I am wearing is my <i>smile</i> — that part is free and everybody has one."]},
   {id:'thanks', k:'thank you,thanks,ty,youre the best', r:[
     "You are very welcome! And I noticed your good manners. That is a royal quality right there."]},
   {id:'bye', k:'bye,goodbye,see you,goodnight,night,later,leaving', r:[
     "Bye for now, friend! Go be amazing. Eat something green for me and listen to your grown-ups. 👑"]}
  ];

  var MISS = [
    "Ooh, I do not know that one <i>yet</i>! I am still learning too. Try me on <b>animals</b>, <b>space</b>, <b>colors</b>, <b>counting</b>, or say <b>joke</b>!",
    "Hmm! My kitty brain is small but growing every day. Ask me about <b>vegetables</b>, <b>the park</b>, <b>art</b>, or tell me how you are feeling.",
    "That one is not in my royal notebook yet. Ask a grown-up with me! Or try <b>riddle</b>, <b>shapes</b>, or <b>repeat after me</b>."
  ];

  function norm(s){ return (' '+String(s).toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ')+' '); }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function answer(q){
    var t=norm(q), best=null, score=0;
    KB.forEach(function(e){
      var s=0;
      e.k.split(',').forEach(function(w){
        w=w.trim(); if(!w) return;
        if(t.indexOf(' '+w+' ')>=0) s+=3+w.split(' ').length;
        else if(w.length>3 && t.indexOf(w)>=0) s+=1.5;
      });
      if(s>score){score=s;best=e;}
    });
    if(score<1.5) return pick(MISS);
    if(best.r[0]==='__CREED__') return creedStep();
    return say3(best);
  }

  var flap=null;
  function speak(html){
    say.innerHTML=html;
    pcat.classList.add('talking');
    clearInterval(flap);
    var on=false, n=0, len=say.textContent.length;
    flap=setInterval(function(){
      on=!on; face.setAttribute('href', on?FACES.talk:FACES.happy);
      if(++n > Math.min(30, 6+len/9)){
        clearInterval(flap); face.setAttribute('href',FACES.happy);
        pcat.classList.remove('talking');
      }
    },190);
  }

  function chips(list){
    picks.innerHTML='';
    list.forEach(function(c,i){
      var b=document.createElement('button');
      b.className='pick p'+((i%6)+1);
      b.innerHTML=c.label;
      b.onclick=c.go;
      picks.appendChild(b);
    });
  }

  var MAIN=['Tell me a joke','Repeat after me!','Let us count','Colors!','I feel sad','Play a game',
            'Tell me about space','Why vegetables?'];
  function mainChips(){
    chips(MAIN.map(function(t){
      return {label:t, go:function(){ speak(answer(t)); }};
    }));
  }

  /* the age question, asked without ever asking for personal information */
  function askAge(){
    speak("First things first! Are you a <b>little kid</b>, a <b>big kid</b>, or a <b>super big kid</b>? Tap one so I know how to play with you!");
    chips([
      {label:'Little kid 🧸', go:function(){ setAge('l'); mainChips();
        speak("A little kid! My favourite. We will count on our fingers and make LOTS of silly noises. Ready?"); }},
      {label:'Big kid ⭐', go:function(){ setAge('b'); mainChips();
        speak("A big kid! Perfect. I can teach you real things and tell you my best jokes. What shall we do first?"); }},
      {label:'Super big kid 🚀', go:function(){ setAge('s'); mainChips();
        speak("A super big kid! Excellent. I will give you the tricky questions — times tables, riddles, real science. Try me."); }}
    ]);
  }

  function setAge(a){ window.PWage=a; if(window.PWsync) window.PWsync(a); }
  window.PWspeak = function(t){ speak(t); };

  function send(){
    var v=ask.value.trim(); if(!v) return;
    ask.value=''; ask.blur(); speak(answer(v));
  }
  document.getElementById('send').onclick=send;
  ask.addEventListener('keydown',function(e){ if(e.key==='Enter') send(); });

  document.querySelectorAll('.world').forEach(function(w){
    w.onclick=function(){
      var n=w.textContent.replace(/Coming soon|A B C|1 2 3|Rainbow!/,'').trim();
      speak("<b>"+n+"</b> is still being built! My dad-in-charge is working on it. Pick another for now?");
    };
  });

  document.getElementById('start').onclick=function(){
    gate.classList.add('off');
    askAge();
  };
  pcat.addEventListener('click',function(){
    face.setAttribute('href',FACES.silly);
    speak("You booped me! Boop you back. <b>Blep!</b>");
    setTimeout(function(){ face.setAttribute('href',FACES.happy); },1400);
  });
  mainChips();

})();
