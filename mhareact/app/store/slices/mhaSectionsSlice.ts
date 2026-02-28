import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MHASectionsState {
  filter: string;
  expandedSection: string | null;
}

const initialState: MHASectionsState = { filter: 'all', expandedSection: 's.3' };

export const mhaSectionsSlice = createSlice({
  name: 'mhaSections',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    toggleSection: (state, action: PayloadAction<string>) => {
      state.expandedSection =
        state.expandedSection === action.payload ? null : action.payload;
    },
  },
});

export const { setFilter, toggleSection } = mhaSectionsSlice.actions;
export default mhaSectionsSlice.reducer;
