declare const React:any;
import {Flow,Port,Icon,BrowserFrame,File,Footnote} from './DiagramEngine';

export function Hub(){return <><div className="hub-heading"><img src="brand/huggingface.svg" alt="Hugging Face"/><span>Compartir · probar · integrar</span></div><div className="hub-objects">
 <section><div className="model-art" aria-hidden="true">{[0,1,2].map(c=><div key={c}>{[0,1,2].map(r=><i key={r} style={{animationDelay:`${c+r}s`}}/>)}</div>)}</div><h2>Modelos</h2><p>Procesar y generar</p></section>
 <section><div className="dataset-art" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{animationDelay:`${i*.35}s`}}/>)}</div><h2>Datasets</h2><p>Colecciones de datos</p></section>
 <section><div className="app-art"><Icon name="image" size={68}/><span>Entrada → resultado</span></div><h2>Aplicaciones</h2><p>Probar en el navegador</p></section>
 </div><Footnote>Hugging Face Hub · recursos publicados por la comunidad.</Footnote></>}
