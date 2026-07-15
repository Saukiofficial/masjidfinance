import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Transaction {
    id: number; type: string; amount: number; description: string | null;
    date: string; category: { id: number; name: string } | null;
    panitia: string | null; jumlah_donatur: number | null; foto: string | null;
}

interface Props {
    transactions: { data: Transaction[]; current_page: number; last_page: number; total: number; };
}

function formatRp(n: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}
function formatDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function TransactionIndex({ transactions }: Props) {
    const [filters, setFilters] = useState({ type: '', search: '' });

    const applyFilters = () => {
        router.get(route('transactions.index'), filters, { preserveState: true, replace: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus transaksi ini?')) router.delete(route('transactions.destroy', id));
    };

    return (
        <AuthenticatedLayout title="Transaksi">
            <Head title="Transaksi" />

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-900">Transaksi</h1>
                <div className="flex gap-2">
                    <Link href={route('transactions.create', 'income')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                    >+ Masuk</Link>
                    <Link href={route('transactions.create', 'expense')}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                    >+ Keluar</Link>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5">
                <input type="text" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="Cari..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
                <select value={filters.type}
                    onChange={(e) => { setFilters({ ...filters, type: e.target.value }); router.get(route('transactions.index'), { ...filters, type: e.target.value }, { preserveState: true, replace: true }); }}
                    className="w-28 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all appearance-none bg-white"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                >
                    <option value="">Semua</option>
                    <option value="income">Masuk</option>
                    <option value="expense">Keluar</option>
                </select>
                <button onClick={applyFilters}
                    className="border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >Filter</button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden">
                {transactions.data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="text-left px-2 sm:px-4 py-3.5 font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: 'clamp(9px,2.2vw,12px)' }}>Ktg</th>
                                    <th className="text-left px-2 sm:px-4 py-3.5 font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: 'clamp(9px,2.2vw,12px)' }}>Tipe</th>
                                    <th className="text-right px-2 sm:px-4 py-3.5 font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: 'clamp(9px,2.2vw,12px)' }}>Jumlah</th>
                                    <th className="text-left px-2 sm:px-4 py-3.5 font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: 'clamp(9px,2.2vw,12px)' }}>Tgl</th>
                                    <th className="text-right px-3 sm:px-5 py-3.5 font-semibold text-gray-500 uppercase tracking-wider" style={{ fontSize: 'clamp(9px,2.2vw,12px)' }}>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.data.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-2 sm:px-4 py-4 text-gray-900 font-semibold" style={{ fontSize: 'clamp(10px,2.5vw,13px)' }}>{t.category?.name ?? '—'}</td>
                                        <td className="px-2 sm:px-4 py-4">
                                            <span className={`inline-flex items-center rounded-lg font-semibold border ${
                                                t.type === 'income'
                                                    ? 'bg-green-50 text-emerald-700 border-green-200'
                                                    : 'bg-red-50 text-red-600 border-red-200'
                                            }`}
                                            style={{ padding: 'clamp(1px,0.5vw,4px) clamp(3px,0.8vw,8px)', fontSize: 'clamp(8px,2vw,11px)' }}>
                                                {t.type === 'income' ? 'Masuk' : 'Keluar'}
                                            </span>
                                        </td>
                                        <td className={`px-2 sm:px-4 py-4 text-right font-semibold whitespace-nowrap ${
                                            t.type === 'income' ? 'text-emerald-600' : 'text-red-500'
                                        }`} style={{ fontSize: 'clamp(10px,2.5vw,14px)' }}>
                                            {t.type === 'income' ? '+' : '-'}{formatRp(t.amount)}
                                        </td>
                                        <td className="px-2 sm:px-4 py-4 text-gray-500" style={{fontSize:"clamp(9px,2.2vw,12px)"}}>{formatDate(t.date)}</td>
                                        <td className="px-3 sm:px-5 py-4 text-right whitespace-nowrap" style={{fontSize:"clamp(9px,2.2vw,12px)"}}>
                                            <Link href={route('transactions.edit', t.id)}
                                                className="text-emerald-600 hover:text-emerald-700 font-semibold mr-2 sm:mr-3"
                                            >Edit</Link>
                                            <button onClick={() => handleDelete(t.id)}
                                                className="text-red-500 hover:text-red-600 font-semibold"
                                            >Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-16 text-center text-gray-400">
                        <p className="text-sm font-medium">Belum ada transaksi</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {transactions.last_page > 1 && (
                <div className="flex justify-center gap-2 mt-5">
                    {Array.from({ length: transactions.last_page }, (_, i) => i + 1).map((page) => (
                        <Link key={page} href={route('transactions.index', { page })}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                                page === transactions.current_page
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >{page}</Link>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
