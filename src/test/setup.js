import '../index.css';
import { cleanup } from 'vitest-browser-react';
import { afterEach, beforeEach } from 'vitest';

beforeEach(() => {
    localStorage.clear();
});

afterEach(async () => {
    await cleanup();
    localStorage.clear();
});
