// ================================================================
//  DATA LOADER - Memuat data dari JSON per level
// ================================================================

const DataLoader = {

    // Cache data
    _cache: {
        n5: null,
        n4: null,
        n3: null,
        extra: null
    },

    // Status loading
    _loading: {
        n5: false,
        n4: false,
        n3: false,
        extra: false
    },

    // Callback ketika progress berubah
    onProgress: null,

    /**
     * Load data dari file JSON
     * @param {string} level - 'n5', 'n4', 'n3', 'extra'
     * @returns {Promise<Array>}
     */
    async loadLevel(level) {
        // Jika sudah di-cache, return langsung
        if (this._cache[level] !== null) {
            return this._cache[level];
        }

        // Jika sedang loading, tunggu
        if (this._loading[level]) {
            return new Promise((resolve) => {
                const check = setInterval(() => {
                    if (this._cache[level] !== null) {
                        clearInterval(check);
                        resolve(this._cache[level]);
                    }
                }, 100);
            });
        }

        this._loading[level] = true;

        try {
            const path = CONFIG.DATA_PATHS[level];
            if (!path) {
                throw new Error(`Path untuk level ${level} tidak ditemukan`);
            }

            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${path}`);
            }

            const data = await response.json();
            this._cache[level] = data;

            // Update progress
            if (this.onProgress) {
                const total = this.getTotalLoaded();
                const target = this.getTotalItems();
                this.onProgress(total, target);
            }

            return data;

        } catch (error) {
            console.error(`Gagal memuat data ${level}:`, error);
            this._cache[level] = [];
            return [];
        } finally {
            this._loading[level] = false;
        }
    },

    /**
     * Load semua level sekaligus (parallel)
     * @param {Function} onProgress - Callback progress (loaded, total)
     * @returns {Promise<Object>} { n5, n4, n3, extra }
     */
    async loadAll(onProgress = null) {
        this.onProgress = onProgress;

        // Hitung total item yang akan dimuat
        const totalItems = this.getTotalItems();

        // Load semua level secara parallel
        const results = await Promise.all([
            this.loadLevel('n5'),
            this.loadLevel('n4'),
            this.loadLevel('n3'),
            this.loadLevel('extra')
        ]);

        // Gabungkan semua data
        const allData = results.flat();

        // Update progress final
        if (this.onProgress) {
            this.onProgress(allData.length, totalItems);
        }

        return {
            n5: this._cache.n5 || [],
            n4: this._cache.n4 || [],
            n3: this._cache.n3 || [],
            extra: this._cache.extra || [],
            all: allData
        };
    },

    /**
     * Dapatkan total item dari semua level (perkiraan)
     */
    getTotalItems() {
        // Estimasi total dari file (bisa dihitung dari statistik)
        // Untuk akurasi, bisa baca dari file atau hardcode
        return 6600; // Sesuai dengan target
    },

    /**
     * Dapatkan total data yang sudah dimuat
     */
    getTotalLoaded() {
        let total = 0;
        for (const key of ['n5', 'n4', 'n3', 'extra']) {
            if (this._cache[key]) {
                total += this._cache[key].length;
            }
        }
        return total;
    },

    /**
     * Reset cache (untuk reload)
     */
    reset() {
        this._cache = { n5: null, n4: null, n3: null, extra: null };
        this._loading = { n5: false, n4: false, n3: false, extra: false };
    }
};
