import React from 'react'
import Grid from "@mui/material/Grid2"
import { Link } from 'react-router-dom'
import BookCard from './BookCard';
import { useBooks } from '../lib/queries';
import { Button, Container, Typography } from '@mui/material';
import BookCardSkeleton from './BookCardSkeleton';

const BookGrid = () => {
    const { data, isLoading, isError } = useBooks();

    if (isError) {
        return <Typography>Ocorreu um erro ao carregar os livros...</Typography>
    }

    return (
        <div>
            <Grid container spacing={2} justifyContent="center"
                alignItems="center">
                {isLoading ? (<BookCardSkeleton count="4"/>) : data.length ? (
                    data.map((book) =>
                        <BookCard key={book._id} {...book} />
                    )) : (
                    <Grid xs={12}>
                        <Container maxWidth="sm" sx={{ mt: 2, textAlign: "center" }}/>
                        <Typography variant="4" component="h5"> Nenhum livro encontrado</Typography>
                        <Button variant="contained" component={Link} to={"/create-book"} sx={{ mt: 2 }}>Cadastrar livro</Button>
                    </Grid>
                )}
            </Grid>
        </div >
    )

}
export default BookGrid
