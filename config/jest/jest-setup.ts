import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

beforeEach(() => {
    const { warn } = console;
    jest.spyOn(console, 'warn').mockImplementation((msg, ...args) => {
        if (msg.includes('React Router Future Flag')) return;
        warn(msg, ...args);
    });
});
