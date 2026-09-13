/* ═══════════════════════════════════════════════════════════════════
   PHOENIX'S WORLD — playroom.js  (Drop 2a)

   The Playroom band. Every game from the original site, rebuilt in the
   toy look and upgraded. Nothing removed. Plus the new SPLAT ENGINE:
   blobs of every size, drips, swirls, rainbow arcs, starbursts and
   glitter that twinkles — shared by the Splat Wall, the drawing pad,
   and the "Paint Splash the whole page" button on the Control Panel.

   Loads after index.html; needs window.PW. Mounts itself above #shelf.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var P=window.PW; if(!P) return;
var E=P.E,H=P.H,$=P.$,rnd=P.rnd,ri=P.ri,pick=P.pick,clear=P.clear,SND=P.SND,say=P.say;
var D=document, NS='http://www.w3.org/2000/svg';
function tip(id,t){ var e=$(id); if(e) e.textContent=t; }
function pt(svg,e,vw,vh){ var r=svg.getBoundingClientRect(); return {x:(e.clientX-r.left)*vw/r.width,y:(e.clientY-r.top)*vh/r.height}; }

/* ─────────────── STYLES ─────────────── */
H('style',{html:
'.play-wrap{background:linear-gradient(180deg,#fff7fd,#eee4ff)}'+
'.play-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:18px;max-width:1140px;margin:26px auto 0}'+
'.toybox{border:6px solid var(--ink);border-radius:var(--r-slab);background:#fff;padding:14px;box-shadow:0 12px 0 rgb(var(--ink-rgb)/.22);color:var(--ink)}'+
'.toybox.wide{grid-column:1/-1}'+
'.toybox h3{font-size:22px;text-align:center;margin:2px 0 10px}'+
'.toybox svg{width:100%;height:auto;display:block;border-radius:18px;touch-action:none}'+
'.toybox canvas{width:100%;height:auto;aspect-ratio:8/5;display:block;border:5px solid var(--ink);border-radius:18px;background:#fff;touch-action:none;cursor:crosshair}'+
'.tools{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:10px}'+
'.sw{width:44px;height:44px;border-radius:50%;border:4px solid var(--ink);cursor:pointer;padding:0;box-shadow:0 4px 0 rgb(var(--ink-rgb)/.25)}'+
'.sw[aria-pressed="true"]{transform:scale(1.16);box-shadow:0 0 0 4px var(--sherbet),0 4px 0 rgb(var(--ink-rgb)/.25)}'+
'.sw.rain{background:conic-gradient(#ff4d9d,#ff8a3d,#ffc53d,#3fe0a4,#17c7e8,#8b3dff,#ff4d9d)}'+
'.sw.glit{background:radial-gradient(circle,#fff 0 30%,#ffd84d 32% 60%,#ff4d9d 62%)}'+
'.pill{min-height:46px;padding:10px 16px;cursor:pointer;border:4px solid var(--ink);border-radius:999px;background:#fff;font:700 14px/1 "Fredoka",sans-serif;color:var(--ink);box-shadow:0 4px 0 rgb(var(--ink-rgb)/.22)}'+
'.pill:active{transform:translateY(4px);box-shadow:none}'+
'.pill[aria-pressed="true"]{background:var(--sherbet)}'+
'.stamp{font-size:25px;line-height:1;min-height:46px;padding:6px 10px;cursor:pointer;background:#fff;border:4px solid var(--ink);border-radius:14px;box-shadow:0 4px 0 rgb(var(--ink-rgb)/.22)}'+
'.stamp[aria-pressed="true"]{background:var(--sherbet);transform:scale(1.09)}'+
'.tip{text-align:center;font-weight:800;color:#5a4a86;margin:10px 0 0;font-size:15px;min-height:22px}'+
'.pgb{min-height:52px;padding:13px 18px;cursor:pointer;border:5px solid var(--ink);border-radius:18px;background:var(--sherbet);font:700 16px/1 "Fredoka",sans-serif;color:var(--ink);box-shadow:0 5px 0 var(--sherbet-deep)}'+
'.pgb:active{transform:translateY(4px);box-shadow:0 1px 0 var(--sherbet-deep)}'+
'.pgb.pink{background:var(--bubblegum);color:#fff;box-shadow:0 5px 0 var(--bubblegum-deep)}'+
'.pgb.cy{background:var(--lagoon);box-shadow:0 5px 0 var(--lagoon-deep)}'+
'.pgb.gr{background:var(--mint);box-shadow:0 5px 0 var(--mint-deep)}'+
'.pgb.wh{background:#fff;box-shadow:0 5px 0 rgb(var(--ink-rgb)/.28)}'+
'#pageSplat{position:fixed;inset:0;z-index:1950;pointer-events:none;overflow:hidden}'+
'.glit{animation:glit 1.6s ease-in-out infinite}@keyframes glit{0%,100%{opacity:.35;transform:scale(.7)}50%{opacity:1;transform:scale(1.2)}}'+
'@keyframes popin{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}.popin{animation:popin .36s cubic-bezier(.3,1.65,.5,1)}'+
'@keyframes wig{0%,100%{transform:rotate(0)}25%{transform:rotate(6deg)}75%{transform:rotate(-6deg)}}.wig{animation:wig .5s ease-in-out 2;transform-box:fill-box;transform-origin:center}'+
'@keyframes bobby{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}'
},D.head);

/* ═══════════════ THE SPLAT ENGINE ═══════════════
   splatAt(group, x, y, opts) — draws ONE splat into an SVG group.
   Randomly picks a shape: blob, big blob, drips, swirl, rainbow arc,
   starburst, glitter puff. Colour 'rainbow' rotates hue. 'glitter' is
   twinkling metallic dots. Sizes range wildly on purpose. */
var BOW=['#ff4d9d','#ff8a3d','#ffc53d','#3fe0a4','#17c7e8','#8b3dff'];
var hue=0;
function splatAt(g,x,y,opts){
  opts=opts||{}; var col=opts.color||'#ff4d9d', scale=opts.scale||1;
  if(col==='rainbow'){ hue=(hue+23)%360; col='hsl('+hue+' 92% 58%)'; }
  var kind = opts.kind || pick(['blob','blob','blob','big','drip','swirl','bow','burst','glitter','blob']);
  var s=E('g',{transform:'translate('+x.toFixed(1)+','+y.toFixed(1)+')',style:'transform-box:fill-box;transform-origin:center'},g);
  if(col==='glitter') kind='glitter';
  if(kind==='blob'||kind==='big'){
    var r=(kind==='big'?rnd(34,64):rnd(8,28))*scale, d='', n=ri(9,14), i, a, rr;
    for(i=0;i<n;i++){ a=i*6.283/n; rr=r*rnd(0.55,1.45); d+=(i?'L':'M')+(Math.cos(a)*rr).toFixed(1)+' '+(Math.sin(a)*rr).toFixed(1)+' '; }
    E('path',{d:d+'Z',fill:col,opacity:.92},s);
    for(i=0;i<ri(2,6);i++) E('circle',{cx:rnd(-r*2.2,r*2.2),cy:rnd(-r*2.2,r*2.2),r:rnd(1.5,r*0.3),fill:col,opacity:.85},s);
    if(Math.random()<.5) E('path',{d:'M0 '+r+' q5 '+rnd(16,50)+' 0 '+rnd(24,70)+' q-5 -14 0 -'+rnd(24,70),fill:col,opacity:.85},s);
    E('ellipse',{cx:-r*.3,cy:-r*.3,rx:r*.28,ry:r*.16,fill:'#fff',opacity:.35},s);
  } else if(kind==='drip'){
    var w=rnd(10,26)*scale;
    E('ellipse',{rx:w,ry:w*.6,fill:col,opacity:.92},s);
    for(i=0;i<ri(2,4);i++){ var dx=rnd(-w,w), len=rnd(30,110);
      E('path',{d:'M'+dx+' 0 q'+rnd(-4,4)+' '+(len*.6)+' 0 '+len,stroke:col,'stroke-width':rnd(4,9),'stroke-linecap':'round',fill:'none',opacity:.9},s);
      E('circle',{cx:dx,cy:len,r:rnd(4,8),fill:col,opacity:.9},s); }
  } else if(kind==='swirl'){
    var pts='M0 0', R=rnd(18,46)*scale, t;
    for(t=0;t<=6.283*2.2;t+=0.25){ var rad=R*t/(6.283*2.2); pts+=' L'+(Math.cos(t)*rad).toFixed(1)+' '+(Math.sin(t)*rad).toFixed(1); }
    E('path',{d:pts,stroke:col,'stroke-width':rnd(6,12),'stroke-linecap':'round',fill:'none',opacity:.92},s);
  } else if(kind==='bow'){
    var R2=rnd(30,70)*scale;
    BOW.forEach(function(c,i){ E('path',{d:'M'+(-R2+i*7)+' 0 A'+(R2-i*7)+' '+(R2-i*7)+' 0 0 1 '+(R2-i*7)+' 0',stroke:c,'stroke-width':7,fill:'none','stroke-linecap':'round',opacity:.95},s); });
    s.setAttribute('transform',s.getAttribute('transform')+' rotate('+ri(-40,40)+')');
  } else if(kind==='burst'){
    var R3=rnd(22,60)*scale;
    for(i=0;i<ri(6,10);i++){ a=i*6.283/8+rnd(-.3,.3); E('path',{d:'M0 0 L'+(Math.cos(a)*R3).toFixed(1)+' '+(Math.sin(a)*R3).toFixed(1),stroke:col,'stroke-width':rnd(5,11),'stroke-linecap':'round'},s);
      E('circle',{cx:Math.cos(a)*R3,cy:Math.sin(a)*R3,r:rnd(4,9),fill:col},s); }
    E('circle',{r:R3*.3,fill:col},s);
  } else { /* glitter */
    var gc=col==='glitter'?null:col;
    for(i=0;i<ri(14,26);i++){ var gx=rnd(-40,40)*scale, gy=rnd(-40,40)*scale, gr=rnd(1.5,5);
      var c=gc||pick(['#fff','#ffd84d','#ffe9a8','#ff9ec2','#a3ecfa','#fff']);
      var star=E('path',{'class':'glit',d:'M0 '+(-gr*2)+' L'+(gr*.5)+' '+(-gr*.5)+' L'+(gr*2)+' 0 L'+(gr*.5)+' '+(gr*.5)+' L0 '+(gr*2)+' L'+(-gr*.5)+' '+(gr*.5)+' L'+(-gr*2)+' 0 L'+(-gr*.5)+' '+(-gr*.5)+' Z',
        fill:c,transform:'translate('+gx+','+gy+')',style:'transform-box:fill-box;transform-origin:center;animation-delay:-'+rnd(0,1.6)+'s'},s); }
  }
  s.classList.add('popin');
  return s;
}
window.PWsplat=splatAt;

