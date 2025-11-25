# 🧠 GEMINI.md - Project Context & Brain

> **Context for AI Assistants**: This file documents the architectural decisions, business logic, and design rules of the ALMA CRM project. Read this to understand how to modify or extend the codebase.

---

## 1. Core Philosophy
*   **Product, not Prototype**: This is a real product. Code must be robust, maintainable, and scalable.
*   **Global State First**: Do not use local `useState` for business data. Use **Zustand**.
*   **Semantic Styling**: Never use arbitrary colors (e.g., `bg-[#123456]`). Use the defined design tokens.

---

## 2. Data Models (Zustand Stores)

### Lead Object (`useCRMStore`)
```typescript
interface Lead {
  id: string;
  company: string;
  contact: string;
  value: string;
  date: string;
  tags: string[];     // ['Novo', 'Quente', 'Contrato']
  pipeline: string;   // 'sales', 'support'
  status: string;     // 'new', 'qualified', 'negotiation', 'closed'
}
```

### Pipeline Structure
*   **Sales**: `new` -> `qualified` -> `negotiation` -> `contract` -> `closed`
*   **Support**: `ticket_open` -> `ticket_progress` -> `ticket_resolved`

---

## 3. Design System Rules

### 🎨 Colors
We use **Tailwind v4** with a custom `@theme` configuration in `src/index.css`.
*   **Primary**: `bg-primary`, `text-primary` (Brand Blue/Sky)
*   **Secondary**: `bg-secondary`, `text-secondary` (Slate/Gray)
*   **Status Colors**:
    *   Success: `emerald`
    *   Warning: `amber`
    *   Danger: `red`
    *   Info: `blue`
    *   Purple: `purple` (Special status)

### 🧩 UI Components (`src/components/ui`)
Always use these primitives instead of raw HTML:
*   `<Button variant="...">` instead of `<button className="...">`
*   `<Input />` instead of `<input className="...">`
*   `<Dialog>` for Modals.
*   `<DropdownMenu>` for actions.

---

## 4. Key Workflows

### Creating a Lead
1.  User clicks "Novo Lead" or uses `Cmd+K`.
2.  `useUIStore` opens the modal.
3.  Form submits to `useCRMStore.getState().addLead(lead)`.
4.  UI updates automatically in Kanban and LeadList.

### Moving a Lead (Kanban)
1.  Drag event triggers `@dnd-kit`.
2.  `handleDragEnd` calls `useCRMStore.getState().moveLead(id, newStatus)`.
3.  Store updates the lead's `status`.
4.  Kanban column re-renders with the new lead.

### Real-time Simulation
*   `src/hooks/useRealTimeSimulation.js` runs a timer.
*   Randomly triggers `addLead` or `updateLeadStatus` in the store to mimic live activity.

---

## 5. Future Roadmap
*   **Backend Integration**: Replace Zustand mock data with Supabase/Firebase.
*   **Authentication**: Replace mock `useAuthStore` with real Auth provider.
*   **Mobile App**: Port components to React Native (using NativeWind).
