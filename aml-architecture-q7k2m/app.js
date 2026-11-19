(function(){
var q=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)');
var bar=document.getElementById('bar'),hero=document.querySelector('.hero'),m=document.getElementById('mm'),burger=document.querySelector('.mn');
/* ---------- menu burger + accordéon ---------- */
function lock(o){document.documentElement.classList.toggle('lock',o);document.body.classList.toggle('lock',o)}
function mOpen(o){m.classList.toggle('open',o);lock(o);burger.setAttribute('aria-expanded',o);if(o)m.querySelector('.x').focus();else burger.focus()}
burger.setAttribute('aria-haspopup','dialog');burger.setAttribute('aria-expanded','false');
burger.onclick=function(){mOpen(true)};
q('.mm .x').forEach(function(b){b.onclick=function(){mOpen(false)}});
q('.mm a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open');lock(false);burger.setAttribute('aria-expanded','false')})});
q('.mm .at').forEach(function(b){b.onclick=function(){var o=b.getAttribute('aria-expanded')!=='true';q('.mm .at').forEach(function(x){x.setAttribute('aria-expanded','false');document.getElementById(x.getAttribute('aria-controls')).hidden=true});if(o){b.setAttribute('aria-expanded','true');document.getElementById(b.getAttribute('aria-controls')).hidden=false}}});
/* ---------- menu desktop : un seul panneau ouvert ---------- */
var dds=q('.dd'),tm;
function setO(d,o){d.classList.toggle('open',o);d.querySelector('.dt').setAttribute('aria-expanded',o);if(o){var s=d.querySelector('.sm');s.classList.remove('r');if(s.getBoundingClientRect().right>innerWidth-10)s.classList.add('r')}else d._h=false}
function closeAll(ex){dds.forEach(function(d){if(d!==ex)setO(d,false)})}
dds.forEach(function(d){var t=d.querySelector('.dt'),items=function(){return q('.sm a',d)};
 d.addEventListener('mouseenter',function(){if(!fine.matches)return;clearTimeout(tm);closeAll(d);d._h=true;setO(d,true);d._h=true});
 d.addEventListener('mouseleave',function(){if(!fine.matches)return;tm=setTimeout(function(){setO(d,false)},220)});
 t.addEventListener('click',function(){if(fine.matches&&d._h&&d.classList.contains('open')){d._h=false;return}closeAll(d);setO(d,!d.classList.contains('open'))});
 t.addEventListener('keydown',function(e){if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();closeAll(d);setO(d,true);var i=items();(e.key==='ArrowDown'?i[0]:i[i.length-1]).focus()}});
 d.querySelector('.sm').addEventListener('keydown',function(e){var i=items(),k=i.indexOf(document.activeElement);if(e.key==='ArrowDown'){e.preventDefault();i[(k+1)%i.length].focus()}else if(e.key==='ArrowUp'){e.preventDefault();i[(k-1+i.length)%i.length].focus()}else if(e.key==='Home'){e.preventDefault();i[0].focus()}else if(e.key==='End'){e.preventDefault();i[i.length-1].focus()}});
 d.addEventListener('focusout',function(e){if(!d.contains(e.relatedTarget))setO(d,false)});
 q('.sm a',d).forEach(function(a){a.addEventListener('click',function(){setO(d,false)})})});