/* Full-page paint splash from the Control Panel */
(function(){
  var layer=H('div',{id:'pageSplat'},D.body);
  var svg=E('svg',{viewBox:'0 0 1000 1000',preserveAspectRatio:'none',style:'width:100%;height:100%;display:block'},layer);
  var bay=D.querySelector('#bigRed')&&D.querySelector('#bigRed').parentNode;
  if(!bay) return;
  var b=H('button',{type:'button','class':'toy btn t-grape gloss',text:'🎨 Paint splash the whole page'},bay);
  b.addEventListener('click',function(){ SND.pop(); P.screenSay('SPLAT! Paint everywhere and not one bit of trouble. 🎨');
    for(var i=0;i<28;i++)(function(i){ setTimeout(function(){ SND.tone(rnd(300,900),0.06,'triangle',0.04);
      splatAt(svg,rnd(40,960),rnd(40,960),{color:pick([pick(BOW),'rainbow','glitter']),scale:rnd(1,2.6)}); },i*55); })(i);
    setTimeout(function(){ layer.style.transition='opacity 1.2s'; layer.style.opacity='0'; setTimeout(function(){ clear(svg); layer.style.opacity='1'; layer.style.transition=''; },1300); },7000);
  });
  var w=H('button',{type:'button','class':'toy btn t-white',text:'🧽 Wash the page'},bay);
  w.addEventListener('click',function(){ clear(svg); SND.whoosh(); });
})();

/* ═══════════════ THE PLAYROOM BAND ═══════════════ */
var band=H('section',{'class':'band play-wrap',id:'playroom'});
band.innerHTML='<h2 class="outlined">The Playroom</h2><p class="panel-lead">Fourteen things to play with. Nothing in here can go wrong.</p><div class="play-grid" id="playGrid"></div>';
var shelf=$('shelf'); shelf.parentNode.insertBefore(band,shelf);
var bmk=D.querySelector('.bookmarks'); if(bmk){ var a=H('a',{'class':'bm b6',href:'#playroom',html:'<i>🎨</i>Playroom'}); bmk.insertBefore(a,bmk.children[4]); }
var grid=$('playGrid');
function toy(title,inner,wide){ var b=H('div',{'class':'toybox'+(wide?' wide':'')},grid); b.innerHTML='<h3>'+title+'</h3>'+inner; return b; }

/* ── 1. DRAW ANYTHING — now with glitter brush, rainbow brush, letter stamps ── */
(function(){
  toy('✏️ Draw &amp; write anything',
    '<canvas id="pad" aria-label="Drawing pad"></canvas><div class="tools" id="padCols"></div><div class="tools" id="padStamps"></div>'+
    '<div class="tools" id="padLetters"></div><div class="tools"><button class="pill" id="padThin" type="button" aria-pressed="false">Thin</button>'+
    '<button class="pill" id="padThick" type="button" aria-pressed="true">Thick</button><button class="pill" id="padSplatMode" type="button" aria-pressed="false">💥 Splat brush</button></div>'+
    '<div class="tools"><button class="pgb" id="padClear" type="button">🧽 Clear</button><button class="pgb gr" id="padSave" type="button">💾 Save my picture</button></div>'+
    '<p class="tip" id="padTip">Pick a color, then draw. Stickers and letters go on with one tap.</p>',true);
  var cv=$('pad'),g=cv.getContext('2d'),drawing=false,col='#ff4d9d',w=14,mode='pen',stamp=null,last=null;
  var COLS=['#ff4d9d','#ff8a3d','#ffc53d','#3fe0a4','#17c7e8','#8b3dff','#8a5a33','#201540','#ffffff'];
  function size(){ var r=cv.getBoundingClientRect(),d=window.devicePixelRatio||1,img=null; try{img=cv.width?g.getImageData(0,0,cv.width,cv.height):null;}catch(e){}
    cv.width=Math.max(320,Math.round(r.width*d)); cv.height=Math.round(cv.width*5/8); g.fillStyle='#fff'; g.fillRect(0,0,cv.width,cv.height);
    if(img) try{g.putImageData(img,0,0);}catch(e){} g.lineCap='round'; g.lineJoin='round'; }
  size(); var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(size,220); });
  function pos(e){ var r=cv.getBoundingClientRect(); return {x:(e.clientX-r.left)*cv.width/r.width,y:(e.clientY-r.top)*cv.height/r.height}; }
  var sw=$('padCols');
  function selectCol(b){ sw.querySelectorAll('.sw').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); b.setAttribute('aria-pressed','true'); stamp=null;
    D.querySelectorAll('#padStamps .stamp,#padLetters .stamp').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); SND.tap(); }
  COLS.forEach(function(c,i){ var b=H('button',{type:'button','class':'sw','aria-label':'Color '+(i+1),'aria-pressed':i===0?'true':'false'},sw); b.style.background=c;
    b.addEventListener('click',function(){ col=c; if(mode!=='splat') mode='pen'; selectCol(b); }); });
  var rb=H('button',{type:'button','class':'sw rain','aria-label':'Rainbow brush','aria-pressed':'false'},sw);
  rb.addEventListener('click',function(){ mode='rainbow'; selectCol(rb); SND.sparkle(); tip('padTip','Rainbow brush! Every line changes color.'); });
  var gb=H('button',{type:'button','class':'sw glit','aria-label':'Glitter brush','aria-pressed':'false'},sw);
  gb.addEventListener('click',function(){ mode='glitter'; selectCol(gb); SND.sparkle(); tip('padTip','Glitter brush! Sparkles everywhere you go. ✨'); });
  var st=$('padStamps');
  ['⭐','💖','🌈','🐱','🦄','🌸','🚀','😊','🍦','👑','🦋','🐶'].forEach(function(s){ var b=H('button',{type:'button','class':'stamp','aria-pressed':'false',text:s},st);
    b.addEventListener('click',function(){ stamp=(stamp===s)?null:s; D.querySelectorAll('#padStamps .stamp,#padLetters .stamp').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
      if(stamp) b.setAttribute('aria-pressed','true'); SND.tap(); tip('padTip',stamp?'Now tap the paper to place '+stamp:'Back to drawing.'); }); });
  var lt=$('padLetters');
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(L){ var b=H('button',{type:'button','class':'stamp','aria-pressed':'false',text:L,style:'font-family:Fredoka,sans-serif;font-weight:700;font-size:20px;min-width:40px;padding:6px'},lt);
    b.addEventListener('click',function(){ stamp=(stamp===L)?null:L; D.querySelectorAll('#padStamps .stamp,#padLetters .stamp').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
      if(stamp) b.setAttribute('aria-pressed','true'); SND.tap(); tip('padTip',stamp?'Tap the paper to write a '+L+'. Spell your name!':'Back to drawing.'); }); });
  $('padThin').addEventListener('click',function(){ w=6; $('padThin').setAttribute('aria-pressed','true'); $('padThick').setAttribute('aria-pressed','false'); SND.tap(); });
  $('padThick').addEventListener('click',function(){ w=16; $('padThin').setAttribute('aria-pressed','false'); $('padThick').setAttribute('aria-pressed','true'); SND.tap(); });
  $('padSplatMode').addEventListener('click',function(){ var on=mode!=='splat'; mode=on?'splat':'pen'; this.setAttribute('aria-pressed',on?'true':'false'); SND.pop(); tip('padTip',on?'Splat brush! Every tap is a paint splat.':'Pen brush.'); });
  var hue2=0;
  function dot(p){ if(mode==='rainbow'){ hue2=(hue2+9)%360; g.strokeStyle='hsl('+hue2+' 92% 58%)'; } else g.strokeStyle=col;
    g.lineWidth=w*(cv.width/640); g.beginPath(); if(last){ g.moveTo(last.x,last.y); g.lineTo(p.x,p.y); } else { g.moveTo(p.x,p.y); g.lineTo(p.x+.1,p.y); } g.stroke();
    if(mode==='glitter'){ for(var i=0;i<4;i++){ g.fillStyle=pick(['#fff','#ffd84d','#ff9ec2','#a3ecfa',col]); g.beginPath(); var gx=p.x+rnd(-18,18)*(cv.width/640),gy=p.y+rnd(-18,18)*(cv.width/640),gr=rnd(2,5)*(cv.width/640);
      g.moveTo(gx,gy-gr*2); g.lineTo(gx+gr*.5,gy-gr*.5); g.lineTo(gx+gr*2,gy); g.lineTo(gx+gr*.5,gy+gr*.5); g.lineTo(gx,gy+gr*2); g.lineTo(gx-gr*.5,gy+gr*.5); g.lineTo(gx-gr*2,gy); g.lineTo(gx-gr*.5,gy-gr*.5); g.fill(); } }
    last=p; }
  function canvasSplat(p){ var sc=cv.width/640, kind=pick(['blob','big','drip','burst','swirl']), c=col, i,a,r;
    g.fillStyle=c; g.strokeStyle=c; g.lineCap='round';
    if(kind==='swirl'){ g.lineWidth=8*sc; g.beginPath(); var R=rnd(18,46)*sc; for(var t=0;t<=13.8;t+=.25){ var rad=R*t/13.8; var x=p.x+Math.cos(t)*rad,y=p.y+Math.sin(t)*rad; t?g.lineTo(x,y):g.moveTo(x,y);} g.stroke(); }
    else if(kind==='burst'){ r=rnd(22,60)*sc; g.lineWidth=7*sc; for(i=0;i<8;i++){ a=i*.785+rnd(-.3,.3); g.beginPath(); g.moveTo(p.x,p.y); g.lineTo(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r); g.stroke(); g.beginPath(); g.arc(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,rnd(4,9)*sc,0,6.283); g.fill(); } }
    else { r=(kind==='big'?rnd(34,64):rnd(8,28))*sc; g.beginPath(); for(i=0;i<12;i++){ a=i*.523; var rr=r*rnd(.55,1.45); var x2=p.x+Math.cos(a)*rr,y2=p.y+Math.sin(a)*rr; i?g.lineTo(x2,y2):g.moveTo(x2,y2);} g.closePath(); g.fill();
      for(i=0;i<5;i++){ g.beginPath(); g.arc(p.x+rnd(-r*2,r*2),p.y+rnd(-r*2,r*2),rnd(2,r*.3),0,6.283); g.fill(); }
      if(kind==='drip'||Math.random()<.5){ g.lineWidth=rnd(4,9)*sc; g.beginPath(); g.moveTo(p.x,p.y+r*.5); g.lineTo(p.x+rnd(-4,4),p.y+r+rnd(30,90)*sc); g.stroke(); } }
    SND.pop(); }
  cv.addEventListener('pointerdown',function(e){ var p=pos(e);
    if(stamp){ g.font='700 '+Math.round(cv.width/10)+'px Fredoka,serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillStyle=col; g.fillText(stamp,p.x,p.y); SND.ding(); return; }
    if(mode==='splat'){ canvasSplat(p); return; }
    drawing=true; last=null; dot(p); try{cv.setPointerCapture(e.pointerId);}catch(x){} SND.tone(rnd(500,900),0.07,'sine',0.03); e.preventDefault(); });
  cv.addEventListener('pointermove',function(e){ if(drawing){ dot(pos(e)); e.preventDefault(); } });
  function stop(){ drawing=false; last=null; } cv.addEventListener('pointerup',stop); cv.addEventListener('pointercancel',stop); cv.addEventListener('pointerleave',stop);
  $('padClear').addEventListener('click',function(){ g.fillStyle='#fff'; g.fillRect(0,0,cv.width,cv.height); SND.whoosh(); tip('padTip','Clean paper. Draw something new!'); });
  $('padSave').addEventListener('click',function(){ try{ var a=D.createElement('a'); a.download='my-picture.png'; a.href=cv.toDataURL('image/png'); a.click(); SND.win(); tip('padTip','Saved! Check your downloads. 💾'); }catch(e){ tip('padTip','Take a screenshot to keep this one!'); } });
})();

