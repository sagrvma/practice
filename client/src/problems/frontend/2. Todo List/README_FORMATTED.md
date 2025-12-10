# Todo List with Add and Delete

Build a TodoList component in React that manages, adds, and deletes todos with proper state management and immutability.

## 📋 Requirements

### 1. Manage Todos in State

- Each todo has: `id` and `text`.
- Initial state can be an empty array or a small default list.

### 2. Add New Todos

- Provide an input box + an "Add" button.
- The input is a **controlled component**.
- When "Add" is clicked:
  - If the input is non-empty, add a new todo to the list.
  - Then clear the input.
  - New todos should get a unique `id`.

### 3. Display Todos

- Render all todos in a list.
- Each item shows the todo text and a "Delete" button.

### 4. Delete Todos

- Clicking "Delete" removes that todo from the list.
- Use **immutable updates**, not `splice` on existing state.

### 5. Edge Cases

- If there are no todos, display: "No todos yet".

---

# 💡 Deep Dive: Component Design & Implementation

## State Management

### What state does this component manage and why?

- **`todoList`**: Array of todos (`{ id, text }`), the main data being rendered.
- **`inputText`**: Current value of the input field.

`todoList` holds the list itself; `inputText` makes the input a controlled component.

### Why is it a bad idea to mutate state directly?

In React, state must be treated as immutable:

- React decides whether to re-render by checking if the **reference** of the state value has changed.
- If you mutate the existing array/object (e.g., `todoList.push(...)`), the reference **stays the same**.
- React may not detect the change, leading to stale UI or subtle bugs.
- **Immutable updates** (like `[...prev, newTodo]` or `prev.filter(...)`) create a new array reference, so React knows something changed and re-renders correctly.

## Adding Todos

### How do you add a new todo, and how do you ensure immutability?

```typescript
const addTodo = (todoItem: string) => {
  if (todoItem) {
    const id = Math.floor(Math.random() * 100000);
    const todoObj = { id, text: todoItem };
    setTodoList((prev) => [...prev, todoObj]);
    setInputText("");
  }
};
```

The spread operator `[...prev, todoObj]` creates a **new array** instead of mutating the existing one.

### How would you prevent adding empty or whitespace-only todos?

```typescript
const addTodo = (todoItem: string) => {
  const trimmed = todoItem.trim();
  if (!trimmed) return;

  const id = Math.floor(Math.random() * 100000);
  setTodoList((prev) => [...prev, { id, text: trimmed }]);
  setInputText("");
};
```

Use `trim()` on the input and early-return if it's empty.

### How are IDs generated, and what's a potential issue?

```typescript
const id = Math.floor(Math.random() * 100000);
```

IDs are random numbers. It works for a small demo but can collide in theory. In production, prefer stable IDs from a backend or a library like **UUID**.

## Deleting Todos

### How do you delete a todo, and why is this approach correct?

```typescript
const removeTodo = (itemId: number) => {
  setTodoList((prev) => prev.filter((todoItem) => todoItem.id !== itemId));
};
```

`filter()` returns a **new array** without the removed item. This preserves immutability and leverages React's state change detection.

### What is the time complexity of deleting a todo?

`filter()` iterates the entire array, so deletion is **O(n)** where n is the number of todos.

## Input & UI

### What is a controlled component, and where is it used here?

```typescript
const [inputText, setInputText] = useState("");

<input
  type="text"
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
/>;
```

The input is a **controlled component** because its value is driven by React state (`inputText`) and updated via `onChange`.

### How do you handle the "empty list" state in the UI?

```typescript
{
  todoList.length === 0 ? <p>No todos yet.</p> : <ul>...</ul>;
}
```

If `todoList` is empty, show a friendly message instead of an empty `<ul>`.

### Why is using the todo's id as the React key correct?

```typescript
<li key={item.id}>
```

`id` is a **stable, unique identifier** per todo. Using it as a key helps React correctly track items when adding/removing, avoiding issues that come from using array indices as keys.

### What is the role of the checkbox in the current code?

```typescript
<input type="checkbox" />
```

Currently it's just a placeholder UI element and isn't wired to any state. It's a natural extension point to implement "completed" todos via a `completed` flag and a `toggleTodo` handler.

## Keyboard Events

### How would you reset the input when the user presses Enter?

```typescript
<input
  type="text"
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      addTodo(inputText);
    }
  }}
/>
```

Add an `onKeyDown` handler that calls `addTodo` when Enter is pressed.

## Advanced Topics

### How would you extend this to support "completed" todos?

1. Change the type:

```typescript
type todo = { id: number; text: string; completed: boolean };
```

2. Initialize with `completed: false`.

3. Add a toggle function:

```typescript
const toggleTodo = (id: number) => {
  setTodoList((prev) =>
    prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
  );
};
```

4. Hook it up to the checkbox's `onChange`.

### How would you implement "clear all todos"?

```typescript
const clearTodos = () => {
  setTodoList([]);
};
```

Then add a button:

```typescript
<button type="button" onClick={clearTodos}>
  Clear All
</button>
```

### How would you pre-populate multiple initial todos?

```typescript
const [todoList, setTodoList] = useState<Array<todo>>([
  { id: 1, text: "be god" },
  { id: 2, text: "learn React" },
  { id: 3, text: "practice interview problems" },
]);
```

The rest of the logic remains unchanged.

### Is it okay to define addTodo and removeTodo inside the component, and why?

Yes. They naturally depend on component state (`todoList`, `inputText`, setters). Defining them inside lets them close over the current state and is the common pattern. Optimization via `useCallback` is only needed if passing them deeply and seeing performance issues.
