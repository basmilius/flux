import {chromium} from '../../../docs/node_modules/playwright/index.mjs';
import {writeFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const output=path.resolve(import.meta.dirname,'../../../.artifacts/react-parity');mkdirSync(output,{recursive:true});
const base=process.env.FLUX_DOCS_URL??'http://127.0.0.1:5174';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH??(process.platform==='darwin'?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':undefined)});
const routes=['breakthrough','fade','overlay','route','scale','sheet','slide-over','stagger','tooltip','vertical-window','window'];let cursor=0;const results=[];
async function worker(){const page=await browser.newPage({viewport:{width:1440,height:1000}});while(cursor<routes.length){const route=routes[cursor++];const result={route};for(const framework of ['vue','react']){try{await page.goto(base+(framework==='react'?'/react':'')+'/components/transitions/'+route,{waitUntil:'networkidle'});await page.locator('.f_preview').first().scrollIntoViewIfNeeded();result[framework]=await page.evaluate(async()=>{const observed=new Map();const start=performance.now();while(performance.now()-start<5100){for(const animation of document.getAnimations()){const e=animation.effect?.target;if(!e||!e.closest('.f_preview'))continue;const c=e.getAttribute('class')??'';const timing=animation.effect.getTiming();const key=String(animation.transitionProperty??animation.animationName)+':'+timing.duration+':'+timing.delay;observed.set(key,{property:animation.transitionProperty??animation.animationName,duration:timing.duration,delay:timing.delay,easing:timing.easing,classes:c});}await new Promise(requestAnimationFrame);}return [...observed.values()];});}catch(e){result[framework]={error:String(e)}}}results.push(result);console.log(JSON.stringify(result));}await page.close();}
try{await Promise.all([worker(),worker(),worker()]);}finally{await browser.close();writeFileSync(path.join(output,'animations.json'),JSON.stringify(results,null,2));}
for(const result of results){
 assert(Array.isArray(result.react)&&result.react.length>0, `${result.route}: no React animation observed`);
 for(const reference of result.vue){
  assert(result.react.some(animation=>animation.property===reference.property&&animation.duration===reference.duration&&animation.easing===reference.easing),`${result.route}: missing ${reference.property}, ${reference.duration}ms, ${reference.easing}`);
 }
}
