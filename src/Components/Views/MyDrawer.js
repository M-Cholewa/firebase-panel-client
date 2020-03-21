import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MyAppbar from './MyAppbar'
import MyRouter from './MyRouter'
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Hidden, CssBaseline, Drawer } from '@material-ui/core'



const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },

    },
    drawerPaper: {
        width: drawerWidth,
        // background: 'rgba(255, 255, 255, 0.95)',
        // color: "rgba(0, 0, 0, 0.87)"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
});

class MyDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        }
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen })
    }

    render() {
        const { classes, children, container } = this.props

        const menuBtn = (
            <Hidden smUp>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
            </Hidden>
        )

        const drawer = (
            <div>
                <Hidden xsDown>
                    <div className={classes.toolbar} />
                </Hidden>
                <MyRouter handleDrawerToggle={this.handleDrawerToggle.bind(this)} />
            </div>
        );

        return (
            <div className={classes.root} >

                <CssBaseline />
                <MyAppbar>
                    {menuBtn}
                </MyAppbar>

                <nav className={classes.drawer}>
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>

                </nav>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        );
    }
}

MyDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MyDrawer);