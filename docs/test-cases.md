# AgileBridge - Test Cases

This document contains a comprehensive list of test cases for the AgileBridge application, covering all major features and functionalities.

## 1. User Authentication (25 cases)

### 1.1. Signup (10 cases)
- [ ] **TC-AUTH-001**: A new user can successfully sign up with a unique username, valid email, and a strong password.
- [ ] **TC-AUTH-002**: The system prevents signup if the username is already taken.
- [ ] **TC-AUTH-003**: The system prevents signup if the email is already in use.
- [ ] **TC-AUTH-004**: The system prevents signup if the password and confirm password fields do not match.
- [ ] **TC-AUTH-005**: The system prevents signup with a weak password (e.g., less than 8 characters, no uppercase, no number, no special character).
- [ ] **TC-AUTH-006**: The system prevents signup using a forbidden username like "admin" or "manager".
- [ ] **TC-AUTH-007**: A user must select a role to sign up.
- [ ] **TC-AUTH-008**: After successful signup, the user sees a confirmation message that their account is pending approval.
- [ ] **TC-AUTH-009**: A user cannot log in immediately after signing up; their status must be 'active'.
- [ ] **TC-AUTH-010**: All input fields in the signup form are required and show validation errors if left empty.

### 1.2. Login (10 cases)
- [ ] **TC-AUTH-011**: A registered and approved user can log in with their correct username and password.
- [ ] **TC-AUTH-012**: A registered and approved user can log in with their correct email and password.
- [ ] **TC-AUTH-013**: The system prevents login with an incorrect password.
- [ ] **TC-AUTH-014**: The system prevents login with an incorrect username or email.
- [ ] **TC-AUTH-015**: A user with 'pending' status cannot log in and sees an appropriate error message.
- [ ] **TC-AUTH-016**: The "Forgot Password" link navigates to the forgot password page.
- [ ] **TC-AUTH-017**: After successful login, the user is redirected to the `/dashboard`.
- [ ] **TC-AUTH-018**: The password field has a toggle to show/hide the password.
- [ ] **TC-AUTH-019**: Logged-in users are redirected away from the login page if they try to access it directly.
- [ ] **TC-AUTH-020**: User session is persisted on page refresh.

### 1.3. Logout & Password Reset (5 cases)
- [ ] **TC-AUTH-021**: A logged-in user can successfully log out.
- [ ] **TC-AUTH-022**: After logging out, the user is redirected to the login page.
- [ ] **TC-AUTH-023**: A user can request a password reset link from the "Forgot Password" page.
- [ ] **TC-AUTH-024**: Attempting to reset a password for a non-existent email shows a generic success message for security.
- [ ] **TC-AUTH-025**: The reset password page contains fields for a new password and confirmation.

## 2. Project Management (30 cases)

### 2.1. Project Creation (10 cases)
- [ ] **TC-PROJ-001**: A Manager or Admin can open the "New Project" dialog.
- [ ] **TC-PROJ-002**: A regular User cannot see the "New Project" button.
- [ ] **TC-PROJ-003**: A project can be created with a name, key, description, color, and at least one member.
- [ ] **TC-PROJ-004**: The project key is auto-suggested based on the project name.
- [ ] **TC-PROJ-005**: The project key must be 2-4 uppercase letters.
- [ ] **TC-PROJ-006**: Form validation prevents creating a project with an empty name.
- [ ] **TC-PROJ-007**: A newly created project appears on the projects list page.
- [ ] **TC-PROJ-008**: Manager can add multiple members during project creation.
- [ ] **TC-PROJ-009**: Manager can select a color theme for the new project.
- [ ] **TC-PROJ-010**: A user's role cannot be 'Admin' when being added to a project.

