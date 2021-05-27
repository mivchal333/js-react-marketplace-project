import React from "react";
import {TextField} from "@material-ui/core";
import {useAsyncDebounce} from "react-table";

const GlobalFilter = (
    {
        globalFilter,
        setGlobalFilter,
    }: any) => {
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <TextField label="Search..." variant="outlined"
                   value={value}
                   onChange={event => {
                       onChange(event.target.value);
                       setValue(event.target.value)
                   }}
        />

    )
};
export default GlobalFilter
