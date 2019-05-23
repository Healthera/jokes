interface ISingleResource {
    id: string;
}

interface IMultipleResource {
    resultCount: number;
    results: ISingleResource[];
}

interface ISortingOption {
    field: string;
    direction: string;
}

interface IPaginationOptions {
    pageNumber: number;
    pageSize: number;
    sorting: ISortingOption[];
}
