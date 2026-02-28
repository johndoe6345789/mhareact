/**
 * Single source of truth — all data, config, theme, translations,
 * and layout specifications are read from data.json.
 *
 * This file provides TypeScript types for everything exported.
 */
import raw from './data.json';
import type {
  OrgNode,
  DocumentCategory,
  MHASection,
  LetterTemplate,
  Right,
  DischargeRoute,
  PatientCircumstance,
} from './types';
import type { LayoutNode } from '../lib/JsonRenderer';

// ── App metadata ──────────────────────────────────────────────────
export const appMeta = raw.app;

// ── MUI theme config (drives ThemeRegistry) ───────────────────────
export const themeConfig = raw.theme;

// ── Navigation ────────────────────────────────────────────────────
export const navigation = raw.navigation;

// ── Overview page content ─────────────────────────────────────────
export const overviewConfig = raw.overview;

// ── Layout hints per section ──────────────────────────────────────
export const layouts = raw.layouts;

// ── Translations ──────────────────────────────────────────────────
export const translations = raw.translations;

// ── JSON component layouts (recursive renderer) ───────────────────
export const componentLayouts = raw.componentLayouts as unknown as Record<string, LayoutNode>;

// ── Domain data ───────────────────────────────────────────────────
export const orgChart            = raw.orgChart            as unknown as OrgNode;
export const documentCategories  = raw.documentCategories  as unknown as DocumentCategory[];
export const mhaSections         = raw.mhaSections         as unknown as MHASection[];
export const letterTemplate      = raw.letterTemplate      as unknown as LetterTemplate;
export const rights              = raw.rights              as unknown as Right[];
export const dischargeRoutes      = (raw as unknown as { dischargeRoutes: DischargeRoute[] }).dischargeRoutes;
export const patientCircumstances = (raw as unknown as { patientCircumstances: PatientCircumstance[] }).patientCircumstances;
export type LayoutSectionDef = {
  key: string; label: string | null; type: string;
  iconName?: string; iconColor?: string; severity?: string;
};
// ── Per-component UI configs ──────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anyRaw = raw as any;
export const mhaSectionsConfig     = anyRaw.mhaSectionsConfig     as { categories: Array<{ id: string; label: string; color: string }> };
export const rightsConfig          = anyRaw.rightsConfig          as { priorityColors: Record<string, string> };
export const documentBrowserConfig = anyRaw.documentBrowserConfig as { categoryColors: Record<string, string> };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dischargeConfig = (raw as any).dischargeConfig as {
  rankColors:          Record<string, string>;
  impactColors:        Record<string, string>;
  routeLayout:         LayoutSectionDef[];
  circumstanceLayout:  LayoutSectionDef[];
  ui:                  Record<string, string>;
};
