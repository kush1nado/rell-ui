# Rell UI + React + TypeScript integration test

This folder is used by the root `npm run test:integration` script to verify that rell-ui types are consumable in a TypeScript project (ref types, event detail types, design tokens).

The typecheck runs only on `src/typecheck-only.ts`, which imports types from `rell-ui` and asserts they are valid. The `App.tsx` file is kept as a reference for manual testing in a full React app.
