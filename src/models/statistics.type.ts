import { Metadata } from "./";

export interface SearchParameters {
    parameter: string;
    value: string;
}

export interface Statistic {
    clientIp: string;
    requestType: string;
    searchParams: SearchParameters[];
    requestedAt: Date;
}

export interface StatisticsDTO {
    statistics: Statistic[];
    metadata: Metadata;
}

export interface StatisticsUrlParams {
    page: number;
    size: number;
}