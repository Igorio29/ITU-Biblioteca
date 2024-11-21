import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Container component="main" maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
                <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                    404 - Página não encontrada
                </Typography>
                <Typography variant="subtitle1" align="center" color="gutter" gutterBottom>
                    A pagina que você esta procurando não existe.
                </Typography>
                <Box mt={5}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/")}
                    >
                        Voltar para a pagina inicial
                    </Button>
                </Box>
            </Container>
        </div>
    )
}

export default NotFoundPage
