import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Category {
    id: number;
    name: string;
    type: string;
    description: string | null;
}

interface Props {
    category: Category | null;
}

export default function CategoryForm({ category }: Props) {
    const isEdit = !!category;
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name ?? '',
        type: category?.type ?? 'income',
        description: category?.description ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('categories.update', category!.id));
        } else {
            post(route('categories.store'));
        }
    };

    return (
        <AuthenticatedLayout title={isEdit ? 'Edit Kategori' : 'Kategori Baru'}>
            <Head title={isEdit ? 'Edit Kategori' : 'Kategori Baru'} />

            <div>
                <Link href={route('categories.index')} className="text-[13px] font-semibold text-[#16A34A] hover:underline inline-flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Kembali
                </Link>
                <h1 className="page-title mt-2">{isEdit ? 'Edit Kategori' : 'Kategori Baru'}</h1>
            </div>

            <form onSubmit={submit} className="card-admin space-y-5">
                <div>
                    <label className="label-admin">Nama Kategori</label>
                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="input-admin" required />
                    {errors.name && <p className="text-[#EF4444] text-[13px] mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="label-admin">Tipe</label>
                    <div className="flex gap-2">
                        {['income', 'expense'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setData('type', t)}
                                className={`flex-1 py-3 rounded-[16px] text-[13px] font-semibold border-2 transition-all ${
                                    data.type === t
                                        ? t === 'income'
                                            ? 'bg-green-50 border-[#16A34A] text-[#16A34A]'
                                            : 'bg-red-50 border-[#EF4444] text-[#EF4444]'
                                        : 'bg-white border-[#EEF2F7] text-[#6B7280]'
                                }`}
                            >
                                {t === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                            </button>
                        ))}
                    </div>
                    {errors.type && <p className="text-[#EF4444] text-[13px] mt-1">{errors.type}</p>}
                </div>

                <div>
                    <label className="label-admin">Keterangan</label>
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3} className="input-admin resize-none" />
                    {errors.description && <p className="text-[#EF4444] text-[13px] mt-1">{errors.description}</p>}
                </div>

                <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={processing} className="btn-admin-primary flex-1">
                        {processing ? 'Menyimpan...' : isEdit ? 'Perbarui' : 'Simpan'}
                    </button>
                    <Link href={route('categories.index')} className="btn-admin-outline flex-1 text-center">Batal</Link>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
