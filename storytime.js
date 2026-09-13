/* ═══════════════════════════════════════════════════════════════════
   PHOENIX'S WORLD — storytime.js  (v2 — rebuilt)

   · A real hardcover. Tap the RIGHT page (or swipe left) to turn
     forward, tap the LEFT page to go back. Big buttons too. Nothing
     can get stuck.
   · Every page has a living picture: characters walk, hop, wobble,
     ride, and things you tap actually DO something in the picture —
     toys leap into the box, sugar bugs run away, the bike rides off
     the edge of the page.
   · Four stories with a real problem, a turn, and a point.
   · Every book ends with Say It Out Loud (five taps each, dots fill),
     a You-Are-So-Loved page, and a note for the grown-up.
   Mounts into #storyMount. Needs window.PW. US English.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var P=window.PW; if(!P) return;
var E=P.E,H=P.H,$=P.$,rnd=P.rnd,ri=P.ri,pick=P.pick,clear=P.clear,SND=P.SND,say=P.say;
var D=document;

H('style',{html:
'.bookshelf{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:22px}'+
'.spine{width:150px;min-height:200px;border:6px solid var(--ink);border-radius:8px 18px 18px 8px;cursor:pointer;padding:14px 10px;display:flex;flex-direction:column;justify-content:space-between;font:700 17px/1.15 "Fredoka",sans-serif;color:#fff;text-shadow:0 2px 0 rgb(0 0 0/.35);box-shadow:-6px 0 0 rgb(var(--ink-rgb)/.35),0 10px 0 rgb(var(--ink-rgb)/.25);transition:transform .15s;text-align:left}'+
'.spine:hover{transform:translateY(-6px) rotate(-2deg)}.spine .em{font-size:44px;line-height:1;text-align:center;filter:drop-shadow(0 4px 0 rgb(0 0 0/.25))}.spine[aria-pressed="true"]{outline:5px solid var(--sherbet);outline-offset:3px}'+
'.book{position:relative;max-width:1000px;margin:0 auto}'+
'.cover{border:8px solid var(--ink);border-radius:14px 26px 26px 14px;background:var(--bookc,#8b3dff);box-shadow:0 18px 0 rgb(var(--ink-rgb)/.3),inset 0 0 0 10px rgb(255 255 255/.18),inset 0 0 0 14px rgb(0 0 0/.12);display:grid;grid-template-columns:1fr 1fr;min-height:440px;position:relative;overflow:hidden;touch-action:pan-y}'+
'.cover::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:22px;margin-left:-11px;background:linear-gradient(90deg,rgb(0 0 0/0),rgb(0 0 0/.25),rgb(0 0 0/0));z-index:2;pointer-events:none}'+
'.cover.turnf .page.r{animation:turnf .45s ease-in forwards}.cover.turnb .page.l{animation:turnb .45s ease-in forwards}'+
'@keyframes turnf{to{transform:perspective(1200px) rotateY(-70deg);opacity:.2}}@keyframes turnb{to{transform:perspective(1200px) rotateY(70deg);opacity:.2}}'+
'.page{position:relative;background:#fffdf5;padding:16px 20px 58px;min-height:440px;display:flex;flex-direction:column;cursor:pointer;background-image:repeating-linear-gradient(0deg,transparent 0 30px,rgb(32 21 64/.04) 30px 31px)}'+
'.page.l{border-radius:8px 0 0 8px;box-shadow:inset -18px 0 24px -18px rgb(0 0 0/.25);transform-origin:right center}.page.r{border-radius:0 8px 8px 0;box-shadow:inset 18px 0 24px -18px rgb(0 0 0/.25);transform-origin:left center}'+
'.page .art{width:100%;aspect-ratio:4/3;border:5px solid var(--ink);border-radius:18px;overflow:hidden;background:#e8f6ff;box-shadow:0 6px 0 rgb(var(--ink-rgb)/.18);cursor:default}.page .art svg{width:100%;height:100%;display:block}'+
'.page .txt{margin:12px 0 0;font:800 clamp(16px,2.2vw,20px)/1.5 "Nunito",sans-serif;color:var(--ink)}.page .txt b{color:var(--grape)}'+
'.page .num{position:absolute;bottom:14px;font:700 14px/1 "Fredoka",sans-serif;color:#9a8ab8}.page.l .num{left:20px}.page.r .num{right:20px}'+
'.page .hint{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);padding:4px 10px;border-radius:999px;background:#fff0b3;border:3px solid var(--ink);font:800 12px/1 "Nunito",sans-serif;color:var(--ink);white-space:nowrap}'+
'.page .tapnext{position:absolute;right:14px;top:50%;font-size:34px;opacity:.35;animation:nudge 1.6s ease-in-out infinite}@keyframes nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}}'+
'.hot{cursor:pointer;transform-box:fill-box;transform-origin:center}'+
'.wob{animation:wob .5s ease-in-out 2}@keyframes wob{0%,100%{transform:rotate(0)}25%{transform:rotate(9deg) scale(1.08)}75%{transform:rotate(-9deg) scale(1.08)}}'+
'.brth{animation:brth 4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}@keyframes brth{0%,100%{transform:scale(1)}50%{transform:scale(1.03,1.05)}}'+
'.bob{animation:bob 3s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}'+
'.hop{animation:hop .9s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}@keyframes hop{0%,100%{transform:translateY(0) scale(1)}30%{transform:translateY(-22px) scale(.95,1.08)}60%{transform:translateY(0) scale(1.06,.94)}}'+
'.shake{animation:shake .7s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}@keyframes shake{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}'+
'.spin{animation:spin 8s linear infinite;transform-box:fill-box;transform-origin:center}@keyframes spin{to{transform:rotate(360deg)}}'+
'.flt{animation:flt 5s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes flt{0%,100%{transform:translate(0,0) rotate(-3deg)}50%{transform:translate(6px,-10px) rotate(3deg)}}'+
'.walk{animation:walk 7s linear infinite}@keyframes walk{from{transform:translateX(-120px)}to{transform:translateX(520px)}}'+
'.wheel{animation:spin 1s linear infinite}'+
'.bnav{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin-top:18px}'+
'.bbtn{min-height:56px;padding:13px 22px;cursor:pointer;border:5px solid var(--ink);border-radius:999px;background:var(--sherbet);font:700 18px/1 "Fredoka",sans-serif;color:var(--ink);box-shadow:0 6px 0 var(--sherbet-deep)}'+
'.bbtn:active{transform:translateY(5px);box-shadow:0 1px 0 var(--sherbet-deep)}.bbtn.pk{background:var(--bubblegum);color:#fff;box-shadow:0 6px 0 var(--bubblegum-deep)}.bbtn.mt{background:var(--mint);box-shadow:0 6px 0 var(--mint-deep)}.bbtn.wh{background:#fff;box-shadow:0 6px 0 rgb(var(--ink-rgb)/.28)}.bbtn[disabled]{opacity:.35;cursor:default}'+
'.bprog{font:800 14px/1 "Nunito",sans-serif;color:var(--grape)}'+
'.sayline{display:flex;align-items:center;gap:12px;margin:10px 0;padding:12px 14px;border:5px solid var(--ink);border-radius:18px;background:#fff;cursor:pointer;box-shadow:0 5px 0 rgb(var(--ink-rgb)/.2);transition:transform .1s}'+
'.sayline:active{transform:translateY(4px);box-shadow:0 1px 0 rgb(var(--ink-rgb)/.2)}.sayline .st{flex:1;font:700 clamp(17px,2.4vw,22px)/1.3 "Fredoka",sans-serif;color:var(--ink)}'+
'.sayline .dots{display:flex;gap:4px}.sayline .dots i{width:14px;height:14px;border-radius:50%;border:3px solid var(--ink);background:#fff;transition:background .2s}.sayline .dots i.on{background:var(--bubblegum)}.sayline.done{background:#e3ffef;border-color:var(--mint-deep)}'+
'.loved{text-align:center;padding:10px 0}.loved .big{font:700 clamp(28px,4.6vw,44px)/1.1 "Fredoka",sans-serif;color:var(--bubblegum);margin:8px 0}'+
'.pnote{background:#f4ecff;border:4px dashed var(--grape);border-radius:16px;padding:14px;font:700 14px/1.55 "Nunito",sans-serif;color:var(--ink)}.pnote h4{font:700 16px/1.2 "Fredoka",sans-serif;color:var(--grape);margin:0 0 6px}'+
'@media(max-width:760px){.cover{grid-template-columns:1fr;min-height:0}.page.l,.page.r{border-radius:8px;box-shadow:none}.cover::before{display:none}.cover.turnf .page,.cover.turnb .page{animation:turnf .3s ease-in forwards}}'+
'@media(prefers-reduced-motion:reduce){.brth,.bob,.spin,.flt,.wob,.hop,.shake,.walk,.wheel,.tapnext{animation:none!important}}'
},D.head);

/* ───────────── PARTS ───────────── */
function eyes(x1,x2,y,r){ return '<circle cx="'+x1+'" cy="'+y+'" r="'+r+'" fill="#17c7e8" stroke="#201540" stroke-width="3"/><circle cx="'+x2+'" cy="'+y+'" r="'+r+'" fill="#8b3dff" stroke="#201540" stroke-width="3"/><circle cx="'+(x1-r*.3)+'" cy="'+(y-r*.35)+'" r="'+(r*.3)+'" fill="#fff"/><circle cx="'+(x2-r*.3)+'" cy="'+(y-r*.35)+'" r="'+(r*.3)+'" fill="#fff"/>'; }
function phoenix(x,y,s,mood,cls){ mood=mood||'happy'; var m=mood==='sad'?'M-9 8 q9 -8 18 0':mood==='wow'?'M-6 4 a6 7 0 1 0 12 0 a6 7 0 1 0 -12 0':'M-10 4 q10 12 20 0';
  return '<g class="'+(cls||'brth')+'" transform="translate('+x+','+y+') scale('+s+')"><path d="M34 14 q30 -8 26 -40" fill="none" stroke="#201540" stroke-width="12" stroke-linecap="round"/><path d="M34 14 q30 -8 26 -40" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>'+
  '<path d="M-34 8 q-6 40 6 58 q14 8 30 6 q16 2 30 -6 q10 -20 2 -58z" fill="#ff8ad1" stroke="#201540" stroke-width="5" stroke-linejoin="round"/><ellipse cx="-16" cy="70" rx="13" ry="7" fill="#fff" stroke="#201540" stroke-width="4"/><ellipse cx="16" cy="70" rx="13" ry="7" fill="#fff" stroke="#201540" stroke-width="4"/>'+
  '<path d="M-38 -30 L-46 -66 L-16 -46 Z M38 -30 L46 -66 L16 -46 Z" fill="#fff" stroke="#201540" stroke-width="5" stroke-linejoin="round"/><path d="M-33 -36 L-38 -58 L-20 -44 Z M33 -36 L38 -58 L20 -44 Z" fill="#ffb6ce"/>'+
  '<circle cx="0" cy="-20" r="42" fill="#fff" stroke="#201540" stroke-width="5"/><path d="M-28 -50 l8 -16 8 12 8 -18 8 18 8 -12 8 16z" fill="#ffd84d" stroke="#c9a01a" stroke-width="3" stroke-linejoin="round"/>'+eyes(-15,15,-24,8)+
  '<path d="M-5 -6 L5 -6 L0 -1 Z" fill="#ff8fb8" stroke="#201540" stroke-width="2.5"/><path d="'+m+'" transform="translate(0,-2)" stroke="#201540" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="-30" cy="-10" r="8" fill="#ff8fb8" opacity=".55"/><circle cx="30" cy="-10" r="8" fill="#ff8fb8" opacity=".55"/><path d="M-42 -14 h-16 M-42 -6 h-17 M42 -14 h16 M42 -6 h17" stroke="#201540" stroke-width="3" stroke-linecap="round"/></g>'; }
