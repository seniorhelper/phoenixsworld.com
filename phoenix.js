/* ═══════════════════════════════════════════════════════════════════
   PHOENIX'S WORLD — phoenix.js  (v2)
   Princess Phoenix Sparkles.

   THE FLOW
   1. She appears BIG, full body, centre of the screen, waving, with a
      hello bubble — for 3 seconds so a child can actually see her.
   2. A rainbow draws in across the screen. She hops on and slides down
      it (SVG motion path, real speed curve, sparkle trail).
   3. POOF — a swirl of sparkles — and she shrinks into a small full-body
      Phoenix standing on the RIGHT edge with a speech bubble over her
      head that changes every few seconds ("Tap me to play a word game!").
   4. The chat only opens when they TAP her. Close (X) = she hops on the
      unicorn, gallops a lap, dives into a black portal. A tab on the
      right edge — "Bring Phoenix back" — returns her any time.

   IN THE CHAT
   · 70-topic knowledge base, "why?" chains, session memory.
   · GAMES: Rhyme Time, Spell It, Guess the Animal, Riddles, Would You
     Rather, Quick Math, Simon Says (with the page!).
   · Every few turns she asks for an affirmation out loud, with an
     "I said it!" button that celebrates. Confidence is built in.

   Her face is the drawn cat face (the one you liked). Set USE_PHOTO to
   true to overlay the face photos instead. No PII anywhere in here.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var D=document, NS='http://www.w3.org/2000/svg', P=window.PW||{};
function E(t,a,p){var e=D.createElementNS(NS,t);if(a)for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
function H(t,a,p){var e=D.createElement(t);if(a)for(var k in a){if(k==='html')e.innerHTML=a[k];else if(k==='text')e.textContent=a[k];else e.setAttribute(k,a[k]);}if(p)p.appendChild(e);return e;}
function rnd(a,b){return a+Math.random()*(b-a);} function ri(a,b){return Math.floor(rnd(a,b+1));} function pick(a){return a[Math.floor(Math.random()*a.length)];}
var SND=P.SND||{on:true}; function snd(n){ if(SND[n]) SND[n](); }
var USE_PHOTO=false; var FACES={happy:'/images/face-happy.jpg',talk:'/images/face-talk.jpg',silly:'/images/face-silly.jpg'};
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

H('style',{html:
'#pxStage{position:fixed;inset:0;z-index:2300;pointer-events:none;overflow:hidden}#pxStage svg{width:100%;height:100%;display:block}'+
'#pxBig{position:fixed;inset:0;z-index:2350;display:none;align-items:flex-start;justify-content:center;padding-top:clamp(120px,22vh,220px);pointer-events:none;background:radial-gradient(circle at 50% 40%,rgb(255 255 255/.35),rgb(255 230 245/.0) 60%)}'+
'#pxBig.on{display:flex}#pxBig svg{height:min(56vh,520px);width:auto;filter:drop-shadow(0 16px 0 rgb(32 21 64/.25));animation:pxin .7s cubic-bezier(.3,1.5,.5,1)}'+
'@keyframes pxin{from{transform:scale(.2) rotate(-20deg);opacity:0}to{transform:scale(1);opacity:1}}'+
'#pxBigBub{position:absolute;top:2vh;left:50%;transform:translateX(-50%);width:min(92vw,620px);padding:14px 20px;border:6px solid #201540;border-radius:26px;background:#fff;font:700 clamp(16px,3.4vw,24px)/1.3 "Fredoka",sans-serif;color:#201540;text-align:center;box-shadow:0 8px 0 rgb(32 21 64/.25);animation:pxin .6s .3s both cubic-bezier(.3,1.5,.5,1)}'+
'#pxBigBub::after{content:"";position:absolute;left:50%;bottom:-24px;margin-left:-14px;border:14px solid transparent;border-top-color:#201540}'+
'#pxMini{position:fixed;right:10px;bottom:14px;z-index:2380;width:clamp(96px,16vw,150px);cursor:pointer;border:0;background:none;padding:0;display:none;filter:drop-shadow(0 10px 0 rgb(32 21 64/.25))}'+
'#pxMini.on{display:block}#pxMini svg{width:100%;height:auto;display:block;overflow:visible}#pxMini .body{transform-box:fill-box;transform-origin:50% 100%;animation:pxbreathe 4.2s ease-in-out infinite}'+
'@keyframes pxbreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.03,1.05)}}#pxMini:active svg{transform:scale(.94)}'+
'#pxBub{position:fixed;right:56px;bottom:calc(14px + clamp(96px,16vw,150px) * 1.22);z-index:2381;max-width:min(78vw,280px);padding:11px 15px;border:5px solid #201540;border-radius:20px;background:#fff;'+
 'font:800 15px/1.35 "Nunito",sans-serif;color:#201540;box-shadow:0 6px 0 rgb(32 21 64/.22);display:none;cursor:pointer;animation:pxin .4s cubic-bezier(.3,1.5,.5,1)}'+
'#pxBub.on{display:block}#pxBub::after{content:"";position:absolute;right:38px;bottom:-22px;border:12px solid transparent;border-top-color:#201540}'+
'#pxCard{position:fixed;right:12px;bottom:12px;z-index:2400;width:min(94vw,390px);max-height:78vh;display:flex;flex-direction:column;border:6px solid #201540;border-radius:28px;background:#fff;box-shadow:0 14px 0 rgb(32 21 64/.3);'+
 'transform:translateY(120%) scale(.9);opacity:0;transition:transform .5s cubic-bezier(.3,1.4,.5,1),opacity .4s;font:800 16px/1.45 "Nunito",system-ui,sans-serif;color:#201540}'+
'#pxCard.on{transform:none;opacity:1}'+
'#pxHead{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:5px solid #201540;background:linear-gradient(90deg,#ff9ed2,#c58cff);border-radius:22px 22px 0 0}'+
'#pxHead .who{flex:1;font:700 18px/1.1 "Fredoka",sans-serif;color:#fff;text-shadow:0 2px 0 #201540}#pxHead .who small{display:block;font:800 12px/1.2 "Nunito",sans-serif;color:#201540;text-shadow:none;margin-top:3px}'+
'#pxAv{width:54px;height:54px;flex:0 0 auto}#pxAv svg{width:100%;height:100%;display:block;overflow:visible}'+
'#pxClose{width:50px;height:50px;border:5px solid #201540;border-radius:50%;background:#ff4d9d;color:#fff;font:700 26px/1 "Fredoka",sans-serif;cursor:pointer;box-shadow:0 5px 0 #c41f6c;flex:0 0 auto;display:grid;place-items:center;padding:0}'+
'#pxClose:active{transform:translateY(4px);box-shadow:0 1px 0 #c41f6c}'+
'#pxLog{flex:1;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:9px;scroll-behavior:smooth}'+
'.pxb{max-width:88%;padding:10px 14px;border:4px solid #201540;border-radius:18px;background:#fff3fa;box-shadow:0 4px 0 rgb(32 21 64/.18);animation:pxpop .3s cubic-bezier(.3,1.6,.5,1)}'+
'.pxb.me{align-self:flex-end;background:#e3f6ff;border-bottom-right-radius:6px}.pxb.her{align-self:flex-start;border-bottom-left-radius:6px}.pxb.aff{align-self:center;background:#fff0b3;text-align:center;max-width:96%}'+
'@keyframes pxpop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}'+
'#pxChips{display:flex;gap:7px;flex-wrap:wrap;padding:0 12px 10px}'+
'.pxc{padding:8px 13px;border:4px solid #201540;border-radius:999px;background:#ffe08a;font:700 13px/1 "Fredoka",sans-serif;color:#201540;cursor:pointer;box-shadow:0 4px 0 #c98d00}'+
'.pxc:active{transform:translateY(3px);box-shadow:0 1px 0 #c98d00}.pxc.big{background:#3fe0a4;box-shadow:0 4px 0 #18a877;font-size:16px;padding:12px 18px}'+
'#pxForm{display:flex;gap:8px;padding:0 12px 12px}#pxIn{flex:1;min-width:0;padding:11px 14px;border:4px solid #201540;border-radius:999px;font:800 16px/1 "Nunito",sans-serif;color:#201540;background:#fff}'+
'#pxSend{width:52px;height:52px;border:4px solid #201540;border-radius:50%;background:#3fe0a4;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #18a877;padding:0}'+
'#pxTag{position:fixed;right:6px;top:30vh;z-index:2380;display:none;width:clamp(64px,9vw,96px);border:0;background:none;padding:0;cursor:pointer;animation:pxbob 3.4s ease-in-out infinite;filter:drop-shadow(0 8px 0 rgb(32 21 64/.25))}'+
'#pxTag svg{width:100%;height:auto;display:block}#pxTag span{display:block;margin-top:4px;padding:5px 7px;border:3px solid #201540;border-radius:10px;background:#fff8e1;font:800 10px/1.2 "Nunito",sans-serif;color:#201540;text-align:center}'+
'#pxTag.on{display:block}@keyframes pxbob{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-14px) rotate(3deg)}}'+
'#pxMiniX{position:fixed;right:10px;bottom:calc(14px + clamp(96px,16vw,150px) * 1.18);z-index:2382;width:36px;height:36px;border:4px solid #201540;border-radius:50%;background:#ff4d9d;color:#fff;font:700 18px/1 "Fredoka",sans-serif;cursor:pointer;display:none;box-shadow:0 4px 0 #c41f6c;padding:0}'+
'#pxMiniX.on{display:block}'+
'@keyframes pxjack{0%,100%{transform:scale(1)}25%{transform:scale(1.04,.94) translateY(6px)}50%{transform:scale(.96,1.08) translateY(-14px)}75%{transform:scale(1.04,.94) translateY(6px)}}'+
'@keyframes pxstretch{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.14) translateY(-8px)}}'+
'@keyframes pxarmjack{0%,100%{transform:rotate(0)}50%{transform:rotate(-70deg)}}'+
'.pxgallop{animation:pxgallop .46s ease-in-out infinite;transform-box:fill-box;transform-origin:center 90%}@keyframes pxgallop{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-16px) rotate(2deg)}}'+
'.pxleg{transform-box:fill-box;transform-origin:50% 0;animation:pxleg .46s ease-in-out infinite}.pxleg.b{animation-delay:-.23s}.pxleg.c{animation-delay:-.12s}.pxleg.d{animation-delay:-.35s}'+
'@keyframes pxleg{0%,100%{transform:rotate(-26deg)}50%{transform:rotate(26deg)}}'+
'.pxmane{transform-box:fill-box;transform-origin:100% 0;animation:pxmane .46s ease-in-out infinite}@keyframes pxmane{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}'+
'@keyframes pxwave{0%,100%{transform:rotate(0)}50%{transform:rotate(-28deg)}}'+
'@media(max-width:640px){#pxCard{right:6px;bottom:6px;width:calc(100vw - 12px)}}'+
'@media(prefers-reduced-motion:reduce){#pxBig svg,#pxBigBub,#pxMini .body,#pxTag,.pxgallop,.pxleg,.pxmane{animation:none!important}}'
},D.head);

/* ───────────── HER SVG ───────────── */
function phoenixSVG(id){
  return '<g id="'+id+'" class="body">'+
  '<path d="M52 40 q46 -10 40 -60" fill="none" stroke="#201540" stroke-width="18" stroke-linecap="round"/><path d="M52 40 q46 -10 40 -60" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round"/>'+
  '<path d="M-52 20 q-10 60 8 88 q22 12 48 8 q26 4 46 -10 q16 -30 4 -86 z" fill="#ff8ad1" stroke="#201540" stroke-width="7" stroke-linejoin="round"/>'+
  '<path d="M-46 30 q34 14 84 0 M-50 58 q40 16 92 0 M-48 84 q40 14 92 0" stroke="#ff4d9d" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>'+
  '<ellipse cx="-26" cy="106" rx="20" ry="11" fill="#fff" stroke="#201540" stroke-width="6"/><ellipse cx="26" cy="106" rx="20" ry="11" fill="#fff" stroke="#201540" stroke-width="6"/>'+
  '<path d="M-60 34 q-30 20 -26 54" stroke="#201540" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-60 34 q-30 20 -26 54" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>'+
  '<g class="arm"><path d="M60 34 q34 -20 30 -60" stroke="#201540" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M60 34 q34 -20 30 -60" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/></g>'+
  '<path d="M-58 -48 L-70 -104 L-24 -74 Z" fill="#fff" stroke="#201540" stroke-width="7" stroke-linejoin="round"/><path d="M58 -48 L70 -104 L24 -74 Z" fill="#fff" stroke="#201540" stroke-width="7" stroke-linejoin="round"/>'+
  '<path d="M-52 -56 L-60 -90 L-30 -70 Z" fill="#ffb6ce"/><path d="M52 -56 L60 -90 L30 -70 Z" fill="#ffb6ce"/>'+
  '<circle cx="0" cy="-30" r="66" fill="#fff" stroke="#201540" stroke-width="7"/>'+
  '<path d="M-44 -78 l12 -26 12 20 12 -30 12 30 12 -20 12 26 z" fill="#ffd84d" stroke="#c9a01a" stroke-width="4" stroke-linejoin="round"/><circle cx="-32" cy="-98" r="5" fill="#ff4d9d"/><circle cx="0" cy="-108" r="6" fill="#17c7e8"/><circle cx="32" cy="-98" r="5" fill="#3fe0a4"/>'+
  '<clipPath id="'+id+'-face"><circle cx="0" cy="-26" r="50"/></clipPath>'+
  '<g class="pxDrawn"><circle cx="-24" cy="-36" r="12" fill="#17c7e8" stroke="#201540" stroke-width="4"/><circle cx="24" cy="-36" r="12" fill="#8b3dff" stroke="#201540" stroke-width="4"/><circle cx="-26" cy="-40" r="4" fill="#fff"/><circle cx="22" cy="-40" r="4" fill="#fff"/>'+
  '<rect class="lid" x="-38" y="-50" width="28" height="28" rx="14" fill="#fff" style="transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)"/><rect class="lid" x="10" y="-50" width="28" height="28" rx="14" fill="#fff" style="transform-box:fill-box;transform-origin:50% 0;transform:scaleY(0)"/>'+
  '<path d="M-7 -8 L7 -8 L0 0 Z" fill="#ff8fb8" stroke="#201540" stroke-width="3" stroke-linejoin="round"/><path class="mouth" d="M0 0 q-10 10 -20 3 M0 0 q10 10 20 3" stroke="#201540" stroke-width="4" fill="none" stroke-linecap="round"/>'+
  '<circle cx="-44" cy="-16" r="11" fill="#ff8fb8" opacity=".55"/><circle cx="44" cy="-16" r="11" fill="#ff8fb8" opacity=".55"/></g>'+
  (USE_PHOTO?'<image class="pxPhoto" href="'+FACES.happy+'" x="-50" y="-76" width="100" height="100" clip-path="url(#'+id+'-face)" preserveAspectRatio="xMidYMid slice"/>':'')+
  '<path d="M-66 -22 h-30 M-66 -10 h-32 M66 -22 h30 M66 -10 h32" stroke="#201540" stroke-width="4" stroke-linecap="round"/></g>'; }
