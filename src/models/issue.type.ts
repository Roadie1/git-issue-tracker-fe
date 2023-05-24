import { Metadata } from "./";

export interface IssueUserInfo {
    login: string;
    avatarUrl: string;
    htmlUrl: string;
}

export interface IssueLabelInfo {
    name: string;
    color: string;
    description: string;
}

export interface Issue {
    id: string;
    number: number;
    title: string;
    user: IssueUserInfo;
    labels: IssueLabelInfo[];
    createdAt: string;
}

export interface IssueDTO {
    issues: Issue[];
    metadata: Metadata
}

export interface IssueUrlParams {
    user: string,
    repository: string,
    page: number,
    size: number,
    forced?: boolean
}