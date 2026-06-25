import React from 'react';
import { createRoot } from 'react-dom/client';
import PtolemaicSystemSimulator from './PtolemaicSystemSimulator.jsx';

const domContainer = document.querySelector('#sim-root');
const root = createRoot(domContainer);
root.render(<PtolemaicSystemSimulator />);
