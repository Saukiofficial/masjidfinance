import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

import Modal from '@/Components/Modal';

interface Props {
    income: number; expense: number; balance: number; count: number;
    recentTransactions: any[]; monthly: Record<string, any[]>; topIncomeCategories: any[];
}

function formatRp(n: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}
function formatAxis(n: number) {
    if (n >= 1_000_000) return `${Math.round(n / 1_000_000)}jt`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}rb`;
    return `${n}`;
}
function formatDate(d: string | Date, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
    return new Date(d).toLocaleDateString('id-ID', opts);
}

const I = {
    mosque: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2.5M9 5.5a3 3 0 016 0c0 1.5-1 2-1 3.5H10c0-1.5-1-2-1-3.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-6a2 2 0 012-2h1a2 2 0 012 2v6M15 21v-6a2 2 0 012-2h1a2 2 0 012 2v6M9 21v-4a3 3 0 016 0v4" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 21h20" /></svg>,
    heart: (p: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
    moon: (p: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>,
    arrowRight: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
    trendUp: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22M21.75 12v5.25H16.5" /></svg>,
    trendDown: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.306-4.306a11.95 11.95 0 015.814 5.518l2.74 1.22M21.75 12V6.75H16.5" /></svg>,
    wallet: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9v3" /></svg>,
    layers: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l5.25-3 5.25 3-5.25 3-5.25-3zM3 12l9 5 9-5M3 16.5l9 5 9-5" /></svg>,
    shield: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    document: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12h-9m9-3.75h-9m3.75-8.25H6a2.25 2.25 0 00-2.25 2.25v15A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25V11.25a9 9 0 00-9-9z" /></svg>,
    check: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    users: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    pin: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
    clock: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    phone: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
    mail: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
    arrowDown: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-5.25-5.25M12 19.5l5.25-5.25" /></svg>,
    arrowUp: (p: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-5.25 5.25M12 4.5l5.25 5.25" /></svg>,
};

function LogoImage({ className = '' }: { className?: string }) {
    return <img src="/images/logo.png" alt="Masjid Darus Sa'adah" className={className} />;
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const links = [
        { label: 'Beranda', href: '#top' }, { label: 'Laporan', href: '#laporan' },
        { label: 'Transaksi', href: '#transaksi' }, { label: 'Donasi', href: '#donasi' },
        { label: 'Tentang', href: '#tentang' }, { label: 'Kontak', href: '#kontak' },
    ];

    return (
        <header id="top" className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-[clamp(12px,3vw,24px)]">
                <div className="flex items-center justify-between h-[clamp(52px,7vw,72px)]">
                    <Link href="/" className="flex items-center gap-[clamp(6px,1.2vw,12px)] shrink-0">
                        <img src="/images/logo.png" alt="Masjid Darus Sa'adah" className="w-[clamp(28px,4vw,48px)] h-[clamp(28px,4vw,48px)] object-contain shrink-0" />
                        <div className="leading-tight">
                            <p className="font-bold text-gray-900 text-[clamp(11px,1.6vw,16px)]">Masjid Darus Sa'adah</p>
                            <p className="text-[clamp(8px,1.1vw,11px)] text-gray-400 -mt-0.5">Transparansi Keuangan</p>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden sm:flex items-center gap-[clamp(8px,1.5vw,20px)]">
                        {links.map((l) => (
                            <a key={l.label} href={l.href}
                                className="text-[clamp(9px,1.2vw,14px)] text-gray-600 hover:text-emerald-700 font-medium transition-colors whitespace-nowrap"
                            >{l.label}</a>
                        ))}
                        <Link href={route('login')} onClick={() => setMenuOpen(false)}
                            className="inline-flex items-center gap-[clamp(3px,0.5vw,6px)] bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-full transition-colors shadow-sm whitespace-nowrap"
                            style={{ padding: 'clamp(4px,0.8vw,10px) clamp(10px,1.8vw,20px)', fontSize: 'clamp(9px,1.2vw,14px)' }}
                        >
                            Login
                        </Link>
                    </nav>

                    {/* Mobile: Login + hamburger */}
                    <div className="flex sm:hidden items-center gap-2">
                        <Link href={route('login')}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                        >Login</Link>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Menu">
                            {menuOpen
                                ? <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                : <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {menuOpen && (
                <div className="sm:hidden bg-white border-b border-gray-100 shadow-lg animate-fade-in">
                    <div className="px-4 py-3 space-y-1">
                        {links.map((l) => (
                            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            >{l.label}</a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl" />
            </div>
            <div className="max-w-7xl mx-auto px-[clamp(12px,3vw,24px)] py-[clamp(32px,6vw,80px)] relative">
                <div className="grid grid-cols-2 gap-[clamp(16px,3vw,48px)] items-center">
                    <div className="space-y-[clamp(8px,1.2vw,20px)]">
                        <div className="inline-flex items-center gap-[clamp(4px,0.6vw,8px)] px-[clamp(8px,1.5vw,16px)] py-[clamp(3px,0.6vw,6px)] bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 font-medium"
                            style={{ fontSize: 'clamp(9px,1.2vw,14px)' }}>
                            <I.moon className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)]" />
                            Bismillahirrahmanirrahim
                        </div>
                        <h1 style={{ fontSize: 'clamp(20px,3.2vw,54px)' }} className="font-extrabold leading-[1.08] tracking-tight">
                            <span className="text-gray-900">Laporan Dana</span><br />
                            <span className="text-emerald-700">Masjid Darus Sa'adah</span>
                        </h1>
                        <p style={{ fontSize: 'clamp(11px,1.6vw,20px)' }} className="text-gray-700 font-medium">
                            Transparansi Keuangan Acara Maulid Nabi Muhammad ﷺ
                        </p>
                        <p style={{ fontSize: 'clamp(10px,1.3vw,16px)' }} className="text-gray-500 leading-relaxed max-w-lg">
                            Kami berkomitmen untuk mengelola setiap amanah dengan sebaik-baiknya
                            dan menyajikan laporan keuangan secara terbuka, akurat, dan terpercaya kepada seluruh jamaah.
                        </p>
                        <div className="flex gap-[clamp(6px,1vw,12px)] pt-[clamp(4px,0.8vw,8px)]">
                            <a href="#laporan"
                                className="inline-flex items-center justify-center gap-[clamp(3px,0.5vw,8px)] bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl transition-colors shadow-sm whitespace-nowrap"
                                style={{ padding: 'clamp(6px,1.2vw,14px) clamp(12px,2.5vw,24px)', fontSize: 'clamp(9px,1.3vw,16px)' }}>
                                <I.document className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)]" />
                                Lihat Laporan
                            </a>
                            <a href="#transaksi"
                                className="inline-flex items-center justify-center gap-[clamp(3px,0.5vw,8px)] bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-colors whitespace-nowrap"
                                style={{ padding: 'clamp(6px,1.2vw,14px) clamp(12px,2.5vw,24px)', fontSize: 'clamp(9px,1.3vw,16px)' }}>
                                <I.document className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)]" />
                                Riwayat
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <LogoImage className="w-full max-w-[clamp(120px,22vw,400px)] h-auto object-contain" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ icon, iconBg, label, value, sub }: { icon: React.ReactNode; iconBg: string; label: string; value: string; sub: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            style={{ padding: 'clamp(12px,2vw,24px)' }}>
            <div className={`w-[clamp(32px,5vw,44px)] h-[clamp(32px,5vw,44px)] rounded-xl flex items-center justify-center text-white mb-[clamp(8px,1.2vw,16px)] ${iconBg}`}
                style={{ fontSize: 'clamp(14px,2vw,20px)' }}>
                {icon}
            </div>
            <p style={{ fontSize: 'clamp(10px,1.3vw,14px)' }} className="text-gray-500 mb-[clamp(2px,0.4vw,4px)]">{label}</p>
            <p style={{ fontSize: 'clamp(10px,1.8vw,26px)', lineHeight: '1.15' }}
               className="font-bold text-gray-900 tracking-tight mb-[clamp(4px,0.6vw,8px)] break-words hyphens-auto">
                {value}
            </p>
            <div style={{ fontSize: 'clamp(9px,1.1vw,12px)' }} className="text-gray-400">{sub}</div>
        </div>
    );
}

function StatsRow({ income, expense, balance }: { income: number; expense: number; balance: number }) {
    return (
        <section id="laporan" className="max-w-7xl mx-auto px-[clamp(12px,3vw,24px)] relative z-10"
            style={{ marginTop: 'clamp(-20px,-3vw,-40px)' }}>
            <div className="grid grid-cols-3 gap-[clamp(12px,2vw,24px)]">
                <StatCard icon={<I.trendUp className="w-[clamp(14px,2.2vw,22px)] h-[clamp(14px,2.2vw,22px)]" />}
                    iconBg="bg-gradient-to-br from-emerald-500 to-emerald-600" label="Total Pemasukan" value={formatRp(income)} sub="Seluruh dana yang masuk" />
                <StatCard icon={<I.trendDown className="w-[clamp(14px,2.2vw,22px)] h-[clamp(14px,2.2vw,22px)]" />}
                    iconBg="bg-gradient-to-br from-red-500 to-red-600" label="Total Pengeluaran" value={formatRp(expense)} sub="Seluruh dana yang keluar" />
                <StatCard icon={<I.wallet className="w-[clamp(14px,2.2vw,22px)] h-[clamp(14px,2.2vw,22px)]" />}
                    iconBg="bg-gradient-to-br from-blue-500 to-blue-600" label="Sisa Saldo" value={formatRp(balance)}
                    sub={`Per ${formatDate(new Date(), { day: 'numeric', month: 'long', year: 'numeric' })}`} />
            </div>
        </section>
    );
}

function ChartCard({ monthly, income, expense }: { monthly: Record<string, any[]>; income: number; expense: number }) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const entries = Object.entries(monthly ?? {});
    const chartData = entries.map(([month, items]) => {
        const inc = items.find((i: any) => i.type === 'income')?.total ?? 0;
        const exp = items.find((i: any) => i.type === 'expense')?.total ?? 0;
        const [year, m] = month.split('-');
        return { month: `${monthNames[parseInt(m, 10) - 1] ?? month}`.trim(), income: inc, expense: exp };
    });
    const hasData = chartData.length > 0;
    const monthCount = entries.length || 1;
    const avgIncome = income / monthCount;
    const avgExpense = expense / monthCount;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm" style={{ padding: 'clamp(12px,2vw,24px)' }}>
            <div className="flex items-start justify-between mb-[clamp(12px,2vw,24px)]">
                <div>
                    <h3 style={{ fontSize: 'clamp(12px,1.8vw,18px)' }} className="font-bold text-gray-900">Grafik Keuangan Bulanan</h3>
                    <p style={{ fontSize: 'clamp(9px,1.3vw,14px)' }} className="text-gray-400 mt-[2px]">Pemasukan &amp; Pengeluaran</p>
                </div>
                <div className="flex items-center gap-[clamp(8px,1.2vw,16px)]" style={{ fontSize: 'clamp(8px,1.1vw,13px)' }}>
                    <span className="flex items-center gap-[clamp(3px,0.4vw,6px)] text-gray-500"><span className="w-[clamp(6px,0.8vw,10px)] h-[clamp(6px,0.8vw,10px)] rounded-full bg-emerald-500" />Masuk</span>
                    <span className="flex items-center gap-[clamp(3px,0.4vw,6px)] text-gray-500"><span className="w-[clamp(6px,0.8vw,10px)] h-[clamp(6px,0.8vw,10px)] rounded-full bg-red-500" />Keluar</span>
                </div>
            </div>

            {hasData ? (
                <div style={{ height: 'clamp(180px,28vw,320px)' }} className="w-full -ml-4 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} dy={10} />
                            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} tickFormatter={formatAxis} width={40} />
                            <Tooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '12px', padding: '10px 14px' }}
                                formatter={(value: any) => [formatRp(Number(value)), '']} />
                            <Area type="monotone" dataKey="income" name="Pemasukan" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }} />
                            <Area type="monotone" dataKey="expense" name="Pengeluaran" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" activeDot={{ r: 6, strokeWidth: 0, fill: '#ef4444' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div style={{ height: 'clamp(140px,22vw,280px)' }} className="flex items-center justify-center text-gray-400">
                    <div className="text-center"><p className="text-sm font-medium">Belum ada data grafik</p></div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-[clamp(12px,2vw,16px)] mt-[clamp(16px,2.5vw,24px)] pt-[clamp(16px,2.5vw,24px)] border-t border-gray-100">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100/50 rounded-2xl text-center shadow-sm" style={{ padding: 'clamp(12px,1.5vw,20px)' }}>
                    <div className="w-[clamp(24px,3.5vw,32px)] h-[clamp(24px,3.5vw,32px)] mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-[clamp(6px,1vw,12px)]">
                        <I.arrowDown className="w-[clamp(12px,1.5vw,16px)] h-[clamp(12px,1.5vw,16px)]" />
                    </div>
                    <p style={{ fontSize: 'clamp(9px,1.2vw,13px)' }} className="text-gray-500 font-medium mb-[clamp(2px,0.4vw,6px)]">Rata-rata Pemasukan / Bulan</p>
                    <p style={{ fontSize: 'clamp(13px,1.8vw,20px)' }} className="font-extrabold text-emerald-700 tracking-tight">{formatRp(avgIncome)}</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-100/50 rounded-2xl text-center shadow-sm" style={{ padding: 'clamp(12px,1.5vw,20px)' }}>
                    <div className="w-[clamp(24px,3.5vw,32px)] h-[clamp(24px,3.5vw,32px)] mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-[clamp(6px,1vw,12px)]">
                        <I.arrowUp className="w-[clamp(12px,1.5vw,16px)] h-[clamp(12px,1.5vw,16px)]" />
                    </div>
                    <p style={{ fontSize: 'clamp(9px,1.2vw,13px)' }} className="text-gray-500 font-medium mb-[clamp(2px,0.4vw,6px)]">Rata-rata Pengeluaran / Bulan</p>
                    <p style={{ fontSize: 'clamp(13px,1.8vw,20px)' }} className="font-extrabold text-red-600 tracking-tight">{formatRp(avgExpense)}</p>
                </div>
            </div>
        </div>
    );
}

function TransactionsCard({ recentTransactions }: Pick<Props, 'recentTransactions'>) {
    const [modalOpen, setModalOpen] = useState(false);
    const [exportType, setExportType] = useState('all');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const handlePrint = () => {
        let url = `/export/pdf`;
        const params = new URLSearchParams();
        if (exportType !== 'all') params.append('type', exportType);
        if (dateFrom) params.append('date_from', dateFrom);
        if (dateTo) params.append('date_to', dateTo);
        
        const qs = params.toString();
        if (qs) url += `?${qs}`;
        
        window.open(url, '_blank');
        setModalOpen(false);
    };

    return (
        <div id="transaksi" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between flex-wrap gap-4" style={{ padding: 'clamp(12px,2vw,24px) clamp(12px,2vw,24px) clamp(8px,1.2vw,16px)' }}>
                <h3 style={{ fontSize: 'clamp(12px,1.8vw,18px)' }} className="font-bold text-gray-900">Transaksi Terbaru</h3>
                <div className="flex items-center gap-[clamp(8px,1.5vw,16px)]">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-[clamp(3px,0.5vw,6px)] bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-lg transition-colors shadow-sm whitespace-nowrap"
                        style={{ padding: 'clamp(4px,0.8vw,10px) clamp(8px,1.5vw,16px)', fontSize: 'clamp(9px,1.2vw,13px)' }}
                    >
                        <I.document className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)]" />
                        Cetak Laporan
                    </button>
                </div>
            </div>

            <Modal show={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Cetak Laporan Keuangan</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Laporan</label>
                            <select
                                value={exportType}
                                onChange={(e) => setExportType(e.target.value)}
                                className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                            >
                                <option value="all">Semua Transaksi</option>
                                <option value="income">Pemasukan Saja</option>
                                <option value="expense">Pengeluaran Saja</option>
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="w-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">*Kosongkan tanggal jika ingin mencetak semua periode</p>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 flex items-center gap-2"
                        >
                            <I.document className="w-4 h-4" />
                            Cetak Sekarang
                        </button>
                    </div>
                </div>
            </Modal>
            {recentTransactions?.length > 0 ? (
                <div className="divide-y divide-gray-50">
                    {recentTransactions.slice(0, 4).map((t: any) => (
                        <div key={t.id} className="flex items-center gap-[clamp(6px,1vw,12px)] hover:bg-gray-50/60 transition-colors"
                            style={{ padding: 'clamp(8px,1.5vw,16px) clamp(12px,2vw,24px)' }}>
                            <div className={`w-[clamp(28px,4vw,40px)] h-[clamp(28px,4vw,40px)] rounded-full flex items-center justify-center shrink-0 ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}
                                style={{ fontSize: 'clamp(12px,1.8vw,18px)' }}>
                                {t.type === 'income' ? <I.arrowDown className="w-[clamp(10px,1.5vw,16px)] h-[clamp(10px,1.5vw,16px)]" /> : <I.arrowUp className="w-[clamp(10px,1.5vw,16px)] h-[clamp(10px,1.5vw,16px)]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p style={{ fontSize: 'clamp(8px,1.1vw,12px)' }} className="font-medium text-gray-400">{t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</p>
                                <p style={{ fontSize: 'clamp(10px,1.4vw,14px)' }} className="font-semibold text-gray-900 truncate">{t.description || t.category?.name || 'Transaksi'}</p>
                                <p style={{ fontSize: 'clamp(8px,1.1vw,12px)' }} className="text-gray-400 mt-[2px]">{t.category?.name ?? '-'}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p style={{ fontSize: 'clamp(8px,1vw,12px)' }} className="text-gray-400 mb-[2px]">{formatDate(t.date)}</p>
                                <p style={{ fontSize: 'clamp(10px,1.4vw,14px)' }} className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {t.type === 'income' ? '+' : '-'}{formatRp(t.amount)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-16 text-center text-gray-400 px-6">
                    <p className="text-sm font-medium">Belum ada transaksi</p>
                </div>
            )}
        </div>
    );
}

