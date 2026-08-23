import { type CreateInterviewPayload } from "../types/createInterview"
import { createInterview } from "../services/interviewService"
import { type Interview } from "../types/interview"
import { useState } from "react";

interface AddInterviewFormProps {
  onInterviewAdded: (interview: Interview) => void;
  onClose: () => void;
}

const AddInterviewForm = ({
  onInterviewAdded,
  onClose
}: AddInterviewFormProps) => {
  const [formData, setFormData] = useState<CreateInterviewPayload>({
    company: "",
    role: "",
    status: "Applied"
  });

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!formData.company.trim() || !formData.role.trim()) {
      setError("Company and role are required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const newInterview = await createInterview(formData);

      onInterviewAdded(newInterview);
      onClose();
    } catch {
      setError("Unable to create interview. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div>
            <p className="eyebrow">NEW APPLICATION</p>
            <h2>Add Interview</h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close form"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="company">Company</label>

            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Microsoft"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>

            <input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add Interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInterviewForm