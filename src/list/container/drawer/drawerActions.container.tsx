import React from "react"
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


const DrawerActionsContainer = () => {
    return (<div>
            <ListItem button>
                <ListItemIcon>
                    <SearchIcon/>
                </ListItemIcon>
                <ListItemText primary="Search"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AddIcon/>
                </ListItemIcon>
                <ListItemText primary="Add Product"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <EditIcon/>
                </ListItemIcon>
                <ListItemText primary="Edit Product"/>
            </ListItem>
        </div>
    );
}
export default DrawerActionsContainer
