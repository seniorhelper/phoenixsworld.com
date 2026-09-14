/* ═══════════════════════════════════════════════════════════════════
   PHOENIX'S WORLD — world.js
   The world layer on the home page: sparkle trails between rooms,
   Phoenix's Garden (a tree you grow, flowers you water, birds, a pond
   with a fountain you can crank and rubber-duck RC boats), a mystery
   rope, floating gateways to every world, and the candy-castle gate.
   Everything is original SVG. Slow motion only, no flashing.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var P=window.PW; if(!P) return;
var E=P.E,H=P.H,$=P.$,rnd=P.rnd,ri=P.ri,pick=P.pick,SND=P.SND,say=P.say,screenSay=P.screenSay; var D=document;
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var BOW=P.BOW||['#ff4d9d','#ff8a3d','#ffc53d','#3fe0a4','#17c7e8','#8b3dff'];
function sparkle(x,y,n,c){ if(P.sparkleAt) P.sparkleAt(x,y,n,c); }
function mid(el){ var r=el.getBoundingClientRect(); return [r.left+r.width/2,r.top+r.height/2]; }

H('style',{html:
/* trails */
'.trail{position:relative;z-index:20;height:150px;overflow:hidden;background:var(--paper,#fff6fb)}.trail svg{position:absolute;inset:0;width:100%;height:100%;display:block}'+
'.trail .stone{transition:fill .5s,filter .5s}.trail.lit .stone{fill:#ffe08a;filter:drop-shadow(0 0 8px #ffd84d)}'+
'.trail .walk{stroke-dasharray:14 18;stroke-dashoffset:0;transition:stroke-dashoffset 2.4s ease-out}.trail.lit .walk{stroke-dashoffset:-480px}'+
'.trail .sign{font:700 15px/1 "Fredoka",sans-serif;fill:#201540}'+
'@media(max-width:640px){.trail{height:110px}}'+
/* garden band */
'.garden-wrap{background:linear-gradient(180deg,#bfe9ff 0%,#dff8ff 40%,#c9f2c4 41%,#a8e59a 100%)}'+
'.garden{position:relative;max-width:1140px;margin:0 auto}'+
'.garden-sky{position:relative;height:120px;overflow:hidden;margin-bottom:-40px}'+
'.bird{position:absolute;top:var(--t);left:-120px;width:70px;animation:flyby var(--d) linear infinite;animation-delay:var(--dl)}.bird svg{width:100%;height:auto;display:block;overflow:visible}'+
'.bird .wing{transform-box:fill-box;transform-origin:50% 100%;animation:flap .55s ease-in-out infinite alternate}.bird .wing.b{animation-delay:-.27s}'+
'@keyframes flyby{from{transform:translateX(0) translateY(0)}50%{transform:translateX(60vw) translateY(-18px)}to{transform:translateX(125vw) translateY(6px)}}@keyframes flap{from{transform:rotate(-28deg)}to{transform:rotate(22deg)}}'+
'.garden-row{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:end}@media(max-width:820px){.garden-row{grid-template-columns:1fr}}'+
'.gbox{border:6px solid var(--ink);border-radius:28px;background:rgb(255 255 255/.55);box-shadow:0 10px 0 rgb(var(--ink-rgb)/.2);padding:12px;position:relative;overflow:hidden}'+
'.gbox h3{margin:0 0 6px;font:700 22px/1.1 "Fredoka",sans-serif;color:var(--ink)}.gbox svg.scene{width:100%;height:auto;display:block;touch-action:none;user-select:none}'+
'.gtools{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:10px;align-items:center}'+
'.gtools .slider-box{flex:1 1 200px;max-width:320px;padding:8px 12px}'+
/* tree */
'.tree .grow{transform-box:fill-box;transform-origin:50% 100%;transition:transform 2.2s cubic-bezier(.3,1.3,.5,1),opacity .6s}'+
'.tree .leaf{transform-box:fill-box;transform-origin:50% 50%}.tree.sway .canopy{transform-box:fill-box;transform-origin:50% 100%;animation:treesway 3.2s ease-in-out infinite}@keyframes treesway{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}'+
'.tree.shake .canopy{animation:treeshake .5s ease-in-out 5}@keyframes treeshake{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}'+
'.petal{position:absolute;font-size:18px;line-height:1;pointer-events:none;animation:petalfall linear forwards}@keyframes petalfall{from{transform:translate(0,0) rotate(0);opacity:1}to{transform:translate(var(--dx),240px) rotate(var(--r));opacity:0}}'+
'.apple{cursor:pointer}.apple.drop{animation:appledrop .9s cubic-bezier(.4,0,.7,1) forwards;transform-box:fill-box;transform-origin:50% 50%}@keyframes appledrop{to{transform:translateY(190px) rotate(80deg)}}'+
/* flowers + can */
'.flower{cursor:pointer}.flower .head{transform-box:fill-box;transform-origin:50% 100%;transition:transform 1.4s cubic-bezier(.3,1.4,.5,1)}.flower.droop .head{transform:rotate(-38deg) scale(.7)}.flower.happy .head{animation:flowerbob 3s ease-in-out infinite}@keyframes flowerbob{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg) translateY(-4px)}}'+
'.flower .stem{transform-box:fill-box;transform-origin:50% 100%;transition:transform 1.4s cubic-bezier(.3,1.4,.5,1)}.flower.droop .stem{transform:scaleY(.8) skewX(-12deg)}'+
'.flower .face{transition:opacity .6s}.flower.droop .face.sad{opacity:1}.flower.droop .face.smile{opacity:0}.flower .face.sad{opacity:0}'+
'.can{cursor:grab;touch-action:none}.can.held{cursor:grabbing}.can .tilt{transform-box:fill-box;transform-origin:20% 80%;transition:transform .3s}.can.held .tilt{transform:rotate(-40deg)}'+
'.drip{transform-box:fill-box;transform-origin:50% 0;animation:drip .7s linear infinite}@keyframes drip{from{transform:translateY(0);opacity:1}to{transform:translateY(60px);opacity:0}}'+
'.bubbleword{position:absolute;padding:6px 12px;border:4px solid var(--ink);border-radius:16px;background:#fff;font:800 14px/1.2 "Nunito",sans-serif;color:var(--ink);pointer-events:none;box-shadow:0 4px 0 rgb(var(--ink-rgb)/.2);animation:pxin .4s cubic-bezier(.3,1.5,.5,1)}'+
/* pond */
'.pond .wave1{animation:wavex 6s linear infinite}.pond .wave2{animation:wavex 9s linear infinite reverse}@keyframes wavex{from{transform:translateX(0)}to{transform:translateX(-160px)}}'+
'.pond .shine{animation:shine 4s ease-in-out infinite}@keyframes shine{0%,100%{opacity:.35}50%{opacity:.7}}'+
'.pond .drop{animation:spoutdrop var(--d) ease-in forwards;transform-box:fill-box;transform-origin:50% 50%}@keyframes spoutdrop{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(.5);opacity:0}}'+
'.pond .ripple{fill:none;stroke:#fff;stroke-width:3;animation:rippleout 1.6s ease-out forwards}@keyframes rippleout{from{transform:scale(.2);opacity:.9}to{transform:scale(1);opacity:0}}'+
'.duck{cursor:pointer;transition:transform .35s linear}.duck.sel .glowring{opacity:1}.duck .glowring{opacity:0;transition:opacity .3s}.duck .body{animation:duckbob 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}@keyframes duckbob{0%,100%{transform:rotate(-3deg) translateY(0)}50%{transform:rotate(3deg) translateY(-3px)}}'+
'.dpad{display:grid;grid-template-columns:repeat(3,52px);gap:6px}.dpad .pad{width:52px;height:52px;border:4px solid var(--ink);border-radius:14px;background:#ffe08a;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #c98d00;padding:0}.dpad .pad:active{transform:translateY(3px);box-shadow:0 1px 0 #c98d00}.dpad .pad.go{background:#3fe0a4;box-shadow:0 4px 0 #18a877}'+
'.lily{cursor:pointer}.lily .flow{transform-box:fill-box;transform-origin:50% 100%;transition:transform .5s cubic-bezier(.3,1.6,.5,1)}.lily.open .flow{transform:scale(1.5)}'+
'.frog{cursor:pointer}.frog.hop{animation:froghop .6s ease-out;transform-box:fill-box;transform-origin:50% 100%}@keyframes froghop{50%{transform:translateY(-50px) scaleY(1.15)}}'+
/* rope */
'#rope{position:absolute;right:16px;top:-30px;width:44px;cursor:grab;z-index:5;touch-action:none;filter:drop-shadow(0 6px 0 rgb(var(--ink-rgb)/.25))}#rope svg{width:100%;height:auto;display:block;overflow:visible}#rope .rp{transform-box:fill-box;transform-origin:50% 0;transition:transform .35s cubic-bezier(.3,1.6,.5,1)}'+
'#rope .tag{font:800 11px/1 "Nunito",sans-serif;fill:#201540}#rope.pulled .rp{transform:translateY(40px)}@media(max-width:640px){#rope{width:36px;right:8px}}'+
/* gateways */
'.gateways{position:relative;height:210px;margin:-10px auto 16px;max-width:1140px}'+
'.gate{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;width:108px;height:108px;border-radius:50%;border:5px solid var(--ink);text-decoration:none;color:var(--ink);font:700 12px/1.1 "Fredoka",sans-serif;text-align:center;padding:6px;'+
 'background:radial-gradient(circle at 32% 28%,rgb(255 255 255/.95),var(--g,#ffd1e6) 55%,rgb(255 255 255/.6));box-shadow:inset -8px -10px 18px rgb(139 61 255/.18),0 8px 0 rgb(var(--ink-rgb)/.22);animation:gatefloat var(--d) ease-in-out infinite;animation-delay:var(--dl);transition:transform .2s}'+
