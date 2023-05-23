import { Metadata } from "./";

export interface Statistic {
    clientIp: string;
    requestType: string;
    searchParams: string[];
    requestedAt: Date;
}

export interface StatisticsDTO {
    statistics: Statistic[];
    metadata: Metadata;
}