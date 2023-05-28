import {
  ApiError,
  IssueDTO,
  IssueDetailsDTO,
  StatisticsDTO,
} from '../models';

class Api {
  private static async execute<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json() as Error;
      const apiError: ApiError = { ...error, status: response.status };
      throw apiError;
    }
    const result = await response.json() as T;
    return result;
  }

  public static async searchIssues(
    username: string,
    repository: string,
    page = 1,
    size = 10,
    forced = false,
  ): Promise<IssueDTO> {
    return this.execute(
      `${process.env.API_URL}issues?user=${username}&repository=${repository}&size=${size}&page=${page}&forced=${forced.toString()}`,
      { method: 'GET' },
    );
  }

  public static async fetchStatistics(page = 1, size = 10): Promise<StatisticsDTO> {
    return this.execute(`${process.env.API_URL}statistics?size=${size}&page=${page}`, { method: 'GET' });
  }

  public static async fetchIssueDetails(
    user: string,
    repository: string,
    issueNumber: string,
  ): Promise<IssueDetailsDTO> {
    return this.execute(`${process.env.API_URL}issues/details?user=${user}&repository=${repository}&number=${issueNumber}`, { method: 'GET' });
  }
}

export default Api;
