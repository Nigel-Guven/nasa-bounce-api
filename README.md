# 🚀 NASA Bounce Insights Dashboard

A full-stack application for exploring space data, built with React and Node.js.

## 🌌 Astronomy Picture of the Day
![APOD](https://apod.nasa.gov/apod/image/2603/Perseverance_MarsRover_PIA25608_1024.jpg)

**Title:** Perseverance Rover Selfie  
**Date:** 2026-03-25  
**Explanation:** The NASA Perseverance rover captured this selfie on the Martian surface.
---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS, React Query, Chart.js |
| **Backend** | Node.js, Express |
| **Infrastructure** | Docker, Docker Compose, GitHub Actions |
| **Data Source** | [NASA Open APIs](https://api.nasa.gov/) |

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (optional)

### Local Development
1. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Docker**

Run the following command from root directory to start full application:

   ```bash
   docker-compose up --build
   ```

## 🤖 Automation

This repository uses GitHub Actions to automatically update the APOD section above every 24 hours via a custom Node.js script.