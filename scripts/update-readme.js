import fs from 'fs';

const API_KEY = process.env.NASA_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function update() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const readmePath = 'README.md';
    const currentContent = fs.readFileSync(readmePath, 'utf8');

    // Only the image markdown
    const newApodContent = `\n![APOD](${data.url})\n`;

    // The Specific Regex: Targets ONLY the area between your markers
    const regex = /[\s\S]*/g;
    
    // Replace the section, preserving the markers for the next run
    const updatedContent = currentContent.replace(
      regex, 
      `${newApodContent}`
    );

    fs.writeFileSync(readmePath, updatedContent);
    console.log(`✅ README updated with new image only.`);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

update();