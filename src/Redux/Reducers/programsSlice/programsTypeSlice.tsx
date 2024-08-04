import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { apiBaseUrl } from "@/services/axios";
import { InitialStateProgramsTypeType, ProgramsTypeType, CreateProgramTypeType, TransformedProgramsTypeType } from "@/Types/Programs/ProgramsTypeType";
import { RootState } from "@/Redux/Store";

const initialState: InitialStateProgramsTypeType = {
    originalTypeProgramsData: [],
    transformedProgramsData: [],
    status: "idle",
    error: null,
    isOpenModalCreateProgramType: false,
    isOpenModalEditProgramType: false,
    isOpenModalDeleteProgramType: false,
    selectedProgramType: null
};

const transformProgramsType = (types: ProgramsTypeType[]): TransformedProgramsTypeType[] => {
    return types.map(type => ({
        ...type,
        image : "programs/types/typeProgram.png"
    }));
};

export const fetchProgramsType = createAsyncThunk(
    'programs/fetchProgramsType',
    async () => {
        const response = await axios.get<{ data: ProgramsTypeType[] }>(`${apiBaseUrl}/types`);
        const originalProgramsTypes = response.data.data;
        const transformedPrograms = transformProgramsType(originalProgramsTypes);
        return { original: originalProgramsTypes, transformed: transformedPrograms };
    }
);

export const createProgramType = createAsyncThunk(
    'programs/createProgramType',
    async (newProgramType: CreateProgramTypeType, { rejectWithValue }) => {
        try {
            const response = await axios.post<{ data: ProgramsTypeType }>(`${apiBaseUrl}/types`, newProgramType);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateProgramType = createAsyncThunk(
    'programs/updateProgramType',
    async (updatedProgramType: ProgramsTypeType, { rejectWithValue }) => {
        try {
            const response = await axios.patch<{ data: ProgramsTypeType }>(`${apiBaseUrl}/types/${updatedProgramType.id}`, updatedProgramType);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteProgramType = createAsyncThunk(
    'programs/deleteProgramType',
    async (programTypeId: number, { rejectWithValue }) => {
        try {
            await axios.delete(`${apiBaseUrl}/types/${programTypeId}`);
            return programTypeId;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

const ProgramsTypeSlice = createSlice({
    name: "programs",
    initialState,
    reducers: {
        setModalCreateProgramTypes: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateProgramType = action.payload.isOpen;
        },
        setModalEditProgramTypes: (state, action: PayloadAction<{ isOpen: boolean, programType: ProgramsTypeType | null }>) => {
            state.isOpenModalEditProgramType = action.payload.isOpen;
            state.selectedProgramType = action.payload.programType;
        },
        setModalDeleteProgramTypes: (state, action: PayloadAction<{ isOpen: boolean, programType: ProgramsTypeType | null }>) => {
            state.isOpenModalDeleteProgramType = action.payload.isOpen;
            state.selectedProgramType = action.payload.programType;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProgramsType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProgramsType.fulfilled, (state, action: PayloadAction<{ original: ProgramsTypeType[], transformed: TransformedProgramsTypeType[] }>) => {
                state.status = 'succeeded';
                state.originalTypeProgramsData = action.payload.original;
                state.transformedProgramsData = action.payload.transformed;
            })
            .addCase(fetchProgramsType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createProgramType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProgramType.fulfilled, (state, action: PayloadAction<ProgramsTypeType>) => {
                state.status = 'succeeded';
                state.originalTypeProgramsData.push(action.payload);
                state.transformedProgramsData.push({
                    ...action.payload,
                    image: "programs/types/typeProgram.png"
                });
            })
            .addCase(createProgramType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateProgramType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProgramType.fulfilled, (state, action: PayloadAction<ProgramsTypeType>) => {
                state.status = 'succeeded';
                const index = state.originalTypeProgramsData.findIndex(program => program.id === action.payload.id);
                if (index !== -1) {
                    state.originalTypeProgramsData[index] = action.payload;
                    state.transformedProgramsData[index] = {
                        ...action.payload,
                        image: "programs/types/typeProgram.png"
                    };
                }
            })
            .addCase(updateProgramType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(deleteProgramType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteProgramType.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = 'succeeded';
                state.originalTypeProgramsData = state.originalTypeProgramsData.filter(program => program.id !== action.payload);
                state.transformedProgramsData = state.transformedProgramsData.filter(program => program.id !== action.payload);
            })
            .addCase(deleteProgramType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const { setModalCreateProgramTypes, setModalEditProgramTypes, setModalDeleteProgramTypes } = ProgramsTypeSlice.actions;
export const selectProgramTypeStatus = (state: RootState) => state.programsType.status;
export const selectOriginalProgramData = (state: RootState) => state.programsType.originalTypeProgramsData;
export const selectTransformedProgramDataType = (state: RootState) => state.programsType.transformedProgramsData;
export const selectProgramError = (state: RootState) => state.programsType.error;

export default ProgramsTypeSlice.reducer;