/* ═══════════════════════════════════════════════════════════════════
   PHOENIX'S WORLD — seasons.js  (Drop 2b)

   The Four Seasons, rebuilt. One band, four tabs. Mounts into
   #seasonsMount. Needs window.PW (index.html).

   AUTUMN — a real hand holds the rake and drags with your finger. Leaves
   are pushed physically and stack into a pile. A kid runs in and jumps.
   SUMMER — three layers of real sine waves with white foam caps that
   actually roll. A big wave sweeps the beach clean.
   SPRING — tap the grass to grow flowers, rain makes more, everything
   talks when tapped.
   WINTER — build the snowman. Marshmallow the kitty helps roll the
   snowballs. The sun comes out and he puts on shades.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var P=window.PW; if(!P) return;
var E=P.E,H=P.H,$=P.$,rnd=P.rnd,ri=P.ri,pick=P.pick,clear=P.clear,SND=P.SND,say=P.say;
var D=document;
function pt(svg,e,vw,vh){ var r=svg.getBoundingClientRect(); return {x:(e.clientX-r.left)*vw/r.width,y:(e.clientY-r.top)*vh/r.height}; }
function tip(id,t){ var e=$(id); if(e) e.textContent=t; }

H('style',{html:
'.season-tabs{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:18px}'+
'.stab{min-height:56px;padding:12px 20px;cursor:pointer;border:5px solid var(--ink);border-radius:999px;background:#fff;font:700 18px/1 "Fredoka",sans-serif;color:var(--ink);box-shadow:0 6px 0 rgb(var(--ink-rgb)/.25)}'+
'.stab:active{transform:translateY(5px);box-shadow:0 1px 0 rgb(var(--ink-rgb)/.25)}'+
'.stab[aria-pressed="true"]{background:var(--sherbet);box-shadow:0 0 0 4px #fff,0 6px 0 var(--sherbet-deep)}'+
'.season{display:none;padding:22px 14px 26px;border:6px solid var(--ink);border-radius:30px;box-shadow:0 12px 0 rgb(var(--ink-rgb)/.22)}'+
'.season.on{display:block}'+
'.season.spring{background:linear-gradient(180deg,#eaffe9,#d8f7ff)}.season.summer{background:linear-gradient(180deg,#fff3c9,#c9f0ff)}'+
'.season.autumn{background:linear-gradient(180deg,#ffe6c9,#ffd6b0)}.season.winter{background:linear-gradient(180deg,#e4f4ff,#f6fbff)}'+
'.scene{display:block;width:100%;height:auto;touch-action:none;border:6px solid var(--ink);border-radius:22px;background:#fff;box-shadow:0 8px 0 rgb(var(--ink-rgb)/.2)}'+
'.srow{display:flex;gap:9px;justify-content:center;flex-wrap:wrap;margin:14px auto 0}'+
'.sbtn{min-height:52px;padding:13px 18px;cursor:pointer;border:5px solid var(--ink);border-radius:18px;background:var(--sherbet);font:700 16px/1 "Fredoka",sans-serif;color:var(--ink);box-shadow:0 5px 0 var(--sherbet-deep)}'+
'.sbtn:active{transform:translateY(4px);box-shadow:0 1px 0 var(--sherbet-deep)}'+
'.sbtn.pink{background:var(--bubblegum);color:#fff;box-shadow:0 5px 0 var(--bubblegum-deep)}.sbtn.cy{background:var(--lagoon);box-shadow:0 5px 0 var(--lagoon-deep)}.sbtn.gr{background:var(--mint);box-shadow:0 5px 0 var(--mint-deep)}.sbtn.wh{background:#fff;box-shadow:0 5px 0 rgb(var(--ink-rgb)/.28)}'+
'.stip{text-align:center;font-weight:800;color:#5a4a86;margin:11px 0 0;font-size:15px;min-height:22px}'+
'@keyframes sbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}'+
'@keyframes sspin{to{transform:rotate(360deg)}}'+
'@keyframes swig{0%,100%{transform:rotate(0)}25%{transform:rotate(6deg)}75%{transform:rotate(-6deg)}}.swig{animation:swig .5s ease-in-out 2;transform-box:fill-box;transform-origin:center}'+
'@keyframes wave1{to{transform:translateX(-190px)}}@keyframes wave2{to{transform:translateX(-190px)}}'+
'.w1{animation:wave1 5s linear infinite}.w2{animation:wave2 7.5s linear infinite}.w3{animation:wave1 10s linear infinite}'+
'@keyframes spop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}.spop{animation:spop .36s cubic-bezier(.3,1.65,.5,1);transform-box:fill-box;transform-origin:center}'+
'body.calm .w1,body.calm .w2,body.calm .w3{animation:none!important}'
},D.head);

var mount=$('seasonsMount'); if(!mount) return;
mount.classList.add('filled');
mount.innerHTML=
'<div class="season-tabs" id="seasonTabs"></div>'+
'<div class="season spring on" id="s-spring"><svg class="scene" id="spring" viewBox="0 0 760 300" role="img" aria-label="A spring garden. Tap the grass to grow a flower."></svg>'+
' <div class="srow"><button class="sbtn gr" id="spGrowAll" type="button">🌱 Grow a whole garden</button><button class="sbtn cy" id="spRainBtn" type="button">🌧️ Make it rain</button><button class="sbtn wh" id="spClear" type="button">🧹 Start over</button></div><p class="stip" id="spTip">Tap the grass to plant your first flower. Tap the bee, the bird, the sun or the tree.</p></div>'+
'<div class="season summer" id="s-summer"><svg class="scene" id="summer" viewBox="0 0 760 300" role="img" aria-label="A summer beach with real waves."></svg>'+
' <div class="srow"><button class="sbtn cy" id="suWave" type="button">🌊 Send a big wave</button><button class="sbtn" id="suBuild" type="button">🏰 Add a castle floor</button><button class="sbtn pink" id="suShell" type="button">🐚 Find a shell</button></div><p class="stip" id="suTip">Tap the sun, the crab or the ball to say hello. Watch the waves roll.</p></div>'+
'<div class="season autumn" id="s-autumn"><svg class="scene" id="autumn" viewBox="0 0 760 300" role="img" aria-label="An autumn yard. Drag the hand and rake to sweep leaves into a pile."></svg>'+
' <div class="srow"><button class="sbtn" id="auShake" type="button">🍁 Shake the tree</button><button class="sbtn gr" id="auSweep" type="button">🧹 Rake them all up</button><button class="sbtn pink" id="auJump" type="button">🙌 JUMP in the pile!</button></div><p class="stip" id="auTip">Grab the hand. Drag the rake to push the leaves to the right.</p></div>'+
'<div class="season winter" id="s-winter"><svg class="scene" id="winter" viewBox="0 0 760 300" role="img" aria-label="Build a snowman by dragging his face onto him. A kitty helps."></svg>'+
' <div class="srow"><button class="sbtn cy" id="wiSnow" type="button">❄️ More snow</button><button class="sbtn" id="wiSun" type="button">🌞 Let the sun out</button><button class="sbtn pink" id="wiReset" type="button">🔁 Build him again</button></div><p class="stip" id="wiTip">Drag the carrot, the coal, the hat and the scarf onto the snowman.</p></div>';

[['🌷 Spring','spring'],['☀️ Summer','summer'],['🍂 Autumn','autumn'],['❄️ Winter','winter']].forEach(function(t,i){
  var b=H('button',{type:'button','class':'stab','aria-pressed':i===0?'true':'false',text:t[0]},$('seasonTabs'));
  b.addEventListener('click',function(){ $('seasonTabs').querySelectorAll('.stab').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); b.setAttribute('aria-pressed','true');
    D.querySelectorAll('.season').forEach(function(s){ s.classList.toggle('on', s.id==='s-'+t[1]); }); SND.clunk(); say(t[0].slice(2)); });
});

/* ═════════ SPRING ═════════ */
(function(){
  var svg=$('spring'); var defs=E('defs',null,svg);
  var sky=E('linearGradient',{id:'spSky',x1:0,y1:0,x2:0,y2:1},defs); E('stop',{offset:0,'stop-color':'#bfeaff'},sky); E('stop',{offset:1,'stop-color':'#e8fbff'},sky);
  var hill=E('linearGradient',{id:'spHill',x1:0,y1:0,x2:0,y2:1},defs); E('stop',{offset:0,'stop-color':'#8fe08f'},hill); E('stop',{offset:1,'stop-color':'#4fbb63'},hill);
  E('rect',{width:760,height:300,fill:'url(#spSky)'},svg);
  var sun=E('g',{style:'cursor:pointer'},svg); E('circle',{cx:662,cy:60,r:40,fill:'#ffd84d',stroke:'#e8a800','stroke-width':4},sun); E('circle',{cx:650,cy:54,r:4,fill:'#7a5a00'},sun); E('circle',{cx:676,cy:54,r:4,fill:'#7a5a00'},sun); E('path',{d:'M648 70 q14 13 28 0',stroke:'#7a5a00','stroke-width':4,fill:'none','stroke-linecap':'round'},sun);
  E('path',{d:'M90 66 a22 22 0 0 1 42-8 20 20 0 0 1 30 22 h-78 a18 18 0 0 1 6-14z',fill:'#fff'},svg); E('path',{d:'M300 44 a18 18 0 0 1 34-6 17 17 0 0 1 24 18 h-64 a15 15 0 0 1 6-12z',fill:'#fff',opacity:.85},svg);
  E('path',{d:'M0 196 q120 -40 250 -6 t260 -4 q130 -28 250 4 V300 H0z',fill:'url(#spHill)'},svg); E('path',{d:'M0 214 q160 -26 320 2 t440 -8 V300 H0z',fill:'#3fa855',opacity:.55},svg);
  var tree=E('g',{style:'cursor:pointer'},svg); E('path',{d:'M116 232 q6 -50 2 -78',stroke:'#8a5a33','stroke-width':16,fill:'none','stroke-linecap':'round'},tree); E('path',{d:'M118 178 q-22 -12 -30 -30 M118 168 q22 -14 32 -30',stroke:'#8a5a33','stroke-width':9,fill:'none','stroke-linecap':'round'},tree);
  E('circle',{cx:86,cy:140,r:34,fill:'#79d47f'},tree); E('circle',{cx:146,cy:134,r:38,fill:'#6bc972'},tree); E('circle',{cx:116,cy:112,r:36,fill:'#8ade8f'},tree);
  [[92,126,'#ffb6d5'],[140,116,'#ffd0e8'],[120,146,'#ffb6d5'],[156,146,'#fff']].forEach(function(p){ E('circle',{cx:p[0],cy:p[1],r:6,fill:p[2]},tree); });
  var fl=E('g',null,svg),rainG=E('g',null,svg);
  var bee=E('g',{style:'cursor:pointer;animation:sbob 2.8s ease-in-out infinite'},svg); E('ellipse',{cx:470,cy:120,rx:13,ry:10,fill:'#ffd84d',stroke:'#201540','stroke-width':3},bee); E('path',{d:'M463 112 v16 M470 110 v20',stroke:'#201540','stroke-width':3},bee); E('ellipse',{cx:468,cy:108,rx:9,ry:6,fill:'#fff',opacity:.8,stroke:'#201540','stroke-width':2},bee); E('circle',{cx:481,cy:117,r:2,fill:'#201540'},bee);
  var bird=E('g',{style:'cursor:pointer;animation:sbob 3.6s ease-in-out infinite'},svg); E('ellipse',{cx:600,cy:150,rx:18,ry:13,fill:'#17c7e8',stroke:'#201540','stroke-width':3},bird); E('circle',{cx:614,cy:143,r:9,fill:'#7fd6fa',stroke:'#201540','stroke-width':3},bird); E('circle',{cx:617,cy:141,r:2.4,fill:'#201540'},bird); E('path',{d:'M623 145 l10 4 -10 4z',fill:'#ffa63d',stroke:'#201540','stroke-width':2,'stroke-linejoin':'round'},bird); E('path',{d:'M592 148 q-14 -10 -22 2 q14 8 22 6z',fill:'#0b8fa9',stroke:'#201540','stroke-width':3},bird);
  var ground=E('rect',{x:0,y:196,width:760,height:104,fill:'transparent',style:'cursor:pointer'},svg);
  var cols=['#ff4d9d','#ffd84d','#8b3dff','#17c7e8','#ff8ad1','#ffa63d','#fff','#ff7a7a'];
  function flower(x,y,quiet){ if(fl.childNodes.length>70) return; var g=E('g',null,fl),c=pick(cols),h=rnd(40,70),i,a;
    E('path',{d:'M0 0 q'+rnd(-11,11).toFixed(1)+' '+(-h*.6).toFixed(1)+' 0 '+(-h).toFixed(1),stroke:'#4fae5c','stroke-width':5,fill:'none','stroke-linecap':'round'},g);
    E('ellipse',{cx:-12,cy:(-h*.45).toFixed(1),rx:11,ry:6,fill:'#63c473',transform:'rotate(-24 -12 '+(-h*.45).toFixed(1)+')'},g); E('ellipse',{cx:12,cy:(-h*.66).toFixed(1),rx:10,ry:5.5,fill:'#7ad68a',transform:'rotate(24 12 '+(-h*.66).toFixed(1)+')'},g);
    for(i=0;i<6;i++){ a=i*Math.PI/3; E('circle',{cx:(Math.cos(a)*12).toFixed(1),cy:(-h+Math.sin(a)*12).toFixed(1),r:9,fill:c,stroke:'#201540','stroke-width':2.5},g); }
    E('circle',{cy:(-h).toFixed(1),r:7.5,fill:'#ffd84d',stroke:'#201540','stroke-width':2.5},g);
    g.style.transformOrigin='0px 0px'; g.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) scale(0.02)';
    requestAnimationFrame(function(){ g.style.transition='transform .65s cubic-bezier(.3,1.5,.5,1)'; g.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) scale(1)'; });
    if(!quiet) SND.tone(pick([523,587,659,784,880,987]),0.26,'sine',0.07); }
  ground.addEventListener('pointerdown',function(e){ var p=pt(svg,e,760,300); flower(p.x,Math.max(206,Math.min(290,p.y))); tip('spTip','A flower! Tap the grass again. 🌸'); });
  $('spGrowAll').addEventListener('click',function(){ for(var i=0;i<16;i++)(function(i){ setTimeout(function(){ flower(rnd(30,735),rnd(210,290),true); SND.tone(440+i*35,0.2,'sine',0.05); },i*95); })(i); tip('spTip','A whole garden! 🌼🌷🌻'); say('A whole garden'); });
  $('spRainBtn').addEventListener('click',function(){ SND.whoosh(); tip('spTip','Rain helps the flowers grow. 💧'); for(var i=0;i<50;i++)(function(i){ var x=rnd(10,750),d=E('line',{x1:x,y1:-10,x2:x-4,y2:4,stroke:'#6fc6ff','stroke-width':3,'stroke-linecap':'round',opacity:.85},rainG); d.style.transition='transform '+rnd(.7,1.3)+'s linear,opacity .3s';
    setTimeout(function(){ d.style.transform='translate(-14px,'+rnd(215,290)+'px)'; setTimeout(function(){ d.style.opacity=0; setTimeout(function(){ d.remove(); },400); },700); },i*22); })(i);
    setTimeout(function(){ for(var i=0;i<7;i++) setTimeout(function(){ flower(rnd(40,720),rnd(212,288),true); },i*120); },900); });
  $('spClear').addEventListener('click',function(){ clear(fl); SND.tap(); tip('spTip','Fresh grass. Plant it again!'); });
  function talk(n,word,f){ n.addEventListener('click',function(){ n.classList.remove('swig'); void n.offsetWidth; n.classList.add('swig'); SND.tone(f,0.3,'sine',0.09); say(word); tip('spTip',word); var r=n.getBoundingClientRect(); P.sparkleAt(r.left+r.width/2,r.top+r.height/2,10); }); }
  talk(bee,'Buzz! A bee. Bees help flowers grow.',880); talk(bird,'Tweet! A bluebird.',1046); talk(tree,'A blossom tree.',392); talk(sun,'The sun! It wakes the flowers up.',659);
})();

