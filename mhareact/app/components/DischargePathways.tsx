'use client';

import { type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ClearIcon from '@mui/icons-material/Clear';

import { dischargeConfig, dischargeRoutes, type LayoutSectionDef } from '../data/index';
import { useDischarge } from '../lib/useDischarge';
import type { DischargeRoute, PatientCircumstance, CircumstanceStrategy } from '../data/types';

// Icon name → component; accent = route's MUI colour token
const mkIcon = (name: string, accent: string): ReactNode => ({
  PlayArrow:   <PlayArrowIcon sx={{ fontSize: 12, color: `${accent}.main`, mt: 0.4, flexShrink: 0 }} />,
  CheckCircle: <CheckCircleOutlineIcon sx={{ fontSize: 13, color: 'success.main', mt: 0.3, flexShrink: 0 }} />,
  Cancel:      <CancelOutlinedIcon    sx={{ fontSize: 13, color: 'error.main',   mt: 0.3, flexShrink: 0 }} />,
  Lightbulb:   <LightbulbOutlinedIcon fontSize="small" />,
  Warning:     <WarningAmberIcon      fontSize="small" />,
} as Record<string, ReactNode>)[name] ?? null;

// Tiny layout primitives
const SectionLabel = ({ t }: { t: string }) => (
  <Typography variant="caption" fontWeight={700} color="text.secondary"
    textTransform="uppercase" letterSpacing={0.5} sx={{ display: 'block', mb: 0.75 }}>{t}</Typography>
);
const NumBadge = ({ n, color }: { n: number; color: string }) => (
  <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: `${color}.main`, color: 'white',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.6rem', fontWeight: 700, flexShrink: 0, mt: 0.3 }}>{n}</Box>
);

// JSON-driven section renderer — 3 branches cover all layout types
function renderSection(def: LayoutSectionDef, data: Record<string, unknown>, accent: string): ReactNode {
  const value = data[def.key];
  if (value == null) return null;

  if (def.type === 'text')
    return <Typography key={def.key} variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>{value as string}</Typography>;

  if (def.type === 'alert')
    return <Alert key={def.key} severity={def.severity as 'info'} variant="outlined" sx={{ mb: 2 }}
      icon={def.iconName ? mkIcon(def.iconName, accent) : undefined}>
      <AlertTitle sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{def.label}</AlertTitle>{value as string}
    </Alert>;

  if (def.type === 'strategies')
    return <Box key={def.key} sx={{ mb: 2 }}>
      {def.label && <SectionLabel t={def.label} />}
      {(value as CircumstanceStrategy[]).map((s, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'flex-start' }}>
          <NumBadge n={i + 1} color="primary" />
          <Box><Typography variant="body2" fontWeight={600} sx={{ mb: 0.25 }}>{s.action}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>{s.detail}</Typography></Box>
        </Box>
      ))}
    </Box>;

  // numbered | icon-list — both render string[]
  const icon = def.iconName ? mkIcon(def.iconName, accent) : null;
  return <Box key={def.key} sx={{ mb: 2 }}>
    {def.label && <SectionLabel t={def.label} />}
    {(value as string[]).map((item, i) => (
      <Box key={i} sx={{ display: 'flex', gap: 1, mb: 0.5, alignItems: 'flex-start' }}>
        {def.type === 'numbered' ? <NumBadge n={i + 1} color={accent} /> : icon}
        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{item}</Typography>
      </Box>
    ))}
  </Box>;
}

