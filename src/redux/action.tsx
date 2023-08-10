/* eslint-disable react-refresh/only-export-components */
import { useDispatch } from "react-redux";
import { authSlice } from "./features/user/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";

const AllAction = {
    ...authSlice.actions
};

const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(AllAction, dispatch)
}

export default useActions;