function kevin(x,y,s,mood,cls){ var m=mood==='sad'?'M-10 26 q10 -8 20 0':'M-12 22 q12 12 24 0';
  return '<g class="'+(cls||'brth')+'" transform="translate('+x+','+y+') scale('+s+')"><path d="M-60 40 q-40 -10 -50 -50" fill="none" stroke="#ff4d9d" stroke-width="18" stroke-linecap="round"/><path d="M-100 -12 l-14 -18 26 6z" fill="#ffc53d" stroke="#201540" stroke-width="4" stroke-linejoin="round"/><path d="M-20 -10 q-30 -50 -60 -30 q10 30 40 34z M20 -10 q30 -50 60 -30 q-10 30 -40 34z" fill="#c94dff" stroke="#201540" stroke-width="5" stroke-linejoin="round"/>'+
  '<ellipse cx="0" cy="30" rx="58" ry="46" fill="#ff8ad1" stroke="#201540" stroke-width="5"/><ellipse cx="0" cy="40" rx="34" ry="30" fill="#ffd0e8"/><path d="M-30 -20 l8 -22 8 22 M-6 -24 l8 -24 8 24 M18 -20 l8 -22 8 22" fill="#ffc53d" stroke="#201540" stroke-width="4" stroke-linejoin="round"/>'+
  '<circle cx="0" cy="-10" r="44" fill="#ff8ad1" stroke="#201540" stroke-width="5"/>'+eyes(-16,16,-14,9)+'<ellipse cx="-8" cy="8" rx="4" ry="3" fill="#201540"/><ellipse cx="8" cy="8" rx="4" ry="3" fill="#201540"/><path class="kmouth" d="'+m+'" stroke="#201540" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="-30" cy="72" rx="16" ry="9" fill="#ff8ad1" stroke="#201540" stroke-width="4"/><ellipse cx="30" cy="72" rx="16" ry="9" fill="#ff8ad1" stroke="#201540" stroke-width="4"/></g>'; }
