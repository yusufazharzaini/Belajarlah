// ================================================================
//  FILTER - Filter data berdasarkan level, type, dan search
// ================================================================

const Filter = {

    /**
     * Filter data berdasarkan semua kriteria
     * @param {Array} data - Data mentah
     * @param {Object} filters - { search, level, type, theme }
     * @returns {Array} Data yang sudah difilter
     */
    apply(data, filters) {
        const { search = '', level = 'all', type = 'all', theme = 'all' } = filters;

        return data.filter(item => {
            // Search
            const matchSearch = !search ||
                Utils.matches(item.kanji, search) ||
                Utils.matches(item.hiragana, search) ||
                Utils.matches(item.meaning, search) ||
                Utils.matches(item.example, search);

            // Level
            const matchLevel = level === 'all' || item.level === level;

            // Type
            const matchType = type === 'all' || item.type === type;

            // Theme
            const matchTheme = theme === 'all' || item.theme === theme;

            return matchSearch && matchLevel && matchType && matchTheme;
        });
    },

    /**
     * Filter berdasarkan level saja (untuk loading data)
     */
    byLevel(data, level) {
        if (level === 'all') return data;
        return data.filter(item => item.level === level);
    },

    /**
     * Filter berdasarkan type saja
     */
    byType(data, type) {
        if (type === 'all') return data;
        return data.filter(item => item.type === type);
    },

    /**
     * Filter berdasarkan tema saja
     */
    byTheme(data, theme) {
        if (theme === 'all') return data;
        return data.filter(item => item.theme === theme);
    },

    /**
     * Search filter
     */
    bySearch(data, query) {
        if (!query) return data;
        return data.filter(item =>
            Utils.matches(item.kanji, query) ||
            Utils.matches(item.hiragana, query) ||
            Utils.matches(item.meaning, query) ||
            Utils.matches(item.example, query)
        );
    }
};
