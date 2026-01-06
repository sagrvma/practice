Problem Statement (README)
Dynamic Registration Form with Validation

Build a LoginForm (registration) component with 5 controlled fields using a config-driven approach:

text
Requirements:

1. Fields: username, email, birthDate, password, confirmPassword
2. Dynamic `inputs[]` config array drives field rendering
3. Validation: required + custom rules (min length, password match)
4. States: formValues, errorMsg, submitting
5. UX: Clear errors on change, disable submit during loading
   Your Solution (Key Patterns):

tsx
// Dynamic rendering
{inputs.map(input => (
<FormInput value={formValues[input.name]} />
{errorMsg[input.name] && <Error>{errorMsg[input.name]}</Error>}
))}

// Immutable updates
setFormValues(prev => ({ ...prev, [name]: value }));

// Early validation return
if (Object.keys(errors).length > 0) return;
📋 Complete Interview Q&A (20+ Questions)
Core Architecture (Must Know)

1. What are the 3 main pieces of state and their purpose?

text
formValues: { username, email, birthDate, password, confirmPassword }
→ All field values (single source of truth)

errorMsg: { username: "", email: "", ... }
→ Per-field error messages (empty string = no error)

submitting: boolean
→ Disable UI + show "Submitting..." during fake API call 2. Why single formValues object vs separate states per field?

text
✅ Single object = generic handleChange works for ALL fields
✅ Dynamic inputs.map() accesses formValues[input.name]
❌ 5 useState hooks = 5 separate onChange handlers 3. Walk through handleChange - why clear errors?

tsx
const handleChange = (e) => {
setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));

// UX: Clear field-specific error when user types
if (errorMsg[e.target.name]) {
setErrorMsg(prev => ({ ...prev, [e.target.name]: "" }));
}
};
Answer: Forgiving UX - user sees "fixed" immediately, encourages completion.

Validation Flow 4. Complete handleSubmit flow (line-by-line):

text

1. e.preventDefault() - prevent page reload
2. errors: Partial<FormValues> = {} - collect validation errors
3. if (!formValues.username) errors.username = "Required"
4. setErrorMsg(errors) - show errors immediately
5. if (Object.keys(errors).length > 0) return; - BLOCK SUBMIT
6. setSubmitting(true) - enter loading state
7. setTimeout(1000) → setSubmitting(false) + success alert
8. Why Partial<FormValues> for errors?

text
Partial = only failed fields have error strings
{ username: "Required", email: "" } ← Valid TypeScript
vs FormValues requiring ALL 5 fields every time 6. Password match validation logic?

tsx
if (!confirmPassword) {
errors.confirmPassword = "Required";
} else if (password !== confirmPassword) {
errors.confirmPassword = "Passwords don't match";
}
Order matters: Required check first, then comparison.

Dynamic Config Pattern 7. Role of inputs[] config array?

tsx
const inputs = [
{ id: 1, name: "username", type: "text", label: "Username" },
// ... drives rendering, validation, labels
];
Answer: Single source of truth for field metadata → DRY, easy to add/remove fields.

8. How does FormInput component work?

tsx
interface FormInputProps extends ComponentProps<"input"> {
label: string;
}
Answer: Reusable wrapper accepts all native input props + custom label, spreads {...input} from config.

9. Adding new field (e.g., phone)?

text

1. Add to FormValues interface: phone: string
2. Add to inputs[]: { id: 6, name: "phone", type: "tel", label: "Phone" }
3. Add validation in handleSubmit
4. Everything auto-renders + works
   React Patterns & Performance
5. Why functional updates in handleChange?

tsx
setFormValues(prev => ({ ...prev, [name]: value }));
Answer: Safe - always uses latest state, avoids stale closures, batching-safe.

11. Why key={input.id} in inputs.map()?

text
✅ input.id = stable, unique (1,2,3,4,5)
❌ index = unstable if array reorders
React efficiently reconciles DOM when keys stable 12. form vs button onClick for submit?

text
✅ <form onSubmit={handleSubmit}>
<button type="submit">
→ Enter key works, semantic, accessible

❌ <button onClick={handleSubmit}>
→ Enter doesn't work naturally
Error Handling & UX 13. Why errorMsg as full FormValues not Partial?

text
✅ errorMsg: FormValues = { username: "", email: "" }
→ errorMsg[name] always defined (no null checks)

❌ errorMsg: Partial<FormValues>
→ {errorMsg[name] && <Error>} needs null checks 14. setTimeout vs setInterval for submitting?

text
setTimeout(fn, 1000) → Runs ONCE after 1s (correct)
setInterval(fn, 1000) → Runs EVERY 1s forever (wrong) 15. Button states during submit?

tsx
<button disabled={submitting}>
{submitting ? "Submitting..." : "Submit"}
</button>
Prevents: Double-click, confusing UX during fake API call.

TypeScript Deep Dive 16. keyof FormValues in config - why?

tsx
interface input {
name: keyof FormValues; // "username" | "email" | ...
}
Answer: Type-safe - config name must match real form fields.

17. ComponentProps<"input"> in FormInputProps?

text
Extracts ALL native input props (value, onChange, disabled, etc.)

- custom `label` prop
  → Full flexibility + autocomplete
  Follow-ups (Interviewer Escalation)

18. Real-time validation (onChange)?

tsx
const validateField = (name, value) => {
if (name === "email" && !value.includes("@")) return "Invalid email";
return "";
};

const handleChange = (e) => {
const { name, value } = e.target;
setFormValues(prev => ({ ...prev, [name]: value }));
setErrorMsg(prev => ({ ...prev, [name]: validateField(name, value) }));
}; 19. Custom hook for validation?

tsx
const useFormValidation = (values) => {
const validate = () => { /_ logic _/ };
return { errors, validate, clearFieldError };
}; 20. Server-side errors?

tsx
const [serverError, setServerError] = useState("");
// After API call:
if (!response.ok) {
setServerError("Server error - please try again");
setSubmitting(false);
}
Common Mistakes (Interview Traps)
❌ NEVER DO:

tsx
// Direct mutation
formValues.username = e.target.value; // No re-render!

// Validate AFTER submit animation
setSubmitting(true);
setTimeout(() => { if (errors) showErrors(); }); // Wrong timing

// Separate state per field
const [username, setUsername] = useState("");
// ×5 more → No dynamic rendering
✅ YOUR SOLUTION: Object state, immediate validation, dynamic config.

🎯 Interview Talking Points
"Config-driven" - Single inputs[] controls rendering + metadata

"Single source of truth" - formValues object unifies all fields

"Forgiving UX" - Clear errors on first keystroke

"Early return pattern" - Validate → block → no loading state

Time to solve: 15-20 minutes (intermediate)
