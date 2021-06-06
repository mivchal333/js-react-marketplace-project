import PixelsRepository, {Photo} from '../api/pixels.api'
import {map} from "lodash-es";

const DEFAULT_QUERY_TERM = 'Product'

const loadPhotos = async (query?: string): Promise<string[]> => {
    const finalParam = query ? query : DEFAULT_QUERY_TERM
    const {data: {photos = []}} = await PixelsRepository.fetchImages(finalParam)

    return map(photos, (photo: Photo) => photo.src.small)
}
export default {
    loadPhotos
}
