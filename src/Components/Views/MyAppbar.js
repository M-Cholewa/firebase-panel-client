import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },

    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },
});

class MyAppbar extends Component {

    render() {
        const { classes, children } = this.props

        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {children}
                    <Typography variant="h6" color="inherit" noWrap>
                        Admin panel - ReactJS, Spring Boot
                </Typography>

                </Toolbar>
            </AppBar>);
    }
}

export default withStyles(styles)(MyAppbar);