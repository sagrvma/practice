Step 1 – Problem statement: Basic Accordion
Build an Accordion component with multiple items.

Requirements:

Data-driven items

Have an array of items: each with id, title, and content.

Single-open behavior

Only one item can be open at a time.

Clicking an item’s header:

If it’s closed → open it.

If it’s already open → close it (so everything is collapsed).

UI

Show all item titles as clickable headers (like buttons or divs).

Below the open item’s title, show its content.

Closed items show only their title.

State shape

Use one piece of state to track which item is open (e.g., openItemId or null).

What state does this Accordion manage and why?
It manages openItemId: number | null, which tracks which single item is open. null means all are collapsed.

How does clicking a title open/close an item?
Via handleClick(item.id):

ts
const handleClick = (itemId: number) => {
if (itemId === openItemId) setOpenItemId(null);
else setOpenItemId(itemId);
};
Same ID → close; different ID → open that one.

How is conditional rendering used to show content?

tsx
{item.id === openItemId && (

  <p className="accordion-item-content">{item.content}</p>
)}
The content is rendered only when the condition is true.

Why is accordionItems defined outside the component?
It’s static data, so defining it outside avoids recreating the array on every render and keeps the component pure.

How do you ensure only one item is open at a time?
By using a single openItemId instead of a boolean per item. Setting it to one ID implicitly closes all others.

How would you change this to allow multiple items open at once?
Change state to something like openIds: number[] and toggle membership:

ts
const [openIds, setOpenIds] = useState<number[]>([]);
// toggle: add/remove id from the array
What is the role of the key prop here?

tsx

<li key={item.id}>
It gives each list item a stable identity so React can correctly reconcile changes when the list updates.

Why might you use a <button> instead of <h2> for the clickable title?
For accessibility and semantics—buttons are focusable and have built-in keyboard interaction; h2 would need extra attributes and handlers.

What is the initial state and what does it mean for the UI?

ts
const [openItemId, setOpenItemId] = useState<number | null>(1);
Item with id: 1 starts open when the component first renders.

How would you start with everything collapsed?

ts
const [openItemId, setOpenItemId] = useState<number | null>(null);
Then no item’s content matches, so all are closed initially.

What happens if you add a new accordion item to accordionItems?
It will automatically render another list item. Behavior still works as long as it has a unique id, title, and content.

Is there any derived state here?
Yes, “is this item open?” is derived by item.id === openItemId instead of storing a separate boolean per item.

How would you animate the open/close behavior?
Use CSS transitions on height/opacity for .accordion-item-content, or a library like react-transition-group.

How might you improve accessibility for this Accordion?
Use button for the trigger, add aria-expanded, aria-controls, IDs for content panels, and support keyboard interaction (Enter/Space).
