(function(){
var q=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var m=document.getElementById('mm');
q('.mn').forEach(function(b){b.onclick=function(){m.classList.add('open')}});
q('.mm .x,.mm a').forEach(function(b){b.onclick=function(){m.classList.remove('open')}});
var car=document.querySelector('.car');
q('[data-c]').forEach(function(b){b.onclick=function(){car.scrollBy({left:b.dataset.c*320,behavior:'smooth'});q('.fx button').forEach(function(x){x.classList.toggle('on',x===b)})}});
/* glisser à la souris avec légère inertie */
if(car){var down=0,sx=0,sl=0,v=0,lx=0,raf;
car.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=1;sx=lx=e.clientX;sl=car.scrollLeft;v=0;cancelAnimationFrame(raf)});
addEventListener('pointermove',function(e){if(!down)return;car.classList.add('drag');v=e.clientX-lx;lx=e.clientX;car.scrollLeft=sl-(e.clientX-sx)});
addEventListener('pointerup',function(){if(!down)return;down=0;(function g(){if(Math.abs(v)<.5){car.classList.remove('drag');return}car.scrollLeft-=v;v*=.93;raf=requestAnimationFrame(g)})()});
car.addEventListener('click',function(e){if(Math.abs(lx-sx)>6&&car.classList.contains('drag'))e.preventDefault()},true)}
/* nav compacte */
var nav=document.querySelector('.nav');
if(nav)addEventListener('scroll',function(){nav.classList.toggle('sc2',scrollY>50)},{passive:true});
/* barre mobile après le hero */
var bar=document.getElementById('bar'),hero=document.querySelector('.hero');
if(bar&&hero&&'IntersectionObserver' in window)new IntersectionObserver(function(es){bar.classList.toggle('on',!es[0].isIntersecting)},{threshold:0,rootMargin:'-80px 0px 0px 0px'}).observe(hero);else if(bar)bar.classList.add('on');
/* apparitions au scroll */
function count(el){var t=el.dataset.count,n=parseFloat(t);if(isNaN(n))return;var s=t.replace(/[0-9.,]+/,'#'),t0=null,d=1500;el.style.display='inline-block';
 function f(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/d,1),e=1-Math.pow(1-p,3);el.textContent=s.replace('#',Math.round(n*e));if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
function show(el,d){el.style.setProperty('--d',d+'s');el.classList.add('in');setTimeout(function(){el.removeAttribute('data-a');el.classList.remove('in');el.style.removeProperty('--d')},d*1000+1900)}
if(!rm&&'IntersectionObserver' in window){
 var groups=[['.sv .hd',0],['.pr .hd',0],['.av .hd',0],['.zn>div',.12],['.fq>div',.12],['.ct>div,.ct form',.15],['.ap>div',.15],['.dkb>div',.15],['.ft>div',.08],['.av .note',0]];
 var items=[];
 groups.forEach(function(g){q(g[0]).forEach(function(el,i){el.setAttribute('data-a','');el._d=i*g[1];items.push(el)})});
 [['.car','.cd',.09],['.bn2','.sc',.18],['.rv','.rc',.14]].forEach(function(g){var c=document.querySelector(g[0]);if(!c)return;q(g[1],c).forEach(function(el,i){el.setAttribute('data-a','');el._d=i*g[2]});c._g=1;items.push(c)});
 var io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;io.unobserve(x.target);var t=x.target;if(t._g){q('[data-a]',t).forEach(function(c){show(c,c._d)})}else show(t,t._d||0)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 items.forEach(function(el){io.observe(el)});
 var cio=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){cio.unobserve(x.target);count(x.target)}})},{threshold:.6});
 q('[data-count]').forEach(function(el){cio.observe(el)});
}
/* carte paresseuse */
var mp=document.getElementById('map');
if(mp){var lo=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;lo.disconnect();
 var l=document.createElement('link');l.rel='stylesheet';l.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(l);
 var s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';s.onload=function(){
  var lat=+mp.dataset.lat,lon=+mp.dataset.lon,M=L.map(mp,{scrollWheelZoom:false}).setView([lat,lon],14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap',className:'tl-l'}).addTo(M);
  L.marker([lat,lon]).addTo(M).bindTooltip(mp.dataset.nom,{permanent:true,className:'zt',direction:'top'});};
 document.body.appendChild(s)},{rootMargin:'300px'});lo.observe(mp)}
var U=document.getElementById('up');
q('[data-up]').forEach(function(a){a.onclick=function(e){e.preventDefault();m.classList.remove('open');document.getElementById('upt').textContent=a.dataset.up;U.hidden=false}});
U.onclick=function(e){if(e.target===U||e.target.closest('.x2'))U.hidden=true};
})();
