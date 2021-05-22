import React from 'react';
import ProductsTableContainer from "./container/productsTable.container";
import {CssBaseline} from "@material-ui/core";

const AnnouncementList = () => {
    return (
        <div>
            <CssBaseline/>
            <ProductsTableContainer/>
        </div>
    );
};
export default AnnouncementList
