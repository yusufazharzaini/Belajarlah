// ================================================================
//  THEME FILTER - Mengelola filter tema
// ================================================================

const ThemeFilter = {

    // Tema yang aktif
    _activeTheme: 'all',

    // Elemen tombol tema
    _buttons: [],

    /**
     * Inisialisasi theme filter
     * @param {Function} onThemeChange - Callback ketika tema berubah
     */
    init(onThemeChange) {
        this._buttons = document.querySelectorAll('.theme-filters button');
        this._onThemeChange = onThemeChange;

        this._buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                this.setActiveTheme(theme);
            });
        });

        // Set default
        this.setActiveTheme(CONFIG.DEFAULT_THEME);
    },

    /**
     * Set tema aktif
     */
    setActiveTheme(theme) {
        this._activeTheme = theme;

        this._buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });

        if (this._onThemeChange) {
            this._onThemeChange(theme);
        }
    },

    /**
     * Dapatkan tema aktif
     */
    getActiveTheme() {
        return this._activeTheme;
    },

    /**
     * Reset ke tema default
     */
    reset() {
        this.setActiveTheme(CONFIG.DEFAULT_THEME);
    }
};
