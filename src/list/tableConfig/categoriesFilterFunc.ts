import {includes, isEmpty, toNumber} from "lodash-es";
import {FilterValue, IdType, Row} from "react-table";
import {Product} from "../../model/product.model";

export const categoriesFilterFunc = (rows: Row<Product>[], columnIds: IdType<Product>[], filterValue: FilterValue) => {
    if (isEmpty(filterValue)) {
        return rows;
    }
    return rows
        .filter(row => includes(row.values.categories, toNumber(filterValue)))
}

