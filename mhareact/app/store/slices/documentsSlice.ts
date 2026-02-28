import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentsState {
  search: string;
  activeCategory: string | null;
}

const initialState: DocumentsState = { search: '', activeCategory: null };

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string | null>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setSearch, setActiveCategory } = documentsSlice.actions;
export default documentsSlice.reducer;
