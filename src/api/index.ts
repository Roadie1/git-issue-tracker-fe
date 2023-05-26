import { IssueDTO, IssueDetailsDTO, StatisticsDTO } from "../models";

class Api {
    private async execute<T>(url: string, options: RequestInit): Promise<T> {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!response.ok) {
            throw { status: response.status, message: result.message };
        }
        return result;
    }
    public async searchIssues(username: string, repository: string, page: number = 1, size: number = 10, forced: boolean = false): Promise<IssueDTO> {
        return this.execute(`${process.env.API_URL}issues?user=${username}&repository=${repository}&size=${size}&page=${page}&forced=${forced}`, { method: 'GET' });
    }

    public async fetchStatistics(page: number = 1, size: number = 10): Promise<StatisticsDTO> {
        return this.execute(`${process.env.API_URL}statistics?size=${size}&page=${page}`, { method: 'GET' });
    }

    public async fetchIssueDetails(user: string, repository: string, issueNumber: string): Promise<IssueDetailsDTO> {
        return this.execute(`${process.env.API_URL}issues/details?user=${user}&repository=${repository}&number=${issueNumber}`, { method: 'GET' });
    }
}

export default new Api();
