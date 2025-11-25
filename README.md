# 💎 ALMA CRM

> **A "Boutique" CRM for High-Performance Teams.**
> Built with React, Tailwind CSS v4, Zustand, and Radix UI.

ALMA CRM is a production-ready Customer Relationship Management platform designed for modern agencies. It moves beyond generic templates to offer a bespoke, high-performance interface focused on speed, aesthetics, and usability.

![ALMA CRM Dashboard](./public/screenshot.png) *Add a screenshot here later*

---

## 🚀 Tech Stack

*   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first configuration)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **UI Primitives**: [Radix UI](https://www.radix-ui.com/) (Headless, Accessible)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Utils**: `clsx`, `tailwind-merge`, `cmdk`

---

## 🏗️ Architecture & State

The application abandons fragile local state for a robust **Global State** architecture using **Zustand**.

### 1. `useCRMStore`
The heart of the application. Manages all business data.
*   **Leads**: Centralized array of lead objects.
*   **Pipelines**: Configurable sales pipelines (Sales, Support, Onboarding).
*   **Columns**: Kanban column definitions mapped to pipelines.
*   **Actions**: `addLead`, `moveLead`, `updateLeadStatus`.

### 2. `useAuthStore`
Manages user session and permissions.
*   **User**: Current logged-in user profile.
*   **Role**: Access control (Admin, User).

### 3. `useUIStore`
Controls global UI states to prevent prop-drilling.
*   **Modals**: Open/close state for dialogs.
*   **Sidebar**: Collapse/expand state.
*   **CommandPalette**: Visibility toggle.

---

## 🎨 "Boutique" Design System

We do **not** use generic Tailwind colors (e.g., `bg-blue-500`). Instead, we enforce a semantic design system defined in `src/index.css` using Tailwind v4's `@theme`.

### Core Tokens
*   `--color-primary`: Brand primary color (Sky/Blue).
*   `--color-secondary`: Brand secondary color (Slate).
*   `--color-surface`: Backgrounds for cards and panels.
*   `--font-sans`: Inter (Google Fonts).

### Component Library (`src/components/ui`)
We built a custom component library on top of **Radix UI** primitives to ensure accessibility (a11y) and consistent styling.
*   **Button**: Variants (`default`, `outline`, `ghost`, `danger`).
*   **Input / Select**: Form controls with consistent focus states.
*   **Dialog**: Accessible modal engine.
*   **DropdownMenu**: Context menus and actions.
*   **CommandPalette**: `Cmd+K` interface.

---

## ✨ Key Features

### 1. Kanban Pipeline
*   **Drag & Drop**: Powered by `@dnd-kit`.
*   **Optimistic UI**: Instant visual updates backed by `useCRMStore`.
*   **Multi-Pipeline**: Switch between Sales, Support, and Onboarding views.

### 2. Unified Inbox
*   **Real-time Simulation**: Chat interface that simulates incoming messages.
*   **Lead Integration**: Chat directly linked to Lead records.

### 3. Command Palette (`Cmd+K`)
*   **Keyboard First**: Navigate anywhere without a mouse.
*   **Quick Actions**: Create leads, search contacts, or switch views instantly.

### 4. Real-time Simulation
*   The app simulates a "live" environment. You will see random leads appearing and status changes to demonstrate the reactivity of the interface.

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── ui/             # "Boutique" Radix+Tailwind components (Button, Input, etc.)
│   ├── dashboard/      # Dashboard widgets
│   ├── kanban/         # Board, Column, LeadCard
│   ├── inbox/          # ChatList, ChatWindow
│   └── leads/          # DataTable, Filters
├── hooks/              # Custom hooks (useRealTimeSimulation)
├── layouts/            # Main app layout (Sidebar, Header)
├── pages/              # Route views (Dashboard, Kanban, Inbox, Leads)
├── store/              # Zustand stores (Auth, CRM, UI)
└── index.css           # Design System & Tailwind v4 Config
```

---

## 🛠️ Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

---

## 📝 License

Private & Confidential - ALMA Agency.
