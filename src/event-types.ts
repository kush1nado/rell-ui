/**
 * Type definitions for custom event `detail` payloads emitted by Rell UI components.
 * Use with addEventListener in React/frameworks: (e: CustomEvent<RellInputChangeEventDetail>) => ...
 */

/** rell-input: input, change */
export interface RellInputChangeEventDetail {
  value: string;
}

/** rell-input: valid */
export interface RellInputValidEventDetail {
  value: string;
}

/** rell-input: invalid */
export interface RellInputInvalidEventDetail {
  value: string;
  message?: string;
}

/** rell-color-picker: change, value-change */
export interface RellColorPickerChangeEventDetail {
  value: string;
}

/** rell-calendar: change (single/multiple) */
export interface RellCalendarChangeEventDetail {
  value?: string[];
  dates?: Date[];
  start?: string | null;
  end?: string | null;
  range?: [Date, Date] | null;
}

/** rell-file-upload: files-changed */
export interface RellFileUploadFilesChangedEventDetail {
  files: File[];
}

/** rell-accordion: change */
export interface RellAccordionChangeEventDetail {
  value: string;
  open: boolean;
}

/** rell-accordion-item: toggle */
export interface RellAccordionItemToggleEventDetail {
  value: string;
  open: boolean;
}

/** rell-segmented-control-item: change */
export interface RellSegmentedControlChangeEventDetail {
  value: string;
}

/** rell-carousel: slide-change */
export interface RellCarouselSlideChangeEventDetail {
  index: number;
}

/** rell-split-pane: split-change */
export interface RellSplitPaneSplitChangeEventDetail {
  split: number;
}

/** rell-resizable: resize */
export interface RellResizableResizeEventDetail {
  width: number;
  height: number;
}

/** rell-table-row: row-click */
export interface RellTableRowClickEventDetail {
  row: HTMLElement;
}

/** rell-context-menu, rell-dropdown, rell-split-button: item-click */
export interface RellItemClickEventDetail {
  item: unknown;
  element: HTMLElement;
}

/** rell-popconfirm: confirm */
export interface RellPopconfirmConfirmEventDetail {
  // no payload; use for type-safe listener
}

/** rell-popconfirm: cancel */
export interface RellPopconfirmCancelEventDetail {
  // no payload
}