function bigDragon(x,y,c,cls){ return '<g class="'+(cls||'')+'" transform="translate('+x+','+y+')"><ellipse rx="52" ry="40" fill="'+c+'" stroke="#201540" stroke-width="5"/><circle cx="30" cy="-36" r="30" fill="'+c+'" stroke="#201540" stroke-width="5"/><path d="M14 -60 l8 -18 8 18 M34 -62 l8 -18 8 18" fill="#ffc53d" stroke="#201540" stroke-width="3"/><circle cx="40" cy="-40" r="6" fill="#fff" stroke="#201540" stroke-width="3"/><circle cx="42" cy="-40" r="2.5" fill="#201540"/><path d="M50 -22 q14 6 20 0" stroke="#201540" stroke-width="4" fill="none"/><path d="M-20 -30 q-30 -40 -60 -20 q20 20 50 26z" fill="'+c+'" stroke="#201540" stroke-width="4"/></g>'; }
function wormy(x,y,s){ return '<g class="bob" transform="translate('+x+','+y+') scale('+s+')">'+[0,1,2,3,4].map(function(i){ return '<circle cx="'+(i*22)+'" cy="'+(i%2?-6:0)+'" r="'+(15-i*.8)+'" fill="'+['#ff4d9d','#ff8a3d','#ffc53d','#3fe0a4','#17c7e8'][i]+'" stroke="#201540" stroke-width="4"/>'; }).join('')+'<circle cx="-6" cy="-14" r="9" fill="#fff" stroke="#201540" stroke-width="4"/><circle cx="10" cy="-14" r="9" fill="#fff" stroke="#201540" stroke-width="4"/><circle cx="-5" cy="-14" r="4" fill="#201540"/><circle cx="11" cy="-14" r="4" fill="#201540"/><path d="M-15 -14 h-6 M19 -14 h6" stroke="#201540" stroke-width="3"/><path d="M-2 2 q8 6 14 0" stroke="#201540" stroke-width="3" fill="none" stroke-linecap="round"/></g>'; }
function sun(x,y,r){ return '<g class="spin" style="animation-duration:40s"><g stroke="#ffd84d" stroke-width="'+(r*.18)+'" stroke-linecap="round">'+[0,45,90,135,180,225,270,315].map(function(a){ var A=a*Math.PI/180; return '<path d="M'+(x+Math.cos(A)*r*1.25)+' '+(y+Math.sin(A)*r*1.25)+' L'+(x+Math.cos(A)*r*1.6)+' '+(y+Math.sin(A)*r*1.6)+'"/>'; }).join('')+'</g></g><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#ffd84d" stroke="#e8a800" stroke-width="4"/><circle cx="'+(x-r*.3)+'" cy="'+(y-r*.15)+'" r="'+(r*.1)+'" fill="#7a5a00"/><circle cx="'+(x+r*.3)+'" cy="'+(y-r*.15)+'" r="'+(r*.1)+'" fill="#7a5a00"/><path d="M'+(x-r*.35)+' '+(y+r*.25)+' q'+(r*.35)+' '+(r*.35)+' '+(r*.7)+' 0" stroke="#7a5a00" stroke-width="4" fill="none" stroke-linecap="round"/>'; }
function cloud(x,y,s){ return '<g class="flt" transform="translate('+x+','+y+') scale('+s+')"><path d="M0 0 a22 22 0 0 1 42 -8 20 20 0 0 1 30 22 h-78 a18 18 0 0 1 6 -14z" fill="#fff"/></g>'; }
function meadow(){ return '<rect width="400" height="300" fill="#bfeaff"/>'+sun(60,50,24)+cloud(280,40,.9)+'<path d="M0 240 q100 -40 200 0 t200 -8 V300 H0z" fill="#8fe08f"/><path d="M0 262 q140 -18 280 0 t120 -4 V300 H0z" fill="#4fbb63"/>'; }
function night(){ return '<rect width="400" height="300" fill="#1a0f33"/>'+[0,1,2,3,4,5,6,7,8].map(function(i){ return '<path class="flt" style="animation-duration:'+(3+i%4)+'s" d="M'+(20+i*47%380)+' '+(20+i*31%120)+' l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z" fill="#ffd84d"/>'; }).join('')+'<circle cx="330" cy="60" r="30" fill="#fff3c4"/>'; }
function room(dark){ return '<rect width="400" height="300" fill="'+(dark?'#3a2a58':'#ffe1f0')+'"/><rect y="220" width="400" height="80" fill="'+(dark?'#5a4470':'#d9b184')+'"/><path d="M0 240 H400 M0 260 H400 M0 280 H400" stroke="'+(dark?'#4a3560':'#c79b6d')+'" stroke-width="3"/><rect x="250" y="40" width="110" height="80" rx="8" fill="'+(dark?'#1a0f33':'#bfeaff')+'" stroke="#201540" stroke-width="5"/><path d="M305 40 v80 M250 80 h110" stroke="#201540" stroke-width="5"/>'+(dark?'<circle cx="330" cy="62" r="12" fill="#fff3c4"/>':'')+'<rect x="30" y="150" width="120" height="70" rx="10" fill="#8b3dff" stroke="#201540" stroke-width="5"/><rect x="24" y="120" width="30" height="100" rx="8" fill="#7f3fd6" stroke="#201540" stroke-width="5"/><rect x="60" y="160" width="60" height="26" rx="10" fill="#fff" stroke="#201540" stroke-width="4"/>'; }
var TOYS={ball:'<circle r="16" fill="#ff4d9d" stroke="#201540" stroke-width="4"/><path d="M0 -16 a16 16 0 0 1 0 32 a9 16 0 0 1 0 -32z" fill="#17c7e8"/><circle r="16" fill="none" stroke="#201540" stroke-width="4"/><circle cx="-4" cy="-4" r="3" fill="#201540"/><circle cx="6" cy="-4" r="3" fill="#201540"/><path d="M-4 5 q5 5 10 0" stroke="#201540" stroke-width="2.5" fill="none"/>',
  block:'<rect x="-15" y="-15" width="30" height="30" rx="6" fill="#ffc53d" stroke="#201540" stroke-width="4"/><text y="8" text-anchor="middle" font-family="Fredoka" font-size="20" font-weight="700" fill="#201540">P</text>',
  bear:'<circle cy="6" r="14" fill="#c9884a" stroke="#201540" stroke-width="4"/><circle cy="-12" r="11" fill="#c9884a" stroke="#201540" stroke-width="4"/><circle cx="-9" cy="-20" r="5" fill="#c9884a" stroke="#201540" stroke-width="3"/><circle cx="9" cy="-20" r="5" fill="#c9884a" stroke="#201540" stroke-width="3"/><circle cx="-4" cy="-13" r="2" fill="#201540"/><circle cx="4" cy="-13" r="2" fill="#201540"/><path d="M-3 -7 q3 3 6 0" stroke="#201540" stroke-width="2" fill="none"/>',
  bunny:'<circle cy="6" r="13" fill="#fff" stroke="#201540" stroke-width="4"/><circle cy="-12" r="10" fill="#fff" stroke="#201540" stroke-width="4"/><ellipse cx="-5" cy="-28" rx="3.5" ry="10" fill="#fff" stroke="#201540" stroke-width="3"/><ellipse cx="5" cy="-28" rx="3.5" ry="10" fill="#fff" stroke="#201540" stroke-width="3"/><circle cx="-4" cy="-13" r="2" fill="#201540"/><circle cx="4" cy="-13" r="2" fill="#201540"/>',
  car:'<rect x="-18" y="-6" width="36" height="14" rx="5" fill="#17c7e8" stroke="#201540" stroke-width="4"/><path d="M-10 -6 l4 -8 h12 l4 8" fill="#a3ecfa" stroke="#201540" stroke-width="3"/><circle cx="-10" cy="10" r="5" fill="#201540"/><circle cx="10" cy="10" r="5" fill="#201540"/><circle cx="4" cy="-10" r="2" fill="#201540"/>',
  duck:'<ellipse cy="4" rx="16" ry="11" fill="#ffd84d" stroke="#201540" stroke-width="4"/><circle cx="10" cy="-10" r="9" fill="#ffd84d" stroke="#201540" stroke-width="4"/><path d="M18 -8 l10 3 -10 3z" fill="#ff8a3d" stroke="#201540" stroke-width="2.5"/><circle cx="12" cy="-12" r="2.5" fill="#201540"/>'};
