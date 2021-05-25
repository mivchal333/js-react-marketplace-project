import {RootState} from "../store";

const getSelectedAnnouncementId = (state: RootState) => state.page.selectedAnnouncementId

export {
    getSelectedAnnouncementId,
}
