import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useRef } from 'react';

function BlankNota({ nomor }: { nomor: number }) {
    return (
        <div className="nota-item">
            <div className="nota-header">
                <h2>Masjid Darus Sa'adah</h2>
                <p className="nota-sub">Jl. Masjid No. 123, Kota Bahagia</p>
                <p className="nota-sub">Telp: 0812-3456-7890</p>
            </div>
            <div className="nota-divider" />
            <div className="nota-title">
                <strong>NOTA {String(nomor).padStart(2, '0')}</strong>
            </div>
            <div className="nota-divider" />

            <table className="nota-field">
                <tbody>
                    <tr><td className="nf-l">Tanggal</td><td className="nf-d">: ___________________</td></tr>
                    <tr><td className="nf-l">Keterangan</td><td className="nf-d">: ___________________</td></tr>
                    <tr><td className="nf-l">Jumlah</td><td className="nf-d">: Rp ________________</td></tr>
                    <tr><td className="nf-l">Pembayar</td><td className="nf-d">: ___________________</td></tr>
                </tbody>
            </table>

            <div className="nota-divider" />
            <div className="nota-ttd">
                <div>
                    <p>Penerima,</p>
                    <br /><br />
                    <p>(______________)</p>
                </div>
                <div>
                    <p>Pembayar,</p>
                    <br /><br />
                    <p>(______________)</p>
                </div>
            </div>
        </div>
    );
}

export default function NotaIndex() {
    const printRef = useRef<HTMLDivElement>(null);
    const totalNota = 6;

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout title="Template Nota">
            <Head title="Template Nota" />

            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold text-gray-900">Template Nota</h1>
                <button onClick={handlePrint}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-9.75A1.125 1.125 0 005.25 3.375v5.034" />
                    </svg>
                    Cetak
                </button>
            </div>

            <p className="text-sm text-gray-500 mb-5">
                Template nota kosong untuk dicetak dan diisi manual. Satu lembar A4 berisi {totalNota} nota ukuran 80mm.
            </p>

            {/* Screen Preview */}
            <div ref={printRef} className="bg-white rounded-2xl border border-gray-200/60 p-5">
                <div className="nota-grid">
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
                    justify-content: center;
                    gap: 16px;
                }
                .nota-item {
                    width: 80mm;
                    padding: 10px 8px;
                    border: 1px dashed #ccc;
                    border-radius: 4px;
                    page-break-inside: avoid;
                    font-family: 'Courier New', monospace;
                    font-size: 11px;
                    color: #000;
                    background: #fff;
                }
                .nota-header { text-align: center; margin-bottom: 4px; }
                .nota-header h2 { margin: 0; font-size: 13px; font-weight: bold; }
                .nota-sub { margin: 1px 0; font-size: 9px; color: #333; }
                .nota-divider { border-top: 1px dashed #333; margin: 5px 0; }
                .nota-title { text-align: center; font-size: 11px; }
                .nota-field { width: 100%; font-size: 10px; }
                .nf-l { white-space: nowrap; width: 65px; vertical-align: top; }
                .nf-d { letter-spacing: 1px; }
                .nota-ttd { display: flex; justify-content: space-between; font-size: 10px; text-align: center; padding-top: 4px; }

                @media print {
                    @page { margin: 8mm; size: A4; }
                    body * { visibility: hidden; }
                    .nota-grid, .nota-grid * { visibility: visible; }
                    .nota-grid { position: absolute; left: 0; top: 0; width: 100%; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; padding: 0; }
                    .nota-item { border: none; box-shadow: none; }

                    /* 3 kolom × 2 baris = 6 nota per halaman */
                    .nota-item { width: 80mm; margin: 0; }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