/* ── 2. SPLAT WALL — the new engine ── */
(function(){
  toy('🎨 Splat wall','<svg id="wall" viewBox="0 0 760 300" role="img" aria-label="A wall you can splash paint on"></svg><div class="tools" id="wallCols"></div>'+
    '<div class="tools"><button class="pgb" id="wallClear" type="button">🧽 Clean it off</button><button class="pgb pink" id="wallParty" type="button">🎉 Splat party</button></div>'+
    '<p class="tip">Drag to splash. Big ones, small ones, swirls, rainbows and glitter. You are allowed to paint everywhere here.</p>',true);
  var svg=$('wall'), COLS=BOW.concat(['#fff','#201540','rainbow','glitter']), col=COLS[0], paintG, on=false;
  function reset(){ clear(svg); E('rect',{width:760,height:300,fill:'#f2ece4',rx:18},svg); for(var i=0;i<10;i++) E('line',{x1:0,y1:i*30+14,x2:760,y2:i*30+14,stroke:'#e3dbd0','stroke-width':2},svg); paintG=E('g',null,svg); }
  reset();
  var sw=$('wallCols');
  COLS.forEach(function(c,i){ var b=H('button',{type:'button','class':'sw'+(c==='rainbow'?' rain':c==='glitter'?' glit':''),'aria-label':'Paint '+c,'aria-pressed':i===0?'true':'false'},sw);
    if(c!=='rainbow'&&c!=='glitter') b.style.background=c;
    b.addEventListener('click',function(){ col=c; sw.querySelectorAll('.sw').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); b.setAttribute('aria-pressed','true'); SND.tap(); }); });
  svg.addEventListener('pointerdown',function(e){ on=true; var p=pt(svg,e,760,300); splatAt(paintG,p.x,p.y,{color:col,scale:rnd(.8,1.6)}); SND.pop(); try{svg.setPointerCapture(e.pointerId);}catch(x){} e.preventDefault(); });
  svg.addEventListener('pointermove',function(e){ if(!on) return; var p=pt(svg,e,760,300); if(Math.random()<.4) splatAt(paintG,p.x,p.y,{color:col,scale:rnd(.5,1.3)}); e.preventDefault(); });
  svg.addEventListener('pointerup',function(){ on=false; }); svg.addEventListener('pointercancel',function(){ on=false; });
  $('wallClear').addEventListener('click',function(){ reset(); SND.whoosh(); });
  $('wallParty').addEventListener('click',function(){ SND.tada(); for(var i=0;i<30;i++)(function(i){ setTimeout(function(){ splatAt(paintG,rnd(30,730),rnd(30,270),{color:pick(COLS),scale:rnd(.6,2)}); SND.tone(rnd(300,900),0.05,'triangle',0.03); },i*60); })(i); });
})();

/* ── 3. CHOCOLATE MILK ── */
(function(){
  toy('🥛 Chocolate milk','<svg id="milk" viewBox="0 0 300 300" role="img" aria-label="A glass of chocolate milk. Tap to sip."></svg><div class="tools"><button class="pgb" id="milkFill" type="button">🍫 Fill it back up</button></div><p class="tip" id="milkTip">Tap the glass to take a sip through the straw.</p>');
  var svg=$('milk'),FULL=96,EMPTY=248,level=FULL;
  var defs=E('defs',null,svg),cp=E('clipPath',{id:'mkClip'},defs); E('path',{d:'M101 78 L199 78 L187 250 L113 250 Z'},cp);
  var lg=E('linearGradient',{id:'mkG',x1:0,y1:0,x2:1,y2:0},defs); E('stop',{offset:0,'stop-color':'#7a4a2a'},lg); E('stop',{offset:.45,'stop-color':'#a9714a'},lg); E('stop',{offset:1,'stop-color':'#6e3f22'},lg);
  E('rect',{width:300,height:300,fill:'#fff6ea',rx:18},svg);
  E('path',{d:'M95 70 L205 70 L192 258 L108 258 Z',fill:'#eaf4fb',stroke:'#b8cfdd','stroke-width':3},svg);
  var milkG=E('g',{'clip-path':'url(#mkClip)'},svg), milk=E('rect',{x:100,y:level,width:100,height:260,fill:'url(#mkG)'},milkG), surf=E('ellipse',{cx:150,cy:level,rx:48,ry:7,fill:'#c08a5e'},milkG);
  var bubG=E('g',{'clip-path':'url(#mkClip)'},svg);
  E('path',{d:'M186 34 q-14 2 -16 14 l-14 190',stroke:'#ff4d9d','stroke-width':13,fill:'none','stroke-linecap':'round'},svg);
  E('path',{d:'M186 34 q-14 2 -16 14 l-14 190',stroke:'#ffd0e8','stroke-width':5,fill:'none','stroke-linecap':'round',opacity:.75,'stroke-dasharray':'9 11'},svg);
  E('path',{d:'M95 70 L205 70 L192 258 L108 258 Z',fill:'#fff',opacity:.18},svg);
  E('path',{d:'M95 70 L205 70 L192 258 L108 258 Z',fill:'none',stroke:'#201540','stroke-width':5,'stroke-linejoin':'round'},svg);
  E('ellipse',{cx:150,cy:70,rx:55,ry:10,fill:'none',stroke:'#201540','stroke-width':5},svg);
  E('path',{d:'M116 88 L110 240',stroke:'#fff','stroke-width':7,opacity:.5,'stroke-linecap':'round'},svg);
  var eyeL=E('circle',{cx:132,cy:170,r:7,fill:'#201540'},svg),eyeR=E('circle',{cx:168,cy:170,r:7,fill:'#201540'},svg);
  E('circle',{cx:130,cy:168,r:2.4,fill:'#fff'},svg); E('circle',{cx:166,cy:168,r:2.4,fill:'#fff'},svg);
  var mouth=E('path',{d:'M134 192 q16 14 32 0',stroke:'#201540','stroke-width':5,fill:'none','stroke-linecap':'round'},svg);
  E('circle',{cx:118,cy:186,r:8,fill:'#ff9ec2',opacity:.55},svg); E('circle',{cx:182,cy:186,r:8,fill:'#ff9ec2',opacity:.55},svg);
  E('path',{d:'M118 276 q32 -12 64 0',stroke:'#201540','stroke-width':5,fill:'none','stroke-linecap':'round'},svg);
  function setLevel(v){ level=v; milk.setAttribute('y',v); surf.setAttribute('cy',v); var gone=v>=EMPTY-2; surf.style.opacity=gone?0:1; mouth.setAttribute('d',gone?'M134 196 q16 -14 32 0':'M134 192 q16 14 32 0'); }
  function bubbles(){ for(var i=0;i<5;i++)(function(i){ setTimeout(function(){ var b=E('circle',{cx:158-rnd(0,6),cy:level+rnd(6,30),r:rnd(2.5,5),fill:'#fff',opacity:.75},bubG);
    b.style.transition='transform .8s ease-out,opacity .8s'; requestAnimationFrame(function(){ b.style.transform='translate(4px,-'+rnd(24,48)+'px)'; b.style.opacity=0; }); setTimeout(function(){ b.remove(); },900); },i*90); })(i); }
  svg.addEventListener('pointerdown',function(){ if(level>=EMPTY-2){ SND.oops(); tip('milkTip','All gone! Tap "Fill it back up". 🍫'); say('All gone!'); return; }
    setLevel(Math.min(EMPTY,level+19)); SND.slurp&&SND.slurp(); SND.slide(210,420,0.3,'sawtooth',0.05); bubbles();
    eyeL.setAttribute('r',4); eyeR.setAttribute('r',4); setTimeout(function(){ eyeL.setAttribute('r',7); eyeR.setAttribute('r',7); },200);
    var y=pick(['Mmmm!','Yummy!','So good!','Chocolatey!','Slurp!']); tip('milkTip',y); if(Math.random()<.5) say(y); });
  milk.style.transition='y .35s ease-out'; surf.style.transition='cy .35s ease-out'; setLevel(FULL);
  $('milkFill').addEventListener('click',function(){ setLevel(FULL); SND.win(); P.sparkleAt(svg.getBoundingClientRect().left+150,svg.getBoundingClientRect().top+150,16); tip('milkTip','Filled to the top! Tap to sip. 🥛'); });
})();

