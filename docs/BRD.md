# Business Requirements: Simple Kanban Board

## Goal

A simple, visual board that helps a team or individual track work through three stages: TODO, IN PROGRESS, and READY. Users can create tasks, move them between columns, and tag each task with a custom label to help organise and filter work.

## Users

Anyone who needs to track personal or team tasks — on a desktop or mobile browser. No login required.

## Business requirements

| ID    | Requirement |
|-------|-------------|
| BR-01 | The board displays three columns: TODO, IN PROGRESS, and READY. |
| BR-02 | A user can create a new task by entering a title and placing it in a chosen column. |
| BR-03 | A user can move a task from one column to another by dragging it or using a move button. |
| BR-04 | A user can add one or more custom tags to each task (for example: "urgent", "bug", "feature"). |
| BR-05 | A user can edit the title and tags of an existing task. |
| BR-06 | A user can delete a task. |
| BR-07 | Each task card displays its title and all its tags clearly. |
| BR-08 | The board saves its state so that tasks and tags are still visible after the user refreshes the page. |

## Quality requirements

- NFR-01: The board loads in under 2 seconds on a standard mobile connection.
- NFR-02: The board is usable on both desktop and mobile screens (responsive layout).
- NFR-03: Drag-and-drop works on both mouse and touch devices.
- NFR-04: All interactive elements (buttons, inputs) are reachable by keyboard.
- NFR-05: Text contrast meets basic readability standards (WCAG AA).

## Not included

- User accounts, login, or authentication.
- Sharing a board with other people over the internet.
- Due dates, priorities, or comments on tasks.
- Notifications or reminders.
- Exporting or printing the board.

## Decisions

- No login: keeping the board local and private removes all sign-up friction and is the simplest useful form.
- Data saved in the browser (local storage): no server is needed, data stays private, and the board works offline.
- Tags are free-form text entered by the user, not a fixed list, so each person can use whatever labels fit their work.
