import type { Interview } from "../types/interview";
import InterviewCard from "./InterviewCard";

interface InterviewListProps {
  interviews: Interview[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function InterviewList({ interviews, onEdit, onDelete }: InterviewListProps) {
  return (
    <div className="interview-list">
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default InterviewList;