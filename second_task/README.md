# To-Do List Web Application

A simple **To-Do List** web application that allows users to manage their daily tasks effectively. This application uses **HTML**, **CSS**, and **JavaScript** for the frontend, while **Node.js** and **SQLite** handle the backend and database.

## Features

1. **Add Tasks**: Users can add new tasks.
2. **Mark Complete**: Toggle tasks as completed or incomplete.
3. **Delete Tasks**: Remove tasks from the list.
4. **Persistent Storage**: Tasks are saved in an SQLite database.
5. **Responsive Design**: Uses Tailwind CSS for a clean and mobile-friendly UI.

---

## File Structure

```sh
/second_task
  - README.md       # Project documentation
  - server.js       # Backend server
  - database.db     # SQLite database file
  - package.json    # Node.js dependencies
  - public/         # Frontend files
    - index.html    # HTML for the UI
    - styles.css    # Custom CSS for additional styling
    - script.js     # Frontend logic with JavaScript
```

## Prerequisites

Ensure the following software is installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd second_task
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   node server.js
   ```

4. Open your browser and navigate to:

   ```plaintext
   http://localhost:3000
   ```

---

## API Endpoints

### GET `/api/tasks`

- **Description**: Fetches all tasks from the database.

- **Response**:

  ```json
  [
    { "id": 1, "task": "Buy groceries", "completed": 0 },
    { "id": 2, "task": "Study JavaScript", "completed": 1 }
  ]
  ```

### POST `/api/tasks`

- **Description**: Adds a new task.
- **Request Body**:

  ```json
  { "task": "Task description" }
  ```

- **Response**:

  ```json
  { "id": 3, "task": "Task description", "completed": 0 }
  ```

### DELETE `/api/tasks/:id`

- **Description**: Deletes a task by its ID.

### PUT `/api/tasks/:id`

- **Description**: Toggles the task's completion status.
- **Request Body**:

- **Response**:

  ```json
  { "completed": 1 }
  ```

---

## How It Works

1. **Frontend**: The user interacts with the web app through the `index.html` file. Tasks are displayed and updated dynamically using `script.js`.
2. **Backend**: The server (`server.js`) processes API requests and interacts with the SQLite database (`database.db`).
3. **Database**: Stores tasks with their ID, description, and completion status.

---

## Technologies Used

### Frontend

- HTML
- CSS (with Tailwind CSS)
- JavaScript

### Backend:

- Node.js (with Express.js)
- SQLite (for persistent storage)
