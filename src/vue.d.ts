/**
 * Vue 3 type support for Rell UI Web Components.
 *
 * Reference this file in your Vue project (e.g. in env.d.ts: /// <reference types="rell-ui/vue" />)
 * so that Rell types are available. In script:
 *
 *   import type { RellDialog, RellInputChangeEventDetail } from 'rell-ui';
 *   const dialogRef = ref<RellDialog | null>(null);
 *   const onInput = (e: CustomEvent<RellInputChangeEventDetail>) => { ... };
 *
 * In templates, use rell-* tags as usual; ref types work when you type ref as above.
 */
/// <reference path="./index.d.ts" />
