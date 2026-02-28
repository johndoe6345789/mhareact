import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DischargeState {
  selectedCircumstances: string[];
  expandedRoute: string | null;
  activeSubTab: 'routes' | 'circumstances';
}

const initialState: DischargeState = {
  selectedCircumstances: [],
  expandedRoute: null,
  activeSubTab: 'routes',
};

export const dischargeSlice = createSlice({
  name: 'discharge',
  initialState,
  reducers: {
    toggleCircumstance: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const idx = state.selectedCircumstances.indexOf(id);
      if (idx === -1) {
        state.selectedCircumstances.push(id);
      } else {
        state.selectedCircumstances.splice(idx, 1);
      }
    },
    clearCircumstances: (state) => {
      state.selectedCircumstances = [];
    },
    setExpandedRoute: (state, action: PayloadAction<string | null>) => {
      state.expandedRoute = action.payload;
    },
    setActiveSubTab: (state, action: PayloadAction<'routes' | 'circumstances'>) => {
      state.activeSubTab = action.payload;
    },
  },
});

export const { toggleCircumstance, clearCircumstances, setExpandedRoute, setActiveSubTab } =
  dischargeSlice.actions;
export default dischargeSlice.reducer;
