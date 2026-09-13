/* ═══════════════════════════════════════════════════════════════════
   PHOENIX'S WORLD — storytime.js  (Drop 4 — FINAL, no placeholders)

   A real book. Hard cover, two facing pages on wide screens, one on a
   phone, a 3D page turn with a paper sound. Every illustration is a
   living SVG — things breathe, bob and blink — and every picture has
   things you can TAP that react and talk.

   Four original stories, each built on what the research says works:
   growth-mindset framing ("yet"), repetition inside a routine, and the
   grown-up's voice next to the child's. Every book ends with:
     · a SAY IT OUT LOUD page — three lines, each tapped and repeated
       together five times, with a counter that fills up
     · a "You are so loved" page
     · a note for the grown-up about what just happened in the brain

   Mounts into #storyMount. Needs window.PW.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var P=window.PW; if(!P) return;
var E=P.E,H=P.H,$=P.$,rnd=P.rnd,pick=P.pick,clear=P.clear,SND=P.SND,say=P.say;
var D=document;

H('style',{html:
'.bookshelf{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:22px}'+
'.spine{width:150px;min-height:200px;border:6px solid var(--ink);border-radius:8px 18px 18px 8px;cursor:pointer;padding:14px 10px;display:flex;flex-direction:column;justify-content:space-between;'+
 'font:700 17px/1.15 "Fredoka",sans-serif;color:#fff;text-shadow:0 2px 0 rgb(0 0 0/.35);box-shadow:-6px 0 0 rgb(var(--ink-rgb)/.35),0 10px 0 rgb(var(--ink-rgb)/.25);transition:transform .15s;text-align:left}'+
'.spine:hover{transform:translateY(-6px) rotate(-2deg)}.spine .em{font-size:44px;line-height:1;text-align:center;filter:drop-shadow(0 4px 0 rgb(0 0 0/.25))}'+
'.spine[aria-pressed="true"]{outline:5px solid var(--sherbet);outline-offset:3px}'+
'.book{position:relative;max-width:1000px;margin:0 auto;perspective:1800px}'+
'.cover{border:8px solid var(--ink);border-radius:14px 26px 26px 14px;background:var(--bookc,#8b3dff);box-shadow:0 18px 0 rgb(var(--ink-rgb)/.3),inset 0 0 0 10px rgb(255 255 255/.18),inset 0 0 0 14px rgb(0 0 0/.12);'+
 'display:grid;grid-template-columns:1fr 1fr;min-height:420px;position:relative;overflow:hidden}'+
'.cover::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:22px;margin-left:-11px;background:linear-gradient(90deg,rgb(0 0 0/.0),rgb(0 0 0/.25),rgb(0 0 0/.0));z-index:2;pointer-events:none}'+
'.page{position:relative;background:#fffdf5;padding:18px 22px 60px;min-height:420px;display:flex;flex-direction:column;'+
 'background-image:repeating-linear-gradient(0deg,transparent 0 30px,rgb(32 21 64/.04) 30px 31px)}'+
'.page.l{border-radius:8px 0 0 8px;box-shadow:inset -18px 0 24px -18px rgb(0 0 0/.25)}.page.r{border-radius:0 8px 8px 0;box-shadow:inset 18px 0 24px -18px rgb(0 0 0/.25)}'+
'.page .art{width:100%;aspect-ratio:4/3;border:5px solid var(--ink);border-radius:18px;overflow:hidden;background:#e8f6ff;box-shadow:0 6px 0 rgb(var(--ink-rgb)/.18)}'+
'.page .art svg{width:100%;height:100%;display:block}'+
'.page .txt{margin:14px 0 0;font:800 clamp(17px,2.3vw,21px)/1.5 "Nunito",sans-serif;color:var(--ink)}'+
'.page .txt b{color:var(--grape)}'+
'.page .num{position:absolute;bottom:16px;font:700 14px/1 "Fredoka",sans-serif;color:#9a8ab8}.page.l .num{left:22px}.page.r .num{right:22px}'+
'.page .hint{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);font:800 12px/1 "Nunito",sans-serif;color:var(--bubblegum);white-space:nowrap}'+
'.hot{cursor:pointer;transform-box:fill-box;transform-origin:center}.hot:hover{filter:brightness(1.1)}'+
'.wob{animation:wob .5s ease-in-out 2}@keyframes wob{0%,100%{transform:rotate(0)}25%{transform:rotate(9deg) scale(1.08)}75%{transform:rotate(-9deg) scale(1.08)}}'+
'.brth{animation:brth 4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}@keyframes brth{0%,100%{transform:scale(1)}50%{transform:scale(1.03,1.05)}}'+
'.bob{animation:bob 3s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}'+
'.spin{animation:spin 8s linear infinite;transform-box:fill-box;transform-origin:center}@keyframes spin{to{transform:rotate(360deg)}}'+
'.flt{animation:flt 5s ease-in-out infinite;transform-box:fill-box;transform-origin:center}@keyframes flt{0%,100%{transform:translate(0,0) rotate(-3deg)}50%{transform:translate(6px,-10px) rotate(3deg)}}'+
'.gone{transition:transform .4s cubic-bezier(.6,-.3,.8,.6),opacity .3s .1s;transform:scale(0) rotate(30deg);opacity:0}'+
'.flip{position:absolute;top:0;bottom:0;left:50%;width:50%;transform-origin:left center;transform-style:preserve-3d;z-index:5;pointer-events:none}'+
'.flip .f,.flip .b{position:absolute;inset:0;backface-visibility:hidden;border:0}'+
'.flip .b{transform:rotateY(180deg)}'+
'.flipping{animation:flipping .8s cubic-bezier(.4,0,.3,1) forwards}@keyframes flipping{to{transform:rotateY(-180deg)}}'+
'.flipback{transform-origin:right center;left:0;animation:flipback .8s cubic-bezier(.4,0,.3,1) forwards}@keyframes flipback{to{transform:rotateY(180deg)}}'+
'.bnav{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin-top:18px}'+
'.bbtn{min-height:56px;padding:13px 22px;cursor:pointer;border:5px solid var(--ink);border-radius:999px;background:var(--sherbet);font:700 18px/1 "Fredoka",sans-serif;color:var(--ink);box-shadow:0 6px 0 var(--sherbet-deep)}'+
'.bbtn:active{transform:translateY(5px);box-shadow:0 1px 0 var(--sherbet-deep)}.bbtn.pk{background:var(--bubblegum);color:#fff;box-shadow:0 6px 0 var(--bubblegum-deep)}.bbtn.mt{background:var(--mint);box-shadow:0 6px 0 var(--mint-deep)}.bbtn.wh{background:#fff;box-shadow:0 6px 0 rgb(var(--ink-rgb)/.28)}'+
'.bbtn[disabled]{opacity:.35;cursor:default}'+
'.bprog{font:800 14px/1 "Nunito",sans-serif;color:var(--grape)}'+
'.sayline{display:flex;align-items:center;gap:12px;margin:10px 0;padding:12px 14px;border:5px solid var(--ink);border-radius:18px;background:#fff;cursor:pointer;box-shadow:0 5px 0 rgb(var(--ink-rgb)/.2);transition:transform .1s}'+
'.sayline:active{transform:translateY(4px);box-shadow:0 1px 0 rgb(var(--ink-rgb)/.2)}'+
'.sayline .st{flex:1;font:700 clamp(17px,2.4vw,22px)/1.3 "Fredoka",sans-serif;color:var(--ink)}'+
'.sayline .dots{display:flex;gap:4px}.sayline .dots i{width:14px;height:14px;border-radius:50%;border:3px solid var(--ink);background:#fff;transition:background .2s}'+
'.sayline .dots i.on{background:var(--bubblegum)}.sayline.done{background:#e3ffef;border-color:var(--mint-deep)}'+
'.loved{text-align:center;padding:10px 0}.loved .big{font:700 clamp(28px,4.6vw,44px)/1.1 "Fredoka",sans-serif;color:var(--bubblegum);-webkit-text-stroke:0;margin:8px 0}'+
'.pnote{background:#f4ecff;border:4px dashed var(--grape);border-radius:16px;padding:14px;font:700 14px/1.55 "Nunito",sans-serif;color:var(--ink)}'+
'.pnote h4{font:700 16px/1.2 "Fredoka",sans-serif;color:var(--grape);margin:0 0 6px}'+
'@media(max-width:760px){.cover{grid-template-columns:1fr;min-height:0}.page.l,.page.r{border-radius:8px;box-shadow:none}.cover::before{display:none}.flip{display:none}}'+
'@media(prefers-reduced-motion:reduce){.brth,.bob,.spin,.flt,.wob{animation:none!important}}'
},D.head);

/* ─────────────── ILLUSTRATION PARTS ───────────────
   Small builders that return SVG strings. All faces have blink lids. */
