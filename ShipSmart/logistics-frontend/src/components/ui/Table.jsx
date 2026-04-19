import React from 'react';

export const Table = ({ children, className = "" }) => (
  <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
    <table className={`w-full text-left text-sm text-slate-600 ${className}`}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children }) => (
  <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
    {children}
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody className="divide-y divide-slate-200 bg-white">
    {children}
  </tbody>
);

export const TableRow = ({ children, className = "" }) => (
  <tr className={`hover:bg-slate-50 transition-colors ${className}`}>
    {children}
  </tr>
);

export const TableHead = ({ children, className = "" }) => (
  <th className={`px-6 py-4 ${className}`}>
    {children}
  </th>
);

export const TableCell = ({ children, className = "" }) => (
  <td className={`px-6 py-4 ${className}`}>
    {children}
  </td>
);
