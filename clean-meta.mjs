import fs from 'fs';
import path from 'path';

function removeUsePageMeta(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      removeUsePageMeta(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      let modified = false;

      if (content.includes('usePageMeta')) {
        // remove import
        content = content.replace(/import\s+usePageMeta\s+from\s+["'][^"']+["'];[\r\n]*/g, '');
        // remove hook call
        content = content.replace(/usePageMeta\(\s*.*?,\s*.*?\s*\);[\r\n]*/gs, '');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Removed usePageMeta from ${fullPath}`);
      }
    }
  }
}

removeUsePageMeta(path.join(process.cwd(), 'src', 'app'));
