import {Column} from "react-table";
import {Product} from "../../model/product";
import PreviewImage from "../component/tableCell/previewImage.component";

export const columns: Column<Product>[] = [
    {
        Header: 'Image',
        accessor: 'image',
        Cell: ({row}) => (
            <PreviewImage src={row.original.image}/>
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
