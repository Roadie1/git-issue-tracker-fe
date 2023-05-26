import { IssueDTO, IssueDetailsDTO, StatisticsDTO } from "../models";

const apiUrl = 'http://localhost:3001/'; // TODO

class Api {
    private async execute<T>(url: string, options: RequestInit): Promise<T> {
        try {
            const result = await fetch(url, options);
            if (!result.ok) throw new Error('Something went wrong');
            return result.json();
        }
        catch (err) {
            throw new Error('Connection refused');
        }
    }
    public async searchIssues(username: string, repository: string, page: number = 1, size: number = 10, forced: boolean = false): Promise<IssueDTO> {
        return this.execute(`${apiUrl}issues?user=${username}&repository=${repository}&size=${size}&page=${page}&forced=${forced}`, { method: 'GET' });
    }

    public async fetchStatistics(page: number = 1, size: number = 10): Promise<StatisticsDTO> {
        return this.execute(`${apiUrl}statistics?size=${size}&page=${page}`, { method: 'GET' });
    }

    public async fetchIssueDetails(user: string, repository: string, issueNumber: string): Promise<IssueDetailsDTO> {
        return this.execute(`${apiUrl}issues/details?user=${user}&repository=${repository}&number=${issueNumber}`, { method: 'GET' });
    }
}

export default new Api();