function setFace(m){ if(!USE_PHOTO) return; D.querySelectorAll('.pxPhoto').forEach(function(i){ i.setAttribute('href',FACES[m]||FACES.happy); }); }
function wirePhoto(root){ root.querySelectorAll('.pxPhoto').forEach(function(img){ img.addEventListener('error',function(){ img.remove(); }); }); }
setInterval(function(){ if(D.hidden||reduced) return; var lids=D.querySelectorAll('#pxMini .lid,#pxBig .lid,#pxAv .lid'); if(!lids.length) return; lids.forEach(function(l){ l.style.transition='transform .1s'; l.style.transform='scaleY(1)'; }); setTimeout(function(){ lids.forEach(function(l){ l.style.transform='scaleY(0)'; }); },130); },3400);

/* ───────────── THE UNICORN — horse proportions, jointed legs, hooves, flowing mane ───────────── */
function unicornSVG(){
  function leg(x,y,cls,shade){ return '<g class="pxleg '+cls+'" transform="translate('+x+','+y+')"><path d="M0 0 q6 40 0 62" stroke="#201540" stroke-width="30" stroke-linecap="round" fill="none"/><path d="M0 0 q6 40 0 62" stroke="'+shade+'" stroke-width="20" stroke-linecap="round" fill="none"/>'+
    '<g><path d="M0 62 q-4 30 2 56" stroke="#201540" stroke-width="24" stroke-linecap="round" fill="none"/><path d="M0 62 q-4 30 2 56" stroke="'+shade+'" stroke-width="15" stroke-linecap="round" fill="none"/><path d="M-12 118 h28 q4 12 -2 16 h-26 q-6 -6 0 -16z" fill="#c9a01a" stroke="#201540" stroke-width="5" stroke-linejoin="round"/></g></g>'; }
  return '<g id="pxUni" class="pxgallop">'+
  '<g class="pxmane"><path d="M-190 -10 q-70 -20 -90 60" stroke="#ff4d9d" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M-192 4 q-60 -6 -76 62" stroke="#8b3dff" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M-194 18 q-46 6 -56 60" stroke="#17c7e8" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-196 30 q-30 14 -34 50" stroke="#ffc53d" stroke-width="7" fill="none" stroke-linecap="round"/></g>'+
  leg(-120,50,'a','#f1eefc')+leg(30,52,'c','#f1eefc')+
  '<path d="M-200 0 q-10 -60 60 -70 q80 -10 150 -20 q60 6 60 60 q-10 60 -80 66 q-100 6 -160 -6 q-36 -4 -30 -30z" fill="#fff" stroke="#201540" stroke-width="8" stroke-linejoin="round"/>'+
  '<path d="M-140 -46 q60 -20 130 -8 q10 34 -6 56 q-70 12 -130 0 q-14 -22 6 -48z" fill="#ff8ad1" stroke="#201540" stroke-width="7" stroke-linejoin="round"/><path d="M-130 -30 q60 -10 110 0" stroke="#c41f6c" stroke-width="5" fill="none"/>'+
  leg(-90,58,'b','#fff')+leg(60,60,'d','#fff')+
  '<path d="M60 -50 q30 -90 100 -130 q40 -18 66 0 q8 46 -36 74 q-50 26 -80 76z" fill="#fff" stroke="#201540" stroke-width="8" stroke-linejoin="round"/>'+
  '<g class="pxmane" style="transform-origin:0 100%"><path d="M118 -176 q-40 30 -50 100" stroke="#ff4d9d" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M104 -170 q-34 34 -42 100" stroke="#8b3dff" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M90 -160 q-24 34 -30 92" stroke="#17c7e8" stroke-width="9" fill="none" stroke-linecap="round"/></g>'+
  '<path d="M126 -196 q40 -30 88 -6 q40 18 46 40 q-10 30 -60 18 q-40 -6 -66 -12 q-20 -16 -8 -40z" fill="#fff" stroke="#201540" stroke-width="8" stroke-linejoin="round"/>'+
  '<path d="M210 -176 q36 -4 48 22 q-6 26 -36 20 q-20 -6 -22 -22 q0 -14 10 -20z" fill="#fff" stroke="#201540" stroke-width="7" stroke-linejoin="round"/>'+
  '<path d="M138 -200 L152 -280 L172 -196 Z" fill="#ffd84d" stroke="#c9a01a" stroke-width="6" stroke-linejoin="round"/><path d="M146 -216 l20 -6 M150 -236 l16 -5 M154 -256 l12 -4" stroke="#c9a01a" stroke-width="4" stroke-linecap="round"/>'+
  '<path d="M112 -196 L110 -232 L134 -204 Z" fill="#fff" stroke="#201540" stroke-width="6" stroke-linejoin="round"/><path d="M116 -202 L116 -222 L128 -206 Z" fill="#ffb6ce"/>'+
  '<circle cx="186" cy="-172" r="12" fill="#fff" stroke="#201540" stroke-width="4"/><circle cx="190" cy="-172" r="6" fill="#201540"/><circle cx="188" cy="-175" r="2" fill="#fff"/>'+
  '<path d="M176 -152 q12 -6 22 0" stroke="#201540" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="246" cy="-158" r="4" fill="#201540"/><circle cx="176" cy="-140" r="9" fill="#ff8fb8" opacity=".55"/>'+
  '<path d="M150 -150 q-20 40 -70 90" stroke="#c9a01a" stroke-width="4" fill="none"/></g>'; }

