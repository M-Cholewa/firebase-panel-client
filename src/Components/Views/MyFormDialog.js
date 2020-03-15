import React from 'react';
import { Dialog, DialogContent, DialogTitle, Slide, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import MyForm from '../Views/MyForm'
import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}))

export default function MyFormDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // open = false
        setOpen(false);
    };
    return (
        <div>
            <Fab color="primary" aria-label="add" className={classes.fab}
                onClick={handleClickOpen}
            >
                <AddIcon />
            </Fab>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth={true}
                maxWidth={"lg"}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Dodaj nowe zadanie"}</DialogTitle>
                <DialogContent>
                    <MyForm formValues={{ tytul: 'Nowe zadanie' }} id="" isNew={true} />

                </DialogContent>

            </Dialog>
        </div>
    );
}