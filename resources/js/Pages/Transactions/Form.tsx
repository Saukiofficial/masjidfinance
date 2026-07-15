import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useState, useRef } from 'react';
import {
    ArrowLeft, Camera, Users, User, Tag, CalendarDays,
    FileText,
} from 'lucide-react';

interface Category { id: number; name: string; }
interface Transaction {
    id: number; type: string; amount: number; description: string | null;
    date: string; category_id: number | null;
    panitia: string | null; dusun: string | null;
    jumlah_donatur: number | null; foto: string | null;
}

interface Props {
    transaction: Transaction | null;
    categories: Category[];
    type: string;
}

export default function TransactionForm({ transaction, categories, type }: Props) {
    const isEdit = !!transaction;
    const [preview, setPreview] = useState<string | null>(transaction?.foto ? `/storage/${transaction.foto}` : null);
    const fileRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, put, processing, errors } = useForm({
        type: transaction?.type ?? type,
        category_id: transaction?.category_id ?? '',
        amount: transaction?.amount ?? '',
        description: transaction?.description ?? '',
        date: transaction?.date ?? new Date().toISOString().split('T')[0],
        panitia: transaction?.panitia ?? '',
        dusun: transaction?.dusun ?? '',
        jumlah_donatur: transaction?.jumlah_donatur ?? '',
        foto: null as File | null,
    });

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('foto', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('transactions.update', transaction!.id));
        } else {
            post(route('transactions.store'));
        }
    };

    const title = isEdit ? 'Edit Transaksi' : (type === 'income' ? 'Pemasukan Baru' : 'Pengeluaran Baru');
    const isIncome = data.type === 'income';

    return (
        <AuthenticatedLayout title={title}>
            <Head title={title} />

            {/* Back */}
            <Link href={route('transactions.index')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali
            </Link>

            {/* Page Title */}
            <div className="mt-2 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-400 mt-1">Lengkapi data transaksi dibawah ini</p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* Main Form Card */}
                <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden">
                    {/* Header Gradient */}
                    <div className={`px-5 py-4 ${isIncome ? 'bg-gradient-to-r from-emerald-600 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-red-400'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                                {isIncome
                                    ? <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-5.25-5.25M12 19.5l5.25-5.25" /></svg>
                                    : <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-5.25 5.25M12 4.5l5.25 5.25" /></svg>
                                }
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">{isIncome ? 'Pemasukan' : 'Pengeluaran'}</p>
                                <p className="text-white/70 text-xs">Isi detail transaksi dengan lengkap</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="p-5 space-y-5">
                        {/* Jumlah */}
                        <div>
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-2">
                                <Tag className="w-4 h-4 text-gray-400" />
                                Jumlah {isIncome ? 'Pemasukan' : 'Pengeluaran'}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">Rp</span>
                                <input type="number" value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                                    min="0" placeholder="0" required />
                            </div>
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-2">
                                <FileText className="w-4 h-4 text-gray-400" />
                                Kategori
                            </label>
                            <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all appearance-none bg-white"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                            >
                                <option value="">Pilih kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {categories.length === 0 && (
                                <p className="text-amber-600 text-xs mt-1">Belum ada kategori. <Link href={route('categories.create')} className="underline">Buat kategori</Link></p>
                            )}
                            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                        </div>

                        {/* Tanggal */}
                        <div>
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-2">
                                <CalendarDays className="w-4 h-4 text-gray-400" />
                                Tanggal
                            </label>
                            <input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all" required />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                        </div>

                        {/* Keterangan */}
                        <div>
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-2">
                                <FileText className="w-4 h-4 text-gray-400" />
                                Keterangan
                            </label>
                            <textarea value={data.description} onChange={(e) => setData('description', e.target.value)}
                                rows={3} placeholder={isIncome ? "Catatan tambahan..." : "Contoh: Pembelian konsumsi untuk acara..."}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none" />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>
                    </div>
                </div>

                {/* Income-only fields */}
                {isIncome && (
                    <div className="bg-white rounded-2xl border border-gray-200/60 p-5 space-y-5">
                        <div className="border-b border-gray-100 pb-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Data Panitia & Donatur</p>
                        </div>
                        <div>
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-2">
                                <User className="w-4 h-4 text-gray-400" />
                                Nama Panitia
                            </label>
                            <input type="text" value={data.panitia} onChange={(e) => setData('panitia', e.target.value)}
                                placeholder="Contoh: Panitia A (Anwar)"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all" />
                            {errors.panitia && <p className="text-red-500 text-xs mt-1">{errors.panitia}</p>}
                        </div>
                        <div>
                            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-2">
                                <Users className="w-4 h-4 text-gray-400" />
                                Jumlah Donatur / Orang
                            </label>
                            <input type="number" value={data.jumlah_donatur} onChange={(e) => setData('jumlah_donatur', e.target.value)}
                                placeholder="Contoh: 30 orang"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all" min="0" />
                            {errors.jumlah_donatur && <p className="text-red-500 text-xs mt-1">{errors.jumlah_donatur}</p>}
                        </div>
                    </div>
                )}

                {/* Foto Upload for all types */}
                <div className="bg-white rounded-2xl border border-gray-200/60 p-5">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-3">
                        <Camera className="w-4 h-4 text-gray-400" />
                        {isIncome ? 'Bukti Foto' : 'Upload Nota'}
                    </label>
                    <input ref={fileRef} type="file" accept="image/jpg,image/jpeg,image/png"
                        onChange={handleFile} className="hidden" />
                    {preview ? (
                        <div className="relative rounded-xl overflow-hidden border border-gray-200">
                            <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                            <button type="button" onClick={() => { setData('foto', null); setPreview(null); if (fileRef.current) fileRef.current.value = ''; }}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <button type="button" onClick={() => fileRef.current?.click()}
                            className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center justify-center gap-2 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group cursor-pointer">
                            <svg className="w-8 h-8 text-gray-300 group-hover:text-emerald-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                            </svg>
                            <p className="text-sm font-medium text-gray-500 group-hover:text-emerald-600 transition-colors">
                                {isIncome ? 'Klik untuk upload foto' : 'Klik untuk upload nota'}
                            </p>
                            <p className="text-xs text-gray-400">Format: JPG/PNG, Maks: 2MB</p>
                        </button>
                    )}
                    {errors.foto && <p className="text-red-500 text-xs mt-2">{errors.foto}</p>}
                </div>

                {/* Submit */}
                <div className="flex gap-3">
                    <button type="submit" disabled={processing}
                        className={`flex-1 py-3.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 shadow-sm ${
                            isIncome
                                ? 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-500/20'
                                : 'bg-red-500 hover:bg-red-600 hover:shadow-red-500/20'
                        }`}
                    >
                        {processing ? 'Menyimpan...' : isEdit ? 'Perbarui Transaksi' : (isIncome ? 'Simpan Pemasukan' : 'Simpan Pengeluaran')}
                    </button>
                    <Link href={route('transactions.index')}
                        className="px-6 py-3.5 rounded-xl text-sm font-bold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all text-center"
                    >Batal</Link>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