document.addEventListener('click',function(e){if(!e.target.closest('.dd'))closeAll()});
document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;var o=dds.filter(function(d){return d.classList.contains('open')})[0];if(o){var f=o.contains(document.activeElement);setO(o,false);if(f)o.querySelector('.dt').focus()}if(m.classList.contains('open'))mOpen(false);if(!U.hidden)uClose()});
/* ---------- modale « page du site complet » ---------- */
var U=document.getElementById('up');
q('[data-up]').forEach(function(a){a.onclick=function(e){e.preventDefault();closeAll();m.classList.remove('open');lock(false);burger.setAttribute('aria-expanded','false');document.getElementById('upt').textContent=a.dataset.up;U.hidden=false;document.body.classList.add('upsell');if(bar)bar.classList.add('on');U.querySelector('.x2').focus()}});
function uClose(){U.hidden=true;document.body.classList.remove('upsell');if(bar&&hero)bar.classList.toggle('on',hero.getBoundingClientRect().bottom<80)}
U.onclick=function(e){if(e.target===U||e.target.closest('[data-close]'))uClose()};
/* ---------- carrousel : boutons + glisser avec inertie ---------- */
var car=document.querySelector('.car');
q('[data-c]').forEach(function(b){b.onclick=function(){car.scrollBy({left:b.dataset.c*320,behavior:'smooth'});q('.fx button').forEach(function(x){x.classList.toggle('on',x===b)})}});
if(car){var down=0,sx=0,sl=0,v=0,lx=0,raf;
car.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=1;sx=lx=e.clientX;sl=car.scrollLeft;v=0;cancelAnimationFrame(raf)});
addEventListener('pointermove',function(e){if(!down)return;car.classList.add('drag');v=e.clientX-lx;lx=e.clientX;car.scrollLeft=sl-(e.clientX-sx)});
addEventListener('pointerup',function(){if(!down)return;down=0;(function g(){if(Math.abs(v)<.5){car.classList.remove('drag');return}car.scrollLeft-=v;v*=.93;raf=requestAnimationFrame(g)})()});
car.addEventListener('click',function(e){if(Math.abs(lx-sx)>6&&car.classList.contains('drag'))e.preventDefault()},true)}
/* ---------- barre mobile après le hero ---------- */
if(bar&&hero&&'IntersectionObserver' in window)new IntersectionObserver(function(es){bar.classList.toggle('on',!es[0].isIntersecting)},{rootMargin:'-80px 0px 0px 0px'}).observe(hero);else if(bar)bar.classList.add('on');
/* ---------- compteurs ---------- */
function count(el){var t=el.dataset.count,n=parseFloat(t);if(isNaN(n))return;var from=+el.dataset.from||0,s=t.replace(/[0-9.,]+/,'#'),t0=null,d=1600;el.style.display='inline-block';
 function f(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/d,1),e=1-Math.pow(1-p,3);el.textContent=s.replace('#',Math.round(from+(n-from)*e));if(p<1)requestAnimationFrame(f)}
 setTimeout(function(){requestAnimationFrame(f)},el.closest('.hero')?1300:0)}
/* ---------- boutons : magnétique + ondulation ---------- */
q('.bp,.bd,.bn,.bar a').forEach(function(b){
 b.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse'||rm)return;var r=b.getBoundingClientRect(),s=document.createElement('span');s.className='rip';s.style.left=(e.clientX-r.left)+'px';s.style.top=(e.clientY-r.top)+'px';b.appendChild(s);setTimeout(function(){s.remove()},700)});
 if(!rm&&(b.classList.contains('bp')||b.classList.contains('bd'))){
  b.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse'||!fine.matches)return;var r=b.getBoundingClientRect(),dx=(e.clientX-r.left-r.width/2)*.18,dy=(e.clientY-r.top-r.height/2)*.28;b.style.setProperty('--mx',Math.max(-7,Math.min(7,dx))+'px');b.style.setProperty('--my',Math.max(-5,Math.min(5,dy))+'px')});
  b.addEventListener('pointerleave',function(){b.style.removeProperty('--mx');b.style.removeProperty('--my')})}});
/* ---------- carte paresseuse ---------- */
var mp=document.getElementById('map');
if(mp){var lo=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;lo.disconnect();
 var l=document.createElement('link');l.rel='stylesheet';l.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(l);
 var s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';s.onload=function(){
  var lat=+mp.dataset.lat,lon=+mp.dataset.lon,M=L.map(mp,{scrollWheelZoom:false}).setView([lat,lon],14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap',className:'tl-l'}).addTo(M);
  L.marker([lat,lon]).addTo(M).bindTooltip(mp.dataset.nom,{permanent:true,className:'zt',direction:'top'});};
 document.body.appendChild(s)},{rootMargin:'300px'});lo.observe(mp)}