function toy(kind,x,y,extra){ return '<g class="hot '+(extra||'')+'" data-toy="'+kind+'" transform="translate('+x+','+y+')">'+TOYS[kind]+'</g>'; }
function toybox(x,y,open){ return '<g id="tbox" transform="translate('+x+','+y+')"><rect x="-40" y="-30" width="80" height="44" rx="6" fill="#ff4d9d" stroke="#201540" stroke-width="5"/><rect x="-44" y="'+(open?'-62':'-40')+'" width="88" height="14" rx="5" fill="#c41f6c" stroke="#201540" stroke-width="5" transform="'+(open?'rotate(-30 -44 -40)':'')+'"/><text y="2" text-anchor="middle" font-family="Fredoka" font-size="16" font-weight="700" fill="#fff">TOYS</text></g>'; }
function bike(x,y,rider,cls){ return '<g class="'+(cls||'')+'" transform="translate('+x+','+y+')"><g class="wheel" style="transform-origin:-30px 20px"><circle cx="-30" cy="20" r="22" fill="none" stroke="#201540" stroke-width="6"/><path d="M-30 -2 v44 M-52 20 h44" stroke="#201540" stroke-width="3"/></g><g class="wheel" style="transform-origin:30px 20px"><circle cx="30" cy="20" r="22" fill="none" stroke="#201540" stroke-width="6"/><path d="M30 -2 v44 M8 20 h44" stroke="#201540" stroke-width="3"/></g><circle cx="-30" cy="20" r="6" fill="#ffc53d"/><circle cx="30" cy="20" r="6" fill="#ffc53d"/><path d="M-30 20 L-8 -12 L22 -12 L30 20 M-8 -12 L2 20 L30 20 M-8 -12 L-14 -22 M22 -12 L26 -26" stroke="#ff4d9d" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-20 -22 q-8 -6 -10 -14 M22 -26 l8 -6" stroke="#ff4d9d" stroke-width="4" fill="none"/>'+(rider?phoenix(-2,-42,.5,'happy','x'):'')+'</g>'; }
function badge(x,y,e){ return '<g class="bob" transform="translate('+x+','+y+')"><circle r="24" fill="#fff" stroke="#201540" stroke-width="4"/><text y="10" text-anchor="middle" font-size="26">'+e+'</text></g>'; }
function bug(x,y,i){ return '<g class="hot hop" data-toy="bug" style="animation-delay:-'+(i*.3)+'s" transform="translate('+x+','+y+')"><ellipse rx="11" ry="8" fill="#9be07a" stroke="#201540" stroke-width="3"/><circle cx="-4" cy="-2" r="2.5" fill="#201540"/><circle cx="4" cy="-2" r="2.5" fill="#201540"/><path d="M-3 3 q3 3 6 0" stroke="#201540" stroke-width="2" fill="none"/><path d="M-8 -8 l-3 -6 M8 -8 l3 -6" stroke="#201540" stroke-width="2"/></g>'; }

