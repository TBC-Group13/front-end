# Front-End

This is a front-end project built with React and TypeScript. The project uses various libraries and tools to provide a robust and scalable application. The application is styled using Tailwind CSS and includes several features such as authentication, protected routes, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/TBC-Group13/front-end.git
cd front-end
npm install
```

Project Structure
src/
├── api/
│ ├── hooks/
│ └── requests/
├── components/
│ ├── form-components/
│ ├── home-components/
│ └── ui/
├── guard/
├── layout/
├── pages/
├── store/
├── [App.tsx](http://_vscodecontentref_/1)
├── index.tsx
└── ...

Folders
api: Contains API-related code, including hooks and request functions.
components: Contains reusable UI components, including form components, home components, and UI components for ShadCN.
guard: Contains components for securing pages, such as protected routes.
layout: Contains layout components, such as the header and bottom bar.
pages: Contains page components for different routes in the application.
store: Contains state management code.

Features
Authentication: Secure authentication using protected routes.
Responsive Design: The application is fully responsive and works on all devices.
State Management: Uses Jotai for state management.
API Integration: Integrates with a backend API for data fetching and manipulation.
Notifications: Uses react-toastify for notifications.
Routing: Uses react-router-dom for client-side routing.

Technologies Used
React: A JavaScript library for building user interfaces.
TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
Tailwind CSS: A utility-first CSS framework for rapid UI development.
React Query: A library for fetching, caching, and updating data in React applications.
Jotai: A primitive and flexible state management library for React.
React Router: A library for routing in React applications.
React Toastify: A library for notifications in React applications.
Axios: A promise-based HTTP client for making API requests.