function OverviewSection({ monthly, income, expense, recentTransactions }: Pick<Props, 'monthly' | 'income' | 'expense' | 'recentTransactions'>) {
    return (
        <section className="max-w-7xl mx-auto px-[clamp(12px,3vw,24px)] py-[clamp(20px,4vw,56px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(16px,3vw,32px)]">
                <ChartCard monthly={monthly} income={income} expense={expense} />
                <TransactionsCard recentTransactions={recentTransactions} />
            </div>
        </section>
    );
}

function TrustSection() {
    const items = [
        { icon: <I.shield className="w-[clamp(18px,2.5vw,28px)] h-[clamp(18px,2.5vw,28px)]" />, title: 'Amanah', desc: 'Setiap dana dikelola dengan penuh amanah' },
        { icon: <I.document className="w-[clamp(18px,2.5vw,28px)] h-[clamp(18px,2.5vw,28px)]" />, title: 'Transparan', desc: 'Laporan terbuka dan dapat diakses kapan saja' },
        { icon: <I.check className="w-[clamp(18px,2.5vw,28px)] h-[clamp(18px,2.5vw,28px)]" />, title: 'Akuntabel', desc: 'Dipertanggungjawabkan secara jelas' },
        { icon: <I.users className="w-[clamp(18px,2.5vw,28px)] h-[clamp(18px,2.5vw,28px)]" />, title: 'Untuk Umat', desc: 'Didedikasikan untuk kemajuan dan kemaslahatan umat' },
    ];

    return (
        <section id="tentang" className="relative overflow-hidden bg-[#F3F8F5]" style={{ padding: 'clamp(32px,6vw,80px) 0' }}>
            <svg className="absolute right-0 bottom-0 w-[clamp(120px,20vw,288px)] h-[clamp(120px,20vw,288px)] text-emerald-900/[0.04] pointer-events-none" viewBox="0 0 200 200" fill="currentColor">
                <rect x="20" y="90" width="20" height="90" /><rect x="50" y="60" width="24" height="120" /><rect x="82" y="30" width="30" height="150" /><circle cx="97" cy="24" r="16" /><rect x="120" y="70" width="22" height="110" /><rect x="150" y="100" width="18" height="80" />
            </svg>
            <div className="max-w-4xl mx-auto px-[clamp(12px,3vw,24px)] text-center relative">
                <h2 style={{ fontSize: 'clamp(18px,2.8vw,32px)' }} className="font-extrabold text-gray-900 mb-[clamp(6px,1vw,12px)]">Transparansi untuk Kepercayaan</h2>
                <p style={{ fontSize: 'clamp(10px,1.3vw,16px)' }} className="text-gray-500 leading-relaxed max-w-2xl mx-auto mb-[clamp(24px,4vw,64px)]">
                    Kami percaya bahwa keterbukaan adalah kunci membangun kepercayaan. Setiap dana yang masuk dan keluar dikelola sesuai syariah.
                </p>
                <div className="grid grid-cols-4 gap-[clamp(12px,2vw,24px)]">
                    {items.map((item) => (
                        <div key={item.title} className="flex flex-col items-center">
                            <div className="w-[clamp(40px,6vw,56px)] h-[clamp(40px,6vw,56px)] rounded-2xl bg-white text-emerald-700 flex items-center justify-center shadow-sm mb-[clamp(8px,1.2vw,16px)]">
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: 'clamp(11px,1.5vw,16px)' }} className="font-bold text-gray-900 mb-[clamp(2px,0.4vw,4px)]">{item.title}</h3>
                            <p style={{ fontSize: 'clamp(9px,1.1vw,13px)' }} className="text-gray-500 leading-relaxed max-w-[clamp(80px,12vw,160px)]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function DonationBanner() {
    return (
        <section id="donasi" className="max-w-7xl mx-auto px-[clamp(12px,3vw,24px)]" style={{ paddingTop: 'clamp(20px,4vw,56px)', paddingBottom: 'clamp(20px,4vw,56px)' }}>
            <div className="rounded-3xl overflow-hidden grid grid-cols-2 shadow-lg">
                <div className="flex items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" style={{ padding: 'clamp(16px,3vw,40px)' }}>
                    <img src="/images/logo.png" alt="Masjid Darus Sa'adah" className="w-full max-w-[clamp(80px,14vw,240px)] h-auto object-contain" />
                </div>
                <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 flex flex-col justify-center" style={{ padding: 'clamp(16px,3vw,40px)' }}>
                    <div className="inline-flex items-center gap-[clamp(3px,0.5vw,8px)] self-start px-[clamp(6px,1vw,12px)] py-[clamp(2px,0.5vw,6px)] rounded-full bg-white/10 border border-white/15 text-white/90 font-medium mb-[clamp(8px,1.2vw,16px)]"
                        style={{ fontSize: 'clamp(8px,1.1vw,12px)' }}>
                        <I.heart className="w-[clamp(8px,1vw,14px)] h-[clamp(8px,1vw,14px)]" />Salurkan Kebaikan Anda
                    </div>
                    <h2 style={{ fontSize: 'clamp(14px,2.5vw,30px)' }} className="font-extrabold text-white mb-[clamp(4px,0.8vw,12px)] leading-tight">Bersama Membangun, Bersama Berkah</h2>
                    <p style={{ fontSize: 'clamp(9px,1.2vw,16px)' }} className="text-white/70 leading-relaxed mb-[clamp(8px,1.5vw,24px)] max-w-md">
                        Setiap donasi yang Anda berikan sangat berarti bagi pembangunan dan kegiatan Masjid Darus Sa'adah.
                    </p>
                    <a href="#kontak"
                        className="inline-flex items-center gap-[clamp(3px,0.5vw,8px)] self-start bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-full transition-colors"
                        style={{ padding: 'clamp(6px,1.2vw,14px) clamp(12px,2.5vw,24px)', fontSize: 'clamp(9px,1.2vw,14px)' }}>
                        <I.heart className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)]" /> Donasi Sekarang <I.arrowRight className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)]" />
                    </a>
                </div>
            </div>
        </section>
    );
}

