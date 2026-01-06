Problem Statement (README)
Single-Open Accordion Component

Build an Accordion component with multiple items where only one item can be open at a time:

text
Requirements:

1. Data: Array of { id, title, content }
2. State: Single `openItemId: number | null`
3. Click title → toggle that item (open if closed, close if open)
4. UI: Always show titles, show content only for active item
5. Edge case: Start with first item open OR all collapsed
   Your Solution (Key Patterns):

tsx
const [openItemId, setOpenItemId] = useState(1); // Single state

const handleClick = (id) => openItemId === id ? setOpenItemId(null) : setOpenItemId(id);

{item.id === openItemId && <p>{item.content}</p>} // Derived rendering
📋 Complete Interview Q&A (15+ Questions)
Core Concepts (Must Know)

1. What single piece of state controls the entire accordion?

text
openItemId: number | null

- null = all collapsed
- any number = that item's ID is open
- Only ONE value needed (not booleans per item)

2. Walk through the click handler logic:

text
if (clickedId === openItemId) {
setOpenItemId(null); // Close current (toggle off)
} else {
setOpenItemId(clickedId); // Open new one (closes others implicitly)
}
Why it works: Single state means setting new ID automatically closes previous.

3. How is content conditionally rendered?

tsx
{item.id === openItemId && <p>{item.content}</p>}
Derived state: "Is item open?" computed from openItemId, never stored separately.

State & Architecture 4. Why number | null instead of just number?

text
null = "no item open" (all collapsed state)
If only numbers: how represent "all closed"? 5. Why define static data OUTSIDE component?

text
const accordionItems = [...]; // ✅ Outside (no re-creation)

vs
const accordionItems = [...]; // ❌ Inside (new array every render)
Performance: Static data shouldn't recreate on re-renders.

6. Initial state: 1 vs null?

text
useState(1) → First item open
useState(null) → All collapsed
Both valid; interviewer specifies or "all collapsed" is default
React Patterns 7. What React key is used and why?

tsx
{accordionItems.map(item => <li key={item.id}>...)}
Answer: item.id - stable, unique identifier. Never use index for lists that reorder/toggle.

8. Is there derived state here? Explain.

text
Yes: "isItemOpen" = item.id === openItemId
Computed every render from existing state, never stored in useState 9. Multiple open items - how change?

tsx
// Instead of single ID:
const [openIds, setOpenIds] = useState<number[]>([]);

// Toggle logic:
setOpenIds(prev =>
prev.includes(id)
? prev.filter(openId => openId !== id)
: [...prev, id]
);
Render: {openIds.includes(item.id) && <Content>}

Accessibility & UX 10. Why use <button> not <h2> for titles?

text
<button> → Semantic, focusable, keyboard accessible (Enter/Space)

<h2 onClick> → Requires extra ARIA + keyboard handlers
Production: <button aria-expanded={item.id === openItemId} aria-controls={contentId}>

11. Keyboard accessibility implementation?

tsx
<button
onClick={() => handleClick(id)}
onKeyDown={(e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
handleClick(id);
}
}}

> Performance & Edge Cases 12. What happens if new item added to accordionItems?

text
Automatically renders new <li> with unique key
Click works immediately (state logic doesn't change) 13. Race condition risk?

text
None - synchronous state updates, single source of truth
No async operations or competing state 14. 1000 items performance?

text
✅ Virtualize with react-window or dynamic height
✅ Memoize handleClick if passed as prop
Current: Fine for <50 items
Follow-up Questions (Interviewer Escalation) 15. Add smooth height animation:

css
.accordion-content {
max-height: 0;
overflow: hidden;
transition: max-height 0.3s ease;
}
.accordion-content.open {
max-height: 200px; /_ JS calculated or fixed _/
} 16. Persist open state to localStorage:

tsx
useEffect(() => {
localStorage.setItem('accordion-open', openItemId?.toString() || 'null');
}, [openItemId]);

useEffect(() => {
const saved = localStorage.getItem('accordion-open');
if (saved) setOpenItemId(parseInt(saved));
}, []); 17. Controlled from parent (not local state):

tsx
// Parent
const [openId, setOpenId] = useState(null);
<Accordion openItemId={openId} onToggle={setOpenId} />

// Child becomes controlled
{item.id === openItemId && <Content />}
Common Mistakes to Avoid (Interview Traps)
❌ WRONG:

tsx
// Per-item booleans (overkill)
const [items, setItems] = useState(items.map(() => false)); // Complex sync

// Index as key
{accordionItems.map((item, index) => <li key={index}>}) // Reorder bugs

// Mutation
const handleClick = (id) => {
openItemId = id; // Direct mutation!
}
✅ RIGHT: Single openItemId, key={item.id}, immutable setState.

🎯 Interview Talking Points
"Single source of truth" - One state variable controls entire UI

"Derived state pattern" - No per-item booleans needed

"Declarative rendering" - {condition && <Content>} reads naturally

"Stable keys matter" - item.id prevents reconciliation bugs

Time to solve: 8-12 minutes (mid-level)
