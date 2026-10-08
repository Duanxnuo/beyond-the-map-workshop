import fs from 'node:fs';
import path from 'node:path';

const source = fs.readFileSync('content.md', 'utf8').replace(/\r\n/g, '\n');
const escape = (s) => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline = (s) => escape(s).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
const blocks = source.split(/^## /m);
const heroLines = blocks.shift().trim().split('\n').filter(Boolean);
if (!heroLines[0]?.startsWith('# ')) throw new Error('content.md must begin with # title');
const title = heroLines[0].slice(2);
const subtitle = heroLines[1] ?? '';
const detail = heroLines[2] ?? '';
const notice = heroLines.find(line => line.startsWith('> '))?.slice(2) ?? '';
const ids = {'About':'about','Topics':'topics','Important Dates':'dates','Call for Papers':'cfp','Submission Guidelines':'submission','Speakers':'speakers','Organizers':'organizers','Program':'program','Venue':'venue','FAQ':'faq','Contact':'contact'};
const labels = {'About':'About','Topics':'Topics','Important Dates':'Important Dates','Call for Papers':'Call for Papers','Submission Guidelines':'Submission Guidelines','Speakers':'Speakers','Organizers':'Organizers','Program':'Program','Venue':'Venue','FAQ':'FAQ','Contact':'Contact'};
function render(lines) {
  const out=[];
  for(let i=0;i<lines.length;){
    let line=lines[i].trim();
    if(!line){i++;continue;}
    if(line.startsWith('### ')){out.push(`<h3>${inline(line.slice(4))}</h3>`);i++;continue;}
    if(line.startsWith('|')){
      const rows=[];while(i<lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++].trim().split('|').slice(1,-1).map(x=>x.trim()));
      if(rows.length>1){const head=rows.shift();if(rows[0]?.every(x=>/^:?-+:?$/.test(x)))rows.shift();out.push(`<div class="table-wrap"><table><thead><tr>${head.map(x=>`<th scope="col">${inline(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${inline(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);}continue;
    }
    if(/^\d+\. /.test(line)){const items=[];while(i<lines.length && /^\d+\. /.test(lines[i].trim()))items.push(lines[i++].trim().replace(/^\d+\. /,''));out.push(`<ol>${items.map(x=>`<li>${inline(x)}</li>`).join('')}</ol>`);continue;}
    const para=[];while(i<lines.length && lines[i].trim() && !/^(### |\||\d+\. )/.test(lines[i].trim()))para.push(lines[i++].trim());out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}
const sections=blocks.map((block,index)=>{const [heading,...lines]=block.split('\n');const name=heading.trim();const id=ids[name];if(!id)throw new Error(`Unknown section: ${name}`);return {name,id,label:labels[name],index,html:render(lines)};});
for(const required of Object.keys(ids)) if(!sections.some(s=>s.name===required)) throw new Error(`Missing section: ${required}`);
const nav=sections.filter(s=>!['Submission Guidelines','Venue','FAQ','Contact'].includes(s.name)).map(s=>`<a href="#${s.id}">${s.label}</a>`).join('');
const body=sections.map(s=>`<section id="${s.id}" class="section reveal"><div class="section-head"><span class="eyebrow">${String(s.index+1).padStart(2,'0')} / ${escape(s.name)}</span><h2>${escape(s.label)}</h2></div><div class="section-copy">${s.html}</div></section>`).join('\n');
const html=fs.readFileSync('index.template.html','utf8').replaceAll('{{TITLE}}',escape(title)).replaceAll('{{SUBTITLE}}',inline(subtitle)).replaceAll('{{DETAIL}}',inline(detail)).replaceAll('{{NOTICE}}',inline(notice)).replaceAll('{{NAV}}',nav).replaceAll('{{SECTIONS}}',body);
fs.mkdirSync('dist',{recursive:true});fs.writeFileSync('dist/index.html',html);for(const file of ['style.css','script.js'])fs.copyFileSync(file,path.join('dist',file));
console.log(`Built dist/index.html with ${sections.length} sections.`);
