import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    type: string;
    description: string | null;
}

interface Props {
    categories: {
        data: Category[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function CategoryIndex({ categories }: Props) {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('categories.index'), { search, type: typeFilter }, { preserveState: true, replace: true });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus kategori "${name}"?`)) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout title="Kategori">
            <Head title="Kategori" />

            <div className="flex items-center justify-between">
                <h1 className="page-title">Kategori</h1>
                <Link href={route('categories.create')} className="btn-admin-primary text-[13px] px-4 py-2.5">
                    + Baru
                </Link>
            </div>

            <form onSubmit={handleSearch} className="flex gap-3">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari kategori..."
                    className="input-admin flex-1"
                />
                <select
                    value={typeFilter}
                    onChange={(e) => { setTypeFilter(e.target.value); router.get(route('categories.index'), { search, type: e.target.value }, { preserveState: true, replace: true }); }}
                    className="select-admin w-36"
                >
                    <option value="">Semua</option>
                    <option value="income">Pemasukan</option>
                    <option value="expense">Pengeluaran</option>
                </select>
                <button type="submit" className="btn-admin-outline text-[13px] px-4">
                    Cari
                </button>
            </form>

            <div className="card-admin !p-0 overflow-hidden">
                {categories.data.length > 0 ? (
                    <div className="divide-y divide-[#EEF2F7]">
                        {categories.data.map((cat) => (
                            <div key={cat.id} className="flex items-center gap-3 px-5 py-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                    cat.type === 'income' ? 'bg-green-50 text-[#16A34A]' : 'bg-red-50 text-[#EF4444]'
                                }`}>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                        {cat.type === 'income' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.95 11.95 0 014.306 6.43l.776 2.898m0 0l-2.898-.776m2.898.776l.776-2.898" />
                                        )}
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[14px] font-semibold text-[#111827]">{cat.name}</p>
                                    {cat.description && (
                                        <p className="text-[13px] text-[#6B7280] truncate">{cat.description}</p>
                                    )}
                                </div>
                                <div className="text-right shrink-0 flex items-center gap-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                        cat.type === 'income'
                                            ? 'bg-green-50 text-[#16A34A] border border-green-200'
                                            : 'bg-red-50 text-[#EF4444] border border-red-200'
                                    }`}>
                                        {cat.type === 'income' ? 'Masuk' : 'Keluar'}
                                    </span>
                                    <Link href={route('categories.edit', cat.id)} className="text-[#16A34A] hover:underline text-[13px] font-semibold">Edit</Link>
                                    <button onClick={() => handleDelete(cat.id, cat.name)} className="text-[#EF4444] hover:underline text-[13px] font-semibold">Hapus</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center text-[#9CA3AF]">
                        <div className="text-3xl mb-2">📁</div>
                        <p className="text-sm font-medium">Belum ada kategori</p>
                    </div>
                )}
            </div>

            {categories.last_page > 1 && (
                <div className="flex justify-center gap-2">
                    {Array.from({ length: categories.last_page }, (_, i) => i + 1).map((page) => (
                        <Link
                            key={page}
                            href={route('categories.index', { page })}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-semibold transition-all ${
                                page === categories.current_page
                                    ? 'bg-[#16A34A] text-white'
                                    : 'bg-white text-[#6B7280] border border-[#EEF2F7] hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </Link>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
