import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CheckInComponentPayload, CheckoutComponentPayload, Component, ComponentPayload } from "../../models/Component";
import { PageInfo } from "../../models/Page";

interface ComponentSliceState {
    loading: boolean;
    error: boolean;
    errorUpload: string | null;
    successMessage: string | null;
    components: Component[];
    currentComponent: Component | undefined;
    pagingInformation: PageInfo | null;
}

const initialState: ComponentSliceState = {
    loading: true,
    error: false,
    errorUpload: null,
    successMessage: null,
    components: [],
    currentComponent: undefined,
    pagingInformation: null,
};
export const fetchAllComponents = createAsyncThunk(
    'component/all',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8000/component/');
           
            return response.data.components;
           
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const RegisterComponent = createAsyncThunk(
    'component/upload',
    async (component:ComponentPayload, thunkAPI) => {
        try {
            console.log("heelo yaha hun",component)
            const response = await axios.post('http://localhost:8000/component/upload', component);
           
            return response.data.component;
           
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const queryComponents = createAsyncThunk(
    'component/query',
    async (payload: string, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8000/component/query${payload}`);
            console.log(response.data.components);
            return response.data.page;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const CheckoutComponent = createAsyncThunk(
    'component/checkout',
    async (payload: CheckoutComponentPayload, thunkAPI) => {
        try {
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate()+14);

            const getPatron = await axios.get(`http://localhost:8000/card/${payload.labCard}`);
            
            let patronId = getPatron.data.LabCard.user._id;
        


            const record = {
                status: "LOANED",
                loanedDate: new Date(),
                dueDate: returnDate,
                patron: patronId,
                employeeOut: payload.employee._id,
                item: payload.component._id
            };


            const LoadReq = await axios.post('http://localhost:8000/loan', record);
            console.log(record);
            const loan = LoadReq.data.record;
           
            return loan;
        } catch (e:any) {
            console.error('Error in CheckoutComponent:', e);
            return thunkAPI.rejectWithValue(e.response?.data || e.message || e);
        }
    }
);
export const CheckInComponent= createAsyncThunk('component/checkin',
    async(payload:CheckInComponentPayload, thunkAPI)=>{
        try {
            let record = payload.component.records[0];

            let updatedRecord= {
                status: "AVAILABLE",
                loanedDate: record.loanedDate,
                dueDate:record.dueDate,
                returnedDate:new Date(),
                patron:record.patron,
                employeeOut:record.employeeOut,
                employeeIn:record.employeeIn,
                item:record.item,
                _id:record._id

            }
            console.log(updatedRecord);
            let loan = await axios.put('http://localhost:8000/loan/',updatedRecord);
            return loan.data.record;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const LoadComponentByBarcode= createAsyncThunk('component/id',
    async (payload:string, thunkAPI)=>{
        try {
            let res= await axios.get(`http://localhost:8000/component/query?barcode=${payload}`);

            let component= res.data.page.items[0];

            if(!component || component.barcode !== payload){
                throw new Error();
            }

            return component;
        } catch (e) {

            return thunkAPI.rejectWithValue(e);
            
        }
    }
)

const componentSlice = createSlice({
    name: 'component',
    initialState,
    reducers: {
        setCurrentComponent(state,action:PayloadAction<Component | undefined>){
            state={
                ...state,
                currentComponent:action.payload
            }
            return state;
        },
        clearSuccessMessage(state) {
            state.successMessage = null;
          },
          clearErrorMessage(state) {
            state.errorUpload = null;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(RegisterComponent.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.successMessage = null;
          });
          builder.addCase(RegisterComponent.fulfilled, (state, action) => {
            state.loading = false;
            state.components.push(action.payload);
            state.successMessage = 'Component created successfully!';
          });
          builder.addCase(RegisterComponent.rejected, (state,action) => {
            state.loading = false;
            state.errorUpload = action.payload ? action.payload.toString() : 'Failed to upload component';
          });
       
        builder.addCase(fetchAllComponents.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.components = [];
            })
           
            builder.addCase(queryComponents.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.components = [];
            })
            builder.addCase(CheckoutComponent.pending, (state) => {
                    state={
                        ...state,
                        loading:true
                    }
                    return state;
            })
            builder.addCase(CheckInComponent.pending, (state) => {
                state={
                    ...state,
                    loading:true
                }
                return state;
        })
        builder.addCase(LoadComponentByBarcode.pending, (state) => {
            state={
                ...state,
                loading:true
            }
            return state;
    })
    
            builder.addCase(fetchAllComponents.fulfilled, (state, action) => {
                state.loading = false;
                state.components = action.payload;
            })
            builder.addCase(queryComponents.fulfilled, (state, action) => {
                state.loading = false;
                state.components = action.payload.items;
                state.pagingInformation = {
                    totalCount: action.payload.totalCount,
                    currentPage: action.payload.currentPage,
                    totalPage: action.payload.totalPage,
                    limit: action.payload.limit,
                    pageCount: action.payload.pageCount
                };
            })

            builder.addCase(CheckoutComponent.fulfilled, (state,action)=>{
                let componentlist:Component[]= JSON.parse(JSON.stringify(state.components));
                componentlist= componentlist.map((component)=>{
                    if(component._id===action.payload.item)
                   {
                    component.records= [action.payload, ...component.records];
                    return component;
                   }
                   return component;
                })

                state ={
                    ...state,
                    loading:false,
                    components:componentlist
                }
                return state;


            })
            builder.addCase(CheckInComponent.fulfilled,(state,action)=>{
                let componentlist:Component[]= JSON.parse(JSON.stringify(state.components)); 
                componentlist= componentlist.map((component)=>{
                    if(component._id===action.payload.item)
                   {
                    component.records.splice(0,1, action.payload);
                    return component;
                   }
                   return component;
                })

                state ={
                    ...state,
                    loading:false,
                    components:componentlist
                }
                return state;

            })
           

            builder.addCase(LoadComponentByBarcode.fulfilled,(state,action)=>{
               

                state ={
                    ...state,
                    loading:false,
                    currentComponent:action.payload
    
                }
                return state;

            })
            builder.addCase(LoadComponentByBarcode.rejected,(state)=>{
               

                state ={
                    ...state,
                    loading:false,
                    error:true
    
                }
                return state;

            })


            builder.addCase(fetchAllComponents.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            builder.addCase(queryComponents.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    }
});


export const {setCurrentComponent, clearSuccessMessage, clearErrorMessage }=componentSlice.actions;
export default componentSlice.reducer;


