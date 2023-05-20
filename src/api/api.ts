import { IssueDTO } from "../models";

// const { API_URL } = process.env;
const API_URL  = 'http://localhost:3001/';

export async function searchIssues(username: string, repository: string, page: number = 1, size: number = 10): Promise<IssueDTO> {
    const result = await fetch(`${API_URL}issues?user=${username}&repository=${repository}&size=${size}&page=${page}`, { method: 'GET' });
    return await result.json();
}