/* ==========================================================================
   phoenix.js — Princess Phoenix Sparkles, guide for PhoenixsWorld.com

   Put her on any page with:
       <link rel="stylesheet" href="phoenix.css">
       <div id="phoenix"></div>
       <script src="phoenix.js"></script>

   She arrives on a slide, grows, says hello, then waves her wand and puffs
   down to a little helper in the corner. Close her and she rides a unicorn
   up to the clouds and stays gone for that visit.

   She is rule-based on purpose: she can only say what is written here, so
   she cannot invent a fact or say anything unsuitable for a child.

   PRIVACY: this file is public. Nothing in it identifies any real child —
   no surname, no address, no family names, no exact date of birth. Nothing
   is collected, stored or sent. The age register is one variable that dies
   when the tab closes.
   ========================================================================== */
(function(){
  var D = document, host = D.getElementById('phoenix');
  if (!host) return;

  var SVG = "<svg class=\"pcat\" id=\"pcat\" viewBox=\"0 0 500 880\" aria-label=\"Princess Phoenix Sparkles, your guide\">\n  <defs>\n    <!-- an egg-shaped face mask: wide at the cheeks, narrow at the chin.\n         The photo is cropped to her face only, and the drawn hair overlaps\n         every edge of it, so there is no ring and no background. -->\n    <clipPath id=\"faceHole\">\n      <path d=\"M256 286\n               C 210 288 150 320 126 373 C 110 410 110 425 114 448\n               C 118 490 122 505 134 528 C 148 560 160 592 184 608\n               C 202 628 224 642 246 640 C 270 640 292 624 314 606\n               C 338 588 350 556 361 528 C 374 500 382 472 386 448\n               C 390 420 388 386 378 358 C 368 330 320 288 256 286 Z\"/>\n    </clipPath>\n    <linearGradient id=\"strawb\" x1=\"0\" y1=\"0\" x2=\"0.25\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#fff4d2\"/><stop offset=\"28%\" stop-color=\"#ffdf9a\"/>\n      <stop offset=\"62%\" stop-color=\"#f3c368\"/><stop offset=\"100%\" stop-color=\"#d9a248\"/></linearGradient>\n    <linearGradient id=\"strawb2\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#fff8e4\"/><stop offset=\"100%\" stop-color=\"#ffdf9a\"/></linearGradient>\n    <linearGradient id=\"gown\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#ffb3dd\"/><stop offset=\"42%\" stop-color=\"#f778c0\"/>\n      <stop offset=\"100%\" stop-color=\"#bf3488\"/></linearGradient>\n    <linearGradient id=\"gown2\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#ffe6f5\"/><stop offset=\"100%\" stop-color=\"#ffc2e4\"/></linearGradient>\n    <linearGradient id=\"bodice\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#a45cff\"/><stop offset=\"100%\" stop-color=\"#6b34d4\"/></linearGradient>\n    <linearGradient id=\"hatg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#cfa8ff\"/><stop offset=\"48%\" stop-color=\"#9a5cf0\"/>\n      <stop offset=\"100%\" stop-color=\"#5f2bc4\"/></linearGradient>\n    <linearGradient id=\"gold\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#ffe9a8\"/><stop offset=\"50%\" stop-color=\"#ffd84d\"/>\n      <stop offset=\"100%\" stop-color=\"#d79b12\"/></linearGradient>\n    <linearGradient id=\"ribbon\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">\n      <stop offset=\"0%\" stop-color=\"#ff9ed2\"/><stop offset=\"100%\" stop-color=\"#e0398f\"/></linearGradient>\n    <radialGradient id=\"glow\" cx=\"50%\" cy=\"50%\" r=\"50%\">\n      <stop offset=\"0%\" stop-color=\"rgba(255,216,77,.95)\"/>\n      <stop offset=\"100%\" stop-color=\"rgba(255,216,77,0)\"/></radialGradient>\n  </defs>\n\n  <g opacity=\".2\" fill=\"#8b6bb5\">\n    <rect x=\"26\" y=\"636\" width=\"36\" height=\"98\"/><path d=\"M22 636 h44 l-9 -20 h-26 z\"/>\n    <path d=\"M44 586 l17 28 h-34 z\"/>\n    <rect x=\"66\" y=\"664\" width=\"48\" height=\"70\"/>\n    <rect x=\"436\" y=\"644\" width=\"34\" height=\"90\"/><path d=\"M432 644 h42 l-8 -18 h-26 z\"/>\n    <path d=\"M453 600 l16 26 h-32 z\"/>\n    <rect x=\"392\" y=\"670\" width=\"44\" height=\"64\"/>\n  </g>\n\n  <ellipse cx=\"250\" cy=\"846\" rx=\"140\" ry=\"18\" fill=\"#8b6bb5\" opacity=\".22\"/>\n\n  <g class=\"p-body\">\n    <g class=\"p-tail\">\n      <path d=\"M352 740 C 424 722 452 650 420 598\" fill=\"none\" stroke=\"#33234a\" stroke-width=\"28\" stroke-linecap=\"round\"/>\n      <path d=\"M352 740 C 424 722 452 650 420 598\" fill=\"none\" stroke=\"url(#strawb)\" stroke-width=\"18\" stroke-linecap=\"round\"/>\n      <path d=\"M410 618 q11 -7 20 2\" stroke=\"#b25a2c\" stroke-width=\"6\" fill=\"none\" stroke-linecap=\"round\"/>\n      <path d=\"M402 652 q11 -7 20 2\" stroke=\"#b25a2c\" stroke-width=\"6\" fill=\"none\" stroke-linecap=\"round\"/>\n      <path d=\"M386 690 q11 -7 20 2\" stroke=\"#b25a2c\" stroke-width=\"6\" fill=\"none\" stroke-linecap=\"round\"/>\n      <circle cx=\"420\" cy=\"598\" r=\"9\" fill=\"#ffd0e8\" stroke=\"#33234a\" stroke-width=\"4\"/>\n    </g>\n\n    <!-- gown -->\n    <path d=\"M250 646 C 302 652 326 696 340 742 C 354 792 374 832 388 854 L 112 854\n             C 126 832 146 792 160 742 C 174 696 198 652 250 646 Z\"\n      fill=\"url(#gown)\" stroke=\"#33234a\" stroke-width=\"7\" stroke-linejoin=\"round\"/>\n    <path d=\"M250 696 C 284 702 302 734 312 772 C 322 808 336 836 344 852 L 156 852\n             C 164 836 178 808 188 772 C 198 734 216 702 250 696 Z\"\n      fill=\"url(#gown2)\" opacity=\".92\"/>\n    <path d=\"M160 782 q90 30 180 0\" stroke=\"#fff\" stroke-width=\"9\" fill=\"none\" opacity=\".75\"/>\n    <path d=\"M140 822 q110 36 220 0\" stroke=\"#fff\" stroke-width=\"9\" fill=\"none\" opacity=\".6\"/>\n    <path d=\"M118 852 q16 -18 32 0 q16 -18 32 0 q16 -18 32 0 q16 -18 32 0 q16 -18 32 0\n             q16 -18 32 0 q16 -18 32 0 q16 -18 32 0\" fill=\"none\" stroke=\"#33234a\" stroke-width=\"5\"/>\n    <circle cx=\"208\" cy=\"746\" r=\"6\" fill=\"#fff\" opacity=\".85\"/>\n    <circle cx=\"292\" cy=\"766\" r=\"5\" fill=\"#fff\" opacity=\".8\"/>\n    <circle cx=\"250\" cy=\"806\" r=\"7\" fill=\"#fff\" opacity=\".7\"/>\n    <circle cx=\"180\" cy=\"812\" r=\"5\" fill=\"#fff\" opacity=\".7\"/>\n    <circle cx=\"322\" cy=\"822\" r=\"6\" fill=\"#fff\" opacity=\".65\"/>\n\n    <path d=\"M204 626 C 220 618 280 618 296 626 L 290 682 C 266 692 234 692 210 682 Z\"\n      fill=\"url(#bodice)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n    <path d=\"M236 632 L 264 644 M236 646 L 264 658 M236 660 L 264 672\"\n      stroke=\"#ffe9a8\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n    <path d=\"M250 688 l-13 22 h26 z\" fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"4\" stroke-linejoin=\"round\"/>\n    <circle cx=\"250\" cy=\"624\" r=\"11\" fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"5\"/>\n\n    <ellipse cx=\"192\" cy=\"638\" rx=\"30\" ry=\"26\" fill=\"url(#gown)\" stroke=\"#33234a\" stroke-width=\"6\"/>\n    <ellipse cx=\"308\" cy=\"638\" rx=\"30\" ry=\"26\" fill=\"url(#gown)\" stroke=\"#33234a\" stroke-width=\"6\"/>\n\n    <path d=\"M182 658 C 156 678 148 696 168 712\" fill=\"none\" stroke=\"#33234a\" stroke-width=\"22\" stroke-linecap=\"round\"/>\n    <path d=\"M182 658 C 156 678 148 696 168 712\" fill=\"none\" stroke=\"#ffe1b8\" stroke-width=\"14\" stroke-linecap=\"round\"/>\n    <path d=\"M318 658 C 344 678 352 698 332 714\" fill=\"none\" stroke=\"#33234a\" stroke-width=\"22\" stroke-linecap=\"round\"/>\n    <path d=\"M318 658 C 344 678 352 698 332 714\" fill=\"none\" stroke=\"#ffe1b8\" stroke-width=\"14\" stroke-linecap=\"round\"/>\n    <g>\n      <circle cx=\"334\" cy=\"718\" r=\"18\" fill=\"#ffe1b8\" stroke=\"#33234a\" stroke-width=\"5\"/>\n      <circle cx=\"334\" cy=\"722\" r=\"7\" fill=\"#ff9ed2\"/>\n      <circle cx=\"326\" cy=\"710\" r=\"3.4\" fill=\"#ff9ed2\"/>\n      <circle cx=\"334\" cy=\"707\" r=\"3.4\" fill=\"#ff9ed2\"/>\n      <circle cx=\"342\" cy=\"710\" r=\"3.4\" fill=\"#ff9ed2\"/>\n    </g>\n\n    <g class=\"p-wand\">\n      <path d=\"M152 712 L 120 608\" stroke=\"#33234a\" stroke-width=\"12\" stroke-linecap=\"round\"/>\n      <path d=\"M152 712 L 120 608\" stroke=\"#f4f4f1\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <path class=\"p-rib1\" d=\"M124 626 C 98 640 94 668 108 686\" fill=\"none\" stroke=\"#ff9ed2\"\n        stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <path class=\"p-rib2\" d=\"M128 630 C 148 648 150 674 136 692\" fill=\"none\" stroke=\"#9ef0ff\"\n        stroke-width=\"6\" stroke-linecap=\"round\"/>\n      <circle cx=\"120\" cy=\"598\" r=\"38\" fill=\"url(#glow)\"/>\n      <g class=\"p-star\">\n        <path d=\"M120 566 L130 590 L156 592 L136 609 L142 635 L120 621 L98 635 L104 609 L84 592 L110 590 Z\"\n          fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n      </g>\n      <circle cx=\"152\" cy=\"716\" r=\"18\" fill=\"#ffe1b8\" stroke=\"#33234a\" stroke-width=\"5\"/>\n      <circle cx=\"152\" cy=\"720\" r=\"7\" fill=\"#ff9ed2\"/>\n    </g>\n\n    <!-- \u2550\u2550\u2550 THE HEAD \u2014 her face at full size, framed by drawn hair \u2550\u2550\u2550 -->\n    <g class=\"p-head\">\n\n      <!-- long flowing locks, behind -->\n      <g class=\"p-lockL\">\n        <path d=\"M152 352 C 48 424 30 616 74 726 C 86 640 72 528 112 462\n                 C 84 552 92 648 122 716 C 124 598 128 456 178 400 Z\"\n          fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n        <path d=\"M150 372 C 74 444 62 606 100 704 C 108 622 100 520 134 456\n                 C 114 540 120 630 146 694 C 146 584 150 458 182 406 Z\"\n          fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\" opacity=\".96\"/>\n        <path d=\"M108 452 C 84 524 88 606 108 666\" fill=\"none\" stroke=\"#fff8e4\" stroke-width=\"6\" opacity=\".5\"/>\n        <path d=\"M132 470 C 114 532 118 596 134 648\" fill=\"none\" stroke=\"#fff8e4\" stroke-width=\"4\" opacity=\".35\"/>\n      </g>\n      <g class=\"p-lockR\">\n        <path d=\"M350 352 C 454 424 472 616 428 726 C 416 640 430 528 390 462\n                 C 418 552 410 648 380 716 C 378 598 374 456 324 400 Z\"\n          fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n        <path d=\"M352 372 C 428 444 440 606 402 704 C 394 622 402 520 368 456\n                 C 388 540 382 630 356 694 C 356 584 352 458 320 406 Z\"\n          fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\" opacity=\".96\"/>\n        <path d=\"M394 452 C 418 524 414 606 394 666\" fill=\"none\" stroke=\"#fff8e4\" stroke-width=\"6\" opacity=\".5\"/>\n        <path d=\"M370 470 C 388 532 384 596 368 648\" fill=\"none\" stroke=\"#fff8e4\" stroke-width=\"4\" opacity=\".35\"/>\n      </g>\n\n      <!-- cat ears, tucked closer to her head -->\n      <g class=\"p-earL\">\n        <path d=\"M146 320 L 120 214 L 214 276 Z\" fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n        <path d=\"M152 304 L 140 244 L 190 276 Z\" fill=\"#ff9ed2\"/>\n      </g>\n      <g class=\"p-earR\">\n        <path d=\"M356 320 L 382 214 L 288 276 Z\" fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n        <path d=\"M350 304 L 362 244 L 312 276 Z\" fill=\"#ff9ed2\"/>\n      </g>\n\n      <!-- her face, clipped to the traced outline -->\n      <g clip-path=\"url(#faceHole)\">\n        <image id=\"face\" x=\"87\" y=\"225\" width=\"360\" height=\"432\"\n          transform=\"rotate(4 262 463)\"\n          preserveAspectRatio=\"xMidYMid meet\" href=\"images/face-happy.jpg\"/>\n      </g>\n\n      <!-- hair laid over the top and sides, following the same outline -->\n      <path d=\"M256 268 C 168 266 120 310 106 380 C 100 414 100 434 104 458\n               C 110 400 132 352 178 326 C 214 304 300 306 336 332\n               C 382 358 396 406 400 458 C 404 432 404 408 400 380\n               C 386 308 344 268 256 268 Z\"\n        fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"6\" stroke-linejoin=\"round\"/>\n      <path d=\"M174 328 C 214 348 276 352 330 332 C 308 370 224 378 174 328 Z\"\n        fill=\"url(#strawb2)\" opacity=\".92\"/>\n      <path d=\"M150 330 C 186 300 320 300 356 332 C 320 314 186 314 150 330 Z\"\n        fill=\"#fff8e4\" opacity=\".55\"/>\n      <path d=\"M198 316 C 228 334 276 336 312 322\" fill=\"none\" stroke=\"#ffe3bd\" stroke-width=\"5\" opacity=\".6\"/>\n      <path d=\"M120 444 C 114 384 138 334 178 318 C 148 350 130 396 130 452\n               C 130 502 138 546 150 574 C 126 536 118 492 120 444 Z\"\n        fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n      <path d=\"M382 444 C 388 384 364 334 324 318 C 354 350 372 396 372 452\n               C 372 502 364 546 352 574 C 376 536 384 492 382 444 Z\"\n        fill=\"url(#strawb)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n\n      <!-- ribbons, moved out to the hair so they stop covering her cheeks -->\n      <g class=\"p-bowL\">\n        <path d=\"M124 506 C 100 486 88 506 98 524 C 108 540 124 528 124 506 Z\"\n          fill=\"url(#ribbon)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n        <path d=\"M124 506 C 148 486 160 506 150 524 C 140 540 124 528 124 506 Z\"\n          fill=\"url(#ribbon)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n        <circle cx=\"124\" cy=\"510\" r=\"9\" fill=\"#ffd84d\" stroke=\"#33234a\" stroke-width=\"4\"/>\n        <path d=\"M116 524 C 108 546 112 566 102 580\" fill=\"none\" stroke=\"#e0398f\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n        <path d=\"M132 524 C 140 546 138 568 148 582\" fill=\"none\" stroke=\"#e0398f\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      </g>\n      <g class=\"p-bowR\">\n        <path d=\"M378 506 C 354 486 342 506 352 524 C 362 540 378 528 378 506 Z\"\n          fill=\"url(#ribbon)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n        <path d=\"M378 506 C 402 486 414 506 404 524 C 394 540 378 528 378 506 Z\"\n          fill=\"url(#ribbon)\" stroke=\"#33234a\" stroke-width=\"5\" stroke-linejoin=\"round\"/>\n        <circle cx=\"378\" cy=\"510\" r=\"9\" fill=\"#ffd84d\" stroke=\"#33234a\" stroke-width=\"4\"/>\n        <path d=\"M370 524 C 362 546 366 566 356 580\" fill=\"none\" stroke=\"#e0398f\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n        <path d=\"M386 524 C 394 546 392 568 402 582\" fill=\"none\" stroke=\"#e0398f\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n      </g>\n\n      <!-- whiskers, clear of her face -->\n      <path d=\"M112 470 L 58 456 M110 496 L 52 496 M112 522 L 58 538\"\n        stroke=\"#33234a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n      <path d=\"M390 470 L 444 456 M392 496 L 450 496 M390 522 L 444 538\"\n        stroke=\"#33234a\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n\n      <!-- \u2500\u2500 A PROPER CROWN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n      <g class=\"p-crown\" transform=\"translate(0,-30) rotate(-7 250 268)\">\n        <!-- five points, each tipped with a pearl -->\n        <path d=\"M148 300 L 160 216 L 198 262 L 222 186 L 250 246 L 278 186\n                 L 302 262 L 340 216 L 352 300 Z\"\n          fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"7\" stroke-linejoin=\"round\"/>\n        <path d=\"M162 268 C 200 284 300 284 338 268\" fill=\"none\" stroke=\"#fff6d0\"\n          stroke-width=\"5\" opacity=\".65\"/>\n        <!-- jewelled band -->\n        <rect x=\"142\" y=\"292\" width=\"216\" height=\"34\" rx=\"14\"\n          fill=\"url(#gold)\" stroke=\"#33234a\" stroke-width=\"7\"/>\n        <ellipse cx=\"250\" cy=\"309\" rx=\"17\" ry=\"14\" fill=\"#ff5fa2\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"250\" cy=\"304\" r=\"4\" fill=\"#fff\" opacity=\".85\"/>\n        <ellipse cx=\"196\" cy=\"309\" rx=\"12\" ry=\"10\" fill=\"#2bb3ff\" stroke=\"#33234a\" stroke-width=\"4.5\"/>\n        <ellipse cx=\"304\" cy=\"309\" rx=\"12\" ry=\"10\" fill=\"#8cff9e\" stroke=\"#33234a\" stroke-width=\"4.5\"/>\n        <circle cx=\"166\" cy=\"309\" r=\"6\" fill=\"#c9a2ff\" stroke=\"#33234a\" stroke-width=\"3.5\"/>\n        <circle cx=\"334\" cy=\"309\" r=\"6\" fill=\"#c9a2ff\" stroke=\"#33234a\" stroke-width=\"3.5\"/>\n        <!-- pearls on the points -->\n        <circle cx=\"160\" cy=\"212\" r=\"10\" fill=\"#fff6d0\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"222\" cy=\"182\" r=\"11\" fill=\"#fff6d0\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"278\" cy=\"182\" r=\"11\" fill=\"#fff6d0\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"340\" cy=\"212\" r=\"10\" fill=\"#fff6d0\" stroke=\"#33234a\" stroke-width=\"5\"/>\n        <circle cx=\"250\" cy=\"240\" r=\"9\" fill=\"#ff9ed2\" stroke=\"#33234a\" stroke-width=\"4.5\"/>\n      </g>\n    </g>\n  </g>\n\n  <g id=\"fairy\"></g>\n</svg>";

  var UNICORN = '<svg viewBox="0 0 360 260" aria-hidden="true">'
  + '<defs>'
  + '<linearGradient id="uMane" x1="0" y1="0" x2="1" y2="1">'
  +   '<stop offset="0%" stop-color="#ff2d95"/><stop offset="22%" stop-color="#ff7a00"/>'
  +   '<stop offset="44%" stop-color="#ffd400"/><stop offset="66%" stop-color="#00ff9d"/>'
  +   '<stop offset="84%" stop-color="#00e5ff"/><stop offset="100%" stop-color="#b14bff"/>'
  + '</linearGradient>'
  + '<linearGradient id="uBody" x1="0" y1="0" x2="0" y2="1">'
  +   '<stop offset="0%" stop-color="#ffffff"/><stop offset="62%" stop-color="#fdf4ff"/>'
  +   '<stop offset="100%" stop-color="#e8d9f2"/></linearGradient>'
  + '<linearGradient id="uHorn" x1="0" y1="1" x2="0" y2="0">'
  +   '<stop offset="0%" stop-color="#ffd400"/><stop offset="60%" stop-color="#ffe9a8"/>'
  +   '<stop offset="100%" stop-color="#fff"/></linearGradient>'
  + '</defs>'
  /* tail, streaming behind */
  + '<path d="M58 138 C 8 120 -6 176 22 214 C 30 176 44 160 66 152 Z" fill="url(#uMane)"'
  +   ' stroke="#2b1b45" stroke-width="5" stroke-linejoin="round"/>'
  + '<path d="M60 150 C 22 146 12 190 32 218" fill="none" stroke="#ff2d95" stroke-width="7" stroke-linecap="round"/>'
  + '<path d="M62 160 C 30 160 24 196 42 220" fill="none" stroke="#00e5ff" stroke-width="6" stroke-linecap="round"/>'
  /* back legs */
  + '<path d="M96 176 C 92 202 86 218 74 234" stroke="#f3e8fa" stroke-width="19" fill="none" stroke-linecap="round"/>'
  + '<path d="M96 176 C 92 202 86 218 74 234" stroke="#2b1b45" stroke-width="5" fill="none" stroke-linecap="round" opacity=".25"/>'
  + '<path d="M136 182 C 136 206 132 222 124 238" stroke="#f3e8fa" stroke-width="19" fill="none" stroke-linecap="round"/>'
  + '<ellipse cx="74" cy="238" rx="13" ry="8" fill="#c9a2ff" stroke="#2b1b45" stroke-width="4"/>'
  + '<ellipse cx="124" cy="242" rx="13" ry="8" fill="#c9a2ff" stroke="#2b1b45" stroke-width="4"/>'
  /* body */
  + '<path d="M62 136 C 54 100 92 78 140 76 L232 76 C 276 76 300 100 296 136'
  +   ' C 292 172 262 186 224 186 L134 186 C 92 186 68 170 62 136 Z"'
  +   ' fill="url(#uBody)" stroke="#2b1b45" stroke-width="6" stroke-linejoin="round"/>'
  /* front legs */
  + '<path d="M196 182 C 200 206 196 222 186 238" stroke="#fdf4ff" stroke-width="19" fill="none" stroke-linecap="round"/>'
  + '<path d="M246 178 C 254 202 254 220 248 238" stroke="#fdf4ff" stroke-width="19" fill="none" stroke-linecap="round"/>'
  + '<ellipse cx="186" cy="242" rx="13" ry="8" fill="#c9a2ff" stroke="#2b1b45" stroke-width="4"/>'
  + '<ellipse cx="248" cy="242" rx="13" ry="8" fill="#c9a2ff" stroke="#2b1b45" stroke-width="4"/>'
  /* neck and head */
  + '<path d="M252 96 C 268 60 296 34 318 26 C 340 18 352 34 346 54'
  +   ' C 340 76 318 92 300 104 C 286 114 266 118 252 116 Z"'
  +   ' fill="url(#uBody)" stroke="#2b1b45" stroke-width="6" stroke-linejoin="round"/>'
  + '<path d="M318 26 C 336 20 350 30 346 50" fill="none" stroke="#2b1b45" stroke-width="5"/>'
  /* mane along the neck */
  + '<path d="M252 96 C 262 60 288 30 314 20 C 300 46 292 74 288 102 Z"'
  +   ' fill="url(#uMane)" stroke="#2b1b45" stroke-width="5" stroke-linejoin="round"/>'
  + '<path d="M268 74 C 250 62 236 74 232 92" fill="none" stroke="#ffd400" stroke-width="7" stroke-linecap="round"/>'
  + '<path d="M262 90 C 242 82 228 94 226 112" fill="none" stroke="#00ff9d" stroke-width="7" stroke-linecap="round"/>'
  + '<path d="M258 106 C 238 100 224 114 224 130" fill="none" stroke="#b14bff" stroke-width="7" stroke-linecap="round"/>'
  /* ear, eye, nostril, horn */
  + '<path d="M300 38 L 296 12 L 316 28 Z" fill="#fdf4ff" stroke="#2b1b45" stroke-width="5" stroke-linejoin="round"/>'
  + '<path d="M322 22 L 336 -14 L 348 24 Z" fill="url(#uHorn)" stroke="#2b1b45" stroke-width="5" stroke-linejoin="round"/>'
  + '<path d="M328 12 L 342 8 M326 20 L 344 16" stroke="#d79b12" stroke-width="3"/>'
  + '<circle cx="324" cy="46" r="5.5" fill="#2b1b45"/>'
  + '<circle cx="322" cy="44" r="2" fill="#fff"/>'
  + '<path d="M344 62 q6 4 2 9" stroke="#2b1b45" stroke-width="4" fill="none" stroke-linecap="round"/>'
  /* wings, because a flying unicorn needs them */
  + '<path d="M176 92 C 150 44 186 18 224 34 C 208 52 200 72 200 96 Z"'
  +   ' fill="#ffffff" fill-opacity=".92" stroke="#2b1b45" stroke-width="5" stroke-linejoin="round"/>'
  + '<path d="M186 76 C 178 56 194 42 214 44" fill="none" stroke="#c9a2ff" stroke-width="4"/>'
  + '<circle cx="150" cy="128" r="5" fill="#ffd400" opacity=".9"/>'
  + '<circle cx="118" cy="150" r="4" fill="#00e5ff" opacity=".9"/>'
  + '<circle cx="176" cy="158" r="4" fill="#ff2d95" opacity=".9"/>'
  + '</svg>';


  host.innerHTML =
      '<div class="stage" id="stage">'
    +   '<div class="poof" id="poof"></div>'
    +   '<div class="slide" id="slide"><svg viewBox="0 0 300 200" aria-hidden="true">'
    +     '<path d="M18 26 L250 178" stroke="#c9a2ff" stroke-width="16" stroke-linecap="round"/>'
    +     '<path d="M18 26 L250 178" stroke="#ffd0e8" stroke-width="8" stroke-linecap="round"/>'
    +   '</svg></div>'
    +   SVG
    +   '<div class="uni" id="uni">' + UNICORN + '</div>'
    + '</div>'
    + '<div class="say" id="say">Loading…</div>'
    + '<div class="picks" id="picks"></div>'
    + '<div class="askrow">'
    +   '<input id="ask" type="text" placeholder="Ask me anything!" autocomplete="off">'
    +   '<button id="send">Go!</button>'
    + '</div>'
    + '<button class="closeme" id="closeme" aria-label="Say goodbye to the princess">&times;</button>';

  var reopen = D.createElement('button');
  reopen.className = 'reopen'; reopen.id = 'reopen';
  reopen.innerHTML = '👑 Talk to Princess Phoenix Sparkles';
  D.body.appendChild(reopen);

  var face  = D.getElementById('face'),
      pcat  = D.getElementById('pcat'),
      say   = D.getElementById('say'),
      picks = D.getElementById('picks'),
      ask   = D.getElementById('ask'),
      stage = D.getElementById('stage'),
      poof  = D.getElementById('poof'),
      uni   = D.getElementById('uni');

  var FACES = { happy:'/images/face-happy.jpg', talk:'/images/face-talk.jpg', silly:'/images/face-silly.jpg' };

  window.PWage = 'b';
  function say3(e){
    if (window.PWage==='l' && e.rl) return pick(e.rl);
    if (window.PWage==='s' && e.rs) return pick(e.rs);
    return pick(e.r);
  }

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
      return "Stand up tall like a royal! Hands on hips. Now <b>repeat after me</b>…<br><br>" + CREED[0];
    if (creedAt < CREED.length) return "Yes! Say it loud…<br><br>" + CREED[creedAt];
    creedAt = -1;
    return "And you <i>meant</i> every word. I felt it from here. 👑";
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


  /* ── Names. She picks the name out of whatever a child types, then uses
        it. If it is Phoenix, she checks one gentle detail before treating
        her as the Phoenix this whole kingdom is named after. ─────────── */
  var KIDNAMES = ('emma olivia ava sophia isabella mia charlotte amelia harper evelyn abigail '
    + 'ella scarlett grace chloe camila penelope riley layla lily zoey nora hannah lillian addison '
    + 'aubrey ellie stella natalie zoe leah hazel violet aurora savannah audrey brooklyn bella claire '
    + 'skylar lucy paisley everly anna caroline nova genesis emilia kennedy maya willow kinsley naomi '
    + 'liam noah oliver elijah james william benjamin lucas henry theodore jack levi alexander jackson '
    + 'mateo daniel michael mason sebastian ethan logan owen samuel jacob asher aiden john joseph wyatt '
    + 'david leo luke julian hudson grayson matthew ezra gabriel carter isaac jayden luca anthony dylan '
    + 'lincoln thomas maverick elias josiah charles caleb christopher ezekiel miles jaxon isaiah andrew '
    + 'phoenix coburn river sage rowan quinn charlie finn milo ivy remi juniper wren').split(' ');

  var KID = { name:null, isPhoenix:false, asked:false };

  function grabName(raw){
    var t = ' ' + raw.toLowerCase().replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ') + ' ';
    var m = t.match(/(?:my name is|my names|i am called|call me|this is|im|i am|name is|its|it is)\s+([a-z']{2,14})/);
    if (m){
      var w = m[1];
      var STOP = ['a','an','the','here','good','fine','ok','okay','happy','sad','tired','hungry',
                  'playing','going','doing','five','four','six','so','very','really','not','just','back'];
      if (STOP.indexOf(w) < 0) return w;
    }
    /* a bare name on its own line, e.g. just "Phoenix" */
    var one = raw.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (one.length > 1 && one.length < 14 && KIDNAMES.indexOf(one) >= 0) return one;
    return null;
  }
  function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

  /* the little verification, and everything that follows it */
  var PHX = [
    "PHOENIX! It really is you! 🎉 Guess what — <b>I am you and you are me</b>. I am the cartoon version of YOU. How do you like me?!",
    "You have a <b>birthday</b> coming up, do you not? And you are turning <b>FIVE</b>! Five is enormous. What do you want for your birthday?",
    "Five years old means you can count your age on one whole hand. 🖐️ Hold it up! That is you, that is.",
    "I heard you were born in <b>Colorado</b>, where the mountains are. Mountains are made when the ground slowly pushes up over millions of years. Yours are very big ones!",
    "Shall we learn something together, Phoenix? Say <b>study</b> and Wormy will fetch his glasses. Or say <b>joke</b> if you want a giggle first."
  ];
  var phxAt = 0;

  /* ── Toddler and little-kid speech. Five-year-olds type by sound, so the
        normalizer turns what they meant into something matchable before
        anything else runs. ─────────────────────────────────────────────── */
  var KIDSPEAK = {
    ya:'yes', yah:'yes', yeah:'yes', yep:'yes', yup:'yes', yea:'yes', mhm:'yes',
    'uh huh':'yes', 'uhhuh':'yes', ok:'yes', okie:'yes', okey:'yes', kk:'yes',
    'nuh uh':'no', 'nuhuh':'no', nah:'no', nope:'no', nu:'no',
    wanna:'want to', gonna:'going to', gotta:'got to', hafta:'have to',
    dunno:'i do not know', idk:'i do not know', lemme:'let me', gimme:'give me',
    cuz:'because', bc:'because', howcum:'how come',
    wat:'what', wut:'what', whut:'what', wha:'what', wher:'where', wen:'when',
    y:'why', wy:'why', hoo:'who', hau:'how',
    pwease:'please', pls:'please', plz:'please', pleeease:'please',
    tank:'thank', tanks:'thanks', tank_you:'thank you', fank:'thank',
    luv:'love', lub:'love', wuv:'love', lyk:'like', liek:'like',
    mommy:'mom', mummy:'mom', mama:'mom', momma:'mom',
    daddy:'dad', dada:'dad', papa:'dad',
    bruther:'brother', brudder:'brother', bubba:'brother',
    sistr:'sister', sissy:'sister',
    kitty:'cat', kitteh:'cat', kitties:'cats', cate:'cat',
    doggy:'dog', doggie:'dog', puppy:'dog', puppie:'dog',
    birfday:'birthday', birfdae:'birthday', bday:'birthday',
    skool:'school', scool:'school', preskool:'preschool',
    favrit:'favorite', favourite:'favorite', fav:'favorite', faverite:'favorite',
    sparkel:'sparkle', sparkley:'sparkle', sparkly:'sparkle',
    rainbo:'rainbow', raibow:'rainbow', raninbow:'rainbow',
    prinsess:'princess', princes:'princess', prinses:'princess',
    playin:'playing', doin:'doing', goin:'going', havin:'having',
    nite:'night', lite:'light', rite:'right', wite:'white',
    sum:'some', thay:'they', wus:'was', wuz:'was', iz:'is', da:'the', teh:'the',
    im:'i am', ur:'your', u:'you', r:'are', n:'and', b:'be', c:'see',
    hi_hi:'hi', heyy:'hey', helo:'hello', hewwo:'hello', hiya:'hi'
  };
  function kidspeak(t){
    t = ' ' + t + ' ';
    t = t.replace(/ uh huh /g,' yes ').replace(/ nuh uh /g,' no ')
         .replace(/ thank you /g,' thanks ');
    var out = t.split(' ').map(function(w){
      if (!w) return w;
      var base = w.replace(/(.)\1{2,}/g, '$1$1');      /* pleeeease -> pleease */
      return KIDSPEAK[base] || KIDSPEAK[w] || w;
    }).join(' ');
    return out;
  }

  /* ── Phoenix. She is the reason this whole place exists. Nothing in here
        identifies her: no surname, no town, no family names, no exact date.
        This file is public, so it only holds the fun parts. ────────────── */
  KB.push(
   {id:'phoenix', w:3, k:'phoenix,my name is phoenix,im phoenix,i am phoenix,this is phoenix', r:[
     "PHOENIX! Oh my sparkles, it is YOU! You are my very favourite person in the whole kingdom. I made this whole world just for you. What shall we play first?",
     "Phoenix is here! Everybody curtsey! 👑 I have been waiting all day to talk to you. Tell me something good."]},
   {id:'myname', k:'my name is,i am called,call me,this is me,name is', r:[
     "What a brilliant name! It is lovely to meet you properly. I am Princess Phoenix Sparkles, and you are officially invited to everything."]},
   {id:'bday', k:'birthday,turning five,i am five,im 5,i am 4,october,my party,getting older,how old am i', r:[
     "A birthday coming up?! That is the most exciting news. Turning <b>five</b> is a very big deal — five means you can count on one whole hand. I shall bake an imaginary cake immediately. 🎂"]},
   {id:'cats', w:2.6, k:'cat,cats,kitty,kitten,meow,my cat', r:[
     "CATS. My favourite subject. Did you know a cat can jump about <b>six times</b> its own body length? And they purr when they are happy — sometimes when they are poorly too, because purring helps them feel better.",
     "Meow! Cats have whiskers to measure whether a gap is wide enough to squeeze through. Little built-in measuring sticks!"]},
   {id:'rainbow', w:2.6, k:'rainbow,rainbows,colours in the sky', r:[
     "A <b>rainbow</b> happens when sunshine goes through raindrops and splits into all its colours. The colours are always in the same order: red, orange, yellow, green, blue, indigo, violet. Sunshine was hiding them the whole time!"]},
   {id:'sparkles', w:2.6, k:'sparkle,sparkles,glitter,shiny,sparkly', r:[
     "Sparkles are simply light bouncing off in lots of little directions at once. Which means whenever you sparkle, you are basically doing science. ✨"]},
   {id:'pink', k:'pink,my favorite color is pink,i like pink', r:[
     "<b>Bright pink</b> is a top-tier choice and I will not hear otherwise. Fun bit: pink is made by mixing red with white. You can make it yourself with paint!"]},
   {id:'dresses', k:'dress,dresses,twirl,girly,fancy,pretty clothes,princess dress', r:[
     "A dress that <b>twirls</b> is the best kind of dress. Go and do one twirl right now and come back and tell me how it went. I shall wait."]},
   {id:'brother', k:'brother,my brother,big brother,little brother,sibling,sister', r:[
     "Brothers are wonderful and also sometimes annoying, and both things can be true on the same day! What is the best thing you two do together?"]},
   {id:'family', k:'mom,dad,mum,parents,my family,grown up,grandma,grandpa', r:[
     "Families are the best team you will ever be on. What is your favourite thing you all do together?",
     "Tell your grown-up one thing you love about them today. Watch their face. It is like a magic trick that works every time."]},
   {id:'camping', k:'camping,tent,campfire,marshmallow,woods,sleeping bag,smores', r:[
     "CAMPING! Sleeping in a tent, the fire crackling, everything smelling like woodsmoke. Next time you go, look straight up at night — away from town you can see hundreds more stars."]},
   {id:'airplane', k:'airplane,plane,flying,flight,trip,vacation,airport,kentucky', r:[
     "A trip on an <b>airplane</b>! Here is a good bit: planes stay up because their wings make the air move faster over the top than underneath, and that lifts the whole thing. Ask for a window seat and watch the world get tiny."]},
   {id:'preschool', k:'preschool,school,kindergarten,teacher,my class,my friends at school', r:[
     "Preschool now and <b>kindergarten</b> next year — that is a huge step and you are going to be brilliant at it. What is the best thing you did at school today?"]},
   {id:'outmywindow', k:'where i live,my house,my town,outside my window,my street', r:[
     "Wherever you live, there is something worth spotting outside your window. Go and look and tell me the first thing you see — I want to guess whether it is a tree, a car or a bird."]},

   /* ── conversation. She asks, then keeps hold of the thread. ────────── */
   {id:'fun', w:2.4, k:'what do you like to do,for fun,what should we do,what do you do,hobby', r:[
     "Ooh, my favourites are painting, twirling, and learning something brand new before breakfast. What about YOU — are you an art person, an outside person, or a building person?"]},
   {id:'myday', k:'my day,today i,guess what,i did,we went,i got', r:[
     "Tell me EVERYTHING. I love a good story. What was the very best part?",
     "Ooh, go on! Was it the sort of day that needs a snack afterwards, or the sort that needs a nap?"]},
   {id:'park', w:2.4, k:'park,playground,swing,slide,monkey bars,outside,play outside', r:[
     "The park! Swings are my favourite because for one second at the top you are actually flying. Which do you go to first — swings, slide, or straight up the climbing frame?"]},
   {id:'artchat', w:2.4, k:'art,draw,drawing,paint,painting,color in,coloring,craft,make something', r:[
     "Painting is my number one. Rule of the kingdom: there is <b>no wrong way</b> to make art. A purple sky is allowed. A cat with wings is encouraged. What are you making?"]},
   {id:'favthing', k:'favorite,favourite,best thing,what do you love,i love', r:[
     "Lovely question. Mine are cats, rainbows, and the exact moment you understand something you did not understand a minute ago. What is yours?"]},
   {id:'yes', k:'yes,yeah,i do,me too,i did', r:[
     "YES! I knew it. Tell me more — I am completely gripped.",
     "Ooh good. Go on then, what happened next?"]},
   {id:'no', k:'no,not really,i dont,nope', r:[
     "That is completely fine! Not everybody likes everything, and that is what makes people interesting. What DO you like?"]},
   {id:'silly', k:'poop,pee,bum,fart,burp,toot,silly word,haha,lol,hehe', r:[
     "Hee hee! Right, we have both had our giggle. 😹 Now — quick, what rhymes with <b>cat</b>? I will start: hat, bat, mat…",
     "You are being <i>extremely</i> silly and honestly I respect it. Now say the silliest word you can invent. Make it up completely!"]},
   {id:'dontknow', k:'i do not know,i dunno,no idea,not sure,hmm', r:[
     "That is a perfectly good answer! Nobody knows everything — that is why learning is a thing. Want me to pick something for us instead?"]},
   {id:'again', k:'again,more,another one,keep going,one more', r:[
     "Again it is! I could do this all day. ✨"]},
   {id:'guess', k:'guess,guess what,i have a secret,know what', r:[
     "Ooh! Is it… a rainbow? A cat? A snack? No — tell me, tell me, I am terrible at waiting!"]}
  );


  /* ── She knows every page on the site, so she can send a child to the
        right one instead of just talking about it. ───────────────────── */
  var PAGES = [
    {u:'/counting-for-toddlers/',   n:'Counting for Toddlers', k:'count,counting,numbers,how many,1 2 3'},
    {u:'/simple-addition-for-kids/',n:'Simple Addition',       k:'add,adding,plus,math,maths,sum'},
    {u:'/learn-colors-for-kids/',   n:'Learn Colors',          k:'color,colour,rainbow,paint colors'},
    {u:'/alphabet-for-kids/',       n:'The Alphabet',          k:'alphabet,abc,letters,a b c'},
    {u:'/letter-sounds-phonics/',   n:'Letter Sounds',         k:'phonics,sounds,sound out,reading,blend'},
    {u:'/shapes-for-kids/',         n:'Shapes',                k:'shape,shapes,circle,square,triangle'},
    {u:'/science-for-toddlers/',    n:'Science for Toddlers',  k:'science,experiment,how does it work'},
    {u:'/space-facts-for-kids/',    n:'Space Facts',           k:'space,planet,moon,star,rocket,sun'},
    {u:'/animal-facts-for-kids/',   n:'Animal Facts',          k:'animal,animals,cat,dog,zebra,whale'},
    {u:'/dinosaurs-for-kids/',      n:'Dinosaurs',             k:'dinosaur,dino,fossil,t rex'},
    {u:'/weather-for-kids/',        n:'Weather',               k:'weather,rain,snow,cloud,storm,water cycle'},
    {u:'/kindergarten-readiness/',  n:'Ready for Big School',  k:'kindergarten,school,big school,preschool'},
    {u:'/feelings-for-kids/',       n:'Big Feelings',          k:'feeling,feelings,sad,angry,scared,emotion'},
    {u:'/affirmations-for-kids/',   n:'I Am Amazing',          k:'affirmation,confidence,brave,i can'},
    {u:'/spanish-for-kids/',        n:'Spanish for Kids',      k:'spanish,espanol,hola,another language'}
  ];
  function findPage(q){
    var t = ' ' + q.toLowerCase() + ' ', best = null, score = 0;
    PAGES.forEach(function(p){
      var s = 0;
      p.k.split(',').forEach(function(w){ if (t.indexOf(w.trim()) >= 0) s += w.trim().length; });
      if (s > score){ score = s; best = p; }
    });
    return score > 2 ? best : null;
  }
  function pageLink(p){
    return '<a href="' + p.u + '" style="color:#7a3ddb;font-weight:800">' + p.n + '</a>';
  }

  /* ── Study mode. She and Wormy run a tiny lesson, one step at a time. ── */
  var LESSONS = {
    counting: { title:'Counting', steps:[
      "Ready? Hold up one finger. That is <b>1</b>. Say it!",
      "Now two fingers. <b>2</b>. Brilliant.",
      "Three! <b>3</b>. You are quick at this.",
      "Four… <b>4</b>. Nearly a whole hand.",
      "And five! <b>5</b>. One whole hand! 🖐️",
      "Now all together: 1, 2, 3, 4, 5. You just counted to five. Wormy is very proud." ]},
    shapes: { title:'Shapes', steps:[
      "A <b>circle</b> is round all the way with no corners. Find something round near you!",
      "A <b>square</b> has 4 sides, all the same. Like a window!",
      "A <b>triangle</b> has 3 sides and 3 corners. Like a slice of pizza. 🍕",
      "Last one: a <b>rectangle</b> has 4 sides but two are longer. Like a door!",
      "Circle, square, triangle, rectangle. Four shapes learned. That is a proper lesson done!" ]},
    letters: { title:'Letter Sounds', steps:[
      "The letter <b>S</b> says <i>ssssss</i>, like a snake. Try it!",
      "The letter <b>M</b> says <i>mmmm</i>, like yummy food.",
      "The letter <b>A</b> says <i>ah</i>, like apple.",
      "Now blend: c - a - t. Slowly… then faster. <b>CAT</b>!",
      "You just read a word by sounding it out. That is exactly how reading works!" ]},
    colors: { title:'Colors', steps:[
      "Blue and yellow mixed together make <b>green</b>. Like grass!",
      "Red and blue make <b>purple</b>. Very royal.",
      "Red and yellow make <b>orange</b>. Like a pumpkin!",
      "Rainbow order never changes: red, orange, yellow, green, blue, indigo, violet.",
      "Lesson complete! Go and find something of every rainbow colour in your house." ]},
    kindness: { title:'Being Kind', steps:[
      "Kindness rule one: say the nice thing out loud. Thinking it does not count!",
      "Rule two: if somebody is left out, go and stand with them.",
      "Rule three: share the good stuff, not just the leftovers.",
      "Rule four: saying sorry properly means saying what you did, then what you will do next time.",
      "You already knew all of that, did you not? Kind people usually do." ]}
  };
  var study = null, studyAt = 0;
  function studyStep(which){
    if (which && LESSONS[which]){ study = which; studyAt = -1; }
    if (!study) return null;
    studyAt++;
    var L = LESSONS[study];
    if (studyAt === 0)
      return "📚 <b>" + L.title + " lesson!</b> Wormy has his glasses on. Say <b>next</b> when you are ready.<br><br>" + L.steps[0];
    if (studyAt < L.steps.length) return L.steps[studyAt];
    study = null; studyAt = 0;
    return "That is the whole lesson done! 🎓 You and Wormy make a good team. Want another one?";
  }

  KB.push(
   {id:'studymode', w:3, k:'study,lesson,teach me,learn with me,study partner,wormy,teach me something,school time', r:['__STUDY__']},
   {id:'next', w:2.8, k:'next,keep going,then what,go on,continue,more please', r:['__NEXT__']},
   {id:'wormyguy', k:'who is wormy,worm,wormy the worm,glasses worm', r:[
     "That is <b>Wormy the Worm</b>, my study partner! He wears little glasses and he has read about absolutely everything. He lives in the bubble patch. Say <b>study</b> and we will all learn together."]},
   {id:'whatpage', w:2.6, k:'where do i go,what page,show me a page,take me,which page,i want to learn about,got a page about', r:['__PAGE__']},
   {id:'whatgames', w:2.5, k:'what games,games,play a game,what can i play,fun stuff,things to do', r:[
     "So many! On the homepage you can <b>splat paint</b> on a wall, <b>build a snowman</b>, roll a marble through a <b>maze</b>, spell with <b>letter blocks</b>, decorate a <b>bedroom</b>, blow <b>bubbles</b>, and cuddle the <b>stuffies</b>. Which sounds best?",
     "My favourite is the <b>Splat Wall</b> — you can paint absolutely everywhere and never get in trouble. Try the <b>Marble Maze</b> too, it has three levels!"]},
   {id:'bored2', k:'im bored,nothing to do,what now,whats next', r:[
     "Never bored in this kingdom! Pick one: paint the wall, build a snowman, or let me teach you a quick lesson. Say <b>study</b> for the lesson!"]},

   /* ── more uplift, because a kid cannot hear this too often ────────── */
   {id:'proud', k:'i did it,i finished,look what i did,i made,i won,i got it', r:[
     "YOU DID IT! I am so proud I could twirl. Say this with me: <b>I did that.</b> Because you did!",
     "Look at you go! That thing was hard and you did it anyway. That is the whole secret, you know."]},
   {id:'tryagain', k:'i messed up,it broke,wrong,i failed,not working,bad at this', r:[
     "Good! That means you tried something hard enough to be worth trying. Brains grow the most in the wobbly bit. Go again — I am watching. 💪",
     "Every single person who is brilliant at something was rubbish at it first. Every one. Including me at twirling."]},
   {id:'tired', k:'tired,sleepy,yawn,i need a break,worn out', r:[
     "Then have a rest! Resting is part of learning, not the opposite of it. Go and have a stretch and a drink of water. I shall be right here."]},
   {id:'hungry', k:'hungry,snack,food,lunch,dinner,breakfast', r:[
     "Snack time! Go for something with a colour in it — an apple, a carrot, some berries. Colourful food is basically fuel for your brain. 🍎"]},
   {id:'iamgreat', k:'am i good,am i smart,do you like me,am i pretty,am i nice', r:[
     "You are <b>curious</b>, which is the best thing a person can be, and you are <b>kind</b>, which is the strongest. Those two beat everything else. Yes. Absolutely yes."]},
   {id:'scaredbig', k:'scared of big school,nervous about school,first day,new place,new kids', r:[
     "New things feel wobbly for everybody — even grown-ups, they just hide it better. Here is the trick: find one person and say hello. One is enough to start. You are braver than you think."]},
   {id:'balloon', k:'balloon,blow up,pop,party', r:[
     "Balloons! Here is a good one: a balloon flies about when you let it go because the air rushing out pushes it the other way. That is the same idea that makes a rocket work! 🎈"]},
   {id:'bubble', k:'bubble,bubbles,soap', r:[
     "Bubbles are my favourite. A bubble is just air wearing a very thin coat of soapy water — and it is always a ball shape, because that is the shape that uses the least skin!"]},
   {id:'dino2', k:'ride a dinosaur,dinosaur ride,unicorn,ride,fly', r:[
     "Hop on! 🦕 Today we are riding a dinosaur to the top of the tallest hill in the kingdom. Hold onto my crown. Where shall we go?"]}
  );

  var MISS = [
    "Ooh, I do not know that one <i>yet</i>! I am still learning too. Try me on <b>animals</b>, <b>space</b>, <b>colors</b>, <b>counting</b>, or say <b>joke</b>!",
    "Hmm! My kitty brain is small but growing every day. Ask me about <b>vegetables</b>, <b>the park</b>, <b>art</b>, or tell me how you are feeling.",
    "That one is not in my royal notebook yet. Ask a grown-up with me! Or try <b>riddle</b>, <b>shapes</b>, or <b>repeat after me</b>."
  ];

  function norm(s){ return (' '+String(s).toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ')+' '); }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function answer(q){
    var raw = q;

    /* mid-verification: a yes here means it is the real Phoenix */
    if (KID.asked && !KID.isPhoenix){
      if (/\b(yes|yeah|yep|ya|yup|uh huh|mhm|it does|correct|right)\b/i.test(raw)){
        KID.isPhoenix = true; KID.asked = false; phxAt = 0;
        return PHX[phxAt++];
      }
      if (/\b(no|nope|nah|nuh uh|it doesnt|does not)\b/i.test(raw)){
        KID.asked = false;
        return "A different Phoenix! Then you share a name with the princess of this whole kingdom, which is a very good name to have. Welcome! What shall we play?";
      }
    }
    /* she keeps the Phoenix chat rolling while there is more to say */
    if (KID.isPhoenix && phxAt < PHX.length &&
        /\b(yes|yeah|ok|okay|cool|wow|more|next|what else|tell me)\b/i.test(raw)){
      return PHX[phxAt++];
    }

    var nm = grabName(raw);
    if (nm && !KID.name){
      KID.name = cap(nm);
      if (nm === 'phoenix'){
        KID.asked = true;
        return "Phoenix?! That is MY name too! 👑 Quick question then — does your last name start with a <b>W</b>?";
      }
      return "Hello <b>" + KID.name + "</b>! What a brilliant name. I am Princess Phoenix Sparkles, and you are officially invited to everything. What shall we do first — a <b>joke</b>, a <b>lesson</b>, or a <b>game</b>?";
    }

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
    if(best.r[0]==='__STUDY__'){
      var pickL = ['counting','shapes','letters','colors','kindness'];
      var want = null;
      ['counting','shape','letter','color','colour','kind'].forEach(function(w,i){
        if(q.toLowerCase().indexOf(w)>=0) want = pickL[Math.min(i,4)];
      });
      return studyStep(want || pickL[Math.floor(Math.random()*pickL.length)]);
    }
    if(best.r[0]==='__NEXT__'){
      var s = studyStep();
      return s || "Next! What shall we do — a <b>joke</b>, a <b>lesson</b>, or shall I find you a page to explore?";
    }
    if(best.r[0]==='__PAGE__'){
      var p = findPage(q);
      return p ? "Perfect — go and visit " + pageLink(p) + "! It has three levels on it, so it grows with you. 👑"
               : "Ooh, tell me what you want to learn and I will find the right room. Try <b>counting</b>, <b>colors</b>, <b>space</b>, <b>dinosaurs</b> or <b>feelings</b>!";
    }
    /* if she is mid-lesson, keep the lesson going */
    if (study && /^(ok|okay|yes|yep|ready|done|got it)\b/i.test(q.trim())) return studyStep();
    /* and if a child names a subject, point them at the right page */
    var pg = findPage(q);
    if (pg && score < 6) return say3(best) + '<br><br>There is a whole room about that: ' + pageLink(pg) + ' 👑';
    var out = say3(best);
    if (KID.name && Math.random() < 0.22) out = out.replace(/^/, cap(KID.name) + ', ');
    return out;
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
      var b=D.createElement('button');
      b.className='pick p'+((i%6)+1);
      b.innerHTML=c.label; b.onclick=c.go;
      picks.appendChild(b);
    });
  }
  var MAIN=['Tell me a joke','Study with me! 📚','Repeat after me!','What games are there?',
            'Tell me about cats','I feel sad','Find me a page','Let us count'];
  function mainChips(){
    chips(MAIN.map(function(t){ return {label:t, go:function(){ speak(answer(t)); }}; }));
  }
  function setAge(a){ window.PWage=a; if(window.PWsync) window.PWsync(a); }
  window.PWspeak = function(t){ speak(t); };

  function send(){
    var v=ask.value.trim(); if(!v) return;
    ask.value=''; ask.blur(); speak(answer(v));
  }
  D.getElementById('send').onclick=send;
  ask.addEventListener('keydown',function(e){ if(e.key==='Enter') send(); });

  pcat.addEventListener('click',function(){
    if (host.classList.contains('mini')) { host.classList.remove('shy'); return; }
    face.setAttribute('href',FACES.silly);
    speak("You booped me! Boop you back. <b>Blep!</b>");
    setTimeout(function(){ face.setAttribute('href',FACES.happy); },1400);
  });

  /* ── arrival: down the slide small, grow, say hello, then poof to the
        corner as a little helper ───────────────────────────────────────── */
  function puff(){
    poof.innerHTML='';
    for (var i=0;i<14;i++){
      var p=D.createElement('b');
      p.style.setProperty('--tx',(Math.random()*260-130)+'px');
      p.style.setProperty('--ty',(Math.random()*220-140)+'px');
      p.style.animationDelay=(Math.random()*0.25)+'s';
      p.style.width=p.style.height=(26+Math.random()*46)+'px';
      poof.appendChild(p);
    }
    poof.classList.add('go');
    setTimeout(function(){ poof.classList.remove('go'); poof.innerHTML=''; }, 1400);
  }

  function toCorner(){
    if (host.classList.contains('mini')) return;
    speak("Watch this! ✨");
    pcat.classList.add('casting');
    setTimeout(puff, 620);
    setTimeout(function(){
      host.classList.add('mini');
      pcat.classList.remove('casting');
      speak("I am here to help you! What do you want to learn about?");
      mainChips();
    }, 1000);
  }

  function goodbye(){
    if (host.classList.contains('gone')) return;
    say.innerHTML = "Bye for now! Go be amazing. 👑";
    host.classList.add('riding');
    setTimeout(function(){
      host.classList.add('gone');
      host.classList.remove('riding');
      reopen.classList.add('on');
    }, 19500);
  }
  D.getElementById('closeme').onclick=goodbye;
  reopen.onclick=function(){
    host.classList.remove('gone');
    reopen.classList.remove('on');
    speak("You came back! Brilliant. What shall we learn?");
    mainChips();
  };

  mainChips();
  var isHome = D.body.getAttribute('data-pw') === 'home';
  if (!isHome){
    /* every other page: straight into the little corner helper */
    host.classList.add('mini');
    speak("I am here to help you! Ask me anything, or say <b>study</b> and we will learn together.");
    window.PWprincessReady = 1;
    return;
  }
  speak("Welcome to <b>Phoenix's World</b>, where <i>kids make rulz</i>! 😋<br>I am <b>Princess Phoenix Sparkles</b>. Let us learn something and have some fun!");
  host.classList.add('arriving');
  setTimeout(function(){ host.classList.remove('arriving'); }, 3000);
  setTimeout(toCorner, 8200);

  /* every now and then she does something daft on her own */
  var ANTICS = [
    function(){ speak("Watch this! 🤸 <b>FLIP!</b>"); pcat.classList.add('flipping');
      setTimeout(function(){ pcat.classList.remove('flipping'); }, 1300); },
    function(){ speak("Bubble time! 🫧"); blowBubbles(); },
    function(){ speak("🎈 Blowing up a balloon… and… letting it GO! Wheeee!"); },
    function(){ speak("Wormy says hello! 🐛 He is reading a book about clouds."); }
  ];
  function blowBubbles(){
    for (var i=0;i<10;i++){
      (function(i){
        setTimeout(function(){
          var b=D.createElement('b');
          b.className='floatbub';
          b.style.left=(10+Math.random()*80)+'vw';
          b.style.width=b.style.height=(16+Math.random()*40)+'px';
          b.style.animationDuration=(4+Math.random()*4)+'s';
          D.body.appendChild(b);
          setTimeout(function(){ b.remove(); }, 8000);
        }, i*140);
      })(i);
    }
  }
  setInterval(function(){
    if (host.classList.contains('mini') && !host.classList.contains('gone') && Math.random()<0.5)
      ANTICS[Math.floor(Math.random()*ANTICS.length)]();
  }, 42000);

  window.PWprincess = { bubbles:blowBubbles, toCorner:toCorner, goodbye:goodbye, setAge:setAge, speak:speak, ask:answer };
})();
