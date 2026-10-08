const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
const navGroups=[...nav.querySelectorAll('.nav-group')];
menuButton?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  if(!open) navGroups.forEach(group=>group.open=false);
});
navGroups.forEach(group=>group.addEventListener('toggle',()=>{
  if(group.open) navGroups.filter(other=>other!==group).forEach(other=>other.open=false);
}));
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  navGroups.forEach(group=>group.open=false);
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded','false');
  menuButton?.setAttribute('aria-label','Open navigation');
}));
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    const openGroup=navGroups.find(group=>group.open);
    navGroups.forEach(group=>group.open=false);
    if(nav?.classList.contains('open')){
      nav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded','false');
      menuButton?.focus();
    }else if(openGroup){
      openGroup.querySelector('summary')?.focus();
    }
  }
});
document.addEventListener('click',e=>{
  if(!nav.contains(e.target)&&!menuButton?.contains(e.target)) navGroups.forEach(group=>group.open=false);
});
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const reveal=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}
    });
  },{threshold:.06});
  document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}
if('IntersectionObserver' in window){
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      document.querySelectorAll('main .section').forEach(section=>section.classList.toggle('is-active',section===entry.target));
      nav?.querySelectorAll('a').forEach(link=>link.classList.toggle('active',link.hash==='#'+entry.target.id));
    });
  },{rootMargin:'-22% 0px -55% 0px'});
  document.querySelectorAll('main .section').forEach(section=>sectionObserver.observe(section));
}

// Align only to the next boundary in the direction of travel. This leaves
// long sections free to scroll naturally and avoids a backward jump on stop.
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const sections=[...document.querySelectorAll('main .section')];
  let lastY=window.scrollY;
  let direction=0;
  let lastInput=0;
  let settleTimer;
  let aligning=false;
  let touchY=0;

  window.addEventListener('wheel',event=>{
    if(event.deltaY){direction=Math.sign(event.deltaY);lastInput=performance.now();aligning=false;}
  },{passive:true});
  window.addEventListener('touchstart',event=>{touchY=event.touches[0]?.clientY??0;aligning=false;},{passive:true});
  window.addEventListener('touchmove',event=>{
    const nextY=event.touches[0]?.clientY??touchY;
    if(nextY!==touchY){direction=Math.sign(touchY-nextY);lastInput=performance.now();touchY=nextY;}
  },{passive:true});
  window.addEventListener('keydown',event=>{
    if(['ArrowDown','PageDown',' '].includes(event.key)){direction=1;lastInput=performance.now();aligning=false;}
    if(['ArrowUp','PageUp'].includes(event.key)){direction=-1;lastInput=performance.now();aligning=false;}
  });
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{lastInput=0;}));

  const alignNearbyBoundary=()=>{
    if(aligning||!direction||performance.now()-lastInput>900)return;
    const y=window.scrollY;
    const header=document.querySelector('.site-header')?.getBoundingClientRect().height??0;
    const threshold=innerWidth<=760?48:64;
    const boundaries=sections.map(section=>section.getBoundingClientRect().top+y-header);
    const ahead=boundaries.filter(boundary=>direction>0?boundary>y+2:boundary<y-2);
    if(!ahead.length)return;
    const target=direction>0?Math.min(...ahead):Math.max(...ahead);
    if(Math.abs(target-y)>threshold)return;
    aligning=true;
    lastInput=0;
    window.scrollTo({top:target,behavior:'smooth'});
    setTimeout(()=>{aligning=false;lastY=window.scrollY;},550);
  };

  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(!aligning&&performance.now()-lastInput<900&&Math.abs(y-lastY)>1)direction=Math.sign(y-lastY);
    lastY=y;
    clearTimeout(settleTimer);
    settleTimer=setTimeout(alignNearbyBoundary,160);
  },{passive:true});
}
