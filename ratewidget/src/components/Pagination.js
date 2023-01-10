const Pagination = ({ totalPages, currentPage, onChange }) => (
    <div>
      <button onClick={() => onChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={() => onChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
  

  export default Pagination;