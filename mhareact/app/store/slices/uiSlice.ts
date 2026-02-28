import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

interface UiState {
  isDark: boolean;
  searchOpen: boolean;
  toast: Toast;
}

const initialState: UiState = {
  isDark: false,
  searchOpen: false,
  toast: { open: false, message: '', severity: 'success' },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDark: (state) => {
      state.isDark = !state.isDark;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.searchOpen = action.payload;
    },
    showToast: (
      state,
      action: PayloadAction<{ message: string; severity?: Toast['severity'] }>
    ) => {
      state.toast = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity ?? 'success',
      };
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
  },
});

export const { toggleDark, setSearchOpen, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
