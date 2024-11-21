import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const EditBookDialog = ({ book, open, onClose, onSave }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            titulo: book.titulo,
            subtitulo: book.subtitulo|| "",
            autor: book.autor,
            genero: book.genero,
            capa: book.capa
        }
    });
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
        >
            <form noValidate onSubmit={handleSubmit(onSave)}>
                <DialogTitle>Editar livro:{book.titulo}</DialogTitle>
                <DialogContent>

                    <TextField
                        id="outlined-basic"
                        label="Titulo"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("titulo", {
                            required: 'O titulo é obrigatorio',
                            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                        })}
                        error={!!errors.titulo}
                        helperText={errors?.titulo?.message}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Subtitulo"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("subtitulo", {
                            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                        })}
                        error={!!errors.subtitulo}
                        helperText={errors?.subtitulo?.message} />
                    <TextField
                        id="outlined-basic"
                        label="Autor"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("autor", {
                            required: 'O autor é obrigatorio',
                            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                        })}
                        error={!!errors.autor}
                        helperText={errors?.autor?.message} />
                    <TextField
                        id="outlined-basic"
                        label="Genero"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("genero", {
                            required: 'O genero é obrigatorio',
                            minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                        })}
                        error={!!errors.genero}
                        helperText={errors?.genero?.message} />
                    <TextField
                        id="outlined-basic"
                        label="Imagem da capa"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("capa", {
                            required: 'O capa é obrigatorio',
                            pattern: {
                                value:
                                    /^(https?:\/\/.*\.(?:png|jpg|jpeg|giff|webp|bmp|tiff))$/i,
                                message: 'Url de imagem invalida'
                            },
                        })}
                        error={!!errors.capa}
                        helperText={errors?.capa?.message} />
                    <DialogActions>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button variant="contained" color="primary" type="submit">Atualizar Livro</Button>
                    </DialogActions>

                </DialogContent>
            </form>
        </Dialog >
    );
}

EditBookDialog.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.string.isRequired,
        titulo: PropTypes.string.isRequired,
        subtitulo: PropTypes.string.isRequired,
        autor: PropTypes.string.isRequired,
        genero: PropTypes.string.isRequired,
        capa: PropTypes.string.isRequired
    }),
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}

export default EditBookDialog