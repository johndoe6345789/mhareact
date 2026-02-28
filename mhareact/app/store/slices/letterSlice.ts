import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LetterState {
  values: Record<string, string>;
}

const initialState: LetterState = { values: {} };

export const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {
    setFieldValue: (
      state,
      action: PayloadAction<{ id: string; value: string }>
    ) => {
      state.values[action.payload.id] = action.payload.value;
    },
    resetLetter: (state) => {
      state.values = {};
    },
  },
});

export const { setFieldValue, resetLetter } = letterSlice.actions;
export default letterSlice.reducer;