function eyes(x1,x2,y,r,c1,c2){ return '<circle cx="'+x1+'" cy="'+y+'" r="'+r+'" fill="'+(c1||'#17c7e8')+'" stroke="#201540" stroke-width="3"/><circle cx="'+x2+'" cy="'+y+'" r="'+r+'" fill="'+(c2||'#8b3dff')+'" stroke="#201540" stroke-width="3"/><circle cx="'+(x1-r*.3)+'" cy="'+(y-r*.35)+'" r="'+(r*.3)+'" fill="#fff"/><circle cx="'+(x2-r*.3)+'" cy="'+(y-r*.35)+'" r="'+(r*.3)+'" fill="#fff"/>'; }
function phoenix(x,y,s,mood){ mood=mood||'happy'; var m=mood==='sad'?'M-9 8 q9 -8 18 0':mood==='wow'?'M-6 4 a6 7 0 1 0 12 0 a6 7 0 1 0 -12 0':'M-10 4 q10 12 20 0';
  return '<g transform="translate('+x+','+y+') scale('+s+')" class="brth"><path d="M34 14 q30 -8 26 -40" fill="none" stroke="#201540" stroke-width="12" stroke-linecap="round"/><path d="M34 14 q30 -8 26 -40" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>'+
  '<path d="M-34 8 q-6 40 6 58 q14 8 30 6 q16 2 30 -6 q10 -20 2 -58z" fill="#ff8ad1" stroke="#201540" stroke-width="5" stroke-linejoin="round"/><ellipse cx="-16" cy="70" rx="13" ry="7" fill="#fff" stroke="#201540" stroke-width="4"/><ellipse cx="16" cy="70" rx="13" ry="7" fill="#fff" stroke="#201540" stroke-width="4"/>'+
  '<path d="M-38 -30 L-46 -66 L-16 -46 Z M38 -30 L46 -66 L16 -46 Z" fill="#fff" stroke="#201540" stroke-width="5" stroke-linejoin="round"/><path d="M-33 -36 L-38 -58 L-20 -44 Z M33 -36 L38 -58 L20 -44 Z" fill="#ffb6ce"/>'+
  '<circle cx="0" cy="-20" r="42" fill="#fff" stroke="#201540" stroke-width="5"/><path d="M-28 -50 l8 -16 8 12 8 -18 8 18 8 -12 8 16z" fill="#ffd84d" stroke="#c9a01a" stroke-width="3" stroke-linejoin="round"/>'+
  eyes(-15,15,-24,8)+'<path d="M-5 -6 L5 -6 L0 -1 Z" fill="#ff8fb8" stroke="#201540" stroke-width="2.5"/><path d="'+m+'" transform="translate(0,-2)" stroke="#201540" stroke-width="3.5" fill="none" stroke-linecap="round"/>'+
  '<circle cx="-30" cy="-10" r="8" fill="#ff8fb8" opacity=".55"/><circle cx="30" cy="-10" r="8" fill="#ff8fb8" opacity=".55"/><path d="M-42 -14 h-16 M-42 -6 h-17 M42 -14 h16 M42 -6 h17" stroke="#201540" stroke-width="3" stroke-linecap="round"/></g>'; }
