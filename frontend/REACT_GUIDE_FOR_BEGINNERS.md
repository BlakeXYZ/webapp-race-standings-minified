# React Guide for HTML/CSS/JS Developers

If you know HTML, CSS, and JavaScript, you already know 90% of what you need for React!

## The Basics

### 1. JSX is Just HTML in JavaScript

```tsx
// This looks like HTML, but it's actually JSX (JavaScript XML)
function MyComponent() {
  return (
    <div className="container">
      <h1>Hello World</h1>
    </div>
  )
}
```

**Key Differences from HTML:**
- Use `className` instead of `class` (because `class` is a JavaScript keyword)
- Use `{variable}` to show JavaScript values
- Self-closing tags need `/` like `<img />` or `<br />`

---

### 2. Variables in HTML with `{}`

In vanilla JS, you'd do:
```javascript
document.getElementById('title').textContent = myVariable;
```

In React:
```tsx
const myVariable = "Hello";
return <h1>{myVariable}</h1>
```

**Any JavaScript goes in `{}`:**
```tsx
<h1>{user.name}</h1>
<p>{count + 1}</p>
<span>{isActive ? 'Active' : 'Inactive'}</span>
```

---

### 3. `useState` = Store a Variable That Updates the Page

In vanilla JS:
```javascript
let count = 0;
button.addEventListener('click', () => {
  count++;
  document.getElementById('count').textContent = count; // Manual update
});
```

In React:
```tsx
const [count, setCount] = useState(0);

// When count changes, the page updates automatically!
return (
  <div>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>Increment</button>
  </div>
)
```

**Pattern:**
```tsx
const [variableName, setVariableName] = useState(initialValue)

// READ: variableName
// WRITE: setVariableName(newValue)
```

---

### 4. `useEffect` = Run Code When Page Loads

In vanilla JS:
```javascript
window.onload = () => {
  console.log('Page loaded');
  fetchData();
}
```

In React:
```tsx
useEffect(() => {
  console.log('Component loaded');
  fetchData();
}, []) // [] means "run once on load"
```

**Run when something changes:**
```tsx
useEffect(() => {
  console.log('Count changed to:', count);
}, [count]) // Runs every time count changes
```

---

### 5. Loops (`.map()`)

In vanilla JS:
```javascript
const list = document.getElementById('list');
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item.name;
  list.appendChild(li);
});
```

In React:
```tsx
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

**Always add `key` to help React track items!**

---

### 6. Conditional Rendering (Show/Hide)

In vanilla JS:
```javascript
if (isLoggedIn) {
  element.style.display = 'block';
} else {
  element.style.display = 'none';
}
```

In React:
```tsx
// Show if true
{isLoggedIn && <p>Welcome!</p>}

// Show one or the other
{isLoggedIn ? <p>Welcome!</p> : <p>Please login</p>}
```

---

### 7. Event Handlers

In vanilla JS:
```javascript
button.addEventListener('click', () => {
  alert('Clicked!');
});
```

In React:
```tsx
<button onClick={() => alert('Clicked!')}>Click Me</button>
```

**Common events:**
- `onClick` - click
- `onChange` - input change
- `onSubmit` - form submit
- `onMouseEnter` - hover
- `onKeyDown` - keyboard

---

### 8. Fetching Data (API Calls)

In vanilla JS:
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    renderData(data);
  });
```

In React:
```tsx
const [data, setData] = useState([]);

useEffect(() => {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => setData(data)); // Updates state and re-renders
}, []);

return (
  <div>
    {data.map(item => <div key={item.id}>{item.name}</div>)}
  </div>
);
```

---

## Common Patterns

### Form Input

```tsx
const [name, setName] = useState('');

return (
  <input 
    type="text" 
    value={name} 
    onChange={(e) => setName(e.target.value)}
  />
);
```

### Button Click

```tsx
const handleClick = () => {
  console.log('Button clicked!');
};

return <button onClick={handleClick}>Click Me</button>
```

### Loading States

```tsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData().then(() => setLoading(false));
}, []);

return (
  <div>
    {loading ? <p>Loading...</p> : <p>Data loaded!</p>}
  </div>
);
```

---

## File Structure

```
src/
  App.tsx           - Main component (your page)
  main.tsx          - Entry point (loads App)
  components/       - Reusable components
    ui/
      card.tsx      - Pre-made styled components
```

---

## Quick Reference

| Vanilla JS | React |
|------------|-------|
| `document.getElementById()` | `{variable}` |
| `let count = 0` | `const [count, setCount] = useState(0)` |
| `window.onload` | `useEffect(() => {}, [])` |
| `element.textContent = value` | `<div>{value}</div>` |
| `for/forEach loop` | `{array.map()}` |
| `if/else` | `{condition && <div>}` or `{condition ? a : b}` |
| `addEventListener('click')` | `onClick={handler}` |
| `element.classList.add()` | `className="class-name"` |

---

## Tips

1. **Components are just functions** that return HTML (JSX)
2. **Props are like function parameters** - pass data between components
3. **State changes = page updates** - no manual DOM manipulation
4. **Think declarative** - describe what you want, not how to do it

---

## Adding More Components

Create a new file:
```tsx
// src/components/MyComponent.tsx
function MyComponent() {
  return <div>Hello from MyComponent!</div>
}

export default MyComponent
```

Use it:
```tsx
// src/App.tsx
import MyComponent from './components/MyComponent'

function App() {
  return (
    <div>
      <MyComponent />
    </div>
  )
}
```

---

## Debugging

**See what's in a variable:**
```tsx
console.log('standings:', standings);

// Or show on page:
<pre>{JSON.stringify(standings, null, 2)}</pre>
```

**React DevTools** - Install browser extension to inspect components

---

## That's It!

You now know enough React to build this app. The rest is just:
- Practice
- Reading the code
- Tweaking things
- Looking at examples

**Remember:** React is just JavaScript! If you can write JavaScript, you can write React.
