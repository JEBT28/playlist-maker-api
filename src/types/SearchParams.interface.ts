export interface QuerySearch {
    limit: number;
    offset: number;
    order: [string, 'asc' | 'desc'];
    status: boolean;
    search: string
}