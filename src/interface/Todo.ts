export interface ITodo {
    _id: string;
    title: string;
    task: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAddTodo {
    title: string;
    task: string;
}

export interface IUpdateStatus {
    status: boolean;
}

export interface ITodoList {
    todoList: ITodo[]
}

