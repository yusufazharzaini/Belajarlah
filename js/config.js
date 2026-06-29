// ================================================================
//  KONFIGURASI GLOBAL
// ================================================================

const CONFIG = {
    // Jumlah item per halaman
    PER_PAGE: 20,

    // Tema default
    DEFAULT_THEME: 'all',

    // Level yang tersedia
    LEVELS: ['n5', 'n4', 'n3', 'extra'],

    // Jenis kata yang tersedia
    TYPES: [
        'kata-benda',
        'verba',
        'i-adjektiva',
        'na-adjektiva',
        'kata-ganti',
        'kata-bilangan',
        'kata-tanya',
        'kata-keterangan',
        'kata-penghubung',
        'kata-tunjuk',
        'partikel',
        'kata-seru',
        'ucapan'
    ],

    // Daftar tema
    THEMES: [
        'kata-ganti-sapaan',
        'keluarga',
        'waktu',
        'angka',
        'tempat',
        'makanan',
        'pakaian',
        'tubuh',
        'hewan',
        'warna',
        'sifat',
        'verba-dasar',
        'verba-lanjutan',
        'abstrak',
        'keterangan',
        'ucapan',
        'penghubung',
        'lainnya'
    ],

    // Path data JSON
    DATA_PATHS: {
        n5: 'data/n5.json',
        n4: 'data/n4.json',
        n3: 'data/n3.json',
        extra: 'data/extra.json'
    }
};
