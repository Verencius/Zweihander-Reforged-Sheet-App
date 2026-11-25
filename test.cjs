const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync('app.js','utf8').split('let characters=')[0];const ctx={};vm.createContext(ctx);vm.runInContext(source,ctx);
const calc=v=>ctx.calculate(v);
let v={attribute_combat:35,attribute_brawn:42,profession_basic_toggle_1:true,profession_basic_skill_1:'Melee',profession_basic_toggle_7:true,profession_basic_attribute:'Combat +5%',profession_basic_toggle_10:true,profession_basic_bonus_1:'Brawn',reward_points:100};let c=calc(v);
assert.equal(c.attributes.Combat.score,40);assert.equal(c.attributes.Combat.bonus,4);assert.equal(c.attributes.Brawn.bonus,5);assert.equal(c.skills.Melee.total,50);assert.equal(c.spent,0);assert.equal(c.left,100);
v.object_2='Talisman of Melee';assert.equal(calc(v).skills.Melee.total,55);
v.profession_basic_toggle_1=false;assert.equal(calc(v).skills.Melee.total,45);
vm.runInContext(fs.readFileSync('schema.js','utf8')+';globalThis.sections=SECTIONS',ctx);
assert.equal(ctx.sections.length,25);for(const s of ctx.sections){const keys=s.fields.map(f=>f.key);assert.equal(keys.length,new Set(keys).size,s.title);for(const f of s.fields){assert(!/[{}]/.test(f.key),f.key);if(f.type==='select')assert(f.options.length>0,f.key);}}
assert.equal(ctx.sections.filter(s=>/Profession/.test(s.title)).length,3);
assert.equal(ctx.sections.find(s=>s.title.startsWith('Basic Profession')).fields.filter(f=>f.type==='checkbox').length,18);
console.log('Passed: template coverage, unique fields, select choices, attribute adjustments, matching bonus advances, skills, talismans, unchecked advances, and RP ledger.');
