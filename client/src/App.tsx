import { useEffect, useState } from 'react'
import './App.css'
import type { Interview } from './types/interview';
import { deleteInterview, getInterviewById, getInterviews } from './services/interviewService';
import InterviewForm from './components/InterviewForm';

function App() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        const data = await getInterviews();
        setInterviews(data);
      } catch (error) {
        setError("Unable to load interviews.");
      } finally {
        setLoading(false);
      }
    }
    loadInterviews();
  }, []);

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

      setInterviews((previous) => previous.filter(interview => interview.id !== id));
    } catch {
      setError("Unable to delete the interview.")
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
            <strong>{interviews.length}</strong>
          </div>

          <div className="stat-card">
            <span>Interviews</span>
            <strong>
              {
                interviews.filter(
                  (interview) => interview.status === "Interview",
                ).length
              }
            </strong>
          </div>

          <div className="stat-card">
            <span>Offers</span>
            <strong>
              {
                interviews.filter((interview) => interview.status === "Offer")
                  .length
              }
            </strong>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Recent Interviews</h2>
              <p>Your latest application activity</p>
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

export default App