function kevin(x,y,s,mood){ var m=mood==='sad'?'M-10 26 q10 -8 20 0':'M-12 22 q12 12 24 0';
  return '<g transform="translate('+x+','+y+') scale('+s+')" class="brth"><path d="M-60 40 q-40 -10 -50 -50" fill="none" stroke="#ff4d9d" stroke-width="18" stroke-linecap="round"/><path d="M-100 -12 l-14 -18 26 6z" fill="#ffc53d" stroke="#201540" stroke-width="4" stroke-linejoin="round"/>'+
  '<path d="M-20 -10 q-30 -50 -60 -30 q10 30 40 34z M20 -10 q30 -50 60 -30 q-10 30 -40 34z" fill="#c94dff" stroke="#201540" stroke-width="5" stroke-linejoin="round"/>'+
  '<ellipse cx="0" cy="30" rx="58" ry="46" fill="#ff8ad1" stroke="#201540" stroke-width="5"/><ellipse cx="0" cy="40" rx="34" ry="30" fill="#ffd0e8"/>'+
  '<path d="M-30 -20 l8 -22 8 22 M-6 -24 l8 -24 8 24 M18 -20 l8 -22 8 22" fill="#ffc53d" stroke="#201540" stroke-width="4" stroke-linejoin="round"/>'+
  '<circle cx="0" cy="-10" r="44" fill="#ff8ad1" stroke="#201540" stroke-width="5"/><path d="M-40 4 q-14 8 -20 22 q14 4 26 -6z M40 4 q14 8 20 22 q-14 4 -26 -6z" fill="#ff8ad1" stroke="#201540" stroke-width="4"/>'+
  eyes(-16,16,-14,9,'#3fe0a4','#3fe0a4')+'<ellipse cx="-8" cy="8" rx="4" ry="3" fill="#201540"/><ellipse cx="8" cy="8" rx="4" ry="3" fill="#201540"/><path d="'+m+'" stroke="#201540" stroke-width="4" fill="none" stroke-linecap="round"/>'+
  '<path d="M-18 22 l4 8 4 -8 M10 22 l4 8 4 -8" fill="#fff" stroke="#201540" stroke-width="2.5"/><ellipse cx="-30" cy="72" rx="16" ry="9" fill="#ff8ad1" stroke="#201540" stroke-width="4"/><ellipse cx="30" cy="72" rx="16" ry="9" fill="#ff8ad1" stroke="#201540" stroke-width="4"/></g>'; }
function wormy(x,y,s){ return '<g transform="translate('+x+','+y+') scale('+s+')" class="bob">'+[0,1,2,3,4].map(function(i){ return '<circle cx="'+(i*22)+'" cy="'+(i%2?-6:0)+'" r="'+(15-i*.8)+'" fill="'+['#ff4d9d','#ff8a3d','#ffc53d','#3fe0a4','#17c7e8'][i]+'" stroke="#201540" stroke-width="4"/>'; }).join('')+
  '<circle cx="-6" cy="-14" r="9" fill="#fff" stroke="#201540" stroke-width="4"/><circle cx="10" cy="-14" r="9" fill="#fff" stroke="#201540" stroke-width="4"/><circle cx="-5" cy="-14" r="4" fill="#201540"/><circle cx="11" cy="-14" r="4" fill="#201540"/><path d="M-15 -14 h-6 M19 -14 h6" stroke="#201540" stroke-width="3"/><path d="M-2 2 q8 6 14 0" stroke="#201540" stroke-width="3" fill="none" stroke-linecap="round"/></g>'; }
function sun(x,y,r){ return '<g class="spin" style="animation-duration:40s"><g stroke="#ffd84d" stroke-width="'+(r*.18)+'" stroke-linecap="round">'+[0,45,90,135,180,225,270,315].map(function(a){ var A=a*Math.PI/180; return '<path d="M'+(x+Math.cos(A)*r*1.25)+' '+(y+Math.sin(A)*r*1.25)+' L'+(x+Math.cos(A)*r*1.6)+' '+(y+Math.sin(A)*r*1.6)+'"/>'; }).join('')+'</g></g><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#ffd84d" stroke="#e8a800" stroke-width="4"/><circle cx="'+(x-r*.3)+'" cy="'+(y-r*.15)+'" r="'+(r*.1)+'" fill="#7a5a00"/><circle cx="'+(x+r*.3)+'" cy="'+(y-r*.15)+'" r="'+(r*.1)+'" fill="#7a5a00"/><path d="M'+(x-r*.35)+' '+(y+r*.25)+' q'+(r*.35)+' '+(r*.35)+' '+(r*.7)+' 0" stroke="#7a5a00" stroke-width="4" fill="none" stroke-linecap="round"/>'; }
function cloud(x,y,s){ return '<g class="flt" transform="translate('+x+','+y+') scale('+s+')"><path d="M0 0 a22 22 0 0 1 42 -8 20 20 0 0 1 30 22 h-78 a18 18 0 0 1 6 -14z" fill="#fff"/></g>'; }
function room(){ return '<rect width="400" height="300" fill="#ffe1f0"/><rect y="220" width="400" height="80" fill="#d9b184"/><path d="M0 240 H400 M0 260 H400 M0 280 H400" stroke="#c79b6d" stroke-width="3"/><rect x="250" y="40" width="110" height="80" rx="8" fill="#bfeaff" stroke="#201540" stroke-width="5"/><path d="M305 40 v80 M250 80 h110" stroke="#201540" stroke-width="5"/>'+
  '<rect x="30" y="150" width="120" height="70" rx="10" fill="#8b3dff" stroke="#201540" stroke-width="5"/><rect x="24" y="120" width="30" height="100" rx="8" fill="#7f3fd6" stroke="#201540" stroke-width="5"/><rect x="60" y="160" width="60" height="26" rx="10" fill="#fff" stroke="#201540" stroke-width="4"/>'; }
