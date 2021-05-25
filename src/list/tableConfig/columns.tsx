import {Column} from "react-table";
import {Product} from "../../model/product.model";
import PreviewImage from "../container/tableCell/previewImage.container";

export const columns: Column<Product>[] = [
    {
        Header: 'Image',
        accessor: 'image',
        Cell: ({row}) => (
            <PreviewImage src={row.original.image} id={row.original.id}/>
        )
    },
    {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Description',
        accessor: 'description'
    },
    {
        Header: 'Price',
        accessor: 'price'
    }
]
