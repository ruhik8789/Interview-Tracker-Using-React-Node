import type {Interview} from '../types/interview';
import type {CreateInterviewPayload} from '../types/createInterview';

const API_URL = "http://localhost:5000/api/interviews";

export const getInterviews = async (): Promise<Interview[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch interviews');
    }

    const data: Interview[] = await response.json();

    return data;
}

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