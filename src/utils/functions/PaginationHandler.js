class PaginationHandler {
  constructor(
    currentPage = 1,
    pageNumberLimit =1,
    maxPageNumberLimit = 1,
    minPageNumberLimit = 1,
    setCurrentPage = 1,
    rows = [],
    rowsPerPage = 1,
    setMinPageNumberLimit = 1,
    setMaxPageNumberLimit = 1
  ) {
    this.currentPage = currentPage;
    this.pageNumberLimit = pageNumberLimit;
    this.maxPageNumberLimit = maxPageNumberLimit;
    this.minPageNumberLimit = minPageNumberLimit;
    this.rows = rows;
    this.rowsPerPage = rowsPerPage;
    this.setCurrentPage = setCurrentPage;
    this.setMinPageNumberLimit = setMinPageNumberLimit;
    this.setMaxPageNumberLimit = setMaxPageNumberLimit;

    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.indexOfFirstItem = this.indexOfFirstItem.bind(this);
    this.indexOfLastItem = this.indexOfLastItem.bind(this);
    this.handleChangePageValue = this.handleChangePageValue.bind(this);
  }
  handleNext() {
    this.setCurrentPage(this.currentPage + 1);
    if (this.currentPage + 1 > this.maxPageNumberLimit) {
      this.setMaxPageNumberLimit(
        this.maxPageNumberLimit + this.pageNumberLimit
      );
      this.setMinPageNumberLimit(
        this.minPageNumberLimit + this.pageNumberLimit
      );
    }
  }
  handlePrevious() {
    if (this.currentPage === 0) return;
    if (this.currentPage === 1) {
      this.setCurrentPage(0);
    }
    if (this.currentPage > 1) {
      this.setCurrentPage(this.currentPage - 1);
    }
    if ((this.currentPage - 1) % this.pageNumberLimit === 0) {
      this.setMaxPageNumberLimit(this.maxPageNumberLimit - this.pageNumberLimit);
      this.setMinPageNumberLimit(
        this.minPageNumberLimit - this.pageNumberLimit
      );
    }
  }
  pages() {
    const pages = [];
    for (
      let elem = 1;
      elem <= Math.ceil(this.rows?.length / this.rowsPerPage);
      elem++
    )
      pages.push(elem);
    return pages;
  }

  indexOfLastItem() {
    return this.currentPage * this.rowsPerPage;
  }
  indexOfFirstItem(){
    return this.indexOfLastItem() - this.rowsPerPage;
  }
  handleChangePageValue(pageValue){
    this.setCurrentPage(pageValue)
  }
}

export default PaginationHandler;
