import { IssueLabelInfo, IssueUserInfo } from "./issue.type";

export interface IssueDetailsDTO {
    htmlUrl: string;
    id: string;
    number: number;
    title: string;
    user: IssueUserInfo;
    labels: IssueLabelInfo[];
    locked: boolean;
    createdAt: string;
    body: string;
    state: string;
    assignees: IssueUserInfo[];
}

export interface DetailsUrlParams {
    user: string,
    repository: string,
    issueNumber: string
}