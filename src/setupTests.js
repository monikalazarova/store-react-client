// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { testEnvironment, transformIgnorePatterns } from '../jest.config';

module.exports = {
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        '/node_modules/(?axios|react-router-dom)'
    ]
};