### 2.2. Project List & Viewing (10 cases)
- [ ] **TC-PROJ-011**: All users can view the list of projects they are members of.
- [ ] **TC-PROJ-012**: Projects page shows project name, key, description, completion percentage, and creation date.
- [ ] **TC-PROJ-013**: The search bar on the projects page filters projects by name or key.
- [ ] **TC-PROJ-014**: Clicking on a project card navigates to that project's board (`/projects/[id]/board`).
- [ ] **TC-PROJ-015**: The project list page displays correctly when there are no projects.
- [ ] **TC-PROJ-016**: The project card shows the number of open issues.
- [ ] **TC-PROJ-017**: The project card shows avatars or icons for team members.
- [ ] **TC-PROJ-018**: The UI handles long project names and descriptions gracefully.
- [ ] **TC-PROJ-019**: Users who are not members of any project see an empty state on the projects page.
- [ ] **TC-PROJ-020**: The `BoardRedirectPage` correctly redirects to the first project's board or `/projects`.

### 2.3. Project Editing & Team Management (10 cases)
- [ ] **TC-PROJ-021**: A Manager or Admin can open the "Edit Project" dialog.
- [ ] **TC-PROJ-022**: A Manager or Admin can update a project's name, key, color, and description.
- [ ] **TC-PROJ-023**: On the team page, a Manager can add a new member to the project.
- [ ] **TC-PROJ-024**: On the team page, a Manager can remove a member from the project.
- [ ] **TC-PROJ-025**: A Manager cannot remove the last manager from a project team.
- [ ] **TC-PROJ-026**: A regular User can view the project team but cannot add or remove members.
- [ ] **TC-PROJ-027**: The team page correctly lists all members and their roles.
- [ ] **TC-PROJ-028**: Adding a member who is already on the team is not possible.
- [ ] **TC-PROJ-029**: The list of available users to add to a project excludes existing members and Admins.
- [ ] **TC-PROJ-030**: Changes made in the "Edit Project" dialog are reflected on the project card and project pages.

## 3. Task & Kanban Board Management (50 cases)

### 3.1. Task Creation (15 cases)
- [ ] **TC-TASK-001**: A Manager can open the "Add Task" dialog from the header.
- [ ] **TC-TASK-002**: A User cannot see the "Add Task" button in the header.
- [ ] **TC-PROJ-003**: A task can be created with a title, description, project, assignee, type, priority, and status.
- [ ] **TC-TASK-004**: When creating a task, selecting a project filters the assignable users to that project's members.
- [ ] **TC-TASK-005**: When creating a task, selecting a project filters the available sprints.
- [ ] **TC-TASK-006**: When creating a task of type 'Task', it can be linked to a parent 'Story'.
- [ ] **TC-TASK-007**: A task of type 'Story' cannot be linked to another story.
- [ ] **TC-TASK-008**: A deadline can be set for a task using the date picker.
- [ ] **TC-TASK-009**: Effort estimate ('Low', 'Medium', 'High') is correctly translated into hours.
- [ ] **TC-TASK-010**: All required fields show validation errors if submitted empty.
- [ ] **TC-TASK-011**: A newly created task appears in the correct column on the project board.
- [ ] **TC-TASK-012**: A newly created task appears in the backlog if no sprint is assigned.
- [ ] **TC-TASK-013**: The "Add Task" dialog resets after successful submission.
- [ ] **TC-TASK-014**: The list of available parent stories is filtered by the selected project.
- [ ] **TC-TASK-015**: Selecting a sprint automatically populates the deadline to the sprint's end date.

