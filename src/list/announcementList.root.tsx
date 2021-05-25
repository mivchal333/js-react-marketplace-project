import React from 'react';
import ProductsTableContainer from "./container/productsTable.container";
import {CssBaseline} from "@material-ui/core";
import DrawerContainer from "./container/drawer/drawer.container";

const AnnouncementList = () => {
    return (
        <div>
            <DrawerContainer>
                <CssBaseline/>
                <ProductsTableContainer/>
            </DrawerContainer>
        </div>
    );
};
export default AnnouncementList
