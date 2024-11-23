import { useQueryClient, useMutation, QueryClientContext, QueryClient } from "@tanstack/react-query";
import { createBook, deleteBook, updateBook } from "./api";


export const bookCreateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({

        mutationFn: (data) => createBook(data),
        onMutate: () => {
            return queryClient.getQueryData(["books"]); //estado atual
        },
        onSuccess: (data) => {
            console.log({data})
            queryClient.setQueryData(["books"], (oldData) => [...oldData, data]);
        },
        onError: (error, context) => { console.error("Erro ao cadastrar livro ", error), queryClient.setQueryData(["books"], context) },
    });
};

export const bookEditMutation = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateBook", id],
        mutationFn: (data) => updateBook(id, data),
        onMutate: () => {
            return queryClient.getQueryData(["books"]); //estado atual
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["books"], (oldData) => {
                return oldData.map((book) => (
                    book._id === id ? data : book));
            });
        },
        onError: (error, context) => { console.error("Erro ao atualizar o livro ", error), queryClient.setQueryData(["books"], context) },

    });
};

export const bookDeleteMutation = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteBook", id],
        mutationFn: () => deleteBook(id),
        onMutate: () => {
            return queryClient.getQueryData(["books"])
        },
        onSuccess: () => {
            queryClient.setQueryData(["books"], (oldData) => {
                return oldData.filter((book) => book._id !== id);
            });
        },
        
        onError: (error, _variables, context) => { console.error("Erro ao Deletar o livro ", error), queryClient.setQueryData(["books"], context) },
    });
};
