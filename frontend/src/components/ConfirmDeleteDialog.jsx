import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { DialogContentText } from '@mui/material';

const ConfirmDeleteBookDialog = ({ open, onClose, onDelete, isDeleting }) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
        >
            <DialogTitle>Tem certeza que deseja excluir este livro ?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Esta ação não pode ser desfeita!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isDeleting}>Cancelar</Button>
                <Button onClick={onDelete} variant="contained" color="error" disabled={isDeleting}>

                    {isDeleting ? "Excluindo..." : "Excluir"}

                </Button>
            </DialogActions>
        </Dialog >
    );
}

ConfirmDeleteBookDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool
}

export default ConfirmDeleteBookDialog