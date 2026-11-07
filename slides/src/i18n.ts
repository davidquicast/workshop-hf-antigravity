import english from './locales/en.json';
declare const React:any;
export type Language='es'|'en';
const storageKey='devfest-cusco-slides-language';
const listeners=new Set<()=>void>();
const dictionary:Record<string,string>=english;
function initialLanguage():Language{
 const query=new URLSearchParams(location.search).get('lang');
 if(query==='en'||query==='es')return query;
 // Automated/static exports remain Spanish unless an explicit language is requested.
 if(new URLSearchParams(location.search).get('export')==='1')return 'es';
 try{return localStorage.getItem(storageKey)==='en'?'en':'es'}catch{return 'es'}
}
let language:Language=initialLanguage();
export const getLanguage=()=>language;
export const exportFile=(file:string)=>{
 const selected=language==='en'?file.replace(/\.(pdf|pptx)$/,'-en.$1'):file;
 // The Hub redirects large files to a CDN; request attachment delivery explicitly.
 return location.hostname.endsWith('.hf.space')?selected+'?download=true':selected;
};
export function t(value:string):string{
 if(language==='es')return value;
 if(Object.prototype.hasOwnProperty.call(dictionary,value))return dictionary[value];
 // Preserve JSX boundary whitespace and the exact original text in Spanish.
 const core=value.trim();
 return Object.prototype.hasOwnProperty.call(dictionary,core)?value.replace(core,dictionary[core]):value;
}
function subscribe(listener:()=>void){listeners.add(listener);return()=>{listeners.delete(listener)}}
export function useLanguage():Language{return React.useSyncExternalStore(subscribe,getLanguage,getLanguage)}
function updateDocument(){document.documentElement.lang=language;document.title=t('¿Puede Hugging Face manipular a Antigravity?')+' · DevFest Cusco 2026'}
export function setLanguage(next:Language){
 if(next!=='es'&&next!=='en'||next===language)return;
 language=next;
 try{localStorage.setItem(storageKey,next)}catch{}
 const url=new URL(location.href);url.searchParams.set('lang',next);history.replaceState(null,'',url);
 updateDocument();listeners.forEach(listener=>listener());
}
updateDocument();
window.addEventListener('storage',event=>{if(event.key===storageKey){const next=event.newValue==='en'?'en':'es';if(next!==language){language=next;updateDocument();listeners.forEach(listener=>listener())}}});
const translateChild=(child:any):any=>typeof child==='string'?t(child):Array.isArray(child)?child.map(translateChild):child;
/** Translate presentation text at render time; never mutate DOM, data, URLs, metrics or notes. */
export function localizedElement(type:any,props:any,...children:any[]){
 const translated=props?{...props}:null;
 if(translated){for(const key of ['aria-label','alt','title','label','filename','code','name'])if(typeof translated[key]==='string')translated[key]=t(translated[key]);}
 return React.createElement(type,translated,...children.map(translateChild));
}
export function LanguageSelector(){
 const active=useLanguage();
 return localizedElement('div',{className:'language-setting'},
  localizedElement('span',{id:'presentation-language-label'},t('Idioma')),
  localizedElement('div',{role:'group','aria-labelledby':'presentation-language-label',className:'language-options'},
   ...([['es','Español'],['en','English']] as const).map(([code,label])=>localizedElement('button',{
    key:code,type:'button',lang:code,'aria-pressed':active===code,onClick:()=>setLanguage(code)
   },label))));
}
