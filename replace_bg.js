const fs = require('fs');
const path = require('path');

const files = [
    'src/components/Testimonials.tsx',
    'src/components/TechShowcase.tsx',
    'src/components/SurgeonProfile.tsx',
    'src/components/SpecialityGrid.tsx',
    'src/components/Navbar.tsx',
    'src/components/AboutSection.tsx',
    'src/components/Footer.tsx',
    'src/app/page.tsx'
];

const basePath = process.cwd();

files.forEach(file => {
    const fullPath = path.join(basePath, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');

        // 1. Replace soft teal backgrounds with pure white
        content = content.replace(/bg-\[#f8fcfc\]/g, 'bg-white');
        content = content.replace(/bg-\[#ebfdfc\]/g, 'bg-white');
        content = content.replace(/bg-\[#f4f7f6\]/g, 'bg-white');
        content = content.replace(/bg-\[#e5f7f6\]/g, 'bg-white');
        content = content.replace(/bg-\[var\(--color-mint\)]/g, 'bg-white');

        // 2. Remove text gradients and replace with solid deep teal or orange
        // Case 1: gradient from orange to teal -> just use solid orange
        content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-\[#f98825\] to-\[#004b57\]/g, 'text-[#f98825]');
        // Case 2: from teal to teal -> solid dark teal
        content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-\[#[^\]]+\] to-\[#[^\]]+\]/g, 'text-[#004b57]');
        content = content.replace(/bg-clip-text text-transparent bg-gradient-to-r from-white to-\[#f5a623\]/g, 'text-white');

        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${file}`);
    }
});
