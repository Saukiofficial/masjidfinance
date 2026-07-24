import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useRef } from 'react';

function BlankNota({ nomor }: { nomor: number }) {
    return (
        <div className="nota-item flex flex-col relative bg-white border border-gray-300 print:border-gray-400 border-dashed rounded-lg print:rounded-none overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                <div className="w-[45px] h-[45px] shrink-0">
                    <img src="/images/logo.png" alt="Logo Masjid" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-center pr-[45px]"> {/* pr-[45px] for centering text visually despite left logo */}
                    <h2 className="font-bold text-[#15803D] text-[16px] leading-tight m-0">MASJID DARUS SA'ADAH</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5">Bukti Pengeluaran</p>
                </div>
            </div>

            {/* Content */}
            <div className="pt-3 pb-4 flex-1">
                <table className="w-full text-[12px] text-gray-900 border-collapse">
                    <tbody>
                        <tr className="h-7 align-bottom">
                            <td className="w-[85px] pb-1 whitespace-nowrap">No. Nota</td>
                            <td className="w-[10px] pb-1 text-center">:</td>
                            <td className="pb-1 border-b border-gray-400 w-full relative">
                                {/* Dummy placeholder for the number, will be blank when printed */}
                                <span className="opacity-0">DS-000000</span> 
                            </td>
                        </tr>
                        <tr className="h-7 align-bottom">
                            <td className="pb-1 whitespace-nowrap">Tanggal</td>
                            <td className="pb-1 text-center">:</td>
                            <td className="pb-1 border-b border-gray-400"></td>
                        </tr>
                        <tr className="h-7 align-bottom">
                            <td className="pb-1 whitespace-nowrap">Nama Toko</td>
                            <td className="pb-1 text-center">:</td>
                            <td className="pb-1 border-b border-gray-400"></td>
                        </tr>
                        <tr className="h-7 align-bottom">
                            <td className="pb-1 whitespace-nowrap">Keperluan</td>
                            <td className="pb-1 text-center">:</td>
                            <td className="pb-1 border-b border-gray-400"></td>
                        </tr>
                        <tr className="h-7 align-bottom">
                            <td className="pb-1 whitespace-nowrap font-medium">Total</td>
                            <td className="pb-1 text-center font-medium">:</td>
                            <td className="pb-1 font-medium border-b border-gray-400 flex">
                                <span className="mr-1">Rp</span>
                                <div className="flex-1"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Terbilang */}
                <div className="mt-3">
                    <p className="text-[11px] text-gray-600 mb-1">Terbilang:</p>
                    <div className="border-b border-gray-400 h-5 mb-2 w-full"></div>
                    <div className="border-b border-gray-400 h-5 w-full"></div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2">
                <div className="text-center w-[120px]">
                    <p className="text-[11px] text-gray-600 mb-8">Mengetahui,<br />Bendahara</p>
                    <div className="border-b border-gray-400 w-full mb-1"></div>
                </div>
            </div>
        </div>
    );
}

export default function NotaIndex() {
    const printRef = useRef<HTMLDivElement>(null);
    const totalNota = 4; // Berdasarkan instruksi 4 nota per halaman

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout title="Template Nota Pengeluaran">
            <Head title="Template Nota Pengeluaran" />

            <div className="flex items-center justify-between mb-5 print:hidden">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Template Nota Pengeluaran</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Format kosong A4 (4 nota per lembar) untuk bukti pengeluaran manual.
                    </p>
                </div>
                <button onClick={handlePrint}
                    className="bg-[#15803D] hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-9.75A1.125 1.125 0 005.25 3.375v5.034" />
                    </svg>
                    Cetak A4
                </button>
            </div>

            {/* Screen Preview */}
            <div ref={printRef} className="bg-white rounded-2xl border border-gray-200/60 p-5 print:p-0 print:border-none print:bg-transparent">
                <div className="nota-grid font-sans">
                    {Array.from({ length: totalNota }, (_, i) => (
                        <BlankNota key={i} nomor={i + 1} />
                    ))}
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                .nota-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }
                .nota-item {
                    width: calc(50% - 8px); /* 2 columns in web preview */
                    padding: 24px;
                    box-sizing: border-box;
                }

                @media print {
                    @page { 
                        margin: 10mm; /* Sesuai instruksi */
                        size: A4 portrait; 
                    }
                    
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background: white;
                    }
                    
                    body * { visibility: hidden; }
                    
                    .nota-grid, .nota-grid * { visibility: visible; }
                    
                    .nota-grid { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 100%; 
                        display: flex; 
                        flex-wrap: wrap; 
                        gap: 5mm; /* Jarak antar nota 5mm */
                        padding: 0; 
                    }
                    
                    .nota-item { 
                        width: calc(48%); /* Lebar 48% halaman */
                        height: calc(46vh); /* Tinggi 46% halaman */
                        margin: 0; 
                        border: 1px dashed #D1D5DB !important; /* Garis putus-putus tanda potong */
                        border-radius: 0 !important; /* Tanpa radius saat print */
                        padding: 20px 24px;
                        box-shadow: none !important;
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
