# 🚀 NASA Bounce Insights Dashboard

## 🌌 Astronomy Picture of the Day
(The script will only change what is inside these two markers)
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