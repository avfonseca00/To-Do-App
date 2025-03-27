export enum taskStatus {
    Pending = "pending",
    Completed = "completed"
}
export type taskObject = {
    _id: string
    title: string,
    description: string,
    status: taskStatus,
    userId: string,
    createdAt: string,
    updatedAt: string
}
export type paginationObject = {
    page: number,
    limit: number,
    totalPages: number,
    totalItems: number
}
export type taskDataResponse = {
    data: Array<taskObject>,
    pagination: paginationObject
}
export type searchResponse = {
    data: Array<taskObject>,
    page: number,
    pageSize: number,
    total: number
}