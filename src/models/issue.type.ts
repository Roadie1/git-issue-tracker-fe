import { Metadata } from "./";

interface IssueUserInfo {
    login: string;
    avatarUrl: string;
    htmlUrl: string;
}

interface IssueLabelInfo {
    name: string;
    color: string;
    description: string;
}

export interface Issue {
    htmlUrl: string;
    id: string;
    number: number;
    title: string;
    user: IssueUserInfo;
    labels: IssueLabelInfo[];
    locked: boolean;
    createdAt: string;
    body: string;
}

export interface IssueDTO {
    issues: Issue[];
    metadata: Metadata
}