/* ═════════ SUMMER — real waves ═════════ */
(function(){
  var svg=$('summer'),defs=E('defs',null,svg);
  var sky=E('linearGradient',{id:'suSky',x1:0,y1:0,x2:0,y2:1},defs); E('stop',{offset:0,'stop-color':'#8fd8ff'},sky); E('stop',{offset:1,'stop-color':'#ffeab0'},sky);
  var sand=E('linearGradient',{id:'suSand',x1:0,y1:0,x2:0,y2:1},defs); E('stop',{offset:0,'stop-color':'#ffe6a8'},sand); E('stop',{offset:1,'stop-color':'#f0cd82'},sand);
  E('rect',{width:760,height:300,fill:'url(#suSky)'},svg);
  var sun=E('g',{style:'cursor:pointer'},svg); E('circle',{cx:120,cy:66,r:42,fill:'#ffd84d',stroke:'#e8a800','stroke-width':4},sun);
  var rays=E('g',{stroke:'#ffd84d','stroke-width':7,'stroke-linecap':'round',style:'transform-origin:120px 66px;animation:sspin 30s linear infinite'},sun);
  ['M120 6 v-14','M120 126 v14','M60 66 h-14','M180 66 h14','M78 24 l-10 -10','M162 24 l10 -10','M78 108 l-10 10','M162 108 l10 10'].forEach(function(d){ E('path',{d:d},rays); });
  E('circle',{cx:106,cy:58,r:5,fill:'#7a5a00'},sun); E('circle',{cx:134,cy:58,r:5,fill:'#7a5a00'},sun); E('path',{d:'M104 78 q16 16 32 0',stroke:'#7a5a00','stroke-width':5,fill:'none','stroke-linecap':'round'},sun);
  /* the sea: three layers of real sine waves + rolling foam caps */
  E('rect',{x:0,y:150,width:760,height:90,fill:'#1f9fd6'},svg);
  function waveD(y,amp,len){ var d='M-'+len+' '+y,x; for(x=-len;x<=760+len;x+=len){ d+=' q'+(len/4)+' '+(-amp)+' '+(len/2)+' 0 q'+(len/4)+' '+amp+' '+(len/2)+' 0'; } return d+' V300 H-'+len+' Z'; }
  var seaG=E('g',null,svg);
  E('path',{'class':'w3',d:waveD(152,9,190),fill:'#2fb5e8',opacity:.95},seaG);
  E('path',{'class':'w2',d:waveD(166,12,190),fill:'#57c9ee',opacity:.9},seaG);
  E('path',{'class':'w1',d:waveD(182,10,190),fill:'#8fddf7',opacity:.9},seaG);
  /* foam caps ride the front wave */
  var foam=E('g',{'class':'w1'},seaG); for(var fx=-190;fx<=960;fx+=190){ E('ellipse',{cx:fx+95,cy:173,rx:34,ry:5,fill:'#fff',opacity:.85},foam); E('ellipse',{cx:fx+55,cy:178,rx:14,ry:3.5,fill:'#fff',opacity:.6},foam); E('ellipse',{cx:fx+140,cy:179,rx:16,ry:3.5,fill:'#fff',opacity:.6},foam); }
  E('path',{'class':'w2',d:waveD(206,5,190),fill:'#fff',opacity:.55},seaG);
  E('path',{d:'M0 222 q190 -18 380 0 t380 -2 V300 H0z',fill:'url(#suSand)'},svg);
  var cg=E('g',null,svg),sg=E('g',null,svg);
  var ball=E('g',{style:'cursor:pointer'},svg); E('circle',{cx:640,cy:258,r:22,fill:'#fff',stroke:'#201540','stroke-width':4},ball); E('path',{d:'M640 236 q16 22 0 44',fill:'#ff4d9d',opacity:.9},ball); E('path',{d:'M640 236 q-16 22 0 44',fill:'#17c7e8',opacity:.9},ball); E('circle',{cx:640,cy:258,r:22,fill:'none',stroke:'#201540','stroke-width':4},ball);
  var crab=E('g',{style:'cursor:pointer'},svg); E('ellipse',{cx:200,cy:266,rx:20,ry:14,fill:'#ff6b4d',stroke:'#201540','stroke-width':3},crab); E('circle',{cx:193,cy:258,r:3,fill:'#201540'},crab); E('circle',{cx:207,cy:258,r:3,fill:'#201540'},crab); E('path',{d:'M182 272 l-10 6 M218 272 l10 6 M186 278 l-8 8 M214 278 l8 8',stroke:'#201540','stroke-width':3,'stroke-linecap':'round'},crab); E('path',{d:'M178 258 q-12 -8 -16 2 q10 6 16 2z M222 258 q12 -8 16 2 q-10 6 -16 2z',fill:'#ff8a6d',stroke:'#201540','stroke-width':3},crab);
  var floors=0;
  function drawCastle(){ clear(cg); var baseY=228,w=150,x=430,i; for(i=0;i<floors;i++){ var fw=w-i*20,fx2=x+(w-fw)/2,fy=baseY-(i+1)*30; E('rect',{x:fx2,y:fy,width:fw,height:30,fill:i%2?'#f3d28e':'#ffe2a8',stroke:'#c9a25a','stroke-width':3,rx:4},cg);
    for(var b=0;b<Math.max(2,Math.floor(fw/26));b++) E('rect',{x:fx2+4+b*26,y:fy-8,width:14,height:9,fill:'#ffe2a8',stroke:'#c9a25a','stroke-width':3},cg); if(i===0) E('path',{d:'M'+(x+w/2-13)+' '+baseY+' v-22 a13 13 0 0 1 26 0 v22 z',fill:'#8a5a33',stroke:'#5d3b1f','stroke-width':3},cg); }
    if(floors>0){ var ty=baseY-floors*30-10; E('path',{d:'M'+(x+w/2)+' '+ty+' l0 -26',stroke:'#7a5a2b','stroke-width':3},cg); E('path',{d:'M'+(x+w/2)+' '+(ty-26)+' l26 8 -26 8 z',fill:'#ff4d9d',stroke:'#201540','stroke-width':2.5},cg); } cg.classList.remove('spop'); void cg.offsetWidth; cg.classList.add('spop'); }
  $('suBuild').addEventListener('click',function(){ if(floors>=6){ tip('suTip','That is the tallest castle on the beach! 🏰'); SND.win(); P.confetti(50); return; } floors++; drawCastle(); SND.tone(330+floors*70,0.25,'triangle',0.09); tip('suTip','Floor '+floors+'! Keep going.'); });
  $('suShell').addEventListener('click',function(){ var g=E('g',null,sg),c=pick(['#ffd0e8','#ffe2a8','#e6d5ff','#fff']); E('path',{d:'M0 0 a15 15 0 0 1 30 0 z',fill:c,stroke:'#201540','stroke-width':2.5},g); E('path',{d:'M6 -1 q4 -11 9 -12 M15 -13 q5 1 9 12',stroke:'#201540','stroke-width':1.8,fill:'none'},g); g.setAttribute('transform','translate('+rnd(40,400).toFixed(0)+','+rnd(244,286).toFixed(0)+') rotate('+ri(-20,20)+')'); g.classList.add('spop'); SND.ding(); tip('suTip','A shell! Hold it to your ear. 🐚'); });
  $('suWave').addEventListener('click',function(){ SND.whoosh(); var f=E('path',{d:'M-300 200 q80 -60 160 -10 t160 6 V300 H-300z',fill:'#fff',opacity:.9},svg); f.style.transition='transform 2s cubic-bezier(.2,.8,.4,1),opacity .6s 1.5s'; requestAnimationFrame(function(){ f.style.transform='translateX(1100px)'; f.style.opacity='0'; });
    setTimeout(function(){ f.remove(); clear(sg); floors=0; drawCastle(); tip('suTip','The wave washed the beach clean. 🌊'); },2400); });
  function tapper(n,word,fn){ n.addEventListener('click',function(){ say(word); tip('suTip',word); var r=n.getBoundingClientRect(); P.sparkleAt(r.left+r.width/2,r.top+r.height/2,10); if(fn) fn(); }); }
  tapper(sun,'The summer sun!',function(){ SND.tone(784,0.3,'sine',0.1); });
  tapper(ball,'A beach ball!',function(){ SND.pop(); ball.style.transition='transform .3s cubic-bezier(.3,1.7,.5,1)'; ball.style.transform='translateY(-46px)'; setTimeout(function(){ ball.style.transform='translateY(0)'; },320); });
  tapper(crab,'A crab! Click click.',function(){ SND.tap(); crab.style.transition='transform 1s ease-in-out'; crab.style.transform='translateX('+ri(-90,120)+'px)'; });
})();

