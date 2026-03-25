import fs from 'fs';

const API_KEY = process.env.NASA_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function update() {
  const response = await fetch(url);
  const data = await response.json();
  
  // ... rest of your logic to write to README.md
  console.log("README updated with " + data.title);
}

update();