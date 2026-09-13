/* ==========================================================================
   home.js — everything you can touch on the Phoenix's World homepage.

   All artwork is drawn here as original SVG. No fail states anywhere: nothing
   can be lost, no timers, no scores that go down. Every draggable sets
   touch-action:none and uses pointer capture so a phone never scrolls the
   page while a child is dragging something.
   ========================================================================== */
(function(){
  var NS = 'http://www.w3.org/2000/svg', D = document;

  function el(t, a, p){
    var e = D.createElementNS(NS, t);
    for (var k in a) e.setAttribute(k, a[k]);
    if (p) p.appendChild(e);
    return e;
  }
  function rnd(a, b){ return a + Math.random() * (b - a); }
  function pickOne(a){ return a[Math.floor(Math.random() * a.length)]; }
  function say(t){ if (window.PWspeak) window.PWspeak(t); }

  /* turn any SVG element into something a finger can drag without the page
     running away underneath it */
  function draggable(node, svg, vbW, vbH, onDrop, onMove){
    var dragging = false, ox = 0, oy = 0;
    node.style.touchAction = 'none';
    node.style.cursor = 'grab';
    function pt(e){
      var r = svg.getBoundingClientRect();
      return { x:(e.clientX - r.left) / r.width * vbW, y:(e.clientY - r.top) / r.height * vbH };
    }
    node.addEventListener('pointerdown', function(e){
      if (node.dataset.locked) return;
      e.preventDefault();
      dragging = true;
      node.setPointerCapture(e.pointerId);
      node.style.cursor = 'grabbing';
      var p = pt(e), cur = (node.getAttribute('transform') || '').match(/translate\(([-\d.]+)[ ,]([-\d.]+)\)/);
      ox = p.x - (cur ? +cur[1] : 0);
      oy = p.y - (cur ? +cur[2] : 0);
    });
    node.addEventListener('pointermove', function(e){
      if (!dragging) return;
      e.preventDefault();
      var p = pt(e), x = p.x - ox, y = p.y - oy;
      node.setAttribute('transform', 'translate(' + x + ',' + y + ')');
      if (onMove) onMove(x, y);
    });
    function end(e){
      if (!dragging) return;
      dragging = false;
      node.style.cursor = 'grab';
      var m = (node.getAttribute('transform') || '').match(/translate\(([-\d.]+)[ ,]([-\d.]+)\)/);
      if (onDrop && m) onDrop(+m[1], +m[2]);
    }
    node.addEventListener('pointerup', end);
    node.addEventListener('pointercancel', end);
  }

  /* ════════ tumbling background shapes ════════ */
  (function(){
    var box = D.getElementById('bgshapes');
    var cols = ['#ff2d95','#ff6ec7','#ffd400','#00e5ff','#00ff9d','#b14bff','#ff7a00','#ff4d6d','#ff2d95','#ff6ec7'];
    var kinds = ['circle','square','triangle','blob'];
    for (var i = 0; i < 22; i++){
      var s = D.createElement('i'), size = rnd(60, 260), c = pickOne(cols), k = pickOne(kinds);
      s.style.left = rnd(-6, 96) + 'vw';
      s.style.top  = rnd(-5, 95) + 'vh';
      s.style.width = s.style.height = size + 'px';
      s.style.animationDuration = rnd(16, 40) + 's';
      s.style.animationDelay = (-rnd(0, 20)) + 's';
      s.style.background = c;
      if (k === 'circle') s.style.borderRadius = '50%';
      if (k === 'square') s.style.borderRadius = '22%';
      if (k === 'blob')   s.style.borderRadius = '60% 40% 55% 45% / 45% 55% 45% 55%';
      if (k === 'triangle'){
        s.style.background = 'transparent';
        s.style.borderLeft = (size/2) + 'px solid transparent';
        s.style.borderRight = (size/2) + 'px solid transparent';
        s.style.borderBottom = size + 'px solid ' + c;
        s.style.width = s.style.height = '0';
      }
      box.appendChild(s);
    }
  })();

  /* ════════ the nav blocks are real links in the HTML, so search engines
        and screen readers see them. This only adds the dragging. ════════ */
  (function(){
    var grid = D.getElementById('navgrid');
    if (!grid) return;
    [].slice.call(grid.querySelectorAll('.nb')).forEach(function(a){
      var moved = false, sx = 0, sy = 0;
      a.addEventListener('pointerdown', function(e){
        moved = false; sx = e.clientX; sy = e.clientY;
        a.setPointerCapture(e.pointerId);
      });
      a.addEventListener('pointermove', function(e){
        if (!a.hasPointerCapture || !a.hasPointerCapture(e.pointerId)) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) + Math.abs(dy) > 10){
          moved = true;
          a.classList.add('dragging');
          a.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.1) rotate(-3deg)';
        }
      });
      a.addEventListener('pointerup', function(e){
        a.classList.remove('dragging');
        if (moved){
          var after = null, kids = [].slice.call(grid.children);
          for (var i = 0; i < kids.length; i++){
            var r = kids[i].getBoundingClientRect();
            if (e.clientY < r.bottom - 8 && e.clientX < r.left + r.width / 2){ after = kids[i]; break; }
          }
          a.style.transform = '';
          grid.insertBefore(a, after);
        }
      });
      a.addEventListener('click', function(e){ if (moved) e.preventDefault(); });
    });
  })();

  /* ════════════════════ SPRING ════════════════════ */
  (function(){
    var svg = D.getElementById('springScene'), note = D.getElementById('springNote'),
        planted = 0, raining = false;
    el('rect', {x:0, y:0, width:760, height:300, fill:'#dff6ff'}, svg);
    el('path', {d:'M0 236 q120 -22 190 0 q110 -20 200 0 q120 -18 200 0 q90 -12 170 0 v64 H0 Z',
      fill:'#6ed17a'}, svg);
    el('rect', {x:0, y:270, width:760, height:30, fill:'#4fb863'}, svg);
    var rainG = el('g', {}, svg);
    var flowers = el('g', {}, svg);

    /* a friendly bee that loops the garden */
    var bee = el('g', {}, svg);
    el('ellipse', {cx:0, cy:0, rx:16, ry:12, fill:'#ffd84d', stroke:'#2b1b45','stroke-width':4}, bee);
    el('path', {d:'M-6 -11 v22 M4 -11 v22', stroke:'#2b1b45','stroke-width':4}, bee);
    el('ellipse', {cx:-4, cy:-14, rx:11, ry:7, fill:'#fff','fill-opacity':.8, stroke:'#2b1b45','stroke-width':3}, bee);
    el('circle', {cx:14, cy:-3, r:3, fill:'#2b1b45'}, bee);
    var t = 0;
    setInterval(function(){
      t += 0.02;
      bee.setAttribute('transform', 'translate(' + (380 + Math.sin(t) * 300) + ',' +
        (80 + Math.sin(t * 2.3) * 36) + ') scale(' + (Math.cos(t) > 0 ? 1 : -1) + ',1)');
    }, 30);

    function flower(x, y){
      var g = el('g', {transform:'translate(' + x + ',' + y + ') scale(0.02)',
        style:'transition:transform .6s cubic-bezier(.3,1.5,.4,1)'}, flowers);
      var c = pickOne(['#ff5fa2','#ffd84d','#a45cff','#ff8a3d','#fff']);
      el('path', {d:'M0 0 V-46', stroke:'#2f9e5e','stroke-width':7,'stroke-linecap':'round'}, g);
      el('path', {d:'M0 -20 q-22 -10 -28 6 q20 9 28 -6z', fill:'#2f9e5e', stroke:'#2b1b45','stroke-width':3}, g);
      [[0,-70],[22,-52],[-22,-52],[13,-26],[-13,-26]].forEach(function(p){
        el('circle', {cx:p[0], cy:p[1], r:13, fill:c, stroke:'#2b1b45','stroke-width':4}, g);
      });
      el('circle', {cx:0, cy:-48, r:11, fill:'#ffd84d', stroke:'#2b1b45','stroke-width':4}, g);
      setTimeout(function(){ g.setAttribute('transform', 'translate(' + x + ',' + y + ') scale(1)'); }, 30);
      planted++;
      note.textContent = planted >= 12 ? 'What a garden! 🌸 ' + planted + ' flowers!' : 'Flowers planted: ' + planted;
      if (planted === 5) say('Five flowers! Count them with me: 1, 2, 3, 4, 5.');
    }
    svg.addEventListener('pointerdown', function(e){
      var r = svg.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width * 760, y = (e.clientY - r.top) / r.height * 300;
      if (y > 215) flower(x, Math.min(288, y));
    });
    D.getElementById('growAll').onclick = function(){
      for (var i = 0; i < 8; i++) (function(i){ setTimeout(function(){
        flower(60 + i * 88 + rnd(-14, 14), rnd(240, 286)); }, i * 110); })(i);
      say('A whole garden! Flowers drink water through their stem like a straw.');
    };
    D.getElementById('rainBtn').onclick = function(){
      if (raining) return;
      raining = true;
      for (var i = 0; i < 40; i++){
        var d = el('rect', {x:rnd(0,760), y:rnd(-260,0), width:4, height:16, rx:2, fill:'#5bc6f5'}, rainG);
        d.style.transition = 'transform 1.6s linear, opacity 1.6s linear';
        (function(d){ setTimeout(function(){
          d.style.transform = 'translateY(340px)'; d.style.opacity = 0;
          setTimeout(function(){ d.remove(); }, 1700); }, rnd(0, 900)); })(d);
      }
      setTimeout(function(){ raining = false; }, 2600);
      note.textContent = 'Rain helps the flowers grow!';
      say('Rain is water that floated up into the clouds and got too heavy to stay!');
    };
  })();

  /* ════════════════════ SUMMER ════════════════════ */
  (function(){
    var svg = D.getElementById('summerScene'), note = D.getElementById('summerNote'), castles = 0;
    el('rect', {x:0, y:0, width:760, height:300, fill:'#bdefff'}, svg);
    var sun = el('g', {transform:'translate(96,72)'}, svg);
    var rays = el('g', {stroke:'#ffd84d','stroke-width':11,'stroke-linecap':'round', opacity:.85}, sun);
    el('path', {d:'M0 -66 V-44 M0 66 V44 M-66 0 H-44 M66 0 H44 M-47 -47 L-32 -32 M47 47 L32 32 M-47 47 L-32 32 M47 -47 L32 -32'}, rays);
    el('circle', {r:42, fill:'#ffd84d', stroke:'#f0b429','stroke-width':5}, sun);
    el('circle', {cx:-14, cy:-8, r:5, fill:'#2b1b45'}, sun);
    el('circle', {cx:14, cy:-8, r:5, fill:'#2b1b45'}, sun);
    el('path', {d:'M-15 8 q15 16 30 0', stroke:'#2b1b45','stroke-width':5, fill:'none','stroke-linecap':'round'}, sun);
    var deg = 0;
    setInterval(function(){ deg += 0.25; rays.setAttribute('transform', 'rotate(' + deg + ')'); }, 40);

    el('rect', {x:0, y:196, width:760, height:52, fill:'#3fb6e8'}, svg);
    var wave = el('path', {d:'M0 200 q48 -14 96 0 q48 14 96 0 q48 -14 96 0 q48 14 96 0 q48 -14 96 0 q48 14 96 0 q48 -14 96 0 q48 14 96 0 v16 H0 Z',
      fill:'#2ba3da'}, svg);
    el('rect', {x:0, y:248, width:760, height:52, fill:'#ffe0a3'}, svg);
    var sandG = el('g', {}, svg);

    var ball = el('g', {transform:'translate(560,236)', style:'cursor:grab'}, svg);
    el('circle', {r:26, fill:'#fff', stroke:'#2b1b45','stroke-width':5}, ball);
    el('path', {d:'M0 -26 a26 26 0 0 1 0 52 a14 26 0 0 1 0 -52z', fill:'#ff5fa2'}, ball);
    el('path', {d:'M0 -26 a26 26 0 0 0 0 52 a14 26 0 0 0 0 -52z', fill:'#4fc3f7'}, ball);
    el('circle', {r:26, fill:'none', stroke:'#2b1b45','stroke-width':5}, ball);
    draggable(ball, svg, 760, 300, function(){ say('Beach balls float because they are full of air!'); });

    function swimmer(x, y, hair){
      var g = el('g', {transform:'translate(' + x + ',' + y + ')'}, svg);
      el('circle', {r:17, fill:'#ffe1b8', stroke:'#2b1b45','stroke-width':5}, g);
      el('path', {d:'M-14 -8 q14 -12 28 0', stroke:hair,'stroke-width':8, fill:'none'}, g);
      el('circle', {cx:-6, cy:1, r:2.8, fill:'#2b1b45'}, g);
      el('circle', {cx:6, cy:1, r:2.8, fill:'#2b1b45'}, g);
      el('path', {d:'M-6 8 q6 6 12 0', stroke:'#2b1b45','stroke-width':3, fill:'none','stroke-linecap':'round'}, g);
      el('path', {d:'M-20 14 q-18 -12 -30 -2', stroke:'#ffe1b8','stroke-width':10,'stroke-linecap':'round'}, g);
      var b = 0;
      setInterval(function(){ b += 0.06;
        g.setAttribute('transform', 'translate(' + x + ',' + (y + Math.sin(b) * 7) + ') rotate(' + (Math.sin(b) * 5) + ')');
      }, 40);
    }
    swimmer(300, 206, '#8b5e3c'); swimmer(392, 212, '#e8b96a');

    D.getElementById('waveBtn').onclick = function(){
      wave.style.transition = 'transform .5s ease-in-out';
      wave.style.transform = 'translateY(-22px) scaleY(1.5)';
      setTimeout(function(){ wave.style.transform = ''; }, 620);
      note.textContent = 'Whoosh! 🌊';
      say('Waves are made by wind pushing on the top of the water!');
    };
    D.getElementById('castleBtn').onclick = function(){
      var x = rnd(80, 660), g = el('g', {transform:'translate(' + x + ',252) scale(0.05)',
        style:'transition:transform .6s cubic-bezier(.3,1.5,.4,1)'}, sandG);
      el('rect', {x:-38, y:-30, width:76, height:42, fill:'#e8b96a', stroke:'#2b1b45','stroke-width':5}, g);
      el('rect', {x:-52, y:-52, width:22, height:64, fill:'#e8b96a', stroke:'#2b1b45','stroke-width':5}, g);
      el('rect', {x:30, y:-52, width:22, height:64, fill:'#e8b96a', stroke:'#2b1b45','stroke-width':5}, g);
      el('path', {d:'M-41 -52 l-6 -16 l6 5 l6 -5 z M41 -52 l6 -16 l-6 5 l-6 -5 z', fill:'#e8b96a', stroke:'#2b1b45','stroke-width':4}, g);
      el('path', {d:'M0 -30 v-22 l18 8 z', fill:'#ff5fa2', stroke:'#2b1b45','stroke-width':4}, g);
      setTimeout(function(){ g.setAttribute('transform', 'translate(' + x + ',252) scale(1)'); }, 30);
      castles++;
      note.textContent = 'Sandcastles built: ' + castles;
      if (castles === 3) say('Three sandcastles! Wet sand sticks together because water pulls the grains close.');
    };
  })();

  /* ════════════════════ AUTUMN ════════════════════ */
  (function(){
    var svg = D.getElementById('autumnScene'), note = D.getElementById('autumnNote'), swept = 0;
    el('rect', {x:0, y:0, width:760, height:300, fill:'#ffeccd'}, svg);
    el('rect', {x:0, y:252, width:760, height:48, fill:'#c9a86a'}, svg);
    var pile = el('g', {}, svg);
    var tree = el('g', {transform:'translate(180,0)'}, svg);
    el('rect', {x:-18, y:150, width:36, height:104, fill:'#8b5e3c', stroke:'#2b1b45','stroke-width':5}, tree);
    el('path', {d:'M0 160 l-40 -34 M0 184 l40 -38', stroke:'#8b5e3c','stroke-width':11,'stroke-linecap':'round'}, tree);
    var crown = el('g', {}, tree);
    el('circle', {cy:96, r:66, fill:'#ff8a3d', stroke:'#2b1b45','stroke-width':5}, crown);
    el('circle', {cx:-54, cy:128, r:40, fill:'#e2562a', stroke:'#2b1b45','stroke-width':5}, crown);
    el('circle', {cx:54, cy:128, r:40, fill:'#ffc03d', stroke:'#2b1b45','stroke-width':5}, crown);

    /* a pumpkin and an acorn to tap */
    var pump = el('g', {transform:'translate(470,226)', class:'hot'}, svg);
    el('ellipse', {rx:50, ry:42, fill:'#ff8a3d', stroke:'#2b1b45','stroke-width':5}, pump);
    el('path', {d:'M-18 -34 q-11 36 0 72 M18 -34 q11 36 0 72', stroke:'#c85a1e','stroke-width':5, fill:'none'}, pump);
    el('rect', {x:-9, y:-52, width:18, height:20, rx:6, fill:'#2f9e5e', stroke:'#2b1b45','stroke-width':5}, pump);
    pump.addEventListener('click', function(){
      say('A pumpkin is a <b>fruit</b>, not a vegetable, because it grows from a flower and has seeds!');
    });

    function leaf(x, y){
      var c = pickOne(['#ff8a3d','#e2562a','#ffc03d','#c9722a']);
      var g = el('g', {transform:'translate(' + x + ',' + y + ')'}, pile);
      el('path', {d:'M0 0 q16 10 0 26 q-16 -16 0 -26z', fill:c, stroke:'#2b1b45','stroke-width':3}, g);
      return g;
    }
    function drop(n){
      for (var i = 0; i < n; i++){
        (function(i){
          setTimeout(function(){
            var x = rnd(90, 300), g = leaf(x, 90);
            g.style.transition = 'transform 1.9s cubic-bezier(.4,.1,.6,1)';
            setTimeout(function(){
              g.style.transform = 'translate(' + rnd(-40, 90) + 'px,' + rnd(150, 175) + 'px) rotate(' + rnd(-260, 260) + 'deg)';
            }, 20);
          }, i * 90);
        })(i);
      }
    }
    function shake(){
      crown.style.transition = 'transform .12s';
      var n = 0, iv = setInterval(function(){
        crown.style.transform = 'rotate(' + (n % 2 ? 3 : -3) + 'deg)';
        if (++n > 7){ clearInterval(iv); crown.style.transform = ''; }
      }, 120);
      drop(18);
      note.textContent = 'Leaves are falling! 🍂';
      say('Leaves turn red and gold when the tree stops making green food for winter.');
    }
    tree.style.cursor = 'pointer';
    tree.addEventListener('click', shake);
    D.getElementById('shakeBtn').onclick = shake;
    /* a rake sweeps across the ground and gathers the leaves into a pile */
    var rake = el('g', {transform:'translate(-120,236)', opacity:'0'}, svg);
    el('path', {d:'M0 0 L34 -96', stroke:'#a5703f','stroke-width':10,'stroke-linecap':'round'}, rake);
    el('path', {d:'M34 -96 q10 -10 20 -4', stroke:'#a5703f','stroke-width':10, fill:'none','stroke-linecap':'round'}, rake);
    el('path', {d:'M-30 2 L30 2', stroke:'#69737f','stroke-width':9,'stroke-linecap':'round'}, rake);
    for (var ti = -30; ti <= 30; ti += 10)
      el('path', {d:'M' + ti + ' 2 L' + (ti - 3) + ' 20', stroke:'#69737f','stroke-width':6,'stroke-linecap':'round'}, rake);

    D.getElementById('rakeBtn').onclick = function(){
      var kids = [].slice.call(pile.children);
      if (!kids.length){ note.textContent = 'Shake the tree first to get some leaves!'; return; }

      rake.setAttribute('opacity', '1');
      rake.style.transition = 'transform 2.2s linear';
      rake.setAttribute('transform', 'translate(-120,236)');
      requestAnimationFrame(function(){
        rake.style.transform = 'translate(700px,0)';
      });

      /* each leaf gets pushed along and lands in a heap on the ground */
      kids.forEach(function(g, i){
        var cur = (g.getAttribute('transform') || '').match(/translate\(([-\d.]+)[ ,]([-\d.]+)\)/);
        var cx = cur ? +cur[1] : 0, cy = cur ? +cur[2] : 0;
        var px = 540 + (i % 7) * 16 + rnd(-6, 6);          /* heap position */
        var py = 252 - Math.floor(i / 7) * 12 + rnd(-3, 3);  /* stacked on the ground */
        g.style.transition = 'transform 1.1s ease-in';
        setTimeout(function(){
          g.style.transform = 'translate(' + (px - cx) + 'px,' + (py - cy) + 'px) rotate(' + rnd(-40, 40) + 'deg)';
        }, 300 + i * 45);
      });

      swept += kids.length;
      note.textContent = 'Raking…';
      setTimeout(function(){
        rake.style.transition = 'opacity .4s';
        rake.setAttribute('opacity', '0');
        note.textContent = 'Swept up ' + swept + ' leaves into a big pile! 🍂 Jump in!';
        say('You raked <b>' + kids.length + '</b> leaves into a pile! Leaves fall so the tree can rest all winter.');
      }, 2400);
    };
    drop(10);
  })();

  /* ════════════════════ WINTER — build a snowman ════════════════════ */
  (function(){
    var svg = D.getElementById('winterScene'), note = D.getElementById('winterNote'),
        placed = 0, sunny = false;
    var sky = el('rect', {x:0, y:0, width:760, height:300, fill:'#dff1ff'}, svg);
    el('rect', {x:0, y:244, width:760, height:56, fill:'#fff'}, svg);
    el('path', {d:'M0 244 q100 -24 190 0 q100 -22 200 0 q90 -20 190 0 q80 -16 180 0 v56 H0 Z', fill:'#f4fbff'}, svg);
    var snowG = el('g', {}, svg);
    var winterSun = el('g', {transform:'translate(672,64) scale(0)',
      style:'transition:transform .8s cubic-bezier(.3,1.5,.4,1)'}, svg);
    el('circle', {r:38, fill:'#ffd84d', stroke:'#f0b429','stroke-width':5}, winterSun);
    el('circle', {cx:-12, cy:-6, r:4.5, fill:'#2b1b45'}, winterSun);
    el('circle', {cx:12, cy:-6, r:4.5, fill:'#2b1b45'}, winterSun);
    el('path', {d:'M-13 8 q13 14 26 0', stroke:'#2b1b45','stroke-width':5, fill:'none','stroke-linecap':'round'}, winterSun);

    /* the snowman himself */
    var sm = el('g', {transform:'translate(300,0)'}, svg);
    el('circle', {cx:0, cy:226, r:58, fill:'#fff', stroke:'#2b1b45','stroke-width':6}, sm);
    el('circle', {cx:0, cy:156, r:44, fill:'#fff', stroke:'#2b1b45','stroke-width':6}, sm);
    el('circle', {cx:0, cy:98, r:34, fill:'#fff', stroke:'#2b1b45','stroke-width':6}, sm);
    el('path', {d:'M-42 152 L-96 122 M42 152 L96 122', stroke:'#8b5e3c','stroke-width':8,'stroke-linecap':'round'}, sm);
    el('circle', {cx:0, cy:214, r:6, fill:'#2b1b45'}, sm);
    el('circle', {cx:0, cy:238, r:6, fill:'#2b1b45'}, sm);

    var targets = {
      carrot:{x:300, y:100, hit:false},
      eyeL:  {x:288, y:88,  hit:false},
      eyeR:  {x:312, y:88,  hit:false},
      hat:   {x:300, y:62,  hit:false}
    };
    function makePiece(name, home, build){
      var g = el('g', {transform:'translate(' + home.x + ',' + home.y + ')'}, svg);
      build(g);
      draggable(g, svg, 760, 300, function(x, y){
        var t = targets[name];
        if (Math.abs(x - t.x) < 46 && Math.abs(y - t.y) < 46){
          g.setAttribute('transform', 'translate(' + t.x + ',' + t.y + ')');
          g.dataset.locked = 1; g.style.cursor = 'default';
          if (!t.hit){
            t.hit = true; placed++;
            note.textContent = placed >= 4 ? 'He is finished! What a snowman! ⛄'
                                           : 'Pieces on: ' + placed + ' of 4';
            if (placed >= 4) say('You built a whole snowman! Snow is tiny ice crystals, and no two snowflakes are the same.');
          }
        }
      });
      return g;
    }
    makePiece('carrot', {x:110, y:292}, function(g){
      el('path', {d:'M-4 -8 L30 0 L-4 8 z', fill:'#ff8a3d', stroke:'#2b1b45','stroke-width':4,'stroke-linejoin':'round'}, g);
      el('path', {d:'M6 -4 h8 M14 0 h8', stroke:'#c85a1e','stroke-width':2.5}, g);
    });
    makePiece('eyeL', {x:174, y:292}, function(g){ el('circle', {r:10, fill:'#2b1b45'}, g); });
    makePiece('eyeR', {x:206, y:292}, function(g){ el('circle', {r:10, fill:'#2b1b45'}, g); });
    makePiece('hat', {x:470, y:290}, function(g){
      el('rect', {x:-46, y:-4, width:92, height:12, rx:5, fill:'#2b1b45'}, g);
      el('rect', {x:-28, y:-44, width:56, height:42, fill:'#2b1b45'}, g);
      el('rect', {x:-28, y:-16, width:56, height:10, fill:'#ff5fa2'}, g);
    });

    function flakes(n){
      for (var i = 0; i < n; i++){
        (function(){
          var x = rnd(0, 760), f = el('circle', {cx:x, cy:rnd(-90, 0), r:rnd(3, 7), fill:'#fff',
            stroke:'#cfe3f5','stroke-width':1.5}, snowG);
          f.style.transition = 'transform ' + rnd(3, 6) + 's linear, opacity .5s';
          setTimeout(function(){
            f.style.transform = 'translate(' + rnd(-30, 30) + 'px,340px)';
            setTimeout(function(){ f.remove(); }, 6000);
          }, rnd(0, 900));
        })();
      }
    }
    flakes(26);
    setInterval(function(){ if (!sunny) flakes(6); }, 1800);
    D.getElementById('snowBtn').onclick = function(){ sunny = false; flakes(30);
      note.textContent = 'More snow! ❄️'; say('Snow is frozen water. Every snowflake has six sides!'); };
    D.getElementById('sunBtn').onclick = function(){
      sunny = true;
      sky.setAttribute('fill', '#bfe8ff');
      winterSun.setAttribute('transform', 'translate(672,64) scale(1)');
      note.textContent = 'The sun came out! ☀️ (That is not really how weather works, but it is our world!)';
      say("The sun came out! In real life you cannot call the sun out whenever you like, but in <i>this</i> world you can.");
    };
  })();

  /* ════════════════════ SPLAT WALL ════════════════════ */
  (function(){
    var svg = D.getElementById('paintWall'), cols = D.getElementById('paintCols'),
        PAL = ['#ff5fa2','#ffd84d','#4fc3f7','#5ed17a','#a45cff','#ff8a3d','#2b1b45','#fff'],
        cur = PAL[0];
    el('rect', {x:0, y:0, width:400, height:300, fill:'#f6eee6'}, svg);
    el('path', {d:'M0 250 H400', stroke:'#d8cabb','stroke-width':6}, svg);
    el('rect', {x:0, y:256, width:400, height:44, fill:'#c9a86a'}, svg);
    var splats = el('g', {}, svg);

    PAL.forEach(function(c, i){
      var b = D.createElement('button');
      b.className = 'sw' + (i === 0 ? ' on' : '');
      b.style.background = c;
      b.setAttribute('aria-label', 'paint colour');
      b.onclick = function(){
        cur = c;
        [].slice.call(cols.children).forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
      };
      cols.appendChild(b);
    });

    function splat(x, y){
      var g = el('g', {transform:'translate(' + x + ',' + y + ') scale(0.1)',
        style:'transition:transform .35s cubic-bezier(.3,1.6,.4,1)'}, splats);
      var r = rnd(14, 26);
      el('circle', {r:r, fill:cur}, g);
      for (var i = 0; i < 7; i++){
        var a = Math.PI * 2 / 7 * i + rnd(-.3, .3), d = r + rnd(4, 20);
        el('circle', {cx:Math.cos(a) * d, cy:Math.sin(a) * d, r:rnd(3, 9), fill:cur}, g);
      }
      /* a drip, because drips are the best part */
      el('path', {d:'M0 ' + r + ' q5 ' + rnd(14, 40) + ' 0 ' + rnd(22, 54) + ' q-5 -14 0 -' + rnd(22, 54),
        fill:cur}, g);
      setTimeout(function(){ g.setAttribute('transform', 'translate(' + x + ',' + y + ') scale(1)'); }, 20);
    }
    var painting = false;
    function pos(e){
      var r = svg.getBoundingClientRect();
      return { x:(e.clientX - r.left) / r.width * 400, y:(e.clientY - r.top) / r.height * 300 };
    }
    svg.style.touchAction = 'none';
    svg.addEventListener('pointerdown', function(e){
      e.preventDefault(); painting = true; svg.setPointerCapture(e.pointerId);
      var p = pos(e); splat(p.x, p.y);
    });
    svg.addEventListener('pointermove', function(e){
      if (!painting) return;
      e.preventDefault();
      if (Math.random() < .45){ var p = pos(e); splat(p.x, p.y); }
    });
    svg.addEventListener('pointerup', function(){ painting = false; });
    D.getElementById('clearWall').onclick = function(){
      splats.innerHTML = '';
      say('All clean! Paint it again — you can never get in trouble for painting in here.');
    };
  })();

  /* ════════════════════ DECORATE THE ROOM ════════════════════ */
  (function(){
    var svg = D.getElementById('room'), cols = D.getElementById('roomCols'),
        PAL = ['#ffd0e8','#cfe9ff','#d6ffd9','#fff0c2','#e9d8ff','#ffe0cc'];
    var wall = el('rect', {x:0, y:0, width:400, height:214, fill:'#ffd0e8'}, svg);
    el('rect', {x:0, y:214, width:400, height:86, fill:'#c9a86a'}, svg);
    el('path', {d:'M0 214 H400', stroke:'#8b5e3c','stroke-width':6}, svg);
    el('rect', {x:250, y:42, width:96, height:80, rx:8, fill:'#bfe8ff', stroke:'#2b1b45','stroke-width':5}, svg);
    el('path', {d:'M298 42 V122 M250 82 H346', stroke:'#2b1b45','stroke-width':5}, svg);

    PAL.forEach(function(c, i){
      var b = D.createElement('button');
      b.className = 'sw' + (i === 0 ? ' on' : '');
      b.style.background = c;
      b.setAttribute('aria-label', 'wall colour');
      b.onclick = function(){
        wall.setAttribute('fill', c);
        [].slice.call(cols.children).forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
      };
      cols.appendChild(b);
    });

    function piece(x, y, build){
      var g = el('g', {transform:'translate(' + x + ',' + y + ')'}, svg);
      build(g);
      draggable(g, svg, 400, 300);
      return g;
    }
    piece(80, 236, function(g){            /* bed */
      el('rect', {x:-58, y:-26, width:116, height:34, rx:7, fill:'#ff9ed2', stroke:'#2b1b45','stroke-width':5}, g);
      el('rect', {x:-58, y:-48, width:34, height:24, rx:7, fill:'#fff', stroke:'#2b1b45','stroke-width':5}, g);
      el('rect', {x:-62, y:6, width:124, height:12, rx:5, fill:'#8b5e3c', stroke:'#2b1b45','stroke-width':4}, g);
    });
    piece(300, 244, function(g){           /* toy box */
      el('rect', {x:-34, y:-30, width:68, height:44, rx:7, fill:'#ffd84d', stroke:'#2b1b45','stroke-width':5}, g);
      el('path', {d:'M-34 -14 H34', stroke:'#2b1b45','stroke-width':4}, g);
      el('circle', {cy:-22, r:5, fill:'#2b1b45'}, g);
    });
    piece(196, 224, function(g){           /* lamp */
      el('path', {d:'M0 0 v-42', stroke:'#69737f','stroke-width':6}, g);
      el('path', {d:'M-24 -42 h48 l-10 -28 h-28 z', fill:'#ffd84d', stroke:'#2b1b45','stroke-width':5,'stroke-linejoin':'round'}, g);
      el('ellipse', {cy:2, rx:18, ry:6, fill:'#69737f', stroke:'#2b1b45','stroke-width':4}, g);
    });
    piece(150, 272, function(g){           /* rug */
      el('ellipse', {rx:56, ry:20, fill:'#a45cff', stroke:'#2b1b45','stroke-width':5}, g);
      el('ellipse', {rx:34, ry:11, fill:'#c9a2ff'}, g);
    });
    piece(352, 200, function(g){           /* a cat, obviously */
      el('ellipse', {cy:6, rx:26, ry:20, fill:'#ffb15c', stroke:'#2b1b45','stroke-width':5}, g);
      el('circle', {cx:-2, cy:-18, r:17, fill:'#ffb15c', stroke:'#2b1b45','stroke-width':5}, g);
      el('path', {d:'M-16 -30 l-3 -15 l14 8z M12 -30 l3 -15 l-14 8z', fill:'#ffb15c', stroke:'#2b1b45','stroke-width':4,'stroke-linejoin':'round'}, g);
      el('circle', {cx:-8, cy:-19, r:2.6, fill:'#2b1b45'}, g);
      el('circle', {cx:5, cy:-19, r:2.6, fill:'#2b1b45'}, g);
      el('path', {d:'M-2 -13 q4 4 8 0', stroke:'#2b1b45','stroke-width':2.5, fill:'none'}, g);
      el('path', {d:'M24 4 q22 -6 16 -24', stroke:'#ffb15c','stroke-width':9, fill:'none','stroke-linecap':'round'}, g);
    });
  })();

  /* ════════════════════ MARBLE MAZE ════════════════════ */
  (function(){
    var svg = D.getElementById('maze'), note = D.getElementById('mazeNote'),
        lvBox = D.getElementById('mazeLv'), lv = 0, cur = null;

    MAZES.forEach(function(m, i){
      var b = D.createElement('button');
      b.className = 'lv' + (i === 0 ? ' on' : '');
      b.textContent = m.name;
      b.onclick = function(){
        lv = i;
        [].slice.call(lvBox.children).forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        build();
      };
      lvBox.appendChild(b);
    });

    function build(){
      svg.innerHTML = '';
      var m = MAZES[lv], W = 400, H = 300, pad = 14,
          cw = (W - pad * 2) / m.w, ch = (H - pad * 2) / m.h,
          cell = Math.min(cw, ch),
          ox = (W - cell * m.w) / 2, oy = (H - cell * m.h) / 2;
      cur = { m:m, cell:cell, ox:ox, oy:oy, cx:0, cy:0, done:false };

      el('rect', {x:0, y:0, width:W, height:H, fill:'#f2f7ff'}, svg);
      /* goal first so the marble sits on top */
      var gx = ox + (m.w - .5) * cell, gy = oy + (m.h - .5) * cell;
      el('path', {d:'M' + gx + ' ' + (gy - cell * .3) + ' l' + (cell * .09) + ' ' + (cell * .2) +
        ' l' + (cell * .22) + ' ' + (cell * .03) + ' l-' + (cell * .16) + ' ' + (cell * .16) +
        ' l' + (cell * .05) + ' ' + (cell * .22) + ' l-' + (cell * .2) + ' -' + (cell * .12) +
        ' l-' + (cell * .2) + ' ' + (cell * .12) + ' l' + (cell * .05) + ' -' + (cell * .22) +
        ' l-' + (cell * .16) + ' -' + (cell * .16) + ' l' + (cell * .22) + ' -' + (cell * .03) + ' z',
        fill:'#ffd84d', stroke:'#2b1b45','stroke-width':3,'stroke-linejoin':'round'}, svg);

      var g = el('g', {stroke:'#2b1b45','stroke-width':5,'stroke-linecap':'round'}, svg);
      for (var y = 0; y < m.h; y++){
        for (var x = 0; x < m.w; x++){
          var open = m.cells[x + ',' + y], X = ox + x * cell, Y = oy + y * cell;
          if (open.indexOf('N') < 0) el('path', {d:'M' + X + ' ' + Y + ' h' + cell}, g);
          if (open.indexOf('W') < 0) el('path', {d:'M' + X + ' ' + Y + ' v' + cell}, g);
          if (x === m.w - 1 && open.indexOf('E') < 0) el('path', {d:'M' + (X + cell) + ' ' + Y + ' v' + cell}, g);
          if (y === m.h - 1 && open.indexOf('S') < 0) el('path', {d:'M' + X + ' ' + (Y + cell) + ' h' + cell}, g);
        }
      }

      var ball = el('circle', {cx:ox + cell * .5, cy:oy + cell * .5, r:cell * .3,
        fill:'#d8dee6', stroke:'#2b1b45','stroke-width':4}, svg);
      el('circle', {cx:ox + cell * .4, cy:oy + cell * .4, r:cell * .1, fill:'#fff'}, svg);
      cur.ball = ball;
      note.textContent = 'Drag the marble to the gold star! (' + m.name + ')';

      /* movement is cell by cell, and only through gaps — so it can never
         cut a corner or get stuck in a wall */
      var DIRS = { N:[0,-1], S:[0,1], E:[1,0], W:[-1,0] };
      function tryMove(tx, ty){
        var want = null;
        if (tx > cur.cx) want = 'E'; else if (tx < cur.cx) want = 'W';
        else if (ty > cur.cy) want = 'S'; else if (ty < cur.cy) want = 'N';
        if (!want) return;
        if (cur.m.cells[cur.cx + ',' + cur.cy].indexOf(want) < 0) return;   /* wall */
        cur.cx += DIRS[want][0]; cur.cy += DIRS[want][1];
        ball.setAttribute('cx', cur.ox + (cur.cx + .5) * cur.cell);
        ball.setAttribute('cy', cur.oy + (cur.cy + .5) * cur.cell);
        if (!cur.done && cur.cx === cur.m.w - 1 && cur.cy === cur.m.h - 1){
          cur.done = true;
          note.textContent = 'YOU DID IT! ⭐ Try a harder one!';
          say('You solved the <b>' + cur.m.name + '</b> maze! Mazes are puzzles for your fingers AND your brain.');
        }
      }
      var dragging = false;
      svg.style.touchAction = 'none';
      function at(e){
        var r = svg.getBoundingClientRect();
        return { x:Math.floor(((e.clientX - r.left) / r.width * 400 - cur.ox) / cur.cell),
                 y:Math.floor(((e.clientY - r.top) / r.height * 300 - cur.oy) / cur.cell) };
      }
      svg.onpointerdown = function(e){ e.preventDefault(); dragging = true; svg.setPointerCapture(e.pointerId); };
      svg.onpointermove = function(e){
        if (!dragging) return;
        e.preventDefault();
        var c = at(e);
        if (c.x < 0 || c.y < 0 || c.x >= cur.m.w || c.y >= cur.m.h) return;
        for (var guard = 0; guard < 3 && (c.x !== cur.cx || c.y !== cur.cy); guard++) tryMove(c.x, c.y);
      };
      svg.onpointerup = function(){ dragging = false; };
    }
    build();
  })();

  /* ════════════════════ LETTER BLOCKS ════════════════════ */
  (function(){
    var svg = D.getElementById('blocks'), note = D.getElementById('blockNote'),
        WORDS = ['CAT','DOG','SUN','HAT','STAR','BOOK','TREE','FISH','MOON','CAKE'],
        word = '', slots = [], done = 0;

    function build(){
      svg.innerHTML = ''; slots = []; done = 0;
      word = pickOne(WORDS);
      el('rect', {x:0, y:0, width:400, height:300, fill:'#fff8ef'}, svg);
      el('rect', {x:20, y:96, width:360, height:12, rx:5, fill:'#8b5e3c', stroke:'#2b1b45','stroke-width':4}, svg);

      var n = word.length, bw = 58, gap = 10,
          total = n * bw + (n - 1) * gap, sx = (400 - total) / 2;
      for (var i = 0; i < n; i++){
        var x = sx + i * (bw + gap);
        el('rect', {x:x, y:36, width:bw, height:58, rx:9, fill:'none',
          stroke:'#c3b6a6','stroke-width':4,'stroke-dasharray':'9 7'}, svg);
        slots.push({ x:x + bw / 2, y:65, letter:word[i], filled:false });
      }

      /* blocks shuffled along the bottom */
      var order = word.split('').map(function(c, i){ return { c:c, i:i }; })
        .sort(function(){ return Math.random() - .5; });
      order.forEach(function(o, k){
        var hx = 44 + k * (bw + gap), hy = 220;
        var g = el('g', {transform:'translate(' + hx + ',' + hy + ')'}, svg);
        var c = ['#ff5fa2','#4fc3f7','#5ed17a','#ffd84d','#a45cff','#ff8a3d'][k % 6];
        el('rect', {x:-29, y:-29, width:58, height:58, rx:10, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
        el('rect', {x:-22, y:-22, width:44, height:44, rx:7, fill:'#fff','fill-opacity':.35}, g);
        var t = el('text', {x:0, y:11, 'text-anchor':'middle',
          'font-family':'Trebuchet MS, Verdana, sans-serif', 'font-size':34, 'font-weight':800,
          fill:'#2b1b45'}, g);
        t.textContent = o.c;
        draggable(g, svg, 400, 300, function(x, y){
          for (var s = 0; s < slots.length; s++){
            var sl = slots[s];
            if (!sl.filled && sl.letter === o.c && Math.abs(x - sl.x) < 40 && Math.abs(y - sl.y) < 44){
              g.setAttribute('transform', 'translate(' + sl.x + ',' + sl.y + ')');
              g.dataset.locked = 1; g.style.cursor = 'default';
              sl.filled = true; done++;
              note.textContent = done === slots.length
                ? 'You spelled ' + word + '! ⭐ Say it out loud!'
                : 'Letters placed: ' + done + ' of ' + slots.length;
              if (done === slots.length)
                say('You spelled <b>' + word + '</b>! ' + word.split('').join(' - ') + '. Brilliant!');
              return;
            }
          }
        });
      });
      note.textContent = 'Spell the word: ' + word;
    }
    D.getElementById('newWord').onclick = build;
    build();
  })();

  /* ════════════════════ STUFFIES ════════════════════ */
  (function(){
    var svg = D.getElementById('stuffies'), note = D.getElementById('stuffNote');
    el('rect', {x:0, y:0, width:400, height:260, fill:'#fff3fa'}, svg);
    el('rect', {x:0, y:214, width:400, height:46, fill:'#e8b96a'}, svg);
    el('path', {d:'M0 214 H400', stroke:'#c9922f','stroke-width':5}, svg);

    var LINES = {
      cat:'Meow! Cats purr when they are happy — and sometimes to feel better when they are poorly.',
      bear:'Bear hug! Real bears sleep all winter long. That is called hibernating.',
      bunny:'Boing! A rabbit can hop nearly ten times its own body length.',
      dino:'RAAWR! Some dinosaurs were as small as a chicken. Birds are their living cousins!',
      duck:'Quack! Ducks have waterproof feathers, so rain just rolls right off.'
    };
    function wobble(g){
      g.style.transition = 'transform .18s';
      var n = 0, iv = setInterval(function(){
        g.style.transform = 'rotate(' + (n % 2 ? 9 : -9) + 'deg) scale(1.08)';
        if (++n > 5){ clearInterval(iv); g.style.transform = ''; }
      }, 130);
    }
    function stuffie(x, kind, body, build){
      var g = el('g', {transform:'translate(' + x + ',196)', style:'cursor:pointer'}, svg);
      g.style.transformBox = 'fill-box';
      g.style.transformOrigin = 'center';
      build(g, body);
      g.addEventListener('click', function(){
        wobble(g); note.textContent = 'You cuddled the ' + kind + '! 🤍'; say(LINES[kind]);
      });
    }
    stuffie(56, 'cat', '#ffb15c', function(g, c){
      el('ellipse', {cy:6, rx:30, ry:26, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('circle', {cy:-28, r:24, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('path', {d:'M-20 -44 l-5 -20 l19 11z M20 -44 l5 -20 l-19 11z', fill:c, stroke:'#2b1b45','stroke-width':4,'stroke-linejoin':'round'}, g);
      el('circle', {cx:-9, cy:-30, r:3.4, fill:'#2b1b45'}, g);
      el('circle', {cx:9, cy:-30, r:3.4, fill:'#2b1b45'}, g);
      el('path', {d:'M0 -24 q5 5 10 0 M0 -24 q-5 5 -10 0', stroke:'#2b1b45','stroke-width':3, fill:'none'}, g);
      el('path', {d:'M-30 -26 h-16 M30 -26 h16', stroke:'#2b1b45','stroke-width':3}, g);
    });
    stuffie(148, 'bear', '#b98a5e', function(g, c){
      el('ellipse', {cy:6, rx:32, ry:28, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('circle', {cy:-30, r:25, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('circle', {cx:-20, cy:-48, r:10, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('circle', {cx:20, cy:-48, r:10, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('ellipse', {cy:-24, rx:12, ry:9, fill:'#e8cbb0'}, g);
      el('circle', {cx:-9, cy:-34, r:3.2, fill:'#2b1b45'}, g);
      el('circle', {cx:9, cy:-34, r:3.2, fill:'#2b1b45'}, g);
      el('circle', {cy:-26, r:4, fill:'#2b1b45'}, g);
    });
    stuffie(240, 'bunny', '#f3d9e8', function(g, c){
      el('ellipse', {cy:8, rx:26, ry:24, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('circle', {cy:-24, r:21, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('ellipse', {cx:-11, cy:-56, rx:8, ry:22, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('ellipse', {cx:11, cy:-56, rx:8, ry:22, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('circle', {cx:-8, cy:-26, r:3.2, fill:'#2b1b45'}, g);
      el('circle', {cx:8, cy:-26, r:3.2, fill:'#2b1b45'}, g);
      el('path', {d:'M0 -18 l-5 4 h10z', fill:'#ff8aa8'}, g);
    });
    stuffie(330, 'dino', '#6ed17a', function(g, c){
      el('ellipse', {cy:6, rx:32, ry:24, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('circle', {cx:-16, cy:-26, r:20, fill:c, stroke:'#2b1b45','stroke-width':5}, g);
      el('path', {d:'M4 -14 l10 -14 l8 16z M20 -2 l12 -12 l6 16z', fill:'#4fb863', stroke:'#2b1b45','stroke-width':4,'stroke-linejoin':'round'}, g);
      el('circle', {cx:-22, cy:-30, r:3.4, fill:'#2b1b45'}, g);
      el('path', {d:'M-30 -20 q8 6 16 2', stroke:'#2b1b45','stroke-width':3, fill:'none'}, g);
      el('path', {d:'M30 8 q20 4 22 -12', stroke:c,'stroke-width':10, fill:'none','stroke-linecap':'round'}, g);
    });
  })();

  /* ════════════════════ BUBBLES ════════════════════ */
  (function(){
    var svg = D.getElementById('bubbles'), note = D.getElementById('bubNote'), popped = 0;
    el('rect', {x:0, y:0, width:400, height:260, fill:'#eaf8ff'}, svg);
    el('path', {d:'M0 226 q60 -14 110 0 q70 -12 120 0 q60 -10 170 0 v40 H0 Z', fill:'#9fdcf5'}, svg);

    /* Wormy the Worm, who lives down here and is very encouraging */
    var worm = el('g', {transform:'translate(60,214)', style:'cursor:pointer'}, svg);
    [0,1,2,3,4].forEach(function(i){
      el('circle', {cx:i * 22, cy:(i % 2 ? -6 : 0), r:15 - i * .8,
        fill:['#ff8a3d','#ffd84d','#6ed17a','#4fc3f7','#a45cff'][i],
        stroke:'#2b1b45','stroke-width':4}, worm);
    });
    el('circle', {cx:-6, cy:-14, r:9, fill:'#fff', stroke:'#2b1b45','stroke-width':4}, worm);
    el('circle', {cx:10, cy:-14, r:9, fill:'#fff', stroke:'#2b1b45','stroke-width':4}, worm);
    el('circle', {cx:-5, cy:-14, r:4, fill:'#2b1b45'}, worm);
    el('circle', {cx:11, cy:-14, r:4, fill:'#2b1b45'}, worm);
    el('path', {d:'M-15 -14 h-6 M19 -14 h6 M2 -14 h0', stroke:'#2b1b45','stroke-width':3}, worm);
    el('path', {d:'M-2 2 q8 6 14 0', stroke:'#2b1b45','stroke-width':3, fill:'none','stroke-linecap':'round'}, worm);
    var wt = 0;
    setInterval(function(){
      wt += .012;
      worm.setAttribute('transform', 'translate(' + (60 + Math.sin(wt) * 230) + ',' +
        (214 + Math.sin(wt * 3) * 5) + ') scale(' + (Math.cos(wt) >= 0 ? 1 : -1) + ',1)');
    }, 40);
    worm.addEventListener('click', function(){
      say(pickOne([
        "Hello! I am <b>Wormy the Worm</b>, the royal study partner. Shall we learn something together?",
        "Wormy here! My glasses are for reading. I read about <i>everything</i>.",
        "Did you know worms help the garden by making tunnels for the roots to drink? Useful, me."
      ]));
      note.textContent = 'You found Wormy! 🐛';
    });

    function bubble(x, y){
      var r = rnd(12, 30),
          b = el('circle', {cx:x, cy:y, r:r, fill:'rgba(160,225,255,.45)',
            stroke:'#9fdcf5','stroke-width':3, style:'cursor:pointer'}, svg);
      el('circle', {cx:x - r * .3, cy:y - r * .3, r:r * .22, fill:'#fff','fill-opacity':.85}, svg);
      b.style.transition = 'transform ' + rnd(4, 8) + 's linear, opacity .3s';
      setTimeout(function(){ b.style.transform = 'translate(' + rnd(-40, 40) + 'px,-300px)'; }, 20);
      b.addEventListener('pointerdown', function(e){
        e.stopPropagation();
        b.style.opacity = 0; popped++;
        note.textContent = 'Bubbles popped: ' + popped;
        if (popped === 10) say('Ten bubbles popped! A bubble is just air wearing a very thin coat of soapy water.');
        setTimeout(function(){ b.remove(); }, 320);
      });
      setTimeout(function(){ b.remove(); }, 9000);
    }
    svg.style.touchAction = 'none';
    svg.addEventListener('pointerdown', function(e){
      var r = svg.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width * 400, y = (e.clientY - r.top) / r.height * 260;
      for (var i = 0; i < 4; i++) bubble(x + rnd(-24, 24), y + rnd(-14, 14));
    });
    setInterval(function(){ bubble(rnd(40, 360), 250); }, 2200);
  })();

})();


/* ==========================================================================
   EXTRAS — magic buttons, drawing pad, sparkle catch, memory match,
   the chocolate milk, and the rainbow river.

   Built on what the research says works for little ones: every action gets
   an instant response, one step at a time, repetition with variation, and
   absolutely nothing that can be lost or failed.
   ========================================================================== */
(function(){
  var NS = 'http://www.w3.org/2000/svg', D = document;
  function el(t, a, p){ var e = D.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function rnd(a, b){ return a + Math.random() * (b - a); }
  function pickOne(a){ return a[Math.floor(Math.random() * a.length)]; }
  function say(t){ if (window.PWspeak) window.PWspeak(t); }

  var BRIGHT = ['#ff2d95','#ff6ec7','#ffd400','#00e5ff','#00ff9d','#b14bff','#ff7a00','#ff4d6d'];

  /* ════════ MAGIC BUTTONS — full-screen effects ════════ */
  var fx = D.createElement('div');
  fx.id = 'fxlayer';
  D.body.appendChild(fx);

  function burstSparkles(n, cx, cy){
    for (var i = 0; i < n; i++){
      (function(){
        var s = D.createElement('b'), size = rnd(10, 30);
        s.className = 'fxspark';
        s.style.left = (cx || innerWidth / 2) + 'px';
        s.style.top  = (cy || innerHeight / 2) + 'px';
        s.style.width = s.style.height = size + 'px';
        s.style.background = pickOne(BRIGHT);
        var a = rnd(0, Math.PI * 2), d = rnd(80, Math.min(innerWidth, 520));
        s.style.setProperty('--dx', Math.cos(a) * d + 'px');
        s.style.setProperty('--dy', Math.sin(a) * d + 'px');
        s.style.animationDuration = rnd(.9, 1.8) + 's';
        fx.appendChild(s);
        setTimeout(function(){ s.remove(); }, 2000);
      })();
    }
  }
  function fireworks(){
    for (var i = 0; i < 6; i++){
      (function(i){
        setTimeout(function(){
          burstSparkles(26, rnd(innerWidth * .15, innerWidth * .85), rnd(innerHeight * .15, innerHeight * .55));
        }, i * 380);
      })(i);
    }
    say('BOOM! 🎆 Fireworks are tiny bits of metal burning in different colours. Copper burns blue!');
  }
  function rainbowBlast(){
    var b = D.createElement('div');
    b.className = 'fxbow';
    fx.appendChild(b);
    setTimeout(function(){ b.remove(); }, 2600);
    say('A rainbow across the whole world! 🌈 Red, orange, yellow, green, blue, indigo, violet — always that order.');
  }
  function paintSplash(){
    for (var i = 0; i < 18; i++){
      (function(){
        var s = D.createElement('b'), size = rnd(30, 110);
        s.className = 'fxblob';
        s.style.left = rnd(0, innerWidth) + 'px';
        s.style.top  = rnd(0, innerHeight * .8) + 'px';
        s.style.width = s.style.height = size + 'px';
        s.style.background = pickOne(BRIGHT);
        s.style.animationDuration = rnd(1.4, 2.4) + 's';
        fx.appendChild(s);
        setTimeout(function(){ s.remove(); }, 2600);
      })();
    }
    say('SPLAT! 🎨 Paint everywhere and not one bit of trouble.');
  }
  function confetti(){
    for (var i = 0; i < 70; i++){
      (function(){
        var c = D.createElement('b');
        c.className = 'fxconf';
        c.style.left = rnd(0, innerWidth) + 'px';
        c.style.background = pickOne(BRIGHT);
        c.style.animationDuration = rnd(2.2, 4.4) + 's';
        c.style.animationDelay = rnd(0, .8) + 's';
        c.style.width = rnd(8, 16) + 'px';
        c.style.height = rnd(12, 22) + 'px';
        fx.appendChild(c);
        setTimeout(function(){ c.remove(); }, 5400);
      })();
    }
    say('🎉 A party! What are we celebrating? I say we celebrate YOU.');
  }
  window.PWfx = { sparkles:burstSparkles, fireworks:fireworks, rainbow:rainbowBlast, splash:paintSplash, confetti:confetti };

  var MB = D.getElementById('magicBtns');
  if (MB){
    [['✨ Sparkle burst', function(e){ burstSparkles(40); }],
     ['🎆 Fireworks', fireworks],
     ['🌈 Rainbow blast', rainbowBlast],
     ['🎨 Paint splash', paintSplash],
     ['🎉 Confetti', confetti]
    ].forEach(function(b, i){
      var btn = D.createElement('button');
      btn.className = 'magic m' + (i % 5);
      btn.textContent = b[0];
      btn.onclick = b[1];
      MB.appendChild(btn);
    });
  }

  /* ════════ DRAWING PAD ════════ */
  (function(){
    var cv = D.getElementById('pad');
    if (!cv) return;
    var ctx = cv.getContext('2d'), drawing = false, col = '#ff2d95', size = 10, stamp = null,
        tip = D.getElementById('padTip');
    cv.width = 800; cv.height = 500;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 800, 500);
    ctx.lineCap = ctx.lineJoin = 'round';

    function pos(e){
      var r = cv.getBoundingClientRect();
      return { x:(e.clientX - r.left) / r.width * 800, y:(e.clientY - r.top) / r.height * 500 };
    }
    cv.style.touchAction = 'none';
    cv.addEventListener('pointerdown', function(e){
      e.preventDefault(); cv.setPointerCapture(e.pointerId);
      var p = pos(e);
      if (stamp){
        ctx.font = '64px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(stamp, p.x, p.y);
        return;
      }
      drawing = true;
      ctx.strokeStyle = col; ctx.lineWidth = size;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + .1, p.y);
      ctx.stroke();
    });
    cv.addEventListener('pointermove', function(e){
      if (!drawing) return;
      e.preventDefault();
      var p = pos(e);
      ctx.lineTo(p.x, p.y); ctx.stroke();
    });
    cv.addEventListener('pointerup', function(){ drawing = false; });

    var cols = D.getElementById('padCols');
    ['#ff2d95','#ff7a00','#ffd400','#00ff9d','#00e5ff','#b14bff','#2b1b45','#ffffff'].forEach(function(c, i){
      var b = D.createElement('button');
      b.className = 'sw' + (i === 0 ? ' on' : '');
      b.style.background = c;
      b.setAttribute('aria-label', 'pen colour');
      b.onclick = function(){
        col = c; stamp = null; size = (c === '#ffffff') ? 34 : 10;
        [].slice.call(cols.children).forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        tip.textContent = (c === '#ffffff') ? 'Rubber! Draw over a mistake to erase it.' : 'Draw with your finger!';
      };
      cols.appendChild(b);
    });

    var st = D.getElementById('padStamps');
    ['⭐','🌈','🐱','🦋','🌸','🦕','🍎','👑','🫧','❤️'].forEach(function(s){
      var b = D.createElement('button');
      b.className = 'stamp';
      b.textContent = s;
      b.onclick = function(){
        stamp = s;
        [].slice.call(st.children).forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        tip.textContent = 'Now tap the paper to stamp a ' + s;
      };
      st.appendChild(b);
    });

    D.getElementById('padClear').onclick = function(){
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 800, 500);
      stamp = null; tip.textContent = 'Clean paper! Draw whatever you like.';
      [].slice.call(st.children).forEach(function(x){ x.classList.remove('on'); });
    };
    D.getElementById('padSave').onclick = function(){
      try {
        var a = D.createElement('a');
        a.download = 'my-picture.png';
        a.href = cv.toDataURL('image/png');
        a.click();
        tip.textContent = 'Saved! Look in your downloads. 🖼️';
        say('I saved your picture! Show it to a grown-up — artists always need an audience.');
      } catch(e){ tip.textContent = 'Ask a grown-up to help you save it!'; }
    };
  })();

  /* ════════ SPARKLE CATCH — colour and counting practice ════════ */
  (function(){
    var svg = D.getElementById('catch');
    if (!svg) return;
    var note = D.getElementById('catchTip'), basket, target, got = 0, need = 0, live = [], running = false;
    var COLNAMES = [['#ff2d95','pink'],['#ffd400','yellow'],['#00e5ff','blue'],['#00ff9d','green'],['#b14bff','purple']];

    function start(){
      svg.innerHTML = ''; live = []; got = 0;
      el('rect', {x:0, y:0, width:400, height:300, fill:'#1b1040'}, svg);
      for (var i = 0; i < 26; i++)
        el('circle', {cx:rnd(0,400), cy:rnd(0,240), r:rnd(.6,1.8), fill:'#fff', opacity:rnd(.3,.9)}, svg);

      target = pickOne(COLNAMES);
      need = 3 + Math.floor(Math.random() * 4);
      note.textContent = 'Catch ' + need + ' ' + target[1] + ' sparkles!';

      basket = el('g', {transform:'translate(200,262)'}, svg);
      el('path', {d:'M-34 -14 L34 -14 L26 20 L-26 20 Z', fill:'#ffd400', stroke:'#2b1b45','stroke-width':5,'stroke-linejoin':'round'}, basket);
      el('path', {d:'M-34 -14 q34 -22 68 0', fill:'none', stroke:'#2b1b45','stroke-width':5}, basket);

      running = true;
      svg.style.touchAction = 'none';
      svg.onpointerdown = svg.onpointermove = function(e){
        var r = svg.getBoundingClientRect(),
            x = Math.max(40, Math.min(360, (e.clientX - r.left) / r.width * 400));
        basket.setAttribute('transform', 'translate(' + x + ',262)');
      };
      drop();
      tick();
    }
    function drop(){
      if (!running) return;
      var c = pickOne(COLNAMES), x = rnd(30, 370), s = rnd(9, 15);
      var g = el('g', {transform:'translate(' + x + ',-20)'}, svg);
      el('path', {d:'M0 ' + (-s) + ' Q' + (s*.3) + ' ' + (-s*.3) + ' ' + s + ' 0 Q' + (s*.3) + ' ' + (s*.3) +
        ' 0 ' + s + ' Q' + (-s*.3) + ' ' + (s*.3) + ' ' + (-s) + ' 0 Q' + (-s*.3) + ' ' + (-s*.3) + ' 0 ' + (-s) + ' Z',
        fill:c[0]}, g);
      live.push({ g:g, x:x, y:-20, c:c, v:rnd(.9, 1.9) });
      setTimeout(drop, rnd(500, 1000));
    }
    function tick(){
      if (!running) return;
      var bx = +(basket.getAttribute('transform').match(/translate\(([-\d.]+)/)[1]);
      live = live.filter(function(o){
        o.y += o.v;
        o.g.setAttribute('transform', 'translate(' + o.x + ',' + o.y + ')');
        if (o.y > 242 && o.y < 286 && Math.abs(o.x - bx) < 40){
          o.g.remove();
          if (o.c[1] === target[1]){
            got++;
            note.textContent = got >= need
              ? 'YOU GOT ' + need + '! ⭐ Tap to play again.'
              : 'Caught ' + got + ' of ' + need + ' ' + target[1] + ' ones!';
            if (got >= need){
              running = false;
              say('You caught <b>' + need + '</b> ' + target[1] + ' sparkles! Counting and colours at the same time. 🌟');
              svg.onpointerdown = function(){ start(); };
            }
          } else {
            note.textContent = 'That one was ' + o.c[1] + '! We want ' + target[1] + '. Keep going!';
          }
          return false;
        }
        if (o.y > 320){ o.g.remove(); return false; }
        return true;
      });
      requestAnimationFrame(tick);
    }
    start();
  })();

  /* ════════ MEMORY MATCH ════════ */
  (function(){
    var svg = D.getElementById('memory');
    if (!svg) return;
    var note = D.getElementById('memTip'),
        ICONS = ['🐱','🌈','⭐','🦕','🌸','🫧'],
        deck = [], open = [], found = 0, busy = false;

    function build(){
      svg.innerHTML = ''; deck = []; open = []; found = 0; busy = false;
      var pool = ICONS.concat(ICONS).sort(function(){ return Math.random() - .5; });
      pool.forEach(function(ic, i){
        var cx = 46 + (i % 4) * 104, cy = 56 + Math.floor(i / 4) * 104;
        var g = el('g', {transform:'translate(' + cx + ',' + cy + ')', style:'cursor:pointer'}, svg);
        var back = el('rect', {x:-42, y:-42, width:84, height:84, rx:14,
          fill:BRIGHT[i % BRIGHT.length], stroke:'#2b1b45','stroke-width':5}, g);
        el('text', {x:0, y:12, 'text-anchor':'middle','font-size':38, fill:'#fff','font-weight':800}, g).textContent = '?';
        var face = el('text', {x:0, y:16, 'text-anchor':'middle','font-size':46, opacity:0}, g);
        face.textContent = ic;
        var card = { g:g, ic:ic, face:face, back:back, up:false, done:false };
        deck.push(card);
        g.addEventListener('click', function(){ flip(card); });
      });
      note.textContent = 'Find the matching pairs!';
    }
    function flip(c){
      if (busy || c.up || c.done) return;
      c.up = true;
      c.face.setAttribute('opacity', 1);
      c.back.setAttribute('fill', '#fff');
      c.g.querySelector('text').setAttribute('opacity', 0);
      open.push(c);
      if (open.length === 2){
        busy = true;
        setTimeout(function(){
          if (open[0].ic === open[1].ic){
            open.forEach(function(o){ o.done = true; o.g.style.opacity = .45; });
            found++;
            note.textContent = found === ICONS.length
              ? 'ALL MATCHED! 🎉 Tap a card to play again.'
              : 'Pairs found: ' + found + ' of ' + ICONS.length;
            if (found === ICONS.length){
              say('You matched them all! Memory games make your brain better at remembering things. 🧠');
              setTimeout(build, 1600);
            }
          } else {
            open.forEach(function(o){
              o.up = false;
              o.face.setAttribute('opacity', 0);
              o.back.setAttribute('fill', BRIGHT[deck.indexOf(o) % BRIGHT.length]);
              o.g.querySelector('text').setAttribute('opacity', 1);
            });
          }
          open = []; busy = false;
        }, 700);
      }
    }
    build();
  })();

  /* ════════ THE CHOCOLATE MILK ════════ */
  (function(){
    var svg = D.getElementById('milk');
    if (!svg) return;
    var note = D.getElementById('milkTip'), level = 0, MAXL = 5;
    function draw(){
      svg.innerHTML = '';
      el('rect', {x:0, y:0, width:300, height:300, fill:'#fff6ea'}, svg);
      el('ellipse', {cx:150, cy:282, rx:90, ry:12, fill:'#e2cdb4'}, svg);
      /* glass */
      el('path', {d:'M84 66 L216 66 L200 272 L100 272 Z', fill:'rgba(255,255,255,.55)',
        stroke:'#2b1b45','stroke-width':6,'stroke-linejoin':'round'}, svg);
      /* the milk itself, dropping as you drink */
      var top = 92 + level * 30;
      if (level < MAXL){
        el('path', {d:'M' + (86 + (top-92)*0.08*1) + ' ' + top + ' L' + (214 - (top-92)*0.08) + ' ' + top +
          ' L200 268 L100 268 Z', fill:'#8b5a2b'}, svg);
        el('ellipse', {cx:150, cy:top, rx:(64 - (top-92)*0.08), ry:9, fill:'#a9713a'}, svg);
      }
      /* straw */
      el('path', {d:'M170 40 L150 272', stroke:'#ff2d95','stroke-width':13,'stroke-linecap':'round'}, svg);
      el('path', {d:'M170 40 L150 272', stroke:'#fff','stroke-width':5,'stroke-linecap':'round','stroke-dasharray':'14 14'}, svg);
      el('path', {d:'M170 40 q22 -14 34 4', stroke:'#ff2d95','stroke-width':13, fill:'none','stroke-linecap':'round'}, svg);
      /* a little smiley face on the glass, because why not */
      el('circle', {cx:130, cy:170, r:4, fill:'#2b1b45'}, svg);
      el('circle', {cx:172, cy:170, r:4, fill:'#2b1b45'}, svg);
      el('path', {d:'M128 186 q22 16 44 0', stroke:'#2b1b45','stroke-width':4, fill:'none','stroke-linecap':'round'}, svg);
      svg.style.cursor = 'pointer';
    }
    svg.addEventListener('click', function(){
      if (level < MAXL){
        level++;
        draw();
        note.textContent = level >= MAXL ? 'All gone! 🥛 Tap again to refill.' : 'Slurp! Sips taken: ' + level;
        if (level >= MAXL) say('You drank the whole thing! Milk helps build strong bones. Now go and have some water too.');
      } else {
        level = 0; draw(); note.textContent = 'Refilled! Tap the glass to sip.';
      }
    });
    draw();
  })();
})();


/* ==========================================================================
   THE CONTROL PANEL — levers, switches, dials and big red buttons, sitting
   right at the top so a phone shows them straight away. Every control does
   something instantly, which is the whole point: cause and effect is the
   first thing a small child learns from a screen.
   ========================================================================== */
(function(){
  var NS='http://www.w3.org/2000/svg', D=document;
  function el(t,a,p){var e=D.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
  function rnd(a,b){return a+Math.random()*(b-a);}
  function pick(a){return a[Math.floor(Math.random()*a.length)];}
  function say(t){if(window.PWspeak)window.PWspeak(t);}
  var FX = window.PWfx || {};

  var svg = D.getElementById('panel');
  if (!svg) return;
  var tip = D.getElementById('panelTip');

  /* backing board */
  /* gradients built with real DOM calls — innerHTML on an SVG node is not
     reliable, and if it silently failed the whole board went black */
  (function(){
    var defs = el('defs',{},svg);
    function grad(id, stops){
      var g = el('linearGradient',{id:id,x1:0,y1:0,x2:0,y2:1},defs);
      stops.forEach(function(s){ el('stop',{offset:s[0],'stop-color':s[1]},g); });
    }
    grad('board',[['0%','#3b2a63'],['100%','#241640']]);
    grad('chrome',[['0%','#fdfdff'],['52%','#c6ccd8'],['100%','#7d8696']]);
  })();
  el('rect',{x:0,y:0,width:760,height:300,rx:26,fill:'url(#board)'},svg);
  el('rect',{x:12,y:12,width:736,height:276,rx:20,fill:'none',stroke:'#5a4590','stroke-width':4},svg);
  /* rivets */
  [[28,28],[732,28],[28,272],[732,272]].forEach(function(p){
    el('circle',{cx:p[0],cy:p[1],r:7,fill:'url(#chrome)',stroke:'#1b1030','stroke-width':3},svg);
  });

  function label(x,y,t,c){
    var g=el('text',{x:x,y:y,'text-anchor':'middle','font-family':'Trebuchet MS,Verdana,sans-serif',
      'font-size':15,'font-weight':800,fill:c||'#ffd400'},svg);
    g.textContent=t; return g;
  }

  /* ── 1. THE BIG LEVER: pull it down for fireworks ─────────────────── */
  (function(){
    var g=el('g',{style:'cursor:pointer'},svg);
    el('rect',{x:52,y:190,width:120,height:26,rx:12,fill:'#1b1030',stroke:'#5a4590','stroke-width':4},g);
    var arm=el('g',{},g);
    el('rect',{x:104,y:86,width:16,height:112,rx:8,fill:'url(#chrome)',stroke:'#1b1030','stroke-width':4},arm);
    el('circle',{cx:112,cy:82,r:24,fill:'#ff2d95',stroke:'#1b1030','stroke-width':5},arm);
    el('circle',{cx:104,cy:74,r:7,fill:'#fff','fill-opacity':.6},arm);
    arm.style.transformOrigin='112px 200px';
    arm.style.transformBox='fill-box';
    label(112,246,'FIREWORKS');
    var down=false;
    g.addEventListener('click',function(){
      down=!down;
      arm.style.transition='transform .3s cubic-bezier(.3,1.4,.4,1)';
      arm.style.transform=down?'rotate(42deg)':'rotate(0deg)';
      if(FX.fireworks)FX.fireworks(); else say('Boom!');
      tip.textContent='KABOOM! 🎆';
    });
  })();

  /* ── 2. THREE TOGGLE SWITCHES: each one changes the sky ───────────── */
  (function(){
    var MODES=[['☀️','Sunny','#ffe9a8'],['🌈','Rainbow','#ffd0e8'],['🌙','Night','#2b2060']];
    MODES.forEach(function(m,i){
      var x=232+i*74, on=false;
      var g=el('g',{style:'cursor:pointer'},svg);
      el('rect',{x:x-26,y:96,width:52,height:104,rx:26,fill:'#1b1030',stroke:'#5a4590','stroke-width':4},g);
      var knob=el('circle',{cx:x,cy:172,r:20,fill:'url(#chrome)',stroke:'#1b1030','stroke-width':4},g);
      var glow=el('circle',{cx:x,cy:124,r:9,fill:'#3a2a60'},g);
      var t=el('text',{x:x,y:232,'text-anchor':'middle','font-size':22},svg);
      t.textContent=m[0];
      label(x,256,m[1],'#c9a2ff');
      g.addEventListener('click',function(){
        on=!on;
        knob.style.transition='cy .25s'; knob.setAttribute('cy',on?124:172);
        glow.setAttribute('fill',on?'#00ff9d':'#3a2a60');
        if(on){
          D.body.style.transition='filter .6s';
          D.body.style.filter = m[1]==='Night' ? 'brightness(.75) saturate(1.3) hue-rotate(200deg)'
                              : m[1]==='Rainbow' ? 'saturate(1.7) hue-rotate(18deg)'
                              : 'brightness(1.12) saturate(1.2)';
          tip.textContent=m[1]+' mode! Flip it back when you are done.';
          say(m[1]==='Night'
            ? 'Night mode! 🌙 It gets dark because our whole planet has spun away from the Sun.'
            : m[1]==='Rainbow' ? 'Everything is extra rainbow now! 🌈'
            : 'Sunshine everywhere! ☀️');
        } else {
          D.body.style.filter='';
          tip.textContent='Back to normal!';
        }
      });
    });
  })();

  /* ── 3. THE SPARKLE DIAL: turn it up ──────────────────────────────── */
  (function(){
    var cx=470,cy=150,steps=0;
    var g=el('g',{style:'cursor:pointer'},svg);
    el('circle',{cx:cx,cy:cy,r:52,fill:'#1b1030',stroke:'#5a4590','stroke-width':4},g);
    el('circle',{cx:cx,cy:cy,r:40,fill:'url(#chrome)',stroke:'#1b1030','stroke-width':4},g);
    var mark=el('rect',{x:cx-4,y:cy-38,width:8,height:22,rx:4,fill:'#ff2d95'},g);
    mark.style.transformOrigin=cx+'px '+cy+'px';
    for(var i=0;i<8;i++){
      var a=(Math.PI*2/8)*i-Math.PI/2;
      el('circle',{cx:cx+Math.cos(a)*60,cy:cy+Math.sin(a)*60,r:4,
        fill:i===0?'#00ff9d':'#5a4590'},g);
    }
    label(cx,236,'SPARKLES');
    g.addEventListener('click',function(){
      steps=(steps+1)%8;
      mark.style.transition='transform .28s cubic-bezier(.3,1.4,.4,1)';
      mark.style.transform='rotate('+(steps*45)+'deg)';
      var n=8+steps*10;
      if(FX.sparkles)FX.sparkles(n);
      tip.textContent='Sparkle power: '+(steps+1)+' of 8 ✨';
      if(steps===7)say('Sparkle power at MAXIMUM! ✨ You have excellent taste in dials.');
    });
  })();

  /* ── 4. TWO BIG BUTTONS: confetti and paint ───────────────────────── */
  (function(){
    [[600,'#ff2d95','CONFETTI',function(){ if(FX.confetti)FX.confetti(); tip.textContent='PARTY! 🎉'; }],
     [690,'#00e5ff','SPLAT',   function(){ if(FX.splash)FX.splash();   tip.textContent='SPLAT! 🎨'; }]
    ].forEach(function(b){
      var x=b[0], g=el('g',{style:'cursor:pointer'},svg);
      el('circle',{cx:x,cy:150,r:36,fill:'#1b1030',stroke:'#5a4590','stroke-width':4},g);
      var top=el('circle',{cx:x,cy:144,r:30,fill:b[1],stroke:'#1b1030','stroke-width':5},g);
      el('circle',{cx:x-10,cy:134,r:8,fill:'#fff','fill-opacity':.45},g);
      label(x,214,b[2],'#ffd400');
      g.addEventListener('click',function(){
        top.style.transition='cy .1s'; top.setAttribute('cy',152);
        setTimeout(function(){ top.setAttribute('cy',144); },130);
        b[3]();
      });
    });
  })();

  /* ── 5. A SLIDER that makes the whole page wobble ─────────────────── */
  (function(){
    var g=el('g',{},svg), x0=52, x1=172, y=270;
    el('rect',{x:x0,y:y-5,width:x1-x0,height:10,rx:5,fill:'#1b1030',stroke:'#5a4590','stroke-width':3},g);
    var knob=el('circle',{cx:x0+12,cy:y,r:14,fill:'#ffd400',stroke:'#1b1030','stroke-width':4,
      style:'cursor:grab'},g);
    knob.style.touchAction='none';
    var drag=false;
    function set(px){
      var x=Math.max(x0+12,Math.min(x1-12,px));
      knob.setAttribute('cx',x);
      var amt=(x-x0-12)/(x1-x0-24);
      D.documentElement.style.setProperty('--wob',(amt*2.2).toFixed(2)+'deg');
      D.body.classList.toggle('wobbly',amt>0.06);
      tip.textContent = amt>0.06 ? 'Wobble power: '+Math.round(amt*100)+'%!' : 'Wobble off.';
    }
    knob.addEventListener('pointerdown',function(e){e.preventDefault();drag=true;knob.setPointerCapture(e.pointerId);});
    knob.addEventListener('pointermove',function(e){
      if(!drag)return; e.preventDefault();
      var r=svg.getBoundingClientRect();
      set((e.clientX-r.left)/r.width*760);
    });
    knob.addEventListener('pointerup',function(){drag=false;});
  })();
})();
