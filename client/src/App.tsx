import { useEffect, useState } from "react";
import "./App.css";
import type { Interview } from "./types/interview";
import {
  deleteInterview,
  getInterviewById,
  getInterviews,
} from "./services/interviewService";
import InterviewForm from "./components/InterviewForm";
import useDebounce from "./hooks/useDebounce";
import InterviewList from "./components/InterviewList";
import InterviewFilters from "./components/InterviewFilters";
import Pagination from "./components/Pagination";

function App() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("created_at");
  const debouncedSearch = useDebounce(search, 300);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(
    null,
  );
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getInterviews({
          page,
          limit,
          status: selectedStatus,
          search: debouncedSearch,
          sortBy,
          order: "desc",
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
  }, [page, limit, selectedStatus, debouncedSearch, sortBy, refreshKey]);

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
      setRefreshKey((current) => current + 1);
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

    setShowForm(false);
    setEditingInterview(null);
    setRefreshKey((current) => current + 1);
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

            <InterviewFilters
              search={search}
              selectedStatus={selectedStatus}
              sortBy={sortBy}
              onSearchChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              onStatusChange={(value) => {
                setSelectedStatus(value);
                setPage(1);
              }}
              onSortChange={(value) => {
                setSortBy(value);
                setPage(1);
              }}
            />
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
            <InterviewList
              interviews={interviews}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          {!loading && !error && totalPages > 0 && (
            <Pagination
              page={page}
              limit={limit}
              total={total}
              totalPages={totalPages}
              onPageChange={setPage}
            />
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