import fs from 'fs';

const API_KEY = process.env.NASA_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function update() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`NASA API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const imageUrl = data.url;

    const readmePath = 'README.md';
    let content = fs.readFileSync(readmePath, 'utf8');

    const header = '## 🌌 Astronomy Picture of the Day';
    
    const sectionRegex = new RegExp(`${header}[\\s\\S]*?(?=\\n---)`, 'g');

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