interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  page,
  limit,
  total,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages === 0) {
    return null;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="pagination-wrapper">
      <p className="pagination-summary">
        Showing <strong>{start}</strong> – <strong>{end}</strong> of{" "}
        <strong>{total}</strong>
      </p>

      <div className="pagination">
        <button
          type="button"
          className="pagination-button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              type="button"
              key={pageNumber}
              className={`pagination-button ${
                page === pageNumber ? "active" : ""
              }`}
              aria-current={page === pageNumber ? "page" : undefined}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          className="pagination-button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Pagination;