'.gate:hover,.gate:focus{transform:scale(1.12)}.gate .pic{font-size:34px;line-height:1;margin-bottom:4px}'+
'@keyframes gatefloat{0%,100%{transform:translate(0,0) rotate(-2deg)}33%{transform:translate(8px,-14px) rotate(2deg)}66%{transform:translate(-6px,-6px) rotate(-1deg)}}'+
'@media(max-width:640px){.gateways{height:260px}.gate{width:84px;height:84px;font-size:10px}.gate .pic{font-size:26px}}'+
/* castle gate */
'.castle-wrap{background:linear-gradient(180deg,#ffd6f2 0%,#ffe7fb 55%,#c9a2ff 100%);padding-bottom:0!important}'+
'.castle{max-width:980px;margin:0 auto;position:relative}.castle svg{width:100%;height:auto;display:block;overflow:visible;cursor:pointer}'+
'.castle .bridge{transform-box:fill-box;transform-origin:50% 100%;transition:transform 1.6s cubic-bezier(.6,0,.7,1)}.castle.open .bridge{transform:scaleY(.04)}.castle .flat{opacity:0;transition:opacity .6s 1.2s}.castle.open .flat{opacity:1}'+
'.castle .door{transition:opacity 1s .8s}.castle.open .door{opacity:0}.castle .inside{opacity:0;transition:opacity 1s 1s}.castle.open .inside{opacity:1}'+
'.castle .flag{transform-box:fill-box;transform-origin:0 50%;animation:flagwave 1.6s ease-in-out infinite alternate}@keyframes flagwave{from{transform:skewY(-8deg)}to{transform:skewY(8deg)}}'+
'.castle .river{animation:wavex 7s linear infinite}.castle .lolli{transform-box:fill-box;transform-origin:50% 100%;animation:treesway 4s ease-in-out infinite}'+
'.castle .cta{position:absolute;left:50%;bottom:8%;transform:translateX(-50%);white-space:nowrap}'+
'@media(prefers-reduced-motion:reduce){.bird,.bird .wing,.flower.happy .head,.pond .wave1,.pond .wave2,.duck .body,.gate,.castle .flag,.castle .river,.castle .lolli,.tree.sway .canopy{animation:none!important}}'
},D.head);

/* ───────────────────────── 1. SPARKLE TRAILS between rooms ───────────────────────── */
var TRAILS=[['tank','🐠 This way to the fish…','M-20 120 C 150 20, 300 160, 480 70 S 800 20, 1020 110'],['globe','🌍 Follow the stones to the globe','M-20 40 C 200 150, 380 10, 560 100 S 860 140, 1020 50'],['shelf','🧸 Almost at the stuffies!','M-20 110 C 180 40, 320 140, 520 60 S 840 130, 1020 40']];
TRAILS.forEach(function(t,ti){ var sec=$(t[0]); if(!sec) return; var wrap=H('div',{'class':'trail','aria-hidden':'true'}); sec.parentNode.insertBefore(wrap,sec);
  var svg=E('svg',{viewBox:'0 0 1000 150',preserveAspectRatio:'none'},wrap);
  E('path',{d:t[2],fill:'none',stroke:'#fff',opacity:.8,'stroke-width':30,'stroke-linecap':'round'},svg);
  E('path',{d:t[2],fill:'none',stroke:'#e7d7ff','stroke-width':22,'stroke-linecap':'round'},svg);
  var walk=E('path',{'class':'walk',d:t[2],fill:'none',stroke:'#ffd84d','stroke-width':8,'stroke-linecap':'round',opacity:.9},svg);
  var guide=E('path',{d:t[2],fill:'none',stroke:'none'},svg); var L=guide.getTotalLength();
  for(var i=0;i<14;i++){ var pt=guide.getPointAtLength(L*(i+.5)/14); E('ellipse',{'class':'stone',cx:pt.x,cy:pt.y,rx:16,ry:9,fill:pick(['#c9a2ff','#a3ecfa','#ffb3d6','#a8f5da']),stroke:'#201540','stroke-width':3},svg); }
  var sp=guide.getPointAtLength(L*(ti%2?.22:.72)); var sg=E('g',{transform:'translate('+sp.x+' '+(sp.y-58)+')'},svg);
  E('path',{d:'M0 0 v58',stroke:'#8a5a2b','stroke-width':6},sg); E('rect',{x:-90,y:-18,width:180,height:34,rx:10,fill:'#fff3c4',stroke:'#201540','stroke-width':4,transform:'rotate(-3)'},sg); E('text',{'class':'sign',x:0,y:5,'text-anchor':'middle',transform:'rotate(-3)'},sg).textContent=t[1];
  ['🌸','🍄','🌷','🪨'].forEach(function(em){ var p2=guide.getPointAtLength(L*rnd(.05,.95)); E('text',{x:p2.x+rnd(-40,40),y:p2.y+rnd(-40,40),'font-size':26,'text-anchor':'middle'},svg).textContent=em; });
  if(window.IntersectionObserver){ new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ wrap.classList.add('lit'); } }); },{threshold:.5}).observe(wrap); } else wrap.classList.add('lit');
});