/* ── 4. SPARKLE CATCH — with speed picker ── */
(function(){
  toy('✨ Sparkle catch','<svg id="catch" viewBox="0 0 400 300" role="img" aria-label="Catch the falling sparkles"></svg><div class="tools" id="catchLv"></div>'+
    '<div class="tools"><button class="pgb gr" id="catchStart" type="button">▶ Start</button><button class="pgb" id="catchLeft" type="button" aria-label="Move left">◀</button><button class="pgb" id="catchRight" type="button" aria-label="Move right">▶</button></div><p class="tip" id="catchTip">Slide the basket and catch the color it asks for.</p>');
  var svg=$('catch'),CC=[{n:'pink',c:'#ff4d9d'},{n:'yellow',c:'#ffc53d'},{n:'green',c:'#3fe0a4'},{n:'blue',c:'#17c7e8'},{n:'purple',c:'#8b3dff'}],speed=1;
  E('rect',{width:400,height:300,fill:'#1a0f33',rx:18},svg); for(var s=0;s<30;s++) E('circle',{cx:rnd(6,394),cy:rnd(6,250),r:rnd(.7,1.9),fill:'#fff',opacity:rnd(.2,.7)},svg);
  var label=E('text',{x:200,y:30,'text-anchor':'middle','font-family':'Fredoka,sans-serif','font-size':22,'font-weight':700,fill:'#fff'},svg),
      scoreT=E('text',{x:200,y:54,'text-anchor':'middle','font-family':'Nunito,sans-serif','font-size':17,'font-weight':800,fill:'#ffc53d'},svg),
      fallG=E('g',null,svg), basket=E('g',null,svg);
  E('path',{d:'M-34 -16 L34 -16 L26 20 L-26 20 Z',fill:'#c98a4a',stroke:'#201540','stroke-width':4,'stroke-linejoin':'round'},basket);
  E('path',{d:'M-34 -8 L34 -8 M-30 4 L30 4',stroke:'#8a5a2b','stroke-width':3},basket); E('path',{d:'M-30 -16 q30 -26 60 0',stroke:'#c98a4a','stroke-width':5,fill:'none'},basket);
  var bx=200,target=pick(CC),score=0,items=[],running=false,raf=null,spawnT=null;
  function paint(){ basket.setAttribute('transform','translate('+bx+',262)'); } paint();
  function setTarget(){ target=pick(CC); label.textContent='Catch the '+target.n+' sparkles!'; label.setAttribute('fill',target.c); }
  function upd(){ scoreT.textContent='⭐ '+score; } setTarget(); upd();
  function spawn(){ var c=pick(CC),x=rnd(28,372),g=E('g',null,fallG); E('circle',{r:11,fill:c.c,stroke:'#fff','stroke-width':2},g);
    E('path',{d:'M0 -18 L4 -5 L18 0 L4 5 L0 18 L-4 5 L-18 0 L-4 -5 Z',fill:c.c,opacity:.85},g); items.push({x:x,y:70,vy:rnd(1.2,2.4)*speed,c:c,el:g}); }
  function step(){ if(!running) return; for(var i=items.length-1;i>=0;i--){ var o=items[i]; o.y+=o.vy; o.el.setAttribute('transform','translate('+o.x.toFixed(1)+','+o.y.toFixed(1)+') rotate('+(o.y*2).toFixed(0)+')');
    if(o.y>244&&o.y<280&&Math.abs(o.x-bx)<40){ if(o.c.n===target.n){ score++; SND.ding(); if(score%5===0){ setTarget(); say('Now catch the '+target.n+' ones'); } } else { SND.oops(); } upd(); o.el.remove(); items.splice(i,1); continue; }
    if(o.y>310){ o.el.remove(); items.splice(i,1); } } raf=requestAnimationFrame(step); }
  function start(){ if(running) return; running=true; spawnT=setInterval(spawn,720/speed); raf=requestAnimationFrame(step); $('catchStart').textContent='⏸ Pause'; tip('catchTip','Slide the basket left and right!'); }
  function pause(){ running=false; clearInterval(spawnT); cancelAnimationFrame(raf); $('catchStart').textContent='▶ Start'; }
  [['Slow',.7],['Normal',1],['Fast',1.6],['Zoom!',2.4]].forEach(function(l,i){ var b=H('button',{type:'button','class':'pill','aria-pressed':i===1?'true':'false',text:l[0]},$('catchLv'));
    b.addEventListener('click',function(){ speed=l[1]; $('catchLv').querySelectorAll('.pill').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); b.setAttribute('aria-pressed','true'); if(running){ pause(); start(); } SND.tap(); }); });
  $('catchStart').addEventListener('click',function(){ running?pause():start(); });
  $('catchLeft').addEventListener('click',function(){ bx=Math.max(40,bx-36); paint(); SND.tap(); }); $('catchRight').addEventListener('click',function(){ bx=Math.min(360,bx+36); paint(); SND.tap(); });
  var drag=false; svg.addEventListener('pointerdown',function(e){ drag=true; var p=pt(svg,e,400,300); bx=Math.max(40,Math.min(360,p.x)); paint(); if(!running) start(); e.preventDefault(); });
  svg.addEventListener('pointermove',function(e){ if(!drag) return; var p=pt(svg,e,400,300); bx=Math.max(40,Math.min(360,p.x)); paint(); e.preventDefault(); });
  svg.addEventListener('pointerup',function(){ drag=false; }); svg.addEventListener('pointercancel',function(){ drag=false; });
  D.addEventListener('visibilitychange',function(){ if(D.hidden&&running) pause(); });
})();

/* ── 5. MEMORY MATCH — with level picker ── */
(function(){
  toy('🧠 Memory match','<svg id="memory" viewBox="0 0 400 300" role="img" aria-label="Flip cards to find matching pairs"></svg><div class="tools" id="memLv"></div><div class="tools"><button class="pgb pink" id="memNew" type="button">🔁 Shuffle again</button></div><p class="tip" id="memTip">Flip two cards. Find the pairs.</p>');
  var svg=$('memory'),FACES=['🐱','🦄','🌈','⭐','🍓','🚀','🐸','🌸','🦋','🍦','🐢','🎈'],pairs=6,cards=[],open=[],lock=false,found=0,flips=0;
  function deal(){ clear(svg); cards=[]; open=[]; found=0; lock=false; flips=0;
    E('rect',{width:400,height:300,fill:'#f4ecff',rx:18},svg);
    var cols=pairs<=4?4:pairs<=6?4:pairs<=8?4:6, rows=Math.ceil(pairs*2/cols), cw=(400-16)/cols-8, ch=(300-16)/rows-8;
    var set=FACES.slice().sort(function(){ return Math.random()-.5; }).slice(0,pairs), deck=set.concat(set).sort(function(){ return Math.random()-.5; });
    deck.forEach(function(face,i){ var cx=12+(i%cols)*(cw+8),cy=12+Math.floor(i/cols)*(ch+8);
      var g=E('g',{style:'cursor:pointer',role:'button',tabindex:0,'aria-label':'Card '+(i+1)},svg), back=E('g',null,g);
      E('rect',{x:cx,y:cy,width:cw,height:ch,rx:12,fill:'#8b3dff',stroke:'#201540','stroke-width':4},back);
      E('text',{x:cx+cw/2,y:cy+ch/2+ch*.15,'text-anchor':'middle','font-size':ch*.45},back).textContent='❓';
      var front=E('g',{opacity:0},g); E('rect',{x:cx,y:cy,width:cw,height:ch,rx:12,fill:'#fff',stroke:'#201540','stroke-width':4},front);
      E('text',{x:cx+cw/2,y:cy+ch/2+ch*.17,'text-anchor':'middle','font-size':ch*.5},front).textContent=face;
      var c={face:face,back:back,front:front,up:false,done:false,g:g}; cards.push(c);
      function flip(){ if(lock||c.up||c.done) return; c.up=true; back.style.opacity=0; front.style.opacity=1; g.classList.remove('popin'); void g.offsetWidth; g.classList.add('popin'); SND.tap(); open.push(c); flips++;
        if(open.length===2){ lock=true; setTimeout(function(){ if(open[0].face===open[1].face){ open.forEach(function(x){ x.done=true; x.front.style.opacity=.55; }); found++; SND.ding(); tip('memTip','Match! '+found+' of '+pairs+' found.');
          if(found===pairs){ SND.win(); P.confetti(70); say('You found them all in '+flips+' flips!'); tip('memTip','All '+pairs+' pairs in '+flips+' flips! 🎉'); } }
          else { open.forEach(function(x){ x.up=false; x.back.style.opacity=1; x.front.style.opacity=0; }); SND.oops(); tip('memTip','Not a pair. Try again!'); } open=[]; lock=false; },720); } }
      g.addEventListener('click',flip); g.addEventListener('keydown',function(e){ if(e.key===' '||e.key==='Enter'){ flip(); e.preventDefault(); } }); });
    tip('memTip','Find all '+pairs+' pairs.'); }
  [['Easy',4],['Medium',6],['Hard',8],['Expert',12]].forEach(function(l,i){ var b=H('button',{type:'button','class':'pill','aria-pressed':i===1?'true':'false',text:l[0]+' ('+l[1]+')'},$('memLv'));
    b.addEventListener('click',function(){ pairs=l[1]; $('memLv').querySelectorAll('.pill').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); b.setAttribute('aria-pressed','true'); deal(); SND.whoosh(); }); });
  $('memNew').addEventListener('click',function(){ deal(); SND.whoosh(); }); deal();
})();

/* ── 6. BALLOON POP COUNTING ── */
(function(){
  toy('🎈 Balloon pop counting','<svg id="balloon" viewBox="0 0 400 300" role="img" aria-label="Pop the balloons and count"></svg><div class="tools"><button class="pgb cy" id="balNew" type="button">🎈 More balloons</button></div><p class="tip" id="balTip">Pop them one at a time and count down with me.</p>');
  var svg=$('balloon'),BC=BOW,left=0,total=0,countT;
  function build(){ clear(svg); E('rect',{width:400,height:300,fill:'#e8f6ff',rx:18},svg); E('path',{d:'M0 248 q100 -18 200 0 t200 -6 V300 H0z',fill:'#b6e8c2'},svg);
    countT=E('text',{x:200,y:36,'text-anchor':'middle','font-family':'Fredoka,sans-serif','font-size':26,'font-weight':700,fill:'#201540'},svg);
    var bg=E('g',null,svg); total=left=ri(4,9);
    for(var i=0;i<total;i++)(function(i){ var x=40+i*(320/Math.max(1,total-1)),y=rnd(90,180),c=BC[i%BC.length];
      var g=E('g',{style:'cursor:pointer',role:'button',tabindex:0,'aria-label':'Balloon '+(i+1)},bg);
      E('path',{d:'M'+x+' '+(y+34)+' q10 22 -2 44',stroke:'#8a7fa6','stroke-width':2.5,fill:'none'},g);
      E('ellipse',{cx:x,cy:y,rx:26,ry:32,fill:c,stroke:'#201540','stroke-width':4},g); E('ellipse',{cx:x-9,cy:y-11,rx:7,ry:10,fill:'#fff',opacity:.55},g);
      E('path',{d:'M'+(x-6)+' '+(y+32)+' l6 8 6 -8 z',fill:c,stroke:'#201540','stroke-width':3,'stroke-linejoin':'round'},g);
      E('text',{x:x,y:y+9,'text-anchor':'middle','font-family':'Fredoka,sans-serif','font-size':24,'font-weight':700,fill:'#201540',opacity:.65},g).textContent=(i+1);
      g.style.animation='bobby '+(2.4+i*.25).toFixed(1)+'s ease-in-out infinite';
      function pop(){ if(g.dataset.gone) return; g.dataset.gone='1'; left--; countT.textContent='Balloons left: '+left; SND.pop(); var r=g.getBoundingClientRect(); P.sparkleAt(r.left+r.width/2,r.top+r.height/2,16,[c]);
        g.style.transition='transform .18s,opacity .18s'; g.style.transform='scale(1.5)'; g.style.opacity='0'; setTimeout(function(){ g.remove(); },200); say(left===0?'All popped!':String(left)+' left');
        if(left===0){ SND.win(); P.confetti(60); tip('balTip','You popped all '+total+'! Tap for more. 🎈'); } else tip('balTip',left+' balloon'+(left===1?'':'s')+' to go.'); }
      g.addEventListener('click',pop); g.addEventListener('keydown',function(e){ if(e.key===' '||e.key==='Enter'){ pop(); e.preventDefault(); } }); })(i);
    countT.textContent='Balloons left: '+left; tip('balTip','There are '+total+' balloons. Pop them and count down!'); }
  $('balNew').addEventListener('click',function(){ build(); SND.whoosh(); }); build();
})();

