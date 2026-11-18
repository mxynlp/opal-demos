(function(){
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('DOMContentLoaded',function(){
document.body.classList.add('ready');
if(location.search.indexOf('static')>-1){document.documentElement.classList.add('static');document.querySelectorAll('[data-count]').forEach(function(e){e.textContent=e.dataset.count})}
/* titre mot par mot */
document.querySelectorAll('[data-split]').forEach(function(h){var out=[],i=0;h.childNodes.forEach(function(n){if(n.nodeType===3){n.textContent.split(/(\s+)/).forEach(function(t){if(!t.trim()){out.push(t);return}out.push('<span class="w"><span style="animation-delay:'+(0.15+i++*0.07)+'s">'+t+'</span></span>')})}else{var t=n.textContent;out.push('<span class="w"><span style="animation-delay:'+(0.15+i++*0.07)+'s"><em>'+t+'</em></span></span>')}});h.innerHTML=out.join('')});
/* header + progression */
var hd=document.querySelector('header'),pg=document.querySelector('.progress');
function sc(){var y=window.scrollY,m=document.documentElement.scrollHeight-innerHeight;if(hd)hd.classList.toggle('scrolled',y>10);if(pg)pg.style.width=(m>0?y/m*100:0)+'%';
if(!rm)document.querySelectorAll('[data-speed]').forEach(function(e){var r=e.getBoundingClientRect();e.style.transform='translateY('+((r.top+r.height/2-innerHeight/2)*parseFloat(e.dataset.speed))+'px)'})}
addEventListener('scroll',sc,{passive:true});sc();
/* menu mobile */
var bg=document.querySelector('.burger'),mm=document.querySelector('.mmenu');
if(bg)bg.addEventListener('click',function(){bg.classList.toggle('open');mm.classList.toggle('open')});
/* apparition au scroll */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('[data-r],.proc').forEach(function(e,i){io.observe(e)});
/* compteurs */
var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,to=+el.dataset.count,t0=null;if(rm){el.textContent=to;return}
function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)})},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(function(e){co.observe(e)});
/* inclinaison des cartes */
if(!rm&&matchMedia('(hover:hover)').matches)document.querySelectorAll('.card').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateY('+x*6+'deg) rotateX('+-y*6+'deg) translateY(-4px)'});c.addEventListener('mouseleave',function(){c.style.transform=''})});
/* FAQ animée */
document.querySelectorAll('details').forEach(function(d){var a=d.querySelector('.a');d.querySelector('summary').addEventListener('click',function(e){e.preventDefault();if(d.open){a.style.height=a.scrollHeight+'px';requestAnimationFrame(function(){a.style.height='0'});setTimeout(function(){d.open=false},400)}else{d.open=true;a.style.height='0';requestAnimationFrame(function(){a.style.height=a.scrollHeight+'px'})}})});
/* avant / après */
document.querySelectorAll('.ba').forEach(function(b){var bf=b.querySelector('.before'),h=b.querySelector('.hd'),dr=false;function set(x){var r=b.getBoundingClientRect(),p=Math.max(0,Math.min(1,(x-r.left)/r.width))*100;bf.style.clipPath='inset(0 '+(100-p)+'% 0 0)';h.style.left=p+'%'}
b.addEventListener('pointerdown',function(e){dr=true;b.setPointerCapture(e.pointerId);set(e.clientX)});b.addEventListener('pointermove',function(e){if(dr)set(e.clientX)});b.addEventListener('pointerup',function(){dr=false})});
/* filtres */
document.querySelectorAll('.filters button').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filters button').forEach(function(x){x.classList.remove('on')});btn.classList.add('on');var f=btn.dataset.f;document.querySelectorAll('.gal .ph').forEach(function(p){p.classList.toggle('off',f!=='all'&&p.dataset.c!==f)})})});
/* formulaires (ouvre la messagerie, aucun envoi automatique) */
document.querySelectorAll('form[data-mail]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f),b=encodeURIComponent('Nom : '+(d.get('nom')||'')+'\nTéléphone : '+(d.get('tel')||'')+'\nProjet : '+(d.get('msg')||''));location.href='mailto:'+f.dataset.mail+'?subject='+encodeURIComponent('Demande de devis')+'&body='+b;var ok=f.querySelector('.ok');if(ok)ok.classList.add('show')})});
var rp=document.querySelector('.rappel');if(rp)rp.addEventListener('submit',function(e){e.preventDefault();var t=rp.querySelector('input').value;location.href='mailto:'+rp.dataset.mail+'?subject='+encodeURIComponent('Demande de rappel')+'&body='+encodeURIComponent('Merci de me rappeler au : '+t)});
/* transition de page */
document.querySelectorAll('a[href]').forEach(function(a){var h=a.getAttribute('href');if(!h||h[0]==='#'||/^(tel|mailto|http)/.test(h)||a.target)return;a.addEventListener('click',function(e){if(e.metaKey||e.ctrlKey)return;e.preventDefault();document.body.classList.add('leaving');setTimeout(function(){location.href=h},220)})});
addEventListener('pageshow',function(){document.body.classList.remove('leaving')});
});})();
