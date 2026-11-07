import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#3B1637] text-white p-3.5 rounded-xl shadow-xl border border-[#581C4E] flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-200"
        >
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-[#E8C888] shrink-0 mt-0.5" />
          ) : toast.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold leading-tight">{toast.title}</p>
            {toast.description && (
              <p className="text-[11px] text-[#D1BDCA] mt-0.5 leading-tight">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-[#D1BDCA] hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
