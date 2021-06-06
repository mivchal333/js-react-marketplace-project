import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";


const useStyles = makeStyles({
    root: {
        margin: '2em',
        width: '50em',
    },
});


const ProductNotFound = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant={"h5"} gutterBottom>
                    Product not found
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to="/">Back</Button>
            </CardActions>
        </Card>
    )
}
export default ProductNotFound;
