import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useStore();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-white dark:text-zinc-900" />,
    warning: <AlertTriangle className="w-4 h-4 flex-shrink-0 text-white dark:text-zinc-900" />,
    error: <XCircle className="w-4 h-4 flex-shrink-0 text-white dark:text-zinc-900" />,
    info: <Info className="w-4 h-4 flex-shrink-0 text-white dark:text-zinc-900" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold modal-animate border border-zinc-700 dark:border-zinc-300 select-none">
      {icons[toast.type] || icons.info}
      <span>{toast.message}</span>
    </div>
  );
};
