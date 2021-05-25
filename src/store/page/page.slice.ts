import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PageState {
    selectedAnnouncementId?: number,
}

const initialState: PageState = {
    selectedAnnouncementId: undefined,
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setSelectedAnnouncement: (state, action: PayloadAction<number>) => {
            state.selectedAnnouncementId = action.payload
        },
    }
})

export const {setSelectedAnnouncement} = pageSlice.actions

export default pageSlice.reducer
