/* ═══════════════════════════════════════════════════════════════════
   PHOENIX'S WORLD — phoenix.js  (Drop 3)
   Princess Phoenix Sparkles, rebuilt.

   · ARRIVAL: a rainbow arcs across the WHOLE screen behind her, and she
     genuinely slides down it (SVG motion path, auto-rotate, real speed
     curve), lands, bounces, and her chat card pops open.
   · EXIT: no explosion. She spins into a swirl of sparkles.
   · UNICORN: horn on the forehead, facing the way it runs, she is SEATED
     on its back with legs showing. It gallops a lap, then dives into a
     black portal that closes behind them.
   · CLOSE BUTTON: works. Big, obvious, keyboard-friendly.
   · The floating oval shadow is gone.
   · PASSWORD GATE: window.PWcheckSecret (index.html) hashes what she
     types. The word never appears here. Phoenix Mode = extra lines,
     "birthday season" hello in late Sept / early Oct, no dates exposed.
   · KNOWLEDGE BASE doubled. "Why?" chains survive three follow-ups.
     She remembers what you told her you like for the session.
   · VOICE: highest-pitched young female voice available on the device.

   All CSS is injected, so phoenix.css is no longer required (leaving
   the <link> in place is harmless).
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var D=document, NS='http://www.w3.org/2000/svg';
var P=window.PW||{};
function E(t,a,p){var e=D.createElementNS(NS,t);if(a)for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
function H(t,a,p){var e=D.createElement(t);if(a)for(var k in a){if(k==='html')e.innerHTML=a[k];else if(k==='text')e.textContent=a[k];else e.setAttribute(k,a[k]);}if(p)p.appendChild(e);return e;}
function rnd(a,b){return a+Math.random()*(b-a);} function pick(a){return a[Math.floor(Math.random()*a.length)];}
var SND=P.SND||{on:true}; function snd(n){ if(SND[n]) SND[n](); }
var FACES={happy:'/images/face-happy.jpg',talk:'/images/face-talk.jpg',silly:'/images/face-silly.jpg'};
var FACE=FACES.happy;   /* her resting face; talk / silly swap in while she speaks or jokes */
function setFace(m){ var src=FACES[m]||FACES.happy; D.querySelectorAll('.pxPhoto').forEach(function(img){ img.setAttribute('href',src); }); }

/* ───────────── STYLES ───────────── */
H('style',{html:
'#pxStage{position:fixed;inset:0;z-index:2300;pointer-events:none;overflow:hidden}'+
'#pxStage svg{width:100%;height:100%;display:block}'+
'#pxCard{position:fixed;right:16px;bottom:16px;z-index:2400;width:min(92vw,380px);max-height:74vh;display:flex;flex-direction:column;'+
 'border:6px solid #201540;border-radius:28px;background:#fff;box-shadow:0 14px 0 rgb(32 21 64/.3);transform:translateY(120%) scale(.9);opacity:0;'+
 'transition:transform .5s cubic-bezier(.3,1.4,.5,1),opacity .4s;font:800 16px/1.45 "Nunito",system-ui,sans-serif;color:#201540}'+
'#pxCard.on{transform:none;opacity:1}'+
'#pxHead{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:5px solid #201540;background:linear-gradient(90deg,#ff9ed2,#c58cff);border-radius:22px 22px 0 0}'+
'#pxHead .who{flex:1;font:700 18px/1.1 "Fredoka",sans-serif;color:#fff;text-shadow:0 2px 0 #201540}'+
'#pxHead .who small{display:block;font:800 12px/1.2 "Nunito",sans-serif;color:#201540;text-shadow:none;margin-top:3px}'+
'#pxMini{width:54px;height:54px;flex:0 0 auto}#pxMini svg{width:100%;height:100%;display:block}'+
'#pxClose{width:50px;height:50px;border:5px solid #201540;border-radius:50%;background:#ff4d9d;color:#fff;font:700 26px/1 "Fredoka",sans-serif;cursor:pointer;'+
 'box-shadow:0 5px 0 #c41f6c;flex:0 0 auto;display:grid;place-items:center;padding:0}'+
'#pxClose:active{transform:translateY(4px);box-shadow:0 1px 0 #c41f6c}'+
'#pxLog{flex:1;overflow:auto;padding:12px;display:flex;flex-direction:column;gap:9px;scroll-behavior:smooth}'+
'.pxb{max-width:88%;padding:10px 14px;border:4px solid #201540;border-radius:18px;background:#fff3fa;box-shadow:0 4px 0 rgb(32 21 64/.18);animation:pxpop .3s cubic-bezier(.3,1.6,.5,1)}'+
'.pxb.me{align-self:flex-end;background:#e3f6ff;border-bottom-right-radius:6px}.pxb.her{align-self:flex-start;border-bottom-left-radius:6px}'+
'@keyframes pxpop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}'+
'#pxChips{display:flex;gap:7px;flex-wrap:wrap;padding:0 12px 10px}'+
'.pxc{padding:8px 13px;border:4px solid #201540;border-radius:999px;background:#ffe08a;font:700 13px/1 "Fredoka",sans-serif;color:#201540;cursor:pointer;box-shadow:0 4px 0 #c98d00}'+
'.pxc:active{transform:translateY(3px);box-shadow:0 1px 0 #c98d00}'+
'#pxForm{display:flex;gap:8px;padding:0 12px 12px}'+
'#pxIn{flex:1;min-width:0;padding:11px 14px;border:4px solid #201540;border-radius:999px;font:800 16px/1 "Nunito",sans-serif;color:#201540;background:#fff}'+
'#pxSend{width:52px;height:52px;border:4px solid #201540;border-radius:50%;background:#3fe0a4;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #18a877;padding:0}'+
'#pxSend:active{transform:translateY(3px);box-shadow:0 1px 0 #18a877}'+
'#pxOpen{position:fixed;right:16px;bottom:16px;z-index:2400;width:84px;height:84px;border:6px solid #201540;border-radius:50%;background:#fff;cursor:pointer;padding:6px;'+
 'box-shadow:0 8px 0 rgb(32 21 64/.3);display:none;animation:pxbob 3s ease-in-out infinite}'+
'#pxOpen.on{display:block}#pxOpen svg{width:100%;height:100%;display:block}'+
'@keyframes pxbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}'+
'.pxgallop{animation:pxgallop .42s ease-in-out infinite;transform-box:fill-box;transform-origin:center 90%}'+
'@keyframes pxgallop{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-14px) rotate(3deg)}}'+
'.pxleg{transform-box:fill-box;transform-origin:50% 0;animation:pxleg .42s ease-in-out infinite}'+
'.pxleg.b{animation-delay:-.21s}'+
'@keyframes pxleg{0%,100%{transform:rotate(-28deg)}50%{transform:rotate(28deg)}}'+
'@media(max-width:640px){#pxCard{right:8px;bottom:8px;width:calc(100vw - 16px)}}'+
'@media(prefers-reduced-motion:reduce){#pxCard,.pxb,#pxOpen,.pxgallop,.pxleg{animation:none!important;transition:none!important}}'
},D.head);

