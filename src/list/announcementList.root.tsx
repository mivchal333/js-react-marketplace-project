import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {getUsers} from "../store/users/users.selector";
import {RootState} from "../store/store";

type Props = PropsFromRedux;
const AnnouncementList = (props: Props) => {
    return (
        <div>
            List
        </div>
    );
};
const mapStateToProps = (state: RootState) => ({
    users: getUsers(state)
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(AnnouncementList)
