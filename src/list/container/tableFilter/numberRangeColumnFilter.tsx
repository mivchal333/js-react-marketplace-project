import React from "react";
import {TextField} from "@material-ui/core";

function NumberRangeColumnFilter({
                                     column: {filterValue = [], setFilter},
                                 }: any) {
    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <TextField
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                }}
                placeholder={`Min`}
                style={{
                    width: '100px',
                    marginRight: '0.5rem',
                }}
            />
            to
            <TextField
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
                }}
                placeholder={`Max`}
                style={{
                    width: '100px',
                    marginLeft: '0.5rem',
                }}
            />
        </div>
    )
}

export default NumberRangeColumnFilter
