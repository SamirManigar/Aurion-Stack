import fs from 'fs';
import path from 'path';

function fixNavigate(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixNavigate(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      let modified = false;

      if (content.includes('useNavigate')) {
        content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\);?/g, 'const router = useRouter();');
        content = content.replace(/navigate\(/g, 'router.push(');
        content = content.replace(/router\.push\(-1\)/g, 'router.back()');
        
        // Ensure useRouter is imported
        if (!content.includes('useRouter')) {
            content = content.replace('use client";', '"use client";\nimport { useRouter } from "next/navigation";');
        }

        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Fixed navigate in ${fullPath}`);
      }
    }
  }
}

fixNavigate(path.join(process.cwd(), 'src'));
