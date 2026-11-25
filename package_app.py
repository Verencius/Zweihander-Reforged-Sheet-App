from pathlib import Path
p=Path('.')
s=(p/'index.html').read_text(encoding='utf-8-sig')
s=s.replace('<link rel="stylesheet" href="style.css">','<style>'+ (p/'style.css').read_text(encoding='utf-8-sig')+'</style>')
s=s.replace('<script src="schema.js"></script>','<script>'+ (p/'schema.js').read_text(encoding='utf-8-sig')+'</script>')
s=s.replace('<script src="app.js"></script>','<script>'+ (p/'app.js').read_text(encoding='utf-8-sig')+'</script>')
(p/'Character Forge.html').write_text(s,encoding='utf-8')
print('Built self-contained Character Forge.html')
