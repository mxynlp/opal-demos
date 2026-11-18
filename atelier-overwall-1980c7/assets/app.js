// apparition douce, header, menu mobile, barre d'appel, formulaire (mailto)
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('[data-r]').forEach(el => io.observe(el));

const hd = document.querySelector('header'), bar = document.querySelector('.callbar');
const onScroll = () => { hd.classList.toggle('sc', scrollY > 10); bar && bar.classList.toggle('show', scrollY > 500); };
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const bg = document.querySelector('.burger'), mm = document.querySelector('.mmenu');
bg.addEventListener('click', () => { const o = mm.classList.toggle('open'); bg.setAttribute('aria-expanded', o); });

const f = document.querySelector('form');
if (f) f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const body = `Nom : ${d.get('nom')}\nTéléphone : ${d.get('tel')}\nCommune : ${d.get('commune')}\nTravaux : ${d.getAll('type').join(', ') || '-'}\n\n${d.get('msg')}`;
  location.href = 'mailto:cedricdarras@hotmail.fr?subject=' + encodeURIComponent('Demande de devis') + '&body=' + encodeURIComponent(body);
});
