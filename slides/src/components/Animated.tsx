declare const React:any;
import {exporting} from '../profiles';
/** One autonomous clock per visible canvas. Thumbnails, hidden tabs and exports stay still. */
export function useLoop(ref:any,max=3){
 const [phase,setPhase]=React.useState(0);
 React.useEffect(()=>{
  const el=ref.current;if(!el)return;
  const svgs=[...el.querySelectorAll('svg')];
  if(!el.closest('[data-slide-root]')){svgs.forEach((s:any)=>s.pauseAnimations?.());return;}
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');let timer:any;let blurred=false;
  const sync=()=>{
   clearInterval(timer);const active=!exporting&&!media.matches&&!document.hidden&&!blurred;
   el.classList.add('is-active');el.classList.toggle('motion-running',active);el.dataset.running=String(active);
   svgs.forEach((s:any)=>active?s.unpauseAnimations?.():s.pauseAnimations?.());
   if(active)timer=setInterval(()=>setPhase((p:number)=>(p+1)%(max+1)),4800);
  };
  const blur=()=>{blurred=true;sync()};const focus=()=>{blurred=false;sync()};
  sync();document.addEventListener('visibilitychange',sync);window.addEventListener('blur',blur);window.addEventListener('focus',focus);media.addEventListener('change',sync);
  return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',sync);window.removeEventListener('blur',blur);window.removeEventListener('focus',focus);media.removeEventListener('change',sync);el.classList.remove('is-active','motion-running');svgs.forEach((s:any)=>s.pauseAnimations?.())};
 },[max]);return phase;
}
