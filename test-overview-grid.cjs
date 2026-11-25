const fs=require('fs'),assert=require('node:assert/strict');const css=fs.readFileSync('style.css','utf8'),bundle=fs.readFileSync('Character Forge.html','utf8');
for(const match of css.matchAll(/\.sheet-[\w-]+\s*\{([^{}]*)\}/g))assert(!/grid-area\s*:\s*(?!auto\b)[a-z]/.test(match[1]),'Obsolete named overview placement: '+match[0]);
assert(css.includes('.sheet-hero>.sheet-bio{grid-column:1;grid-row:1;'));
assert(css.includes('.sheet-hero>.sheet-character-side{grid-column:2;grid-row:1;'));
assert(css.includes('.sheet-character-side{grid-column:1;grid-row:2}'));
assert(css.includes('.equipment-armor{grid-area:armor}'),'Equipment named layout retained');
assert(bundle.replace(/\r\n/g,'\n').includes(css.replace(/\r\n/g,'\n').trim()),'Single-file app contains the current stylesheet');
console.log('Passed: obsolete overview grid areas removed, desktop/mobile hero columns explicit, equipment grid retained, standalone app rebuilt.');
