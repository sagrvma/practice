# Problem #1: The "User Directory" Filter

## 📝 Problem Statement

This is a classic screen task often used to test fundamental React skills. The goal is to build a component that displays a list of users and allows the user to filter them by name in real-time.

This challenge tests:

- `useState` management
- Controlled inputs
- Array manipulation (filtering)

## ✅ Requirements

### 1. Data Source

Use the hardcoded `users` array provided below as your source of truth.

### 2. Display

Render a clean list where each item displays the user's:

- **Name**
- **Job Title** (Role)

### 3. Functionality

- **Search Input:** Add a text input at the top of the component.
- **Real-time Filtering:** As the user types, the list should update immediately to show only matching users.
- **Case-Insensitive:** The search should not care about capitalization (e.g., "ali" should match "Alice").

### 4. Edge Cases

- **Empty State:** If the search term matches no users, display a friendly message like "No users found".

## 💻 Starter Data

Copy this array into your component file to get started:

```javascript
const users = [
  { id: 1, name: "Alice Johnson", role: "Frontend Dev" },
  { id: 2, name: "Bob Smith", role: "Backend Dev" },
  { id: 3, name: "Charlie Brown", role: "Designer" },
  { id: 4, name: "Diana Prince", role: "Product Manager" },
  { id: 5, name: "Ethan Hunt", role: "DevOps Engineer" },
];
```
