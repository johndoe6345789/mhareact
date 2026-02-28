import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RightsState {
  filter: string;
  expandedRight: string | null;
}

const initialState: RightsState = { filter: 'all', expandedRight: 'imha' };

export const rightsSlice = createSlice({
  name: 'rights',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    toggleRight: (state, action: PayloadAction<string>) => {
      state.expandedRight =
        state.expandedRight === action.payload ? null : action.payload;
    },
  },
});

export const { setFilter, toggleRight } = rightsSlice.actions;
export default rightsSlice.reducer;