function toy(kind,x,y){ var m={ball:'<circle r="16" fill="#ff4d9d" stroke="#201540" stroke-width="4"/><path d="M0 -16 a16 16 0 0 1 0 32 a9 16 0 0 1 0 -32z" fill="#17c7e8"/><circle r="16" fill="none" stroke="#201540" stroke-width="4"/>',
  block:'<rect x="-15" y="-15" width="30" height="30" rx="6" fill="#ffc53d" stroke="#201540" stroke-width="4"/><text y="8" text-anchor="middle" font-family="Fredoka" font-size="20" font-weight="700" fill="#201540">P</text>',
  bear:'<circle cy="6" r="14" fill="#c9884a" stroke="#201540" stroke-width="4"/><circle cy="-12" r="11" fill="#c9884a" stroke="#201540" stroke-width="4"/><circle cx="-9" cy="-20" r="5" fill="#c9884a" stroke="#201540" stroke-width="3"/><circle cx="9" cy="-20" r="5" fill="#c9884a" stroke="#201540" stroke-width="3"/><circle cx="-4" cy="-13" r="2" fill="#201540"/><circle cx="4" cy="-13" r="2" fill="#201540"/>',
  book:'<rect x="-16" y="-11" width="32" height="22" rx="3" fill="#3fe0a4" stroke="#201540" stroke-width="4"/><path d="M0 -11 v22" stroke="#201540" stroke-width="3"/>',
  sock:'<path d="M-6 -16 h12 v16 q10 4 8 12 q-16 6 -20 -4 z" fill="#ff8a3d" stroke="#201540" stroke-width="4" stroke-linejoin="round"/>',
  car:'<rect x="-18" y="-6" width="36" height="14" rx="5" fill="#17c7e8" stroke="#201540" stroke-width="4"/><path d="M-10 -6 l4 -8 h12 l4 8" fill="#a3ecfa" stroke="#201540" stroke-width="3"/><circle cx="-10" cy="10" r="5" fill="#201540"/><circle cx="10" cy="10" r="5" fill="#201540"/>'};
  return '<g class="hot" data-toy="'+kind+'" transform="translate('+x+','+y+')">'+m[kind]+'</g>'; }
function toybox(x,y,open){ return '<g transform="translate('+x+','+y+')"><rect x="-40" y="-30" width="80" height="44" rx="6" fill="#ff4d9d" stroke="#201540" stroke-width="5"/><rect x="-44" y="'+(open?'-62':'-40')+'" width="88" height="14" rx="5" fill="#c41f6c" stroke="#201540" stroke-width="5" transform="'+(open?'rotate(-30 -44 -40)':'')+'"/><text y="2" text-anchor="middle" font-family="Fredoka" font-size="16" font-weight="700" fill="#fff">TOYS</text></g>'; }
function bike(x,y,rider){ return '<g transform="translate('+x+','+y+')"><circle cx="-30" cy="20" r="22" fill="none" stroke="#201540" stroke-width="6"/><circle cx="30" cy="20" r="22" fill="none" stroke="#201540" stroke-width="6"/><circle cx="-30" cy="20" r="6" fill="#ffc53d"/><circle cx="30" cy="20" r="6" fill="#ffc53d"/><path d="M-30 20 L-8 -12 L22 -12 L30 20 M-8 -12 L2 20 L30 20 M-8 -12 L-14 -22 M22 -12 L26 -26" stroke="#ff4d9d" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'+(rider?phoenix(-2,-42,.5):'')+'</g>'; }
function stars(n){ var s=''; for(var i=0;i<n;i++) s+='<path class="flt" style="animation-duration:'+(3+i%4)+'s" d="M'+(20+i*47%380)+' '+(20+i*31%120)+' l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z" fill="#ffd84d"/>'; return s; }
function badge(x,y,e){ return '<g class="bob" transform="translate('+x+','+y+')"><circle r="24" fill="#fff" stroke="#201540" stroke-width="4"/><text y="10" text-anchor="middle" font-size="26">'+e+'</text></g>'; }

/* ─────────────── THE STORIES ───────────────
   Each page: {art: svg-string, txt: html, hot:{ 'data-toy': [line, sound] }} */
