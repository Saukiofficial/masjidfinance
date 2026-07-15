import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import {
    TrendingUp, TrendingDown, Wallet, FileText,
    Users, Upload, Calendar, Clock, ArrowRight,
} from 'lucide-react';

interface Props {
    income: number; expense: number; balance: number;
    incomeToday: number; expenseToday: number;
    recentTransactions: any[];
    incomeByCategory: any[];
    expenseByCategory: any[];
    monthly: Record<string, any[]>;
}

function formatRp(n: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

function formatShort(n: number) {
    if (n >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(1)}JT`;
    if (n >= 1_000) return `Rp${(n / 1_000).toFixed(0)}RB`;
    return `Rp${n}`;
}

function HeroCard({ userName }: { userName: string }) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 text-white"
            style={{ padding: 'clamp(16px, 3vw, 32px)' }}>
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full border-[20px] border-white/20" />
                <div className="absolute -right-20 -bottom-10 w-60 h-60 rounded-full border-[30px] border-white/10" />
            </div>
            <div className="relative flex items-center justify-between gap-4 sm:gap-6">
                <div className="space-y-1 sm:space-y-2 min-w-0">
                    <p style={{ fontSize: 'clamp(12px, 2vw, 14px)' }} className="text-emerald-100/80 font-medium">Assalamu'alaikum,</p>
                    <h2 style={{ fontSize: 'clamp(18px, 3.5vw, 24px)' }} className="font-bold leading-tight">{userName} 👋</h2>
                    <p style={{ fontSize: 'clamp(11px, 1.6vw, 14px)' }} className="text-emerald-100/70 max-w-md leading-relaxed">
                        Semoga hari ini penuh berkah dan seluruh aktivitas masjid berjalan lancar.
                    </p>
                </div>
                <img src="/images/logo.png" alt="" className="w-[clamp(48px,10vw,96px)] h-[clamp(48px,10vw,96px)] object-contain opacity-90 shrink-0" />
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color, change, chartColor }: { icon: any; label: string; value: string; color: string; change: string; chartColor: string }) {
    const sparkData = useMemo(() => ({
        series: [{ data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 50) + 20) }],
        options: { chart: { sparkline: { enabled: true } }, colors: [chartColor], stroke: { width: 2, curve: 'smooth' as const }, fill: { opacity: 0 } },
    }), []);

    const colorMap: Record<string, string> = {
        emerald: 'from-emerald-500 to-emerald-600', red: 'from-red-500 to-red-600',
        blue: 'from-blue-500 to-blue-600', orange: 'from-orange-500 to-orange-600',
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            style={{ padding: 'clamp(10px, 2vw, 20px)' }}>
            <div className="flex items-center justify-between mb-2 sm:mb-3 gap-1.5">
                <div className={`w-[clamp(28px,5vw,44px)] h-[clamp(28px,5vw,44px)] rounded-xl bg-gradient-to-br ${colorMap[color] || colorMap.emerald} flex items-center justify-center text-white shadow-sm shrink-0`}>
                    <Icon className="w-[clamp(14px,2.2vw,20px)] h-[clamp(14px,2.2vw,20px)]" />
                </div>
                <div className="w-[clamp(48px,10vw,80px)] shrink-0">
                    <Chart options={sparkData.options} series={sparkData.series} type="line" height={clampSparkHeight()} width={clampSparkWidth()} />
                </div>
            </div>
            <p style={{ fontSize: 'clamp(10px,1.4vw,14px)' }} className="text-gray-500 font-medium mb-0.5 sm:mb-1">{label}</p>
            <p style={{ fontSize: 'clamp(12px,2.5vw,22px)', lineHeight: '1.2' }} className="font-bold text-gray-900 tracking-tight mb-0.5 sm:mb-1 break-words hyphens-auto">{value}</p>
            <span style={{ fontSize: 'clamp(9px,1.2vw,13px)' }} className={`font-semibold ${change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{change}</span>
        </div>
    );
}
function clampSparkHeight() { return Math.max(24, Math.min(32, window.innerWidth * 0.04)); }
function clampSparkWidth() { return Math.max(48, Math.min(80, window.innerWidth * 0.15)); }

function ChartSection({ monthly }: { monthly: Record<string, any[]> }) {
    const { chartData, hasData } = useMemo(() => {
        const entries = Object.entries(monthly ?? {});
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const data = entries.map(([month, items]) => {
            const inc = items.find((i: any) => i.type === 'income')?.total ?? 0;
            const exp = items.find((i: any) => i.type === 'expense')?.total ?? 0;
            const [, m] = month.split('-');
            return { month: monthNames[parseInt(m) - 1] || month, income: inc, expense: exp };
        });
        return { chartData: data, hasData: data.length > 0 };
    }, [monthly]);

    const series = [
        { name: 'Pemasukan', data: chartData.map((d) => d.income), color: '#16A34A' },
        { name: 'Pengeluaran', data: chartData.map((d) => d.expense), color: '#EF4444' },
    ];

    const options = {
        chart: { type: 'area' as const, toolbar: { show: false }, fontFamily: 'inherit' },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' as const, width: 2 },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.25, opacityTo: 0 } },
        xaxis: { categories: chartData.map((d) => d.month), axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#9CA3AF', fontSize: '10px' } } },
        yaxis: { labels: { formatter: (v: number) => formatShort(v), style: { colors: '#9CA3AF', fontSize: '10px' }, maxWidth: 36 } },
        grid: { borderColor: '#F3F4F6', strokeDashArray: 3 },
        tooltip: { y: { formatter: (v: number) => formatRp(v) }, style: { fontSize: '11px' } },
        legend: { show: false },
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200/60" style={{ padding: 'clamp(14px, 2.2vw, 24px)' }}>
            <div className="flex items-start sm:items-center justify-between mb-4 gap-3">
                <div className="min-w-0">
                    <h3 style={{ fontSize: 'clamp(13px, 2vw, 16px)' }} className="font-bold text-gray-900">Grafik Keuangan</h3>
                    <p style={{ fontSize: 'clamp(11px, 1.5vw, 14px)' }} className="text-gray-400 mt-0.5">Pemasukan &amp; Pengeluaran</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                    {['7H', '30H', '90H', '1Y'].map((p) => (
                        <button key={p}
                            style={{ padding: 'clamp(4px,1vw,10px) clamp(6px,1.4vw,12px)', fontSize: 'clamp(10px,1.4vw,13px)' }}
                            className={`rounded-lg font-semibold transition-colors ${p === '1Y' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-400 hover:text-gray-600'}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>
            {hasData ? (
                <Chart options={options} series={series} type="area" height={clampChartHeight()} />
            ) : (
                <div style={{ height: clampChartHeight() }} className="flex items-center justify-center text-gray-400 text-sm">Belum ada data</div>
            )}
            <div style={{ fontSize: 'clamp(10px,1.4vw,13px)' }} className="flex items-center gap-4 mt-3 pt-3 sm:pt-4 border-t border-gray-100 text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Pemasukan</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" />Pengeluaran</span>
            </div>
        </div>
    );
}
function clampChartHeight() { return Math.max(160, Math.min(280, window.innerWidth * 0.45)); }
function clampDonutHeight() { return Math.max(120, Math.min(200, window.innerWidth * 0.35)); }

function MonthlySummary({ income, expense, balance }: { income: number; expense: number; balance: number }) {
    const total = income + expense;
    const incomePct = total > 0 ? Math.round((income / total) * 100) : 0;
    const expensePct = total > 0 ? Math.round((expense / total) * 100) : 0;
    const series = [income, expense];
    const options = {
        chart: { type: 'donut' as const, fontFamily: 'inherit' },
        labels: ['Pemasukan', 'Pengeluaran'], colors: ['#16A34A', '#EF4444'],
        dataLabels: { enabled: false }, legend: { show: false },
        plotOptions: { pie: { donut: { size: '70%', labels: { show: true, name: { show: false }, value: { show: false }, total: { show: true, label: 'Total', formatter: () => formatShort(income + expense), fontSize: '11px', fontWeight: 600, color: '#111827' } } } } },
        stroke: { show: false },
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200/60" style={{ padding: 'clamp(14px, 2.2vw, 24px)' }}>
            <h3 style={{ fontSize: 'clamp(13px, 2vw, 16px)' }} className="font-bold text-gray-900 mb-3 sm:mb-4">Ringkasan Bulanan</h3>
            <div className="flex justify-center">
                <Chart options={options} series={series} type="donut" height={clampDonutHeight()} width={clampDonutHeight()} />
            </div>
            <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4" style={{ fontSize: 'clamp(12px,1.6vw,14px)' }}>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Pemasukan</span>
                    <span className="font-semibold text-gray-900">{incomePct}%</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500" />Pengeluaran</span>
                    <span className="font-semibold text-gray-900">{expensePct}%</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" />Saldo</span>
                    <span className="font-bold text-gray-900">{formatShort(balance)}</span>
                </div>
            </div>
        </div>
    );
}

function ReminderWidget() {
    const items = [
        { icon: FileText, title: 'Laporan Bulanan', desc: 'Laporan bulan ini perlu ditutup', days: 3, color: 'text-orange-500', bg: 'bg-orange-50' },
        { icon: Calendar, title: 'Jumat Berkah', desc: 'Donasi Jumat mendatang', days: 2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { icon: Clock, title: 'Arsip Transaksi', desc: 'Arsip bulan lalu', days: 7, color: 'text-blue-500', bg: 'bg-blue-50' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-200/60 mt-4 sm:mt-5" style={{ padding: 'clamp(14px, 2.2vw, 24px)' }}>
            <h3 style={{ fontSize: 'clamp(13px, 2vw, 16px)' }} className="font-bold text-gray-900 mb-3 sm:mb-4">Pengingat</h3>
            <div className="space-y-2 sm:space-y-3">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className={`w-[clamp(32px,4.5vw,36px)] h-[clamp(32px,4.5vw,36px)] rounded-lg ${item.bg} flex items-center justify-center ${item.color} shrink-0`}>
                            <item.icon className="w-[clamp(14px,2vw,16px)] h-[clamp(14px,2vw,16px)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p style={{ fontSize: 'clamp(12px,1.6vw,14px)' }} className="font-semibold text-gray-900">{item.title}</p>
                            <p style={{ fontSize: 'clamp(11px,1.4vw,13px)' }} className="text-gray-500">{item.desc}</p>
                        </div>
                        <span style={{ fontSize: 'clamp(10px,1.3vw,12px)' }} className="font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg shrink-0">{item.days} hr</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function LatestTransactions({ recentTransactions }: { recentTransactions: any[] }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden">
            <div className="flex items-center justify-between" style={{ padding: 'clamp(14px,2.2vw,24px) clamp(14px,2.2vw,24px) 0' }}>
                <h3 style={{ fontSize: 'clamp(13px, 2vw, 16px)' }} className="font-bold text-gray-900">Transaksi Terbaru</h3>
                <Link href={route('transactions.index')} style={{ fontSize: 'clamp(11px,1.5vw,14px)' }}
                    className="font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 shrink-0">
                    Lihat Semua <ArrowRight className="w-[clamp(12px,1.6vw,16px)] h-[clamp(12px,1.6vw,16px)]" />
                </Link>
            </div>
            {recentTransactions?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full" style={{ fontSize: 'clamp(11px,1.5vw,14px)' }}>
                        <thead className="border-t border-gray-100">
                            <tr className="text-left text-gray-400 font-semibold uppercase tracking-wider" style={{ fontSize: 'clamp(9px,1.2vw,12px)' }}>
                                <th style={{ padding: 'clamp(10px,1.5vw,16px) clamp(10px,1.5vw,16px)' }}>Keterangan</th>
                                <th className="hidden sm:table-cell" style={{ padding: 'clamp(10px,1.5vw,16px)' }}>Kategori</th>
                                <th className="hidden sm:table-cell" style={{ padding: 'clamp(10px,1.5vw,16px)' }}>Tanggal</th>
                                <th style={{ padding: 'clamp(10px,1.5vw,16px)' }} className="text-right">Jumlah</th>
                                <th style={{ padding: 'clamp(10px,1.5vw,16px)' }} className="text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentTransactions.slice(0, 5).map((t: any) => (
                                <tr key={t.id} className="hover:bg-gray-50/60 transition-colors">
                                    <td style={{ padding: 'clamp(10px,1.5vw,16px) clamp(10px,1.5vw,16px)' }}>
                                        <p className="font-semibold text-gray-900 truncate max-w-[clamp(80px,20vw,200px)] leading-tight">
                                            {t.description || t.category?.name || 'Transaksi'}
                                        </p>
                                    </td>
                                    <td className="hidden sm:table-cell text-gray-500" style={{ padding: 'clamp(10px,1.5vw,16px)' }}>{t.category?.name ?? '-'}</td>
                                    <td className="hidden sm:table-cell text-gray-500" style={{ padding: 'clamp(10px,1.5vw,16px)' }}>{t.date}</td>
                                    <td style={{ padding: 'clamp(10px,1.5vw,16px)' }}
                                        className={`text-right font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {t.type === 'income' ? '+' : '-'}{formatShort(t.amount)}
                                    </td>
                                    <td style={{ padding: 'clamp(10px,1.5vw,16px)' }} className="text-right">
                                        <span className={`inline-flex items-center rounded-lg font-semibold border ${
                                            t.type === 'income' ? 'bg-green-50 text-emerald-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
                                        }`} style={{ padding: 'clamp(2px,0.6vw,4px) clamp(6px,1.2vw,10px)', fontSize: 'clamp(9px,1.2vw,11px)' }}>
                                            {t.type === 'income' ? 'Masuk' : 'Keluar'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="py-10 text-center text-gray-400 text-sm" style={{ padding: 'clamp(24px,5vw,48px) clamp(14px,2.2vw,24px)' }}>
                    Belum ada transaksi
                </div>
            )}
        </div>
    );
}

function QuickActions() {
    const actions = [
        { icon: TrendingUp, label: 'Tambah Pemasukan', href: route('transactions.create', 'income'), color: 'from-emerald-500 to-emerald-600' },
        { icon: TrendingDown, label: 'Tambah Pengeluaran', href: route('transactions.create', 'expense'), color: 'from-red-500 to-red-600' },
        { icon: FileText, label: 'Buat Laporan', href: route('reports.index'), color: 'from-blue-500 to-blue-600' },
        { icon: Users, label: 'Kelola Jamaah', href: '#', color: 'from-purple-500 to-purple-600' },
        { icon: Upload, label: 'Upload Mutasi', href: '#', color: 'from-orange-500 to-orange-600' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-200/60" style={{ padding: 'clamp(14px, 2.2vw, 24px)' }}>
            <h3 style={{ fontSize: 'clamp(13px, 2vw, 16px)' }} className="font-bold text-gray-900 mb-3 sm:mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                {actions.map((a, i) => (
                    <Link key={i} href={a.href}
                        className="flex flex-col items-center justify-center rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                        style={{ padding: 'clamp(10px,2vw,16px)' }}>
                        <div className={`w-[clamp(36px,5.5vw,48px)] h-[clamp(36px,5.5vw,48px)] rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                            <a.icon className="w-[clamp(16px,2.5vw,20px)] h-[clamp(16px,2.5vw,20px)]" />
                        </div>
                        <span style={{ fontSize: 'clamp(10px,1.4vw,13px)' }} className="font-semibold text-gray-700 text-center leading-tight mt-2">{a.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function Dashboard({ income, expense, balance, incomeToday, expenseToday, recentTransactions, monthly }: Props) {
    const { auth } = usePage().props as any;
    const userName = auth?.user?.name ?? 'Admin';

    return (
        <AuthenticatedLayout title="Dashboard">
            <Head title="Dashboard" />
            <div className="space-y-[clamp(16px,3vw,24px)]">
                <HeroCard userName={userName} />

                <div className="grid grid-cols-3 gap-[clamp(8px,2vw,20px)]">
                    <StatCard icon={TrendingUp} label="Total Pemasukan" value={formatRp(income)} color="emerald" change="+12.5%" chartColor="#16A34A" />
                    <StatCard icon={TrendingDown} label="Total Pengeluaran" value={formatRp(expense)} color="red" change="+8.2%" chartColor="#EF4444" />
                    <StatCard icon={Wallet} label="Saldo Kas" value={formatRp(balance)} color="blue" change={balance >= 0 ? '+15.3%' : '-2.1%'} chartColor="#3B82F6" />
                </div>

                <div className="grid grid-cols-1 gap-[clamp(16px,3vw,24px)]">
                    <ChartSection monthly={monthly} />
                    <MonthlySummary income={income} expense={expense} balance={balance} />
                </div>

                <ReminderWidget />

                <LatestTransactions recentTransactions={recentTransactions} />
                <QuickActions />
            </div>
        </AuthenticatedLayout>
    );
}