### 3.2. Kanban Board (20 cases)
- [ ] **TC-BOARD-001**: Tasks are displayed in the correct columns based on their status.
- [ ] **TC-BOARD-002**: A Manager or the assigned User can drag and drop a task to a new column.
- [ ] **TC-BOARD-003**: A User who is not the assignee cannot drag and drop the task.
- [ ] **TC-BOARD-004**: Dragging a task to 'Done' updates its status directly.
- [ ] **TC-BOARD-005**: Dragging a task to any other column (e.g., 'In Progress') opens the "Reassign Task" dialog.
- [ ] **TC-BOARD-006**: In the "Reassign Task" dialog, a user can re-assign the task and log hours.
- [ ] **TC-BOARD-007**: Tasks that are blocked by a dependency are not draggable.
- [ ] **TC-BOARD-008**: Blocked tasks are visually indicated (e.g., opacity, lock icon).
- [ ] **TC-BOARD-009**: Hovering over a blocked task shows which tasks are blocking it.
- [ ] **TC-BOARD-010**: Story tasks correctly display their child tasks nested within the card.
- [ ] **TC-BOARD-011**: Clicking on a task card opens the Task Detail Dialog.
- [ ] **TC-BOARD-012**: Clicking on a child task within a story card opens the detail dialog for that child task.
- [ ] **TC-BOARD-013**: The board correctly filters tasks based on the selected sprint filter (active sprint vs. backlog).
- [ ] **TC-BOARD-014**: The search bar on the board filters tasks by title, ID, or assignee.
- [ ] **TC-BOARD-015**: The "Show Overdue" checkbox correctly filters tasks with past deadlines.
- [ ] **TC-BOARD-016**: The column headers correctly display the count of tasks within them.
- [ ] **TC-BOARD-017**: The board analytics cards are clickable and flash the corresponding column.
- [ ] **TC-BOARD-018**: Active sprint info is correctly displayed above the board.
- [ ] **TC-BOARD-019**: If no sprint is active, an informational message is shown.
- [ ] **TC-BOARD-020**: The board displays correctly on mobile devices (columns stack vertically).

### 3.3. Task Details (15 cases)
- [ ] **TC-DETAIL-001**: The Task Detail Dialog displays all task information correctly (title, description, status, priority, etc.).
- [ ] **TC-DETAIL-002**: A Manager can edit all fields in the detail dialog.
- [ ] **TC-DETAIL-003**: A non-manager can only add comments and cannot edit task fields.
- [ ] **TC-DETAIL-004**: Any user on the project can add a comment to a task.
- [ ] **TC-DETAIL-005**: Comments can be sorted by newest or oldest.
- [ ] **TC-DETAIL-006**: A Manager can delete a task from the detail dialog.
- [ ] **TC-DETAIL-007**: Saving changes in the detail dialog updates the task in the store and on the board.
- [ ] **TC-DETAIL-008**: The time tracking progress bar updates correctly based on `timeSpent` and `estimatedHours`.
- [ ] **TC-DETAIL-009**: The "Assigned To" dropdown only shows members of the task's project.
- [ ] **TC-DETAIL-010**: The "Parent Story" dropdown only shows stories from the task's project.
- [ ] **TC-DETAIL-011**: The "Dependencies" dropdown only shows other tasks from the project.
- [ ] **TC-DETAIL-012**: The created date and updated date are displayed correctly.
- [ ] **TC-DETAIL-013**: The dialog can be closed without saving changes.
- [ ] **TC-DETAIL-014**: The task ID and current status are displayed as badges.
- [ ] **TC-DETAIL-015**: A user can be un-assigned from a task.

## 4. Sprints & Backlog (30 cases)

### 4.1. Sprint Creation (10 cases)
- [ ] **TC-SPRINT-001**: A Manager can open the "New Sprint" dialog from the sprints page.
- [ ] **TC-SPRINT-002**: A User cannot see the "New Sprint" button.
- [ ] **TC-SPRINT-003**: A sprint can be created with a name, goal, and a date range.
- [ ] **TC-SPRINT-004**: Selecting a start date in the calendar auto-populates the end date two weeks later.
- [ ] **TC-SPRINT-005**: The date range can be manually adjusted.
- [ ] **TC-SPRINT-006**: Form validation prevents creating a sprint with an empty name or dates.
- [ ] **TC-SPRINT-007**: A newly created sprint appears on the sprint list with 'upcoming' status.
- [ ] **TC-SPRINT-008**: The "Mark as Future Sprint" checkbox moves overdue tasks to the backlog upon creation.
- [ ] **TC-SPRINT-009**: The dialog closes and the form resets on successful creation.
- [ ] **TC-SPRINT-010**: The new sprint is correctly associated with the current project.