/* shared drag helper for the drag-and-drop toys */
function dragify(svg,vw,vh,node,set,onDrop,guard){ var on=false;
  node.addEventListener('pointerdown',function(e){ if(guard&&!guard()) return; on=true; if(node.parentNode) node.parentNode.appendChild(node); try{svg.setPointerCapture(e.pointerId);}catch(x){} SND.tap(); e.preventDefault(); });
  svg.addEventListener('pointermove',function(e){ if(!on) return; if(node.isConnected===false){ on=false; return; } var p=pt(svg,e,vw,vh); set(p.x,p.y); e.preventDefault(); });
  function up(){ if(!on) return; on=false; if(onDrop) onDrop(); } svg.addEventListener('pointerup',up); svg.addEventListener('pointercancel',up); }

/* ── 7. SHAPE SORTER ── */
(function(){
  toy('🔺 Shape sorter','<svg id="shapes" viewBox="0 0 400 300" role="img" aria-label="Drag each shape into its matching hole"></svg><div class="tools"><button class="pgb" id="shapeNew" type="button">🔁 Mix them up</button></div><p class="tip" id="shapeTip">Drag each shape to the hole that matches it.</p>');
  var svg=$('shapes'),TYPES=[{id:'circle',col:'#ff4d9d'},{id:'square',col:'#17c7e8'},{id:'triangle',col:'#3fe0a4'},{id:'star',col:'#ffc53d'},{id:'heart',col:'#8b3dff'}];
  function shape(g,t,s,fill,stroke){ var st=stroke||'#201540';
    if(t==='circle') E('circle',{r:s,fill:fill,stroke:st,'stroke-width':4},g);
    else if(t==='square') E('rect',{x:-s,y:-s,width:s*2,height:s*2,rx:6,fill:fill,stroke:st,'stroke-width':4},g);
    else if(t==='triangle') E('path',{d:'M0 '+(-s*1.1)+' L'+(s*1.05)+' '+(s*.8)+' L'+(-s*1.05)+' '+(s*.8)+' Z',fill:fill,stroke:st,'stroke-width':4,'stroke-linejoin':'round'},g);
    else if(t==='heart') E('path',{d:'M0 '+(s*.9)+' C'+(-s*1.3)+' 0 '+(-s*1.1)+' '+(-s)+' '+(-s*.45)+' '+(-s)+' C'+(-s*.15)+' '+(-s)+' 0 '+(-s*.7)+' 0 '+(-s*.5)+' C0 '+(-s*.7)+' '+(s*.15)+' '+(-s)+' '+(s*.45)+' '+(-s)+' C'+(s*1.1)+' '+(-s)+' '+(s*1.3)+' 0 0 '+(s*.9)+'Z',fill:fill,stroke:st,'stroke-width':4,'stroke-linejoin':'round'},g);
    else { var d='',i,a,rr; for(i=0;i<10;i++){ a=-Math.PI/2+i*Math.PI/5; rr=i%2?s*.46:s*1.12; d+=(i?'L':'M')+(Math.cos(a)*rr).toFixed(1)+' '+(Math.sin(a)*rr).toFixed(1)+' '; } E('path',{d:d+'Z',fill:fill,stroke:st,'stroke-width':4,'stroke-linejoin':'round'},g); } }
  function build(){ clear(svg); E('rect',{width:400,height:300,fill:'#fff6e8',rx:18},svg); E('rect',{x:16,y:30,width:368,height:106,rx:16,fill:'#e8c99a',stroke:'#b8935f','stroke-width':5},svg);
    E('text',{x:200,y:22,'text-anchor':'middle','font-family':'Fredoka,sans-serif','font-size':17,'font-weight':700,fill:'#8a6a3a'},svg).textContent='Drop each shape in its hole';
    var holes=[],slots=TYPES.slice().sort(function(){ return Math.random()-.5; });
    slots.forEach(function(t,i){ var hx=52+i*74,hy=83,g=E('g',{transform:'translate('+hx+','+hy+')',opacity:.55},svg); shape(g,t.id,24,'#7a5a33','#6a4a26'); holes.push({t:t.id,x:hx,y:hy,filled:false}); });
    var pool=TYPES.slice().sort(function(){ return Math.random()-.5; }),done=0;
    pool.forEach(function(t,i){ var hx=52+i*74,hy=232,g=E('g',{style:'cursor:grab',transform:'translate('+hx+','+hy+')'},svg); shape(g,t.id,23,t.col); var st={x:hx,y:hy,locked:false};
      dragify(svg,400,300,g,function(x,y){ st.x=x; st.y=y; g.setAttribute('transform','translate('+x.toFixed(1)+','+y.toFixed(1)+') scale(1.12)'); },function(){ var best=null,bd=1e9;
        holes.forEach(function(h){ var d=Math.hypot(st.x-h.x,st.y-h.y); if(d<bd){ bd=d; best=h; } });
        if(best&&bd<48&&!best.filled&&best.t===t.id){ best.filled=true; st.locked=true; done++; g.style.transition='transform .28s cubic-bezier(.3,1.6,.5,1)'; g.setAttribute('transform','translate('+best.x+','+best.y+')'); SND.ding(); say('That is a '+t.id); tip('shapeTip','Yes! That is a '+t.id+'.');
          if(done===TYPES.length){ SND.win(); P.confetti(70); say('All five! Great job!'); tip('shapeTip','All five shapes! Amazing. 🔺⭐💜'); } }
        else { g.style.transition='transform .3s ease-out'; g.setAttribute('transform','translate('+hx+','+hy+')'); st.x=hx; st.y=hy; SND.oops(); tip('shapeTip','Not that hole. Find the '+t.id+' hole.'); }
        setTimeout(function(){ g.style.transition=''; },320); },function(){ return !st.locked; }); });
    tip('shapeTip','Drag each shape to the hole that matches it.'); }
  $('shapeNew').addEventListener('click',function(){ build(); SND.whoosh(); }); build();
})();

/* ── 8. FEED PRINCESS PHOENIX ── */
(function(){
  toy('🐱 Feed Princess Phoenix','<svg id="feed" viewBox="0 0 400 300" role="img" aria-label="Drag a snack to the kitten"></svg><div class="tools"><button class="pgb gr" id="feedMore" type="button">🍓 More snacks</button></div><p class="tip" id="feedTip">Drag a snack up to her mouth.</p>');
  var svg=$('feed'),SN=[{e:'🍓',n:'a strawberry'},{e:'🐟',n:'a fish'},{e:'🍪',n:'a cookie'},{e:'🧀',n:'cheese'},{e:'🥛',n:'milk'},{e:'🍌',n:'a banana'},{e:'🥕',n:'a carrot'},{e:'🍇',n:'grapes'}],mouth,eaten;
  function build(){ clear(svg); eaten=0; E('rect',{width:400,height:300,fill:'#ffeefb',rx:18},svg); E('path',{d:'M0 214 q100 -16 200 0 t200 -8 V300 H0z',fill:'#ffd9f0'},svg);
    var k=E('g',null,svg); E('ellipse',{cx:200,cy:196,rx:56,ry:40,fill:'#fff',stroke:'#201540','stroke-width':4},k);
    E('path',{d:'M162 98 l-8 -40 34 18 z',fill:'#fff',stroke:'#201540','stroke-width':4,'stroke-linejoin':'round'},k); E('path',{d:'M238 98 l8 -40 -34 18 z',fill:'#fff',stroke:'#201540','stroke-width':4,'stroke-linejoin':'round'},k);
    E('path',{d:'M166 96 l-4 -22 18 10 z',fill:'#ffb6d5'},k); E('path',{d:'M234 96 l4 -22 -18 10 z',fill:'#ffb6d5'},k);
    E('circle',{cx:200,cy:120,r:52,fill:'#fff',stroke:'#201540','stroke-width':4},k);
    E('path',{d:'M172 66 l10 -16 8 14 8 -18 8 18 8 -14 10 16 z',fill:'#ffd84d',stroke:'#c9a01a','stroke-width':3,'stroke-linejoin':'round'},k);
    E('circle',{cx:182,cy:114,r:9,fill:'#17c7e8',stroke:'#201540','stroke-width':3},k); E('circle',{cx:218,cy:114,r:9,fill:'#8b3dff',stroke:'#201540','stroke-width':3},k);
    E('circle',{cx:180,cy:111,r:3,fill:'#fff'},k); E('circle',{cx:216,cy:111,r:3,fill:'#fff'},k);
    E('path',{d:'M194 132 l6 6 6 -6 z',fill:'#ff9ec2',stroke:'#201540','stroke-width':2.5,'stroke-linejoin':'round'},k);
    mouth=E('ellipse',{cx:200,cy:148,rx:9,ry:5,fill:'#e8577f',stroke:'#201540','stroke-width':3},k);
    E('circle',{cx:166,cy:134,r:9,fill:'#ff9ec2',opacity:.6},k); E('circle',{cx:234,cy:134,r:9,fill:'#ff9ec2',opacity:.6},k);
    E('path',{d:'M150 128 h-22 M150 138 h-24 M250 128 h22 M250 138 h24',stroke:'#201540','stroke-width':2.5,'stroke-linecap':'round'},k);
    SN.slice().sort(function(){ return Math.random()-.5; }).slice(0,4).forEach(function(s,i){ var hx=62+i*92,hy=262,g=E('g',{style:'cursor:grab',transform:'translate('+hx+','+hy+')'},svg);
      E('circle',{r:26,fill:'#fff',stroke:'#201540','stroke-width':4},g); E('text',{y:11,'text-anchor':'middle','font-size':30},g).textContent=s.e; var st={x:hx,y:hy,gone:false};
      dragify(svg,400,300,g,function(x,y){ st.x=x; st.y=y; g.setAttribute('transform','translate('+x.toFixed(1)+','+y.toFixed(1)+')'); },function(){
        if(Math.hypot(st.x-200,st.y-148)<62){ st.gone=true; eaten++; mouth.setAttribute('ry',16); mouth.setAttribute('rx',15); g.style.transition='transform .25s,opacity .25s'; g.setAttribute('transform','translate(200,148) scale(0.2)'); g.style.opacity='0';
          SND.slide(210,420,0.3,'sawtooth',0.05); say('Mmm, '+s.n+'! Thank you!'); tip('feedTip','Mmm, '+s.n+'! 😻'); setTimeout(function(){ mouth.setAttribute('ry',5); mouth.setAttribute('rx',9); g.remove(); },400); P.sparkleAt(svg.getBoundingClientRect().left+200,svg.getBoundingClientRect().top+150,10);
          if(eaten===4){ SND.win(); P.confetti(60); tip('feedTip','She is full and very happy. Purrrr. 💖'); say('Purrrr. Thank you for feeding me!'); } }
        else { g.style.transition='transform .3s ease-out'; g.setAttribute('transform','translate('+hx+','+hy+')'); st.x=hx; st.y=hy; setTimeout(function(){ g.style.transition=''; },320); tip('feedTip','Drag it right up to her mouth.'); } },function(){ return !st.gone; }); });
    tip('feedTip','Drag a snack up to her mouth.'); }
  $('feedMore').addEventListener('click',function(){ build(); SND.whoosh(); }); build();
})();