var BOOKS=[
 { id:'cleanup', title:'Clean-Up Kingdom', em:'🧹', c:'#ff4d9d', lesson:'Tidying up',
   say:['I can take care of my things.','A tidy room is a calm brain.','I finish what I start.'],
   note:'Tidying is a self-regulation skill, not a chore. Your child just practiced starting a task, staying with it, and noticing the good feeling at the end — that loop is what builds follow-through. Tonight, try the 10-things game from the story with a real song playing. Your voice makes it stick.',
   pages:[
    {art:function(){ return room()+toy('ball',200,200)+toy('sock',300,205)+toy('block',150,240)+toy('bear',330,250)+toy('book',90,260)+toy('car',240,270)+phoenix(200,110,.6,'wow'); },
     txt:'Princess Phoenix Sparkles opened her bedroom door and… <b>WHOA.</b> Toys. Toys everywhere. A sock on the lamp. A car under the bed. "Who did this?" she asked. (It was her.)',
     hot:{ball:['That is my bouncy ball!','pop'],sock:['A sock! On the FLOOR!','boing'],block:['My P block. P is for Phoenix.','ding'],bear:['Buttons! I was looking for you.','ding'],book:['My favorite book, under a pile.','tap'],car:['Vroom vroom. Wrong parking spot.','pop']}},
    {art:function(){ return room()+toy('ball',200,200)+toy('sock',300,205)+toy('block',150,240)+phoenix(200,110,.6,'sad')+wormy(320,140,.7); },
     txt:'"It is too much," said Phoenix, and she sat down in the middle of it all. "I will NEVER finish." Wormy the Worm wiggled over. "Never?" said Wormy. "Or… <b>not yet?</b>"',
     hot:{ball:['Still here.','tap'],sock:['Still on the floor.','tap'],block:['Waiting.','tap']}},
    {art:function(){ return room()+toybox(330,210,true)+toy('ball',200,200)+toy('sock',300,205)+toy('block',150,240)+phoenix(120,120,.6)+'<g class="bob" transform="translate(60,60)"><rect x="-30" y="-20" width="60" height="40" rx="10" fill="#c9722a" stroke="#201540" stroke-width="4"/><circle r="10" fill="#2a1a10"/><text x="0" y="-26" text-anchor="middle" font-size="20">🎵</text></g>'; },
     txt:'Wormy had a trick. "Turn on the radio. Pick up <b>ten things</b>. Dance in between." Phoenix put on her favorite song. One. Two. Three… <b>Tap each toy to put it in the box!</b>',
     hot:{ball:['One! In the box.','ding'],sock:['Two! Socks go in the basket.','ding'],block:['Three! Blocks stack in the corner.','ding']},cleanup:true},
    {art:function(){ return room()+toybox(330,210,false)+phoenix(150,130,.7)+wormy(60,190,.7)+'<g class="flt"><text x="250" y="90" font-size="30">✨</text><text x="120" y="60" font-size="24">✨</text></g>'; },
     txt:'Ten things. Then ten more. The song ended and Phoenix looked around. The floor! She could <b>see the floor!</b> Her whole body felt lighter. "That felt… good?" she said, surprised.',
     hot:{}},
    {art:function(){ return room()+toybox(330,210,false)+phoenix(200,140,.75)+badge(90,80,'🏆'); },
     txt:'"That is the secret," said Wormy. "Taking care of your things is taking care of <b>you</b>. And you did it. Not somebody else. You." Phoenix bowed to her own clean room. "Thank you, me."',
     hot:{}}
   ]},
 { id:'kevin', title:'The Kind Dragon', em:'🐉', c:'#c94dff', lesson:'Being kind',
   say:['Kind is strong.','My words can make someone\u2019s day.','I choose kind.'],
   note:'Kindness in young children grows fastest when they see it change someone else\u2019s feelings — that cause-and-effect is what this story dramatizes. Over the next few days, when your child is kind, narrate the effect out loud: "Look at her face — you did that." Naming the impact teaches them their words have power.',
   pages:[
    {art:function(){ return '<rect width="400" height="300" fill="#bfeaff"/>'+sun(60,60,26)+cloud(280,50,1)+'<path d="M0 240 q100 -40 200 0 t200 -8 V300 H0z" fill="#8fe08f"/><path d="M0 262 q140 -18 280 0 t120 -4 V300 H0z" fill="#4fbb63"/>'+kevin(280,190,.7)+'<g class="hot" data-toy="rock" transform="translate(100,240)"><ellipse rx="34" ry="20" fill="#7c6a8a" stroke="#3d3350" stroke-width="4"/></g>'; },
     txt:'Kevin was a dragon. A <b>pink</b> dragon. And instead of fire, when Kevin breathed out… glitter came out. The other dragons laughed. "Glitter?" they roared. "What good is <b>glitter</b>?"',
     hot:{rock:['A rock. Kevin used to sit on it and feel small.','tap']}},
    {art:function(){ return '<rect width="400" height="300" fill="#bfeaff"/>'+cloud(60,40,.9)+'<path d="M0 240 q100 -40 200 0 t200 -8 V300 H0z" fill="#8fe08f"/><path d="M0 262 q140 -18 280 0 t120 -4 V300 H0z" fill="#4fbb63"/>'+kevin(120,200,.65,'sad')+phoenix(300,200,.6,'sad')+'<text class="hot" data-toy="tear" x="300" y="150" font-size="26">💧</text>'; },
     txt:'One day Kevin found Princess Phoenix sitting by the pond, crying. Her crown had fallen in the water and floated away. "It is gone," she sniffed. "It is <b>gone forever.</b>"',
     hot:{tear:['A tear. Everybody cries sometimes. Even princesses.','tap']}},
    {art:function(){ return '<rect width="400" height="300" fill="#bfeaff"/><path d="M0 240 q100 -40 200 0 t200 -8 V300 H0z" fill="#8fe08f"/><path d="M0 262 q140 -18 280 0 t120 -4 V300 H0z" fill="#4fbb63"/>'+kevin(120,200,.65)+phoenix(300,200,.6,'wow')+'<g class="hot" data-toy="glit">'+[0,1,2,3,4,5,6,7].map(function(i){ return '<path class="flt" style="animation-duration:'+(2+i%3)+'s" d="M'+(180+i*16)+' '+(150-i*10%40)+' l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z" fill="'+['#fff','#ffd84d','#ff9ec2','#a3ecfa'][i%4]+'"/>'; }).join('')+'</g>'; },
     txt:'Kevin did not know what to say. So he did the only thing he could. He took a big breath… and <b>breathed glitter</b> all over her. Sparkles landed on her ears. Her nose. Her whiskers. <b>Tap the glitter!</b>',
     hot:{glit:['Sparkles everywhere! Phoenix could not help it. She giggled.','sparkle']}},
    {art:function(){ return '<rect width="400" height="300" fill="#bfeaff"/>'+sun(340,50,24)+'<path d="M0 240 q100 -40 200 0 t200 -8 V300 H0z" fill="#8fe08f"/><path d="M0 262 q140 -18 280 0 t120 -4 V300 H0z" fill="#4fbb63"/>'+kevin(120,200,.65)+phoenix(300,200,.6)+'<g class="hot bob" data-toy="crown" transform="translate(210,90)"><path d="M-24 10 l6 -22 8 14 10 -22 10 22 8 -14 6 22z" fill="#ffd84d" stroke="#c9a01a" stroke-width="3" stroke-linejoin="round"/></g>'; },
     txt:'"You made me laugh," said Phoenix. "I forgot I was sad for a whole minute." Then she looked up. Her crown was in a tree, sparkling. It had never floated away at all. "You are the <b>kindest dragon</b> I have ever met."',
     hot:{crown:['The crown was there the whole time. She just could not see it through the tears.','ding']}},
    {art:function(){ return '<rect width="400" height="300" fill="#f4ecff"/>'+stars(9)+kevin(200,190,.8)+badge(320,90,'💖')+badge(80,90,'✨'); },
     txt:'Kevin walked home taller. Glitter was not nothing. Glitter was <b>kind</b>. And kind, it turned out, was the strongest thing a dragon could be. Stronger than fire. Stronger than roaring. Kind.',
     hot:{}}
   ]},
 { id:'yet', title:'I Can\u2019t… Yet', em:'🚲', c:'#17c7e8', lesson:'Trying hard things',
   say:['I can\u2019t do it… YET.','My brain grows when it is hard.','I keep going.'],
   note:'This is the core growth-mindset move: adding "yet" turns a verdict into a status update. Kids who hear it consistently from a parent take on harder tasks and recover faster from failure. When your child says "I can\u2019t," try just answering "…yet," and wait. The word does the work.',
   pages:[
    {art:function(){ return '<rect width="400" height="300" fill="#bfeaff"/>'+sun(60,50,24)+cloud(300,40,.9)+'<rect y="230" width="400" height="70" fill="#8a8a8a"/><path d="M0 265 H400" stroke="#fff" stroke-width="4" stroke-dasharray="24 18"/><path d="M0 230 H400" stroke="#4fbb63" stroke-width="14"/>'+bike(200,205,false)+phoenix(90,180,.6,'wow'); },
     txt:'It was pink. It had a bell. It had streamers. It was the most beautiful bike in the world, and Princess Phoenix Sparkles had <b>no idea</b> how to ride it.',
     hot:{}},
    {art:function(){ return '<rect width="400" height="300" fill="#bfeaff"/><rect y="230" width="400" height="70" fill="#8a8a8a"/><path d="M0 265 H400" stroke="#fff" stroke-width="4" stroke-dasharray="24 18"/><path d="M0 230 H400" stroke="#4fbb63" stroke-width="14"/><g transform="rotate(-40 200 210)">'+bike(200,205,true)+'</g><text class="hot" data-toy="bonk" x="120" y="120" font-size="30">💥</text>'; },
     txt:'She got on. She fell off. She got on. She fell off. She got on… she fell <b>off</b>. "I CAN\u2019T DO IT," she shouted, and she threw her helmet on the grass.',
     hot:{bonk:['BONK. That was the fourth time.','boing']}},
    {art:function(){ return '<rect width="400" height="300" fill="#bfeaff"/><rect y="230" width="400" height="70" fill="#8a8a8a"/><path d="M0 230 H400" stroke="#4fbb63" stroke-width="14"/>'+bike(300,205,false)+phoenix(120,190,.6,'sad')+wormy(200,120,.7)+'<g class="hot bob" data-toy="brain" transform="translate(60,70)"><ellipse rx="26" ry="20" fill="#ff9ec2" stroke="#201540" stroke-width="4"/><path d="M-14 -10 q6 10 0 20 M0 -16 q6 10 0 20 M14 -10 q6 10 0 20" stroke="#201540" stroke-width="3" fill="none"/></g>'; },
     txt:'Wormy crawled onto her shoe. "You can\u2019t do it," Wormy agreed. Phoenix blinked. "…<b>yet.</b>" said Wormy. "You can\u2019t do it YET. Your brain is building the bike-riding part right now. Every fall is a brick."',
     hot:{brain:['Your brain! Every time something is hard, it grows a little. Like a muscle.','ding']}},
    {art:function(){ return '<rect width="400" height="300" fill="#bfeaff"/>'+sun(340,50,24)+'<rect y="230" width="400" height="70" fill="#8a8a8a"/><path d="M0 265 H400" stroke="#fff" stroke-width="4" stroke-dasharray="24 18"/><path d="M0 230 H400" stroke="#4fbb63" stroke-width="14"/><g class="hot" data-toy="ride"><g transform="rotate(-6 200 210)">'+bike(200,205,true)+'</g></g><text class="flt" x="290" y="130" font-size="26">💨</text>'; },
     txt:'So she said it. Out loud. "I can\u2019t do it <b>yet</b>." And she got back on. Wobble. Wobble. Wobble… and then… <b>no wobble.</b> Tap the bike!',
     hot:{ride:['She is RIDING! Look at her go! Wheeeee!','win']}},
    {art:function(){ return '<rect width="400" height="300" fill="#f4ecff"/>'+stars(8)+phoenix(200,170,.85)+badge(320,80,'🚲')+badge(80,80,'🧠'); },
     txt:'That night Phoenix lay in bed and thought about all the things she couldn\u2019t do. Tie her shoes. Read big books. Whistle. Then she smiled, and added one word to every single one. <b>Yet.</b>',
     hot:{}}
   ]},
 { id:'body', title:'Brush, Brush, Sparkle', em:'🦷', c:'#3fe0a4', lesson:'Taking care of your body',
   say:['My body is my home.','I take care of me.','Strong, clean, rested — that is me!'],
   note:'Bodily routines (brushing, washing, sleep) stick better when a child feels ownership — "my body, my job" — rather than compliance. The story frames each routine as something Phoenix chooses. Try letting your child "be the boss" of one routine this week, with you as the assistant.',
   pages:[
    {art:function(){ return room()+phoenix(200,140,.75,'wow')+'<g class="hot" data-toy="mirror" transform="translate(320,120)"><ellipse rx="34" ry="44" fill="#e8f6ff" stroke="#c9a01a" stroke-width="8"/><text y="10" text-anchor="middle" font-size="30">😬</text></g>'; },
     txt:'Phoenix looked in the mirror and smiled her biggest smile. Something was… <b>fuzzy</b>. On her teeth. "Sugar bugs," whispered the mirror. (Mirrors in Phoenix\u2019s World can talk. It is a whole thing.)',
     hot:{mirror:['The mirror says: those are sugar bugs, and they LOVE cookies.','tap']}},
    {art:function(){ return room()+phoenix(160,150,.7)+'<g class="hot bob" data-toy="brush" transform="translate(300,160)"><rect x="-6" y="-50" width="12" height="100" rx="6" fill="#ff4d9d" stroke="#201540" stroke-width="4"/><rect x="-10" y="-56" width="20" height="24" rx="4" fill="#fff" stroke="#201540" stroke-width="3"/></g><text x="80" y="80" font-size="26" class="flt">🎵</text>'; },
     txt:'"Two whole minutes," said Phoenix. "That is one whole song." She sang and she brushed. Top teeth. Bottom teeth. The tricky back ones. <b>Tap the toothbrush</b> to help!',
     hot:{brush:['Scrub scrub scrub! The sugar bugs are running away!','tap']}},
    {art:function(){ return room()+phoenix(200,140,.75)+'<g class="hot" data-toy="bubble"><circle class="flt" cx="300" cy="90" r="18" fill="#a3ecfa" opacity=".7" stroke="#fff" stroke-width="3"/><circle class="flt" cx="330" cy="140" r="12" fill="#a3ecfa" opacity=".7" stroke="#fff" stroke-width="3"/><circle class="flt" cx="90" cy="100" r="15" fill="#a3ecfa" opacity=".7" stroke="#fff" stroke-width="3"/></g>'; },
     txt:'Then hands. Soap, water, and the <b>whole ABC song</b> while she scrubbed. Germs are too small to see, but soap makes them slide right off. Pop the bubbles!',
     hot:{bubble:['Pop! Clean hands, ready for anything.','pop']}},
    {art:function(){ return room()+'<g class="hot" data-toy="plate" transform="translate(300,200)"><circle r="40" fill="#fff" stroke="#201540" stroke-width="4"/><text y="10" text-anchor="middle" font-size="34">🥕🍎</text></g>'+phoenix(150,150,.7)+'<g class="hot bob" data-toy="water" transform="translate(70,200)"><path d="M-14 -30 h28 l-4 60 h-20z" fill="#bfeaff" stroke="#201540" stroke-width="4"/><path d="M-11 -10 h22 l-3 38 h-16z" fill="#4fb8ff"/></g>'; },
     txt:'Dinner was carrots, which help your eyes, and apples, which help everything. And <b>water</b>. Water is the best drink in the whole world. Even better than chocolate milk. Do not tell the milk.',
     hot:{plate:['Crunch! Carrots help you see in the dark. Kind of.','tap'],water:['Glug glug. Water is what your body is mostly made of!','ding']}},
    {art:function(){ return '<rect width="400" height="300" fill="#1a0f33"/>'+stars(12)+'<circle cx="330" cy="60" r="30" fill="#fff3c4"/><rect x="60" y="180" width="280" height="80" rx="16" fill="#8b3dff" stroke="#201540" stroke-width="5"/><rect x="80" y="150" width="240" height="50" rx="14" fill="#ff8ad1" stroke="#201540" stroke-width="5"/>'+phoenix(200,140,.6)+'<text class="flt" x="270" y="110" font-size="28" fill="#fff">z</text><text class="flt" x="300" y="80" font-size="22" fill="#fff">z</text>'; },
     txt:'And then — the most important part. <b>Sleep.</b> Ten whole hours. While she slept, her brain sorted the whole day and filed it away, like a tiny librarian. Goodnight, Phoenix. Your body says thank you.',
     hot:{}}
   ]}
];

