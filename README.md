# TaskFlow

TaskFlow is a lightweight client-side project management dashboard designed for small teams, agencies, and freelancers to plan work, manage tasks, and quickly understand project progress.

The application is built as a frontend-only demo using mock/seed data and browser `localStorage`. No backend, API, database, or real authentication provider is required.

## Tech Stack

* React 19
* TypeScript
* Vite
* React Router DOM
* Tailwind CSS v4
* shadcn/ui
* Lucide React
* Base UI React primitives
* Browser `localStorage`

---

# Step 01 — Show Your Thinking

## 1. Who is the user?

TaskFlow is designed for small development, design, and marketing teams, agencies, and freelancers who need a simple way to manage work without the complexity of tools such as Jira.

The main things users want to do are:

1. Quickly understand what work is active, completed, or overdue.
2. See tasks organized by status, project, and assignee.
3. Create, update, and manage tasks quickly without navigating through complicated menus.

The interface is intentionally designed for both technical and non-technical users.

---

## 2. What should be easiest on the first screen after login, and why?

The first screen after login should make the current workload understandable at a glance.

The **Overview** page provides:

* Active projects
* Total tasks
* Overdue tasks
* Completed tasks
* Tasks that are due soon


---

## 3. Key task flow

The user logs into TaskFlow and lands on the Overview page.

From the dashboard, the user selects **New Task** and enters the task information:

1. Task title
2. Project
3. Assignee
4. Priority
5. Due date
6. Status
7. Optional task details

When the task is submitted, it is added to the selected project and saved to browser `localStorage`.

The user is then taken to the **Task Board**, where the new task appears in its assigned status column.

The user can later:

* Edit the task.
* Change its status using the status dropdown.
* Drag the task between columns.
* Filter tasks by project or assignee.

Status changes and task edits are also persisted to `localStorage`.

---

## 4. Assumptions

The following assumptions were made for this frontend assessment:

* TaskFlow represents a **single team workspace**.
* The workspace can contain multiple projects.
* Multiple tasks can belong to each project.
* Tasks can be assigned to different team members.
* A task belongs to a project and has a status, assignee, due date, and optional priority/details.
* The application uses browser `localStorage` for task and project persistence.
* There is no backend, API, database, or real authentication provider.
* The login screen is intentionally static and only demonstrates the application entry flow.
* Authentication and authorization are outside the scope of this assessment.

---

# Step 02 — Core Screens

## Overview

The Overview page provides a high-level summary of the workspace.

It displays:

* Active projects
* Total tasks
* Overdue tasks
* Completed tasks
* Tasks due soon

The metrics and task information are calculated from the locally stored project and task data.

The current demo date used for due-date calculations is:

```text
2026-09-04
```

---

## Task Board

The Task Board provides a Kanban-style view with three columns:

* To do
* In progress
* Done

Each task card displays:

* Task title
* Project
* Assignee
* Due date
* Priority when available

Users can filter tasks by:

* Assignee
* Project

Both filters can be combined.

The board also supports native HTML drag-and-drop. Dragging a task into another column changes its status and persists the change to `localStorage`.

Users can also change a task's status using the status dropdown on the task card.

Each task includes an **Edit** action that opens the shared create/edit task form.

---

## Create / Edit Task

TaskFlow uses a shared form for creating and editing tasks.

### Create mode

```text
/dashboard/new-task
```

### Edit mode

```text
/dashboard/tasks/:taskId/edit
```

The form supports:

* Task title
* Project
* Assignee
* Priority
* Due date
* Status when editing
* Task details

When creating a task, the task is initially assigned the `todo` status and added to the selected project.

When editing a task, the existing task is loaded and its editable fields are updated.

After saving, the changes are persisted locally and the user is returned to the Task Board.

---

# Application Routes

| Route                           | Page       | Purpose                  |
| ------------------------------- | ---------- | ------------------------ |
| `/`                             | Login      | Static login screen      |
| `/dashboard`                    | Overview   | Project and task summary |
| `/dashboard/tasks`              | Task Board | Kanban task management   |
| `/dashboard/new-task`           | New Task   | Create a task            |
| `/dashboard/tasks/:taskId/edit` | Edit Task  | Edit an existing task    |

---

# Data & Persistence

TaskFlow is completely frontend-only.

Project and task data are stored in browser `localStorage` using:

```text
taskflow_projects
```

The application seeds eight starter projects when no valid stored project data exists:

1. Website Redesign
2. Mobile App Launch
3. Marketing Campaign
4. Product Research
5. Content Library
6. Analytics Setup
7. Brand Refresh
8. Team Operations

Existing localStorage data is preserved when the application is reopened.

Clearing browser storage removes the locally stored projects, tasks, edits, and status changes.

---

# Task Model

Tasks use the following structure:

```ts
export type ProjectTask = {
  id: number
  title: string
  project: string
  assignee: string
  dueDate: string
  status: TaskStatus
  priority?: TaskPriority
  details?: string
}
```

Task statuses:

```ts
type TaskStatus = "todo" | "in-progress" | "completed"
```

Task priorities:

```ts
type TaskPriority = "low" | "medium" | "high"
```

Dates are stored as ISO date strings:

```text
YYYY-MM-DD
```

---

# Responsive Design

The application is designed to work across desktop and mobile screen sizes.

The dashboard uses a responsive shadcn sidebar:

* Desktop users can use the sidebar directly.
* Mobile users access the same navigation through a mobile Sheet.
* The sidebar supports collapsed and expanded states.
* Sidebar state is persisted using browser cookies.

The main dashboard, task board, filters, forms, and task cards adapt to smaller screen widths.

---

# Project Structure

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── assets/
├── components/
│   ├── theme-provider.tsx
│   └── ui/
├── hooks/
│   └── use-mobile.ts
├── lib/
│   ├── project-storage.ts
│   └── utils.ts
└── pages/
    └── dashboard/
        ├── Dashboard.tsx
        ├── NewTaskPage.tsx
        ├── OverviewPage.tsx
        └── TaskBoardPage.tsx
```

---

# Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the TypeScript check:

```bash
npm run typecheck
```

Build the production application:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Format the project:

```bash
npm run format
```

Preview the production build:

```bash
npm run preview
```

---

# Authentication

Authentication is intentionally static for this assessment.

The login state is stored in:

```text
brandsquare_logged_in
```

No email or password is sent to a server, and credentials are not validated against a backend.

Signing out removes the local login state and redirects the user to the login screen.

---

# Validation

The project has been validated using:

```bash
npm run typecheck
npm run build
```

The production build completes successfully.

The Vite build may display warnings related to:

* `__dirname` in `vite.config.ts`
* Large JavaScript chunks

These are build warnings and do not prevent the production build from completing.

---

# Future Improvements

Potential future improvements include:

* Real authentication and authorization
* Backend API integration
* Database persistence
* Project creation and deletion
* Task deletion
* Task sorting within board columns
* Keyboard-accessible drag-and-drop
* Unsaved-form navigation confirmation
* Cross-tab localStorage synchronization
* Automated component and route tests
* Production BrowserRouter fallback configuration
* Route-level code splitting for smaller dashboard bundles
