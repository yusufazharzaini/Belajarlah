// ================================================================
//  FUNGSI UTILITY
// ================================================================

const Utils = {

    /**
     * Debounce function untuk menunda eksekusi
     * @param {Function} fn - Fungsi yang akan di-debounce
     * @param {number} delay - Waktu tunda dalam ms
     * @returns {Function}
     */
    debounce(fn, delay = 200) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    /**
     * Format angka dengan pemisah ribuan
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    /**
     * Escape HTML untuk mencegah XSS
     */
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    /**
     * Check apakah string cocok (case-insensitive)
     */
    matches(str, query) {
        return str.toLowerCase().includes(query.toLowerCase());
    },

    /**
     * Group array berdasarkan key
     */
    groupBy(arr, key) {
        return arr.reduce((acc, item) => {
            const k = item[key];
            if (!acc[k]) acc[k] = [];
            acc[k].push(item);
            return acc;
        }, {});
    },

    /**
     * Get unique values dari array berdasarkan key
     */
    uniqueBy(arr, key) {
        const seen = new Set();
        return arr.filter(item => {
            const val = item[key];
            if (seen.has(val)) return false;
            seen.add(val);
            return true;
        });
    }
};
