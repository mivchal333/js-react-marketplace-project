import React from "react";
import {TextField} from "@material-ui/core";
import {toNumber} from "lodash-es";

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
                    const numberValue = toNumber(val);
                    setFilter((old = []) => [numberValue > 0 ? numberValue : undefined, old[1]])
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
                    const numberValue = toNumber(val);
                    setFilter((old = []) => [old[0], numberValue > 0 ? numberValue : undefined])
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