/* ── 9. CONNECT THE DOTS ── */
(function(){
  toy('🔗 Connect the dots','<svg id="dots" viewBox="0 0 400 300" role="img" aria-label="Tap the numbered dots in order"></svg><div class="tools"><button class="pgb pink" id="dotsNew" type="button">🔁 New picture</button></div><p class="tip" id="dotsTip">Tap number 1, then 2, then 3…</p>');
  var svg=$('dots'),PICS=[{n:'a star',c:'#ffc53d',p:[[200,40],[222,108],[294,108],[236,150],[258,218],[200,176],[142,218],[164,150],[106,108],[178,108]]},
    {n:'a house',c:'#ff8ad1',p:[[200,46],[300,120],[300,244],[236,244],[236,190],[164,190],[164,244],[100,244],[100,120]]},
    {n:'a boat',c:'#17c7e8',p:[[196,40],[196,180],[286,180],[196,46],[110,180],[76,200],[324,200],[300,246],[100,246]]},
    {n:'a cat',c:'#8b3dff',p:[[150,80],[164,40],[196,74],[230,40],[244,80],[262,120],[250,180],[200,204],[150,180],[138,120]]},
    {n:'a heart',c:'#ff4d9d',p:[[200,90],[150,44],[100,80],[100,140],[200,250],[300,140],[300,80],[250,44]]}];
  function build(){ var cur=pick(PICS); clear(svg); E('rect',{width:400,height:300,fill:'#f6fbff',rx:18},svg); var lineG=E('g',null,svg),dotG=E('g',null,svg),next=0,pts=cur.p,nodes=[];
    pts.forEach(function(pos,i){ var g=E('g',{style:'cursor:pointer',role:'button',tabindex:0,'aria-label':'Dot '+(i+1)},dotG); var c=E('circle',{cx:pos[0],cy:pos[1],r:14,fill:i===0?'#3fe0a4':'#fff',stroke:'#201540','stroke-width':4},g);
      E('text',{x:pos[0],y:pos[1]+6,'text-anchor':'middle','font-family':'Fredoka,sans-serif','font-size':16,'font-weight':700,fill:'#201540'},g).textContent=i+1; nodes.push({g:g,c:c});
      function hit(){ if(i!==next){ SND.oops(); tip('dotsTip','Find number '+(next+1)+' next.'); return; } c.setAttribute('fill',cur.c); SND.tone(330+i*44,0.18,'sine',0.09);
        if(i>0) E('line',{x1:pts[i-1][0],y1:pts[i-1][1],x2:pos[0],y2:pos[1],stroke:'#201540','stroke-width':5,'stroke-linecap':'round'},lineG); next++;
        if(next<pts.length){ nodes[next].c.setAttribute('fill','#3fe0a4'); tip('dotsTip','Now tap number '+(next+1)+'.'); }
        else { E('line',{x1:pts[pts.length-1][0],y1:pts[pts.length-1][1],x2:pts[0][0],y2:pts[0][1],stroke:'#201540','stroke-width':5,'stroke-linecap':'round'},lineG);
          var fill=E('path',{d:pts.map(function(q,k){ return (k?'L':'M')+q[0]+' '+q[1]; }).join(' ')+' Z',fill:cur.c,opacity:0},lineG); lineG.insertBefore(fill,lineG.firstChild); fill.style.transition='opacity .8s'; requestAnimationFrame(function(){ fill.style.opacity='.85'; });
          dotG.style.transition='opacity .8s'; dotG.style.opacity='.25'; SND.win(); P.confetti(60); say('You made '+cur.n+'!'); tip('dotsTip','You made '+cur.n+'! 🎉'); } }
      g.addEventListener('click',hit); g.addEventListener('keydown',function(e){ if(e.key===' '||e.key==='Enter'){ hit(); e.preventDefault(); } }); });
    tip('dotsTip','Tap number 1 to start.'); }
  $('dotsNew').addEventListener('click',function(){ build(); SND.whoosh(); }); build();
})();

/* ── 10. DECORATE THE ROOM ── */
(function(){
  toy('🛏️ Decorate the room','<svg id="room" viewBox="0 0 400 300" role="img" aria-label="Drag the furniture and paint the walls"></svg><div class="tools" id="roomCols"></div><p class="tip" id="roomTip">Drag the furniture. Tap a color to paint the wall.</p>');
  var svg=$('room'),WALLS=['#ffd0e8','#cfe9ff','#d6ffd9','#fff0c2','#e9d8ff','#ffe0cc'],wall;
  function bed(g){ E('rect',{x:-46,y:-4,width:92,height:30,rx:6,fill:'#8b3dff',stroke:'#201540','stroke-width':4},g); E('rect',{x:-50,y:-30,width:22,height:30,rx:6,fill:'#7f3fd6',stroke:'#201540','stroke-width':4},g); E('rect',{x:-24,y:-12,width:34,height:16,rx:6,fill:'#fff',stroke:'#201540','stroke-width':3},g); }
  function rug(g){ E('ellipse',{rx:46,ry:20,fill:'#ffc53d',stroke:'#201540','stroke-width':4},g); E('ellipse',{rx:28,ry:11,fill:'#ff4d9d'},g); }
  function lamp(g){ E('path',{d:'M0 0 v-38',stroke:'#8a5a33','stroke-width':5},g); E('path',{d:'M-20 -38 L20 -38 L13 -60 L-13 -60 Z',fill:'#ffc53d',stroke:'#201540','stroke-width':4,'stroke-linejoin':'round'},g); E('ellipse',{cy:2,rx:16,ry:6,fill:'#8a5a33',stroke:'#201540','stroke-width':3},g); }
  function toybox2(g){ E('rect',{x:-28,y:-26,width:56,height:30,rx:5,fill:'#17c7e8',stroke:'#201540','stroke-width':4},g); E('rect',{x:-31,y:-34,width:62,height:11,rx:4,fill:'#0b8fa9',stroke:'#201540','stroke-width':4},g); E('circle',{cy:-28,r:3.5,fill:'#ffc53d'},g); }
  function plant(g){ E('path',{d:'M-13 0 L13 0 L9 -22 L-9 -22 Z',fill:'#e0844a',stroke:'#201540','stroke-width':4,'stroke-linejoin':'round'},g); E('path',{d:'M0 -22 q-18 -10 -14 -30 q14 4 14 22 q0 -20 16 -24 q4 22 -16 32z',fill:'#3fe0a4',stroke:'#201540','stroke-width':3},g); }
  function cat(g){ E('ellipse',{cy:6,rx:26,ry:20,fill:'#ffb15c',stroke:'#201540','stroke-width':4},g); E('circle',{cx:-2,cy:-18,r:17,fill:'#ffb15c',stroke:'#201540','stroke-width':4},g); E('path',{d:'M-16 -30 l-3 -15 l14 8z M12 -30 l3 -15 l-14 8z',fill:'#ffb15c',stroke:'#201540','stroke-width':4,'stroke-linejoin':'round'},g); E('circle',{cx:-8,cy:-19,r:2.6,fill:'#201540'},g); E('circle',{cx:5,cy:-19,r:2.6,fill:'#201540'},g); E('path',{d:'M24 4 q22 -6 16 -24',stroke:'#ffb15c','stroke-width':9,fill:'none','stroke-linecap':'round'},g); }
  clear(svg); wall=E('rect',{width:400,height:214,fill:WALLS[0],rx:18},svg); E('rect',{y:210,width:400,height:90,fill:'#d9b184'},svg);
  for(var i=0;i<9;i++) E('line',{x1:0,y1:220+i*9,x2:400,y2:220+i*9,stroke:'#c79b6d','stroke-width':2},svg);
  E('rect',{x:236,y:34,width:112,height:84,rx:8,fill:'#bfeaff',stroke:'#201540','stroke-width':5},svg); E('path',{d:'M292 34 v84 M236 76 h112',stroke:'#201540','stroke-width':5},svg); E('circle',{cx:268,cy:56,r:9,fill:'#ffd84d'},svg);
  E('path',{d:'M40 40 h96 v62 h-96z',fill:'#fff',stroke:'#201540','stroke-width':5},svg); E('text',{x:88,y:82,'text-anchor':'middle','font-size':34},svg).textContent='🌈';
  [{f:bed,x:100,y:246},{f:rug,x:230,y:262},{f:lamp,x:334,y:240},{f:toybox2,x:300,y:262},{f:plant,x:48,y:262},{f:cat,x:180,y:224}].forEach(function(item){ var g=E('g',{style:'cursor:grab',transform:'translate('+item.x+','+item.y+')'},svg); item.f(g); var st={x:item.x,y:item.y};
    dragify(svg,400,300,g,function(x,y){ st.x=Math.max(30,Math.min(370,x)); st.y=Math.max(216,Math.min(288,y)); g.setAttribute('transform','translate('+st.x.toFixed(1)+','+st.y.toFixed(1)+')'); },function(){ SND.tone(280,0.12,'triangle',0.06); tip('roomTip','Looking good! Move anything you like.'); }); });
  var sw=$('roomCols'); WALLS.forEach(function(c,i){ var b=H('button',{type:'button','class':'sw','aria-label':'Wall color '+(i+1),'aria-pressed':i===0?'true':'false'},sw); b.style.background=c;
    b.addEventListener('click',function(){ wall.setAttribute('fill',c); sw.querySelectorAll('.sw').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); b.setAttribute('aria-pressed','true'); SND.ding(); tip('roomTip','New wall color! 🎨'); }); });
})();

