import type {Interview} from '../types/interview';

const API_URL = "http://localhost:5000/api/interviews";

export const getInterviews = async (): Promise<Interview[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch interviews');
    }

    const data: Interview[] = await response.json();

    return data;
}