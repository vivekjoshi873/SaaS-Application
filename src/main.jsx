// Compatibility entry for Vite: index.html references /src/main.jsx
// This file simply imports the existing `index.jsx` entry which performs
// the React render. Creating this avoids the Vite "Failed to load /src/main.jsx"
// pre-transform error when the project uses `src/index.jsx` as the real entry.
import './index.jsx';
