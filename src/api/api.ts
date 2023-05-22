import { IssueDTO } from "../models";

const apiUrl = 'http://localhost:3001/'; // TODO

export async function searchIssues(username: string, repository: string, page: number = 1, size: number = 10, forced: boolean = false): Promise<IssueDTO> {
    const result = await fetch(`${apiUrl}issues?user=${username}&repository=${repository}&size=${size}&page=${page}&forced=${forced}`, { method: 'GET' });
    return await result.json();
}