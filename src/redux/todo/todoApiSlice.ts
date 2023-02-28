import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAddTodo, ITodo, IUpdateStatus } from '../../interface/ITodo';
import { API_URL } from '../../services/apiUrl';

const todoApiSlice = createApi({
    reducerPath: 'todoApiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/todo`,
    }),
    keepUnusedDataFor: 30,
    tagTypes: ['todo'],
    endpoints: (builder) => ({
        allTodoList: builder.query<ITodo[], void>({
            query: () => `/`,
            keepUnusedDataFor: 30,
            providesTags: ['todo'],
        }),

        deleteTodo: builder.mutation<void, number>({
            query: (todoId) => ({
                url: `/${todoId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['todo'],
        }),

        addTodo: builder.mutation<ITodo, IAddTodo>({
            query: (todo) => ({
                url: `/`,
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['todo'],
        }),

        updateTodoStatus: builder.mutation<ITodo, IUpdateStatus & { todoId: number }>({
            query: ({ todoId, status }) => ({
                url: `/${todoId}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['todo'],
        }),
    }),
    refetchOnReconnect: true,
});


export const {
    useAddTodoMutation,
    useAllTodoListQuery,
    useDeleteTodoMutation,
    useUpdateTodoStatusMutation
} = todoApiSlice;

export default todoApiSlice;