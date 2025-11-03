
# AgileBridge Project File Structure

This document outlines the file and directory structure of the AgileBridge application.

```
.
├── .env
├── README.md
├── apphosting.yaml
├── components.json
├── files.md
├── next.config.ts
├── package.json
├── src
│   ├── ai
│   │   ├── dev.ts
│   │   ├── flows
│   │   │   └── suggest-user-stories.ts
│   │   └── genkit.ts
│   ├── app
│   │   ├── (app)
│   │   │   ├── board
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── projects
│   │   │       ├── [id]
│   │   │       │   ├── backlog
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── board
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── sprints
│   │   │       │   │   └── page.tsx
│   │   │       │   └── team
│   │   │       │       └── page.tsx
│   │   │       └── page.tsx
│   │   ├── (info)
│   │   │   └── layout.tsx
│   │   ├── admin
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── forgot-password
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── new-task-dialog.tsx
│   │   ├── page.tsx
│   │   ├── providers.tsx
│   │   ├── reset-password
│   │   │   └── page.tsx
│   │   ├── settings
│   │   │   └── page.tsx
│   │   ├── signup
│   │   │   └── page.tsx
│   │   └── tasks
│   │       └── [id]
│   │           ├── loading.tsx
│   │           └── page.tsx
│   ├── components
│   │   ├── admin
│   │   │   ├── admin-panel.tsx
│   │   │   └── suggest-stories-dialog.tsx
│   │   ├── dashboard
│   │   │   ├── dashboard-analytics.tsx
│   │   │   └── recent-activity.tsx
│   │   ├── kanban
│   │   │   ├── kanban-board.tsx
│   │   │   ├── kanban-card.tsx
│   │   │   ├── kanban-column.tsx
│   │   │   ├── task-detail-dialog.tsx
│   │   │   └── time-log-dialog.tsx
│   │   ├── layout
│   │   │   ├── header.tsx
│   │   │   ├── notifications.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── new-project-dialog.tsx
│   │   ├── password-strength.tsx
│   │   ├── projects
│   │   │   ├── edit-project-dialog.tsx
│   │   │   ├── new-project-dialog.tsx
│   │   │   ├── project-board.tsx
│   │   │   ├── project-card.tsx
│   │   │   └── project-list.tsx
│   │   ├── settings
│   │   │   ├── edit-profile-form.tsx
│   │   │   └── profile-card.tsx
│   │   ├── sprints
│   │   │   ├── backlog.tsx
│   │   │   ├── new-sprint-dialog.tsx
│   │   │   └── sprint-list.tsx
│   │   ├── submit-button.tsx
│   │   ├── tasks
│   │   │   └── new-task-dialog.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── date-picker.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── tooltip.tsx
│   ├── hooks
│   │   ├── use-auth.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── lib
│       ├── data.ts
│       ├── placeholder-images.json
│       ├── placeholder-images.ts
│       ├── project-store.ts
│       ├── sprint-store.ts
│       ├── store.ts
│       ├── types.ts
│       └── utils.ts
├── tailwind.config.ts
└── tsconfig.json
```

Additionally, you'll need a `firestore.rules` file and a `docs/backend.json` if you plan on using the Firebase features, but for running the app locally with its current client-side data, the list above is what you need. After creating these files and installing the dependencies with `npm install`, you'll be able to run it.
