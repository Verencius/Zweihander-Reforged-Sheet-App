const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),{webcrypto,createHash}=require('node:crypto');
const elements=new Map(),el=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',value:'',removeAttribute(){},addEventListener(){}});return elements.get(id)};
let downloads=0,requested=[],mockFetch=async()=>{throw Error('offline')};
const ctx={document:{getElementById:el,createElement(){return {click(){downloads++}}}},localStorage:{getItem(){return null}},window:{addEventListener(){}},fetch:(url,options)=>{requested.push(url);return mockFetch(url,options)},AbortSignal,crypto:webcrypto,Uint8Array,TextDecoder,Blob,URL:{createObjectURL(){return 'blob:update'},revokeObjectURL(){}},setTimeout(){}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('schema.js','utf8')+'\n'+fs.readFileSync('app.js','utf8'),ctx);
const state=()=>vm.runInContext('appUpdate',ctx),version=vm.runInContext('APP_RELEASE.version',ctx);
(async()=>{
 assert(ctx.appVersionCard().includes(version));assert.equal(ctx.compareAppVersions('1.0.10','1.0.9'),1);assert.equal(ctx.compareAppVersions('1.0.0','1.0.0'),0);assert.equal(ctx.compareAppVersions('0.9.0','1.0.0'),-1);assert.throws(()=>ctx.compareAppVersions('bad','1.0.0'));
 const manifest=JSON.parse(fs.readFileSync('version.json','utf8'));assert.equal(manifest.version,version);assert.equal(manifest.sha256,createHash('sha256').update(fs.readFileSync('Character Forge.html')).digest('hex'));
 await ctx.checkAppUpdate();assert.equal(state().status,'error');assert.equal(downloads,0);
 mockFetch=async()=>({ok:true,json:async()=>({...manifest})});await ctx.checkAppUpdate();assert.equal(state().status,'current');
 const next='99.0.0',bytes=Buffer.from(`<!doctype html><script>const APP_RELEASE={version:'${next}',date:'2026-11-27'};</script>`),release={version:next,date:'2026-11-27',sha256:createHash('sha256').update(bytes).digest('hex')};
 mockFetch=async url=>url.endsWith('version.json')?{ok:true,json:async()=>release}:{ok:true,arrayBuffer:async()=>bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)};
 await ctx.checkAppUpdate();assert.equal(state().status,'available');assert(ctx.appVersionCard().includes('Download update'));await ctx.downloadAppUpdate();assert.equal(state().status,'downloaded');assert.equal(downloads,1);
 await ctx.checkAppUpdate();release.sha256='0'.repeat(64);await ctx.downloadAppUpdate();assert.equal(state().status,'error');assert.equal(downloads,1);
 mockFetch=async()=>({ok:true,json:async()=>({version:'bad',date:'x',sha256:'x'})});await ctx.checkAppUpdate();assert.equal(state().status,'error');assert(requested.every(url=>url.startsWith('https://raw.githubusercontent.com/Verencius/Zweihander-Reforged-Sheet-App/main/')));
 console.log('Passed: installed version, bundle manifest, version ordering, offline/current/new releases, verified download, and corrupted update rejection.');
})().catch(error=>{console.error(error);process.exitCode=1});
