import fs from 'fs';

const API_KEY = process.env.NASA_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function update() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Use only 'url' for the README (it's faster to load than hdurl)
    const imageUrl = data.url;

    const readmePath = 'README.md';
    let content = fs.readFileSync(readmePath, 'utf8');

    // This is the EXACT header in your README
    const header = '## 🌌 Astronomy Picture of the Day';
    
    // This defines the "Search" area: 
    // From the header, through any existing images/text, until the next separator (---)
    const sectionRegex = new RegExp(`${header}[\\s\\S]*?(?=\\n---)`, 'g');

    // This defines the "Replacement": The header plus JUST ONE image
    const newSection = `${header}\n\n![APOD](${imageUrl})`;

    if (content.includes(header)) {
      const updatedContent = content.replace(sectionRegex, newSection);
      fs.writeFileSync(readmePath, updatedContent);
      console.log(`✅ Success! Updated with: ${data.title}`);
    } else {
      console.error("❌ Could not find the header anchor in README.");
    }

  } catch (error) {
    console.error("❌ Update failed:", error);
    process.exit(1);
  }
}

update();