export interface Interview {
    id: number;
    company: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface InterviewResponse {
    data: Interview[];
    pagination: Pagination;
}