/* ───────────── STORIES ───────────── */
var BOOKS=[
 { id:'toys', title:'The Great Toy Rebellion', em:'🧸', c:'#ff4d9d', lesson:'Taking care of your things',
   say:['I take care of my things.','A clean room is a calm brain.','I finish what I start.'],
   note:'This story reframes tidying from a chore into caring for friends — that is the switch that makes a young child WANT to do it. Tonight, try the ten-things game with a real song on. Your voice makes it stick.',
   pages:[
    {art:function(){ return room()+toy('ball',200,200)+toy('duck',300,205)+toy('block',150,240)+toy('bear',330,250)+toy('bunny',90,260)+toy('car',240,270)+phoenix(200,110,.6,'wow'); },
     txt:'Princess Phoenix Sparkles opened her bedroom door and… <b>WHOA.</b> Toys. Everywhere. A duck under the bed. A car on the pillow. "Who did this?" she asked. (It was her.)',
     hot:{ball:'That is my bouncy ball! He looks worried.',duck:'Quackers the duck. Under the bed since Tuesday.',block:'My P block. P is for Phoenix.',bear:'Buttons! I lost you.',bunny:'Snowdrop, why are you in the corner?',car:'Vroom. Wrong parking spot.'}},
    {art:function(){ return room(true)+toy('ball',200,200,'shake')+toy('duck',300,205,'shake')+toy('bear',330,250,'shake')+toy('bunny',90,260,'shake')+'<text class="flt" x="250" y="170" font-size="20" fill="#fff">…psst…</text>'; },
     txt:'That night, the toys <b>woke up</b>. "I can\u2019t find anyone!" cried the ball. "Buttons is under the bed. Snowdrop is in the corner. We are all alone!" Everybody was sad. Tap them. Listen.',
     hot:{ball:'I miss Buttons. I can\u2019t find him in all this mess.',duck:'It is dark under here. And dusty.',bear:'Is anybody there? Hello?',bunny:'I have been in this corner for three days.'}},
    {art:function(){ return room()+toybox(330,210,true)+toy('ball',200,200)+toy('duck',300,205)+toy('block',150,240)+toy('bear',110,250)+toy('bunny',90,200)+toy('car',240,270)+phoenix(200,100,.55,'sad')+wormy(60,120,.6); },
     txt:'In the morning, Phoenix found a tiny note: <b>"We miss each other. Love, the toys."</b> Her ears drooped. "I never thought about it like that." Wormy wiggled over. "Put on a song. Ten things. Dance between. <b>Tap each toy to send it home!</b>"',
     hot:{ball:'ONE! Into the box.',duck:'TWO! Quackers is home.',block:'THREE! Stacked.',bear:'FOUR! Buttons is back with his friends.',bunny:'FIVE! Snowdrop, out of the corner!',car:'SIX! Parked.'},cleanup:true},
    {art:function(){ return room()+toybox(330,210,false)+phoenix(160,130,.7)+wormy(60,190,.6)+'<g class="hop" style="animation-duration:1.4s"><text x="330" y="170" text-anchor="middle" font-size="22">🎉</text></g><g class="flt"><text x="250" y="90" font-size="30">✨</text><text x="120" y="60" font-size="24">✨</text></g>'; },
     txt:'The song ended and she looked around. The floor! She could <b>see the floor!</b> And from inside the toy box came a very small, very happy sound. All of them. Together. Her whole body felt lighter.',
     hot:{}},
    {art:function(){ return room()+toybox(330,210,false)+phoenix(200,140,.75)+badge(90,80,'🏆'); },
     txt:'"That is the secret," said Wormy. "Taking care of your things is taking care of <b>your friends</b>. And you did it. Not somebody else. You." Phoenix bowed to her clean room. "You are welcome, everybody."',
     hot:{}}
   ]},
 { id:'kevin', title:'Kevin\u2019s Glitter', em:'🐉', c:'#c94dff', lesson:'Kindness is strength',
   say:['Kind is strong.','My words can make someone\u2019s day.','I choose kind.'],
   note:'Kindness grows fastest when a child SEES it change someone\u2019s feelings. This week, when your child is kind, narrate the effect out loud: "Look at her face — you did that." Naming the impact teaches them their words have power.',
   pages:[
    {art:function(){ return meadow()+bigDragon(90,190,'#3fa855','shake')+bigDragon(320,200,'#ff8a3d','shake')+kevin(210,220,.6,'sad')+'<g class="hot" data-toy="fire"><path class="flt" d="M120 140 q20 -30 10 -50 q14 20 4 44z" fill="#ff8a3d"/><path class="flt" d="M300 150 q20 -30 10 -50 q14 20 4 44z" fill="#ff8a3d"/></g>'; },
     txt:'Every dragon on Dragon Hill breathed <b>fire</b>. Big orange whooshes. Except Kevin. When Kevin breathed out… <b>glitter</b> came out. The big dragons laughed so hard the hill shook. "Glitter? What is glitter even FOR?"',
     hot:{fire:'WHOOSH. Fire. Very impressive. Very hot. Kevin could not do that.'}},
    {art:function(){ return meadow()+kevin(120,200,.65,'sad')+phoenix(300,200,.6,'sad')+'<ellipse cx="300" cy="270" rx="90" ry="18" fill="#5fb8e8" opacity=".8"/><text class="hot flt" data-toy="tear" x="300" y="150" font-size="26">💧</text>'; },
     txt:'Kevin went to sit by the pond, where nobody would laugh. But someone was already there. Princess Phoenix, crying. "My crown fell in the water," she sniffed. "It floated away. It is <b>gone forever.</b>"',
     hot:{tear:'A tear. Even princesses cry. Even dragons.'}},
    {art:function(){ return meadow()+kevin(120,200,.65)+phoenix(300,200,.6,'wow')+'<ellipse cx="300" cy="270" rx="90" ry="18" fill="#5fb8e8" opacity=".8"/><g class="hot" data-toy="glit" id="glitG"></g>'; },
     txt:'Kevin did not know what to say. Fire would not help. So he did the only thing he could. He took a big breath… and <b>breathed glitter</b> all over her. Sparkles on her ears. Her nose. Her whiskers. <b>Tap Kevin!</b>',
     hot:{glit:'Sparkles everywhere! Phoenix could not help it. She giggled.'},anim:function(svg){ var g=svg.querySelector('#glitG'); for(var i=0;i<16;i++){ var p=E('path',{'class':'flt',style:'animation-duration:'+(2+i%3)+'s',d:'M'+(170+i*9)+' '+(150-(i*13)%50)+' l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z',fill:['#fff','#ffd84d','#ff9ec2','#a3ecfa'][i%4]},g); } }},
    {art:function(){ return meadow()+kevin(120,200,.65)+phoenix(300,200,.6)+'<g class="hot bob" data-toy="crown" transform="translate(210,90)"><path d="M-24 10 l6 -22 8 14 10 -22 10 22 8 -14 6 22z" fill="#ffd84d" stroke="#c9a01a" stroke-width="3" stroke-linejoin="round"/><path class="flt" d="M-30 -10 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z" fill="#fff"/></g><path d="M210 110 q4 -50 0 -80" stroke="#8a5a33" stroke-width="10" fill="none"/><circle cx="210" cy="30" r="34" fill="#6bc972"/>'; },
     txt:'"You made me laugh," Phoenix said. "I forgot to be sad for a whole minute." Then she looked up. Her crown was in a tree, <b>sparkling</b>. It had never floated away at all. "Kevin. You are the kindest dragon I have ever met."',
     hot:{crown:'The crown was there the whole time. She could not see it through the tears.'}},
    {art:function(){ return night()+kevin(200,190,.8)+badge(320,90,'💖')+badge(80,90,'✨'); },
     txt:'Kevin walked home taller. Fire was loud. Fire was hot. But fire never made anybody <b>laugh</b>. Glitter was not nothing. Glitter was kind. And kind, it turned out, was the strongest thing a dragon could be.',
     hot:{}}
   ]},
 { id:'yet', title:'The Magic Word', em:'🚲', c:'#17c7e8', lesson:'Trying hard things',
   say:['I can\u2019t do it… YET.','My brain grows when it is hard.','I keep going.'],
   note:'Adding "yet" turns a verdict into a status update. Kids who hear it consistently take on harder tasks and recover faster from failure. When your child says "I can\u2019t," try answering only "…yet," and wait. The word does the work.',
   pages:[
    {art:function(){ return meadow()+'<rect y="230" width="400" height="70" fill="#8a8a8a"/><path d="M0 265 H400" stroke="#fff" stroke-width="4" stroke-dasharray="24 18"/><path d="M0 230 H400" stroke="#4fbb63" stroke-width="14"/>'+bike(200,205,false,'bob')+phoenix(90,180,.6,'wow'); },
     txt:'It was pink. It had a bell. It had streamers. It was the most beautiful bike in the whole world, and Princess Phoenix Sparkles had <b>no idea</b> how to ride it.',
     hot:{}},
    {art:function(){ return meadow()+'<rect y="230" width="400" height="70" fill="#8a8a8a"/><path d="M0 265 H400" stroke="#fff" stroke-width="4" stroke-dasharray="24 18"/><path d="M0 230 H400" stroke="#4fbb63" stroke-width="14"/><g class="hot" data-toy="try" id="tryG">'+bike(200,205,true)+'</g><text id="bonk" x="120" y="120" font-size="30" opacity="0">💥</text>'; },
     txt:'She got on. She fell off. She got on. She fell off. <b>Tap the bike to try again</b>… "I CAN\u2019T DO IT," she shouted, and threw her helmet in the grass.',
     hot:{try:'Wobble… wobble… BONK.'},anim:function(svg){ var g=svg.querySelector('#tryG'), b=svg.querySelector('#bonk'), n=0; g.addEventListener('click',function(){ n++; g.style.transition='transform .6s ease-in'; g.style.transformOrigin='200px 226px'; g.style.transform='rotate(-38deg) translateX(-20px)'; b.style.opacity='1'; setTimeout(function(){ g.style.transition='transform .4s'; g.style.transform=''; b.style.opacity='0'; },900); if(n===3) say('That is three falls. Everybody falls three times. At least.'); }); }},
    {art:function(){ return meadow()+'<rect y="230" width="400" height="70" fill="#8a8a8a"/><path d="M0 230 H400" stroke="#4fbb63" stroke-width="14"/>'+bike(300,205,false)+phoenix(120,190,.6,'sad')+wormy(200,120,.7)+'<g class="hot bob" data-toy="brain" transform="translate(60,70)"><ellipse rx="26" ry="20" fill="#ff9ec2" stroke="#201540" stroke-width="4"/><path d="M-14 -10 q6 10 0 20 M0 -16 q6 10 0 20 M14 -10 q6 10 0 20" stroke="#201540" stroke-width="3" fill="none"/></g>'; },
     txt:'Wormy crawled onto her shoe. "You can\u2019t do it," Wormy agreed. Phoenix blinked. "…<b>yet.</b>" said Wormy. "You can\u2019t do it YET. Every fall is a brick. Your brain is building the bike-riding part right now."',
     hot:{brain:'Your brain grows when things are hard. Like a muscle. Every fall made it bigger.'}},
    {art:function(){ return meadow()+'<rect y="230" width="400" height="70" fill="#8a8a8a"/><path d="M0 265 H400" stroke="#fff" stroke-width="4" stroke-dasharray="24 18"/><path d="M0 230 H400" stroke="#4fbb63" stroke-width="14"/><g class="hot" data-toy="ride" id="rideG">'+bike(120,205,true)+'</g><text class="flt" x="60" y="130" font-size="26">💨</text>'; },
     txt:'So she said it out loud. "I can\u2019t do it <b>yet</b>." She got back on. Wobble. Wobble. Wobble… and then… <b>no wobble.</b> Tap the bike!',
     hot:{ride:'She is RIDING! Look at her go! Wheeeee!'},anim:function(svg){ var g=svg.querySelector('#rideG'); g.addEventListener('click',function(){ g.style.transition='transform 2.4s cubic-bezier(.3,0,.7,1)'; g.style.transform='translateX(420px)'; setTimeout(function(){ g.style.transition='none'; g.style.transform='translateX(-260px)'; setTimeout(function(){ g.style.transition='transform 2.4s cubic-bezier(.3,0,.7,1)'; g.style.transform='translateX(0)'; },50); },2500); }); }},
    {art:function(){ return night()+phoenix(200,170,.85)+badge(320,80,'🚲')+badge(80,80,'🧠'); },
     txt:'That night Phoenix thought about all the things she couldn\u2019t do. Tie her shoes. Read big books. Whistle. Then she smiled, and added one word to every single one. <b>Yet.</b>',
     hot:{}}
   ]},
 { id:'bugs', title:'The Sugar Bug Sleepover', em:'🦷', c:'#3fe0a4', lesson:'Taking care of your body',
   say:['My body is my home.','I take care of me.','Strong, clean, rested — that is me!'],
   note:'Routines stick better when a child feels ownership — "my body, my job" — instead of compliance. This week, let your child be the boss of one routine (you are the assistant). Ownership beats reminders.',
   pages:[
    {art:function(){ return room()+phoenix(200,140,.75,'wow')+'<g class="hot" data-toy="mirror" transform="translate(320,120)"><ellipse rx="34" ry="44" fill="#e8f6ff" stroke="#c9a01a" stroke-width="8"/><text y="10" text-anchor="middle" font-size="30">😬</text></g>'; },
     txt:'Phoenix smiled her biggest smile in the mirror. Something was… <b>fuzzy</b>. On her teeth. "Sugar bugs," whispered the mirror. "They had a sleepover. On you." (Mirrors talk in Phoenix\u2019s World. It is a whole thing.)',
     hot:{mirror:'The mirror says: sugar bugs LOVE cookies, and they never clean up after themselves.'}},
    {art:function(){ return '<rect width="400" height="300" fill="#ffe1f0"/><path d="M40 120 q160 -90 320 0 q-20 120 -160 130 q-140 -10 -160 -130z" fill="#fff" stroke="#201540" stroke-width="5"/><path d="M60 130 h280" stroke="#e8d8f0" stroke-width="3"/>'+bug(120,150,0)+bug(200,140,1)+bug(280,150,2)+bug(160,200,3)+bug(240,205,4)+'<g class="bob" transform="translate(340,60)"><rect x="-6" y="-40" width="12" height="80" rx="6" fill="#ff4d9d" stroke="#201540" stroke-width="4"/><rect x="-10" y="-46" width="20" height="22" rx="4" fill="#fff" stroke="#201540" stroke-width="3"/></g>'; },
     txt:'Five sugar bugs, bouncing on her teeth like a trampoline. "Two whole minutes," said Phoenix. "That is one whole song." She grabbed her toothbrush. <b>Tap each bug to scrub it away!</b>',
     hot:{bug:'SCRUB! One sugar bug, packing its bags.'},cleanup:true},
    {art:function(){ return room()+phoenix(200,140,.75)+'<g class="hot" data-toy="bubble"><circle class="flt" cx="300" cy="90" r="18" fill="#a3ecfa" opacity=".7" stroke="#fff" stroke-width="3"/><circle class="flt" cx="330" cy="140" r="12" fill="#a3ecfa" opacity=".7" stroke="#fff" stroke-width="3"/><circle class="flt" cx="90" cy="100" r="15" fill="#a3ecfa" opacity=".7" stroke="#fff" stroke-width="3"/></g>'; },
     txt:'Then hands. Soap, water, and the <b>whole ABC song</b> while she scrubbed. Germs are too small to see, but soap makes them slide right off. Pop the bubbles!',
     hot:{bubble:'Pop! Clean hands, ready for anything.'}},
    {art:function(){ return room()+'<g class="hot" data-toy="plate" transform="translate(300,200)"><circle r="40" fill="#fff" stroke="#201540" stroke-width="4"/><text y="10" text-anchor="middle" font-size="34">🥕🍎</text></g>'+phoenix(150,150,.7)+'<g class="hot bob" data-toy="water" transform="translate(70,200)"><path d="M-14 -30 h28 l-4 60 h-20z" fill="#bfeaff" stroke="#201540" stroke-width="4"/><path d="M-11 -10 h22 l-3 38 h-16z" fill="#4fb8ff"/></g>'; },
     txt:'Dinner: carrots, which help your eyes, and apples, which help everything. And <b>water</b>. The best drink in the whole world. Even better than chocolate milk. Do not tell the milk.',
     hot:{plate:'Crunch! Carrots help you see in the dark. Kind of.',water:'Glug glug. Your body is mostly water!'}},
    {art:function(){ return night()+'<rect x="60" y="180" width="280" height="80" rx="16" fill="#8b3dff" stroke="#201540" stroke-width="5"/><rect x="80" y="150" width="240" height="50" rx="14" fill="#ff8ad1" stroke="#201540" stroke-width="5"/>'+phoenix(200,140,.6)+'<text class="flt" x="270" y="110" font-size="28" fill="#fff">z</text><text class="flt" x="300" y="80" font-size="22" fill="#fff">z</text>'; },
     txt:'And the most important part. <b>Sleep.</b> Ten whole hours. While she slept, her brain sorted the whole day and filed it away, like a tiny librarian. The sugar bugs did not come back. Goodnight, Phoenix.',
     hot:{}}
   ]}
];

