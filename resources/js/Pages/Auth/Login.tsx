import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Mail, Lock } from 'lucide-react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '', password: '', remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            <Head title="Masuk" />

            {/* Left: Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full border-[30px] border-white/20" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border-[40px] border-white/10" />
                </div>
                <div className="relative text-center max-w-md">
                    <img src="/images/logo.png" alt="" className="w-28 h-28 object-contain mx-auto mb-6" />
                    <h1 className="text-3xl font-extrabold text-white mb-3">Masjid Darus Sa'adah</h1>
                    <p className="text-emerald-100/80 leading-relaxed">
                        Sistem Transparansi Keuangan Acara Maulid Nabi Muhammad ﷺ.
                        Kelola pemasukan, pengeluaran, dan laporan keuangan secara transparan dan amanah.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-6 text-emerald-100/60 text-sm">
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Amanah</span>
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Transparan</span>
                        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Akuntabel</span>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <img src="/images/logo.png" alt="" className="w-16 h-16 object-contain mx-auto mb-3" />
                        <h1 className="text-xl font-bold text-gray-900">Masjid Darus Sa'adah</h1>
                        <p className="text-sm text-gray-500 mt-1">Transparansi Keuangan</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-200/60 shadow-sm p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Selamat Datang</h2>
                        <p className="text-sm text-gray-500 mb-6">Silakan masuk ke akun Anda</p>

                        {status && (
                            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input id="email" type="email" value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                                        placeholder="username" autoComplete="username" autoFocus />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input id="password" type="password" value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                                        placeholder="••••••••" autoComplete="current-password" />
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked as false)}
                                        className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                                    <span className="text-sm text-gray-600">Ingat saya</span>
                                </label>
                                <div />
                            </div>

                            <button type="submit" disabled={processing}
                                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-emerald-500/20 text-sm">
                                {processing ? 'Memproses...' : 'Masuk'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