/* ───────────── HER SVG ─────────────
   Built once as a string so it can live in the arrival overlay, the
   unicorn overlay, and the little avatar. viewBox -110 -150 220 270. */
function phoenixSVG(id){
  return '<g id="'+id+'">'+
  '<path d="M52 40 q46 -10 40 -60" fill="none" stroke="#201540" stroke-width="18" stroke-linecap="round"/>'+
  '<path d="M52 40 q46 -10 40 -60" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round"/>'+
  '<path d="M-52 20 q-10 60 8 88 q22 12 48 8 q26 4 46 -10 q16 -30 4 -86 z" fill="#ff8ad1" stroke="#201540" stroke-width="7" stroke-linejoin="round"/>'+
  '<path d="M-46 30 q34 14 84 0 M-50 58 q40 16 92 0 M-48 84 q40 14 92 0" stroke="#ff4d9d" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>'+
  '<ellipse cx="-26" cy="106" rx="20" ry="11" fill="#fff" stroke="#201540" stroke-width="6"/><ellipse cx="26" cy="106" rx="20" ry="11" fill="#fff" stroke="#201540" stroke-width="6"/>'+
  '<path d="M-60 34 q-30 20 -26 54" stroke="#201540" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-60 34 q-30 20 -26 54" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>'+
  '<path d="M60 34 q30 20 26 54" stroke="#201540" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M60 34 q30 20 26 54" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>'+
  '<path d="M-58 -48 L-70 -104 L-24 -74 Z" fill="#fff" stroke="#201540" stroke-width="7" stroke-linejoin="round"/><path d="M58 -48 L70 -104 L24 -74 Z" fill="#fff" stroke="#201540" stroke-width="7" stroke-linejoin="round"/>'+
  '<path d="M-52 -56 L-60 -90 L-30 -70 Z" fill="#ffb6ce"/><path d="M52 -56 L60 -90 L30 -70 Z" fill="#ffb6ce"/>'+
  '<circle cx="0" cy="-30" r="66" fill="#fff" stroke="#201540" stroke-width="7"/>'+
  '<path d="M-44 -78 l12 -26 12 20 12 -30 12 30 12 -20 12 26 z" fill="#ffd84d" stroke="#c9a01a" stroke-width="4" stroke-linejoin="round"/>'+
  '<circle cx="-32" cy="-98" r="5" fill="#ff4d9d"/><circle cx="0" cy="-108" r="6" fill="#17c7e8"/><circle cx="32" cy="-98" r="5" fill="#3fe0a4"/>'+
  '<clipPath id="'+id+'-face"><circle cx="0" cy="-26" r="50"/></clipPath>'+
  '<g class="pxDrawn"><circle cx="-24" cy="-36" r="12" fill="#17c7e8" stroke="#201540" stroke-width="4"/><circle cx="24" cy="-36" r="12" fill="#8b3dff" stroke="#201540" stroke-width="4"/>'+
  '<circle cx="-26" cy="-40" r="4" fill="#fff"/><circle cx="22" cy="-40" r="4" fill="#fff"/>'+
  '<path d="M-7 -8 L7 -8 L0 0 Z" fill="#ff8fb8" stroke="#201540" stroke-width="3" stroke-linejoin="round"/><path d="M0 0 q-10 10 -20 3 M0 0 q10 10 20 3" stroke="#201540" stroke-width="4" fill="none" stroke-linecap="round"/>'+
  '<circle cx="-44" cy="-16" r="11" fill="#ff8fb8" opacity=".55"/><circle cx="44" cy="-16" r="11" fill="#ff8fb8" opacity=".55"/></g>'+
  '<image class="pxPhoto" href="'+FACE+'" x="-50" y="-76" width="100" height="100" clip-path="url(#'+id+'-face)" preserveAspectRatio="xMidYMid slice"/>'+
  '<path d="M-66 -22 h-30 M-66 -10 h-32 M66 -22 h30 M66 -10 h32" stroke="#201540" stroke-width="4" stroke-linecap="round"/>'+
  '</g>';
}
function wirePhoto(root){ root.querySelectorAll('.pxPhoto').forEach(function(img){ img.addEventListener('error',function(){ img.remove(); }); }); }

