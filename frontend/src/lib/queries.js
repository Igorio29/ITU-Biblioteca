import { useQuery } from "@tanstack/react-query"
import { getBooks } from "./api"

export const useBooks = () =>
    useQuery({
        queryKey: ["books"],
        queryFn: getBooks,
        retry: 3,
        staleTime: 1000 * 60 * 5
    })


export const useBook = (bookId) =>
    useQuery({
        queryKey: ["book", bookId],
        queryFn: getBooks(bookId),
        retry: 3,
        staleTime: 1000 * 60 * 30
    })
