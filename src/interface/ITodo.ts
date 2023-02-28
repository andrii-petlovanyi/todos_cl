export interface ITodo {
    id: string;
    title: string;
    task: string;
    status: boolean;
}

export interface IAddTodo {
    title: string;
    task: string;
}

export interface IUpdateStatus {
    status: boolean;
}