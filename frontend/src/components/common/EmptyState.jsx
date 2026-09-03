import React from 'react';
import { Sparkles } from 'lucide-react';

export const EmptyState = ({
  title,
  description,
  actionText,
  onAction,
  icon
}) => {
  return (
    <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto my-6">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
        {icon || <Sparkles className="w-6 h-6" />}
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
        {description && (
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">{description}</p>
        )}
      </div>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline pt-1 cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};