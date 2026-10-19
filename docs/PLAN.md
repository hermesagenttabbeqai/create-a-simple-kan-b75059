# Plan: Simple Kanban Board

## Task 1: Project scaffold and storage library

- assignee: claude
- requirements: BR-08, NFR-01
- files: package.json, vite.config.ts, tsconfig.json, index.html, src/main.tsx, src/index.css, src/tokens.css, src/types.ts, src/lib/storage.ts, src/lib/storage.test.ts, src/lib/taskUtils.ts, src/lib/taskUtils.test.ts, playwright.config.ts
- branch: feature/scaffold-and-storage
- done when: `npm run build` succeeds with no errors; `npm test` runs and the storage and taskUtils unit tests pass.

## Task 2: Board, Column and TaskCard components

- assignee: claude
- requirements: BR-01, BR-07, NFR-02, NFR-04, NFR-05
- files: src/components/Board/Board.tsx, src/components/Board/Board.test.tsx, src/components/Board/Board.css, src/components/Column/Column.tsx, src/components/Column/Column.test.tsx, src/components/Column/Column.css, src/components/TaskCard/TaskCard.tsx, src/components/TaskCard/TaskCard.test.tsx, src/components/TaskCard/TaskCard.css
- branch: feature/board-column-card
- done when: All three components render without errors; unit tests pass; the board shows three labelled columns; task cards display title and tags.

## Task 3: TaskForm, drag-and-drop, edit and delete

- assignee: devin
- requirements: BR-02, BR-03, BR-04, BR-05, BR-06, NFR-03
- files: src/components/TaskForm/TaskForm.tsx, src/components/TaskForm/TaskForm.test.tsx, src/components/TaskForm/TaskForm.css
- branch: feature/task-interactions
- done when: A user can create a task with a title and tags via the form; drag a card to another column; click a move button to change columns; edit title and tags; delete a task; all unit tests in TaskForm.test.tsx pass.

  **Context for Devin:**
  - Stack: React 18.3.1, TypeScript 5.4.5, Vite 5.2.11, Vitest 1.6.0
  - Types are in `src/types.ts`. Import `Task` and `ColumnId` from there.
  - Storage helpers are in `src/lib/storage.ts` (`loadBoard`, `saveBoard`).
  - Task helpers are in `src/lib/taskUtils.ts` (`createTask`, `reorderTasks`).
  - Board state is owned by `<Board />`. `<TaskForm />` receives `onSave(task)` and `onCancel()` props.
  - Drag-and-drop: use the HTML5 Drag-and-Drop API (`draggable`, `onDragStart`, `onDrop`, `onDragOver`). Add `touch-action: none` CSS and a `touchstart`/`touchend` handler that maps to the drag events for mobile (NFR-03).
  - Move button: each card has a "→" button that cycles the task to the next column (TODO → IN_PROGRESS → READY → TODO).
  - Design tokens are in `src/tokens.css` (already imported globally). Use the CSS variables — do not hardcode colours.
  - Write tests in `src/components/TaskForm/TaskForm.test.tsx` using Vitest + @testing-library/react.

## Task 4: End-to-end tests and CI workflow

- assignee: claude
- requirements: NFR-01, BR-01, BR-02, BR-03, BR-06, BR-08
- files: e2e/kanban.spec.ts, .github/workflows/ci.yml
- branch: feature/e2e-and-ci
- done when: Playwright e2e tests cover: page load shows three columns; create a task; move a task via button; delete a task; reload shows persisted task. CI workflow runs `npm test` and `npx playwright test` and all checks pass.