/* ─────────────── THE BOOK ─────────────── */
var mount=$('storyMount'); if(!mount) return; mount.classList.add('filled');
mount.innerHTML='<div class="bookshelf" id="shelfBooks"></div><div class="book" id="book"></div><div class="bnav" id="bnav"></div>';
var shelfEl=$('shelfBooks'), bookEl=$('book'), nav=$('bnav'), cur=null, pg=0, sayDone={};
BOOKS.forEach(function(b,i){ var s=H('button',{type:'button','class':'spine','aria-pressed':'false'},shelfEl); s.style.background='linear-gradient(180deg,'+b.c+','+b.c+'cc)';
  s.innerHTML='<span>'+b.title+'</span><span class="em">'+b.em+'</span><span style="font-size:13px;opacity:.9">'+b.lesson+'</span>';
  s.addEventListener('click',function(){ open(i); }); });

function pageHTML(b,idx,side){ var total=b.pages.length+3; var n=idx+1;
  if(idx<b.pages.length){ var p=b.pages[idx]; return '<div class="page '+side+'" data-idx="'+idx+'"><div class="art"><svg viewBox="0 0 400 300">'+p.art()+'</svg></div><p class="txt">'+p.txt+'</p>'+(Object.keys(p.hot).length?'<span class="hint">👆 tap the picture</span>':'')+'<span class="num">'+n+' / '+total+'</span></div>'; }
  if(idx===b.pages.length){ return '<div class="page '+side+'" data-idx="'+idx+'" data-say="1"><h3 style="text-align:center;font-size:26px;margin:4px 0 8px">Say it out loud!</h3><p class="txt" style="margin:0 0 6px;text-align:center;font-size:15px">Tap each line. Say it together <b>five times</b>. Watch the dots fill up.</p>'+
    b.say.map(function(l,k){ return '<div class="sayline" data-k="'+k+'" role="button" tabindex="0"><span class="st">'+l+'</span><span class="dots"><i></i><i></i><i></i><i></i><i></i></span></div>'; }).join('')+'<span class="num">'+n+' / '+total+'</span></div>'; }
  if(idx===b.pages.length+1){ return '<div class="page '+side+'" data-idx="'+idx+'"><div class="art"><svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#ffe1f0"/>'+stars(10)+phoenix(200,160,.9)+'<g class="flt"><text x="60" y="80" font-size="34">💖</text><text x="300" y="60" font-size="30">💖</text><text x="330" y="220" font-size="26">💖</text></g></svg></div>'+
    '<div class="loved"><div class="big">You are so loved.</div><p class="txt" style="margin:4px 0 0">And you are more amazing than you even know. Phoenix says so, and Phoenix makes the rulz.</p></div><span class="num">'+n+' / '+total+'</span></div>'; }
  return '<div class="page '+side+'" data-idx="'+idx+'"><div class="pnote"><h4>For the grown-up 👋</h4>'+b.note+'<br><br><b>What just happened:</b> your child said three confidence sentences out loud, five times each, with you beside them. Repetition plus your voice is how a sentence becomes a belief. Keep it up — same book tomorrow works even better than a new one.</div><span class="num">'+n+' / '+total+'</span></div>'; }

