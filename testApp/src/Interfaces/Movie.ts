export interface Movie {
    id: number;
    name: string;
    slug: string;
    image: string;
    nameTranslations: string[];
    overviewTranslations: string[];
    aliases: { language: string; name: string }[];
    score: number;
    runtime: number;
    status: { id: number; name: string; recordType: string; keepUpdated: boolean };
    lastUpdated: string;
    year: string;
}