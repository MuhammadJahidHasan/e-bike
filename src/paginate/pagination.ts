import { PaginationResultInterface } from "./pagination.result.interface";

export class Pagination<PaginationEntity> {
    public result: PaginationEntity[];
    public total: number;
   
    constructor(paginationResult: PaginationResultInterface<PaginationEntity>) {
            this.result = paginationResult.result;
            this.total = paginationResult.total;
    }
}