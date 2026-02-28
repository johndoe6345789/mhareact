'use client';

import { useMemo } from 'react';
import { dischargeRoutes, patientCircumstances } from '../data/index';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  toggleCircumstance,
  clearCircumstances,
  setExpandedRoute,
  setActiveSubTab,
} from '../store/slices/dischargeSlice';

export function useDischarge() {
  const dispatch    = useAppDispatch();
  const activeSubTab    = useAppSelector((s) => s.discharge.activeSubTab);
  const selected        = useAppSelector((s) => s.discharge.selectedCircumstances);
  const expandedRoute   = useAppSelector((s) => s.discharge.expandedRoute);

  const activeCircumstances = useMemo(
    () => patientCircumstances.filter((c) => selected.includes(c.id)),
    [selected],
  );

  const highlightedRouteIds = useMemo(
    () => new Set(activeCircumstances.flatMap((c) => c.affectsRoutes)),
    [activeCircumstances],
  );

  return {
    activeSubTab,
    selected,
    expandedRoute,
    activeCircumstances,
    highlightedRouteIds,
    dischargeRoutes,
    patientCircumstances,
    toggle:   (id: string)                         => dispatch(toggleCircumstance(id)),
    clear:    ()                                   => dispatch(clearCircumstances()),
    openRoute:(id: string | null)                  => dispatch(setExpandedRoute(id)),
    setTab:   (v: 'routes' | 'circumstances')      => dispatch(setActiveSubTab(v)),
  };
}
