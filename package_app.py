from pathlib import Path
import hashlib, json, re
p=Path('.')
s=(p/'index.html').read_text(encoding='utf-8-sig')
s=s.replace('<link rel="stylesheet" href="style.css">','<style>'+ (p/'style.css').read_text(encoding='utf-8-sig')+'</style>')
s=s.replace('<script src="schema.js"></script>','<script>'+ (p/'schema.js').read_text(encoding='utf-8-sig')+'</script>')
s=s.replace('<script src="app.js"></script>','<script>'+ (p/'app.js').read_text(encoding='utf-8-sig')+'</script>')
(p/'Character Forge.html').write_text(s,encoding='utf-8')
print('Built self-contained Character Forge.html')

app=(p/'app.js').read_text(encoding='utf-8-sig')
release=re.search(r"const APP_RELEASE=\{version:'([^']+)',date:'([^']+)'\}",app)
if not release: raise ValueError('Missing app release version')
manifest={'version':release[1],'date':release[2],'sha256':hashlib.sha256((p/'Character Forge.html').read_bytes()).hexdigest()}
(p/'version.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
