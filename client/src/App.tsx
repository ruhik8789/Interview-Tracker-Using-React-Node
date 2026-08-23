import { useEffect, useState } from 'react'
import './App.css'
import type { Interview } from './types/interview';
import { getInterviews } from './services/interviewService';
import AddInterviewForm from './components/AddInterviewForm';

function App() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

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
        <button 
        className="add-button" 
        onClick={() => setShowForm(true)}>
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
              {interviews.filter(
                (interview) => interview.status === "Interview"
              ).length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Offers</span>
            <strong>
              {interviews.filter(
                (interview) => interview.status === "Offer"
              ).length}
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
              <div className="loader">
                <p>Loading interviews...</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="state error-state">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
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

                  <span className={`status status-${interview.status.toLowerCase()}`}>{interview.status}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {showForm && (
        <AddInterviewForm onInterviewAdded={(newInterview) => {
          setInterviews((previous) => [
            newInterview,
            ...previous
          ]);
        }}
        onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default App