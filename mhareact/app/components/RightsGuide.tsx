'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { rights, layouts, componentLayouts, rightsConfig } from '../data/index';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter, toggleRight } from '../store/slices/rightsSlice';
import { useTranslation } from '../lib/useTranslation';
import { JsonRenderer } from '../lib/JsonRenderer';
import type { Right } from '../data/types';

type MuiColor = 'error' | 'warning' | 'default';
const priorityColor = (p: Right['priority']) => (rightsConfig.priorityColors[p] ?? 'default') as MuiColor;

export default function RightsGuide() {
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const filter = useAppSelector((s) => s.rights.filter);
  const expandedRight = useAppSelector((s) => s.rights.expandedRight);
  const layout = layouts.rightsGuide;

  const priorities: Right['priority'][] = ['essential', 'important', 'useful'];
  const visible = filter === 'all' ? rights : rights.filter((r) => r.priority === filter);

  return (
    <Box>
      <JsonRenderer node={componentLayouts.RightsHeader} t={t}
        appData={{ stats: `${rights.length} rights documented · layout: ${layout.variant}` }} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <Chip label={`${t('section.rights.allRights')} (${rights.length})`} size="small"
          variant={filter === 'all' ? 'filled' : 'outlined'}
          color={filter === 'all' ? 'primary' : 'default'}
          onClick={() => dispatch(setFilter('all'))} />
        {priorities.map((p) => (
          <Chip key={p}
            label={`${t(`section.rights.${p}`)} (${rights.filter((r) => r.priority === p).length})`}
            size="small"
            variant={filter === p ? 'filled' : 'outlined'}
            color={filter === p ? 'primary' : priorityColor(p)}
            onClick={() => dispatch(setFilter(filter === p ? 'all' : p))}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {visible.map((right) => {
          const color = priorityColor(right.priority);
          const isOpen = expandedRight === right.id;

          return (
            <Accordion key={right.id} expanded={isOpen}
              onChange={() => dispatch(toggleRight(right.id))}
              disableGutters
              sx={{ border: '1px solid', borderColor: `${color}.main`, borderRadius: '10px !important', overflow: 'hidden', '&:before': { display: 'none' } }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: `${color}.main`, flexShrink: 0, mt: 0.75 }} />
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography variant="body2" fontWeight={700}>{right.title}</Typography>
                      <Chip label={t(`section.rights.${right.priority}`)} size="small" color={color}
                        sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700 }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {right.summary}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                <JsonRenderer node={componentLayouts.RightsDetail} t={t}
                  appData={right as unknown as Record<string, unknown>}
                  slots={{
                    AppliesToChips: (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {right.appliesTo.map((s) => (
                          <Chip key={s} label={s} size="small"
                            sx={{ fontFamily: 'monospace', fontSize: '0.7rem', height: 20 }} />
                        ))}
                      </Box>
                    ),
                  }}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
