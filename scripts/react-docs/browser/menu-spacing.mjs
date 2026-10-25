import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
import {writeFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
const output=path.resolve(import.meta.dirname,'../../../.artifacts/react-parity');mkdirSync(output,{recursive:true});
const base=process.env.FLUX_DOCS_URL??'http://127.0.0.1:5174';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH??(process.platform==='darwin'?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':undefined)});
const results={};
try {
 for(const framework of ['vue','react']) {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto(base+(framework==='react'?'/react':'')+'/components/button/split',{waitUntil:'networkidle'});
  if(framework==='react')await page.waitForFunction(()=>!document.querySelector('[data-react-state="loading"]'));
  const button=page.getByRole('button',{name:'Download',exact:true}).first();
  const parent=button.locator('..');
  
  await parent.locator('button').last().click();
  const item=page.getByText('Download in SD',{exact:true}).filter({visible:true}).first();
  await item.waitFor();await page.waitForTimeout(700);
  results[framework]=await item.evaluate(el=>{
   const a=[];for(let e=el;e&&a.length<7;e=e.parentElement){const s=getComputedStyle(e);const b=e.getBoundingClientRect();a.push({tag:e.tagName,classes:e.className,text:e.textContent.slice(0,120),width:b.width,height:b.height,padding:s.padding,margin:s.margin,gap:s.gap,display:s.display,boxSizing:s.boxSizing,overflow:s.overflow,children:[...e.children].map(c=>({tag:c.tagName,classes:c.className,text:c.textContent.slice(0,40)}))});}return a;
  });
  await page.screenshot({path:path.join(output,`split-menu-${framework}.png`)});
  await page.close();
 }
 writeFileSync(path.join(output,'menu-spacing.json'),JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));
 const signature=a=>a.slice(0,4).map(({width,height,padding,margin,gap,display})=>({width,height,padding,margin,gap,display}));
 if(JSON.stringify(signature(results.vue))!==JSON.stringify(signature(results.react)))throw Error('Vue/React menu spacing differs');
}finally{await browser.close()}