function render(){ var b=cur, wide=window.innerWidth>760, total=b.pages.length+3; clear(bookEl);
  var cov=H('div',{'class':'cover'},bookEl); cov.style.setProperty('--bookc',b.c);
  if(wide){ var li=pg-(pg%2), ri=li+1; cov.innerHTML=(li<total?pageHTML(b,li,'l'):'<div class="page l"></div>')+(ri<total?pageHTML(b,ri,'r'):'<div class="page r"></div>'); }
  else cov.innerHTML=pageHTML(b,pg,'l');
  wire(cov); renderNav(); }
function wire(root){
  root.querySelectorAll('.hot').forEach(function(h){ h.addEventListener('click',function(e){ e.stopPropagation(); var page=h.closest('.page'), idx=+page.dataset.idx, p=cur.pages[idx], key=h.dataset.toy, info=p.hot[key]; if(!info) return;
    h.classList.remove('wob'); void h.getBBox&&h.getBBox(); h.classList.add('wob'); if(SND[info[1]]) SND[info[1]](); say(info[0]);
    var r=h.getBoundingClientRect(); P.sparkleAt(r.left+r.width/2,r.top+r.height/2,10);
    if(p.cleanup){ setTimeout(function(){ h.classList.add('gone'); },300); var left=page.querySelectorAll('.hot:not(.gone)').length-1; if(left<=0) setTimeout(function(){ say('All in the box! Turn the page.'); SND.win(); P.confetti(40); },700); } }); });
  root.querySelectorAll('.sayline').forEach(function(l){ var k=l.dataset.k, key=cur.id+k; sayDone[key]=sayDone[key]||0; paintDots(l,sayDone[key]);
    function hit(){ if(sayDone[key]>=5) return; sayDone[key]++; paintDots(l,sayDone[key]); say(cur.say[k]); SND.tone(440+sayDone[key]*60,0.2,'sine',0.09); if(sayDone[key]>=5){ l.classList.add('done'); SND.win(); var r=l.getBoundingClientRect(); P.sparkleAt(r.left+r.width/2,r.top+r.height/2,16);
      var all=cur.say.every(function(_,i){ return sayDone[cur.id+i]>=5; }); if(all){ setTimeout(function(){ say('You said them all. Five times each. That is how a brain learns something is true.'); P.confetti(80); },500); } } }
    l.addEventListener('click',hit); l.addEventListener('keydown',function(e){ if(e.key===' '||e.key==='Enter'){ hit(); e.preventDefault(); } }); });
}
function paintDots(l,n){ l.querySelectorAll('.dots i').forEach(function(d,i){ d.classList.toggle('on',i<n); }); }
function renderNav(){ var total=cur.pages.length+3, wide=window.innerWidth>760, step=wide?2:1; nav.innerHTML='';
  var prev=H('button',{type:'button','class':'bbtn wh',text:'◀ Back'},nav); prev.disabled=pg<=0; prev.addEventListener('click',function(){ turn(-step); });
  H('span',{'class':'bprog',text:cur.title+' · page '+(pg+1)+' of '+total},nav);
  var next=H('button',{type:'button','class':'bbtn pk',text:'Turn the page ▶'},nav); next.disabled=pg+step>=total; next.addEventListener('click',function(){ turn(step); });
  var read=H('button',{type:'button','class':'bbtn mt',text:'🔊 Read to me'},nav); read.addEventListener('click',function(){ var t=[].map.call(bookEl.querySelectorAll('.page .txt'),function(p){ return p.textContent; }).join(' '); say(t.replace(/\s+/g,' ')); SND.tap(); });
  var sh=H('button',{type:'button','class':'bbtn',text:'📚 Bookshelf'},nav); sh.addEventListener('click',function(){ cur=null; clear(bookEl); nav.innerHTML=''; shelfEl.querySelectorAll('.spine').forEach(function(x){ x.setAttribute('aria-pressed','false'); }); SND.whoosh(); }); }
