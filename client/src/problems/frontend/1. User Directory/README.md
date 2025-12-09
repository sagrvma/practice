# User Directory with Search and Async Fetch

Build a User Directory component in React that fetches user data from an API, implements real-time search filtering, and handles loading/error states.

## 📋 Requirements

### 1. Fetch Users from API

- **Endpoint:** `https://jsonplaceholder.typicode.com/users`
- Fetch the data when the component mounts using `useEffect` and `fetch()` (or `axios`).
- Store the result in state.

### 2. Manage Three UI States

- **Loading:** Display "Loading..." while the request is in progress.
- **Success:** Show a list of users (each item displays name and email).
- **Error:** If the fetch fails, show a red error message: "Error fetching the users list!".

### 3. Implement a Search Filter

- Add a text input above the list.
- The input is a **controlled component** using React state.
- Filter users by name, **case-insensitively**, as the user types.
- If no users match the search, display "No users found".

### 4. Unmount Safety (Bonus)

- Ensure you do **not** call `setState` if the component unmounts before the fetch completes.
- Use an `isMounted` flag or `AbortController` in the effect cleanup.

---

# 💡 Deep Dive: Component Design & Implementation

## State Management

### What state does this component manage and why?

- **`users`**: The fetched data from the API.
- **`searchText`**: The current value of the search input.
- **`loading`**: Whether a fetch request is in progress.
- **`error`**: Error message if the fetch fails.

Each is minimal state the UI needs to render correctly; everything else is derived.

### Why is users initialized to an empty array instead of null?

```typescript
const [users, setUsers] = useState<Array<user>>([]);
```

With `[]`, you can safely call `users.filter(...)` on the first render without null checks. It also matches the expected type `Array<user>`.

## Derived State

### What is derived state in this component?

```typescript
const filteredList = users.filter((user) =>
  user.name.toLowerCase().includes(searchText.toLowerCase())
);
```

`filteredList` is derived state: it's computed from `users` and `searchText` every render, so it doesn't need its own `useState`.

### Why don't you store filteredList in state?

Because it can always be calculated from `users + searchText`. Storing it in state would duplicate data and potentially become inconsistent if you forget to update it whenever `users` or `searchText` change.

## Input & Filtering

### How is the search input implemented? What pattern is this?

```typescript
const [searchText, setSearchText] = useState("");

<input
  type="text"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
/>;
```

This is a **controlled component**: the input's value is fully controlled by React state (`searchText`).

### How is case-insensitive search handled?

```typescript
user.name.toLowerCase().includes(searchText.toLowerCase());
```

By lowercasing both the user name and the search text, matches work regardless of casing.

### How would you extend search to also match email?

```typescript
const filteredList = users.filter((user) => {
  const term = searchText.toLowerCase();
  return (
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term)
  );
});
```

## Loading, Success & Error States

### How do you handle loading, success, and error states?

**Fetch sequence:**

- Before fetch: `setLoading(true)`, `setError("")`.
- On success: `setUsers(data)`.
- On error: `setError("Error fetching the users list!")`.
- Finally: `setLoading(false)`.

**UI rendering:**

```typescript
if (loading) return <p>Loading...</p>;
if (error) return <p style={{ color: "red" }}>{error}</p>;
// Otherwise, render the list
```

### What happens if the API returns an empty user list?

`users` becomes `[]`, so:

```typescript
const filteredList = users.filter(...); // []
```

Then render:

```typescript
{
  filteredList.length === 0 ? <p>No users found.</p> : <ul>...</ul>;
}
```

The component displays "No users found."

## useEffect & Side Effects

### What does the useEffect in this component do?

```typescript
useEffect(() => {
  let isMounted = true;
  const load = async () => {
    /* fetch logic */
  };
  load();
  return () => {
    isMounted = false;
  };
}, []);
```

It runs once when the component mounts, triggers the async fetch, and sets up cleanup to mark the component as unmounted.

### Why does useEffect have an empty dependency array []?

`[]` means "run this effect only once on mount." You want to fetch the users only when the component loads, not on every render.

### Why define load inside useEffect?

- Keeps all side-effect logic scoped to that effect.
- Avoids having to add `load` to the dependency array or wrap it in `useCallback`.
- Ensures it closes over the correct variables for that specific effect execution.
- Prevents dependency bugs and unnecessary reruns.

### Why are loading and error not part of the dependency array?

The effect doesn't depend on changing `loading` or `error` to decide when to re-run; it just sets them. You want the fetch to happen only once on mount, so they are intentionally not dependencies.

### What problem does the isMounted flag solve?

```typescript
let isMounted = true;
// ...
if (!isMounted) return;
// ...
return () => {
  isMounted = false;
};
```

It prevents calling `setState` (`setUsers`, `setLoading`, `setError`) after the component unmounts, which would otherwise cause React warnings and possible memory issues if the fetch resolves late.

## TypeScript & Types

### What's the type of user, and why define it?

```typescript
type user = {
  id: number;
  name: string;
  username: string;
  email: string;
};
```

This TypeScript type ensures compile-time checks: you can't accidentally access a missing property, and the users array has a consistent structure.

## Render Flow

### What's the render flow for a successful fetch?

1. **First render:**

   - `users = []`, `loading = false`, `error = ""`.
   - `useEffect` schedules `load()`.

2. **`load()` runs:**

   - `setError("")`, `setLoading(true)` → re-render.

3. **Second render:**

   - `loading = true` → UI shows "Loading...".

4. **Fetch resolves:**

   - `setUsers(data)`, `setLoading(false)` → re-render.

5. **Third render:**
   - `loading = false`, `error = ""`, `users = data`.
   - Filter and render the user list.

## Advanced Topics

### What is a controlled vs uncontrolled input, and which one is used?

- **Controlled**: Value is driven by React state (`value={searchText}` + `onChange`).
- **Uncontrolled**: Value is stored by the DOM (e.g., `defaultValue`, no state).

This code uses a **controlled input** via `searchText`.

### How would you handle a network timeout or abort?

Use `AbortController` and pass its signal to fetch, then abort in cleanup:

```typescript
useEffect(() => {
  const controller = new AbortController();
  const load = async () => {
    try {
      const res = await fetch(users_API, { signal: controller.signal });
      // ...
    } catch (e) {
      if (e.name === "AbortError") return;
      setError("Error fetching...");
    }
  };
  load();
  return () => controller.abort();
}, []);
```
