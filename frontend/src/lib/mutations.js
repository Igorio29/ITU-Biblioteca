import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createBook, deleteBook, updateBook } from "./api";


export const bookCreateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createBook(data),
        onSuccess: () => queryClient.invalidateQueries("books"),
        onError: (error) => {("Erro ao cadastrar livro ", error)},
    });
};

export const bookEditMutation = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["updateBook", id],
        mutationFn: (data) => updateBook(id, data),
        onSuccess: () => queryClient.invalidateQueries(["books"]),
        onError: (error) =>{("Erro ao editar livro ", error)},
    });
};

export const bookDeleteMutation = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteBook", id],
        mutationFn: () => deleteBook(id),
        onSuccess: () => queryClient.invalidateQueries(["books"]),
        onError: (error) => {("Erro ao deletar livro ", error)},
    });
};
