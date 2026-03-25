const fs = require('fs');
const path = require('path');

const files = [
    'src/components/Testimonials.tsx',
    'src/components/TechShowcase.tsx',
    'src/components/SurgeonProfile.tsx',
    'src/components/SpecialityGrid.tsx',
    'src/components/Navbar.tsx',
    'src/components/AboutSection.tsx',
    'src/components/Footer.tsx'
];

const basePath = process.cwd();

files.forEach(file => {
    const fullPath = path.join(basePath, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');

        // Replace Secondary Teal (#006a62) with vibrant Orange (#f98825)
        content = content.replace(/#006a62/gi, '#f98825');

        // Replace Mint (#81f3e5) with vibrant Orange (#f98825)
        content = content.replace(/#81f3e5/gi, '#f98825');

        // Replace Light Blue accent (#81bac8) with a complementing warm gold/orange (#f5a623)
        content = content.replace(/#81bac8/gi, '#f5a623');

        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${file}`);
    }
});
