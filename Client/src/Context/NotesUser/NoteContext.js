import {createContext} from 'react';

const NoteContext = createContext();
export default  NoteContext;

// React context allows us to pass down and use (consume) data in whatever component we need in our React app without using props.

// In other words, React context allows us to share data (state) across our components more easily.
// React context helps us avoid the problem of props drilling.