/* ───────────────────────── 2. PHOENIX'S GARDEN ───────────────────────── */
var tank=$('tank'); if(tank){
var band=H('section',{'class':'band garden-wrap',id:'garden'}); tank.parentNode.insertBefore(band,tank.nextSibling);
band.innerHTML='<h2 class="outlined">Phoenix\u2019s Garden</h2><p class="panel-lead">Grow the tree. Water the flowers. Crank the fountain. Drive the duckies. And pull the rope if you dare.</p>'+
 '<div class="garden"><div class="garden-sky" id="gardenSky"></div><div class="garden-row">'+
 '<div class="gbox" id="treeBox"><h3>🌱 The Growing Tree</h3></div>'+
 '<div class="gbox" id="flowerBox"><h3>🌻 Water Me, Please!</h3></div>'+
 '</div><div class="gbox" id="pondBox" style="margin-top:18px"><h3>🦆 The Pond</h3></div></div>';
var rope=H('div',{id:'rope',role:'button',tabindex:'0','aria-label':'Pull the mystery rope'},band);

/* birds */
var sky=$('gardenSky'); for(var b=0;b<4;b++){ var bird=H('div',{'class':'bird'},sky); var c=pick(['#17c7e8','#ff4d9d','#ffc53d','#8b3dff']); bird.style.setProperty('--t',rnd(4,70)+'px'); bird.style.setProperty('--d',rnd(14,26)+'s'); bird.style.setProperty('--dl',(-rnd(0,20))+'s'); bird.style.width=rnd(46,80)+'px';
  bird.innerHTML='<svg viewBox="0 0 70 40"><ellipse cx="34" cy="26" rx="18" ry="10" fill="'+c+'" stroke="#201540" stroke-width="3"/><circle cx="50" cy="18" r="9" fill="'+c+'" stroke="#201540" stroke-width="3"/><path d="M58 18 l10 3 l-10 3z" fill="#ffc53d" stroke="#201540" stroke-width="2"/><circle cx="52" cy="16" r="2.2" fill="#201540"/><path class="wing" d="M30 24 q-6 -18 14 -20 q-4 12 -14 20z" fill="#fff" stroke="#201540" stroke-width="3"/><path class="wing b" d="M28 26 q-8 -14 -22 -8 q10 8 22 8z" fill="'+c+'" stroke="#201540" stroke-width="3"/><path d="M16 26 l-12 -6 l4 10z" fill="'+c+'" stroke="#201540" stroke-width="3"/></svg>'; }

/* ── the tree ── */
var tb=$('treeBox'); var tsvg=E('svg',{'class':'scene tree',viewBox:'0 0 400 300'},tb);
E('rect',{x:0,y:250,width:400,height:50,fill:'#8fd07f'},tsvg); E('ellipse',{cx:200,cy:252,rx:120,ry:14,fill:'#7a4a1a',opacity:.5},tsvg);
var seedG=E('g',{'class':'grow',style:'transform:scale(1)'},tsvg); E('ellipse',{cx:200,cy:248,rx:9,ry:6,fill:'#a06a2c',stroke:'#201540','stroke-width':3},seedG);
var sproutG=E('g',{'class':'grow',style:'transform:scale(0);opacity:0'},tsvg); E('path',{d:'M200 250 q-2 -20 0 -40',stroke:'#3f9e5c','stroke-width':6,fill:'none','stroke-linecap':'round'},sproutG); E('path',{d:'M200 226 q-22 -14 -18 -30 q18 6 18 30z M200 218 q22 -14 18 -30 q-18 6 -18 30z',fill:'#5ccf7a',stroke:'#1d7a3d','stroke-width':3},sproutG);
var trunkG=E('g',{'class':'grow',style:'transform:scale(0);opacity:0'},tsvg); E('path',{d:'M182 250 C 186 200 176 150 196 100 L 204 100 C 224 150 214 200 218 250 Z',fill:'#8a5a2b',stroke:'#201540','stroke-width':4},trunkG); E('path',{d:'M196 110 q-30 -20 -50 -10 M204 130 q30 -26 56 -14',stroke:'#8a5a2b','stroke-width':9,fill:'none','stroke-linecap':'round'},trunkG); E('path',{d:'M196 110 q-30 -20 -50 -10 M204 130 q30 -26 56 -14',stroke:'#201540','stroke-width':3,fill:'none','stroke-linecap':'round',opacity:.4},trunkG);
var canopyOuter=E('g',{'class':'grow',style:'transform:scale(0);opacity:0'},tsvg); var canopy=E('g',{'class':'canopy'},canopyOuter);
[[200,70,70],[140,100,52],[262,98,54],[170,50,44],[236,52,46],[200,112,40]].forEach(function(o){ E('circle',{cx:o[0],cy:o[1],r:o[2],fill:pick(['#4ec36e','#5ccf7a','#3fb15e']),stroke:'#1d7a3d','stroke-width':4},canopy); });
var blossomG=E('g',null,canopy), appleG=E('g',null,canopy); var treeStage=0, apples=0;
var treeMsg=H('div',{'class':'gtools'},tb); var plantBtn=H('button',{type:'button','class':'toy btn t-mint gloss',text:'🌱 Plant the seed'},treeMsg); var shakeBtn=H('button',{type:'button','class':'toy btn small t-sun gloss',text:'🌸 Shake it',style:'display:none'},treeMsg); var treeOut=H('span',{'class':'slider-out',text:'A tiny seed. Everything big starts tiny.'},treeMsg);
function stage(n){ treeStage=n;
  if(n===1){ sproutG.style.transform='scale(1)'; sproutG.style.opacity='1'; seedG.style.opacity='0'; treeOut.textContent='A sprout! Give it a second…'; plantBtn.textContent='💧 Water it'; say('Look, a sprout!'); }
  if(n===2){ sproutG.style.opacity='0'; trunkG.style.transform='scale(1)'; trunkG.style.opacity='1'; setTimeout(function(){ canopyOuter.style.transform='scale(1)'; canopyOuter.style.opacity='1'; tsvg.classList.add('sway'); },900); treeOut.textContent='It is growing! Trees drink water through their roots, all the way up to the leaves.'; plantBtn.textContent='☀️ Give it sunshine'; say('Whoa, it is growing so fast!'); }
  if(n===3){ for(var i=0;i<26;i++) E('circle',{cx:rnd(110,300),cy:rnd(30,140),r:rnd(4,7),fill:pick(['#ff9ed2','#fff','#ffb3d6']),stroke:'#e0398f','stroke-width':1.5},blossomG); treeOut.textContent='Blossoms! In spring, blossoms turn into fruit. Shake the tree.'; plantBtn.style.display='none'; shakeBtn.style.display=''; say('Pretty blossoms! Shake it and see what happens.'); SND.sparkle(); }
  if(n===4){ blossomG.innerHTML=''; for(var k=0;k<7;k++){ var a=E('g',{'class':'apple'},appleG); var x=rnd(120,290), y=rnd(50,130); E('circle',{cx:x,cy:y,r:11,fill:'#ff4d4d',stroke:'#201540','stroke-width':3},a); E('path',{d:'M'+x+' '+(y-10)+' q4 -8 8 -6',stroke:'#3f9e5c','stroke-width':3,fill:'none'},a); E('circle',{cx:x-4,cy:y-4,r:3,fill:'#fff',opacity:.6},a);
      a.addEventListener('click',function(ev){ var g=ev.currentTarget; if(g.classList.contains('drop')) return; g.classList.add('drop'); SND.pop(); apples++; treeOut.textContent=apples===7?'You picked all 7 apples! Apple pie for everyone. 🥧':'Apples picked: '+apples+' of 7'; say(apples===7?'All seven! Apple pie for everyone!':pick(['Crunch!','Yum, an apple.','Got one!'])); setTimeout(function(){ g.remove(); },900); if(apples===7){ P.confetti&&P.confetti(80); shakeBtn.textContent='🌱 Plant a new seed'; shakeBtn.onclick=function(){ location.reload(); }; } }); }
    treeOut.textContent='Apples! Tap them to pick them. 🍎'; say('Apples! Pick them, quick!'); } }
plantBtn.addEventListener('click',function(){ SND.tap(); var r=plantBtn.getBoundingClientRect(); sparkle(r.left+r.width/2,r.top,14,['#5ccf7a','#fff','#ffd84d']); stage(Math.min(3,treeStage+1)); });
shakeBtn.addEventListener('click',function(){ if(treeStage!==3) return; tsvg.classList.add('shake'); SND.whoosh(); var rr=tb.getBoundingClientRect(); for(var i=0;i<24;i++)(function(i){ setTimeout(function(){ var pe=H('i',{'class':'petal',text:pick(['🌸','🌸','💮','🌷'])},tb); pe.style.left=rnd(20,80)+'%'; pe.style.top=rnd(20,45)+'%'; pe.style.setProperty('--dx',rnd(-80,80)+'px'); pe.style.setProperty('--r',rnd(-300,300)+'deg'); pe.style.animationDuration=rnd(1.6,3)+'s'; setTimeout(function(){ pe.remove(); },3100); },i*70); })(i); setTimeout(function(){ tsvg.classList.remove('shake'); stage(4); },2600); });

/* ── the flowers + watering can ── */
var fb=$('flowerBox'); var fsvg=E('svg',{'class':'scene',viewBox:'0 0 400 300'},fb);
E('rect',{x:0,y:250,width:400,height:50,fill:'#8fd07f'},fsvg);
var FLW=[[80,'#ff4d9d','#ffd84d'],[200,'#ffc53d','#ff8a3d'],[320,'#c9a2ff','#ff4d9d']]; var flowers=[]; var watered=0;
FLW.forEach(function(f,i){ var g=E('g',{'class':'flower droop'},fsvg); E('path',{'class':'stem',d:'M'+f[0]+' 252 q6 -50 0 -110',stroke:'#3f9e5c','stroke-width':8,fill:'none','stroke-linecap':'round'},g); E('path',{d:'M'+(f[0]-2)+' 210 q-26 -10 -30 -30 q22 4 30 30z M'+(f[0]+2)+' 190 q26 -10 30 -30 q-22 4 -30 30z',fill:'#5ccf7a',stroke:'#1d7a3d','stroke-width':3},g);
  var headPos=E('g',{transform:'translate('+f[0]+' 142)'},g); var head=E('g',{'class':'head'},headPos); for(var p=0;p<8;p++) E('ellipse',{cx:0,cy:-30,rx:13,ry:22,fill:f[1],stroke:'#201540','stroke-width':3,transform:'rotate('+(p*45)+')'},head); E('circle',{cx:0,cy:0,r:22,fill:f[2],stroke:'#201540','stroke-width':4},head);
  var sad=E('g',{'class':'face sad'},head); E('circle',{cx:-8,cy:-4,r:3,fill:'#201540'},sad); E('circle',{cx:8,cy:-4,r:3,fill:'#201540'},sad); E('path',{d:'M-8 9 q8 -8 16 0',stroke:'#201540','stroke-width':3,fill:'none','stroke-linecap':'round'},sad); E('path',{d:'M-12 -12 l8 3 M12 -12 l-8 3',stroke:'#201540','stroke-width':3,'stroke-linecap':'round'},sad);
  var sm=E('g',{'class':'face smile'},head); E('circle',{cx:-8,cy:-4,r:3.5,fill:'#201540'},sm); E('circle',{cx:8,cy:-4,r:3.5,fill:'#201540'},sm); E('path',{d:'M-9 4 q9 12 18 0',stroke:'#201540','stroke-width':3,fill:'none','stroke-linecap':'round'},sm); E('circle',{cx:-14,cy:4,r:4,fill:'#ff9ed2',opacity:.7},sm); E('circle',{cx:14,cy:4,r:4,fill:'#ff9ed2',opacity:.7},sm);
  flowers.push({g:g,x:f[0],ok:false}); g.addEventListener('click',function(){ if(!g.classList.contains('droop')) return; say(pick(['Water me, please!','I am so thirsty.','Drag the watering can over me!'])); SND.tap(); }); });
var can=E('g',{'class':'can',transform:'translate(320 40)'},fsvg); var tilt=E('g',{'class':'tilt'},can);
E('path',{d:'M-30 0 h50 v34 h-50z',fill:'#17c7e8',stroke:'#201540','stroke-width':4,rx:6},tilt); E('rect',{x:-30,y:0,width:50,height:34,rx:8,fill:'#17c7e8',stroke:'#201540','stroke-width':4},tilt); E('path',{d:'M-30 8 l-22 -16',stroke:'#201540','stroke-width':10,'stroke-linecap':'round'},tilt); E('path',{d:'M-30 8 l-22 -16',stroke:'#17c7e8','stroke-width':6,'stroke-linecap':'round'},tilt); E('circle',{cx:-54,cy:-10,r:9,fill:'#a3ecfa',stroke:'#201540','stroke-width':4},tilt); E('path',{d:'M-5 0 q0 -22 30 -18',stroke:'#201540','stroke-width':4,fill:'none'},tilt); E('text',{x:-5,y:24,'text-anchor':'middle','font-size':20},tilt).textContent='💧';
var dripsG=E('g',null,fsvg); var canPos={x:320,y:40}, canDown=false, sx=0,sy=0,ox=0,oy=0;
function svgPt(svg,e,w,h){ var r=svg.getBoundingClientRect(); return {x:(e.clientX-r.left)*w/r.width,y:(e.clientY-r.top)*h/r.height}; }
can.addEventListener('pointerdown',function(e){ canDown=true; var p=svgPt(fsvg,e,400,300); sx=p.x; sy=p.y; ox=canPos.x; oy=canPos.y; can.classList.add('held'); try{ fsvg.setPointerCapture(e.pointerId); }catch(x){} e.preventDefault(); });
fsvg.addEventListener('pointermove',function(e){ if(!canDown) return; var p=svgPt(fsvg,e,400,300); canPos.x=Math.max(20,Math.min(380,ox+p.x-sx)); canPos.y=Math.max(10,Math.min(230,oy+p.y-sy)); can.setAttribute('transform','translate('+canPos.x+' '+canPos.y+')'); e.preventDefault();
  if(Math.random()<.5){ var d=E('circle',{'class':'drip',cx:canPos.x-58,cy:canPos.y+rnd(0,10),r:rnd(2,4),fill:'#4fb8ff'},dripsG); setTimeout(function(){ d.remove(); },700); }
  flowers.forEach(function(f){ if(f.ok) return; if(Math.abs((canPos.x-58)-f.x)<34&&canPos.y<200){ f.hits=(f.hits||0)+1; if(f.hits>18){ f.ok=true; watered++; f.g.classList.remove('droop'); f.g.classList.add('happy'); SND.win(); sparkle(fsvg.getBoundingClientRect().left+f.x*fsvg.getBoundingClientRect().width/400,fsvg.getBoundingClientRect().top+140*fsvg.getBoundingClientRect().height/300,16,['#fff','#ffd84d','#3fe0a4']); say(pick(['Ahh, thank you! I feel so much better.','Glug glug. Thank you for looking after me.','Yay! Flowers need water, sunshine and a kind friend.'])); if(watered===3){ setTimeout(function(){ say('You watered every flower. That is what a good gardener does.'); P.confetti&&P.confetti(60); },1600); } } } }); });
function canUp(){ if(!canDown) return; canDown=false; can.classList.remove('held'); } fsvg.addEventListener('pointerup',canUp); fsvg.addEventListener('pointercancel',canUp);
var ft=H('div',{'class':'gtools'},fb); H('span',{'class':'slider-out',text:'Drag the watering can over a droopy flower and hold it there. Water makes them stand up tall.'},ft);
var resetF=H('button',{type:'button','class':'toy btn small t-white',text:'🌵 Make them thirsty again'},ft); resetF.addEventListener('click',function(){ flowers.forEach(function(f){ f.ok=false; f.hits=0; f.g.classList.add('droop'); f.g.classList.remove('happy'); }); watered=0; SND.tap(); say('Oh no, they are thirsty again!'); });

/* ── the pond ── */
var pb=$('pondBox'); var psvg=E('svg',{'class':'scene pond',viewBox:'0 0 800 360'},pb);
var defs=E('defs',null,psvg); var wg=E('linearGradient',{id:'pwater',x1:0,y1:0,x2:0,y2:1},defs); E('stop',{offset:'0%','stop-color':'#7fd8ff'},wg); E('stop',{offset:'55%','stop-color':'#2fb5e8'},wg); E('stop',{offset:'100%','stop-color':'#0b6fa9'},wg);
var cp=E('clipPath',{id:'pondClip'},defs); E('ellipse',{cx:400,cy:230,rx:370,ry:110},cp);
E('rect',{x:0,y:0,width:800,height:360,fill:'#a8e59a'},psvg); E('ellipse',{cx:400,cy:236,rx:386,ry:120,fill:'#5a8f3a',opacity:.6},psvg); E('ellipse',{cx:400,cy:230,rx:376,ry:114,fill:'#8a5a2b',opacity:.5},psvg);
E('ellipse',{cx:400,cy:230,rx:370,ry:110,fill:'url(#pwater)',stroke:'#0b4a70','stroke-width':4},psvg);
var water=E('g',{'clip-path':'url(#pondClip)'},psvg);
E('path',{'class':'wave1',d:(function(){ var d='M-160 200'; for(var x=-160;x<1000;x+=80) d+=' q40 -14 80 0'; return d; })(),stroke:'#fff',opacity:.35,'stroke-width':6,fill:'none'},water);
E('path',{'class':'wave2',d:(function(){ var d='M-160 260'; for(var x=-160;x<1000;x+=80) d+=' q40 12 80 0'; return d; })(),stroke:'#fff',opacity:.25,'stroke-width':5,fill:'none'},water);
E('path',{'class':'wave1',d:(function(){ var d='M-160 300'; for(var x=-160;x<1000;x+=80) d+=' q40 -10 80 0'; return d; })(),stroke:'#bff0ff',opacity:.3,'stroke-width':4,fill:'none'},water);
[[180,170,90,14],[560,290,120,16],[330,300,60,10]].forEach(function(o){ E('ellipse',{'class':'shine',cx:o[0],cy:o[1],rx:o[2],ry:o[3],fill:'#fff'},water); });
/* reeds, rocks, tree reflection, lily pads, frog */
E('path',{d:'M40 250 q-6 -60 10 -110 M52 262 q-2 -60 20 -100 M750 250 q6 -70 -10 -120 M736 262 q4 -60 -18 -100',stroke:'#1d7a3d','stroke-width':6,fill:'none','stroke-linecap':'round'},psvg); ['#a06a2c','#8a5a2b','#c98a4b'].forEach(function(c,i){ E('ellipse',{cx:90+i*22,cy:326,rx:20-i*4,ry:12-i*2,fill:c,stroke:'#201540','stroke-width':3},psvg); });
var lily=E('g',{'class':'lily',transform:'translate(150 270)'},water); E('path',{d:'M0 0 m-26 0 a26 26 0 1 1 52 0 l-14 -8 z',fill:'#3fb15e',stroke:'#1d7a3d','stroke-width':3},lily); var lflow=E('g',{'class':'flow'},lily); for(var q=0;q<6;q++) E('ellipse',{cx:0,cy:-10,rx:5,ry:10,fill:'#ff9ed2',stroke:'#e0398f','stroke-width':2,transform:'rotate('+(q*60)+')'},lflow); E('circle',{cx:0,cy:0,r:4,fill:'#ffd84d'},lflow);
lily.addEventListener('click',function(){ lily.classList.toggle('open'); SND.sparkle(); say(lily.classList.contains('open')?'The water lily opened up!':'It closed its petals. Night night, lily.'); });
var frogPos=E('g',{transform:'translate(640 296)'},water); var frog=E('g',{'class':'frog'},frogPos); E('ellipse',{cx:0,cy:0,rx:26,ry:16,fill:'#5ccf7a',stroke:'#1d7a3d','stroke-width':3},frog); E('circle',{cx:-10,cy:-14,r:8,fill:'#5ccf7a',stroke:'#1d7a3d','stroke-width':3},frog); E('circle',{cx:10,cy:-14,r:8,fill:'#5ccf7a',stroke:'#1d7a3d','stroke-width':3},frog); E('circle',{cx:-10,cy:-14,r:3.5,fill:'#201540'},frog); E('circle',{cx:10,cy:-14,r:3.5,fill:'#201540'},frog); E('path',{d:'M-10 2 q10 8 20 0',stroke:'#1d7a3d','stroke-width':3,fill:'none'},frog);
frog.addEventListener('click',function(){ frog.classList.remove('hop'); void frog.getBBox(); frog.classList.add('hop'); SND.boing(); say(pick(['Ribbit!','Ribbit ribbit!','Frogs are amphibians. They live on land AND in water.'])); ripple(640,300); });
/* fountain */
var spout=E('g',null,water); E('ellipse',{cx:400,cy:236,rx:40,ry:12,fill:'#8fa3b8',stroke:'#201540','stroke-width':3},spout); E('rect',{x:388,y:196,width:24,height:40,rx:6,fill:'#c9d6e2',stroke:'#201540','stroke-width':3},spout);
var jets=E('g',null,psvg); var spoutPow=35;
function drawJets(){ jets.innerHTML=''; if(spoutPow<=0) return; var h=spoutPow*2.2; [[-1,.6],[0,1],[1,.6],[-.5,.85],[.5,.85]].forEach(function(j){ var top=196-h*j[1]; E('path',{d:'M400 196 C '+(400+j[0]*14)+' '+(top+20)+' '+(400+j[0]*46)+' '+(top)+' '+(400+j[0]*70)+' '+(220)+'',stroke:'#fff',opacity:.85,'stroke-width':5,fill:'none','stroke-linecap':'round'},jets); E('path',{d:'M400 196 C '+(400+j[0]*14)+' '+(top+20)+' '+(400+j[0]*46)+' '+(top)+' '+(400+j[0]*70)+' '+(220)+'',stroke:'#7fd8ff',opacity:.9,'stroke-width':2.5,fill:'none','stroke-linecap':'round'},jets); }); }
drawJets(); var jetT=setInterval(function(){ if(D.hidden||spoutPow<=0) return; for(var i=0;i<Math.ceil(spoutPow/25);i++){ var d=E('circle',{'class':'drop',cx:400,cy:196-spoutPow*2.2+rnd(-10,10),r:rnd(2.5,5),fill:'#fff',opacity:.9},psvg); d.style.setProperty('--dx',rnd(-90,90)+'px'); d.style.setProperty('--dy',rnd(20,60+spoutPow)+'px'); d.style.setProperty('--d',rnd(.7,1.3)+'s'); setTimeout(function(el){ return function(){ el.remove(); }; }(d),1400); } if(Math.random()<.4) ripple(400+rnd(-40,40),230+rnd(-6,10)); },140);
function ripple(x,y){ var r=E('ellipse',{'class':'ripple',cx:x,cy:y,rx:36,ry:12,style:'transform-box:fill-box;transform-origin:50% 50%'},water); setTimeout(function(){ r.remove(); },1600); }
/* ducks */
var DUCKS=[['#ffe45c','#ff8a3d','Sunny'],['#ff9ed2','#ff4d9d','Rosie']]; var ducks=[]; var selDuck=0;
DUCKS.forEach(function(dd,i){ var pos={x:260+i*260,y:200+i*40,a:0}; var g=E('g',{'class':'duck'+(i===0?' sel':''),transform:'translate('+pos.x+' '+pos.y+')'},water); E('ellipse',{'class':'glowring',cx:0,cy:8,rx:46,ry:16,fill:'none',stroke:'#fff','stroke-width':4,'stroke-dasharray':'8 6'},g);
  var body=E('g',{'class':'body'},g); E('ellipse',{cx:0,cy:0,rx:34,ry:20,fill:dd[0],stroke:'#201540','stroke-width':4},body); E('path',{d:'M-30 -4 q-12 -16 0 -22 q6 12 0 22z',fill:dd[0],stroke:'#201540','stroke-width':3},body); E('circle',{cx:18,cy:-18,r:14,fill:dd[0],stroke:'#201540','stroke-width':4},body); E('path',{d:'M30 -18 l14 3 l-14 5z',fill:dd[1],stroke:'#201540','stroke-width':3,'stroke-linejoin':'round'},body); E('circle',{cx:22,cy:-21,r:3,fill:'#201540'},body); E('rect',{x:-10,y:-30,width:8,height:6,rx:2,fill:'#201540',opacity:.5},body); E('path',{d:'M-14 -26 h16',stroke:'#201540','stroke-width':3,'stroke-linecap':'round'},body); E('text',{x:0,y:8,'text-anchor':'middle','font-size':9,'font-family':'Fredoka','font-weight':'700',fill:'#201540'},body).textContent='RC';
  ducks.push({g:g,pos:pos,name:dd[2]}); g.addEventListener('click',function(){ selDuck=i; ducks.forEach(function(x,k){ x.g.classList.toggle('sel',k===i); }); SND.tap(); say(dd[2]+' is your boat now.'); }); });
function driveDuck(dx,dy){ var d=ducks[selDuck]; d.pos.x=Math.max(60,Math.min(740,d.pos.x+dx)); d.pos.y=Math.max(150,Math.min(320,d.pos.y+dy)); var flip=dx<0?' scale(-1,1)':(dx>0?'':(d.pos.flip||'')); d.pos.flip=flip; d.g.setAttribute('transform','translate('+d.pos.x+' '+d.pos.y+')'+flip); ripple(d.pos.x-(dx>0?30:-30)*(flip?-1:1),d.pos.y+8); SND.tone(rnd(180,260),0.12,'square',0.025); }
var pt=H('div',{'class':'gtools'},pb); var dpad=H('div',{'class':'dpad'},pt); [['',''],['⬆️','u'],['',''],['⬅️','l'],['🚤','go'],['➡️','r'],['',''],['⬇️','d'],['','']].forEach(function(k){ if(!k[0]){ H('span',null,dpad); return; } var bt=H('button',{type:'button','class':'pad'+(k[1]==='go'?' go':''),text:k[0],'aria-label':k[1]},dpad); var hold=null; function step(){ if(k[1]==='u') driveDuck(0,-14); if(k[1]==='d') driveDuck(0,14); if(k[1]==='l') driveDuck(-22,0); if(k[1]==='r') driveDuck(22,0); if(k[1]==='go'){ cruise(); } }
  bt.addEventListener('pointerdown',function(e){ step(); if(k[1]!=='go') hold=setInterval(step,160); e.preventDefault(); }); ['pointerup','pointerleave','pointercancel'].forEach(function(ev){ bt.addEventListener(ev,function(){ clearInterval(hold); hold=null; }); }); });
var cruiseT=null; function cruise(){ if(cruiseT){ clearInterval(cruiseT); cruiseT=null; say('Engine off.'); return; } say('Vroom! Full speed!'); SND.whoosh(); var dir=1; cruiseT=setInterval(function(){ if(D.hidden) return; var d=ducks[selDuck]; if(d.pos.x>=730) dir=-1; if(d.pos.x<=70) dir=1; driveDuck(22*dir,rnd(-6,6)); },170); setTimeout(function(){ if(cruiseT){ clearInterval(cruiseT); cruiseT=null; } },9000); }
var sb=H('div',{'class':'slider-box'},pt); H('label',{'for':'spoutRange',text:'Crank the fountain'},sb); var rg=H('input',{type:'range',id:'spoutRange',min:'0',max:'100',value:'35'},sb); var so=H('span',{'class':'slider-out',text:'Fountain: medium'},sb);
rg.addEventListener('input',function(){ spoutPow=+rg.value; drawJets(); so.textContent=spoutPow===0?'Fountain: off':spoutPow<34?'Fountain: a trickle':spoutPow<70?'Fountain: medium':'Fountain: WHOOSH!'; if(spoutPow>85&&!rg._said){ rg._said=true; say('Whoa, all the way up! The fish are getting a shower.'); setTimeout(function(){ rg._said=false; },6000); } });
H('span',{'class':'switch-cap',style:'max-width:none',text:'Tap a duck to pick it. Hold the arrows to drive it. 🚤 sends it cruising.'},pt);
psvg.addEventListener('pointerdown',function(e){ if(e.target===psvg||e.target.tagName==='ellipse'&&e.target.getAttribute('fill')==='url(#pwater)'){ var p=svgPt(psvg,e,800,360); ripple(p.x,p.y); SND.tone(rnd(300,500),0.08,'sine',0.03); } });

/* ── the mystery rope ── */
rope.innerHTML='<svg viewBox="0 0 44 150"><rect x="16" y="0" width="12" height="20" rx="3" fill="#8a5a2b" stroke="#201540" stroke-width="3"/><g class="rp"><path d="M22 18 v78" stroke="#c98a4b" stroke-width="10" stroke-linecap="round"/><path d="M22 18 v78" stroke="#201540" stroke-width="10" stroke-linecap="round" opacity=".25" stroke-dasharray="4 10"/><path d="M22 96 q-12 8 -10 24 q2 14 10 22 q8 -8 10 -22 q2 -16 -10 -24z" fill="#ff4d9d" stroke="#201540" stroke-width="4"/><text class="tag" x="22" y="124" text-anchor="middle">?</text></g></svg>';
var ropeDown=false, ropeY=0, ropePulls=0;
var ROPE_FX=[
 function(){ P.confetti&&P.confetti(200); return 'Confetti! Where did that come from?'; },
 function(){ if(window.PWrockets) window.PWrockets(); return 'ROCKETS!'; },
 function(){ var b=[].slice.call(D.querySelectorAll('.switch')).filter(function(x){ return /balloon/i.test(x.getAttribute('aria-label')||''); })[0]; if(b) b.click(); return 'Balloons? BALLOONS!'; },
 function(){ if(window.Phoenix&&window.Phoenix.move) window.Phoenix.move('twirl'); SND.meow(); return 'That rope is connected to my tail. Rude.'; },
 function(){ var b=[].slice.call(D.querySelectorAll('.switch')).filter(function(x){ return /bubble/i.test(x.getAttribute('aria-label')||''); })[0]; if(b&&b.getAttribute('aria-pressed')!=='true'){ b.click(); setTimeout(function(){ b.click(); },6000); } return 'Bubbles for six seconds!'; },
 function(){ P.setWeatherRaw&&P.setWeatherRaw('rain'); setTimeout(function(){ P.setWeatherRaw&&P.setWeatherRaw('off'); },5000); return 'Oops. I think that was the rain rope.'; },
 function(){ ducks.forEach(function(d){ d.g.classList.add('hop'); }); cruise(); return 'The duckies went ZOOM.'; },
 function(){ var b=[].slice.call(D.querySelectorAll('.switch')).filter(function(x){ return /gravity/i.test(x.getAttribute('aria-label')||''); })[0]; if(b) b.click(); return 'Uh oh. Gravity.'; },
 function(){ SND.roar(); frog.classList.remove('hop'); void frog.getBBox(); frog.classList.add('hop'); return 'The frog roared?! Frogs do not roar. That was weird.'; },
 function(){ var b=[].slice.call(D.querySelectorAll('.switch')).filter(function(x){ return /snail|slow/i.test(x.getAttribute('aria-label')||''); })[0]; if(b&&b.getAttribute('aria-pressed')!=='true'){ b.click(); setTimeout(function(){ b.click(); },8000); } return 'Slooooow rope.'; }
];
function ropePull(){ rope.classList.add('pulled'); SND.clunk(); ropePulls++; var fx=ROPE_FX[ropePulls%ROPE_FX.length]; var msg=fx(); say(msg); screenSay&&screenSay(msg+' 🪢'); var m=mid(rope); sparkle(m[0],m[1]+40,20); setTimeout(function(){ rope.classList.remove('pulled'); },700); }
rope.addEventListener('pointerdown',function(e){ ropeDown=true; ropeY=e.clientY; e.preventDefault(); try{ rope.setPointerCapture(e.pointerId); }catch(x){} });
rope.addEventListener('pointermove',function(e){ if(ropeDown&&e.clientY-ropeY>30){ ropeDown=false; ropePull(); } });
rope.addEventListener('pointerup',function(e){ if(ropeDown){ ropeDown=false; if(Math.abs(e.clientY-ropeY)<8) ropePull(); } });
rope.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); ropePull(); } });
}

