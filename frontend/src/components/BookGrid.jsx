import React from 'react'
import Grid from "@mui/material/Grid2"
import BookCard from './BookCard';
import { getBooks } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { useBooks } from '../lib/queries';

const BookGrid = () => {
    const { data, isLoading, isError } = useBooks();

    if (isLoading) {
        return <p>Carregando...</p>
    }

    if (isError) {
        return <p>Ocorreu um erro ao carregar os livros...</p>
    }

    return (
        <div>
            <Grid container spacing={2} justifyContent="center"
                alignItems="center">
                {data.length ? (
                    data.map((book) =>
                        <BookCard key={book._id} {...book} />
                    )) : (
                    <p>Não há livros cadastrados</p>
                )}
            </Grid>
        </div >
    )

}
export default BookGrid
