# Task Tracker

**Task Tracker** is a responsive React application that connects to the Task Tracker Django REST API. It allows users to register, log in, and manage their personal tasks through a clean, accessible dashboard.

Users can create, view, edit, complete, search, and delete tasks. The interface uses React, Bootstrap, Zustand, Axios, React Router, and toast notifications to provide a smooth user experience across desktop, tablet, and mobile devices.

![Task Tracker Screenshot](./media/am-i-responsive.png)

[View Frontend Repository](https://github.com/HollieMorrison/tasktracker__frontend)
[View Backend Repository](https://github.com/HollieMorrison/tasktracker__backend)

---

## Table of Contents

- [User Experience UX](#user-experience-ux)
- [Project Goals](#project-goals)
- [Features](#features)
- [Design](#design)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Deployment and Local Setup](#deployment-and-local-setup)
- [Credits](#credits)
- [Acknowledgements](#acknowledgements)

---

## User Experience UX

Task Tracker was created to help users organise daily tasks in a simple and focused way. The application avoids unnecessary complexity and gives users clear controls for managing their workload.

### User Goals

As a user, I want to:

- Register for an account.
- Log in securely.
- See when I am logged in.
- Create tasks with a title, description, priority, status, and due date.
- View all my tasks in one dashboard.
- Search for specific tasks.
- Edit task details when plans change.
- Mark tasks as complete.
- Delete tasks only after confirmation.
- Use the application on desktop and mobile devices.

---

## Project Goals

The aim of this project was to build a full-stack productivity application with a React frontend and a Django REST Framework backend.

The frontend was designed to:

- Consume API data from the backend.
- Provide full CRUD functionality for tasks.
- Give clear feedback to users after actions.
- Protect task routes so only logged-in users can access them.
- Use responsive, accessible design principles.
- Demonstrate component-based React development.

---

## Features

### Implemented Features

- **User Registration**
  - Users can create a new account through the register form.

- **User Login and Logout**
  - Users can log in and log out securely.
  - The navbar updates to show the current logged-in user.

- **Protected Dashboard**
  - The task dashboard is only available to authenticated users.

- **Task Dashboard**
  - Displays the user’s tasks in a clean card layout.
  - Shows summary cards for total tasks, completed tasks, and in-progress tasks.

- **Create Task**
  - Users can create a task with title, description, priority, status, and due date.

- **Read Tasks**
  - Tasks are fetched from the backend API and displayed on the frontend.

- **Edit Task**
  - Users can update existing task details.

- **Complete Task**
  - Users can mark a task as complete directly from the dashboard.

- **Delete Task**
  - Users are shown a custom confirmation modal before a task is deleted.

- **Search Tasks**
  - Users can search tasks by title or description.

- **User Feedback**
  - Toast notifications confirm successful actions such as create, update, complete, and delete.

- **Error Handling**
  - Error messages are shown for failed login, failed task actions, or invalid data.

- **Responsive Design**
  - The app uses Bootstrap and custom CSS to work across desktop, tablet, and mobile screens.

---

## Future Enhancements

- Add task categories.
- Add file attachments to tasks.
- Add task assignment to multiple users.
- Add drag-and-drop task status columns.
- Add dark and light mode.
- Add a user profile page.

---

## Design

The design uses a simple productivity-focused layout.

### Colour Scheme

- Blue is used for primary actions and navigation.
- White cards are used for task content.
- Dark footer provides visual contrast.
- Status and priority badges help users quickly understand task importance.

### Typography and Layout

- Large headings make pages easy to scan.
- Card spacing improves readability.
- Buttons are placed near relevant actions.
- Bootstrap grid classes support responsiveness.

### Navigation

React Router is used for frontend routing:

- `/login`
- `/register`
- `/tasks`
- `/tasks/create`
- `/tasks/:id/edit`

---

## Technologies Used

- [React](https://react.dev/)
- JavaScript
- HTML
- CSS
- Bootstrap
- React Bootstrap
- Axios
- Zustand
- React Router DOM
- React Hot Toast
- React Icons
- Vite

---

## Frameworks, Libraries & Tools

- Git and GitHub for version control.
- Visual Studio Code for development.
- Heroku for deployment.
- ESLint for code quality.
- Chrome DevTools for debugging and Lighthouse testing.

---

## Testing

### Manual Testing

| Feature | Action | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|
| Register | Create a new account | User account is created | User can register successfully | Pass |
| Login | Enter valid credentials | User is logged in | Navbar shows logged-in username | Pass |
| Invalid Login | Enter incorrect credentials | Error message appears | Invalid credentials message is shown | Pass |
| Protected Route | Visit dashboard while logged out | User is redirected to login | User cannot access dashboard | Pass |
| Create Task | Submit create task form | Task appears on dashboard | Task is created and displayed | Pass |
| Edit Task | Update an existing task | Task details update | Edited task is saved | Pass |
| Complete Task | Click complete | Task status changes to done | Task is marked complete | Pass |
| Delete Task | Click delete and confirm | Task is removed | Task is deleted after confirmation | Pass |
| Cancel Delete | Click delete then cancel | Task remains visible | Task is not deleted | Pass |
| Search Tasks | Type into search box | Matching tasks are shown | Search filters the task list | Pass |
| Logout | Click logout | User is logged out | Login/Register buttons show again | Pass |
| Responsive Layout | Resize screen | Layout adapts correctly | Site works on mobile and desktop | Pass |

### Testing Evidence

![Home page](./media/home.png)
![Register](./media/Register-page.png)
![Login](./media/Login.png)
![Task Dashboard](./media/Task-dashboard.png)
![Create task](./media/Create-task.png)
![Edit task](./media/Edit-tasks.png)
![Task list status](./media/Task-list-status.png)
![Change Status](./media/Task-changed-to-complete.png)
![Delete task warning](./media/Delete-task-warning.png)
![Task deleted](./media/Task-deleted.png)

---

## Lighthouse Report

Google Chrome Lighthouse was used to test performance, accessibility, best practices, and SEO.

### Mobile Analysis

<details>
<summary>Dashboard Page</summary>

![Dashboard Mobile](./media/Mobile-view-of-dashboard.png)

![Dashboard Mobile Lighthouse Results](./media/Lighthouse-dashboard.png)

</details>

<details>
<summary>Login Page</summary>

![Login Mobile](./media/login-mobile.png)

![Login Mobile Lighthouse Results](./media/Lighthouse-login.png)

</details>

<details>
<summary>Register Page</summary>

![Register Mobile](./media/Register-mobile.png)

![Register Lighthouse Mobile](./media/Lighthouse-mobile-register.png)

</details>

### Desktop Analysis

<details>
<summary>Dashboard Page</summary>

![Dashboard Lighthouse Desktop](./media/Lighthouse-dashboard-desktop.png)

</details>

<details>
<summary>Login Page</summary>

![Login Lighthouse Desktop](./media/Lighthouse-login-desktop.png)

</details>

<details>
<summary>Register Page</summary>

![Register Lighthouse Desktop](./media/Lighthouse-register-desktop.png)

</details>

The Lighthouse reports confirmed strong accessibility, responsive layout, and good performance across tested pages.

---

## Deployment and Local Setup

### Running Locally

Clone the repository:

```bash
git clone https://github.com/HollieMorrison/tasktracker__frontend.git
cd tasktracker__frontend
```

---

### Install Dependencies

```bash
npm install
```

---

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://tasktrackerp5-932a5dcb7e37.herokuapp.com/api
```

---

### Start Development Server

```bash
npm run dev
```

The application will run locally on:

```text
http://localhost:5173
```

---

## Frontend Deployment

The frontend application is deployed using Heroku.

### Deployment Steps

1. Push the latest code to GitHub.
2. Create a Heroku application.
3. Connect the GitHub repository to Heroku.
4. Set the build command:

```bash
npm run build
```

5. Set the start command:

```bash
npm start
```

6. Add required environment variables in Heroku Config Vars.
7. Deploy the `main` branch.
8. Test the deployed application to ensure all frontend functionality works correctly.

### Live Deployment

- Frontend Live App: https://tasktrackerfrontend-b0125962c8ee.herokuapp.com
- Backend API: https://tasktrackerp5-932a5dcb7e37.herokuapp.com

---

## UX Design Process

Wireframes were created during the planning stage to organise layout structure, navigation flow, and user interaction patterns.

The final implementation closely follows the original wireframe designs while improving spacing, responsiveness, and accessibility throughout development.

### Wireframes

- Login Page Wireframe
- Register Page Wireframe
- Dashboard Page Wireframe

---

## Agile Development

GitHub Projects was used to manage development tasks using Agile methodology.

User stories were organised into development stages and implemented incrementally throughout the project lifecycle.

Example user stories included:

- User authentication
- Task CRUD functionality
- Search functionality
- Responsive dashboard design
- Delete confirmation modal
- Task completion functionality

---

## Credits

### Code References

- React documentation
- React Router documentation
- Axios documentation
- Zustand documentation
- Bootstrap documentation
- Django REST Framework documentation

### Media

- Wireframes and screenshots created by the project developer.

### Content

- All application content and design decisions were created by Hollie Morrison.

---

## Acknowledgements

- Code Institute mentors and support
- Open-source React and Django communities
- Friends and testers who provided usability feedback