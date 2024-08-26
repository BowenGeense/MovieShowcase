export interface Franchise {
    id: number;
    name: string;
    overview: string;
    url: string;
    isOfficial: boolean;
    nameTranslations: string[];
    overviewTranslations: string[];
    aliases: { language: string; name: string }[];
    score: number;
    image: string;
    imageIsFallback: boolean;
    remoteIds: any[];
    tags: any;
    entities: { order: number; seriesId: number | null; movieId: number | null }[];
}