function turn(step){ var total=cur.pages.length+3, next=Math.max(0,Math.min(total-1,pg+step)); if(next===pg) return;
  SND.noise(0.25,0.06,3000); /* paper */
  if(window.innerWidth>760 && !P.REDUCED){ var cov=bookEl.querySelector('.cover'); var fwd=step>0; var flip=H('div',{'class':'flip'+(fwd?'':' flipback')},cov);
    var from=cov.querySelector(fwd?'.page.r':'.page.l'); var f=H('div',{'class':'f'},flip); f.appendChild(from.cloneNode(true)); f.firstChild.style.height='100%';
    var b=H('div',{'class':'b'},flip); b.innerHTML='<div class="page '+(fwd?'l':'r')+'" style="height:100%"></div>';
    flip.classList.add('flipping'); pg=next; setTimeout(render,780); }
  else { pg=next; render(); } }
function open(i){ cur=BOOKS[i]; pg=0; shelfEl.querySelectorAll('.spine').forEach(function(x,k){ x.setAttribute('aria-pressed',k===i?'true':'false'); }); SND.ding(); say(cur.title); render(); bookEl.scrollIntoView({behavior:'smooth',block:'center'}); }
var rt; window.addEventListener('resize',function(){ if(!cur) return; clearTimeout(rt); rt=setTimeout(render,200); });

/* blink every face in every open illustration, on its own timer */
setInterval(function(){ if(D.hidden||D.body.classList.contains('calm')) return; var faces=bookEl.querySelectorAll('.brth'); if(!faces.length) return; var f=pick([].slice.call(faces)); f.style.transition='transform .1s'; f.style.transform='scaleY(.92)'; setTimeout(function(){ f.style.transform=''; },120); },2600);
})();
