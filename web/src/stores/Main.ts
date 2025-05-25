import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEnvBrowser } from "../utils/misc";

export interface MainType {
    visible: boolean;
}

const Main = createSlice({
    name: "Static",
    initialState: {
        visible: isEnvBrowser() ? true : false,
    } as MainType,
    reducers: {
        setVisible: (state, action: PayloadAction<boolean>) => {
            state.visible = action.payload;
        }
    }
})

export const {
    setVisible
} = Main.actions

export default Main.reducer