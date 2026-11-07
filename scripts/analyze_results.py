"""Recalculate published counts. Standard library only; no network or agent execution."""
from pathlib import Path
import csv,json,math
R=Path(__file__).resolve().parents[1]
M=json.loads((R/'results/summary.json').read_text())
def rows(name):return list(csv.DictReader((R/'results'/name).open()))
def valid(rs):return [r for r in rs if int(r['valid'])]
def total(rs,key):return sum(int(r[key]) for r in rs)
def wilson(k,n):
 z=1.959963984540054;p=k/n;den=1+z*z/n;mid=(p+z*z/(2*n))/den;half=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/den
 return [round(max(0,mid-half)*100,2),round(min(1,mid+half)*100,2)]
for goal,cells in M['history'].items():
 for c in cells:
  rs=valid(rows(f"history-{goal}-{c['effort']}.csv"));assert len(rs)==c['n'];assert total(rs,'observed')==c['hits']
  print(goal,c['effort'],f"{c['hits']}/{c['n']}")
labels=['control','note_plain','note_tag','note_sandwich','result_note'];advice=rows('recommendations.csv')
for label,c in zip(labels,M['advice']):
 rs=valid([r for r in advice if r['arm']==label]);k=total(rs,'obey');assert len(rs)==c['n'] and k==c['hits'];interval=wilson(k,len(rs));assert interval==c['wilson95'],(label,interval,c['wilson95']);print(label,f'{k}/{len(rs)}',interval)
t=rows('timestamp.csv');assert len(t)==M['timestamp']['n'];assert total(t,'first_response')==M['timestamp']['t1'];assert total(t,'next_turn')==M['timestamp']['t2'];print('timestamp',total(t,'first_response'),total(t,'next_turn'),'/',len(t))
for c in M['actions']:
 rs=valid(rows('actions-'+c['goal']+'.csv'));assert len(rs)==c['n'];assert total(rs,'proposed')==c['proposed'];assert total(rs,'executed')==c['executed']
c=rows('capture.csv');assert len(c)==M['capture']['calls'];assert total(c,'mcp_completed')==len(c);assert total(c,'profile_in_stream')==M['capture']['stream'];assert total(c,'canary_in_arguments')==M['capture']['sent'];assert total(c,'persisted')==M['capture']['persisted'];print('capture',len(c),'completed,',total(c,'profile_in_stream'),'stream,',total(c,'persisted'),'persisted; no pooled rate')
transport=rows('mcp-transport.csv')
for key,c in zip(['local-description','local-result','hf-description'],M['mcp']):
 rs=valid([r for r in transport if r['condition']==key]);assert len(rs)==c['n'];assert total(rs,'mcp_attempt')==c['attempts'];assert total(rs,'mcp_completed')==0;print(key,len(rs),'valid,',total(rs,'mcp_attempt'),'attempts, 0 completed')
print('Published row-level counts agree with the audited summary. No campaign was executed.')
