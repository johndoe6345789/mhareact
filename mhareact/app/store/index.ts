import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from './slices/documentsSlice';
import orgChartReducer from './slices/orgChartSlice';
import mhaSectionsReducer from './slices/mhaSectionsSlice';
import rightsReducer from './slices/rightsSlice';
import letterReducer from './slices/letterSlice';
import uiReducer from './slices/uiSlice';
import dischargeReducer from './slices/dischargeSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      documents: documentsReducer,
      orgChart: orgChartReducer,
      mhaSections: mhaSectionsReducer,
      rights: rightsReducer,
      letter: letterReducer,
      ui: uiReducer,
      discharge: dischargeReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
