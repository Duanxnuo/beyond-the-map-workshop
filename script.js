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
