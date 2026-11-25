const fs=require('node:fs');
const {spawnSync}=require('node:child_process');
const tests=fs.readdirSync(__dirname).filter(name=>name==='test.cjs'||/^test-.*\.cjs$/.test(name)).sort();
const syntax=spawnSync(process.execPath,['--check','app.js'],{cwd:__dirname,stdio:'inherit'});
if(syntax.status!==0)process.exit(syntax.status||1);
for(const test of tests){const result=spawnSync(process.execPath,[test],{cwd:__dirname,stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);}
console.log(`All ${tests.length} test files passed.`);
