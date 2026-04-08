# 📅 Premium Wall Calendar

A Dribbble-quality, frontend-only wall calendar web app built with **React**, **Vite**, **Tailwind CSS**, **Shadcn UI**, and **Zustand**.

Designed to feel like a handcrafted, production-ready product — not an AI-generated template.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **🎨 Dark / Light Theme** — Animated sun/moon toggle powered by Zustand, persisted to localStorage
- **📅 Interactive Calendar Grid** — Smooth month navigation with fade transitions
- **🔄 Date Range Selection** — Click start → end dates with visual range highlighting
- **📝 Notes** — Add notes for any date or range, persisted in localStorage
- **🎉 Events** — Pre-populated holidays & meetings + add your own custom events
- **🖼️ Hero Image** — Stunning artwork panel with gradient overlays and month-specific theming
- **📱 Responsive** — Two-column desktop layout, stacked mobile layout
- **✨ Micro-Animations** — Hover scale, click transitions, slide-ups, fade-ins (200ms ease-out)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 (JavaScript) |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 + Shadcn UI |
| **State** | Zustand |
| **Date Utilities** | date-fns |
| **Icons** | Lucide React |
| **Persistence** | localStorage |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ravidongre793/wall_calendar.git

# Navigate to the project
cd wall_calendar

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at **http://localhost:5173/**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
wall_calendar/
├── public/
│   ├── hero.png              # Calendar artwork image
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/               # Shadcn UI components
│   │   │   ├── badge.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── switch.jsx
│   │   │   ├── textarea.jsx
│   │   │   └── tooltip.jsx
│   │   ├── CalendarContainer.jsx
│   │   ├── CalendarGrid.jsx
│   │   ├── CalendarHeader.jsx
│   │   ├── DayCell.jsx
│   │   ├── EventsPanel.jsx
│   │   ├── HeroImage.jsx
│   │   ├── NotesPanel.jsx
│   │   ├── RangeSelector.jsx
│   │   └── ThemeToggle.jsx
│   ├── stores/
│   │   ├── useCalendarStore.js   # Calendar state (Zustand)
│   │   └── useThemeStore.js      # Theme state (Zustand)
│   ├── lib/
│   │   └── utils.js              # cn() utility
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                 # Design system & tokens
├── components.json               # Shadcn config
├── vite.config.js
├── jsconfig.json
└── package.json
```

---

## 🎨 Design Philosophy

- **Premium Feel** — Soft blue palette, off-white backgrounds, subtle gray tones
- **Intentional Spacing** — Consistent 8px grid system throughout
- **Visual Hierarchy** — Bold headings, muted secondary text, color-coded events
- **Glassmorphism** — Subtle depth with soft shadows and layered sections
- **Typography** — Inter font family for clean readability
- **Micro-Interactions** — Every element responds to hover and click

---

## 🧩 Key Components

| Component | Description |
|---|---|
| `CalendarGrid` | 7-column month grid with 42 day cells |
| `DayCell` | Individual day with 8+ visual states (today, selected, range, weekend, events) |
| `EventsPanel` | Color-coded event list with inline add form and color picker |
| `NotesPanel` | Date-aware notes with Ctrl+Enter submit |
| `HeroImage` | Artwork panel with gradient overlay and month emoji |
| `ThemeToggle` | Animated sun/moon icon with smooth rotation |
| `RangeSelector` | Selected date range banner with clear button |

---

## 📦 Dependencies

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "zustand": "^5.0.12",
  "date-fns": "^4.1.0",
  "tailwindcss": "^4.2.2",
  "lucide-react": "^1.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0"
}
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ravidongre793">ravidongre793</a>
</p>
