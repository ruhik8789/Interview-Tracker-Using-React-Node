interface InterviewFiltersProps {
  search: string;
  selectedStatus: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

function InterviewFilters({
  search,
  selectedStatus,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: InterviewFiltersProps) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search company or role..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-label="Search company or role"
        />
      </div>

      <select
        className="filter-select"
        value={selectedStatus}
        onChange={(event) => onStatusChange(event.target.value)}
        aria-label="Filter by status"
      >
        <option value="">All Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <select
        className="filter-select"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        aria-label="Sort interviews"
      >
        <option value="created_at">Recently Added</option>
        <option value="company">Company</option>
        <option value="role">Role</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}

export default InterviewFilters;