/* ── 11. MARBLE MAZE — three levels ── */
(function(){
  var MAZES=[{name:'Easy',w:5,h:4,cells:{"0,0":["E"],"1,0":["S","W"],"2,0":["E"],"3,0":["E","S","W"],"4,0":["S","W"],"0,1":["S"],"1,1":["E","N"],"2,1":["E","W"],"3,1":["N","W"],"4,1":["N","S"],"0,2":["E","N","S"],"1,2":["E","W"],"2,2":["E","W"],"3,2":["S","W"],"4,2":["N","S"],"0,3":["E","N"],"1,3":["E","W"],"2,3":["W"],"3,3":["E","N"],"4,3":["N","W"]}},
  {name:'Medium',w:7,h:5,cells:{"0,0":["S"],"1,0":["E","S"],"2,0":["E","W"],"3,0":["E","W"],"4,0":["S","W"],"5,0":["E","S"],"6,0":["S","W"],"0,1":["N","S"],"1,1":["N","S"],"2,1":["S"],"3,1":["E","S"],"4,1":["N","W"],"5,1":["N"],"6,1":["N","S"],"0,2":["N","S"],"1,2":["N","S"],"2,2":["E","N","S"],"3,2":["N","W"],"4,2":["E","S"],"5,2":["E","W"],"6,2":["N","S","W"],"0,3":["E","N"],"1,3":["N","W"],"2,3":["N","S"],"3,3":["E","S"],"4,3":["N","W"],"5,3":["E","S"],"6,3":["N","W"],"0,4":["E"],"1,4":["E","W"],"2,4":["E","N","W"],"3,4":["N","W"],"4,4":["E"],"5,4":["E","N","W"],"6,4":["W"]}},
  {name:'Tricky',w:9,h:6,cells:{"0,0":["S"],"1,0":["E"],"2,0":["E","W"],"3,0":["S","W"],"4,0":["E","S"],"5,0":["E","S","W"],"6,0":["E","W"],"7,0":["E","W"],"8,0":["S","W"],"0,1":["E","N"],"1,1":["E","W"],"2,1":["S","W"],"3,1":["E","N"],"4,1":["N","W"],"5,1":["E","N","S"],"6,1":["S","W"],"7,1":["E","S"],"8,1":["N","W"],"0,2":["E","S"],"1,2":["S","W"],"2,2":["E","N"],"3,2":["E","W"],"4,2":["S","W"],"5,2":["N"],"6,2":["N","S"],"7,2":["N","S"],"8,2":["S"],"0,3":["N","S"],"1,3":["E","N"],"2,3":["E","W"],"3,3":["S","W"],"4,3":["E","N"],"5,3":["E","W"],"6,3":["N","W"],"7,3":["E","N"],"8,3":["N","S","W"],"0,4":["E","N"],"1,4":["S","W"],"2,4":["E","S"],"3,4":["E","N","W"],"4,4":["E","W"],"5,4":["E","W"],"6,4":["E","W"],"7,4":["W"],"8,4":["N","S"],"0,5":["E"],"1,5":["N","W"],"2,5":["E","N"],"3,5":["E","W"],"4,5":["E","W"],"5,5":["E","W"],"6,5":["E","W"],"7,5":["E","W"],"8,5":["N","W"]}}];
  toy('⚪ Marble maze','<svg id="maze" viewBox="0 0 400 300" role="img" aria-label="Drag the marble to the star"></svg><div class="tools" id="mazeLv"></div><p class="tip" id="mazeTip">Drag the silver marble all the way to the gold star.</p>');
  var svg=$('maze'),idx=0,M,S,ox,oy,r,mx=0,my=0,goalC,won=false,marble=null,on=false;
  function open(cx,cy){ return M.cells[cx+','+cy]||[]; }
  function cellOf(x,y){ return [Math.max(0,Math.min(M.w-1,Math.floor((x-ox)/S))),Math.max(0,Math.min(M.h-1,Math.floor((y-oy)/S)))]; }
  function settle(){ var c=cellOf(mx,my),o=open(c[0],c[1]),L=ox+c[0]*S,T=oy+c[1]*S; if(o.indexOf('W')<0) mx=Math.max(mx,L+r); if(o.indexOf('E')<0) mx=Math.min(mx,L+S-r); if(o.indexOf('N')<0) my=Math.max(my,T+r); if(o.indexOf('S')<0) my=Math.min(my,T+S-r); }
  function axis(dx,dy){ if(!dx&&!dy) return; var nx=mx+dx,ny=my+dy; nx=Math.max(ox+r,Math.min(ox+M.w*S-r,nx)); ny=Math.max(oy+r,Math.min(oy+M.h*S-r,ny)); var c0=cellOf(mx,my),c1=cellOf(nx,ny);
    if(c1[0]!==c0[0]||c1[1]!==c0[1]){ var d=dx>0?'E':dx<0?'W':dy>0?'S':'N',far=Math.abs(c1[0]-c0[0])>1||Math.abs(c1[1]-c0[1])>1; if(far||open(c0[0],c0[1]).indexOf(d)<0){ var L=ox+c0[0]*S,T=oy+c0[1]*S; if(d==='E') nx=L+S-r; else if(d==='W') nx=L+r; else if(d==='S') ny=T+S-r; else ny=T+r; } } mx=nx; my=ny; settle(); }
  function moveTo(tx,ty){ var n=Math.max(1,Math.ceil(Math.hypot(tx-mx,ty-my)/(r*.35))); for(var i=0;i<n;i++){ var left=n-i; axis((tx-mx)/left,0); axis(0,(ty-my)/left); } paint(); if(!won&&Math.hypot(mx-goalC.x,my-goalC.y)<S*.42) win(); }
  function paint(){ if(marble) marble.setAttribute('transform','translate('+mx.toFixed(1)+','+my.toFixed(1)+')'); }
  function win(){ won=true; SND.win(); P.confetti(70); say('You did it!'); tip('mazeTip','You made it to the star! Try a harder one.'); }
  function build(){ M=MAZES[idx]; won=false; on=false; clear(svg); E('rect',{width:400,height:300,fill:'#efe6ff',rx:18},svg); S=Math.floor(Math.min(356/M.w,236/M.h)); ox=Math.round((400-M.w*S)/2); oy=Math.round((300-M.h*S)/2)+6; r=Math.max(6,S*.26);
    E('rect',{x:ox-6,y:oy-6,width:M.w*S+12,height:M.h*S+12,rx:12,fill:'#fff',stroke:'#201540','stroke-width':5},svg); var wallG=E('g',{stroke:'#6a4fa8','stroke-width':5,'stroke-linecap':'round'},svg);
    for(var y=0;y<M.h;y++)for(var x=0;x<M.w;x++){ var o=open(x,y),L=ox+x*S,T=oy+y*S; if(o.indexOf('N')<0) E('line',{x1:L,y1:T,x2:L+S,y2:T},wallG); if(o.indexOf('W')<0) E('line',{x1:L,y1:T,x2:L,y2:T+S},wallG); if(y===M.h-1&&o.indexOf('S')<0) E('line',{x1:L,y1:T+S,x2:L+S,y2:T+S},wallG); if(x===M.w-1&&o.indexOf('E')<0) E('line',{x1:L+S,y1:T,x2:L+S,y2:T+S},wallG); }
    goalC={x:ox+(M.w-.5)*S,y:oy+(M.h-.5)*S}; var d='',i,a,rr; for(i=0;i<10;i++){ a=-Math.PI/2+i*Math.PI/5; rr=i%2?S*.16:S*.34; d+=(i?'L':'M')+(goalC.x+Math.cos(a)*rr).toFixed(1)+' '+(goalC.y+Math.sin(a)*rr).toFixed(1)+' '; }
    var star=E('path',{d:d+'Z',fill:'#ffd84d',stroke:'#c9a01a','stroke-width':3},svg); star.style.animation='bobby 2.4s ease-in-out infinite';
    marble=E('g',{style:'cursor:grab'},svg); E('circle',{r:r,fill:'#cfd8e3',stroke:'#201540','stroke-width':3},marble); E('circle',{cx:-r*.3,cy:-r*.3,r:r*.3,fill:'#fff',opacity:.9},marble); mx=ox+S/2; my=oy+S/2; paint(); tip('mazeTip','Drag the silver marble to the gold star.'); }
  svg.addEventListener('pointerdown',function(e){ var p=pt(svg,e,400,300); if(Math.hypot(p.x-mx,p.y-my)<r*3){ on=true; try{svg.setPointerCapture(e.pointerId);}catch(x){} e.preventDefault(); } });
  svg.addEventListener('pointermove',function(e){ if(!on) return; var p=pt(svg,e,400,300); moveTo(p.x,p.y); e.preventDefault(); }); svg.addEventListener('pointerup',function(){ on=false; }); svg.addEventListener('pointercancel',function(){ on=false; });
  MAZES.forEach(function(m,i){ var b=H('button',{type:'button','class':'pill','aria-pressed':i===0?'true':'false',text:m.name},$('mazeLv')); b.addEventListener('click',function(){ idx=i; $('mazeLv').querySelectorAll('.pill').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); b.setAttribute('aria-pressed','true'); build(); SND.tap(); }); });
  build();
})();