/* ---------- nav compacte, parallaxe, ligne de progression, teinte, carte centrale ---------- */
var nav=document.querySelector('.nav'),himg=document.querySelector('.hero>img'),bn2=document.querySelector('.bn2'),pl=document.querySelector('.pl'),pr=document.querySelector('.pr'),tick=0;
function cardFx(){if(!car||rm)return;var r=car.getBoundingClientRect(),c=r.left+r.width/2,h=r.width/2;q('.cd',car).forEach(function(k){var b=k.getBoundingClientRect(),d=Math.min(Math.abs(b.left+b.width/2-c)/h,1);k.style.setProperty('--s',(1+.045*(1-d)).toFixed(3));k.style.setProperty('--o',(.65+.35*Math.pow(1-d,.6)).toFixed(2))})}
function upd(){tick=0;var y=scrollY,vh=innerHeight;
 if(nav)nav.classList.toggle('sc2',y>50);
 if(himg&&!rm&&y<hero.offsetHeight*1.1)himg.style.setProperty('--py',Math.min(y*.18,hero.offsetHeight*.07).toFixed(1)+'px');
 if(pl&&!rm){var r=bn2.getBoundingClientRect(),p=Math.max(0,Math.min(1,(vh*.78-r.top)/(r.height*.85+vh*.1)));pl.style.setProperty('--p',p.toFixed(3));var ds=q('.pd',pl);ds.forEach(function(d,i){d.classList.toggle('on',p>=i/(ds.length-1)-.001)})}
 if(pr&&!rm){var rr=pr.getBoundingClientRect(),cc=(rr.top+rr.height/2-vh/2)/(vh/2+rr.height/2);pr.style.setProperty('--pt',(.07*(1-Math.min(Math.abs(cc),1))).toFixed(3))}}
function sch(){if(!tick){tick=1;requestAnimationFrame(upd)}}
addEventListener('scroll',sch,{passive:true});addEventListener('resize',sch);
if(car){car.addEventListener('scroll',function(){if(!car._t){car._t=1;requestAnimationFrame(function(){car._t=0;cardFx()})}},{passive:true})}
upd();cardFx();
/* ---------- apparitions (désactivées si mouvement réduit) ---------- */
function show(el,d){el.style.setProperty('--d',d+'s');el.classList.add('in');setTimeout(function(){el.removeAttribute('data-a');el.classList.remove('in');el.style.removeProperty('--d');cardFx()},d*1000+1900)}
if(rm||!('IntersectionObserver' in window))return;
/* avis : défilement horizontal en boucle */
var rv=document.querySelector('.rv');
if(rv){var kids=q('.rc',rv);for(var k=0;k<3;k++)kids.forEach(function(c){var n=c.cloneNode(true);n.classList.add('cl');n.setAttribute('aria-hidden','true');rv.appendChild(n)});rv.style.setProperty('--dur',(kids.length*16)+'s');rv.classList.add('go')}
/* mots en italique : masque */
q('h2 .it').forEach(function(it){var w=it.textContent.trim().split(/\s+/);it.innerHTML=w.map(function(x,i){return '<span class="mk" style="--d:'+(i*.09)+'s"><span>'+x+'</span></span>'}).join(' ');it._k='mk'});
q('.ap .ph,.sc .im').forEach(function(el){el.classList.add('pm');el._k='pm'});
q('.sep').forEach(function(el){el.classList.add('sp');el._k='sp'});
var groups=[['.sv .hd',0],['.pr .hd',0],['.av .hd',0],['.zn>div',.12],['.fq>div',.12],['.ct>div,.ct form',.15],['.ap>div',.15],['.dkb>div',.15],['.ft>div',.08],['.av .note',0]];
var items=q('h2 .it').concat(q('.pm'),q('.sep'));
groups.forEach(function(g){q(g[0]).forEach(function(el,i){el.setAttribute('data-a','');el._d=i*g[1];items.push(el)})});
[['.car','.cd',.09],['.bn2','.sc',.18]].forEach(function(g){var c=document.querySelector(g[0]);if(!c)return;q(g[1],c).forEach(function(el,i){el.setAttribute('data-a','');el._d=i*g[2]});c._g=1;items.push(c)});
var rvw=document.querySelector('.rvw');if(rvw){q('.rc',rv).forEach(function(el,i){if(el.classList.contains('cl'))return;el.setAttribute('data-a','');el._d=i*.14});rvw._g=1;items.push(rvw)}
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;io.unobserve(x.target);var t=x.target;
 if(t._k==='mk'){q('.mk',t).forEach(function(k){k.classList.add('in')})}else if(t._k==='pm'||t._k==='sp'){t.classList.add('in')}
 else if(t._g){q('[data-a]',t).forEach(function(c){show(c,c._d)})}else show(t,t._d||0)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
items.forEach(function(el){io.observe(el)});
var cio=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){cio.unobserve(x.target);count(x.target)}})},{threshold:.6});
q('[data-count]').forEach(function(el){cio.observe(el)});
})();
