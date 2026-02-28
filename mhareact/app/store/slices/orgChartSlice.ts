import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { OrgNode } from '../../data/types';
import rawData from '../../data/data.json';

function collectIds(node: OrgNode): string[] {
  return [node.id, ...node.children.flatMap(collectIds)];
}
const ALL_NODE_IDS = collectIds(rawData.orgChart as unknown as OrgNode);

interface OrgChartState {
  expandedNodes: string[];
  openRelevanceNode: string | null;
}

const initialState: OrgChartState = {
  expandedNodes: ['trust-board', 'ceo', 'allied', 'independent'],
  openRelevanceNode: null,
};

export const orgChartSlice = createSlice({
  name: 'orgChart',
  initialState,
  reducers: {
    toggleNode: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.expandedNodes.includes(id)) {
        state.expandedNodes = state.expandedNodes.filter((n) => n !== id);
      } else {
        state.expandedNodes.push(id);
      }
    },
    toggleRelevance: (state, action: PayloadAction<string>) => {
      state.openRelevanceNode =
        state.openRelevanceNode === action.payload ? null : action.payload;
    },
    expandAll: (state) => {
      state.expandedNodes = ALL_NODE_IDS;
    },
    collapseAll: (state) => {
      state.expandedNodes = [];
    },
  },
});

export const { toggleNode, toggleRelevance, expandAll, collapseAll } = orgChartSlice.actions;
export default orgChartSlice.reducer;
