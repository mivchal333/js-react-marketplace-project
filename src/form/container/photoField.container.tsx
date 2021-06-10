import React, {useEffect, useState} from "react";
import PhotoService from '../../service/photo.service'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {CardMedia, CircularProgress, createStyles, GridList, GridListTile, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ImageIcon from '@material-ui/icons/Image';
import {isEmpty} from "lodash-es";

interface Props {
    onChange: (event: any) => void,
    value?: string,
    productName?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 500,
            height: 450,
        },
        media: {
            height: 140,
            cursor: 'pointer'
        },
        gridListItem: {
            cursor: 'pointer'
        }
    }),
);
const PhotoField = (props: Props) => {
    const classes = useStyles();

    const [query, setQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [photoOptions, setPhotoOptions] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)


    const loadPhotos = (query: string) => {
        setIsLoading(true)
        PhotoService.loadPhotos(query)
            .then(photos => {
                setPhotoOptions(photos)
                setIsLoading(false)
            })

    }
    useEffect(() => {
        loadPhotos(props.productName || 'Product')
    }, [])

    const onInputChange = (query: string) => {
        loadPhotos(query)
        setQuery(query);
    }

    const onDialogClose = () => setIsDialogOpen(false);
    const onPhotoSelect = (imageSrc: string) => {
        props.onChange(imageSrc)
        setIsDialogOpen(false)
    }
    return (
        <div>
            {props.value ?
                (<CardMedia
                    className={classes.media}
                    image={props.value}
                    title="Product Image"
                    onClick={() => setIsDialogOpen(true)}
                />)
                :
                (<Button
                    startIcon={<ImageIcon/>}
                    variant="outlined"
                    onClick={() => {
                        setIsDialogOpen(true)
                    }}
                >
                    Select image
                </Button>)
            }
            <Dialog open={isDialogOpen} onClose={onDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Search image</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Search by query"
                        fullWidth
                        value={query}
                        onChange={(e) => {
                            const {value} = e.target;
                            onInputChange(value);
                        }}
                        autoComplete="off"
                    />
                    {isLoading && (
                        <CircularProgress/>
                    )}
                    {isEmpty(photoOptions) && (!isLoading) && (
                        <p>No results</p>
                    )}
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {photoOptions.map((imageSrc) => (
                            <GridListTile
                                key={imageSrc}
                                cols={1}
                                className={classes.gridListItem}
                                onClick={() => onPhotoSelect(imageSrc)}
                            >
                                <img src={imageSrc} alt="Image"/>
                            </GridListTile>
                        ))}
                    </GridList>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDialogClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}
export default PhotoField