/* ───────────────────────── 3. FLOATING GATEWAYS above the world grid ───────────────────────── */
var worlds=$('worlds'); if(worlds){ var grid=$('worldGrid'); var gw=H('div',{'class':'gateways','aria-label':'Floating doors to every world'}); worlds.insertBefore(gw,grid);
  var doors=[].slice.call(grid.querySelectorAll('a.world')); var colors=['#ffd1e6','#ffe9a8','#d8ccff','#c9f2ff','#d4ffe9','#ffe0cc'];
  doors.forEach(function(a,i){ var g=H('a',{'class':'gate',href:a.getAttribute('href')},gw); var pic=a.querySelector('.pic')?a.querySelector('.pic').textContent:'🚪'; var name=a.textContent.replace(pic,'').trim(); g.innerHTML='<span class="pic">'+pic+'</span>'+name; g.style.setProperty('--g',colors[i%colors.length]); var F=i/Math.max(1,doors.length-1); g.style.left='calc('+(F*100).toFixed(2)+'% - '+(F*110).toFixed(0)+'px)'; g.style.top=(i%3===0?4:i%3===1?46:24)+'%'; g.style.setProperty('--d',rnd(5,9)+'s'); g.style.setProperty('--dl',(-rnd(0,8))+'s');
    g.addEventListener('click',function(e){ e.preventDefault(); SND.whoosh(); var m=mid(g); sparkle(m[0],m[1],26,['#fff','#ffd84d',colors[i%colors.length]]); g.style.transition='transform .5s cubic-bezier(.6,-.2,.3,1.4)'; g.style.animation='none'; g.style.transform='scale(6)'; g.style.opacity='0'; setTimeout(function(){ location.href=g.getAttribute('href'); },450); }); });
  var lead=worlds.querySelector('.panel-lead'); if(lead) lead.textContent='Tap a floating bubble, or a door below. Every one is a real room.'; }