/* ═════════ AUTUMN — the hand, the rake, the pile, the jump ═════════ */
(function(){
  var svg=$('autumn'),defs=E('defs',null,svg);
  var sky=E('linearGradient',{id:'auSky',x1:0,y1:0,x2:0,y2:1},defs); E('stop',{offset:0,'stop-color':'#ffd9a8'},sky); E('stop',{offset:1,'stop-color':'#ffeccd'},sky);
  var gr=E('linearGradient',{id:'auGrass',x1:0,y1:0,x2:0,y2:1},defs); E('stop',{offset:0,'stop-color':'#c6c274'},gr); E('stop',{offset:1,'stop-color':'#9aa05a'},gr);
  E('rect',{width:760,height:300,fill:'url(#auSky)'},svg); E('circle',{cx:680,cy:56,r:34,fill:'#ffb463',opacity:.85},svg);
  E('path',{d:'M0 208 q180 -20 380 -4 t380 -6 V300 H0z',fill:'url(#auGrass)'},svg);
  var tree=E('g',{style:'cursor:pointer'},svg); E('path',{d:'M150 228 q-4 -60 0 -92',stroke:'#7a4a26','stroke-width':22,fill:'none','stroke-linecap':'round'},tree); E('path',{d:'M150 168 q-26 -16 -38 -36 M150 156 q28 -18 40 -38',stroke:'#7a4a26','stroke-width':11,fill:'none','stroke-linecap':'round'},tree);
  E('circle',{cx:110,cy:122,r:40,fill:'#e06a2a'},tree); E('circle',{cx:190,cy:116,r:42,fill:'#d4541f'},tree); E('circle',{cx:150,cy:92,r:42,fill:'#f08a3a'},tree); E('circle',{cx:150,cy:132,r:34,fill:'#e8762c'},tree);
  var pg=E('g',null,svg),lg=E('g',null,svg);
  /* the KID — waits on the left, runs and jumps on command */
  var kid=E('g',{transform:'translate(60,236)'},svg);
  E('ellipse',{cx:-10,cy:34,rx:10,ry:6,fill:'#ff4d9d',stroke:'#201540','stroke-width':3},kid); E('ellipse',{cx:10,cy:34,rx:10,ry:6,fill:'#ff4d9d',stroke:'#201540','stroke-width':3},kid);
  E('rect',{x:-16,y:-10,width:32,height:44,rx:12,fill:'#8b3dff',stroke:'#201540','stroke-width':3.5},kid);
  E('circle',{cx:0,cy:-26,r:20,fill:'#ffe0c2',stroke:'#201540','stroke-width':3.5},kid); E('path',{d:'M-20 -32 q20 -26 40 0 q-10 -8 -20 -8 q-10 0 -20 8z',fill:'#ffd84d',stroke:'#201540','stroke-width':3},kid);
  E('path',{d:'M-12 -48 l5 -10 4 10 5 -10 4 10',fill:'#ffc53d',stroke:'#201540','stroke-width':2.5,'stroke-linejoin':'round'},kid);
  E('circle',{cx:-7,cy:-28,r:2.6,fill:'#201540'},kid); E('circle',{cx:7,cy:-28,r:2.6,fill:'#201540'},kid); E('path',{d:'M-6 -18 q6 6 12 0',stroke:'#201540','stroke-width':2.5,fill:'none','stroke-linecap':'round'},kid);
  var arms=E('path',{d:'M-16 -2 q-14 10 -12 22 M16 -2 q14 10 12 22',stroke:'#ffe0c2','stroke-width':8,fill:'none','stroke-linecap':'round'},kid);
  /* the HAND holding the RAKE — this whole group follows the pointer */
  var rake=E('g',{style:'cursor:grab'},svg);
  E('path',{d:'M0 -108 L0 -12',stroke:'#b07b3e','stroke-width':9,'stroke-linecap':'round'},rake);
  E('path',{d:'M-40 -12 L40 -12',stroke:'#6f7a86','stroke-width':9,'stroke-linecap':'round'},rake);
  E('path',{d:'M-40 -12 L-44 14 M-27 -12 L-29 16 M-13 -12 L-14 18 M0 -12 L0 18 M13 -12 L14 18 M27 -12 L29 16 M40 -12 L44 14',stroke:'#8d98a5','stroke-width':6,'stroke-linecap':'round'},rake);
  var hand=E('g',{transform:'translate(0,-70)'},rake);
  E('path',{d:'M-18 -30 q-10 -16 6 -22 l4 -18 q6 -8 12 0 l2 18 l4 -20 q6 -8 12 0 l0 22 l6 -14 q7 -6 11 2 l-2 20 l8 -8 q8 -2 8 8 q-2 30 -22 44 q-16 12 -34 4 q-16 -8 -15 -36z',fill:'#ffe0c2',stroke:'#201540','stroke-width':4,'stroke-linejoin':'round'},hand);
  E('path',{d:'M-6 -6 h20',stroke:'#e0b898','stroke-width':3,'stroke-linecap':'round'},hand);
  E('path',{d:'M-24 0 q-6 22 4 40',stroke:'#8b3dff','stroke-width':12,fill:'none','stroke-linecap':'round'},hand); /* sleeve */
  var hit=E('rect',{width:760,height:300,fill:'transparent',style:'cursor:grab'},svg);
  var LEAFC=['#e06a2a','#d4541f','#f0a13a','#c2431a','#e8b23a','#b8451f','#f08a3a'],leaves=[],pile=[],rx=380,ry=250,lastX=rx,dragging=false,PILE_X=660;
  function mkLeaf(x,y){ var g=E('g',null,lg),c=pick(LEAFC); E('path',{d:'M0 0 q-13 -9 -13 -1 q0 10 13 11 q13 -1 13 -11 q0 -8 -13 1 z',fill:c,stroke:'#8a3f14','stroke-width':2},g); E('path',{d:'M-11 3 L11 3',stroke:'#8a3f14','stroke-width':1.6},g); var o={x:x,y:y,rot:ri(0,359),el:g,c:c}; place(o); leaves.push(o); return o; }
  function place(o){ o.el.setAttribute('transform','translate('+o.x.toFixed(1)+','+o.y.toFixed(1)+') rotate('+o.rot+')'); }
  /* the pile is made of the ACTUAL leaves, stacked */
  function addToPile(o){ o.el.remove(); leaves.splice(leaves.indexOf(o),1); pile.push(o.c); drawPile(); }
  function drawPile(){ clear(pg); if(!pile.length) return; var n=pile.length,w=Math.min(120,40+n*4),h=Math.min(86,12+n*4.6);
    E('ellipse',{cx:PILE_X,cy:274,rx:w+8,ry:8,fill:'#8a6a3a',opacity:.25},pg);
    E('path',{d:'M'+(PILE_X-w)+' 276 q'+(w*.5)+' '+(-h*1.5)+' '+w+' 0 q'+(w*.5)+' '+(-h*1.4)+' '+w+' 0 z',fill:'#e06a2a',stroke:'#a13c12','stroke-width':3},pg);
    pile.forEach(function(c,i){ var lx=PILE_X-w+((i*37)%(w*2)),ly=276-((i*23)%Math.max(8,h*.95))-4; var g=E('g',{transform:'translate('+lx+','+ly+') rotate('+((i*47)%360)+')'},pg); E('path',{d:'M0 0 q-11 -8 -11 -1 q0 9 11 10 q11 -1 11 -10 q0 -7 -11 1 z',fill:c,stroke:'#8a3f14','stroke-width':1.6},g); }); }
  function moveRake(x,y){ rx=Math.max(50,Math.min(730,x)); ry=Math.max(200,Math.min(278,y)); rake.setAttribute('transform','translate('+rx.toFixed(1)+','+ry.toFixed(1)+')'); var dir=rx-lastX;
    if(Math.abs(dir)>.4){ var lo=Math.min(lastX,rx)-50,hi=Math.max(lastX,rx)+50;
      leaves.slice().forEach(function(o){ if(o.x>lo&&o.x<hi&&o.y>ry-46&&o.y<ry+40){ o.x=dir>0?rx+48:rx-48; o.x=Math.max(16,Math.min(748,o.x)); o.rot=(o.rot+dir*2)%360; o.y=Math.max(206,Math.min(286,o.y+rnd(-1.5,1.5)));
        if(o.x>PILE_X-52){ addToPile(o); SND.tone(220+Math.min(pile.length,20)*16,0.1,'triangle',0.05); if(pile.length===6) tip('auTip','Look at that pile growing! Keep raking.'); if(pile.length>=14) tip('auTip','Huge pile! Hit the JUMP button. 🙌'); } else place(o); } });
      lastX=rx; } }
  moveRake(rx,ry);
  hit.addEventListener('pointerdown',function(e){ dragging=true; try{svg.setPointerCapture(e.pointerId);}catch(x){} var p=pt(svg,e,760,300); moveRake(p.x,p.y); e.preventDefault(); });
  svg.addEventListener('pointermove',function(e){ if(!dragging) return; var p=pt(svg,e,760,300); moveRake(p.x,p.y); e.preventDefault(); });
  function up(){ dragging=false; } svg.addEventListener('pointerup',up); svg.addEventListener('pointercancel',up); svg.addEventListener('pointerleave',up);
  function drop(n){ for(var i=0;i<n;i++)(function(i){ setTimeout(function(){ var o=mkLeaf(rnd(70,240),86); o.el.style.transition='transform 1.7s cubic-bezier(.4,.1,.6,1)'; var tx=rnd(30,600),ty=rnd(212,282);
    requestAnimationFrame(function(){ o.el.style.transform='translate('+(tx-o.x).toFixed(1)+'px,'+(ty-o.y).toFixed(1)+'px) rotate('+ri(160,540)+'deg)'; });
    setTimeout(function(){ o.el.style.transition=''; o.el.style.transform=''; o.x=tx; o.y=ty; o.rot=ri(0,359); place(o); },1750); SND.tone(rnd(300,520),0.14,'sine',0.04); },i*130); })(i); }
  function shake(){ tree.classList.remove('swig'); void tree.offsetWidth; tree.classList.add('swig'); drop(10); tip('auTip','Leaves everywhere! Grab the hand and rake.'); }
  tree.addEventListener('click',shake); $('auShake').addEventListener('click',shake);
  $('auSweep').addEventListener('click',function(){ var ys=[216,248,278],pass=0,x=40; rx=40; lastX=40; moveRake(40,ys[0]);
    var timer=setInterval(function(){ x+=10; if(x>744){ pass++; if(pass>=ys.length){ clearInterval(timer); tip('auTip','All raked up. Now JUMP! 🍂'); return; } x=40; rx=40; lastX=40; rake.setAttribute('transform','translate(40,'+ys[pass]+')'); return; } moveRake(x,ys[pass]); },28); });
  $('auJump').addEventListener('click',function(){ if(pile.length<4){ tip('auTip','Rake a few more leaves first, then jump!'); SND.oops(); return; }
    SND.whoosh(); tip('auTip','Here she goes…'); kid.style.transition='transform 1.1s cubic-bezier(.3,.6,.6,1)'; arms.setAttribute('d','M-16 -2 q-16 -12 -18 -26 M16 -2 q16 -12 18 -26');
    kid.style.transform='translate('+(PILE_X-60-120)+'px,-160px)';
    setTimeout(function(){ kid.style.transition='transform .5s cubic-bezier(.5,0,.8,.4)'; kid.style.transform='translate('+(PILE_X-60)+'px,-10px)'; },1100);
    setTimeout(function(){ SND.win(); say('Wheeeee!'); P.confetti(80); var burst=pile.length; pile=[]; drawPile();
      for(var i=0;i<Math.min(burst,26);i++)(function(i){ var o=mkLeaf(PILE_X+rnd(-40,40),268); o.el.style.transition='transform 1.5s ease-out'; var tx=rnd(60,730),ty=rnd(208,286);
        requestAnimationFrame(function(){ o.el.style.transform='translate('+(tx-o.x).toFixed(1)+'px,'+(ty-260).toFixed(1)+'px) rotate('+ri(-400,400)+'deg)'; }); setTimeout(function(){ o.el.style.transition=''; o.el.style.transform=''; o.x=tx; o.y=ty; place(o); },1550); })(i);
      kid.style.transform='translate('+(PILE_X-60)+'px,10px)'; tip('auTip','WHEEEE! She is buried in leaves. Rake them up again. 🍁');
      setTimeout(function(){ kid.style.transition='transform 1.2s ease-in-out'; kid.style.transform='translate(0,0)'; arms.setAttribute('d','M-16 -2 q-14 10 -12 22 M16 -2 q14 10 12 22'); },2600); },1650); });
  drop(11);
})();

