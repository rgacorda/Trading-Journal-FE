# 📊 Trading Journal Frontend

A modern, responsive frontend application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. This project interfaces with the [Trading Journal API](https://github.com/your-username/trading-journal-api) to help traders upload, visualize, and manage their trading performance.

---

## 🚀 Features

- 🔐 **JWT-based Authentication**
  - Secure login & registration flows using HTTP-only cookies
- 📁 **Trade Upload**
  - Upload and parse CSV/XLSX files from supported brokers
- 📊 **Analytics Dashboard**
  - Interactive charts and metrics (P/L, win rate, drawdown, etc.)
- 🗃 **Trade Journal**
  - View, edit, delete, and filter trade entries
- 💼 **Account Management**
  - Manage broker/platform accounts and balance updates
- 🎨 **UI/UX**
  - Clean, accessible UI using Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)

---

## 🛠 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Axios** (API communication)
- **Tailwind CSS** (utility-first styling)
- **shadcn/ui** (UI component library)
- **Zustand** (lightweight state management)

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Access to the backend API (Express + MySQL)

### Installation

```bash
git clone https://github.com/your-username/trading-journal-frontend.git
cd trading-journal-frontend
npm install
```
Environment Setup
Create a .env.local file in the root:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```
🧪 Run Locally
```bash
npm run dev
```
The app should now be running at:
🔗 http://localhost:3000

All requests use Axios and are configured to include credentials:
```bash
// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default api;
npm run dev
```
🔐 Authentication

Uses JWT with HTTP-only cookies. The login flow:

POST /auth/login sends credentials
Backend sets token cookie
Frontend validates session on load
State is managed via a lightweight Zustand store.

💅 UI/UX Tools

shadcn/ui: accessible and customizable components
Tailwind CSS: atomic styling
Lucide Icons: clean icon set
📊 Pages
```bash
/dashboard: Main journal dashboard
/upload: Upload trade data
/auth/login: User login
/auth/register: User registration
/account: Manage platforms/balances
🧱 Example API Call


// lib/trade.ts
export const getTrades = async () => {
  const res = await api.get("/trades");
  return res.data;
};
```
🧪 TODO / Improvements

 Role-based UI restrictions (free/silver/gold)
 Add pagination and filters to journal
 Display broker/platform logos dynamically
 Add user preferences (dark mode, timezone, etc.)
 Improved error boundaries and loading states

🤝 Contributing

PRs and discussions are welcome! If you'd like to propose changes or improvements, feel free to open an issue first.

📬 Contact

📧 rgacorda.the2nd@gmail.com
🔗 Backend API: trading-journal-api
