// ================================================================
//  RENDER - Render vocab cards ke grid
// ================================================================

const Render = {

    /**
     * Render data ke grid
     * @param {Array} data - Data yang akan ditampilkan
     * @param {string} gridId - ID elemen grid
     */
    toGrid(data, gridId = 'vocabGrid') {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        // Hapus loading jika ada
        const loadingEl = grid.querySelector('.loading-container');
        if (loadingEl) loadingEl.remove();

        if (data.length === 0) {
            grid.innerHTML = `
                <div class="no-result">
                    <span class="big">🔍</span>
                    Tidak ada kosakata yang ditemukan.<br/>
                    Coba kata kunci atau filter lain.
                </div>
            `;
            return;
        }

        // Gunakan DocumentFragment untuk performance
        const fragment = document.createDocumentFragment();

        data.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'vocab-card';
            div.style.animationDelay = Math.min(index * 0.015, 0.3) + 's';
            div.innerHTML = `
                <span class="level-tag">${item.level.toUpperCase()}</span>
                <span class="theme-tag">${item.theme}</span>
                <span class="kanji">${item.kanji}</span>
                <span class="hiragana">${item.hiragana}</span>
                <span class="meaning">${item.meaning}</span>
                <span class="type">${item.type.replace('-', ' ').toUpperCase()}</span>
                <div class="example">
                    <div class="jp">📖 ${item.example}</div>
                </div>
            `;
            fragment.appendChild(div);
        });

        grid.innerHTML = '';
        grid.appendChild(fragment);
    },

    /**
     * Tampilkan loading state
     */
    showLoading(gridId = 'vocabGrid', message = 'Memuat data...') {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        grid.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <div>${message}</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>
        `;
    },

    /**
     * Update progress bar
     */
    updateProgress(loaded, total) {
        const fill = document.getElementById('progressFill');
        if (fill) {
            const percent = Math.min((loaded / total) * 100, 100);
            fill.style.width = percent + '%';
        }
    }
};
