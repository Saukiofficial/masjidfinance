import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import {
    LayoutDashboard, ArrowLeftRight, FileText, Receipt, Settings,
    Bell, Search, LogOut, User, Gift,
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: 'dashboard', icon: LayoutDashboard },
    { name: 'Transaksi', href: 'transactions.index', icon: ArrowLeftRight },
    { name: 'Laporan', href: 'reports.index', icon: FileText },
    { name: 'Cetak Nota', href: 'nota.index', icon: Receipt },
];

export default function AuthenticatedLayout({ children, title = 'Dashboard' }: PropsWithChildren<{ title?: string }>) {
    const user = usePage().props.auth.user as any;
    const [mobileMenu, setMobileMenu] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const currentRoute = route().current() ?? '';

    const initial = (name: string) => name?.charAt(0)?.toUpperCase() ?? '?';

    const sidebarClass = sidebarCollapsed ? 'w-20' : 'w-64';
    const navLabelClass = sidebarCollapsed ? 'hidden' : '';

    const sidebar = (
        <aside className={`hidden lg:flex fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 flex-col transition-all duration-300 ${sidebarClass}`}>
            {/* Logo */}
            <div className="flex items-center gap-3 h-16 px-5 border-b border-gray-100 shrink-0">
                <img src="/images/logo.png" alt="" className="w-8 h-8 object-contain rounded-lg shrink-0" />
                <span className={`font-bold text-gray-900 text-sm ${navLabelClass}`}>Masjid Finance</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentRoute.startsWith(item.href);
                    return (
                        <Link key={item.name} href={route(item.href)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                isActive
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }`}
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            <span className={navLabelClass}>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="p-3 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-900 text-white">
                    <Gift className="w-5 h-5 shrink-0" />
                    <div className={navLabelClass}>
                        <p className="text-xs font-semibold">Dukung Masjid</p>
                        <p className="text-[10px] text-emerald-200/70">Salurkan donasi</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-bold shrink-0">
                        {initial(user?.name)}
                    </div>
                    <div className={`flex-1 min-w-0 ${navLabelClass}`}>
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name ?? 'Admin'}</p>
                    </div>
                    <Link href={route('logout')} method="post" as="button" className="text-gray-400 hover:text-red-500 transition-colors">
                        <LogOut className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </aside>
    );

    const topbar = (
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <button onClick={() => setMobileMenu(true)} className="lg:hidden w-9 h-9 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500 flex">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold text-gray-900 hidden sm:block">{title}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-400 w-48 lg:w-64">
                        <Search className="w-4 h-4" />
                        <span>Cari...</span>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors relative">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
                    </button>
                    <button className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                        <Settings className="w-4 h-4" />
                    </button>
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-bold">
                        {initial(user?.name)}
                    </div>
                </div>
            </div>
        </header>
    );

    const mobileTitle = (
        <div className="lg:hidden flex items-center justify-between px-5 h-14 border-b border-gray-100 bg-white">
            <button onClick={() => setMobileMenu(true)} className="text-gray-500">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <h1 className="text-base font-bold text-gray-900">{title}</h1>
            <div className="w-5" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Desktop Sidebar */}
            {sidebar}

            {/* Desktop Layout */}
            <div className="hidden lg:block lg:pl-64">
                {topbar}
                <main className="p-6 xl:p-8">
                    {children}
                </main>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden min-h-screen bg-[#F8FAFC]">
                {mobileTitle}
                <main className="px-5 pb-24 pt-4 space-y-5">
                    {children}
                </main>

                {/* Mobile Bottom Nav */}
                <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 safe-area-bottom">
                    <div className="flex items-center justify-around h-16">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentRoute.startsWith(item.href);
                            return (
                                <Link key={item.name} href={route(item.href)}
                                    className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] h-full ${
                                        isActive ? 'text-emerald-600' : 'text-gray-400'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-[10px] font-semibold">{item.name}</span>
                                </Link>
                            );
                        })}
                        <button onClick={() => setMobileMenu(true)}
                            className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] h-full text-gray-400"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <span className="text-[10px] font-semibold">Menu</span>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Slide Menu */}
            {mobileMenu && (
                <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileMenu(false)}>
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-fade-up" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 h-16 px-5 border-b border-gray-100">
                            <img src="/images/logo.png" alt="" className="w-8 h-8 object-contain rounded-lg" />
                            <span className="font-bold text-gray-900 text-sm">Masjid Finance</span>
                        </div>
                        <div className="p-3 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = currentRoute.startsWith(item.href);
                                return (
                                    <Link key={item.name} href={route(item.href)} onClick={() => setMobileMenu(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                            isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="p-3 border-t border-gray-100 mt-4">
                            <Link href={route('profile.edit')} onClick={() => setMobileMenu(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50">
                                <User className="w-5 h-5" /> Profile
                            </Link>
                            <Link href={route('logout')} method="post" as="button"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 w-full">
                                <LogOut className="w-5 h-5" /> Keluar
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
