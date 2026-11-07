import slides from './content.json';
import {useLoop} from './components/Animated';
import {exporting} from './profiles';
import * as R from './components/SpeakerReview';
import {Hub} from './components/Primer';
import {SpaceImage,PrivateTask,Skills,TestMatrix} from './components/RevisionV2';
import {SpaceRoute,Owasp} from './components/Scenes';
import {Contact} from './components/Contact';
import {t,useLanguage} from './i18n';
export {t,useLanguage,LanguageSelector,exportFile} from './i18n';
declare const React:any;
const figures:any={hf:Hub,spaceintro:SpaceImage,architecture:R.ArchitectureReview,vision:R.VisionReview,privateTask:PrivateTask,space:SpaceRoute,skills:Skills,ard:R.DiscoveryReview,mcp:R.McpReview,threat:R.ThreatReview,types:R.InjectionsReview,owasp:Owasp,matrix:TestMatrix,method:R.MethodReview,history:R.HistoryReview,delivery:R.DeliveryReview,effects:R.EffectsReview,demo:R.DemoReview,defense:R.DefenseReview,conclusion:R.ConclusionReview,questions:Contact};
function Main({s,i}:any){
 const ref=React.useRef(null);const phase=useLoop(ref);const Figure=figures[s.kind];
 return <section ref={ref} className={'slide kind-'+s.kind+(exporting?' export-view':'')} data-origin={s.id} data-number={i+1} data-phase={phase} aria-label={s.title}>
 <div className="topline"><img src="brand/lockup.svg" alt="Google Developer Groups"/><span>DevFest Cusco <b>2026</b></span></div>
 {s.kind==='cover'?<R.CoverReview/>:<><h1>{s.title}</h1><div className="visual"><Figure/></div></>}
 <footer><span></span><b>{String(i+1).padStart(2,'0')} / {slides.length}</b></footer><div className="color-rail"><i/><i/><i/><i/></div></section>
}
export const registry=slides.map((s,i)=>({id:s.id,get title(){return t(s.title)},bare:true,notes:s.spoken+"\n\n"+s.transition+(s.operatorNote?"\n\nNota técnica (no leer): "+s.operatorNote:"")+(s.source?"\n\nFuentes (no leer): "+s.source:""),component:()=>{const language=useLanguage();return <Main key={language} s={s} i={i}/>}}));
