// ================================================================
//  STATS - Update statistik tampilan
// ================================================================

const Stats = {

    /**
     * Update semua statistik
     * @param {Array} data - Data yang sedang ditampilkan
     * @param {string} activeTheme - Tema yang aktif (untuk themeCount)
     * @param {Array} allData - Data lengkap (untuk badge)
     */
    update(data, activeTheme, allData) {
        // Total vocab
        document.getElementById('totalVocab').textContent = Utils.formatNumber(data.length);
        document.getElementById('footerTotal').textContent = Utils.formatNumber(data.length);
        document.getElementById('totalBadge').textContent = Utils.formatNumber(data.length);

        // Level counts
        const n5 = data.filter(d => d.level === 'n5').length;
        const n4 = data.filter(d => d.level === 'n4').length;
        const n3 = data.filter(d => d.level === 'n3').length;
        const extra = data.filter(d => d.level === 'extra').length;

        document.getElementById('n5Count').textContent = Utils.formatNumber(n5);
        document.getElementById('n4Count').textContent = Utils.formatNumber(n4);
        document.getElementById('n3Count').textContent = Utils.formatNumber(n3);
        document.getElementById('extraCount').textContent = Utils.formatNumber(extra);

        // Badge (total per level)
        if (allData) {
            document.getElementById('n5Badge').textContent = Utils.formatNumber(
                allData.filter(d => d.level === 'n5').length
            );
            document.getElementById('n4Badge').textContent = Utils.formatNumber(
                allData.filter(d => d.level === 'n4').length
            );
            document.getElementById('n3Badge').textContent = Utils.formatNumber(
                allData.filter(d => d.level === 'n3').length
            );
        }

        // Theme aktif
        if (activeTheme && activeTheme !== 'all' && allData) {
            const themeCount = allData.filter(d => d.theme === activeTheme).length;
            document.getElementById('themeCount').textContent = Utils.formatNumber(themeCount);
        } else {
            document.getElementById('themeCount').textContent = Utils.formatNumber(data.length);
        }
    }
};