function LocationCard() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm" style={{ padding: 'clamp(12px,2vw,24px)' }}>
            <div className="flex items-center gap-[clamp(4px,0.6vw,8px)] text-emerald-700 font-semibold mb-[clamp(8px,1.2vw,16px)]" style={{ fontSize: 'clamp(10px,1.3vw,14px)' }}>
                <I.mosque className="w-[clamp(12px,1.5vw,18px)] h-[clamp(12px,1.5vw,18px)]" />Lokasi Masjid
            </div>
            <h3 style={{ fontSize: 'clamp(11px,1.5vw,16px)' }} className="font-bold text-gray-900 mb-[clamp(2px,0.4vw,4px)]">Masjid Darus Sa'adah</h3>
            <p style={{ fontSize: 'clamp(9px,1.2vw,14px)' }} className="text-gray-500 leading-relaxed mb-[clamp(8px,1.5vw,16px)]">
                Jl. Masjid No. 123, Kec. Sejahtera,<br />Kota Bahagia, Prov. Jawa Timur 12345
            </p>
            <div className="relative rounded-xl bg-[#EAF1EC] overflow-hidden mb-[clamp(8px,1.5vw,16px)]" style={{ height: 'clamp(60px,10vw,128px)' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 130">
                    <line x1="0" y1="30" x2="300" y2="10" stroke="#D8E4DB" strokeWidth="6" />
                    <line x1="0" y1="90" x2="300" y2="110" stroke="#D8E4DB" strokeWidth="6" />
                    <line x1="60" y1="0" x2="90" y2="130" stroke="#D8E4DB" strokeWidth="5" />
                    <line x1="220" y1="0" x2="200" y2="130" stroke="#D8E4DB" strokeWidth="5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative"><div className="absolute -inset-3 bg-emerald-700/15 rounded-full" /><I.pin className="w-[clamp(18px,3vw,32px)] h-[clamp(18px,3vw,32px)] text-emerald-700 relative drop-shadow" /></div>
                </div>
            </div>
            <a href="https://maps.google.com/?q=Masjid+Darus+Sa%27adah" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-[clamp(4px,0.6vw,8px)] w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl transition-colors"
                style={{ padding: 'clamp(8px,1.5vw,14px) clamp(12px,2vw,20px)', fontSize: 'clamp(9px,1.2vw,14px)' }}>
                <I.pin className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)]" /> Lihat di Google Maps
            </a>
        </div>
    );
}

