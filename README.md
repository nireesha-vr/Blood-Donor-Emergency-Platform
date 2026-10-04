# BloodConnect - Blood Donor & Emergency Request Platform

A modern, responsive, frontend-only web application designed to connect voluntary blood donors with patients and hospitals during urgent medical emergencies.

---

## 🎯 Project Objective
The objective of **BloodConnect** is to provide an accessible, fast, and user-friendly digital platform for bridging the critical gap between blood donors and recipients. It allows users to register as donors, search for nearby donors by blood group and city, post emergency blood requests, and respond to active emergency calls in real-time.

---

## ✨ Features
- **Landing Page (`index.html`)**: Eye-catching hero section, live community statistics, 4-step process guide, interactive blood group quick-filters, and call-to-action banner.
- **Donor Registration (`donor.html`)**: Comprehensive form validating age (18-65), phone numbers, email, location, and availability status. Saves data directly to `localStorage`.
- **Find Blood (`find-blood.html`)**: Real-time donor search engine filtering by blood group and city. Features donor contact popups and a visual Blood Compatibility Matrix.
- **Emergency Blood Request (`emergency-request.html`)**: Instant form for submitting urgent patient blood requirements with hospital details, units needed, required date, and priority level (Critical, Urgent, Normal).
- **Active Emergency Requests Feed (`requests.html`)**: Feed listing active requests sorted by priority (Critical requests first) with interactive filter tabs and an *"I Can Help"* volunteering action.
- **About Platform (`about.html`)**: Platform mission overview, core feature breakdown, and *"Why Donate Blood?"* educational cards.
- **Interactive UI Feedback**: Uses custom animated toast notifications and modal dialogs instead of standard browser `alert()` popups.
- **Responsive Layout**: Designed with CSS Grid and Flexbox for smooth usability on desktop, laptop, tablet, and mobile screens.

---

## 🛠️ Technologies Used
- **HTML5**: Semantic markup structuring all 6 core web pages.
- **CSS3**: Custom CSS variables, flexbox/grid layouts, keyframe animations, glassmorphism headers, badges, and responsive media queries.
- **Vanilla JavaScript (ES6)**: Pure client-side logic handling form validation, search filtering, dynamic DOM rendering, and custom toast notifications.
- **Browser `localStorage`**: Client-side storage simulating a local database for donor records and emergency request feeds.
- **FontAwesome CDN**: Vector icon set for UI visual clarity.
- **Google Fonts**: Poppins & Inter typography.

---

## 📁 Folder Structure

```
miniproject/
│
├── index.html              # Home Landing Page
├── donor.html              # Donor Registration Page
├── find-blood.html         # Donor Search & Compatibility Matrix
├── emergency-request.html  # Emergency Request Submission Form
├── requests.html           # Active Emergency Requests Feed
├── about.html              # About Platform & Educational Info
├── README.md               # Project documentation & execution guide
│
├── css/
│   └── style.css          # Global custom stylesheet & responsive rules
│
├── js/
│   └── script.js         # Unified JavaScript logic & localStorage manager
│
└── images/
    └── blood-donation.jpg # SVG/Vector medical illustration graphic
```

---

## 🚀 How to Run the Project
1. **No Installation Required**: Since this is a pure **frontend-only** project, no Node.js, Express, database, or build tools are needed.
2. Open the project folder (`miniproject`).
3. Double-click **`index.html`** or right-click and choose **"Open with Chrome / Firefox / Edge / Safari"**.
4. Navigate through all pages using the top navbar.

---

## 💾 How `localStorage` is Used
The application uses the browser's built-in `window.localStorage` API to store and retrieve data locally:

1. **`bloodDonors` Key**:
   - Stores an array of donor objects containing `id`, `name`, `age`, `gender`, `bloodGroup`, `phone`, `email`, `city`, `address`, `lastDonation`, and `availability`.
   - On initial launch (if `bloodDonors` is empty), the script automatically seeds 5 realistic sample donors (e.g. Arun Kumar - A+ - Chennai, Priya S - O+ - Chennai, Rahul M - B+ - Coimbatore, Divya R - O- - Madurai, Karthik V - AB+ - Chennai).

2. **`bloodRequests` Key**:
   - Stores an array of emergency request objects containing `id`, `patientName`, `bloodGroup`, `units`, `hospital`, `location`, `city`, `contact`, `date`, `emergencyLevel`, `message`, and `status`.
   - Automatically seeds 3 sample emergency requests on first visit if empty.

---

## 🎓 College Project Presentation Ready
- Clean code architecture separating HTML pages, CSS styling, and JavaScript logic.
- Built without external backend dependencies or heavy frameworks.
- Zero console errors and cross-browser compatible.
