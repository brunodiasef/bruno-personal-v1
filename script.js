const menu=document.querySelector('.menu'),nav=document.querySelector('.header nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.header nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const phone='5527998860938';
document.querySelectorAll('[data-msg]').forEach(el=>el.addEventListener('click',()=>{const t=encodeURIComponent(el.dataset.msg);window.open('https://wa.me/'+phone+'?text='+t,'_blank')}));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));