function PrayerTimesCard() {
    const times = [
        { name: 'Subuh', time: '04:24', accent: true }, { name: 'Dzuhur', time: '11:45' },
        { name: 'Ashar', time: '15:03' }, { name: 'Maghrib', time: '17:32' }, { name: 'Isya', time: '18:47' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm" style={{ padding: 'clamp(12px,2vw,24px)' }}>
            <div className="flex items-center justify-between mb-[clamp(12px,2vw,24px)]">
                <div className="flex items-center gap-[clamp(4px,0.6vw,8px)] text-gray-900 font-semibold" style={{ fontSize: 'clamp(10px,1.3vw,14px)' }}>
                    <I.clock className="w-[clamp(12px,1.5vw,18px)] h-[clamp(12px,1.5vw,18px)] text-emerald-700" />Waktu Sholat Hari Ini
                </div>
                <span style={{ fontSize: 'clamp(8px,1vw,12px)' }} className="text-gray-400">{formatDate(new Date())}</span>
            </div>
            <div className="grid grid-cols-5 gap-[clamp(4px,1vw,12px)]">
                {times.map((t) => (
                    <div key={t.name} className="text-center">
                        <p style={{ fontSize: 'clamp(8px,1vw,12px)' }} className="text-gray-400 mb-[clamp(2px,0.3vw,4px)]">{t.name}</p>
                        <p style={{ fontSize: 'clamp(11px,1.8vw,18px)' }} className={`font-bold ${t.accent ? 'text-blue-600' : 'text-gray-900'}`}>{t.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function InfoSection() {
    return (
        <section id="kontak" className="max-w-7xl mx-auto px-[clamp(12px,3vw,24px)]" style={{ paddingBottom: 'clamp(32px,6vw,80px)' }}>
            <div className="grid grid-cols-2 gap-[clamp(12px,2vw,24px)]">
                <LocationCard />
                <PrayerTimesCard />
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-emerald-950 text-emerald-100/70">
            <div className="max-w-7xl mx-auto px-[clamp(12px,3vw,24px)]">
                <div className="grid grid-cols-4 gap-[clamp(16px,3vw,40px)]" style={{ padding: 'clamp(24px,5vw,64px) 0' }}>
                    <div>
                        <div className="flex items-center gap-[clamp(4px,0.6vw,12px)] mb-[clamp(8px,1.2vw,16px)]">
                            <div className="w-[clamp(24px,3.5vw,36px)] h-[clamp(24px,3.5vw,36px)] rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-emerald-950 shrink-0">
                                <I.mosque className="w-[clamp(12px,1.8vw,20px)] h-[clamp(12px,1.8vw,20px)]" />
                            </div>
                            <div>
                                <p style={{ fontSize: 'clamp(9px,1.3vw,14px)' }} className="font-bold text-white">Masjid Darus Sa'adah</p>
                                <p style={{ fontSize: 'clamp(7px,1vw,11px)' }} className="text-emerald-100/50">Transparansi Keuangan</p>
                            </div>
                        </div>
                        <p style={{ fontSize: 'clamp(8px,1.1vw,13px)' }} className="leading-relaxed">
                            Bersama membangun masjid karena Allah, maka Allah akan membangunkan baginya rumah di surga.
                        </p>
                        <p style={{ fontSize: 'clamp(7px,0.9vw,11px)' }} className="text-emerald-100/40 mt-[clamp(4px,0.6vw,8px)]">(HR. Bukhari &amp; Muslim)</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: 'clamp(9px,1.2vw,14px)' }} className="font-semibold text-white mb-[clamp(8px,1.2vw,16px)]">Menu</h4>
                        <ul className="space-y-[clamp(4px,0.5vw,10px)]" style={{ fontSize: 'clamp(8px,1.1vw,13px)' }}>
                            {['Beranda', 'Laporan', 'Transaksi', 'Donasi', 'Tentang', 'Kontak'].map((m) => (
                                <li key={m}><a href={`#${m.toLowerCase()}`} className="hover:text-white transition-colors">{m}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: 'clamp(9px,1.2vw,14px)' }} className="font-semibold text-white mb-[clamp(8px,1.2vw,16px)]">Laporan</h4>
                        <ul className="space-y-[clamp(4px,0.5vw,10px)]" style={{ fontSize: 'clamp(8px,1.1vw,13px)' }}>
                            {['Pemasukan', 'Pengeluaran', 'Laporan Bulanan', 'Unduh Laporan'].map((m) => (
                                <li key={m}><a href="#laporan" className="hover:text-white transition-colors">{m}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: 'clamp(9px,1.2vw,14px)' }} className="font-semibold text-white mb-[clamp(8px,1.2vw,16px)]">Kontak Kami</h4>
                        <ul className="space-y-[clamp(6px,0.8vw,12px)]" style={{ fontSize: 'clamp(8px,1.1vw,13px)' }}>
                            <li className="flex items-center gap-[clamp(4px,0.6vw,10px)]"><I.phone className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)] text-emerald-100/40 shrink-0" />0812-3456-7890</li>
                            <li className="flex items-center gap-[clamp(4px,0.6vw,10px)]"><I.mail className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)] text-emerald-100/40 shrink-0" />info@masjiddarussaadah.or.id</li>
                            <li className="flex items-start gap-[clamp(4px,0.6vw,10px)]"><I.pin className="w-[clamp(10px,1.3vw,16px)] h-[clamp(10px,1.3vw,16px)] text-emerald-100/40 shrink-0 mt-[2px]" />Jl. Masjid No. 123, Kota Bahagia</li>
                        </ul>
                        <div className="flex items-center gap-[clamp(4px,0.6vw,12px)] mt-[clamp(12px,2vw,20px)]">
                            {['f', 'ig', 'yt'].map((s) => (
                                <span key={s} className="w-[clamp(24px,3.5vw,32px)] h-[clamp(24px,3.5vw,32px)] rounded-full bg-white/10 flex items-center justify-center font-semibold text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
                                    style={{ fontSize: 'clamp(7px,1vw,11px)' }}>{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-[clamp(8px,1.5vw,16px)] py-[clamp(8px,1.5vw,20px)] border-t border-white/10"
                    style={{ fontSize: 'clamp(7px,0.9vw,12px)' }}>
                    <p className="text-emerald-100/40">&copy; {new Date().getFullYear()} Masjid Darus Sa'adah.</p>
                    <p className="text-emerald-100/40">Dikelola oleh Panitia Maulid Nabi ﷺ</p>
                </div>
            </div>
        </footer>
    );
}

export default function LandingPage({ income, expense, balance, count, recentTransactions, monthly }: Props) {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Head title="Masjid Darus Sa'adah - Transparansi Keuangan Maulid Nabi" />
            <Navbar />
            <Hero />
            <StatsRow income={income} expense={expense} balance={balance} />
            <OverviewSection monthly={monthly} income={income} expense={expense} recentTransactions={recentTransactions} />
            <TrustSection />
            <DonationBanner />
            <InfoSection />
            <Footer />
        </div>
    );
}
