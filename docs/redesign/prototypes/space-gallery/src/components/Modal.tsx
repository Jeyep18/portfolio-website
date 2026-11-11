import { useEffect, useRef, type ReactNode } from 'react';
import { useMotion } from '../motion';

export function Modal({ title, open, onClose, children }: {
  title: string; open: boolean; onClose: () => void; children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { setInspecting } = useMotion();
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const trigger = document.activeElement as HTMLElement;
    const overflow = document.documentElement.style.overflow;
    const top = scrollY;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    setInspecting(true);
    return () => {
      dialog.close();
      document.documentElement.style.overflow = overflow;
      window.scrollTo({ top, behavior: 'instant' });
      trigger?.focus({ preventScroll: true });
      setInspecting(false);
    };
  }, [open, setInspecting]);
  return <dialog ref={ref} className="modal" aria-label={title}
    onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-surface">
      <header className="modal-header"><h2>{title}</h2><button autoFocus className="button button-quiet" onClick={onClose}>Close ×</button></header>
      {children}
    </div>
  </dialog>;
}