/* ───────────── STAGE + PIECES ───────────── */
var stage=H('div',{id:'pxStage'},D.body);
var big=H('div',{id:'pxBig'},D.body); big.innerHTML='<div id="pxBigBub">Welcome to Phoenix\u2019s World! 👑 I\u2019m Princess Phoenix Sparkles. I\u2019m here to play games with you, learn cool stuff, help if you need it \u2014 or just talk, like a friend!</div><svg viewBox="-120 -160 240 290">'+phoenixSVG('pxBigG')+'</svg>'; wirePhoto(big);
var mini=H('button',{id:'pxMini',type:'button','aria-label':'Tap Princess Phoenix Sparkles to talk and play'},D.body); mini.innerHTML='<svg viewBox="-120 -160 240 290">'+phoenixSVG('pxMiniG')+'</svg>'; wirePhoto(mini);
var bub=H('div',{id:'pxBub',role:'status'},D.body);
var tag=H('button',{id:'pxTag',type:'button','aria-label':'Bring Phoenix back'},D.body); tag.innerHTML='<svg viewBox="0 0 120 220"><path d="M60 150 q10 20 -6 36 q14 12 0 30" stroke="#201540" stroke-width="3" fill="none"/><ellipse cx="60" cy="78" rx="52" ry="66" fill="#e8163f" stroke="#201540" stroke-width="6"/><path d="M52 144 l8 12 8 -12z" fill="#e8163f" stroke="#201540" stroke-width="5" stroke-linejoin="round"/><ellipse cx="42" cy="50" rx="12" ry="20" fill="#fff" opacity=".5"/><circle cx="60" cy="82" r="26" fill="#fff" stroke="#201540" stroke-width="4"/><path d="M40 68 l-4 -20 16 12z M80 68 l4 -20 -16 12z" fill="#fff" stroke="#201540" stroke-width="4" stroke-linejoin="round"/><circle cx="52" cy="80" r="3.5" fill="#201540"/><circle cx="68" cy="80" r="3.5" fill="#201540"/><path d="M57 90 l6 0 -3 4z" fill="#ff8fb8"/><path d="M46 60 l4 -8 4 6 6 -8 6 8 4 -6 4 8z" fill="#ffd84d" stroke="#c9a01a" stroke-width="2"/></svg><span>Tap to bring Phoenix back</span>';
var miniX=H('button',{id:'pxMiniX',type:'button','aria-label':'Send Phoenix away on her unicorn',text:'✕'},D.body);
var card=H('div',{id:'pxCard',role:'dialog','aria-label':'Chat with Princess Phoenix Sparkles'},D.body);
card.innerHTML='<div id="pxHead"><div id="pxAv"><svg viewBox="-120 -160 240 290">'+phoenixSVG('pxAvG')+'</svg></div><div class="who">Princess Phoenix Sparkles<small id="pxSub">Here to help, and to have FUN 👑</small></div><button id="pxClose" type="button" aria-label="Close — Phoenix rides away">✕</button></div>'+
 '<div id="pxLog" aria-live="polite"></div><div id="pxChips"></div><form id="pxForm"><input id="pxIn" type="text" autocomplete="off" placeholder="Ask me anything…" aria-label="Type a message to Phoenix"><button id="pxSend" type="submit" aria-label="Send">🚀</button></form>';