/* ── 12. LETTER BLOCKS ── */
(function(){
  toy('🔤 Letter blocks','<svg id="blocks" viewBox="0 0 400 300" role="img" aria-label="Drag the letter blocks onto the shelf"></svg><div class="tools"><button class="pgb" id="blockNew" type="button">🔁 New word</button></div><p class="tip" id="blockTip">Drag the letters onto the shelf to spell it.</p>');
  var svg=$('blocks'),WORDS=['CAT','DOG','SUN','HAT','BUS','FOX','PIG','CUP','BED','MOM','DAD','STAR','MOON','CAKE','LOVE','KIND','BRAVE'];
  function build(){ var word=pick(WORDS); clear(svg); E('rect',{width:400,height:300,fill:'#fff8ec',rx:18},svg);
    E('text',{x:200,y:32,'text-anchor':'middle','font-family':'Fredoka,sans-serif','font-size':22,'font-weight':700,fill:'#201540'},svg).textContent='Spell:  '+word.split('').join(' ');
    var n=word.length,bw=Math.min(58,320/n),gap=8,totalW=n*bw+(n-1)*gap,startX=(400-totalW)/2+bw/2,slotY=196,slots=[];
    for(var i=0;i<n;i++){ var sx=startX+i*(bw+gap); E('rect',{x:sx-bw/2,y:slotY-bw/2,width:bw,height:bw,rx:10,fill:'none',stroke:'#c9b79a','stroke-width':4,'stroke-dasharray':'8 7'},svg); slots.push({x:sx,y:slotY,filled:false,letter:word[i]}); }
    E('rect',{x:30,y:slotY+bw/2+2,width:340,height:12,rx:6,fill:'#c9a26a',stroke:'#201540','stroke-width':4},svg);
    var order=word.split('').map(function(l,i){ return {l:l,i:i}; }).sort(function(){ return Math.random()-.5; }),done=0;
    order.forEach(function(item,k){ var hx=52+k*(296/Math.max(1,n-1)),hy=96,g=E('g',{style:'cursor:grab'},svg),c=BOW[k%BOW.length];
      E('rect',{x:-bw/2,y:-bw/2,width:bw,height:bw,rx:10,fill:c,stroke:'#201540','stroke-width':4},g); E('rect',{x:-bw/2+5,y:-bw/2+5,width:bw-10,height:bw*.3,rx:6,fill:'#fff',opacity:.35},g);
      E('text',{y:bw*.19,'text-anchor':'middle','font-family':'Fredoka,sans-serif','font-size':bw*.58,'font-weight':700,fill:'#201540'},g).textContent=item.l; var st={x:hx,y:hy,locked:false}; g.setAttribute('transform','translate('+hx.toFixed(1)+','+hy.toFixed(1)+')');
      dragify(svg,400,300,g,function(x,y){ st.x=x; st.y=y; g.setAttribute('transform','translate('+x.toFixed(1)+','+y.toFixed(1)+') scale(1.08)'); },function(){ var best=null,bd=1e9; slots.forEach(function(s){ var d=Math.hypot(st.x-s.x,st.y-s.y); if(d<bd){ bd=d; best=s; } });
        if(best&&bd<46&&!best.filled&&best.letter===item.l){ best.filled=true; st.locked=true; done++; g.style.transition='transform .25s cubic-bezier(.3,1.6,.5,1)'; g.setAttribute('transform','translate('+best.x.toFixed(1)+','+best.y+')'); SND.ding(); say(item.l); tip('blockTip',item.l+'! '+done+' of '+n+'.');
          if(done===n){ SND.win(); P.confetti(70); say('You spelled '+word+'!'); tip('blockTip','You spelled '+word+'! 🎉'); } }
        else { g.style.transition='transform .3s ease-out'; g.setAttribute('transform','translate('+hx.toFixed(1)+','+hy.toFixed(1)+')'); st.x=hx; st.y=hy; SND.oops(); tip('blockTip','That letter goes somewhere else. Keep trying!'); }
        setTimeout(function(){ g.style.transition=''; },320); },function(){ return !st.locked; }); });
    tip('blockTip','Drag the letters onto the shelf to spell '+word+'.'); }
  $('blockNew').addEventListener('click',function(){ build(); SND.whoosh(); }); build();
})();

/* ── 13. BUBBLE BLOWER — with Wormy the Worm ── */
(function(){
  toy('🫧 Bubble blower','<svg id="bubbles" viewBox="0 0 400 260" role="img" aria-label="Tap to blow bubbles, then pop them"></svg><div class="tools"><button class="pgb cy" id="bubBlow" type="button">🫧 Blow lots of bubbles</button></div><p class="tip" id="bubTip">Tap anywhere to blow bubbles. Tap a bubble to pop it. Say hi to Wormy.</p>');
  var svg=$('bubbles'),defs=E('defs',null,svg),rg=E('radialGradient',{id:'bubG',cx:.34,cy:.3,r:.8},defs);
  E('stop',{offset:0,'stop-color':'#fff','stop-opacity':.95},rg); E('stop',{offset:.55,'stop-color':'#bfe9ff','stop-opacity':.45},rg); E('stop',{offset:1,'stop-color':'#8ad0ff','stop-opacity':.3},rg);
  E('rect',{width:400,height:260,fill:'#e9f8ff',rx:18},svg); E('path',{d:'M0 224 q100 -14 200 0 t200 -6 V260 H0z',fill:'#c9edd6'},svg);
  var worm=E('g',{style:'cursor:pointer'},svg); [0,1,2,3,4].forEach(function(i){ E('circle',{cx:i*22,cy:i%2?-6:0,r:15-i*.8,fill:BOW[i],stroke:'#201540','stroke-width':4},worm); });
  E('circle',{cx:-6,cy:-14,r:9,fill:'#fff',stroke:'#201540','stroke-width':4},worm); E('circle',{cx:10,cy:-14,r:9,fill:'#fff',stroke:'#201540','stroke-width':4},worm); E('circle',{cx:-5,cy:-14,r:4,fill:'#201540'},worm); E('circle',{cx:11,cy:-14,r:4,fill:'#201540'},worm);
  E('path',{d:'M-15 -14 h-6 M19 -14 h6',stroke:'#201540','stroke-width':3},worm); E('path',{d:'M-2 2 q8 6 14 0',stroke:'#201540','stroke-width':3,fill:'none','stroke-linecap':'round'},worm);
  var wt=0; setInterval(function(){ if(D.hidden||D.body.classList.contains('calm')) return; wt+=.012; worm.setAttribute('transform','translate('+(60+Math.sin(wt)*230)+','+(214+Math.sin(wt*3)*5)+') scale('+(Math.cos(wt)>=0?1:-1)+',1)'); },40);
  worm.addEventListener('click',function(e){ e.stopPropagation(); say(pick(['Hello! I am Wormy the Worm, the royal study partner.','My glasses are for reading. I read about everything.','Worms make tunnels so roots can drink. Useful, me.'])); tip('bubTip','You found Wormy! 🐛'); SND.boing(); });
  var bg=E('g',null,svg),count=0;
  function blow(x,y){ if(bg.childNodes.length>46) return; var r=rnd(10,30),g=E('g',{style:'cursor:pointer'},bg); E('circle',{r:r,fill:'url(#bubG)',stroke:'rgba(255,255,255,.9)','stroke-width':2.5},g); E('ellipse',{cx:-r*.32,cy:-r*.34,rx:r*.22,ry:r*.15,fill:'#fff',opacity:.9},g);
    g.setAttribute('transform','translate('+x.toFixed(1)+','+y.toFixed(1)+')'); g.style.transition='transform '+rnd(4,8)+'s linear,opacity .35s'; requestAnimationFrame(function(){ g.setAttribute('transform','translate('+(x+rnd(-50,50)).toFixed(1)+',-60)'); });
    var t=setTimeout(function(){ g.remove(); },8500); g.addEventListener('pointerdown',function(e){ e.stopPropagation(); clearTimeout(t); SND.pop(); count++; g.style.transform='scale(1.5)'; g.style.opacity='0'; var rr=g.getBoundingClientRect(); P.sparkleAt(rr.left+rr.width/2,rr.top+rr.height/2,8,['#bfe9ff','#fff','#8ad0ff']); tip('bubTip','Pop! You popped '+count+' bubble'+(count===1?'':'s')+'.'); setTimeout(function(){ g.remove(); },260); }); SND.tone(rnd(700,1200),0.07,'sine',0.03); }
  svg.addEventListener('pointerdown',function(e){ var p=pt(svg,e,400,260); for(var i=0;i<3;i++) setTimeout(function(){ blow(p.x+rnd(-24,24),p.y+rnd(-12,12)); },i*80); });
  $('bubBlow').addEventListener('click',function(){ for(var i=0;i<20;i++) setTimeout(function(){ blow(rnd(30,370),rnd(180,250)); },i*70); SND.whoosh(); tip('bubTip','So many bubbles! Pop them all.'); });
})();

/* ── 14. STICKER STORY — drag stickers onto a scene and it reads it back ── */
(function(){
  toy('📸 Sticker scene','<svg id="scene" viewBox="0 0 400 300" role="img" aria-label="Drag stickers onto the scene"></svg><div class="tools" id="sceneTray"></div><div class="tools"><button class="pgb gr" id="sceneRead" type="button">🗣️ Read my scene</button><button class="pgb" id="sceneClear" type="button">🧽 Clear</button></div><p class="tip" id="sceneTip">Tap a sticker, then tap the scene to place it. Then let me read your story.</p>');
  var svg=$('scene'),STK=[['🐱','a cat'],['🐶','a dog'],['🌈','a rainbow'],['☀️','the sun'],['🏠','a house'],['🌳','a tree'],['🦄','a unicorn'],['🚗','a car'],['👑','a crown'],['🍦','an ice cream'],['🐸','a frog'],['⭐','a star']],cur=null,placed=[];
  E('rect',{width:400,height:190,fill:'#bfeaff',rx:18},svg); E('path',{d:'M0 180 q100 -30 200 0 t200 -4 V300 H0z',fill:'#8fdc8f'},svg); E('rect',{y:280,width:400,height:20,fill:'#5fbe6a'},svg);
  var layer=E('g',null,svg); var tray=$('sceneTray');
  STK.forEach(function(s){ var b=H('button',{type:'button','class':'stamp','aria-pressed':'false',text:s[0]},tray); b.addEventListener('click',function(){ cur=(cur&&cur[0]===s[0])?null:s; tray.querySelectorAll('.stamp').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); if(cur) b.setAttribute('aria-pressed','true'); SND.tap(); tip('sceneTip',cur?'Now tap the scene to place '+s[1]+'.':'Pick a sticker.'); }); });
  svg.addEventListener('pointerdown',function(e){ if(!cur) return; var p=pt(svg,e,400,300); var t=E('text',{x:p.x,y:p.y,'text-anchor':'middle','font-size':40,style:'cursor:grab'},layer); t.textContent=cur[0]; t.classList.add('popin'); placed.push(cur[1]); SND.pop();
    var st={x:p.x,y:p.y}; dragify(svg,400,300,t,function(x,y){ st.x=x; st.y=y; t.setAttribute('x',x); t.setAttribute('y',y); }); });
  $('sceneRead').addEventListener('click',function(){ if(!placed.length){ tip('sceneTip','Put some stickers on first!'); return; } var story='Once upon a time there was '+placed.slice(0,-1).join(', ')+(placed.length>1?' and ':'')+placed[placed.length-1]+'. And they were all friends. The end!'; say(story); tip('sceneTip',story); SND.ding(); });
  $('sceneClear').addEventListener('click',function(){ clear(layer); placed=[]; SND.whoosh(); tip('sceneTip','Fresh scene. Make a new story!'); });
})();

/* backwards-compat for anything expecting the old FX names */
window.PWfx = window.PWfx || {};
window.PWfx.splash = function(){ var b=D.querySelector('#bigRed'); if(b) b.parentNode.querySelector('.t-grape') && b.parentNode.querySelector('.t-grape').click(); };

})();
