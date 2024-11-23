import { Box, Button, CardActions, CardHeader, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { bookCreateMutation } from '../lib/mutations';
import { useSnackbarContext } from '../hooks/useSnackbarContext';

const CreateBookPage = () => {
    const navigate = useNavigate()
    const {mutateAsync} = bookCreateMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const {showSnackbar} = useSnackbarContext()

    const onSubmit = async (data) => {
        try {
            await mutateAsync(data);
            showSnackbar("Livro cadastrado com sucesso", "success")
        } catch (error) {
            console.error("Ocorreu um erro ao cadastrar o livro", error);
            showSnackbar("Ocorreu um erro ao cadastrar o livro", "error")
        }
        reset();
        navigate("/");
        
    }

    return (
        <Card sx={{ p: 2, my: 5 }}>
            <CardHeader title="Cadastrar um novo livro" />
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Box sx={{ display: "flex", gap: 2 }}>
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
                            disabled={isSubmitting}
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
                            helperText={errors?.subtitulo?.message}
                            disabled={isSubmitting} />
                            
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
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
                            helperText={errors?.autor?.message}
                            disabled={isSubmitting} />
                            
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
                            helperText={errors?.genero?.message}
                            disabled={isSubmitting} />
                            
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
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
                            helperText={errors?.capa?.message}
                            disabled={isSubmitting}/>
                            
                    </Box>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                        
                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}

                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default CreateBookPage
