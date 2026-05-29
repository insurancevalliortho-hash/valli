#!/usr/bin/env node
/**
 * Fix Page Metadata Script
 * Replaces boilerplate metadata in all clinic/specialty pages with
 * targeted, high-quality SEO metadata.
 */

const fs = require('fs');
const path = require('path');

const pageMetadata = {
  'arthroscopy': {
    title: 'Arthroscopy Surgery in Salem | Keyhole Joint Surgery | Valli Hospital',
    description: 'Expert arthroscopic (keyhole) surgery in Salem at Valli Super Speciality Hospital. Minimally invasive treatment for ACL tears, meniscus injuries, rotator cuff, and shoulder disorders by Dr. T. Natanasabapathy. Fast recovery, same-day discharge.',
    keywords: ['arthroscopy Salem', 'arthroscopic surgery Salem', 'ACL tear treatment Salem', 'meniscus surgery Salem', 'keyhole surgery knee Salem', 'minimally invasive ortho surgery Tamil Nadu', 'Dr Natanasabapathy arthroscopy', 'shoulder arthroscopy Salem'],
  },
  'fracture-clinic': {
    title: 'Fracture & Trauma Clinic Salem | Emergency Fracture Treatment | Valli Hospital',
    description: 'Valli Super Speciality Hospital\'s fracture & trauma clinic in Salem offers 24/7 emergency fracture treatment, complex fracture surgery, ORIF, and polytrauma management. ACLS/ATLS-certified surgeons. 30-minute arrival-to-operation protocol.',
    keywords: ['fracture treatment Salem', 'bone fracture surgery Salem', 'trauma clinic Salem', 'emergency fracture care Salem', 'complex fracture surgery Tamil Nadu', 'ORIF surgery Salem', '24 hour fracture care Salem', 'ortho emergency Salem'],
  },
  'back-pain-and-spinal-disorders': {
    title: 'Back Pain & Spine Surgery in Salem | Disc, Spondylosis Treatment | Valli Hospital',
    description: 'Comprehensive back pain and spinal disorder treatment in Salem at Valli Super Speciality Hospital. Expert care for disc herniation, lumbar spondylosis, sciatica, spinal stenosis, and spondylolisthesis. Surgery and non-surgical options available.',
    keywords: ['back pain treatment Salem', 'spine surgery Salem', 'disc herniation treatment Salem', 'sciatica treatment Salem', 'lumbar spondylosis Salem', 'spinal stenosis treatment Tamil Nadu', 'spondylolisthesis surgery Salem', 'lower back pain specialist Salem'],
  },
  'paediatric-orthopaedics-deformity-clinic': {
    title: 'Paediatric Orthopaedics & Deformity Clinic Salem | Child Bone Care | Valli Hospital',
    description: 'Specialised paediatric orthopaedic care in Salem at Valli Super Speciality Hospital. Expert treatment for clubfoot, scoliosis, limb length discrepancy, congenital deformities, and childhood fractures. Child-safe anaesthesia and dedicated paediatric orthopaedic protocols.',
    keywords: ['paediatric orthopaedics Salem', 'children bone specialist Salem', 'clubfoot treatment Salem', 'scoliosis treatment children Salem', 'paediatric fracture Salem', 'child orthopaedic hospital Tamil Nadu', 'limb deformity correction Salem', 'congenital ortho deformity Salem'],
  },
  'bone-cancer-treatment': {
    title: 'Bone Cancer & Bone Tumour Treatment in Salem | Oncology Ortho | Valli Hospital',
    description: 'Specialised bone cancer and bone tumour treatment at Valli Super Speciality Hospital, Salem. Expert oncologic orthopaedic care for osteosarcoma, Ewing\'s sarcoma, chondrosarcoma, and metastatic bone disease. Limb-salvage surgery and comprehensive oncology support.',
    keywords: ['bone cancer treatment Salem', 'bone tumour surgery Salem', 'osteosarcoma treatment Tamil Nadu', 'oncologic orthopaedics Salem', 'limb salvage surgery Salem', 'bone metastasis treatment Salem', 'Ewing sarcoma Salem', 'bone cancer hospital Tamil Nadu'],
  },
  'joint-care-clinic': {
    title: 'Joint Care & Joint Replacement Clinic Salem | Knee Hip Replacement | Valli Hospital',
    description: 'Salem\'s leading joint care clinic at Valli Super Speciality Hospital. Expert total knee replacement, total hip replacement, shoulder replacement, and minimally invasive joint surgeries. Led by Dr. T. Natanasabapathy with 3,000+ successful joint replacements.',
    keywords: ['joint replacement Salem', 'knee replacement Salem', 'hip replacement Salem', 'joint care clinic Salem', 'total knee replacement Tamil Nadu', 'total hip replacement Salem', 'minimally invasive joint replacement Salem', 'Dr Natanasabapathy joint replacement'],
  },
  'sports-injury-clinic': {
    title: 'Sports Injury Clinic Salem | ACL MCL Ligament Repair | Valli Hospital',
    description: 'Advanced sports injury treatment in Salem at Valli Super Speciality Hospital. Expert care for ACL tears, MCL injuries, meniscus tears, rotator cuff injuries, tennis elbow, and sports fractures. Biomechanical assessment and rehabilitation by specialist sports orthopaedic team.',
    keywords: ['sports injury clinic Salem', 'ACL injury treatment Salem', 'sports orthopaedic Salem', 'ligament repair Salem', 'MCL injury Salem', 'sports fracture treatment Salem', 'tennis elbow Salem', 'rotator cuff injury Salem'],
  },
  'sports-medicine-clinic': {
    title: 'Sports Medicine Clinic Salem | Athletic Performance & Injury Prevention | Valli Hospital',
    description: 'Comprehensive sports medicine services in Salem at Valli Super Speciality Hospital. Expert diagnosis, treatment, and prevention of sports-related injuries for professional and amateur athletes. PRP therapy, physiotherapy, and return-to-sport protocols.',
    keywords: ['sports medicine Salem', 'sports medicine clinic Salem', 'PRP therapy Salem', 'athlete injury treatment Salem', 'sports rehabilitation Salem', 'sports physiotherapy Salem', 'injury prevention sports Tamil Nadu', 'sports doctor Salem'],
  },
  'sports-training': {
    title: 'Sports Training & Athletic Rehabilitation Salem | Valli Hospital',
    description: 'Professional sports training, conditioning, and rehabilitation programs at Valli Super Speciality Hospital Salem. Science-backed athletic performance enhancement, post-injury return-to-sport training, and physiotherapy-led conditioning programs.',
    keywords: ['sports training Salem', 'athletic rehabilitation Salem', 'return to sport Salem', 'sports conditioning Salem', 'physiotherapy rehabilitation Salem', 'sports performance Salem', 'post surgery sports rehab Salem', 'athlete training hospital Salem'],
  },
  'foot-and-ankle-clinic': {
    title: 'Foot & Ankle Clinic Salem | Flatfoot, Plantar Fasciitis Treatment | Valli Hospital',
    description: 'Specialised foot and ankle care in Salem at Valli Super Speciality Hospital. Expert treatment for plantar fasciitis, Achilles tendon injuries, flatfoot, ankle fractures, hallux valgus, and complex foot deformities. Surgical and conservative options.',
    keywords: ['foot and ankle clinic Salem', 'plantar fasciitis treatment Salem', 'Achilles tendon repair Salem', 'flatfoot treatment Salem', 'ankle fracture Salem', 'hallux valgus surgery Salem', 'foot pain specialist Salem', 'ankle arthroscopy Salem'],
  },
  'failed-surgery-corrections': {
    title: 'Failed Surgery Revision & Correction Salem | Revision Arthroplasty | Valli Hospital',
    description: 'Expert revision and correction surgery for failed orthopaedic procedures in Salem at Valli Super Speciality Hospital. Specialised care for failed knee/hip replacement, failed spine surgery, implant failure, and post-surgical complications. Second opinion available.',
    keywords: ['failed surgery correction Salem', 'revision arthroplasty Salem', 'failed knee replacement revision Salem', 'failed hip replacement Salem', 'implant failure correction Salem', 'revision surgery ortho Salem', 'ortho second opinion Salem', 'post surgical complication Salem'],
  },
  'genetic-testing': {
    title: 'Genetic Testing & Molecular Diagnostics Salem | Valli Hospital',
    description: 'Advanced genetic testing and molecular diagnostics at Valli Super Speciality Hospital Salem. Comprehensive hereditary disease screening, cancer genetic testing, chromosomal analysis, and precision medicine diagnostics to guide personalised treatment plans.',
    keywords: ['genetic testing Salem', 'molecular diagnostics Salem', 'hereditary disease testing Tamil Nadu', 'cancer genetic testing Salem', 'chromosomal analysis Salem', 'precision medicine Salem', 'genetic counselling Salem', 'diagnostic genetics Salem'],
  },
};

