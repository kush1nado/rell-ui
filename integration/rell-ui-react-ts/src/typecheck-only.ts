/**
 * Type-only integration check: rell-ui types are consumable (ref, event detail, design tokens).
 * Run: tsc --noEmit (with types from rell-ui and @types/react).
 */
import type {
  RellDialog,
  RellButton,
  RellInputChangeEventDetail,
  RellCalendarChangeEventDetail,
  RellDesignTokens,
} from 'rell-ui';

const dialogRef: RellDialog | null = null;
const buttonRef: RellButton | null = null;

const inputEventDetail: RellInputChangeEventDetail = { value: 'test' };
const calendarEventDetail: RellCalendarChangeEventDetail = { value: ['2025-01-01'] };

const tokens: RellDesignTokens = {
  '--rell-bg-primary': '#fff',
  '--rell-accent-cyan': '#00ffff',
};

export { dialogRef, buttonRef, inputEventDetail, calendarEventDetail, tokens };
