import type { Interview } from "../types/interview";

interface InterviewCardProps {
  interview: Interview;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function InterviewCard({ interview, onEdit, onDelete }: InterviewCardProps) {
  return (
    <div className="interview-card">
      <div className="company-icon">
        {interview.company.charAt(0).toUpperCase()}
      </div>

      <div className="interview-info">
        <h3>{interview.company}</h3>
        <p>{interview.role}</p>
      </div>

      <div className="interview-actions">
        <span className={`status status-${interview.status.toLowerCase()}`}>
          {interview.status}
        </span>

        <button
          type="button"
          className="icon-button"
          onClick={() => onEdit(interview.id)}
          aria-label={`Edit ${interview.company}`}
        >
          ✎
        </button>

        <button
          type="button"
          className="icon-button delete-button"
          onClick={() => onDelete(interview.id)}
          aria-label={`Delete ${interview.company}`}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default InterviewCard;