#!/usr/bin/env node
/**
 * Backlink Tracker — Valli Super Speciality Hospital
 * Generates a structured list of all "Work" status sites sorted by DA
 * Usage: node scripts/backlink-tracker.js > backlinks.csv
 */

const platforms = [
  // === TIER 1: DA 90+ ===
  { domain: "medium.com", da: 95, template: "A", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "buzzfeed.com", da: 93, template: "E", status: "pending", posted_url: "", anchor: "Valli Super Speciality Hospital" },
  { domain: "wattpad.com", da: 92, template: "B", status: "pending", posted_url: "", anchor: "joint replacement Salem" },
  { domain: "hubpages.com", da: 92, template: "A", status: "pending", posted_url: "", anchor: "orthopedic surgeon Salem" },
  { domain: "substack.com", da: 92, template: "B", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "patriabook.com", da: 90, template: "C", status: "pending", posted_url: "", anchor: "sports injury clinic Salem" },

  // === TIER 2: DA 76-89 ===
  { domain: "slashdot.org", da: 91, template: "D", status: "pending", posted_url: "", anchor: "spine surgery Salem" },
  { domain: "podomatic.com", da: 86, template: "E", status: "pending", posted_url: "", anchor: "trauma care Salem" },
  { domain: "canvas.instructure.com", da: 85, template: "D", status: "pending", posted_url: "", anchor: "orthopedic hospital Tamil Nadu" },
  { domain: "nairaland.com", da: 89, template: "E", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "minds.com", da: 86, template: "B", status: "pending", posted_url: "", anchor: "orthopedic surgeon Salem" },
  { domain: "dzone.com", da: 84, template: "D", status: "pending", posted_url: "", anchor: "spine surgery Salem" },
  { domain: "dev.to", da: 84, template: "D", status: "pending", posted_url: "", anchor: "orthopedic hospital Tamil Nadu" },
  { domain: "hometalk.com", da: 78, template: "B", status: "pending", posted_url: "", anchor: "joint replacement Salem" },
  { domain: "geogebra.org", da: 79, template: "F", status: "pending", posted_url: "", anchor: "knee replacement Salem" },
  { domain: "elephantjournal.com", da: 76, template: "C", status: "pending", posted_url: "", anchor: "sports injury clinic Salem" },
  { domain: "vocal.media", da: 71, template: "A", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "gamedev.net", da: 77, template: "E", status: "pending", posted_url: "", anchor: "Valli Super Speciality Hospital" },
  { domain: "penzu.com", da: 75, template: "B", status: "pending", posted_url: "", anchor: "arthroscopy Salem" },
  { domain: "ko-fi.com", da: 81, template: "E", status: "pending", posted_url: "", anchor: "orthopedic surgeon Salem" },
  { domain: "buymeacoffee.com", da: 80, template: "E", status: "pending", posted_url: "", anchor: "trauma care Salem" },

  // === mn.co COMMUNITIES (DA 76 each) ===
  { domain: "match-ideas.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "insurtechasia.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "Valli Super Speciality Hospital" },
  { domain: "tech-start.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "joint replacement Salem" },
  { domain: "talentcrowd.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "orthopedic surgeon Salem" },
  { domain: "advicehonest.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "sports injury clinic Salem" },
  { domain: "monvelli.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "trauma care Salem" },
  { domain: "stemfemmes.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "eveficient.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "Valli Super Speciality Hospital" },
  { domain: "crystal.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "joint replacement Salem" },
  { domain: "the-net.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "orthopedic surgeon Salem" },
  { domain: "clinalleve.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "sports injury clinic Salem" },
  { domain: "alaure-marketing.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "fracture treatment Salem" },
  { domain: "black-gun-association.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "trauma care Salem" },
  { domain: "vr-zone-ferndale.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "thecleverbeaver.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "Valli Super Speciality Hospital" },
  { domain: "primal-dread.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "orthopedic hospital Tamil Nadu" },
  { domain: "andrew-brown.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "joint replacement Salem" },
  { domain: "freeline.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "knee replacement Salem" },
  { domain: "oppathingzz.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "sports injury Salem" },
  { domain: "taxecure.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "best hospital Salem" },
  { domain: "keywebco.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "orthopedic surgeon Salem" },
  { domain: "q-theneteork.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "Valli Super Speciality Hospital" },
  { domain: "network-48790.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "fracture clinic Salem" },
  { domain: "own-business-that-work.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "arthroscopy Salem" },
  { domain: "curlebrity.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "joint replacement Salem" },
  { domain: "drujrake.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "trauma care Salem" },
  { domain: "nethxt.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "thegameoflife-de.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "Valli Super Speciality Hospital" },
  { domain: "machineintelligence.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "orthopedic surgeon Salem" },
  { domain: "putlockerstv.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "sports injury clinic Salem" },
  { domain: "louhangaround.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "joint replacement Salem" },
  { domain: "skillcrush.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "knee replacement Salem" },
  { domain: "snapped.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "orthopedic hospital Tamil Nadu" },
  { domain: "elk-city.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "local-urban-eats.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "Valli Super Speciality Hospital" },
  { domain: "smush-please.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "fracture treatment Salem" },
  { domain: "pepins.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "trauma care Salem" },
  { domain: "calisthenics.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "sports injury Salem" },
  { domain: "weholdspace.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "best hospital Salem" },
  { domain: "clicksharedone.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "orthopedic surgeon Salem" },
  { domain: "monstaluck.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "joint replacement Salem" },
  { domain: "network-30.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "knee replacement Salem" },
  { domain: "faceout.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "arthroscopy Salem" },
  { domain: "la-mer.mn.co", da: 76, template: "E", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },

  // === TIER 3: DA 50-75 ===
  { domain: "hashnode.com", da: 62, template: "D", status: "pending", posted_url: "", anchor: "orthopedic hospital Tamil Nadu" },
  { domain: "teletype.in", da: 61, template: "A", status: "pending", posted_url: "", anchor: "best orthopedic hospital in Salem" },
  { domain: "losangeles.bubblelife.com", da: 65, template: "E", status: "pending", posted_url: "", anchor: "Valli Super Speciality Hospital" },
  { domain: "storeboard.com", da: 63, template: "A", status: "pending", posted_url: "", anchor: "joint replacement Salem" },
  { domain: "talkmarkets.com", da: 51, template: "F", status: "pending", posted_url: "", anchor: "knee replacement Salem" },
  { domain: "vocal.media", da: 71, template: "C", status: "pending", posted_url: "", anchor: "sports injury clinic Salem" },
  { domain: "theodysseyonline.com", da: 87, template: "B", status: "pending", posted_url: "", anchor: "orthopedic surgeon Salem" },
  { domain: "ourboox.com", da: 49, template: "E", status: "pending", posted_url: "", anchor: "fracture treatment Salem" },
  { domain: "party.biz", da: 50, template: "E", status: "pending", posted_url: "", anchor: "trauma care Salem" },
];

// Print CSV
console.log("Domain,DA,Template,Anchor Text,Status,Posted URL,Date Posted");
for (const p of platforms) {
  console.log(`"${p.domain}",${p.da},"Template ${p.template}","${p.anchor}","${p.status}","${p.posted_url}",""`);
}
console.log(`\nTotal platforms: ${platforms.length}`);
console.log(`Estimated DA 76+ backlinks: ${platforms.filter(p => p.da >= 76).length}`);
console.log(`Estimated DA 90+ backlinks: ${platforms.filter(p => p.da >= 90).length}`);
