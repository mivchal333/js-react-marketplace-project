import {Column} from "react-table";
import {Product} from "../../model/product.model";
import PreviewImage from "../container/tableCell/previewImage.container";
import DefaultFilter from "../container/tableFilter/defaultFilter";
import NumberRangeColumnFilter from "../container/tableFilter/numberRangeColumnFilter";
import {categoriesFilterFunc} from "./categoriesFilterFunc";
import ProductName from "../container/tableCell/productName";
import PriceLabel from "../container/tableCell/priceLabel";

export const columns: Column<Product>[] = [
    {
        Header: '',
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
        Cell: ({row}) => (<ProductName product={row.original}/>),
        Filter: DefaultFilter,
        sortType: "string"
    },
    {
        Header: 'Price',
        accessor: 'price',
        Filter: NumberRangeColumnFilter,
        Cell: ({row}) => (<PriceLabel product={row.original}/>),
        filter: 'between',
    },
    {
        id: "categories",
        accessor: "categories",
        filter: categoriesFilterFunc,
    }
]
