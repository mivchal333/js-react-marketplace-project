import React from "react";
import {TextField} from "@material-ui/core";

const DefaultFilter = ({column: {filterValue, setFilter},}: any) => {
    return (
        <TextField
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search..`}
        />
    )

}
export default DefaultFilter
