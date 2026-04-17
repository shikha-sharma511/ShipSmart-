import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ children, className = "" }) => (
  <div className={cn(
    "bg-white border border-slate-200 rounded-2xl shadow-sm",
    className
  )}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={cn("mb-4 flex items-center justify-between", className)}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={cn("text-lg font-semibold text-slate-800", className)}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={cn("text-slate-600", className)}>
    {children}
  </div>
);
