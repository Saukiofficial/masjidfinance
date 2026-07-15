<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Keuangan</title>
    <style>
        body { font-family: sans-serif; font-size: 11px; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { border: 1px solid #ccc; padding: 5px 7px; text-align: left; }
        th { background: #e8f5e9; font-size: 10px; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .header { text-align: center; margin-bottom: 20px; }
        .header h2 { margin: 0 0 4px; color: #166534; }
        .header p { margin: 0; color: #555; }
        .summary { margin-bottom: 14px; font-size: 12px; }
        .summary .item { display: inline-block; margin-right: 24px; }
        .summary .label { color: #666; }
        .summary .value { font-weight: bold; font-size: 13px; }
        .photo { width: 50px; height: 40px; object-fit: cover; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Laporan Keuangan</h2>
        <p>Acara Maulid Nabi Muhammad ﷺ — Masjid Darus Sa'adah</p>
    </div>

    <div class="summary">
        <div class="item"><span class="label">Pemasukan:</span> <span class="value">Rp {{ number_format($income, 0, ',', '.') }}</span></div>
        <div class="item"><span class="label">Pengeluaran:</span> <span class="value">Rp {{ number_format($expense, 0, ',', '.') }}</span></div>
        <div class="item"><span class="label">Saldo:</span> <span class="value">Rp {{ number_format($income - $expense, 0, ',', '.') }}</span></div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Tipe</th>
                <th>Kategori</th>
                <th class="text-right">Jumlah</th>
                <th>Keterangan</th>
                <th class="text-center">Lampiran</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactions as $t)
            <tr>
                <td>{{ $t->date->format('d/m/Y') }}</td>
                <td>{{ $t->type === 'income' ? 'Pemasukan' : 'Pengeluaran' }}</td>
                <td>{{ $t->category?->name ?? '-' }}</td>
                <td class="text-right">Rp {{ number_format($t->amount, 0, ',', '.') }}</td>
                <td>{{ $t->description ?? '-' }}</td>
                <td class="text-center">
                    @if($t->foto)
                        <span style="color:#166534;font-weight:bold;">✓ Ada</span>
                    @else
                        <span style="color:#ccc;">—</span>
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <p style="text-align:right;font-size:10px;color:#999;margin-top:16px;">
        Dicetak: {{ now()->format('d/m/Y H:i') }}
    </p>
</body>
</html>
