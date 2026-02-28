'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { mhaSections, layouts, componentLayouts, mhaSectionsConfig } from '../data/index';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter, toggleSection } from '../store/slices/mhaSectionsSlice';
import { useTranslation } from '../lib/useTranslation';
import { JsonRenderer } from '../lib/JsonRenderer';
import type { MHASection } from '../data/types';

type MuiColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
const catById = Object.fromEntries(mhaSectionsConfig.categories.map((c) => [c.id, c])) as
  Record<MHASection['category'], { id: string; label: string; color: MuiColor }>;

export default function MHASections() {
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const filter = useAppSelector((s) => s.mhaSections.filter);
  const expandedSection = useAppSelector((s) => s.mhaSections.expandedSection);
  const layout = layouts.mhaSections;

  const visible = filter === 'all' ? mhaSections : mhaSections.filter((s) => s.category === filter);
  const filterOptions = [
    { id: 'all', label: `All (${mhaSections.length})` },
    ...mhaSectionsConfig.categories.map((cat) => ({
      id: cat.id,
      label: `${cat.label} (${mhaSections.filter((s) => s.category === cat.id).length})`,
      color: cat.color as MuiColor,
    })),
  ];

  return (
    <Box>
      <JsonRenderer node={componentLayouts.MHASectionsHeader} t={t}
        appData={{ stats: `${mhaSections.length} sections · layout: ${layout.variant}` }} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {filterOptions.map((f) => (
          <Chip key={f.id} label={f.label} size="small"
            variant={filter === f.id ? 'filled' : 'outlined'}
            color={filter === f.id ? 'primary' : ('color' in f ? f.color : 'default')}
            onClick={() => dispatch(setFilter(filter === f.id && f.id !== 'all' ? 'all' : f.id))}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {visible.map((section) => {
          const cfg = catById[section.category];
          const isExpanded = expandedSection === section.section;

          return (
            <Accordion key={section.section} expanded={isExpanded}
              onChange={() => dispatch(toggleSection(section.section))}
              disableGutters
              sx={{
                border: '2px solid', borderColor: section.highlight ? 'primary.main' : 'divider',
                borderRadius: '10px !important', overflow: 'hidden', '&:before': { display: 'none' },
                boxShadow: section.highlight ? '0 0 0 2px rgba(0,48,135,0.15)' : 'none',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{
                bgcolor: section.highlight ? 'primary.main' : 'background.paper',
                color: section.highlight ? 'primary.contrastText' : 'text.primary',
                '& .MuiAccordionSummary-expandIconWrapper': { color: section.highlight ? 'primary.contrastText' : 'text.secondary' },
                '&:hover': { bgcolor: section.highlight ? 'primary.dark' : 'action.hover' },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
                  <Chip label={section.section} size="small"
                    color={section.highlight ? 'default' : cfg.color}
                    sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0,
                      bgcolor: section.highlight ? 'rgba(255,255,255,0.2)' : undefined,
                      color: section.highlight ? 'white' : undefined }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={700}
                      sx={{ color: section.highlight ? 'inherit' : 'text.primary', lineHeight: 1.3 }}>
                      {section.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.25, flexWrap: 'wrap' }}>
                      {section.duration && (
                        <Typography variant="caption"
                          sx={{ color: section.highlight ? 'rgba(255,255,255,0.8)' : 'text.secondary' }}>
                          ⏱ {section.duration}{section.renewable ? ' (renewable)' : ''}
                        </Typography>
                      )}
                      <Chip label={cfg.label} size="small" color={cfg.color}
                        sx={{ height: 16, fontSize: '0.6rem', opacity: section.highlight ? 0.9 : 1 }} />
                    </Box>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ bgcolor: section.highlight ? 'primary.50' : 'background.paper', pt: 2 }}>
                <JsonRenderer node={componentLayouts.MHASectionsDetail} t={t}
                  appData={section as unknown as Record<string, unknown>}
                  slots={{
                    KeyPoints: (
                      <List dense disablePadding sx={{ mt: 0.5 }}>
                        {section.keyPoints.map((point, i) => (
                          <ListItem key={i} disableGutters sx={{ py: 0.25, alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: 20, mt: 0.5 }}>
                              <FiberManualRecordIcon sx={{ fontSize: 8, color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText primary={point} primaryTypographyProps={{ variant: 'body2' }} />
                          </ListItem>
                        ))}
                      </List>
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