### 4.2. Sprint Management (10 cases)
- [ ] **TC-SPRINT-011**: A Manager can start an 'upcoming' sprint.
- [ ] **TC-SPRINT-012**: The "Start Sprint" button is disabled if another sprint is already active for the project.
- [ ] **TC-SPRINT-013**: Starting a sprint changes its status to 'active'.
- [ ] **TC-SPRINT-014**: A Manager can complete an 'active' sprint.
- [ ] **TC-SPRINT-015**: Completing a sprint shows a confirmation dialog listing any unfinished issues.
- [ ] **TC-SPRINT-016**: Unfinished issues from a completed sprint are moved to the backlog (sprintId is unset).
- [ ] **TC-SPRINT-017**: A completed sprint shows its completion statistics (issues completed vs. total).
- [ ] **TC-SPRINT-018**: The sprint list is sorted by status (active, upcoming, completed) and then by date.
- [ ] **TC-SPRINT-019**: Each sprint card in the list can be expanded to show the issues within it.
- [ ] **TC-SPRINT-020**: The progress bar on a sprint card updates in real-time as tasks are completed.

### 4.3. Backlog (10 cases)
- [ ] **TC-BACKLOG-001**: The backlog page is only accessible to Managers.
- [ ] **TC-BACKLOG-002**: The sprint filter dropdown contains "Backlog", the active sprint, and all upcoming sprints.
- [ ] **TC-BACKLOG-003**: Selecting "Backlog" in the filter shows all tasks in the project that have no `sprintId`.
- [ ] **TC-BACKLOG-004**: Selecting a sprint in the filter shows all tasks assigned to that sprint.
- [ ] **TC-BACKLOG-005**: The UI displays an empty state when the selected filter contains no issues.
- [ ] **TC-BACKLOG-006**: The page breadcrumb correctly shows the project name and "Backlog".
- [ ] **TC-BACKLOG-007**: Issues displayed in the backlog view are full Kanban cards.
- [ ] **TC-BACKLOG-008**: Clicking on a task in the backlog opens the Task Detail Dialog.
- [ ] **TC-BACKLOG-009**: The issue count updates correctly when the filter changes.
- [ ] **TC-BACKLOG-010**: The backlog page is responsive and usable on mobile devices.

## 5. Admin & Settings (20 cases)

### 5.1. Admin Panel - User Management (15 cases)
- [ ] **TC-ADMIN-001**: The Admin Panel is only accessible to users with the 'Admin' user type.
- [ ] **TC-ADMIN-002**: The "Admin Panel" button appears in the header for Admins.
- [ ] **TC-ADMIN-003**: The panel lists all users, including those with 'pending' status.
- [ ] **TC-ADMIN-004**: An Admin can approve a 'pending' user, changing their status to 'active'.
- [ ] **TC-ADMIN-005**: An Admin can reject a 'pending' user, removing them from the system.
- [ ] **TC-ADMIN-006**: An Admin can change a user's `userType` (e.g., from 'User' to 'Manager').
- [ ] **TC-ADMIN-007**: An Admin cannot change their own `userType`.
- [ ] **TC-ADMIN-008**: An Admin cannot change another user's `userType` to 'Admin'.
- [ ] **TC-ADMIN-009**: An Admin can change a user's `role` (e.g., 'Frontend', 'Backend').
- [ ] **TC-ADMIN-010**: An Admin can update a user's username and email.
- [ ] **TC-ADMIN-011**: An Admin can delete a user.
- [ ] **TC-ADMIN-012**: An Admin cannot delete another Admin user.
- [ ] **TC-ADMIN-013**: Clicking "Save All Changes" persists all modifications made to the user table.
- [ ] **TC-ADMIN-014**: The pending approvals section is hidden if there are no pending users.
- [ ] **TC-ADMIN-015**: A success toast is shown after saving user changes.

### 5.2. User Settings (5 cases)
- [ ] **TC-SETTINGS-001**: Any logged-in user can access the `/settings` page.
- [ ] **TC-SETTINGS-002**: The profile card displays the user's current username, email, and user type.
- [ ] **TC-SETTINGS-003**: A user can update their designation, phone number, bio and avatar URL.
- [ ] **TC-SETTINGS-004**: Saving changes on the settings page shows a success toast.
- [ ] **TC-SETTINGS-005**: Changes saved in the form are immediately reflected in the profile card.

    