const APP_DIR = path.join(__dirname, '..', 'src', 'app');

let fixedCount = 0;

for (const [slug, meta] of Object.entries(pageMetadata)) {
  const pagePath = path.join(APP_DIR, slug, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠️  Page not found: ${pagePath}`);
    continue;
  }
  
  let content = fs.readFileSync(pagePath, 'utf-8');
  
  // Build the new metadata block
  const keywordsStr = JSON.stringify(meta.keywords, null, 4)
    .split('\n')
    .map((line, i) => (i === 0 ? line : '  ' + line))
    .join('\n');
  
  const newMeta = `export const metadata: Metadata = {
  title: ${JSON.stringify(meta.title)},
  description: ${JSON.stringify(meta.description)},
  keywords: ${keywordsStr},
  alternates: {
    canonical: \`https://vallihospital.in/${slug}\`,
  },
};`;
  
  // Replace existing metadata block
  const metaRegex = /export const metadata: Metadata = \{[\s\S]*?\};/;
  
  if (!metaRegex.test(content)) {
    console.log(`⚠️  Could not find metadata block in: ${pagePath}`);
    continue;
  }
  
  const newContent = content.replace(metaRegex, newMeta);
  fs.writeFileSync(pagePath, newContent, 'utf-8');
  console.log(`✅ Fixed metadata for: /${slug}`);
  fixedCount++;
}

console.log(`\n🎯 Done! Fixed metadata for ${fixedCount}/${Object.keys(pageMetadata).length} pages.`);
