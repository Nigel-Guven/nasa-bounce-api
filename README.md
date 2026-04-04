# 🚀 NASA Bounce Insights Dashboard

[![codecov](https://codecov.io/gh/Nigel-Guven/nasa-bounce-api/branch/main/graph/badge.svg?token=<TOKEN>)](https://codecov.io/gh/<username>/<repo>)

### 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Infrastructure** | Docker, Docker Compose, GitHub Actions |
| **Data Source** | [NASA Open APIs](https://api.nasa.gov/) |

---

### ⚡ Getting Started

#### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (optional)

#### Local Development
1. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Docker**

Run the following command from root directory to start full application:

   ```bash
   docker-compose up --build
   ```
#### Application Guide

This application contains:
- Homepage which displays the NASA Astronomy Picture of the Day.
- About page with links to this repository, and the associated coding challenge providers.
- Live Youtube Feeds of the International Space Station, Artemis II which launched on April 1, 2026.
- Mars Rover Photography of the Curiosity, Opportunity and Spirit Rovers.
- Near Earth Objects discovered by NASA, Filter by date, size or speed and Sort on Hazardous objects. (Note that there is a maximum specified range of 7 days)
- A comprehensive search system of the NASA image archive
