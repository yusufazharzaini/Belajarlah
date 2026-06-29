// ================================================================
//  APP - Inisialisasi dan koordinasi semua modul
// ================================================================

const App = {

    // Data
    _allData: [],
    _filteredData: [],

    // State filter
    _filters: {
        search: '',
        level: 'all',
        type: 'all',
        theme: 'all'
    },

    // Status
    _isReady: false,

    /**
     * Inisialisasi aplikasi
     */
    async init() {
        console.log('🌸 App initialization started...');

        // 1. Tampilkan loading
        Render.showLoading('vocabGrid', 'Memuat 6.600+ kosakata...');

        // 2. Inisialisasi theme filter
        ThemeFilter.init((theme) => {
            this._filters.theme = theme;
            this._applyFiltersAndRender();
        });

        // 3. Inisialisasi pagination
        Pagination.init((page, pageData) => {
            Render.toGrid(pageData);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // 4. Setup event listeners untuk search, level, type
        this._setupEventListeners();

        // 5. Load data
        await this._loadData();

        // 6. Render pertama
        this._applyFiltersAndRender();

        console.log('🌸 App ready! Total kosakata:', this._allData.length);
    },

    /**
     * Load data dari JSON
     */
    async _loadData() {
        try {
            // Progress callback
            const onProgress = (loaded, total) => {
                Render.updateProgress(loaded, total);
            };

            const result = await DataLoader.loadAll(onProgress);

            // Gabungkan semua data
            this._allData = result.all;

            // Update badge
            Stats.update([], 'all', this._allData);

            console.log('📚 Data loaded:', this._allData.length, 'kosakata');
            console.log('📊 N5:', result.n5.length);
            console.log('📊 N4:', result.n4.length);
            console.log('📊 N3:', result.n3.length);
            console.log('📊 Extra:', result.extra.length);

            // Log per tema
            const themes = Utils.groupBy(this._allData, 'theme');
            console.log('📂 Tema:');
            Object.keys(themes).sort().forEach(t => {
                console.log(`   ${t}: ${themes[t].length} kosakata`);
            });

            this._isReady = true;

        } catch (error) {
            console.error('❌ Gagal memuat data:', error);
            // Tampilkan error di grid
            const grid = document.getElementById('vocabGrid');
            grid.innerHTML = `
                <div class="no-result">
                    <span class="big">❌</span>
                    Gagal memuat data.<br/>
                    Pastikan file JSON berada di folder <strong>data/</strong><br/>
                    <span style="font-size:0.8rem; color:var(--text-muted);">
                        Error: ${error.message}
                    </span>
                </div>
            `;
        }
    },

    /**
     * Setup event listeners untuk kontrol
     */
    _setupEventListeners() {
        // Search dengan debounce
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', Utils.debounce((e) => {
            this._filters.search = e.target.value.trim();
            this._applyFiltersAndRender();
        }, 200));

        // Level filter
        document.getElementById('levelFilter').addEventListener('change', (e) => {
            this._filters.level = e.target.value;
            this._applyFiltersAndRender();
        });

        // Type filter
        document.getElementById('typeFilter').addEventListener('change', (e) => {
            this._filters.type = e.target.value;
            this._applyFiltersAndRender();
        });

        // Scroll to top button
        const scrollBtn = document.getElementById('scrollTopBtn');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    /**
     * Apply semua filter dan render
     */
    _applyFiltersAndRender() {
        if (!this._isReady || this._allData.length === 0) return;

        // Filter data
        this._filteredData = Filter.apply(this._allData, this._filters);

        // Update stats
        Stats.update(this._filteredData, this._filters.theme, this._allData);

        // Update pagination
        Pagination.setData(this._filteredData);
    },

    /**
     * Reload data (untuk debugging)
     */
    reload() {
        DataLoader.reset();
        this._allData = [];
        this._isReady = false;
        this.init();
    }
};

// ================================================================
//  START APP
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
