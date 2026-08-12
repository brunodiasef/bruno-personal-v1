const menu=document.querySelector('.menu'),nav=document.querySelector('.header nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.header nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const phone='5527998860938';
document.querySelectorAll('[data-msg]').forEach(el=>el.addEventListener('click',()=>{const t=encodeURIComponent(el.dataset.msg);window.open('https://wa.me/'+phone+'?text='+t,'_blank')}));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));

// Comparativo antes/depois (suporta múltiplos na página)
document.querySelectorAll('.ba-wrap').forEach(function(wrap){
  const clip=wrap.querySelector('.ba-after-clip');
  const handle=wrap.querySelector('.ba-handle');
  const afterImg=wrap.querySelector('.ba-after-img');

  function setFullWidth(){
    afterImg.style.setProperty('--full-w',wrap.offsetWidth+'px');
    afterImg.style.width=wrap.offsetWidth+'px';
  }
  function setPos(pct){
    pct=Math.max(2,Math.min(98,pct));
    clip.style.width=pct+'%';
    handle.style.left=pct+'%';
  }
  function updateFromClientX(clientX){
    const rect=wrap.getBoundingClientRect();
    setPos(((clientX-rect.left)/rect.width)*100);
  }
  let dragging=false;
  function start(e){dragging=true;move(e);}
  function move(e){
    if(!dragging)return;
    const clientX=e.touches?e.touches[0].clientX:e.clientX;
    updateFromClientX(clientX);
    e.preventDefault();
  }
  function end(){dragging=false;}
  handle.addEventListener('mousedown',start);
  wrap.addEventListener('mousedown',start);
  window.addEventListener('mousemove',move);
  window.addEventListener('mouseup',end);
  handle.addEventListener('touchstart',start,{passive:false});
  wrap.addEventListener('touchstart',start,{passive:false});
  window.addEventListener('touchmove',move,{passive:false});
  window.addEventListener('touchend',end);
  window.addEventListener('resize',setFullWidth);

  let played=false;
  function playIntro(){
    if(played)return;
    played=true;
    setFullWidth();
    const start=5,endv=50,dur=1200;let t0=null;
    function ease(x){return 1-Math.pow(1-x,3);}
    function step(ts){
      if(!t0)t0=ts;
      const p=Math.min(1,(ts-t0)/dur);
      setPos(start+(endv-start)*ease(p));
      if(p<1)requestAnimationFrame(step);
    }
    setPos(start);
    requestAnimationFrame(step);
  }
  setFullWidth();
  setPos(50);
  const baObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)playIntro();}),{threshold:.3});
  baObs.observe(wrap);
});