/* ───────────── THE UNICORN (facing RIGHT, horn on the forehead) ───────────── */
function unicornSVG(){
  return '<g id="pxUni" class="pxgallop">'+
  /* tail */ '<path d="M-150 -20 q-50 -10 -60 40" stroke="#ff4d9d" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-150 -12 q-42 -4 -50 36" stroke="#8b3dff" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-152 -4 q-34 0 -40 30" stroke="#17c7e8" stroke-width="7" fill="none" stroke-linecap="round"/>'+
  /* back legs */ '<g class="pxleg" transform="translate(-110,40)"><rect x="-13" y="0" width="26" height="80" rx="12" fill="#fff" stroke="#201540" stroke-width="6"/><ellipse cx="0" cy="82" rx="18" ry="9" fill="#ffd84d" stroke="#201540" stroke-width="5"/></g>'+
  '<g class="pxleg b" transform="translate(-70,44)"><rect x="-13" y="0" width="26" height="80" rx="12" fill="#f1eefc" stroke="#201540" stroke-width="6"/><ellipse cx="0" cy="82" rx="18" ry="9" fill="#ffd84d" stroke="#201540" stroke-width="5"/></g>'+
  /* body */ '<ellipse cx="-40" cy="0" rx="120" ry="62" fill="#fff" stroke="#201540" stroke-width="7"/>'+
  /* saddle (where she sits) */ '<path d="M-90 -50 q50 -20 100 0 q4 30 -6 46 q-46 10 -88 0 q-12 -18 -6 -46z" fill="#ff8ad1" stroke="#201540" stroke-width="6" stroke-linejoin="round"/>'+
  /* front legs */ '<g class="pxleg b" transform="translate(10,40)"><rect x="-13" y="0" width="26" height="80" rx="12" fill="#fff" stroke="#201540" stroke-width="6"/><ellipse cx="0" cy="82" rx="18" ry="9" fill="#ffd84d" stroke="#201540" stroke-width="5"/></g>'+
  '<g class="pxleg" transform="translate(50,36)"><rect x="-13" y="0" width="26" height="80" rx="12" fill="#f1eefc" stroke="#201540" stroke-width="6"/><ellipse cx="0" cy="82" rx="18" ry="9" fill="#ffd84d" stroke="#201540" stroke-width="5"/></g>'+
  /* neck + head, to the RIGHT */ '<path d="M40 -30 q30 -60 70 -90 q34 -6 46 20 q-10 30 -46 40 q-30 10 -50 40 z" fill="#fff" stroke="#201540" stroke-width="7" stroke-linejoin="round"/>'+
  '<ellipse cx="128" cy="-92" rx="44" ry="34" fill="#fff" stroke="#201540" stroke-width="7"/><path d="M160 -84 q30 -4 34 16 q-16 14 -40 6z" fill="#fff" stroke="#201540" stroke-width="6" stroke-linejoin="round"/>'+
  /* HORN — on the forehead, pointing up-forward */ '<path d="M118 -124 L140 -196 L150 -122 Z" fill="#ffd84d" stroke="#c9a01a" stroke-width="5" stroke-linejoin="round"/><path d="M124 -140 l20 -4 M128 -160 l16 -4 M132 -178 l10 -3" stroke="#c9a01a" stroke-width="4" stroke-linecap="round"/>'+
  /* ear */ '<path d="M100 -118 L104 -146 L122 -122 Z" fill="#fff" stroke="#201540" stroke-width="6" stroke-linejoin="round"/>'+
  /* mane, streaming BACK along the neck */ '<path d="M108 -126 q-40 20 -50 70" stroke="#ff4d9d" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M96 -120 q-36 26 -44 74" stroke="#8b3dff" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M84 -108 q-28 30 -34 70" stroke="#17c7e8" stroke-width="9" fill="none" stroke-linecap="round"/>'+
  /* eye, nostril, cheek */ '<circle cx="146" cy="-100" r="10" fill="#fff" stroke="#201540" stroke-width="4"/><circle cx="149" cy="-100" r="4.5" fill="#201540"/><circle cx="178" cy="-74" r="3.5" fill="#201540"/><circle cx="140" cy="-76" r="9" fill="#ff8fb8" opacity=".55"/>'+
  '</g>';
}

/* ───────────── STAGE (full-screen overlay for arrival / exit) ───────────── */
var stage=H('div',{id:'pxStage'},D.body);
var ssvg=E('svg',{viewBox:'0 0 1000 700',preserveAspectRatio:'xMidYMid slice'},stage);
var arr=null;

/* ───────────── CARD ───────────── */
var card=H('div',{id:'pxCard',role:'dialog','aria-label':'Chat with Princess Phoenix Sparkles'},D.body);
card.innerHTML='<div id="pxHead"><div id="pxMini"><svg viewBox="-110 -150 220 270">'+phoenixSVG('pxAv')+'</svg></div>'+
 '<div class="who">Princess Phoenix Sparkles<small id="pxSub">Royal guide of this whole world 👑</small></div>'+
 '<button id="pxClose" type="button" aria-label="Close and say goodbye to Phoenix">✕</button></div>'+
 '<div id="pxLog" aria-live="polite"></div><div id="pxChips"></div>'+
 '<form id="pxForm"><input id="pxIn" type="text" autocomplete="off" placeholder="Ask me anything…" aria-label="Type a message to Phoenix"><button id="pxSend" type="submit" aria-label="Send">🚀</button></form>';
wirePhoto(card);
var openBtn=H('button',{id:'pxOpen',type:'button','aria-label':'Bring Princess Phoenix Sparkles back'},D.body);
openBtn.innerHTML='<svg viewBox="-110 -150 220 270">'+phoenixSVG('pxBtn')+'</svg>'; wirePhoto(openBtn);
var log=D.getElementById('pxLog'), chips=D.getElementById('pxChips'), form=D.getElementById('pxForm'), input=D.getElementById('pxIn');

