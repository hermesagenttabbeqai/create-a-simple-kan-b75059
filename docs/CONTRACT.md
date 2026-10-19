# Contract: Simple Kanban Board

## Overview

A single-page browser application that shows three columns (TODO, IN PROGRESS, READY). Users create tasks with titles and custom tags, move tasks between columns by drag-and-drop or button, edit and delete tasks, and the board persists state in browser local storage. There is no server and no login.

## Assumptions

- All state lives in `localStorage` under the key `kanban-board`.
- Tags are stored as an array of plain strings per task.
- A task has a unique ID generated client-side (crypto.randomUUID or a small fallback).
- Drag-and-drop uses the HTML5 Drag-and-Drop API with a touch-events polyfill (mobile-sort-touch).
- The app is a static site that can be deployed to any static host (Netlify, GitHub Pages, etc.).
- No routing needed; the entire app is one page.
- End-to-end tests use Playwright against the Vite dev server.

## Stack

| Layer       | Choice                           | Version  |
|-------------|----------------------------------|----------|
| Language    | TypeScript                       | 5.4.5    |
| Framework   | React                            | 18.3.1   |
| Build tool  | Vite                             | 5.2.11   |
| Unit tests  | Vitest + @testing-library/react  | 1.6.0 / 16.0.0 |
| E2E tests   | Playwright                       | 1.44.1   |
| Linting     | ESLint + typescript-eslint       | 8.57.0 / 7.15.0 |

## Data model

All data lives in `localStorage`. No server database.

### Task

| Field    | Type                                        | Notes                       |
|----------|---------------------------------------------|-----------------------------|
| id       | string                                      | UUID, immutable             |
| title    | string                                      | Non-empty                   |
| column   | "TODO" \| "IN_PROGRESS" \| "READY"          | Current column              |
| tags     | string[]                                    | Zero or more free-form tags |
| order    | number                                      | Position within its column  |

### Board state (localStorage)

```
Key: "kanban-board"
Value: JSON array of Task[]
```

## API contracts

No server API. This is a pure client-side app.

### Module interfaces

| Module               | Exports                                    |
|----------------------|--------------------------------------------|
| `lib/storage.ts`     | `loadBoard(): Task[]`, `saveBoard(tasks: Task[]): void` |
| `lib/taskUtils.ts`   | `createTask(title, column): Task`, `reorderTasks(tasks, from, to, targetColumn): Task[]` |
| `components/Board`   | `<Board />` — root component, owns all state |
| `components/Column`  | `<Column column tasks onMove onEdit onDelete />` |
| `components/TaskCard`| `<TaskCard task onMove onEdit onDelete />`  |
| `components/TaskForm`| `<TaskForm initial onSave onCancel />`      |

## Design tokens

```css
/* Colours */
--color-bg:          #0f172a;   /* dark navy — page background */
--color-surface:     #1e293b;   /* card and column background */
--color-border:      #334155;   /* column borders */
--color-accent:      #38bdf8;   /* interactive highlights */
--color-text:        #f1f5f9;   /* primary text (on dark) — contrast >7:1 */
--color-text-muted:  #94a3b8;   /* secondary text — contrast 4.6:1 on surface */
--color-danger:      #f87171;   /* delete button */
--color-todo:        #818cf8;   /* TODO column header accent */
--color-inprogress:  #fb923c;   /* IN PROGRESS column header accent */
--color-ready:       #34d399;   /* READY column header accent */

/* Tag colours (cycled by index) */
--tag-0: #38bdf8; --tag-1: #a78bfa; --tag-2: #fb923c;
--tag-3: #34d399; --tag-4: #f472b6;

/* Spacing */
--space-xs: 4px;  --space-sm: 8px;  --space-md: 16px;  --space-lg: 24px;

/* Fonts */
--font-body: system-ui, sans-serif;
--font-size-base: 14px;
--radius-card: 8px;
--radius-tag:  4px;
```

## Folder layout

```
/
├── public/              Static assets (favicon)
├── src/
│   ├── components/
│   │   ├── Board/       Board.tsx, Board.test.tsx, Board.css
│   │   ├── Column/      Column.tsx, Column.test.tsx, Column.css
│   │   ├── TaskCard/    TaskCard.tsx, TaskCard.test.tsx, TaskCard.css
│   │   └── TaskForm/    TaskForm.tsx, TaskForm.test.tsx, TaskForm.css
│   ├── lib/
│   │   ├── storage.ts   localStorage helpers
│   │   ├── storage.test.ts
│   │   ├── taskUtils.ts Task creation / reordering helpers
│   │   └── taskUtils.test.ts
│   ├── types.ts         Shared TypeScript types (Task, ColumnId)
│   ├── tokens.css       CSS custom properties (design tokens)
│   ├── main.tsx         Vite entry point
│   └── index.css        Global reset + body styles
├── e2e/                 Playwright tests
│   └── kanban.spec.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── playwright.config.ts
└── package.json
```

## Requirement map

| Requirement | Satisfied by task(s)                             |
|-------------|--------------------------------------------------|
| BR-01       | Task 2 (Board + Column components)               |
| BR-02       | Task 3 (TaskForm + add task)                     |
| BR-03       | Task 3 (drag-and-drop + move button)             |
| BR-04       | Task 3 (tags in TaskForm)                        |
| BR-05       | Task 3 (edit mode in TaskCard/TaskForm)          |
| BR-06       | Task 3 (delete button)                           |
| BR-07       | Task 2 (TaskCard display)                        |
| BR-08       | Task 1 (storage lib + Board loads on mount)      |
| NFR-01      | Task 4 (Vite build, no heavy deps)               |
| NFR-02      | Task 2 (responsive CSS grid)                     |
| NFR-03      | Task 3 (HTML5 DnD + touch events)                |
| NFR-04      | Task 2 (keyboard-accessible buttons)             |
| NFR-05      | Task 2 (design tokens, WCAG AA colours)          |