/* ═════════ WINTER — with Marshmallow the kitty helper ═════════ */
(function(){
  var svg=$('winter'),defs=E('defs',null,svg);
  var sky=E('linearGradient',{id:'wiSky',x1:0,y1:0,x2:0,y2:1},defs); E('stop',{offset:0,'stop-color':'#b8e3ff'},sky); E('stop',{offset:1,'stop-color':'#f2fbff'},sky);
  var ball=E('radialGradient',{id:'wiBall'},defs); E('stop',{offset:0,'stop-color':'#fff'},ball); E('stop',{offset:1,'stop-color':'#dbeaf5'},ball);
  var skyR=E('rect',{width:760,height:300,fill:'url(#wiSky)'},svg); var snowG=E('g',null,svg);
  E('path',{d:'M0 236 q130 -34 260 -8 t250 -10 q130 -20 250 10 V300 H0z',fill:'#fff'},svg); E('path',{d:'M0 256 q180 -18 380 0 t380 -6 V300 H0z',fill:'#eaf4fb'},svg);
  var man=E('g',null,svg);
  E('circle',{cx:300,cy:236,r:54,fill:'url(#wiBall)',stroke:'#c3d8e6','stroke-width':3},man); E('circle',{cx:300,cy:172,r:40,fill:'url(#wiBall)',stroke:'#c3d8e6','stroke-width':3},man); E('circle',{cx:300,cy:120,r:30,fill:'url(#wiBall)',stroke:'#c3d8e6','stroke-width':3},man);
  E('path',{d:'M262 168 q-40 -14 -56 -40 M212 140 l-14 -12 M212 140 l-16 8',stroke:'#8a5a33','stroke-width':7,fill:'none','stroke-linecap':'round'},man); E('path',{d:'M338 168 q40 -14 56 -40 M388 140 l14 -12 M388 140 l16 8',stroke:'#8a5a33','stroke-width':7,fill:'none','stroke-linecap':'round'},man);
  E('circle',{cx:300,cy:224,r:5,fill:'#3b2a1a'},man); E('circle',{cx:300,cy:248,r:5,fill:'#3b2a1a'},man);
  /* Marshmallow the kitty, pushing a snowball */
  var kit=E('g',{transform:'translate(560,250)'},svg);
  var snowball=E('circle',{cx:44,cy:8,r:18,fill:'#fff',stroke:'#c3d8e6','stroke-width':3},kit);
  E('path',{d:'M-20 6 q-30 -6 -24 -34',fill:'none',stroke:'#201540','stroke-width':11,'stroke-linecap':'round'},kit); E('path',{d:'M-20 6 q-30 -6 -24 -34',fill:'none',stroke:'#fff','stroke-width':6,'stroke-linecap':'round'},kit);
  E('ellipse',{cx:0,cy:8,rx:26,ry:18,fill:'#fff',stroke:'#201540','stroke-width':3.5},kit);
  E('path',{d:'M6 -22 L-2 -40 L18 -30 Z M30 -22 L38 -40 L18 -30 Z',fill:'#fff',stroke:'#201540','stroke-width':3,'stroke-linejoin':'round'},kit);
  E('circle',{cx:18,cy:-10,r:20,fill:'#fff',stroke:'#201540','stroke-width':3.5},kit);
  E('path',{d:'M4 -34 l6 -10 6 8 4 -10 4 10 6 -8 6 10 z',fill:'#ffd84d',stroke:'#c9a01a','stroke-width':2,'stroke-linejoin':'round'},kit);
  E('circle',{cx:11,cy:-12,r:3.5,fill:'#17c7e8',stroke:'#201540','stroke-width':1.5},kit); E('circle',{cx:25,cy:-12,r:3.5,fill:'#8b3dff',stroke:'#201540','stroke-width':1.5},kit);
  E('path',{d:'M15 -4 l3 3 3 -3 z',fill:'#ff9ec2',stroke:'#201540','stroke-width':1.5},kit); E('path',{d:'M18 -1 q-5 5 -9 1 M18 -1 q5 5 9 1',stroke:'#201540','stroke-width':1.8,fill:'none','stroke-linecap':'round'},kit);
  E('path',{d:'M-16 -12 h-12 M-16 -8 h-12 M52 -12 h12 M52 -8 h12',stroke:'#201540','stroke-width':1.5,'stroke-linecap':'round'},kit);
  E('path',{d:'M22 6 q14 -4 20 -12',stroke:'#fff','stroke-width':7,'stroke-linecap':'round',fill:'none'},kit); E('path',{d:'M22 6 q14 -4 20 -12',stroke:'#201540','stroke-width':2,'stroke-linecap':'round',fill:'none',opacity:.4},kit);
  kit.style.animation='sbob 3s ease-in-out infinite';
  var parts=E('g',null,svg); var tree=E('g',null,svg); E('path',{d:'M660 260 v-16',stroke:'#7a4a26','stroke-width':10},tree); E('path',{d:'M660 130 l40 62 h-80z',fill:'#3f9e5c'},tree); E('path',{d:'M660 168 l48 76 h-96z',fill:'#4bb069'},tree); E('path',{d:'M648 200 h24 M640 230 h40',stroke:'#fff','stroke-width':5,'stroke-linecap':'round',opacity:.8},tree);
  var PIECES=[{id:'nose',home:[70,276],target:[304,122],label:'A carrot nose!',draw:function(g){ E('path',{d:'M0 0 l44 9 -44 9 z',fill:'#ffa63d',stroke:'#c9701a','stroke-width':3,'stroke-linejoin':'round'},g); E('path',{d:'M10 4 l0 10 M20 5 l0 9 M30 7 l0 6',stroke:'#c9701a','stroke-width':2},g); }},
    {id:'eyes',home:[150,276],target:[300,110],label:'Two coal eyes!',draw:function(g){ E('circle',{cx:-12,r:7,fill:'#3b2a1a'},g); E('circle',{cx:12,r:7,fill:'#3b2a1a'},g); E('circle',{cx:-14,cy:-2,r:2.2,fill:'#fff',opacity:.7},g); E('circle',{cx:10,cy:-2,r:2.2,fill:'#fff',opacity:.7},g); }},
    {id:'hat',home:[430,272],target:[300,86],label:'A top hat!',draw:function(g){ E('rect',{x:-40,y:-4,width:80,height:10,rx:5,fill:'#201540'},g); E('rect',{x:-24,y:-42,width:48,height:40,rx:5,fill:'#3a2a58'},g); E('rect',{x:-24,y:-16,width:48,height:11,fill:'#ff4d9d'},g); }},
    {id:'scarf',home:[510,274],target:[300,146],label:'A cozy scarf!',draw:function(g){ E('path',{d:'M-34 0 q34 18 68 0 q4 12 0 16 q-34 16 -68 0 q-4 -6 0 -16 z',fill:'#ff4d9d',stroke:'#c9316f','stroke-width':3},g); E('path',{d:'M22 12 q12 16 6 34 l-18 -4 q6 -16 0 -28 z',fill:'#ff7ab3',stroke:'#c9316f','stroke-width':3},g); }}];
  var placedCount=0;
  function build(){ clear(parts); placedCount=0; man.querySelectorAll('.spop').forEach(function(n){ n.remove(); });
    PIECES.forEach(function(pc){ var g=E('g',{style:'cursor:grab'},parts); pc.draw(g); var st={x:pc.home[0],y:pc.home[1],placed:false}; g.setAttribute('transform','translate('+st.x+','+st.y+')'); var dragging=false;
      g.addEventListener('pointerdown',function(e){ if(st.placed) return; dragging=true; parts.appendChild(g); try{svg.setPointerCapture(e.pointerId);}catch(x){} SND.tap(); e.preventDefault(); });
      svg.addEventListener('pointermove',function(e){ if(!dragging) return; if(!g.isConnected){ dragging=false; return; } var p=pt(svg,e,760,300); st.x=p.x; st.y=p.y; g.setAttribute('transform','translate('+p.x.toFixed(1)+','+p.y.toFixed(1)+')'); e.preventDefault(); });
      function release(){ if(!dragging) return; dragging=false; if(Math.hypot(st.x-pc.target[0],st.y-pc.target[1])<58){ st.placed=true; placedCount++; g.style.transition='transform .3s cubic-bezier(.3,1.6,.5,1)'; g.setAttribute('transform','translate('+pc.target[0]+','+pc.target[1]+')'); g.style.cursor='default'; SND.ding(); say(pc.label); tip('wiTip',pc.label); var r=g.getBoundingClientRect(); P.sparkleAt(r.left+r.width/2,r.top+r.height/2,12);
        if(placedCount===PIECES.length) finish(); } }
      svg.addEventListener('pointerup',release); svg.addEventListener('pointercancel',release); }); }
  function finish(){ var m=E('path',{'class':'spop',d:'M276 136 q24 22 48 0',stroke:'#3b2a1a','stroke-width':5,fill:'none','stroke-linecap':'round'},man); E('circle',{'class':'spop',cx:278,cy:126,r:7,fill:'#ff9ec2',opacity:.6},man); E('circle',{'class':'spop',cx:322,cy:126,r:7,fill:'#ff9ec2',opacity:.6},man);
    SND.win(); P.confetti(90); say('You built a snowman! Marshmallow is so proud!'); tip('wiTip','You built him! Marshmallow is doing a happy dance. ⛄🐱');
    kit.style.animation='swig .5s ease-in-out 6'; setTimeout(function(){ kit.style.animation='sbob 3s ease-in-out infinite'; },3200); }
  function snow(n){ for(var i=0;i<n;i++)(function(i){ var x=rnd(0,760),f=E('circle',{cx:x,cy:-8,r:rnd(2,5),fill:'#fff',opacity:rnd(.6,1)},snowG); f.style.transition='transform '+rnd(3.4,7)+'s linear,opacity .6s';
    setTimeout(function(){ f.style.transform='translate('+rnd(-40,40)+'px,'+rnd(250,310)+'px)'; setTimeout(function(){ f.style.opacity=0; setTimeout(function(){ f.remove(); },700); },3200); },i*40); })(i); }
  $('wiSnow').addEventListener('click',function(){ snow(60); SND.whoosh(); tip('wiTip','Snow day! ❄️'); });
  $('wiSun').addEventListener('click',function(){ var s=E('g',{opacity:0},svg); E('circle',{cx:660,cy:60,r:36,fill:'#ffd84d',stroke:'#e8a800','stroke-width':4},s); s.style.transition='opacity 1s'; requestAnimationFrame(function(){ s.style.opacity=1; });
    var sh=E('g',{'class':'spop'},man); E('rect',{x:280,y:106,width:18,height:13,rx:4,fill:'#201540'},sh); E('rect',{x:302,y:106,width:18,height:13,rx:4,fill:'#201540'},sh); E('path',{d:'M298 111 h4',stroke:'#201540','stroke-width':3},sh);
    SND.ding(); say('Do not worry, he is made of magic snow.'); tip('wiTip','He put on sunglasses. He is made of magic snow. 😎'); setTimeout(function(){ s.style.opacity=0; setTimeout(function(){ s.remove(); },1200); },4500); });
  $('wiReset').addEventListener('click',function(){ build(); SND.tap(); tip('wiTip','Fresh snowman. Marshmallow rolled the balls for you. 🐱');
    /* the kitty pushes her snowball across to the snowman */
    kit.style.transition='transform 1.6s ease-in-out'; kit.style.transform='translateX(-200px)'; setTimeout(function(){ kit.style.transform='translateX(0)'; },1800); });
  build(); snow(40); setInterval(function(){ if(!D.hidden&&!D.body.classList.contains('calm')) snow(14); },7000);
})();

})();
