import type {Interview} from '../types/interview';
import type {InterviewResponse} from '../types/interview';
import type {CreateInterviewPayload} from '../types/createInterview';

const API_URL = "http://localhost:5000/api/interviews";

export interface GetInterviewsParams {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
}

// To get all the interviews
export const getInterviews = async ({
    page = 1,
    limit = 10,
    status,
    search,
    sortBy = "created_at",
    order = "desc"
}: GetInterviewsParams = {}): Promise<InterviewResponse> => {
    const queryParams = new URLSearchParams();

    queryParams.set("page", page.toString());
    queryParams.set("limit", limit.toString());
    queryParams.set("sortBy", sortBy);
    queryParams.set("order", order);

    if (status) {
        queryParams.set("status", status);
    }

    if (search) {
        queryParams.set("search", search);
    }

    const response = await fetch(`${API_URL}?${queryParams.toString()}`);

    if (!response.ok) {
        throw new Error('Failed to fetch interviews');
    }

    const data: InterviewResponse = await response.json();

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