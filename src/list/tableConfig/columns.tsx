import {Column} from "react-table";
import {Product} from "../../model/product.model";
import PreviewImage from "../container/tableCell/previewImage.container";
import DefaultFilter from "../container/tableFilter/defaultFilter";
import NumberRangeColumnFilter from "../container/tableFilter/numberRangeColumnFilter";

export const columns: Column<Product>[] = [
    {
        Header: 'Image',
        accessor: 'image',
        Cell: ({row}) => (
            <PreviewImage src={row.original.image} id={row.original.id}/>
        ),
        disableFilters: true,
        disableGlobalFilter: true,
        disableSortBy: true,
    },
    {
        Header: 'Name',
        accessor: 'name',
        Filter: DefaultFilter
    },
    {
        Header: 'Price',
        accessor: 'price',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
    }
]
