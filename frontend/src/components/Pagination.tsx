type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function pageItems(page: number, totalPages: number) {
  const pages: number[] = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, start + 4)

  for (let value = Math.max(1, end - 4); value <= end; value += 1) {
    pages.push(value)
  }

  return pages
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="btn btn-secondary btn-small"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>

      <div className="page-numbers">
        {pageItems(page, totalPages).map((value) => (
          <button
            key={value}
            type="button"
            className={`btn btn-small ${value === page ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onPageChange(value)}
            aria-current={value === page ? 'page' : undefined}
          >
            {value}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-small"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
