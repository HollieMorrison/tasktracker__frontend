# Task Tracker Frontend

**Task Tracker Frontend** is a responsive web application built with React.  
It connects to the Task Tracker API to allow users to register, log in, and manage their daily tasks through an intuitive and visually clear interface.  

The interface provides real-time interaction, state management with Zustand, and a clean Bootstrap layout to keep the user experience simple and accessible on all devices.

![Task Tracker Screenshot](./assets/readme/frontend-preview.png)  
[View Task Tracker Frontend Repository on GitHub](https://github.com/HollieMorrison/tasktracker__frontend)

---




## Table of Contents

### [User Experience (UX)](#user-experience-ux-1)
* [User Goals](#user-goals)
### [Features](#features)
* [Implemented Features](#implemented-features)
### [Future Enhancements](#future-enhancements)
### [Design](#design-1)
### [Technologies Used](#technologies-used-1)
### [Frameworks, Libraries & Tools](#frameworks-libraries--tools-1)
### [Testing](#testing-1)
* [Manual Testing](#manual-testing)
### [Deployment and Local Setup](#deployment-and-local-setup-1)
* [Running Locally](#running-locally)
* [Connecting to Backend](#connecting-to-backend)
* [Deployment Steps](#deployment-steps)
### [Credits](#credits-1)
### [Acknowledgements](#acknowledgements-1)

---

## User Experience (UX)

The Task Tracker frontend was built with the goal of keeping users productive without overwhelming them.  
It provides a minimal and clean interface to manage tasks, paired with a responsive layout for both desktop and mobile screens.

Users can:
- Register and log in securely.  
- Create, update, and delete their tasks.  
- View all their active tasks in an organised dashboard.  
- Log out safely when finished.  

### User Goals

*As a user of Task Tracker, I want to:*
- Easily sign up and manage my account.  
- Add new tasks quickly with minimal clicks.  
- Mark tasks as complete or update them when needed.  
- Navigate the app smoothly across all devices.  

---

## Features

### Implemented Features

- **User Authentication:**  
  Frontend integrates with the backend API for registration, login, logout, and token refresh.

- **Task Management Dashboard:**  
  View, create, edit, and delete tasks dynamically without page reloads.

- **State Management with Zustand:**  
  Lightweight state control for global data such as authentication and task lists.

- **Responsive Design:**  
  Built with Bootstrap 5 to ensure mobile, tablet, and desktop usability.

- **Error Handling:**  
  Displays clear messages for failed logins, network issues, or invalid input.

- **API Integration with Axios:**  
  Uses Axios for clean and consistent HTTP requests.

Example flow:
1. User logs in → receives JWT tokens from backend.  
2. Tokens are stored in local state.  
3. User can then create or edit tasks through the dashboard UI.  

---

### Future Enhancements

- Add task filters or search functionality.  
- Implement task sorting (by date, status, or priority).  
- Add user profile editing page.  
- Include dark/light mode themes.  

---

## Design

- Clean, minimal layout using Bootstrap’s grid system.  
- Card-based task display for easy readability.  
- Consistent color scheme and large buttons for accessibility.  
- Uses React Router for smooth page navigation (login, register, dashboard).  

---

## Technologies Used

- [React 19](https://react.dev/)  
- [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  
- [Bootstrap 5](https://getbootstrap.com/)  
- [Axios](https://axios-http.com/)  
- [Zustand](https://github.com/pmndrs/zustand)  
- [React Router DOM](https://reactrouter.com/)  

---

## Frameworks, Libraries & Tools

- [GitHub](https://github.com/) — version control and hosting.  
- [Visual Studio Code](https://code.visualstudio.com/) — development environment.  
- [Heroku] — for deployment.  
- [ESLint](https://eslint.org/) — for code quality checks.   

---

## Testing

### Manual Testing

The frontend was manually tested to confirm:
- Smooth navigation between pages.  
- Correct form validation on register/login.  
- Accurate API communication for CRUD operations.  
- Proper handling of invalid or expired tokens.  
- Responsiveness across devices (tested on desktop and mobile).  

Browsers tested:
- Google Chrome  
- Microsoft Edge  
- Mozilla Firefox  
- Samsung Internet (mobile)  

Example manual test:
1. Register a new user — confirm redirect to login page.  
2. Login and confirm access to dashboard.  
3. Create a new task and verify it appears instantly.  
4. Edit and delete tasks — confirm changes reflected in the UI.  
5. Logout — ensure tokens are cleared and redirected to login page.  

---

### Lighthouse Report

The Lighthouse tool built into Google Chrome was used to test the site’s overall performance, accessibility, and SEO on both mobile and desktop devices.

#### Mobile Analysis
<details>
<summary>Dashboard Page</summary>

![Dashboard Lighthouse Mobile](./assets/readme/lighthouse-dashboard-mobile.png)
</details>
<details>
<summary>Login Page</summary>

![Login Lighthouse Mobile](./assets/readme/lighthouse-login-mobile.png)
</details>
<details>
<summary>Register Page</summary>

![Register Lighthouse Mobile](./assets/readme/lighthouse-register-mobile.png)
</details>

#### Desktop Analysis
<details>
<summary>Dashboard Page</summary>

![Dashboard Lighthouse Desktop](./assets/readme/lighthouse-dashboard-desktop.png)
</details>
<details>
<summary>Login Page</summary>

![Login Lighthouse Desktop](./assets/readme/lighthouse-login-desktop.png)
</details>
<details>
<summary>Register Page</summary>

![Register Lighthouse Desktop](./assets/readme/lighthouse-register-desktop.png)
</details>

Each report confirmed:
- Consistent performance across devices.  
- Strong accessibility standards (color contrast and ARIA usage).  
- High best practice and SEO scores.  
- Fast page load and responsive layout.


## Deployment and Local Setup

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/HollieMorrison/tasktracker__frontend.git

Move into the project folder:

cd tasktracker__frontend


Install dependencies:

npm install

VITE_API_BASE_URL= 

Connecting to Backend

The frontend communicates with the backend API located at:

http://127.0.0.1:8000/api


Ensure the Task Tracker Backend is running before launching the frontend.
You can adjust the API base URL in the .env file if deployed to another domain.


Credits
Code References

React documentation for hooks and routing concepts.

Axios and Zustand docs for request and state management patterns.

Bootstrap for layout and responsive design utilities.

Content

Interface text and design decisions created by the project developer, Hollie Morrison.

Acknowledgements

Mentors and peers who provided design and usability feedback.

Online React and Django communities for open-source learning resources.

Friends and testers who helped identify UI improvements.