// Route accordion card
function RouteCard({ route, highlighted }: { route: DischargeRoute; highlighted?: boolean }) {
  const { expandedRoute, openRoute } = useDischarge();
  const isOpen = expandedRoute === route.id;
  const color  = dischargeConfig.rankColors[String(route.rank)] ?? 'primary';
  const { ui } = dischargeConfig;

  return (
    <Accordion expanded={isOpen} onChange={() => openRoute(isOpen ? null : route.id)} disableGutters
      sx={{ border: `${highlighted ? 2 : 1}px solid`, borderColor: highlighted ? `${color}.main` : 'divider',
        borderRadius: '8px !important', '&:before': { display: 'none' }, mb: 1.5, boxShadow: highlighted ? 2 : 0 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', pr: 1 }}>
          <Chip label={`#${route.rank}`} size="small" color={color as 'primary'} sx={{ fontWeight: 700, minWidth: 36 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.2 }}>{route.title}</Typography>
            <Typography variant="caption" color="text.secondary">{route.timeframe}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {route.applies.slice(0, 3).map((s) => (
              <Chip key={s} label={s} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 20 }} />
            ))}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>{route.summary}</Typography>
        {dischargeConfig.routeLayout.map((def) => renderSection(def, route as unknown as Record<string, unknown>, color))}
        <Typography variant="caption" color="text.disabled">{ui.legalBasisPrefix} {route.legalBasis}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

// Circumstance detail card
function CircumstanceCard({ c }: { c: PatientCircumstance }) {
  const { setTab, openRoute } = useDischarge();
  const color = dischargeConfig.impactColors[c.impact] ?? 'warning';
  const { ui } = dischargeConfig;

  return (
    <Paper sx={{ mb: 2, overflow: 'hidden' }}>
      <Box sx={{ px: 2, py: 1.5, bgcolor: `${color}.50`, borderBottom: 1, borderColor: 'divider',
        display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip label={c.impact.replace('-', ' ')} size="small" color={color as 'warning'}
          sx={{ textTransform: 'capitalize', fontSize: '0.68rem' }} />
        <Typography variant="subtitle2" fontWeight={700}>{c.title}</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {dischargeConfig.circumstanceLayout.map((def) =>
          renderSection(def, c as unknown as Record<string, unknown>, 'primary'))}
        {c.affectsRoutes.length > 0 && (
          <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" color="text.disabled">{ui.mostAffectsLabel}</Typography>
            {c.affectsRoutes.map((rid) => {
              const r = dischargeRoutes.find((dr) => dr.id === rid);
              if (!r) return null;
              const rc = dischargeConfig.rankColors[String(r.rank)] ?? 'default';
              return <Chip key={rid} label={r.title} size="small" color={rc as 'primary'} variant="outlined"
                sx={{ fontSize: '0.6rem', height: 20, cursor: 'pointer' }}
                onClick={() => { setTab('routes'); openRoute(r.id); }} />;
            })}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

// Main
export default function DischargePathways() {
  const d  = useDischarge();
  const ui = dischargeConfig.ui;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>{ui.heading}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 700 }}>{ui.subheading}</Typography>
      </Box>

      <Alert severity="error" variant="outlined" sx={{ mb: 3 }}>
        <AlertTitle sx={{ fontWeight: 700 }}>{ui.urgentTitle}</AlertTitle>
        {ui.urgentBody}
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={d.activeSubTab} onChange={(_, v) => d.setTab(v)}>
          <Tab label={`${ui.heading.split('—')[1]?.trim() ?? 'Routes'} (${d.dischargeRoutes.length})`} value="routes" />
          <Tab label={d.selected.length ? `Your Circumstances (${d.selected.length})` : 'Your Circumstances'} value="circumstances" />
        </Tabs>
      </Box>

      {d.activeSubTab === 'routes' && (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{ui.routesIntro}</Typography>
          {d.dischargeRoutes.map((r) => <RouteCard key={r.id} route={r} highlighted={d.highlightedRouteIds.has(r.id)} />)}
        </Box>
      )}

      {d.activeSubTab === 'circumstances' && (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{ui.circumstancesIntro}</Typography>

          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="subtitle2" fontWeight={700}>{ui.selectorTitle}</Typography>
              {d.selected.length > 0 && (
                <Button size="small" startIcon={<ClearIcon fontSize="small" />} onClick={d.clear} sx={{ fontSize: '0.75rem' }}>
                  Clear all ({d.selected.length})
                </Button>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {d.patientCircumstances.map((c) => {
                const sel = d.selected.includes(c.id);
                const col = dischargeConfig.impactColors[c.impact] ?? 'default';
                return <Chip key={c.id} label={c.shortLabel} size="small"
                  variant={sel ? 'filled' : 'outlined'} color={sel ? col as 'warning' : 'default'}
                  onClick={() => d.toggle(c.id)} sx={{ fontSize: '0.75rem', cursor: 'pointer' }} />;
              })}
            </Box>
          </Paper>

          {d.selected.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="body1" color="text.secondary" fontWeight={500}>{ui.emptyTitle}</Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5 }}>{ui.emptySubtitle}</Typography>
            </Box>
          ) : (
            <>
              {d.highlightedRouteIds.size > 0 && (
                <Alert severity="info" variant="outlined" sx={{ mb: 3 }}>
                  <AlertTitle sx={{ fontWeight: 700 }}>{ui.affectedTitle}</AlertTitle>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
                    {d.dischargeRoutes.filter((r) => d.highlightedRouteIds.has(r.id)).map((r) => {
                      const rc = dischargeConfig.rankColors[String(r.rank)] ?? 'default';
                      return <Chip key={r.id} label={r.title} size="small" color={rc as 'primary'} variant="outlined"
                        sx={{ fontSize: '0.68rem', cursor: 'pointer' }}
                        onClick={() => { d.setTab('routes'); d.openRoute(r.id); }} />;
                    })}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>{ui.affectedHint}</Typography>
                </Alert>
              )}
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>{ui.strategiesTitle}</Typography>
              {d.activeCircumstances.map((c, i) => (
                <Box key={c.id}>{i > 0 && <Divider sx={{ my: 2 }} />}<CircumstanceCard c={c} /></Box>
              ))}
            </>
          )}
        </Box>
      )}

      <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.disabled" sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
          <FiberManualRecordIcon sx={{ fontSize: 6, mt: 0.6, flexShrink: 0 }} />
          {ui.footerDisclaimer}
        </Typography>
      </Box>
    </Box>
  );
}
