import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, Outlet } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
function linkClasses({ isActive }) {
    const base = 'rounded-full px-4 py-2 text-sm font-medium transition-colors';
    return isActive ? `${base} bg-white/10 text-white` : `${base} text-slate-300 hover:text-white`;
}
export function AppLayout() {
    const { logout } = useAuth();
    return (_jsxs("div", { className: "min-h-screen bg-slate-950 text-white", children: [_jsx("header", { className: "border-b border-white/5 bg-slate-900/80 backdrop-blur", children: _jsxs("div", { className: "mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4", children: [_jsx("span", { className: "text-xs uppercase tracking-[0.5em] text-slate-400", children: "FitMind" }), _jsxs("nav", { className: "flex flex-1 items-center justify-end gap-3 text-sm", children: [_jsx(NavLink, { to: "/", className: linkClasses, end: true, children: "Dashboard" }), _jsx(NavLink, { to: "/planner", className: linkClasses, children: "Planner" }), _jsx(NavLink, { to: "/fitness", className: linkClasses, children: "Fitness" }), _jsx(NavLink, { to: "/hair-care", className: linkClasses, children: "Hair Care" }), _jsx(NavLink, { to: "/profile", className: ({ isActive }) => `rounded-full border border-white/10 p-2 transition hover:border-brand-neon hover:text-white ${isActive ? 'bg-white/10 text-white' : 'text-slate-200'}`, children: [_jsx(UserCircle2, { className: "h-5 w-5" })] }), _jsx("button", { type: "button", onClick: logout, className: "rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-neon hover:text-white", children: "Log out" })] })] }) }), _jsx("main", { className: "mx-auto w-full max-w-6xl px-6 py-8", children: _jsx(Outlet, {}) })] }));
}