/* ───────────── VOICE ───────────── */
function say(t){
  if(window.PWspeak){ window.PWspeak(t); return; }
  if(!('speechSynthesis' in window)||SND.on===false) return;
  try{ window.speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance(String(t).replace(/[^\w\s.,!?'’-]/g,'')); u.rate=1.0; u.pitch=1.55;
    var vs=window.speechSynthesis.getVoices()||[]; var v=vs.filter(function(x){ return /child|kid|junior|zira|samantha|karen|jenny|aria|ava|google us english/i.test(x.name); })[0]; if(v) u.voice=v;
    window.speechSynthesis.speak(u); }catch(e){}
}

/* ───────────── PERSONALITY + MEMORY ───────────── */
var mem={ name:null, phoenixMode:false, likes:[], lastTopic:null, whyDepth:0, turns:0 };
var OPENERS=['Okay okay okay, hi! I am Princess Phoenix Sparkles and this is MY world. Well, ours now. 👑',
  'Heyyy! You made it! I slid down the whole rainbow to get here. My tail is still fizzy.',
  'Hi bestie. Welcome to Phoenix\u2019s World, where kids make the rulz. What do you want to do first?'];
var SLANG=['no way!','that is SO cool.','okay that\u2019s actually amazing.','sparkle-tastic!','bestie, yes.','stop it, I love that.','wait, really?!','ooh, tell me more.'];
function isBirthdaySeason(){ var d=new Date(), m=d.getMonth(), day=d.getDate(); return (m===8&&day>=27)||(m===9&&day<=12); }

/* ───────────── KNOWLEDGE BASE ─────────────
   Each entry: match words, answers (random), and WHY chain (deeper each
   time they ask why). Facts are true and simple. */
var KB=[
 {k:['hello','hi ','hey','hiya','sup'],a:['Hi hi hi! 👋 What should we do?','Hello! You look like someone who likes buttons. Try the Control Panel.']},
 {k:['how are you','you ok','you okay'],a:['I am fizzy and fabulous. Slid down a rainbow, saw a kitty fall from the sky, normal Tuesday.','Great! A little dizzy from the slide. Worth it.']},
 {k:['your name','who are you','what are you'],a:['Princess Phoenix Sparkles. Cat. Princess. Royal guide. Also I make excellent rulz.']},
 {k:['sun','sunshine','sunny'],a:['The sun is a giant ball of burning gas SO far away that its light takes 8 minutes to reach us. Wave at it — it is 8 minutes late.'],
  why:['Because it is really really big and really really far. 93 million miles.','Because light has a speed limit, and even light needs time to travel that far.','Because that is just how the universe works, and honestly, I think it is a good rule.']},
 {k:['moon'],a:['The moon has no light of its own. It is a big rock reflecting sunlight, like a mirror in the sky.'],why:['Because it is made of rock and dust, not fire.','Because the sun shines on one side, and that is the side we see.','Because it goes around us once a month. That is why it changes shape!']},
 {k:['star ','stars','twinkle'],a:['Stars are suns, just really far away. Some of the ones you see are bigger than OUR sun. Wild.'],why:['Because they are giant burning balls, same as the sun.','Because they are so far away they look tiny, like a candle on the next mountain.','Because the light wobbles through our air on the way down — that is the twinkle.']},
 {k:['rainbow'],a:['A rainbow is sunlight split into all its colors by raindrops. Every raindrop is a tiny prism. I slid down one. Very slippery.'],why:['Because white light is secretly ALL the colors mixed together.','Because water bends light, and each color bends a different amount.','Because red bends the least and purple bends the most, so they spread out in a stripe. Science!']},
 {k:['rain','raining'],a:['Rain is clouds that got too heavy. The drops fall, plants drink, puddles happen, boots get muddy. Perfect.'],why:['Because clouds are made of tiny water drops that grab onto each other.','Because when the drops get big enough, they are too heavy to float.','Because everything falls down, even water. That is gravity!']},
 {k:['snow'],a:['Snow is frozen rain. Every snowflake has six sides and no two are the same. Like kitties.'],why:['Because water freezes into ice crystals when it is super cold up high.','Because ice crystals grow six arms — it is just how water likes to stack.','Because each flake takes a different bumpy path down, so it grows differently.']},
 {k:['cloud'],a:['Clouds are made of billions of tiny water drops floating in the air. They look soft but you would fall right through. Ask me how I know.']},
 {k:['thunder','lightning','storm'],a:['Lightning is a giant spark. Thunder is the sound the spark makes. You see it first because light is faster than sound. Count the seconds — every 5 is a mile away.']},
 {k:['dinosaur','dino','t-rex','trex'],a:['Dinosaurs lived 66 million years ago. A T. rex was as long as a school bus with teeth like bananas. Birds are their great-great-great-grandkids!'],why:['Because a giant rock from space hit Earth and changed the weather.','Because the big ones could not find enough food after that.','Because the little feathery ones survived, and they became birds. So a chicken is a tiny dinosaur.']},
 {k:['cat','kitty','kitten','meow'],a:['Cats are the best and I am not just saying that. We purr, we pounce, we sleep 16 hours a day. Goals.','A cat\u2019s whiskers are as wide as its body, so we know if we can fit through a gap. Built-in ruler!']},
 {k:['dog','puppy','woof'],a:['Dogs can smell 10,000 times better than you. They can smell that you had a cookie an HOUR ago. I respect it.']},
 {k:['elephant'],a:['Elephants are the biggest animals on land. They use their trunk to drink, hug, and spray water. A trunk has 40,000 muscles!']},
 {k:['shark'],a:['Sharks have been around longer than TREES. And they lose teeth all the time — some grow 30,000 in a life. No tooth fairy could keep up.']},
 {k:['octopus'],a:['An octopus has three hearts and blue blood and can squeeze through a hole the size of a coin. Also they are very smart. Suspiciously smart.']},
 {k:['penguin'],a:['Penguins are birds that swim instead of fly. The daddies keep the egg warm on their feet for two months. Dads are amazing.']},
 {k:['unicorn'],a:['Unicorns are pretend, but that is what makes them fun — you get to decide everything about them. Mine is called Sugarplum. Her horn is made of sunshine.']},
 {k:['dragon'],a:['Dragons are pretend too, but if I had one it would be pink, breathe glitter, and be named Kevin.']},
 {k:['space','planet','rocket','astronaut'],a:['Space is huge and quiet. There is no air, so astronauts wear suits with air inside. In space you would float like a bubble!'],why:['Because there is no gravity pulling you down when you are falling around the Earth.','Because you are moving so fast sideways that you keep missing the ground. That is what orbit is.','Because everything in space is falling, all the time. Even the moon is falling. It just keeps missing.']},
 {k:['earth','world','planet earth'],a:['Earth is a big round ball, spinning once a day and going around the sun once a year. You are on it right now, holding on with your feet.']},
 {k:['ocean','sea'],a:['The ocean covers more than half the Earth. The deepest part is deeper than the tallest mountain is tall. And most of it, nobody has ever seen.']},
 {k:['volcano'],a:['A volcano is a mountain with a hole that hot melted rock comes out of. The melted rock is called lava. Do not lick it.']},
 {k:['body','heart','brain','bones','blood'],a:['Your heart beats about 100,000 times a day. Your brain is the boss of everything. You have 206 bones. You are a very complicated machine!'],why:['Because your heart is a pump that pushes blood everywhere it needs to go.','Because blood carries food and air to every single part of you.','Because every part needs food and air to stay alive, even your toes!']},
 {k:['sleep','tired','bedtime'],a:['Sleep is when your brain sorts everything you learned today and files it. Like a tiny librarian. Kids need 10 to 12 hours!']},
 {k:['vegetable','veggie','fruit','healthy','eat'],a:['Fruits and veggies are like power-ups. Carrots help your eyes. Bananas help your muscles. Water is the best drink in the whole world. Even better than milk. Do not tell the milk.']},
 {k:['teeth','tooth','brush'],a:['Brush for two whole minutes — that is one song! Sugar bugs love teeth. Brushing sends them packing.']},
 {k:['wash','hands','germs'],a:['Germs are tiny creatures too small to see. Washing hands with soap for 20 seconds makes them slide right off. Sing the ABCs while you scrub!']},
 {k:['scared','afraid','nervous','worried','monster'],a:['It is okay to feel scared. Everyone does sometimes. Take a big breath in… and let it out slow. Feelings are like weather — they pass. And you are braver than you feel.'],why:['Because your brain is trying to keep you safe. It is doing its job, just a bit loud.','Because big breaths tell your brain, hey, we are okay.','Because you have felt scared before, and look — you are still here, being awesome.']},
 {k:['sad','cry','crying','upset'],a:['Oh, friend. It is okay to be sad. Crying is how the heart rinses itself out. Want to tell me about it, or want a joke?']},
 {k:['angry','mad','frustrated'],a:['Mad is a big feeling. It is okay to feel it, just not okay to hurt anyone with it. Squeeze your fists tight… now let go. Better? Try again.']},
 {k:['happy','excited','yay'],a:['Yesss! Happy looks good on you. Want to make it bigger? Go push the Big Red Button.']},
 {k:['love you','luv you'],a:['I love you too, all the way to the moon and back around the sun twice. 💖']},
 {k:['friend','friends','lonely','no friends'],a:['Being a good friend is easy: be kind, share, listen, and say sorry when you mess up. Everybody messes up. Even princesses.']},
 {k:['kind','kindness','nice'],a:['Kind is the strongest thing you can be. It costs nothing and it makes people\u2019s whole day. Try it — say something nice to somebody today.']},
 {k:['sorry'],a:['Saying sorry is brave. It means you care more about the other person than about being right. That is a big-kid move.']},
 {k:['share','sharing'],a:['Sharing is how you turn one happy person into two. Math!']},
 {k:['clean','tidy','room','mess'],a:['Cleaning is easier with a song. Put on the radio, pick up ten things, dance in between. A tidy room is a calm brain.']},
 {k:['school','kindergarten','teacher'],a:['School is where you find out what you are amazing at. Everyone is amazing at something. Sometimes it takes a while to find it, and that is fine.']},
 {k:['can\'t','cant','too hard','give up','hard'],a:['Say it with me: I can\u2019t do it… YET. Yet is a magic word. It means you are on the way.'],why:['Because your brain grows when things are hard. Easy stuff does not grow it.','Because every single person who is good at something was bad at it first.','Because giving up is the only way to make sure you never get it. Trying is how you win.']},
 {k:['smart','clever'],a:['Smart is not something you are. It is something you DO. Every time you try, you get smarter. So you are already doing it.']},
 {k:['brave','courage'],a:['Brave does not mean not scared. Brave means scared AND doing it anyway. Big difference.']},
 {k:['beautiful','pretty','ugly'],a:['You are beautiful because you are you. Nobody else in the whole world has your exact laugh. That is a rare thing.']},
 {k:['count','numbers','math','add'],a:['1, 2, 3, 4, 5! Math is just counting with extra steps. Want a puzzle? What is 2 plus 2?']},
 {k:['4','four'],a:['FOUR! Yes! You are a math wizard. What is 3 plus 3?']},
 {k:['6','six'],a:['SIX! Unstoppable. Okay one more: what comes after 9?']},
 {k:['10','ten'],a:['TEN! You did it. Go tell a grown-up you beat the princess at math.']},
 {k:['abc','alphabet','letter'],a:['A B C D E F G… there are 26 letters and every single word you will ever say is made of them. Even sparkle. Especially sparkle.']},
 {k:['color','colour','favorite color'],a:['My favorite color is pink. Then purple. Then pink again. Yours?']},
 {k:['pink'],a:['PINK. Excellent choice. We are going to get along great.']},
 {k:['blue'],a:['Blue! Like the sky and the sea and my left eye. Good pick.']},
 {k:['purple'],a:['Purple is the color of magic and grapes. Both important.']},
 {k:['green'],a:['Green! Like frogs and grass and the go light. Very energetic color.']},
 {k:['yellow'],a:['Yellow is the color of the sun and my crown. Royal choice.']},
 {k:['spanish','español','hola'],a:['¡Hola! That means hello. Gato means cat. Arco iris means rainbow. Princesa means… me.']},
 {k:['joke','funny','laugh'],a:['Why did the cat sit on the computer? To keep an eye on the mouse! 🐭','What do you call a sleeping dinosaur? A dino-SNORE!','Why was the math book sad? It had too many problems.','What do you call a bear with no ears? A B!','Why did the banana go to the doctor? It was not peeling well!']},
 {k:['riddle'],a:['I have a face and two hands but no arms or legs. What am I? …A clock!','What has to be broken before you can use it? …An egg!','What gets wetter the more it dries? …A towel!']},
 {k:['song','sing','music'],a:['Go to the Radio on the Control Panel — I put six songs in there. Twinkle Twinkle is my jam.']},
 {k:['game','play','bored'],a:['Bored? Not in MY world. Go fishing in the Arcade, cuddle a stuffie, or rake the leaves and JUMP in the pile.']},
 {k:['fish','tank'],a:['Every fish in my tank is carrying a secret sentence about YOU. Tap one and say it out loud.']},
 {k:['story','book','read'],a:['Story Time has real books with pages you turn. Every one ends with something to say out loud together.']},
 {k:['stuffie','stuffies','teddy','bear'],a:['The stuffies are on the shelf. Marshmallow purrs if you cuddle her. Pickle the dino roars. They all blink. Watch.']},
 {k:['birthday'],a:[isBirthdaySeason()?'It is birthday SEASON around here. Somebody very sparkly has one coming up. 🎂':'Birthdays are the best day. Cake, friends, and one more candle. When is yours?']},
 {k:['dad','daddy','father','papa'],a:['Dads are the best. Mine helped build this whole world. Go give yours a hug, then come back.']},
 {k:['mom','mommy','mother','mama'],a:['Moms are magic. Go tell yours something you love about her. I\u2019ll wait.']},
 {k:['bye','goodbye','see you','later'],a:['Bye bestie! Press my button whenever you want me back. 👋']},
 {k:['thank','thanks'],a:['You are SO welcome. Being polite is a superpower, by the way.']},
 {k:['who made','who built','made this','built this'],a:['A dad and his daughter made this whole world, one button at a time. And me. They made me too. I turned out great.']},
 {k:['secret','password'],a:['Ooh, do you have the royal password? Type it and I will know it is you.']}
];
var FALLBACK=['Ooh, good question. I am not sure, but we could find out together! Ask me about the sun, dinosaurs, feelings, or ask for a joke.',
 'Hmm, my crown is thinking. Try asking me why the sky is blue, or how to be brave, or what a unicorn eats.',
 'I don\u2019t know that one YET. But I know about space, animals, feelings, colors, jokes and riddles. Pick one!'];

function reply(text){
  var t=' '+text.toLowerCase().trim()+' ';
  mem.turns++;
  /* memory: what do you like? */
  var like=t.match(/ i (?:like|love) ([a-z ]{2,24}?)(?: |\.|!|$)/); if(like){ var thing=like[1].trim(); if(mem.likes.indexOf(thing)<0) mem.likes.push(thing); return pick(SLANG)+' '+pick(['I will remember you like '+thing+'.','Me too, kind of. '+thing+' is great.'])+' '+pick(['What else?','Tell me another thing.']); }
  if(/what do i like|remember/.test(t)&&mem.likes.length) return 'You told me you like '+mem.likes.join(' and ')+'. See? I listen. 👂';
  /* why chain */
  if(/^ why/.test(t)||/ why\?? $/.test(t)||t.trim()==='why'||t.trim()==='but why'){ if(mem.lastTopic&&mem.lastTopic.why){ var d=Math.min(mem.whyDepth,mem.lastTopic.why.length-1); mem.whyDepth++; return mem.lastTopic.why[d]+(mem.whyDepth>=mem.lastTopic.why.length?' …and that is as deep as I go, bestie. Ask a grown-up the next one!':''); } return 'Why what? Ask me about something first, then ask why, and I will go deep. 🧠'; }
  /* name */
  var nm=t.match(/ (?:my name is|i am|i'm|im) ([a-z]{2,16}) /); if(nm&&!/(sad|mad|happy|scared|bored|tired|fine|good|ok|okay|hungry)/.test(nm[1])){ mem.name=nm[1].charAt(0).toUpperCase()+nm[1].slice(1); return 'Hi '+mem.name+'! Fancy name. I like it. What do you want to do, '+mem.name+'?'; }
  for(var i=0;i<KB.length;i++){ var e=KB[i]; for(var j=0;j<e.k.length;j++){ if(t.indexOf(e.k[j])>=0){ mem.lastTopic=e; mem.whyDepth=0; var ans=pick(e.a); if(mem.phoenixMode&&Math.random()<.25) ans+=' (Also, hi Phoenix. 👑)'; return ans; } } }
  return pick(FALLBACK);
}

/* ───────────── CHAT UI ───────────── */
function bubble(txt,who){ var b=H('div',{'class':'pxb '+who,text:txt},log); log.scrollTop=log.scrollHeight; return b; }
function her(txt,delay){ setTimeout(function(){ bubble(txt,'her'); say(txt); setFace(/joke|snore|peeling|problems|mouse|\?$/i.test(txt)&&/!/.test(txt)?'silly':'talk'); clearTimeout(her.t); her.t=setTimeout(function(){ setFace('happy'); },Math.min(6000,1200+txt.length*55)); if(P.sparkleAt&&Math.random()<.3){ var r=card.getBoundingClientRect(); P.sparkleAt(r.left+40,r.top+40,6); } },delay||0); }
function setChips(list){ chips.innerHTML=''; list.forEach(function(c){ var b=H('button',{type:'button','class':'pxc',text:c[0]},chips); b.addEventListener('click',function(){ snd('tap'); c[1](); }); }); }
function defaultChips(){ setChips([
  ['🎛️ Show me the buttons',function(){ bubble('Show me the buttons','me'); her('Follow me! It is the biggest thing on the page.'); location.hash='#panel'; }],
  ['😂 Tell me a joke',function(){ bubble('Tell me a joke','me'); her(reply('joke')); }],
  ['🧠 Teach me something',function(){ bubble('Teach me something','me'); her(reply(pick(['sun','moon','dinosaur','octopus','rainbow','space','penguin']))); }],
  ['💛 I feel…',function(){ bubble('I feel…','me'); her('Tell me. Happy, sad, scared, mad, bored? I have something for every single one.'); }],
  ['🔐 Secret password',function(){ askSecret(); }],
  ['🦄 Ride away',function(){ closeHer(); }]
]); }
function askSecret(){ bubble('I have the secret password','me'); her('Ooh! Okay. Type it in the box. Nobody else will see it.'); input.placeholder='Type the royal password…'; input.dataset.secret='1'; input.focus(); }
form.addEventListener('submit',function(e){ e.preventDefault(); var v=input.value.trim(); if(!v) return; input.value='';
  if(input.dataset.secret){ delete input.dataset.secret; input.placeholder='Ask me anything…'; bubble('•••••••','me');
    (window.PWcheckSecret?window.PWcheckSecret(v):Promise.resolve(false)).then(function(ok){ if(ok){ mem.phoenixMode=true; D.getElementById('pxSub').textContent='Phoenix Mode: ON 👑✨'; snd('win'); if(P.confetti) P.confetti(80);
      her('IT\u2019S YOU! Phoenix! Okay okay okay, welcome home. This is YOUR world.'); her(isBirthdaySeason()?'And guess what — it is your birthday season! You are almost a whole year more amazing. 🎂':'I saved all the best buttons for you. Go push them.',1800);
      setChips([['🎂 What is my birthday?',function(){ bubble('What is my birthday?','me'); her('That is a secret between you and your family — but I know it is coming up, and I know it is going to be sparkle-tastic.'); }],['🎛️ My buttons',function(){ location.hash='#panel'; her('All yours.'); }],['🦄 Ride away',closeHer]]); }
      else { snd('oops'); her(pick(['Hmm, that is not the royal password. You can still play everything! Only the crown stuff is locked.','Nope! Nice try though. Everything else is open. 😉'])); } }); return; }
  bubble(v,'me'); snd('tap'); her(reply(v),300); });

/* ───────────── ARRIVAL: she really slides down a full-screen rainbow ───────────── */
function arrive(){
  stage.innerHTML=''; ssvg=E('svg',{viewBox:'0 0 1000 700',preserveAspectRatio:'xMidYMid slice'},stage);
  var bowD='M-120 -60 C 200 -80, 520 40, 700 260 S 980 560, 1120 620';
  var bow=E('g',{opacity:0},ssvg); var W=[52,42,32,22,12,4]; ['#ff4d9d','#ff8a3d','#ffc53d','#3fe0a4','#17c7e8','#8b3dff'].forEach(function(c,i){ E('path',{d:bowD,stroke:c,'stroke-width':W[i]*2,fill:'none','stroke-linecap':'round',transform:'translate(0,'+(i*9)+')'},bow); });
  E('path',{d:bowD,stroke:'#fff','stroke-width':10,fill:'none','stroke-linecap':'round',opacity:.5},bow);
  bow.style.transition='opacity .6s'; requestAnimationFrame(function(){ bow.style.opacity='1'; });
  /* she rides on top of the bow: offset up by the bow radius */
  var rider=E('g',{transform:'translate(0,-52)'},ssvg); var g=E('g',null,rider); g.innerHTML=phoenixSVG('pxArr'); wirePhoto(g);
  var mp=E('animateMotion',{dur:'3.4s',begin:'0.5s',fill:'freeze',rotate:'auto',calcMode:'spline',keyTimes:'0;1',keySplines:'0.25 0.1 0.35 1'},g); E('mpath',{href:'#pxArrPath'},mp);
  E('path',{id:'pxArrPath',d:bowD,fill:'none',stroke:'none'},ssvg);
  g.setAttribute('transform','scale(.75)'); snd('whoosh'); if(SND.sparkle) setTimeout(function(){ SND.sparkle(); },1200);
  /* sparkle trail behind her */
  var trail=setInterval(function(){ try{ var m=g.getScreenCTM(); if(m&&P.sparkleAt) P.sparkleAt(m.e,m.f-10,3,['#fff','#ffd84d','#ff9ec2']); }catch(e){} },140);
  setTimeout(function(){ clearInterval(trail); snd('boing'); bow.style.opacity='0'; g.style.transition='opacity .5s'; g.style.opacity='0';
    setTimeout(function(){ stage.innerHTML=''; setFace('happy'); card.classList.add('on'); openBtn.classList.remove('on'); snd('tada');
      var o=pick(OPENERS); her(o,200); if(mem.turns===0) her('Push my buttons, ask me anything, or type the secret password if you have it. 😉',2400); defaultChips(); },500); },4200);
}

/* ───────────── EXIT: sparkle swirl, then the unicorn ride into a portal ───────────── */
var busy=false;
function closeHer(){
  if(busy) return; busy=true; snd('sparkle');
  her(pick(['Okay bestie, Sugarplum is here! Press my button any time and I will slide right back. 🦄','Bye for now! Watch this exit, I practiced.']));
  setTimeout(function(){ card.classList.remove('on'); ride(); },1600);
}
function ride(){
  stage.innerHTML=''; ssvg=E('svg',{viewBox:'0 0 1000 700',preserveAspectRatio:'xMidYMid slice'},stage);
  /* the swirl where she vanishes from the card and appears on the unicorn */
  var cr=card.getBoundingClientRect(); if(P.sparkleAt) for(var i=0;i<4;i++) setTimeout(function(){ P.sparkleAt(cr.left+cr.width-60,cr.top+40,18,['#fff','#ffd84d','#ff9ec2','#c58cff']); },i*120);
  /* portal, black with shadow, closed at first */
  var portal=E('g',{transform:'translate(860,420)'},ssvg); var pShadow=E('ellipse',{cx:0,cy:0,rx:0,ry:0,fill:'#000',opacity:.35,transform:'translate(6,14)'},portal); var pHole=E('ellipse',{cx:0,cy:0,rx:0,ry:0,fill:'#000'},portal); var pRim=E('ellipse',{cx:0,cy:0,rx:0,ry:0,fill:'none',stroke:'#0b0616','stroke-width':10,opacity:.6},portal);
  /* unicorn + rider group, gallops along a lap path */
  var run=E('g',null,ssvg); var uni=E('g',{transform:'scale(.55)'},run); uni.innerHTML=unicornSVG();
  var rider=E('g',{transform:'translate(-40,-58) scale(.62)'},uni); rider.innerHTML=phoenixSVG('pxRide'); wirePhoto(rider); setFace('silly');
  /* her legs hang down the unicorn's side so she is clearly SEATED */
  E('path',{d:'M-30 90 q-6 40 -12 70 M30 90 q6 40 12 70',stroke:'#fff','stroke-width':16,'stroke-linecap':'round',fill:'none',transform:'translate(-40,-58) scale(.62)'},uni);
  E('path',{d:'M-30 90 q-6 40 -12 70 M30 90 q6 40 12 70',stroke:'#201540','stroke-width':4,'stroke-linecap':'round',fill:'none',opacity:.5,transform:'translate(-40,-58) scale(.62)'},uni);
  /* reins */ E('path',{d:'M20 -10 q60 -20 120 -70',stroke:'#c9a01a','stroke-width':4,fill:'none',transform:'translate(-40,-58) scale(.62)'},uni);
  var lap='M-200 560 C 100 520, 200 300, 420 330 S 760 520, 560 560 S 120 640, 300 440 S 700 380, 860 420';
  E('path',{id:'pxLap',d:lap,fill:'none',stroke:'none'},ssvg);
  var mp=E('animateMotion',{dur:'6.2s',begin:'0.2s',fill:'freeze',rotate:'auto',calcMode:'spline',keyTimes:'0;0.15;0.85;1',keySplines:'0.2 0 0.6 1;0.4 0 0.6 1;0.5 0 0.9 0.6'},run); E('mpath',{href:'#pxLap'},mp);
  snd('whoosh'); var hoof=setInterval(function(){ if(SND.tone) SND.tone(rnd(140,190),0.06,'sine',0.05); },210);
  /* portal opens as they approach */
  setTimeout(function(){ [pShadow,pHole,pRim].forEach(function(el){ el.style.transition='rx 1.2s cubic-bezier(.3,1.5,.5,1),ry 1.2s cubic-bezier(.3,1.5,.5,1)'; }); pShadow.setAttribute('rx',110); pShadow.setAttribute('ry',80); pHole.setAttribute('rx',100); pHole.setAttribute('ry',72); pRim.setAttribute('rx',104); pRim.setAttribute('ry',76); },4200);
  /* they dive in */
  setTimeout(function(){ clearInterval(hoof); snd('sparkle'); run.style.transition='transform .8s cubic-bezier(.6,-.2,.9,.4),opacity .5s .4s'; run.style.transformOrigin='860px 420px'; run.style.transform='scale(.05)'; run.style.opacity='0'; if(P.sparkleAt) P.sparkleAt(window.innerWidth*.86,window.innerHeight*.6,30,['#8b3dff','#17c7e8','#fff','#ff4d9d']); },6300);
  /* portal closes */
  setTimeout(function(){ [pShadow,pHole,pRim].forEach(function(el){ el.style.transition='rx .6s ease-in,ry .6s ease-in'; el.setAttribute('rx',0); el.setAttribute('ry',0); }); },7300);
  setTimeout(function(){ stage.innerHTML=''; openBtn.classList.add('on'); busy=false; },8100);
}
D.getElementById('pxClose').addEventListener('click',closeHer);
openBtn.addEventListener('click',function(){ openBtn.classList.remove('on'); snd('whoosh'); arrive(); });
D.addEventListener('keydown',function(e){ if(e.key==='Escape'&&card.classList.contains('on')) closeHer(); });

/* ───────────── PUBLIC API + START ───────────── */
window.Phoenix={ say:function(t){ bubble(t,'her'); say(t); }, ask:function(t){ return reply(t); }, arrive:arrive, leave:closeHer, mem:mem };
if(window.PWspeak){} else window.PWspeak=say;
var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
setTimeout(function(){ if(reduced){ card.classList.add('on'); her(pick(OPENERS)); defaultChips(); } else arrive(); }, 1400);
})();
