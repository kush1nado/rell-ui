/**
 * Minimal React + TypeScript app to verify rell-ui types.
 * - rell-* tags with attributes
 * - ref typed as RellDialog
 * - CustomEvent with RellInputChangeEventDetail
 */
import { useRef, useEffect } from 'react';
import type { RellDialog, RellInputChangeEventDetail } from 'rell-ui';
import 'rell-ui';
import 'rell-ui/theme.css';

export function App() {
  const dialogRef = useRef<RellDialog | null>(null);

  useEffect(() => {
    const input = document.querySelector('rell-input');
    if (!input) return;
    const handler = (e: CustomEvent<RellInputChangeEventDetail>) => {
      console.log(e.detail.value);
    };
    input.addEventListener('input', handler as EventListener);
    return () => input.removeEventListener('input', handler as EventListener);
  }, []);

  const openDialog = () => {
    dialogRef.current?.open();
  };

  return (
    <rell-container>
      <rell-button variant="primary" size="md" onClick={openDialog}>
        Open
      </rell-button>
      <rell-input placeholder="Type here" />
      <rell-dialog ref={dialogRef}>
        <div slot="header">Title</div>
        <p>Content</p>
      </rell-dialog>
    </rell-container>
  );
}