/* ───────────────────────── 4. THE CANDY CASTLE GATE ───────────────────────── */
var foot=D.querySelector('footer.foot'); if(foot){
var cw=H('section',{'class':'band castle-wrap',id:'castleGate'}); foot.parentNode.insertBefore(cw,foot);
cw.innerHTML='<h2 class="outlined">Princess Phoenix\u2019s Candy Castle</h2><p class="panel-lead">Tap the gate. The drawbridge comes down.</p><div class="castle" id="castle"></div>';
var cst=$('castle'); cst.innerHTML='<svg viewBox="0 0 1000 560" role="img" aria-label="A pink and purple candy castle with a drawbridge over a candy river">'+
 '<defs><linearGradient id="cwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd1e6"/><stop offset="1" stop-color="#ff9ed2"/></linearGradient><linearGradient id="croof" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9a2ff"/><stop offset="1" stop-color="#8b3dff"/></linearGradient><linearGradient id="criver" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff4d9d"/><stop offset=".5" stop-color="#ff8ad1"/><stop offset="1" stop-color="#ff4d9d"/></linearGradient><clipPath id="riverClip"><rect x="0" y="440" width="1000" height="80"/></clipPath></defs>'+
 '<rect x="0" y="0" width="1000" height="560" fill="none"/>'+
 /* candy river */
 '<rect x="0" y="440" width="1000" height="80" fill="url(#criver)" stroke="#201540" stroke-width="5"/><g clip-path="url(#riverClip)"><path class="river" d="M-160 470 q40 -12 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0" stroke="#fff" stroke-width="6" fill="none" opacity=".6"/><path class="river" d="M-160 500 q40 10 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0" stroke="#ffd1e6" stroke-width="5" fill="none" opacity=".7"/></g>'+
 '<text x="120" y="500" font-size="30">🍬</text><text x="840" y="505" font-size="30">🍭</text>'+
 /* lollipop trees */
 '<g transform="translate(90 440)"><g class="lolli"><rect x="-5" y="-120" width="10" height="120" fill="#fff" stroke="#201540" stroke-width="3"/><circle cx="0" cy="-160" r="48" fill="#3fe0a4" stroke="#201540" stroke-width="5"/><path d="M-36 -160 a36 36 0 0 1 36 -36 a26 26 0 0 1 26 26 a18 18 0 0 1 -18 18 a10 10 0 0 1 -10 -10" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g></g>'+
 '<g transform="translate(910 440)"><g class="lolli"><rect x="-5" y="-120" width="10" height="120" fill="#fff" stroke="#201540" stroke-width="3"/><circle cx="0" cy="-160" r="48" fill="#ffc53d" stroke="#201540" stroke-width="5"/><path d="M-36 -160 a36 36 0 0 1 36 -36 a26 26 0 0 1 26 26 a18 18 0 0 1 -18 18 a10 10 0 0 1 -10 -10" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g></g>'+
 /* castle body */
 '<g stroke="#201540" stroke-width="5" stroke-linejoin="round">'+
 '<rect x="220" y="240" width="560" height="200" fill="url(#cwall)"/>'+
 '<rect x="180" y="180" width="110" height="260" fill="url(#cwall)"/><rect x="710" y="180" width="110" height="260" fill="url(#cwall)"/>'+
 '<rect x="430" y="120" width="140" height="320" fill="url(#cwall)"/>'+
 '<path d="M175 180 l60 -90 l60 90z" fill="url(#croof)"/><path d="M705 180 l60 -90 l60 90z" fill="url(#croof)"/><path d="M420 120 l80 -100 l80 100z" fill="url(#croof)"/>'+
 '<g fill="#fff"><rect x="220" y="222" width="30" height="24"/><rect x="270" y="222" width="30" height="24"/><rect x="320" y="222" width="30" height="24"/><rect x="370" y="222" width="30" height="24"/><rect x="600" y="222" width="30" height="24"/><rect x="650" y="222" width="30" height="24"/><rect x="700" y="222" width="30" height="24"/><rect x="750" y="222" width="30" height="24"/></g>'+
 '<g fill="#a3ecfa"><rect x="215" y="230" width="36" height="46" rx="18"/><rect x="750" y="230" width="36" height="46" rx="18"/><rect x="470" y="180" width="60" height="70" rx="30"/><rect x="290" y="300" width="50" height="56" rx="25"/><rect x="660" y="300" width="50" height="56" rx="25"/></g>'+
 '<g stroke="none" fill="#ff4d9d"><circle cx="270" cy="360" r="8"/><circle cx="360" cy="400" r="8"/><circle cx="640" cy="360" r="8"/><circle cx="730" cy="400" r="8"/><circle cx="330" cy="280" r="6"/><circle cx="680" cy="280" r="6"/></g>'+
 '</g>'+
 /* flags */
 '<path d="M235 90 v-70" stroke="#201540" stroke-width="4"/><path class="flag" d="M237 20 l50 14 l-50 14z" fill="#ffc53d" stroke="#201540" stroke-width="3"/><path d="M765 90 v-70" stroke="#201540" stroke-width="4"/><path class="flag" d="M767 20 l50 14 l-50 14z" fill="#3fe0a4" stroke="#201540" stroke-width="3"/><path d="M500 20 v-16" stroke="#201540" stroke-width="4"/><path class="flag" d="M502 4 l60 16 l-60 16z" fill="#ff4d9d" stroke="#201540" stroke-width="3"/>'+
 /* inside (revealed when the door goes) */
 '<g class="inside"><rect x="440" y="300" width="120" height="140" fill="#2a1a5e"/><text x="500" y="370" text-anchor="middle" font-size="44">👑</text><text x="470" y="420" text-anchor="middle" font-size="26">🍰</text><text x="530" y="420" text-anchor="middle" font-size="26">🧁</text><circle cx="500" cy="330" r="60" fill="#ffd84d" opacity=".25"/></g>'+
 /* door + bridge */
 '<g class="door"><path d="M440 440 v-100 a60 60 0 0 1 120 0 v100z" fill="#8a5a2b" stroke="#201540" stroke-width="5"/><path d="M500 340 v100 M460 360 h80 M460 400 h80" stroke="#201540" stroke-width="3" opacity=".5"/><circle cx="520" cy="392" r="6" fill="#ffd84d" stroke="#201540" stroke-width="3"/></g>'+
 '<g class="bridge"><rect x="436" y="300" width="128" height="140" rx="6" fill="#c98a4b" stroke="#201540" stroke-width="5"/><path d="M436 330 h128 M436 360 h128 M436 390 h128 M436 420 h128" stroke="#201540" stroke-width="3" opacity=".5"/><path d="M440 300 L 405 160 M560 300 L 595 160" stroke="#8d8d9a" stroke-width="6" stroke-dasharray="8 8"/></g>'+
 '<path class="flat" d="M436 440 L 564 440 L 640 520 L 360 520 Z" fill="#c98a4b" stroke="#201540" stroke-width="5"/><path class="flat" d="M450 460 h100 M430 480 h140 M412 500 h176" stroke="#201540" stroke-width="3" opacity=".45"/>'+
 '<text x="500" y="270" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="30" fill="#fff" stroke="#201540" stroke-width="6" paint-order="stroke">TAP THE GATE</text>'+
 '</svg>';
var ctaWrap=H('div',{'class':'cta'},cst); var cta=H('a',{'class':'toy btn huge t-pink gloss',href:'/phoenix-imagination-castle/',text:'🏰 Go inside the castle'},ctaWrap); ctaWrap.style.display='none';
var castleOpen=false, castleReady=null;
try{ fetch('/phoenix-imagination-castle/',{method:'HEAD'}).then(function(r){ castleReady=r.ok; }).catch(function(){ castleReady=false; }); }catch(e){ castleReady=false; }
function openGate(){ if(castleOpen) return; castleOpen=true; cst.classList.add('open'); SND.clunk(); SND.slide(500,120,1.4,'sawtooth',0.05); setTimeout(function(){ SND.boing(); var m=mid(cst); sparkle(m[0],m[1],40,['#ff4d9d','#c9a2ff','#fff','#ffd84d']); },1500);
  say('The drawbridge is down! Welcome to my candy castle.'); setTimeout(function(){ if(castleReady){ ctaWrap.style.display=''; } else { say(pick(['The builders are still inside with the frosting. Come back and try the gate again soon!','It smells like cupcakes in there. The rooms are almost ready.'])); } },1800); }
cst.querySelector('svg').addEventListener('click',function(){ if(castleOpen){ if(castleReady) location.href='/phoenix-imagination-castle/'; else { cst.classList.remove('open'); castleOpen=false; SND.tap(); } } else openGate(); });
cta.addEventListener('click',function(e){ e.preventDefault(); SND.whoosh(); cst.style.transition='transform .7s cubic-bezier(.6,-.2,.3,1.4)'; cst.style.transform='scale(3)'; cst.style.opacity='0'; setTimeout(function(){ location.href=cta.getAttribute('href'); },650); });
/* keep the crest lit up when a child scrolls down to it */
var castleBm=D.querySelector('.bookmarks'); if(castleBm&&!castleBm.querySelector('[href="#castleGate"]')){ var bm=H('a',{'class':'bm b1',href:'#castleGate'},castleBm); bm.innerHTML='<i>🏰</i>Castle'; bm.style.background='#ffd6f2'; }
var gardenBm=D.querySelector('.bookmarks'); if(gardenBm&&$('garden')&&!gardenBm.querySelector('[href="#garden"]')){ var gb=H('a',{'class':'bm b5',href:'#garden'},gardenBm); gb.innerHTML='<i>🌳</i>Garden'; gardenBm.insertBefore(gb,gardenBm.children[2]); }
}
})();
