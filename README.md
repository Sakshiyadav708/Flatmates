# 🏠 FlatMates | JC Bose UST (YMCA) Student Community Portal

A full-stack web application designed specifically for students of **JC Bose University of Science and Technology (YMCA), Faridabad** to find verified off-campus accommodations, buy/sell pre-owned furniture, share local domestic help contacts, and manage shared flat expenses in real time.

---

## ✨ Key Features

* **🔐 OTP-Verified Student Authentication:** Clean signup and login workflow with forced lowercase email validation and 4-digit OTP verification.
* **🏢 Sector-Based Flat & Room Listings:** Browse and filter vacant rooms and flats across Sector 7, 8, 10, 11, 12, 15, 75, and 76 with multi-image gallery uploads and gender preference tags.
* **🛋️ Pre-Owned Furniture Marketplace:** Buy and sell study tables, ergonomic chairs, beds, refrigerators, and wardrobes directly from passing-out seniors.
* **🍲 Maids & Cooks Directory:** Verified contacts and monthly rates for local cooks and house-cleaning staff around campus.
* **💸 Real-Time Flat Group Bill Splitter:** Create or join a shared Flat Group ID (e.g., `SEC11-ROOM302`) via the profile menu to track rent, Wi-Fi, and electricity bills, auto-calculate per-person shares, and send instant WhatsApp group reminders.
* **📍 Live Geolocation Detection:** Automatically detects the user's current locality via browser Geolocation API.
* **🗂️ Personal Post Management:** View and delete self-posted listings directly from the profile dropdown (`My Listed Posts`).
* **💬 One-Click WhatsApp Integration:** Direct pre-filled WhatsApp chat links on every listing for instant communication without middlemen or brokers.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, Tailwind CSS (Dark Slate & Navy Aesthetic), Vanilla JavaScript, Font Awesome
* **Backend:** Node.js, Express.js, CORS, Nodemailer
* **APIs:** Browser Geolocation API, OpenStreetMap Nominatim Reverse Geocoding API, WhatsApp Web API

---

## 🚀 Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/flatmates-app.git
   cd flatmates-app
