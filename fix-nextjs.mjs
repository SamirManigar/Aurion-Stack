import fs from 'fs';
import path from 'path';

function traverseAndFix(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseAndFix(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      let modified = false;
      let needsClient = false;

      // Check for client-side indicators
      if (
        content.includes('useState') ||
        content.includes('useEffect') ||
        content.includes('useRef') ||
        content.includes('useContext') ||
        content.includes('framer-motion') ||
        content.includes('onClick') ||
        content.includes('useWindowSize') ||
        content.includes('useReviews') ||
        content.includes('lucide-react') // usually fine if it's just icons, but some are animated
      ) {
         needsClient = true;
      }

      // We only strictly need "use client" for hooks, motion, framer-motion, interactivity.
      if (content.includes('framer-motion') || content.includes('use') || content.match(/on[A-Z]\w+=/)) {
         needsClient = true;
      }

      if (needsClient && !content.includes('"use client"')) {
        content = '"use client";\n\n' + content;
        modified = true;
      }

      // Replace react-router-dom
      if (content.includes('react-router-dom')) {
        content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]react-router-dom['"]/g, (match, importsStr) => {
          let newImports = [];
          if (importsStr.includes('useNavigate')) {
             newImports.push(`import { useRouter } from "next/navigation"`);
             content = content.replace(/useNavigate\(\)/g, 'useRouter()');
             content = content.replace(/navigate\(/g, 'router.push('); // Might need manual check, but typically navigate(path) -> router.push(path) and navigate(-1) -> router.back()
          }
          if (importsStr.includes('Link')) {
             newImports.push(`import Link from "next/link"`);
          }
          if (importsStr.includes('useLocation')) {
             newImports.push(`import { usePathname } from "next/navigation"`);
             content = content.replace(/useLocation\(\)/g, '{ pathname: usePathname() }');
          }
          return newImports.join(';\n');
        });
        
        // Fix navigate(-1)
        content = content.replace(/router\.push\(-1\)/g, 'router.back()');

        modified = true;
      }

      // Replace <a> tags acting as inner app routers to <Link> if we want, but typically left as is.

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Fixed: ${fullPath}`);
      }
    }
  }
}

traverseAndFix(path.join(process.cwd(), 'src', 'components'));
traverseAndFix(path.join(process.cwd(), 'src', 'pages'));
console.log("Done.");
