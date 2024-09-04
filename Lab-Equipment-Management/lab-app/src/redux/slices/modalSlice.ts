import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface ModalSliceState{
    displayLogin:boolean;
    displayLabcardId:boolean;
    displayLoan:boolean;
    displayMLogin:boolean;
}

const initialState:ModalSliceState={
    displayLogin:false,
    displayLabcardId:false,
    displayLoan:false,
    displayMLogin:false,
}

export const ModalSlice= createSlice({
    name:'modal',
    initialState,
    reducers:{
        setDisplayLogin(state, action:PayloadAction<boolean>){
            state= {
                ...state,
                displayLogin: action.payload
            }
            return state;
        },
        setDisplayMLogin(state, action:PayloadAction<boolean>){
            state= {
                ...state,
                displayLogin: action.payload
            }
            return state;
        },
         setDisplayLabCardId(state, action:PayloadAction<boolean>){
            state= {
                ...state,
                displayLabcardId: action.payload
            }
            return state;
        },
        setDisplayLoan(state, action:PayloadAction<boolean>){
            state= {
                ...state,
                displayLoan: action.payload
            }
            return state;
        }
    }
})

export const {setDisplayLogin, setDisplayLabCardId, setDisplayLoan,setDisplayMLogin}=ModalSlice.actions;
export default ModalSlice.reducer;