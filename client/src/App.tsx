import { useEffect, useState } from "react";
import "./App.css";
import type { Interview } from "./types/interview";
import {
  deleteInterview,
  getInterviewById,
  getInterviews,
} from "./services/interviewService";
import InterviewForm from "./components/InterviewForm";

function App() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(
    null,
  );

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getInterviews({ 
          page,
          limit,
          status: selectedStatus,
          search,
          sortBy,
          order: "desc"
        });

        setInterviews(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotal(response.pagination.total);
      } catch (error) {
        setError("Unable to load interviews.");
      } finally {
        setLoading(false);
      }
    };
    loadInterviews();
  }, [page, limit, selectedStatus, search, sortBy]);

  const handleEdit = async (id: number) => {
    try {
      const interview = await getInterviewById(id);
      setEditingInterview(interview);
    } catch {
      setError("Unable to load the interview.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteInterview(id);

      setInterviews((previous) =>
        previous.filter((interview) => interview.id !== id),
      );
    } catch {
      setError("Unable to delete the interview.");
    }
  };

  const handleInterviewSaved = (savedInterview: Interview) => {
    setInterviews((previous) => {
      const exists = previous.some(
        (interview) => interview.id === savedInterview.id,
      );

      if (exists) {
        return previous.map((interview) =>
          interview.id === savedInterview.id ? savedInterview : interview,
        );
      }

      return [savedInterview, ...previous];
    });

    setEditingInterview(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">CAREER COMMAND CENTER</p>
          <h1>Interview Tracker</h1>
          <p className="subtitle">
            Keep track of your applications, interviews and offers.
          </p>
        </div>
        <button className="add-button" onClick={() => setShowForm(true)}>
          + Add Interview
        </button>
      </header>

      <main className="dashboard">
        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Applications</span>
            <strong>{total}</strong>
          </div>

          <div className="stat-card">
            <span>Current Page</span>
            <strong>{page}</strong>
          </div>

          <div className="stat-card">
            <span>Total Pages</span>
            <strong>{totalPages}</strong>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Recent Interviews</h2>
              <p>Your latest application activity</p>
            </div>

            <div className="toolbar">
              <div className="search-box">
                <span className="search-icon">⌕</span>

                <input
                  type="text"
                  placeholder="Search company or role..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                />
              </div>

              <select
                className="filter-select"
                value={selectedStatus}
                onChange={(event) => {
                  setSelectedStatus(event.target.value);
                  setPage(1);
                }}
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
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setPage(1);
                }}
              >
                <option value="created_at">Recently Added</option>
                <option value="company">Company</option>
                <option value="role">Role</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="state">
              <div className="loader" />
              <p>Loading interviews...</p>
            </div>
          )}

          {error && !loading && (
            <div className="state error-state">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && interviews.length === 0 && (
            <div className="state empty-state">
              <p className="empty-state-title">No applications yet</p>
              <p>Add your first application to start tracking it here.</p>
              <button
                type="button"
                className="primary-button"
                onClick={() => setShowForm(true)}
              >
                + Add Interview
              </button>
            </div>
          )}

          {!loading && !error && interviews.length > 0 && (
            <div className="interview-list">
              {interviews.map((interview) => (
                <div className="interview-card" key={interview.id}>
                  <div className="company-icon">
                    {interview.company.charAt(0)}
                  </div>

                  <div className="interview-info">
                    <h3>{interview.company}</h3>
                    <p>{interview.role}</p>
                  </div>

                  <div className="interview-actions">
                    <span
                      className={`status status-${interview.status.toLowerCase()}`}
                    >
                      {interview.status}
                    </span>

                    <button
                      className="icon-button"
                      onClick={() => handleEdit(interview.id)}
                      aria-label={`Edit ${interview.company}`}
                    >
                      ✎
                    </button>

                    <button
                      className="icon-button delete-button"
                      onClick={() => handleDelete(interview.id)}
                      aria-label={`Delete ${interview.company}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && !error && totalPages > 0 && (
            <div className="pagination-wrapper">
              <div className="pagination-summary">
                Showing{" "}
                <strong>{total === 0 ? 0 : (page - 1) * limit + 1}</strong> –{" "}
                <strong>{Math.min(page * limit, total)}</strong> of{" "}
                <strong>{total}</strong>
              </div>

              <div className="pagination">
                <button
                  type="button"
                  className="pagination-button"
                  disabled={page === 1}
                  onClick={() => setPage((currentPage) => currentPage - 1)}
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
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  className="pagination-button"
                  disabled={page === totalPages}
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                >
                  →
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {showForm && (
        <InterviewForm
          onInterviewSaved={handleInterviewSaved}
          onClose={() => setShowForm(false)}
        />
      )}

      {editingInterview && (
        <InterviewForm
          interview={editingInterview}
          onInterviewSaved={handleInterviewSaved}
          onClose={() => setEditingInterview(null)}
        />
      )}
    </div>
  );
}

export default App;
