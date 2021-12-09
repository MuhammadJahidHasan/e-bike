

export interface PaginationResultInterface<PaginationEntity> {
    result: PaginationEntity[];
    total: number;
    limit: number;
    page: number;
}