import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Divider, MenuList, MenuItem } from '@material-ui/core'
import { compose } from 'recompose'


class MyRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    }

    handleDrawerToggle() {
        this.props.handleDrawerToggle()
    }

    render() {
        return (
            <div>
                <Divider />
                <MenuList>
                    {directions.supItems.map((item) => (
                        <MenuItem
                            onTouchEndCapture={this.handleDrawerToggle}
                            to={item.dir}
                            component={Link}
                            key={item.id}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </MenuList>
                <Divider />
                <MenuList>
                    {directions.subItems.map((item) => (
                        <MenuItem
                            onTouchEndCapture={this.handleDrawerToggle}
                            to={item.dir}
                            component={Link}
                            key={item.id}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </MenuList>
            </div>
        );
    }
}
const directions = {
    supItems: [
        {
            id: 0,
            name: 'Strona glówna',
            dir: '/glowna'
        },
        {
            id: 1,
            name: 'Powiadomienia',
            dir: '/powiadomienia'
        },
        {
            id: 2,
            name: 'Szczęśliwe numerki',
            dir: '/numerki'
        },
        {
            id: 3,
            name: 'Dyżury nauczycielskie',
            dir: '/dyzury'
        },
    ],

    subItems: [
        {
            id: 0,
            name: 'Stan aplikacji',
            dir: '/stan'
        },
        {
            id: 1,
            name: 'Użytkownicy',
            dir: '/users'
        },
        {
            id: 2,
            name: 'Konto administatora',
            dir: '/admin'
        },
    ]

}
export default compose(withRouter)(MyRouter);