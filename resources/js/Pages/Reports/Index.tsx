import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Transaction {
    id: number; type: string; amount: number; description: string | null;
    date: string; category: { id: number; name: string } | null;
    foto: string | null;
}
interface Props {
    income: number; expense: number;
    byCategory: { category: { id: number; name: string } | null; type: string; total: number }[];
    transactions: Transaction[];
}

function formatRp(n: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}
function formatDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ReportIndex({ income, expense, byCategory, transactions }: Props) {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const balance = income - expense;

    const applyFilter = () => {
        router.get(route('reports.index'), { date_from: dateFrom, date_to: dateTo }, { preserveState: true, replace: true });
    };

    const openFoto = (foto: string) => window.open(`/storage/${foto}`, '_blank');

    return (
        <AuthenticatedLayout title="Laporan">
            <Head title="Laporan" />

            <div className="flex items-center justify-between mb-5 gap-3">
                <h1 style={{ fontSize: 'clamp(18px,4vw,24px)' }} className="font-bold text-gray-900">Laporan</h1>
                <div className="flex gap-2 shrink-0">
                    <a href={route('export.pdf', { date_from: dateFrom, date_to: dateTo })}
                        className="border border-red-300 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition-colors"
                        style={{ fontSize: 'clamp(11px,2.5vw,14px)', padding: 'clamp(6px,1.5vw,10px) clamp(10px,2.5vw,16px)' }}>PDF</a>
                    <a href={route('export.excel', { date_from: dateFrom, date_to: dateTo })}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
                        style={{ fontSize: 'clamp(11px,2.5vw,14px)', padding: 'clamp(6px,1.5vw,10px) clamp(10px,2.5vw,16px)' }}>Excel</a>
                </div>
            </div>

            {/* Filter */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end mb-5">
                <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Dari</label>
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all" />
                </div>
                <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Sampai</label>
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all" />
                </div>
                <button onClick={applyFilter}
                    className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold rounded-xl transition-colors"
                    style={{ fontSize: 'clamp(12px,2.5vw,14px)', padding: 'clamp(8px,2vw,10px) clamp(14px,3vw,20px)' }}>Terapkan</button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-[clamp(8px,2vw,16px)] mb-5">
                <div className="bg-white rounded-2xl border border-gray-200/60" style={{ padding: 'clamp(12px,2.5vw,20px)' }}>
                    <p style={{ fontSize: 'clamp(11px,2.2vw,14px)' }} className="text-gray-500 font-medium mb-1">Pemasukan</p>
                    <p style={{ fontSize: 'clamp(14px,3vw,20px)' }} className="font-bold text-emerald-600 truncate">{formatRp(income)}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200/60" style={{ padding: 'clamp(12px,2.5vw,20px)' }}>
                    <p style={{ fontSize: 'clamp(11px,2.2vw,14px)' }} className="text-gray-500 font-medium mb-1">Pengeluaran</p>
                    <p style={{ fontSize: 'clamp(14px,3vw,20px)' }} className="font-bold text-red-500 truncate">{formatRp(expense)}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200/60" style={{ padding: 'clamp(12px,2.5vw,20px)' }}>
                    <p style={{ fontSize: 'clamp(11px,2.2vw,14px)' }} className="text-gray-500 font-medium mb-1">Saldo</p>
                    <p style={{ fontSize: 'clamp(14px,3vw,20px)' }} className={`font-bold truncate ${balance >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{formatRp(balance)}</p>
                </div>
            </div>

            {/* Per Kategori */}
            <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden mb-5">
                <div className="border-b border-gray-100" style={{ padding: 'clamp(12px,2.5vw,16px) clamp(14px,3vw,20px)' }}>
                    <h2 style={{ fontSize: 'clamp(13px,2.8vw,16px)' }} className="font-bold text-gray-900">Per Kategori</h2>
                </div>
                {byCategory.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                        {byCategory.map((item, i) => (
                            <div key={i} className="flex items-center justify-between" style={{ padding: 'clamp(10px,2vw,16px) clamp(14px,3vw,20px)' }}>
                                <div className="flex items-center gap-[clamp(6px,1.5vw,12px)] min-w-0 flex-1">
                                    <div className={`w-[clamp(32px,6vw,40px)] h-[clamp(32px,6vw,40px)] rounded-xl flex items-center justify-center shrink-0 ${item.type === 'income' ? 'bg-green-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                                        <svg className="w-[clamp(14px,2.5vw,18px)] h-[clamp(14px,2.5vw,18px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                            {item.type === 'income'
                                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                                : <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.95 11.95 0 014.306 6.43l.776 2.898m0 0l-2.898-.776m2.898.776l.776-2.898" />
                                            }
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p style={{ fontSize: 'clamp(12px,2.5vw,14px)' }} className="font-semibold text-gray-900 truncate">{item.category?.name ?? 'Tanpa Kategori'}</p>
                                        <span className={`inline-flex items-center rounded-full text-xs font-semibold border ${item.type === 'income' ? 'bg-green-50 text-emerald-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}
                                            style={{ padding: 'clamp(1px,0.4vw,3px) clamp(6px,1.2vw,10px)', fontSize: 'clamp(9px,2vw,11px)' }}>
                                            {item.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                                        </span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 'clamp(12px,2.5vw,14px)' }} className="font-bold text-gray-900 shrink-0 ml-2">{formatRp(item.total)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-400 text-sm">Belum ada data</div>
                )}
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden">
                <div className="border-b border-gray-100" style={{ padding: 'clamp(12px,2.5vw,16px) clamp(14px,3vw,20px)' }}>
                    <h2 style={{ fontSize: 'clamp(13px,2.8vw,16px)' }} className="font-bold text-gray-900">Riwayat Transaksi</h2>
                </div>
                {transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="text-left font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: 'clamp(9px,2vw,11px)', padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }}>Ktg</th>
                                    <th className="text-left font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: 'clamp(9px,2vw,11px)', padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }}>Tipe</th>
                                    <th className="text-right font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: 'clamp(9px,2vw,11px)', padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }}>Jumlah</th>
                                    <th className="text-left font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell" style={{ fontSize: 'clamp(9px,2vw,11px)', padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }}>Tgl</th>
                                    <th className="text-center font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: 'clamp(9px,2vw,11px)', padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }}>File</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td style={{ fontSize: 'clamp(11px,2.3vw,13px)', padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }} className="font-semibold text-gray-900">{t.category?.name ?? '—'}</td>
                                        <td style={{ padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }}>
                                            <span className={`inline-flex items-center rounded-lg font-semibold border ${t.type === 'income' ? 'bg-green-50 text-emerald-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}
                                                style={{ padding: 'clamp(1px,0.4vw,4px) clamp(4px,0.8vw,8px)', fontSize: 'clamp(9px,2vw,11px)' }}>
                                                {t.type === 'income' ? 'Masuk' : 'Keluar'}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: 'clamp(11px,2.3vw,13px)', padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }}
                                            className={`text-right font-semibold whitespace-nowrap ${t.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                                            {t.type === 'income' ? '+' : '-'}{formatRp(t.amount)}
                                        </td>
                                        <td style={{ fontSize: 'clamp(10px,2vw,12px)', padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }} className="text-gray-500 hidden sm:table-cell">{formatDate(t.date)}</td>
                                        <td style={{ padding: 'clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px)' }} className="text-center">
                                            {t.foto ? (
                                                <button onClick={() => openFoto(t.foto!)}
                                                    className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold"
                                                    style={{ fontSize: 'clamp(10px,2vw,12px)' }}>
                                                    <svg className="w-[clamp(12px,2.2vw,16px)] h-[clamp(12px,2.2vw,16px)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                                                    </svg>
                                                    Lihat
                                                </button>
                                            ) : (
                                                <span className="text-gray-300" style={{ fontSize: 'clamp(10px,2vw,12px)' }}>—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-12 text-center text-gray-400 text-sm">Belum ada transaksi</div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
