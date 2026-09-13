import type {Interview} from '../types/interview';
import type {CreateInterviewPayload} from '../types/createInterview';

const API_URL = "http://localhost:5000/api/interviews";

// To get all the interviews
export const getInterviews = async (): Promise<Interview[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch interviews');
    }

    const data: Interview[] = await response.json();

    return data;
}

// To get a single interview by id
export const getInterviewById = async (id: number): Promise<Interview> => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch interview');
    }

    return response.json();
}

// To create or add new interview
export const createInterview = async (interview: CreateInterviewPayload): Promise<Interview> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(interview),
    });

    if(!response.ok) {
        throw new Error("Failed to create interview!");
    }

    return response.json();
}

// To modify the existing interview
export const updateInterview = async (id: number, interview: CreateInterviewPayload): Promise<Interview> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(interview)
    });

    if(!response.ok) {
        throw new Error("Failed to update interview.");
    }

    return response.json();
};

// To delete the interview
export const deleteInterview = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if(!response.ok) {
        throw new Error("Failed to delete the interview.");
    }
};