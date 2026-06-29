// ================================================================
//  PAGINATION - Mengelola pagination
// ================================================================

const Pagination = {

    // State
    _currentPage: 1,
    _totalPages: 1,
    _perPage: CONFIG.PER_PAGE,
    _data: [],
    _onPageChange: null,

    /**
     * Inisialisasi pagination
     * @param {Function} onPageChange - Callback ketika halaman berubah
     */
    init(onPageChange) {
        this._onPageChange = onPageChange;
        this._renderPagination();
    },

    /**
     * Set data untuk pagination
     */
    setData(data) {
        this._data = data;
        this._totalPages = Math.ceil(data.length / this._perPage);

        // Reset ke halaman 1 jika halaman saat ini tidak valid
        if (this._currentPage > this._totalPages) {
            this._currentPage = this._totalPages || 1;
        }

        this._renderPagination();
        this._firePageChange();
    },

    /**
     * Dapatkan data untuk halaman saat ini
     */
    getCurrentPageData() {
        const start = (this._currentPage - 1) * this._perPage;
        const end = start + this._perPage;
        return this._data.slice(start, end);
    },

    /**
     * Pindah ke halaman tertentu
     */
    goToPage(page) {
        if (page < 1 || page > this._totalPages) return;
        if (page === this._currentPage) return;

        this._currentPage = page;
        this._renderPagination();
        this._firePageChange();
    },

    /**
     * Halaman sebelumnya
     */
    prevPage() {
        if (this._currentPage > 1) {
            this.goToPage(this._currentPage - 1);
        }
    },

    /**
     * Halaman berikutnya
     */
    nextPage() {
        if (this._currentPage < this._totalPages) {
            this.goToPage(this._currentPage + 1);
        }
    },

    /**
     * Render tombol pagination
     */
    _renderPagination() {
        const container = document.getElementById('pagination');
        if (!container) return;

        container.innerHTML = '';

        if (this._totalPages <= 1) return;

        const maxButtons = 7;
        let startPage = Math.max(1, this._currentPage - 3);
        let endPage = Math.min(this._totalPages, this._currentPage + 3);

        if (endPage - startPage < maxButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(this._totalPages, startPage + maxButtons - 1);
            } else {
                startPage = Math.max(1, endPage - maxButtons + 1);
            }
        }

        const addPageBtn = (page) => {
            const btn = document.createElement('button');
            btn.textContent = page;
            btn.className = page === this._currentPage ? 'active' : '';
            btn.onclick = () => this.goToPage(page);
            container.appendChild(btn);
        };

        const addDots = () => {
            const dots = document.createElement('button');
            dots.textContent = '…';
            dots.disabled = true;
            dots.style.cursor = 'default';
            container.appendChild(dots);
        };

        if (startPage > 1) {
            addPageBtn(1);
            if (startPage > 2) addDots();
        }

        for (let i = startPage; i <= endPage; i++) {
            addPageBtn(i);
        }

        if (endPage < this._totalPages) {
            if (endPage < this._totalPages - 1) addDots();
            addPageBtn(this._totalPages);
        }
    },

    /**
     * Panggil callback ketika halaman berubah
     */
    _firePageChange() {
        if (this._onPageChange) {
            this._onPageChange(this._currentPage, this.getCurrentPageData());
        }
    },

    /**
     * Reset ke halaman 1
     */
    reset() {
        this._currentPage = 1;
        this._renderPagination();
        this._firePageChange();
    },

    /**
     * Dapatkan halaman saat ini
     */
    getCurrentPage() {
        return this._currentPage;
    },

    /**
     * Dapatkan total halaman
     */
    getTotalPages() {
        return this._totalPages;
    }
};