wirePhoto(card);
var log=card.querySelector('#pxLog'), chips=card.querySelector('#pxChips'), form=card.querySelector('#pxForm'), input=card.querySelector('#pxIn');

function say(t){ if(window.PWspeak) return window.PWspeak(t); if(!('speechSynthesis' in window)||SND.on===false) return; try{ window.speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance(String(t).replace(/[^\w\s.,!?'’-]/g,'')); u.rate=1.0; u.pitch=1.55; var vs=window.speechSynthesis.getVoices()||[]; var v=vs.filter(function(x){ return /child|kid|junior|zira|samantha|karen|jenny|aria|ava|google us english/i.test(x.name); })[0]; if(v) u.voice=v; window.speechSynthesis.speak(u); }catch(e){} }
function bubble(txt,who){ var b=H('div',{'class':'pxb '+who,text:txt},log); log.scrollTop=log.scrollHeight; return b; }
function her(txt,delay){ setTimeout(function(){ bubble(txt,'her'); say(txt); setFace('talk'); clearTimeout(her.t); her.t=setTimeout(function(){ setFace('happy'); },Math.min(6000,1200+txt.length*55)); },delay||0); }
function setChips(list){ chips.innerHTML=''; list.forEach(function(c){ var b=H('button',{type:'button','class':'pxc'+(c[2]?' big':''),text:c[0]},chips); b.addEventListener('click',function(){ snd('tap'); c[1](); }); }); }

/* ───────────── MEMORY + AFFIRMATIONS ───────────── */
var mem={name:null,phoenixMode:false,likes:[],lastTopic:null,whyDepth:0,turns:0,game:null,affirmDue:0};
var AFF=['I am brave.','I can do hard things.','I am kind, and kind is strong.','Mistakes help my brain grow.','I am loved exactly as I am.','I can\u2019t do it… YET.','I am a good friend.','My words can make someone\u2019s day.','I am amazing, and that is just a fact.'];
function affirmMoment(){ var a=pick(AFF); var b=bubble('💪 Say this out loud, nice and big:  “'+a+'”','aff'); say('Say this out loud: '+a);
  setChips([['✅ I said it!',function(){ b.textContent='💪 “'+a+'”  ✅ You said it!'; snd('win'); if(P.confetti) P.confetti(60); her(pick(['YES. I heard that all the way over here. Say it once more, even bigger.','That is how a brain learns something is TRUE. Say it five times today and it sticks.','Perfect. Now you know something true about you.'])); mem.affirmDue=0; setTimeout(defaultChips,800); },true],['🤫 Maybe later',function(){ her('Okay, but it is still true, even if you don\u2019t say it. 😉'); defaultChips(); }]]); }

/* ───────────── GAMES ───────────── */
var RHYMES={cat:['bat','hat','mat','rat','sat','fat','pat','flat','chat'],dog:['log','frog','hog','fog','jog','bog'],sun:['fun','run','bun','one','done','ton'],star:['car','far','jar','bar','are','scar'],cake:['lake','bake','make','rake','snake','wake'],moon:['soon','spoon','noon','balloon','tune','june'],bear:['chair','hair','pear','fair','air','share'],frog:['dog','log','hog','fog','jog'],pink:['sink','wink','drink','think','link','blink'],ball:['tall','wall','fall','call','small','hall']};
var SPELL=['cat','dog','sun','hat','bus','pig','cup','bed','mom','dad','star','moon','cake','love','kind','pink'];
var ANIMALS=[{n:'elephant',c:['I am very big and gray.','I have a long nose called a trunk.','I never forget.']},{n:'cat',c:['I purr when I am happy.','I have whiskers and a tail.','I say meow.']},{n:'dog',c:['I wag my tail.','I love to fetch.','I say woof.']},{n:'penguin',c:['I am a bird but I cannot fly.','I live where it is very cold.','I waddle and I swim.']},{n:'frog',c:['I am green and I hop.','I live near ponds.','I say ribbit.']},{n:'giraffe',c:['I have a very long neck.','I eat leaves from tall trees.','I have spots.']},{n:'lion',c:['I am the king of the jungle.','I have a big furry mane.','I roar.']},{n:'cow',c:['I live on a farm.','I make milk.','I say moo.']},{n:'unicorn',c:['I am a horse with something extra.','I have one horn on my head.','I am magic.']},{n:'shark',c:['I live in the ocean.','I have lots and lots of teeth.','I have a fin on my back.']}];
var RIDDLES=[['I have a face and two hands but no arms or legs. What am I?','clock'],['What has to be broken before you can use it?','egg'],['What gets wetter the more it dries?','towel'],['I have keys but no locks. I have space but no room. What am I?','keyboard'],['What has legs but cannot walk?','table'],['What has a neck but no head?','bottle']];
var WYR=['a pet dragon or a pet unicorn','be able to fly or be invisible','eat only ice cream or only pizza forever','live in a treehouse or a castle','have a tail or have wings','talk to animals or talk to trees'];
var SIMON=[['Simon says clap your hands!',null],['Simon says touch your nose!',null],['Simon says spin around!',null],['Simon says push the Big Red Button!','#bigRed'],['Simon says make it snow!',null],['Simon says say “I am awesome” out loud!',null],['Simon says do a happy dance!',null],['Simon says feed the fish!','#tank']];
function startGame(kind){ mem.game={kind:kind};
  if(kind==='rhyme'){ var w=pick(Object.keys(RHYMES)); mem.game.w=w; her('Rhyme Time! Tell me a word that rhymes with… '+w.toUpperCase()+'!'); }
  if(kind==='spell'){ var s=pick(SPELL); mem.game.w=s; her('Spell It! Type the word: '+s.toUpperCase()+'. Listen: '+s.split('').join(', ')+'.'); }
  if(kind==='animal'){ var a=pick(ANIMALS); mem.game.a=a; mem.game.i=0; her('I am thinking of an animal. Clue one: '+a.c[0]+' What am I?'); }
  if(kind==='riddle'){ var r=pick(RIDDLES); mem.game.r=r; her('Riddle time! '+r[0]); }
  if(kind==='wyr'){ var q=pick(WYR); mem.game=null; her('Would you rather… '+q+'? Tell me which one!'); }
  if(kind==='math'){ var x=ri(1,5),y=ri(1,5); mem.game.ans=x+y; her('Quick math! What is '+x+' plus '+y+'?'); }
  if(kind==='simon'){ var cmd=pick(SIMON); her(cmd[0]); if(cmd[1]){ var el=D.querySelector(cmd[1]); if(el) el.scrollIntoView({behavior:'smooth',block:'center'}); } mem.game=null; setTimeout(function(){ setChips([['✅ Did it!',function(){ snd('win'); her(pick(['Ha! Perfect. Again?','You are FAST.','Simon is impressed.'])); gameChips(); }],['➡️ Another one',function(){ startGame('simon'); }],['🏠 Back',defaultChips]]); },500); return; }
  setChips([['🤷 Give me a hint',function(){ hint(); }],['🏁 Stop the game',function(){ mem.game=null; her('Okay! That was fun. What next?'); defaultChips(); }]]); }
function hint(){ var g=mem.game; if(!g) return; if(g.kind==='rhyme') her('It starts with '+pick(RHYMES[g.w])[0].toUpperCase()+'…'); if(g.kind==='spell') her('First letter: '+g.w[0].toUpperCase()+'. You have got this.'); if(g.kind==='animal'){ g.i=Math.min(2,g.i+1); her('Clue: '+g.a.c[g.i]); } if(g.kind==='riddle') her('It starts with '+g.r[1][0].toUpperCase()+'.'); if(g.kind==='math') her('Count on your fingers! It is more than '+(g.ans-2)+'.'); }
function gameReply(t){ var g=mem.game, w=t.trim().toLowerCase().replace(/[^a-z0-9 ]/g,''); if(!g) return null;
  function win(msg){ mem.game=null; snd('win'); if(P.confetti) P.confetti(50); setTimeout(gameChips,600); return msg; }
  if(g.kind==='rhyme'){ if(RHYMES[g.w].indexOf(w)>=0||(w.length>2&&w.slice(-2)===g.w.slice(-2)&&w!==g.w)) return win(pick(['YES! '+w.toUpperCase()+' rhymes with '+g.w.toUpperCase()+'! You are a poet.','Rhyme master! '+w+' and '+g.w+'. Perfect.'])); return 'Hmm, '+w+' and '+g.w+' don\u2019t quite rhyme. Try one that ends like '+g.w.slice(-2)+'!'; }
  if(g.kind==='spell'){ if(w===g.w) return win('YES! '+g.w.toUpperCase()+'! Spelled perfectly. You are a speller!'); return 'Close! Look again: '+g.w.split('').join(' ')+'. Type it just like that.'; }
  if(g.kind==='animal'){ if(w.indexOf(g.a.n)>=0) return win('YES! I am '+(/^[aeiou]/.test(g.a.n)?'an ':'a ')+g.a.n+'! You got it in '+(g.i+1)+' clue'+(g.i?'s':'')+'!'); g.i=Math.min(2,g.i+1); return 'Not quite! Clue '+(g.i+1)+': '+g.a.c[g.i]; }
  if(g.kind==='riddle'){ if(w.indexOf(g.r[1])>=0) return win('YES! It is '+(/^[aeiou]/.test(g.r[1])?'an ':'a ')+g.r[1]+'! Riddle solved!'); return 'Ooh, good guess, but no. Think about it… or ask for a hint!'; }
  if(g.kind==='math'){ if(parseInt(w,10)===g.ans||({one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10})[w]===g.ans) return win('YES! '+g.ans+'! Math wizard! Another?'); return 'Not '+w+'. Count it on your fingers and try again!'; }
  return null; }
function gameChips(){ setChips([['🎵 Rhyme Time',function(){ startGame('rhyme'); }],['🔤 Spell It',function(){ startGame('spell'); }],['🐘 Guess the animal',function(){ startGame('animal'); }],['🧩 Riddle',function(){ startGame('riddle'); }],['🤔 Would you rather',function(){ startGame('wyr'); }],['➕ Quick math',function(){ startGame('math'); }],['🙋 Simon says',function(){ startGame('simon'); }],['🏠 Back',defaultChips]]); }
function defaultChips(){ setChips([['🎮 Play a game with me',gameChips,true],['🎛️ Show me the buttons',function(){ bubble('Show me the buttons','me'); her('Follow me, it is the biggest thing on the page.'); location.hash='#panel'; }],['😂 Tell me a joke',function(){ bubble('Tell me a joke','me'); her(reply('joke')); }],['🧠 Teach me something',function(){ bubble('Teach me something','me'); her(reply(pick(['sun','moon','dinosaur','octopus','rainbow','space','penguin']))); }],['💪 Say something brave',affirmMoment],['🔐 Secret password',askSecret],['🦄 Ride away',closeHer]]); }

/* ───────────── KNOWLEDGE BASE ───────────── */
var SLANG=['no way!','that is SO cool.','okay that\u2019s actually amazing.','sparkle-tastic!','bestie, yes.','stop it, I love that.'];
function isBirthdaySeason(){ var d=new Date(),m=d.getMonth(),day=d.getDate(); return (m===8&&day>=27)||(m===9&&day<=12); }
var KB=[
 {k:['hello','hi ','hey','hiya'],a:['Hi hi hi! 👋 Want to play a game?','Hello! You look like someone who likes buttons.']},{k:['how are you'],a:['Fizzy and fabulous. Slid down a rainbow, saw a kitty fall from the sky, normal Tuesday.']},{k:['your name','who are you'],a:['Princess Phoenix Sparkles. Cat. Princess. Royal guide. Game master. Also I make excellent rulz.']},
 {k:['sun','sunny'],a:['The sun is a giant ball of burning gas so far away its light takes 8 minutes to get here. Wave — it is 8 minutes late.'],why:['Because it is really really far. 93 million miles.','Because even light needs time to travel.','Because that is how the universe works, and I think it is a good rule.']},
 {k:['moon'],a:['The moon has no light of its own. It is a big rock reflecting sunlight, like a mirror in the sky.'],why:['Because it is rock, not fire.','Because the sun shines on one side, and that is the side we see.','Because it goes around us once a month. That is why it changes shape!']},
 {k:['star ','stars'],a:['Stars are suns, just really far away. Some are bigger than OUR sun.'],why:['Because they are giant burning balls.','Because they are so far they look tiny.','Because the light wobbles through our air — that is the twinkle.']},
 {k:['rainbow'],a:['A rainbow is sunlight split into all its colors by raindrops. Every raindrop is a tiny prism. I slid down one. Very slippery.'],why:['Because white light is secretly all the colors mixed.','Because water bends light, each color a different amount.','Because red bends least and purple most, so they spread out. Science!']},
 {k:['rain'],a:['Rain is clouds that got too heavy. Plants drink, puddles happen, boots get muddy. Perfect.'],why:['Because clouds are tiny drops that grab each other.','Because big drops are too heavy to float.','Because everything falls down. Gravity!']},
 {k:['snow'],a:['Snow is frozen rain. Every snowflake has six sides and no two are the same. Like kitties.'],why:['Because water freezes up high where it is cold.','Because ice crystals grow six arms.','Because each flake takes a different bumpy path down.']},
 {k:['thunder','lightning','storm'],a:['Lightning is a giant spark. Thunder is its sound. Light is faster than sound, so you see it first. Count the seconds — every 5 is a mile.']},
 {k:['dinosaur','dino','rex'],a:['Dinosaurs lived 66 million years ago. A T. rex was as long as a school bus with teeth like bananas. Birds are their great-great-grandkids!'],why:['Because a giant rock from space hit Earth and changed the weather.','Because the big ones could not find food after that.','Because the little feathery ones survived and became birds. A chicken is a tiny dinosaur.']},
 {k:['cat','kitty','kitten','meow'],a:['Cats are the best and I am not just saying that. We purr, we pounce, we sleep 16 hours a day. Goals.']},{k:['dog','puppy','woof'],a:['Dogs can smell 10,000 times better than you. They can smell that you had a cookie an HOUR ago.']},
 {k:['elephant'],a:['Elephants are the biggest land animals. A trunk has 40,000 muscles!']},{k:['shark'],a:['Sharks are older than trees. Some grow 30,000 teeth in a life.']},{k:['octopus'],a:['An octopus has three hearts and blue blood and is suspiciously smart.']},{k:['penguin'],a:['Penguins are birds that swim. The daddies keep the egg warm on their feet for two months.']},
 {k:['unicorn'],a:['Unicorns are pretend, which means you get to decide everything about them. Mine is Sugarplum. Her horn is made of sunshine.']},{k:['dragon'],a:['If I had a dragon it would be pink, breathe glitter, and be named Kevin. Actually — he is in Story Time.']},
 {k:['space','planet','rocket','astronaut'],a:['Space is huge and quiet. No air, so astronauts wear suits. You would float like a bubble!'],why:['Because nothing pulls you down when you are falling around the Earth.','Because you move so fast sideways you keep missing the ground. That is orbit.','Because everything in space is falling. Even the moon. It just keeps missing.']},
 {k:['ocean','sea'],a:['The ocean covers more than half the Earth. The deepest part is deeper than the tallest mountain is tall.']},{k:['volcano'],a:['A volcano is a mountain with a hole that melted rock comes out of. Do not lick it.']},
 {k:['body','heart','brain','bones'],a:['Your heart beats 100,000 times a day. Your brain is the boss. You have 206 bones. Very complicated machine!'],why:['Because your heart is a pump.','Because blood carries food and air everywhere.','Because every part needs food and air, even your toes!']},
 {k:['sleep','tired','bedtime'],a:['Sleep is when your brain files everything you learned today. Like a tiny librarian. Kids need 10 to 12 hours!']},{k:['vegetable','veggie','fruit','healthy'],a:['Fruits and veggies are power-ups. Carrots help eyes, bananas help muscles, water is the best drink in the world.']},{k:['teeth','tooth','brush'],a:['Brush for two whole minutes — one song! Sugar bugs love teeth. Brushing sends them packing.']},{k:['wash','germs'],a:['Germs are too small to see. Soap for 20 seconds makes them slide right off. Sing the ABCs while you scrub!']},
 {k:['scared','afraid','nervous','worried','monster'],a:['It is okay to feel scared. Everyone does. Big breath in… out slow. Feelings are like weather — they pass. And you are braver than you feel.'],why:['Because your brain is trying to keep you safe. It is just a bit loud.','Because big breaths tell your brain we are okay.','Because you have felt scared before, and look — you are still here, being awesome.']},
 {k:['sad','cry','upset'],a:['Oh, friend. It is okay to be sad. Crying is how the heart rinses out. Want to tell me, or want a joke?']},{k:['angry','mad'],a:['Mad is a big feeling. Okay to feel it, not okay to hurt anyone with it. Squeeze your fists… let go. Better?']},{k:['happy','excited'],a:['Yesss! Happy looks good on you. Want to make it bigger? Push the Big Red Button.']},
 {k:['love you'],a:['I love you too, to the moon and back around the sun twice. 💖']},{k:['friend','lonely'],a:['Being a good friend is easy: be kind, share, listen, say sorry when you mess up. Even princesses mess up.']},{k:['kind','nice'],a:['Kind is the strongest thing you can be. It costs nothing and makes someone\u2019s whole day.']},{k:['sorry'],a:['Saying sorry is brave. It is a big-kid move.']},{k:['share'],a:['Sharing turns one happy person into two. Math!']},
 {k:['clean','tidy','room','mess'],a:['Cleaning is easier with a song. Pick up ten things, dance in between. There is a whole book about it in Story Time.']},{k:['school','teacher'],a:['School is where you find out what you are amazing at. Everyone is amazing at something.']},
 {k:['can\'t','cant','too hard','give up'],a:['Say it with me: I can\u2019t do it… YET. Yet is a magic word.'],why:['Because your brain grows when things are hard.','Because everyone good at something was bad at it first.','Because giving up is the only way to never get it.']},
 {k:['smart'],a:['Smart is not something you ARE. It is something you DO. Every try makes you smarter.']},{k:['brave'],a:['Brave does not mean not scared. Brave means scared AND doing it anyway.']},{k:['beautiful','pretty','ugly'],a:['You are beautiful because you are you. Nobody else has your exact laugh.']},
 {k:['count','math'],a:['Math is just counting with extra steps. Want a puzzle? Tap Play a game!']},{k:['abc','alphabet'],a:['26 letters, and every word you will ever say is made of them. Even sparkle.']},
 {k:['color','colour'],a:['My favorite is pink. Then purple. Then pink again. Yours?']},{k:['pink'],a:['PINK. We are going to get along great.']},{k:['blue'],a:['Blue! Like my left eye. Good pick.']},{k:['purple'],a:['Purple is the color of magic and grapes.']},{k:['green'],a:['Green! Frogs and grass and the go light.']},{k:['yellow'],a:['Yellow is my crown color. Royal choice.']},
 {k:['spanish','hola'],a:['¡Hola! Gato means cat. Arco iris means rainbow. Princesa means… me.']},
 {k:['joke','funny'],a:['Why did the cat sit on the computer? To keep an eye on the mouse! 🐭','What do you call a sleeping dinosaur? A dino-SNORE!','Why was the math book sad? Too many problems.','What do you call a bear with no ears? A B!','Why did the banana go to the doctor? It was not peeling well!']},
 {k:['song','sing','music'],a:['Go to the Radio on the Control Panel — six songs. Twinkle Twinkle is my jam.']},{k:['game','play','bored'],a:['Bored? Not in MY world. Tap Play a game — I have seven.']},{k:['fish','tank'],a:['Every fish in my tank carries a secret sentence about YOU. Tap one and say it out loud.']},{k:['story','book'],a:['Story Time has real books with pages you turn. Every one ends with something to say out loud.']},{k:['stuffie','teddy'],a:['The stuffies are on the shelf. Marshmallow purrs if you cuddle her.']},{k:['ice cream'],a:['There is a SECRET ice cream machine on the Control Panel. Do not tell anyone. Tell everyone.']},
 {k:['birthday'],a:[isBirthdaySeason()?'It is birthday SEASON around here. Somebody very sparkly has one coming up. 🎂':'Birthdays are the best day. When is yours?']},{k:['dad','daddy','papa'],a:['Dads are the best. Mine helped build this whole world. Go give yours a hug.']},{k:['mom','mommy','mama'],a:['Moms are magic. Go tell yours something you love about her.']},
 {k:['bye','goodbye','later'],a:['Bye bestie! Tap the pink tag on the side whenever you want me back. 👋']},{k:['thank'],a:['You are SO welcome. Being polite is a superpower.']},{k:['who made','who built'],a:['A dad and his daughter made this whole world, one button at a time.']},{k:['secret','password'],a:['Ooh, do you have the royal password? Tap the lock button and type it.']}
];
var FALLBACK=['Ooh, good question. I am not sure, but we could find out together! Ask about the sun, dinosaurs, feelings — or tap Play a game.','Hmm, my crown is thinking. Try: why is the sky blue? How do I be brave? Or play a game with me!','I don\u2019t know that one YET. But I know space, animals, feelings, colors, jokes and riddles. Pick one!'];
function reply(text){ var t=' '+text.toLowerCase().trim()+' '; mem.turns++;
  var g=gameReply(text); if(g) return g;
  var like=t.match(/ i (?:like|love) ([a-z ]{2,24}?)(?: |\.|!|$)/); if(like){ var thing=like[1].trim(); if(mem.likes.indexOf(thing)<0) mem.likes.push(thing); return pick(SLANG)+' I will remember you like '+thing+'. What else?'; }
  if(/what do i like|remember/.test(t)&&mem.likes.length) return 'You told me you like '+mem.likes.join(' and ')+'. See? I listen. 👂';
  if(/^ why/.test(t)||/ why\?? $/.test(t)||t.trim()==='why'||t.trim()==='but why'){ if(mem.lastTopic&&mem.lastTopic.why){ var d=Math.min(mem.whyDepth,mem.lastTopic.why.length-1); mem.whyDepth++; return mem.lastTopic.why[d]+(mem.whyDepth>=mem.lastTopic.why.length?' …and that is as deep as I go, bestie. Ask a grown-up the next one!':''); } return 'Why what? Ask me about something first, then ask why.'; }
  var nm=t.match(/ (?:my name is|i am|i'm|im) ([a-z]{2,16}) /); if(nm&&!/(sad|mad|happy|scared|bored|tired|fine|good|ok|okay|hungry)/.test(nm[1])){ mem.name=nm[1].charAt(0).toUpperCase()+nm[1].slice(1); return 'Hi '+mem.name+'! Fancy name. Want to play a game, '+mem.name+'?'; }
  for(var i=0;i<KB.length;i++){ var e=KB[i]; for(var j=0;j<e.k.length;j++){ if(t.indexOf(e.k[j])>=0){ mem.lastTopic=e; mem.whyDepth=0; return pick(e.a); } } }
  return pick(FALLBACK); }

function askSecret(){ bubble('I have the secret password','me'); her('Ooh! Type it in the box. Nobody else will see it.'); input.placeholder='Type the royal password…'; input.dataset.secret='1'; input.focus(); }
form.addEventListener('submit',function(e){ e.preventDefault(); var v=input.value.trim(); if(!v) return; input.value='';
  if(input.dataset.secret){ delete input.dataset.secret; input.placeholder='Ask me anything…'; bubble('•••••••','me');
    (window.PWcheckSecret?window.PWcheckSecret(v):Promise.resolve(false)).then(function(ok){ if(ok){ mem.phoenixMode=true; card.querySelector('#pxSub').textContent='Phoenix Mode: ON 👑✨'; snd('win'); if(P.confetti) P.confetti(80); her('IT\u2019S YOU! Phoenix! Okay okay okay, welcome home. This is YOUR world.'); her(isBirthdaySeason()?'And it is your birthday season! You are almost a whole year more amazing. 🎂':'I saved all the best buttons for you.',1800); } else { snd('oops'); her('Hmm, that is not the royal password. Everything is still open to play though!'); } defaultChips(); }); return; }
  bubble(v,'me'); snd('tap'); her(reply(v),300);
  mem.affirmDue++; if(mem.affirmDue>=5&&!mem.game){ setTimeout(affirmMoment,2600); } });

function smokePoof(x,y){ for(var i=0;i<14;i++){ var p=H('i',null,D.body); var sz=rnd(40,110), a=Math.random()*6.283, d=rnd(10,90);
  p.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;width:'+sz+'px;height:'+sz+'px;margin:-'+(sz/2)+'px 0 0 -'+(sz/2)+'px;border-radius:50%;pointer-events:none;z-index:2390;background:radial-gradient(circle,rgb(255 255 255/.95),rgb(230 220 255/.7) 50%,rgb(200 180 240/0) 72%);opacity:0;transform:scale(.2);transition:transform 1.4s cubic-bezier(.2,.8,.3,1),opacity 1.4s';
  (function(p,a,d){ requestAnimationFrame(function(){ p.style.opacity='1'; p.style.transform='translate('+(Math.cos(a)*d)+'px,'+(Math.sin(a)*d-40)+'px) scale(1.2)'; setTimeout(function(){ p.style.opacity='0'; },500); }); })(p,a,d); setTimeout(function(p){ return function(){ p.remove(); }; }(p),1600); } if(SND.noise) SND.noise(0.6,0.08,900); }
/* ───────────── THE FLOW ───────────── */
var BUBS=['Tap me! I know 7 games. 🎮','Want to hear a joke? Tap me.','Psst — there is a secret ice cream machine up there. 🍦','Say “I am brave” out loud. Go on. 💪','Tap me and ask me anything!','The fish are carrying secret sentences. 🐠','Have you cuddled Marshmallow yet? 🐱','I can teach you why the sky is blue.'];
var IDLE=[{t:'Jumping jacks! One, two, three! Want to do some with me? 🤸',anim:'jack'},{t:'Stretch time. Reach up high like a giraffe! 🦒',anim:'stretch'},{t:'Did you exercise today? Moving your body makes your brain happier. True fact.',anim:'jack'},{t:'Wiggle wiggle wiggle. I have to wiggle or my tail goes to sleep.',anim:'jack'},{t:'Big stretch! Exercise makes your heart strong and your sleep better.',anim:'stretch'},{t:'I am right here if you need me. Tap me any time. 💖',anim:null},{t:'Psst. There is a secret ice cream machine on the Control Panel. 🍦',anim:null},{t:'Say “I am brave” out loud. Go on, I will wait. 💪',anim:null},{t:'Tap me and I will teach you why the sky is blue.',anim:null},{t:'Want to play a game? I know seven. 🎮',anim:null}];
function doIdle(){ if(D.hidden||card.classList.contains('on')||!mini.classList.contains('on')) return; var it=pick(IDLE); bub.textContent=it.t; bub.classList.add('on'); if(it.anim&&!reduced){ var body=mini.querySelector('.body'), arm=mini.querySelector('.arm'); if(body){ body.style.animation=(it.anim==='jack'?'pxjack .6s ease-in-out 6':'pxstretch 1.6s ease-in-out 2'); setTimeout(function(){ body.style.animation=''; },it.anim==='jack'?3600:3200); } if(arm&&it.anim==='jack'){ arm.style.transformBox='fill-box'; arm.style.transformOrigin='0% 100%'; arm.style.animation='pxarmjack .6s ease-in-out 6'; setTimeout(function(){ arm.style.animation=''; },3600); } if(SND.tone) for(var k=0;k<4;k++) SND.tone(500+k*80,0.08,'triangle',0.04,k*0.15); } }
var bubT=null; function idleBubbles(){ clearInterval(bubT); bub.textContent='I am right here if you need me. Tap me to play! 💖'; bub.classList.add('on'); bubT=setInterval(doIdle,14000); }
function showMini(){ mini.classList.add('on'); miniX.classList.add('on'); tag.classList.remove('on'); idleBubbles(); }
function openChat(){ bub.classList.remove('on'); clearInterval(bubT); mini.classList.remove('on'); miniX.classList.remove('on'); card.classList.add('on'); snd('tada'); if(mem.turns===0&&!log.children.length){ her(pick(['Okay okay okay, hi! I am Princess Phoenix Sparkles and this is MY world. Well, ours now. 👑','Heyyy! You found me. I slid down the whole rainbow to get here. My tail is still fizzy.']),200); her('Want to play a game, learn something, or push some buttons?',2200); } defaultChips(); }
mini.addEventListener('click',openChat); bub.addEventListener('click',openChat);

function arrive(){
  big.classList.add('on'); snd('tada'); say('Welcome to Phoenix\u2019s World! I am Princess Phoenix Sparkles. I am here to play games with you, learn cool stuff, and help if you need it. Or just to talk, like a friend!');
  var arm=big.querySelector('.arm'); if(arm){ arm.style.transformBox='fill-box'; arm.style.transformOrigin='0% 100%'; arm.style.animation='pxwave .5s ease-in-out 12'; }
  setTimeout(function(){ big.classList.remove('on');
    stage.innerHTML=''; var ssvg=E('svg',{viewBox:'0 0 1000 700',preserveAspectRatio:'xMidYMid slice'},stage);
    var bowD='M-120 -40 C 220 -60, 520 60, 700 280 S 960 560, 1080 640';
    var bow=E('g',{opacity:0},ssvg); ['#ff4d9d','#ff8a3d','#ffc53d','#3fe0a4','#17c7e8','#8b3dff'].forEach(function(c,i){ E('path',{d:bowD,stroke:c,'stroke-width':[104,84,64,44,24,8][i],fill:'none','stroke-linecap':'round',transform:'translate(0,'+(i*9)+')'},bow); });
    E('path',{d:bowD,stroke:'#fff','stroke-width':10,fill:'none','stroke-linecap':'round',opacity:.5},bow); bow.style.transition='opacity .5s'; requestAnimationFrame(function(){ bow.style.opacity='1'; });
    var rider=E('g',{transform:'translate(0,-56)'},ssvg); var g=E('g',null,rider); g.innerHTML=phoenixSVG('pxArr'); wirePhoto(g); g.setAttribute('transform','scale(.9)');
    E('path',{id:'pxArrPath',d:bowD,fill:'none',stroke:'none'},ssvg);
    var mp=E('animateMotion',{dur:'3.2s',begin:'0.3s',fill:'freeze',rotate:'auto',calcMode:'spline',keyTimes:'0;1',keySplines:'0.3 0.05 0.35 1'},g); E('mpath',{href:'#pxArrPath'},mp);
    snd('whoosh'); var trail=setInterval(function(){ try{ var m=g.getScreenCTM(); if(m&&P.sparkleAt) P.sparkleAt(m.e,m.f-10,3,['#fff','#ffd84d','#ff9ec2']); }catch(e){} },130);
    setTimeout(function(){ clearInterval(trail); snd('boing'); bow.style.opacity='0';
      var cx=window.innerWidth-70, cy=window.innerHeight-90; smokePoof(cx,cy); if(P.sparkleAt) setTimeout(function(){ P.sparkleAt(cx,cy,18,['#fff','#ffd84d','#ff9ec2']); },400); snd('sparkle');
      g.style.transition='opacity .4s'; g.style.opacity='0';
      setTimeout(function(){ stage.innerHTML=''; showMini(); say('I am right here if you need me!'); },500); },3700); },8500); }

/* ───────────── EXIT: unicorn to the portal ───────────── */
var busy=false;
function closeHer(){ if(busy) return; busy=true; snd('sparkle'); her(pick(['Sugarplum is here! Tap the pink tag on the side any time and I will slide right back. 🦄','Bye for now! Watch this exit, I practiced.'])); setTimeout(function(){ card.classList.remove('on'); mini.classList.remove('on'); miniX.classList.remove('on'); bub.classList.remove('on'); clearInterval(bubT); ride(); },1700); }
miniX.addEventListener('click',function(){ if(busy) return; busy=true; snd('sparkle'); bub.textContent='Okay! Sugarplum, let\u2019s go. Tap the balloon if you want me back. 🦄'; bub.classList.add('on'); setTimeout(function(){ mini.classList.remove('on'); miniX.classList.remove('on'); bub.classList.remove('on'); clearInterval(bubT); ride(); },1500); });
function ride(){ stage.innerHTML=''; var ssvg=E('svg',{viewBox:'0 0 1000 700',preserveAspectRatio:'xMidYMid slice'},stage);
  var cr=card.getBoundingClientRect(); if(P.sparkleAt) for(var i=0;i<4;i++) setTimeout(function(){ P.sparkleAt(cr.left+cr.width-60,cr.top+40,18,['#fff','#ffd84d','#ff9ec2','#c58cff']); },i*120);
  var portal=E('g',{transform:'translate(860,420)'},ssvg); var pS=E('ellipse',{rx:0,ry:0,fill:'#000',opacity:.35,transform:'translate(8,16)'},portal); var pH=E('ellipse',{rx:0,ry:0,fill:'#000'},portal); var pR=E('ellipse',{rx:0,ry:0,fill:'none',stroke:'#120a24','stroke-width':14,opacity:.7},portal);
  var run=E('g',null,ssvg); var uni=E('g',{transform:'scale(.5)'},run); uni.innerHTML=unicornSVG();
  var rider=E('g',{transform:'translate(-90,-96) scale(.66)'},uni); rider.innerHTML=phoenixSVG('pxRide'); wirePhoto(rider);
  E('path',{d:'M-34 88 q-8 44 -16 78 M34 88 q8 44 16 78',stroke:'#fff','stroke-width':16,'stroke-linecap':'round',fill:'none',transform:'translate(-90,-96) scale(.66)'},uni);
  E('path',{d:'M-34 88 q-8 44 -16 78 M34 88 q8 44 16 78',stroke:'#201540','stroke-width':4,'stroke-linecap':'round',fill:'none',opacity:.45,transform:'translate(-90,-96) scale(.66)'},uni);
  E('path',{id:'pxLap',d:'M-260 560 C 100 520, 200 300, 420 330 S 760 520, 560 560 S 120 640, 300 440 S 700 380, 860 420',fill:'none',stroke:'none'},ssvg);
  var mp=E('animateMotion',{dur:'6.4s',begin:'0.2s',fill:'freeze',rotate:'auto',calcMode:'spline',keyTimes:'0;0.15;0.85;1',keySplines:'0.2 0 0.6 1;0.4 0 0.6 1;0.5 0 0.9 0.6'},run); E('mpath',{href:'#pxLap'},mp);
  snd('whoosh'); var hoof=setInterval(function(){ if(SND.tone) SND.tone(rnd(140,190),0.06,'sine',0.05); },230);
  setTimeout(function(){ [pS,pH,pR].forEach(function(el){ el.style.transition='rx 1.2s cubic-bezier(.3,1.5,.5,1),ry 1.2s cubic-bezier(.3,1.5,.5,1)'; }); pS.setAttribute('rx',116); pS.setAttribute('ry',84); pH.setAttribute('rx',104); pH.setAttribute('ry',76); pR.setAttribute('rx',110); pR.setAttribute('ry',80); },4300);
  setTimeout(function(){ clearInterval(hoof); snd('sparkle'); run.style.transition='transform .8s cubic-bezier(.6,-.2,.9,.4),opacity .5s .4s'; run.style.transformOrigin='860px 420px'; run.style.transform='scale(.05)'; run.style.opacity='0'; if(P.sparkleAt) P.sparkleAt(window.innerWidth*.86,window.innerHeight*.6,30,['#8b3dff','#17c7e8','#fff','#ff4d9d']); },6500);
  setTimeout(function(){ [pS,pH,pR].forEach(function(el){ el.style.transition='rx .6s ease-in,ry .6s ease-in'; el.setAttribute('rx',0); el.setAttribute('ry',0); }); },7500);
  setTimeout(function(){ stage.innerHTML=''; tag.classList.add('on'); busy=false; },8300); }
card.querySelector('#pxClose').addEventListener('click',closeHer);
tag.addEventListener('click',function(){ tag.classList.remove('on'); snd('whoosh'); arrive(); });
D.addEventListener('keydown',function(e){ if(e.key==='Escape'&&card.classList.contains('on')) closeHer(); });

window.Phoenix={say:function(t){ bubble(t,'her'); say(t); },ask:reply,arrive:arrive,leave:closeHer,open:openChat,mem:mem};
if(!window.PWspeak) window.PWspeak=say;
setTimeout(function(){ if(reduced){ showMini(); } else arrive(); },1200);
})();
