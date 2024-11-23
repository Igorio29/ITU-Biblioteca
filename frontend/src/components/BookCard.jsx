import React from 'react'
import {
    Paper,
    Box,
    Typography,
    IconButton
} from '@mui/material'
import Grid from "@mui/material/Grid2"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PropTypes from 'prop-types'
import EditBookDialog from './EditBookDialog'
import ConfirmDeleteBookDialog from './ConfirmDeleteDialog';
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { bookDeleteMutation, bookEditMutation } from '../lib/mutations';
import { useSnackbarContext } from '../hooks/useSnackbarContext';

const BookCard = ({ _id: id, titulo, subtitulo, autor, genero, capa }) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const useEditBook = bookEditMutation(id);
    const useDeleteBook = bookDeleteMutation(id);
    const {showSnackbar} = useSnackbarContext()


    const handleEditDialogOpen = () => {
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleEditSaveBook = async (data) => {
        try {
            await useEditBook.mutateAsync(data);
            showSnackbar("Livro editado com sucesso", "success")
        } catch (error) {
            console.error("Ocorreu um erro ao editar o livro", error);
            showSnackbar("Ocorreu um erro ao editar o livro", "error")
        }
        handleEditDialogClose();
    }

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setIsDeleting(false);
    };

    const handleDeleteBook = async () => {
        try {
            setIsDeleting(true);
            await useDeleteBook.mutateAsync();
            showSnackbar("Livro excluido com sucesso", "success")
        } catch (error) {
            console.error("Ocorreu um erro ao deletar o livro", error);
            showSnackbar("Ocorreu um erro ao deletar o livro", "error")
        }
        handleDeleteDialogClose();

    }


    return (

        <Grid xs={12} sm={6} md={4} lg={2}>
            <Paper elevation={3}>
                <Box sx={{
                    width: "100%",
                    height: 500,
                    overflow: "hidden",
                    img: {
                        width: "350px",
                        height: "100%",
                        "@media (max-width: 600px)": {
                            objectFit: "contain"
                        }
                    }
                }}>
                    <img src= {capa} alt={`capa do livro ${titulo}: ${id}`} />
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography variant="h6" component="h2" noWrap>
                        {titulo}
                    </Typography>
                    <Typography variant="body2" component="p" noWrap>
                        {subtitulo}
                    </Typography>
                    <Typography variant="body2" component="p" noWrap>
                        {autor}
                    </Typography>
                    <Typography variant="body2" component="p" noWrap>
                        {genero}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "end"
                }}>
                    <IconButton onClick={handleEditDialogOpen}>
                        <EditIcon></EditIcon>
                    </IconButton>
                    <IconButton onClick={handleDeleteDialogOpen}>
                        <DeleteForeverIcon></DeleteForeverIcon>
                    </IconButton>
                </Box>
            </Paper>
            <EditBookDialog
                book={{ id, titulo, subtitulo, autor, genero, capa }}
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                onSave={handleEditSaveBook}
            />

            <ConfirmDeleteBookDialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                onDelete={handleDeleteBook} 
                isDeleting={isDeleting}/>
        </Grid>

    )
}

BookCard.propTypes = {
    _id: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    subtitulo: PropTypes.string.isRequired,
    autor: PropTypes.string.isRequired,
    genero: PropTypes.string.isRequired,
    capa: PropTypes.string.isRequired
}

export default BookCard