/* ───────────── THE BOOK ───────────── */
var mount=$('storyMount'); if(!mount) return; mount.classList.add('filled');
mount.innerHTML='<div class="bookshelf" id="shelfBooks"></div><div class="book" id="book"></div><div class="bnav" id="bnav"></div>';
var shelfEl=$('shelfBooks'), bookEl=$('book'), nav=$('bnav'), cur=null, pg=0, sayDone={}, turning=false;
BOOKS.forEach(function(b,i){ var s=H('button',{type:'button','class':'spine','aria-pressed':'false'},shelfEl); s.style.background='linear-gradient(180deg,'+b.c+','+b.c+'cc)'; s.innerHTML='<span>'+b.title+'</span><span class="em">'+b.em+'</span><span style="font-size:13px;opacity:.9">'+b.lesson+'</span>'; s.addEventListener('click',function(){ open(i); }); });
function wide(){ return window.innerWidth>760; }
function total(){ return cur.pages.length+3; }
function pageHTML(b,idx,side){ var n=idx+1,T=total(),last=idx>=T-1;
  var nxt=(!last&&(side==='r'||!wide()))?'<span class="tapnext">▶</span>':'';
  if(idx<b.pages.length){ var p=b.pages[idx]; return '<div class="page '+side+'" data-idx="'+idx+'"><div class="art"><svg viewBox="0 0 400 300">'+p.art()+'</svg></div><p class="txt">'+p.txt+'</p>'+(Object.keys(p.hot).length?'<span class="hint">👆 tap things in the picture</span>':'')+nxt+'<span class="num">'+n+' / '+T+'</span></div>'; }
  if(idx===b.pages.length){ return '<div class="page '+side+'" data-idx="'+idx+'" data-say="1"><h3 style="text-align:center;font-size:26px;margin:4px 0 8px">Say it out loud!</h3><p class="txt" style="margin:0 0 6px;text-align:center;font-size:15px">Tap each line. Say it together <b>five times</b>. Watch the dots fill up.</p>'+b.say.map(function(l,k){ return '<div class="sayline" data-k="'+k+'" role="button" tabindex="0"><span class="st">'+l+'</span><span class="dots"><i></i><i></i><i></i><i></i><i></i></span></div>'; }).join('')+nxt+'<span class="num">'+n+' / '+T+'</span></div>'; }
  if(idx===b.pages.length+1){ return '<div class="page '+side+'" data-idx="'+idx+'"><div class="art"><svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#ffe1f0"/>'+phoenix(200,160,.9)+'<g class="flt"><text x="60" y="80" font-size="34">💖</text><text x="300" y="60" font-size="30">💖</text><text x="330" y="220" font-size="26">💖</text></g></svg></div><div class="loved"><div class="big">You are so loved.</div><p class="txt" style="margin:4px 0 0">And you are more amazing than you even know. Phoenix says so, and Phoenix makes the rulz.</p></div>'+nxt+'<span class="num">'+n+' / '+T+'</span></div>'; }
  return '<div class="page '+side+'" data-idx="'+idx+'"><div class="pnote"><h4>For the grown-up 👋</h4>'+b.note+'<br><br><b>What just happened:</b> your child said three confidence sentences out loud, five times each, with you beside them. Repetition plus your voice is how a sentence becomes a belief. Same book again tomorrow works even better than a new one.</div><span class="num">'+n+' / '+T+'</span></div>'; }
