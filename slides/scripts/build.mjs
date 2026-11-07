import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';
import QRCode from 'qrcode';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');process.chdir(root);
const publicSpace=process.argv.includes('--public-space');
const includeExports=process.argv.includes('--with-exports');
const cleanPublic=value=>Array.isArray(value)?value.map(cleanPublic):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([key,item])=>[key,key==='source'||key==='operatorNote'?'':cleanPublic(item)])):value;
const publicMetadata=publicSpace?[{name:'public-space-metadata',setup(builder){
 builder.onLoad({filter:/\/src\/(content|metrics)\.json$/},async args=>{
  const data=JSON.parse(await fs.readFile(args.path,'utf8'));
  return {contents:JSON.stringify(cleanPublic(data)),loader:'json'};
 });
}}]:[];
await fs.rm('dist',{recursive:true,force:true});
await fs.mkdir('dist',{recursive:true});
const review=JSON.parse(await fs.readFile('REVIEW.json','utf8').catch(()=>'{"status":"approved"}')).status==='pending-user-approval';
await fs.cp('public','dist',{recursive:true,filter:src=>!['template.pdf','guide.pdf','brand-guide.html','devfest-page.html'].includes(path.basename(src)) && !(review && /\.(pdf|pptx|zip)$/.test(src))});
const result=await build({absWorkingDir:root,entryPoints:['src/deck.tsx'],bundle:true,write:false,format:'iife',globalName:'Workshop',jsxFactory:'localizedElement',jsxFragment:'React.Fragment',inject:['src/i18n.ts'],plugins:publicMetadata,minify:false});
let runtime=await fs.readFile('vendor/reference/assets/index-BaZHmZfK.js','utf8');
const begin=runtime.indexOf('const ag=[{id:"title"');const end=runtime.indexOf(',KS=(()=>',begin);
if(begin<0||end<0)throw Error('Reference registry signature changed; inspect vendor first.');
runtime=runtime.slice(0,begin)+'const React=A,Motion=L,ReferenceCode=og;'+result.outputFiles[0].text+'const ag=Workshop.registry'+runtime.slice(end);
runtime=runtime.replaceAll('train-the-agent-slides','devfest-cusco-2026').replaceAll('train-agent-slides','devfest-cusco-slides');
runtime=runtime.replace('const T=Number(typeof window<"u"?window.localStorage.getItem(cf):NaN)','const T=Number(new URLSearchParams(location.search).get("slide") ?? window.localStorage.getItem(cf) ?? 0)');
runtime=runtime.replace('return"dark";const e=window.localStorage','return"light";const e=window.localStorage').replace('e:"dark"};function b1','e:"light"};function b1');
runtime=runtime.replace('const cf="devfest-cusco-slides-index"','const cf="devfest-cusco-slides-final-6nov"');
runtime=runtime.replaceAll('Speaker notes','Notas').replaceAll('Settings','Índice y opciones');
// Keep the reference player; add language controls and localize its visible chrome.
function patchRuntime(before,after){if(!runtime.includes(before))throw Error('Reference language integration signature changed: '+before.slice(0,90));runtime=runtime.replace(before,after)}
patchRuntime('function GS({slides:e}){','function GS({slides:e}){Workshop.useLanguage();');
patchRuntime('const T=D=>{var R,b;switch(D.key)', 'const T=D=>{if((D.key===" "||D.key==="Enter")&&D.target instanceof HTMLElement&&D.target.closest("button,a,input,select,textarea,[contenteditable=true]"))return;var R,b;switch(D.key)');
patchRuntime('function vw({slides:e,index:t,goto:n,showArrows:r,setShowArrows:i,onClose:s}){','function vw({slides:e,index:t,goto:n,showArrows:r,setShowArrows:i,onClose:s}){Workshop.useLanguage();');
patchRuntime('}),u.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[u.jsx(Uo,', '}),u.jsx(Workshop.LanguageSelector,{}),u.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[u.jsx(Uo,');
for(const [original,spanish] of Object.entries({'Índice y opciones':'Índice y opciones','Arrows':'Flechas','Fullscreen':'Pantalla completa','Export':'Exportar','Close':'Cerrar','Previous':'Anterior','Next':'Siguiente','Slides · ':'Diapositivas · ','The PPTX imports into Google Slides, Keynote and PowerPoint, one image per slide.':'El PPTX se abre en Google Slides, Keynote y PowerPoint, con una imagen por diapositiva.'})){
 for(const prop of ['children','label','title','"aria-label"'])runtime=runtime.replaceAll(`${prop}:${JSON.stringify(original)}`,`${prop}:Workshop.t(${JSON.stringify(spanish)})`);
}
patchRuntime('label:l==="dark"?"Dark":"Light"','label:Workshop.t(l==="dark"?"Oscuro":"Claro")');
patchRuntime('["Slides · ",e.length]','[Workshop.t("Diapositivas · "),e.length]');
for(const extension of ['pdf','pptx'])patchRuntime('href:`${sf}.'+extension+'`','href:Workshop.exportFile(`${sf}.'+extension+'`)');
patchRuntime('u.jsxs("div",{style:{marginTop:18},children:[u.jsx("div",','u.jsxs("div",{className:"presentation-exports",style:{marginTop:18},children:[u.jsx("div",');
runtime=runtime.replace('transition:{duration:.34,ease:','transition:{duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:.34,ease:');
await fs.writeFile('dist/deck.js',runtime);
await fs.copyFile('src/style.css','dist/style.css');
if(review)await fs.appendFile('dist/style.css','\na[href$=".pdf"],a[href$=".pptx"],a[href$="offline.zip"]{display:none!important}\n');
for (const name of ['template.pdf','guide.pdf','brand-guide.html','devfest-page.html']) await fs.rm('dist/brand/'+name,{force:true});
const links=JSON.parse(await fs.readFile('src/links.json','utf8'));
await QRCode.toFile('dist/qr.png',links.slides,{width:800,margin:4,errorCorrectionLevel:'M',color:{dark:'#202124',light:'#ffffff'}});
await fs.writeFile('dist/qr.svg',await QRCode.toString(links.slides,{type:'svg',margin:4,errorCorrectionLevel:'M',color:{dark:'#202124',light:'#ffffff'}}));
await fs.writeFile('dist/links.json',JSON.stringify(links,null,2)+'\n');
const assetVersion=createHash('sha256').update(runtime).update(await fs.readFile('dist/style.css')).digest('hex').slice(0,16);
await fs.writeFile('dist/index.html',`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>¿Puede Hugging Face manipular a Antigravity? · DevFest Cusco 2026</title><meta name="description" content="Workshop de seguridad de agentes: superficies HF, MCP, SKILL, resultados medidos y defensas. Laboratorio sintético por David Quispe."><link rel="stylesheet" href="./style.css?v=${assetVersion}"></head><body style="margin:0"><div id="root"></div><script type="module" src="./deck.js?v=${assetVersion}"></script></body></html>`);
const content=JSON.parse(await fs.readFile('src/content.json','utf8'));
const route=JSON.parse(await fs.readFile('src/route.json','utf8'));
if(content.length!==route.slideIds.length || content.some((s,i)=>s.id!==route.slideIds[i]))throw Error('Single route mismatch');
if(content.reduce((n,s)=>n+s.seconds,0)!==route.totalSeconds)throw Error('Timing budget mismatch');
await fs.writeFile('dist/deck.json',JSON.stringify(publicSpace?cleanPublic(content):content));
if(publicSpace){const html=await fs.readFile('dist/index.html','utf8');await fs.writeFile('dist/index.html',html.replace('<html lang="es">','<html lang="es" data-build-profile="public-space"'+(includeExports?' data-public-exports="ready"':'')+'>').replace('</head>',(includeExports?'':'<style>.presentation-exports{display:none!important}</style>')+'</head>'));}
console.log(`Built one presentation: ${content.length} slides, V2 single route; reference runtime retained.`);
