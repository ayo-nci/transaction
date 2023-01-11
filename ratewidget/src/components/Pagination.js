const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                )}
                {pages.map((page) => (
                    <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li className="page-item">
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};
export default Pagination;