import fs from 'fs';

const API_KEY = process.env.NASA_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function update() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.url) {
      throw new Error("No URL found in NASA API response");
    }

    const readmePath = 'README.md';
    const currentContent = fs.readFileSync(readmePath, 'utf8');

    // 1. Define the new content block
    const newApodContent = `
![APOD](${data.url})
`;

    // 2. This Regex specifically finds the text BETWEEN your markers
    const regex = /[\s\S]*/g;
    
    // 3. Replace the old block with the new one (keeping the markers for the next run)
    const updatedContent = currentContent.replace(
      regex, 
      `${newApodContent}`
    );

    fs.writeFileSync(readmePath, updatedContent);
    console.log(`✅ README updated with: ${data.title}`);
  } catch (error) {
    console.error("❌ Failed to update README:", error);
    process.exit(1);
  }
}

update();