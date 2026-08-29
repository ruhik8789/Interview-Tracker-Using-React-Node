import { type CreateInterviewPayload } from "../types/createInterview"
import { createInterview, updateInterview } from "../services/interviewService"
import { type Interview } from "../types/interview"
import { useEffect, useState } from "react";

interface InterviewFormProps {
  interview?: Interview;
  onInterviewSaved: (interview: Interview) => void;
  onClose: () => void;
}

type FieldErrors = Partial<Record<"company" | "role", string>>;

const InterviewForm = ({
  interview, 
  onInterviewSaved, 
  onClose
}: InterviewFormProps) => {
  const [formData, setFormData] = useState<CreateInterviewPayload>({
    company: interview?.company ?? "",
    role: interview?.role ?? "",
    status: interview?.status ?? "Applied"
  });

  const [submitting, setSubmitting] = useState(false);

  // Field-level errors ("Company is required") vs. a single form-level
  // error for things that aren't the user's fault (e.g. the request failed).
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");

  // Let Escape close the modal, but not while a request is in flight -
  // otherwise the response could arrive after the component that would
  // have handled it is already gone.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, submitting]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    // Clear that field's error as soon as the user starts fixing it,
    // rather than making them resubmit to find out it's gone.
    if (name in fieldErrors) {
      setFieldErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (!formData.company.trim()) {
      errors.company = "Company is required.";
    }

    if (!formData.role.trim()) {
      errors.role = "Role is required.";
    }

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError("");
      setFieldErrors({});

      // const newInterview = await createInterview({
      //   ...formData,
      //   company: formData.company.trim(),
      //   role: formData.role.trim()
      // });

      const savedInterview = interview 
      ? await updateInterview(interview.id, formData)
      : await createInterview(formData);

      onInterviewSaved(savedInterview);
      onClose();
    } catch {
      setSubmitError(interview 
      ? "Unable to update interview. Please try again."
      : "Unable to save interview. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = () => {
    if (!submitting) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">{interview ? "EDIT APPLICATION" : "NEW APPLICATION"}</p>
            <h2>{interview ? "Edit Interview" : "Add Interview"}</h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close form"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="company">Company</label>

            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Microsoft"
              autoFocus
              disabled={submitting}
              aria-invalid={Boolean(fieldErrors.company)}
              aria-describedby={fieldErrors.company ? "company-error" : undefined}
              className={fieldErrors.company ? "has-error" : undefined}
            />

            {fieldErrors.company && (
              <p id="company-error" className="field-error">{fieldErrors.company}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>

            <input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              disabled={submitting}
              aria-invalid={Boolean(fieldErrors.role)}
              aria-describedby={fieldErrors.role ? "role-error" : undefined}
              className={fieldErrors.role ? "has-error" : undefined}
            />

            {fieldErrors.role && (
              <p id="role-error" className="field-error">{fieldErrors.role}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {submitError && <p className="form-error">{submitError}</p>}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={submitting}
            >
              {interview ? "Save Changes" : "Add Interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InterviewForm