function render(){ var b=cur,T=total(); clear(bookEl); var cov=H('div',{'class':'cover'},bookEl); cov.style.setProperty('--bookc',b.c);
  if(wide()){ var li=pg-(pg%2),ri2=li+1; cov.innerHTML=(li<T?pageHTML(b,li,'l'):'<div class="page l"></div>')+(ri2<T?pageHTML(b,ri2,'r'):'<div class="page r"></div>'); } else cov.innerHTML=pageHTML(b,pg,'l');
  wire(cov); renderNav(); }
function wire(root){
  root.querySelectorAll('.page').forEach(function(page){ var idx=+page.dataset.idx; if(isNaN(idx)) return;
    if(idx<cur.pages.length&&cur.pages[idx].anim){ var svg=page.querySelector('svg'); try{ cur.pages[idx].anim(svg); }catch(e){} }
    page.addEventListener('click',function(e){ if(e.target.closest('.art,.sayline,.pnote')) return; if(page.classList.contains('r')||!wide()) turn(1); else turn(-1); }); });
  root.querySelectorAll('.hot').forEach(function(h){ h.addEventListener('click',function(e){ e.stopPropagation(); var page=h.closest('.page'),idx=+page.dataset.idx,p=cur.pages[idx],key=h.dataset.toy,line=p.hot[key]; if(!line) return;
    h.classList.remove('wob'); void h.getBoundingClientRect(); h.classList.add('wob'); SND.pop(); say(line); var r=h.getBoundingClientRect(); P.sparkleAt(r.left+r.width/2,r.top+r.height/2,10);
    if(p.cleanup){ var box=page.querySelector('#tbox'); h.style.transition='transform .7s cubic-bezier(.4,-.4,.6,1.4),opacity .3s .5s';
      if(box){ var bb=box.getBoundingClientRect(),hb=h.getBoundingClientRect(); var sc=page.querySelector('.art svg').getBoundingClientRect().width/400; h.style.transform='translate('+((bb.left+bb.width/2)-(hb.left+hb.width/2))/sc+'px,'+((bb.top)-(hb.top+hb.height/2))/sc+'px) rotate(360deg) scale(.4)'; } else h.style.transform='translateY(-160px) scale(.2)';
      h.style.opacity='0'; setTimeout(function(){ h.remove(); },900);
      var left=page.querySelectorAll('.hot').length-1; if(left<=0) setTimeout(function(){ say(p.hot.bug?'All the sugar bugs are gone! Sparkly teeth!':'Everybody is home! Turn the page.'); SND.win(); P.confetti(40); },900); } }); });
  root.querySelectorAll('.sayline').forEach(function(l){ var k=l.dataset.k,key=cur.id+k; sayDone[key]=sayDone[key]||0; paintDots(l,sayDone[key]);
    function hit(e){ if(e) e.stopPropagation(); if(sayDone[key]>=5) return; sayDone[key]++; paintDots(l,sayDone[key]); say(cur.say[k]); SND.tone(440+sayDone[key]*60,0.2,'sine',0.09); if(sayDone[key]>=5){ l.classList.add('done'); SND.win(); var r=l.getBoundingClientRect(); P.sparkleAt(r.left+r.width/2,r.top+r.height/2,16); var all=cur.say.every(function(_,i){ return sayDone[cur.id+i]>=5; }); if(all) setTimeout(function(){ say('You said them all. Five times each. That is how a brain learns something is true.'); P.confetti(80); },500); } }
    l.addEventListener('click',hit); l.addEventListener('keydown',function(e){ if(e.key===' '||e.key==='Enter'){ hit(e); e.preventDefault(); } }); });
  /* swipe */ var sx=null; root.addEventListener('pointerdown',function(e){ sx=e.clientX; }); root.addEventListener('pointerup',function(e){ if(sx===null) return; var dx=e.clientX-sx; sx=null; if(Math.abs(dx)>70&&!e.target.closest('.art,.sayline')){ turn(dx<0?1:-1); } });
}
function paintDots(l,n){ l.querySelectorAll('.dots i').forEach(function(d,i){ d.classList.toggle('on',i<n); }); }
function renderNav(){ var T=total(),step=wide()?2:1; nav.innerHTML='';
  var prev=H('button',{type:'button','class':'bbtn wh',text:'◀ Back'},nav); prev.disabled=pg<=0; prev.addEventListener('click',function(){ turn(-1); });
  H('span',{'class':'bprog',text:cur.title+' · page '+(pg+1)+' of '+T},nav);
  var next=H('button',{type:'button','class':'bbtn pk',text:'Turn the page ▶'},nav); next.disabled=pg+step>=T; next.addEventListener('click',function(){ turn(1); });
  var read=H('button',{type:'button','class':'bbtn mt',text:'🔊 Read to me'},nav); read.addEventListener('click',function(){ var t=[].map.call(bookEl.querySelectorAll('.page .txt'),function(p){ return p.textContent; }).join(' '); say(t.replace(/\s+/g,' ')); SND.tap(); });
  var sh=H('button',{type:'button','class':'bbtn',text:'📚 Bookshelf'},nav); sh.addEventListener('click',function(){ cur=null; clear(bookEl); nav.innerHTML=''; shelfEl.querySelectorAll('.spine').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); SND.whoosh(); }); }
