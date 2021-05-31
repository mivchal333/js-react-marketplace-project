import React from "react"
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom'

const DrawerActionsContainer = () => {
    return (<div>
            <ListItem button component={Link} to='/'>
                <ListItemIcon>
                    <SearchIcon/>
                </ListItemIcon>
                <ListItemText primary="Search"/>
            </ListItem>
            <ListItem button component={Link} to='/add'>
                <ListItemIcon>
                    <AddIcon/>
                </ListItemIcon>
                <ListItemText primary="Add Product"/>
            </ListItem>
        </div>
    );
}
export default DrawerActionsContainer
