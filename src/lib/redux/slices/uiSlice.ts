import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UISearchType = {
    avaiableChats: string,
    contacts: string,
    messages: string
}

const UISearchInitialState: UISearchType = {
    avaiableChats: '',
    contacts: '',
    messages: ''
}


const initialState: any = {
    keepUserAuthData: false,

}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        //ADD A NEW LOADING STATE TO APP 
        uiSetLoading: (state, action) => {
            if (state.loading.some((loading: string) => loading === action.payload)) return state;
            const newLoading = [...state.loading, action.payload];
            return {
                ...state,
                loading: newLoading,
            };
        },

        //FINISH A LOADING STATE IF IT'S CURRENTLY RUNNING
        uiFinishLoading: (state, action) => {
            const newLoading = state.loading.filter((loading: string) => loading !== action.payload);
            return {
                ...state,
                loading: newLoading,
            };
        },



    },
});
export const {
    uiSetLoading,
    uiFinishLoading,


} = uiSlice.actions;
export default uiSlice.reducer;