function turn(dir){ if(turning||!cur) return; var T=total(),step=wide()?2:1,next=Math.max(0,Math.min(T-1,pg+dir*step)); if(dir>0&&pg+step>=T) return; if(next===pg) return;
  turning=true; SND.noise(0.25,0.06,3000); var cov=bookEl.querySelector('.cover'); if(cov&&!P.REDUCED){ cov.classList.add(dir>0?'turnf':'turnb'); setTimeout(function(){ pg=next; render(); turning=false; },420); } else { pg=next; render(); turning=false; } }
function open(i){ cur=BOOKS[i]; pg=0; shelfEl.querySelectorAll('.spine').forEach(function(x,k){ x.setAttribute('aria-pressed',k===i?'true':'false'); }); SND.ding(); say(cur.title); render(); bookEl.scrollIntoView({behavior:'smooth',block:'center'}); }
var rt; window.addEventListener('resize',function(){ if(!cur) return; clearTimeout(rt); rt=setTimeout(render,200); });
setInterval(function(){ if(D.hidden||D.body.classList.contains('calm')) return; var faces=bookEl.querySelectorAll('.brth'); if(!faces.length) return; var f=pick([].slice.call(faces)); f.style.transition='transform .1s'; f.style.transform='scaleY(.92)'; setTimeout(function(){ f.style.transform=''; },120); },2600);
})();
