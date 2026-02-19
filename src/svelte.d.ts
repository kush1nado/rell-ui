/**
 * Svelte type support for Rell UI Web Components.
 *
 * Reference this file in your Svelte project (e.g. in app.d.ts or a global d.ts)
 * so that Rell types are available. In script:
 *
 *   import type { RellDialog, RellInputChangeEventDetail } from 'rell-ui';
 *   let dialogElement: RellDialog;
 *   function onInput(e: CustomEvent<RellInputChangeEventDetail>) { ... }
 *
 * In templates, use rell-* tags and bind:this={dialogElement}; ref types work when typed as above.
 */
/// <reference path="./index.d.ts" />
