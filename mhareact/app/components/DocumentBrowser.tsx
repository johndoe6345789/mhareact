'use client';

import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Hr from './Hr';
import SearchIcon from '@mui/icons-material/Search';

import { documentCategories, layouts, componentLayouts, documentBrowserConfig } from '../data/index';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearch, setActiveCategory } from '../store/slices/documentsSlice';
import { useTranslation } from '../lib/useTranslation';
import { JsonRenderer } from '../lib/JsonRenderer';
import HighlightText from './HighlightText';

type MuiColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
const catColor = (cat: string) => (documentBrowserConfig.categoryColors[cat] ?? 'default') as MuiColor;

export default function DocumentBrowser() {
  const dispatch = useAppDispatch();
  const t = useTranslation();
  const search = useAppSelector((s) => s.documents.search);
  const activeCategory = useAppSelector((s) => s.documents.activeCategory);
  const layout = layouts.documentBrowser;
  const total = documentCategories.reduce((s, c) => s + c.documents.length, 0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return documentCategories
      .map((cat) => ({
        ...cat,
        documents: cat.documents.filter(
          (doc) =>
            (!q || doc.name.toLowerCase().includes(q) || doc.description.toLowerCase().includes(q)) &&
            (!activeCategory || cat.category === activeCategory)
        ),
      }))
      .filter((cat) => cat.documents.length > 0);
  }, [search, activeCategory]);

  const filteredTotal = filtered.reduce((s, c) => s + c.documents.length, 0);

  return (
    <Box>
      <JsonRenderer node={componentLayouts.DocumentsBrowserHeader} t={t}
        appData={{ stats: `${total} docs · ${documentCategories.length} categories · layout: ${layout.variant}` }} />

      <TextField fullWidth size="small" value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder={t('section.documents.searchPlaceholder')}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" color="action" /></InputAdornment> }}
        sx={{ mb: 2 }}
      />
      {search && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {filteredTotal} result{filteredTotal !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <Chip label={`${t('section.documents.allCategories')} (${total})`}
          variant={!activeCategory ? 'filled' : 'outlined'}
          color={!activeCategory ? 'primary' : 'default'} size="small"
          onClick={() => dispatch(setActiveCategory(null))} />
        {documentCategories.map((cat) => (
          <Chip key={cat.category}
            label={`${cat.category.replace(' Documents', '').replace(' Documentation', '')} (${cat.documents.length})`}
            variant={activeCategory === cat.category ? 'filled' : 'outlined'}
            color={activeCategory === cat.category ? 'primary' : catColor(cat.category)}
            size="small"
            onClick={() => dispatch(setActiveCategory(activeCategory === cat.category ? null : cat.category))}
            sx={{ fontSize: '0.7rem' }}
          />
        ))}
      </Box>

      {filtered.length === 0 ? (
        <JsonRenderer node={componentLayouts.DocumentsEmptyState} t={t} />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filtered.map((cat) => {
            const color = catColor(cat.category);
            return (
              <Paper key={cat.category} sx={{ overflow: 'hidden' }}>
                <Box sx={{ px: 2, py: 1.5, bgcolor: `${color === 'default' ? 'grey' : color}.50`, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2" fontWeight={700}>{cat.category}</Typography>
                    <Chip label={cat.documents.length} size="small" color={color} sx={{ fontSize: '0.7rem', height: 20 }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">{cat.description}</Typography>
                </Box>
                {cat.documents.map((doc, idx) => (
                  <Box key={doc.name}>
                    <Box sx={{ px: 2, py: 1.25, '&:hover': { bgcolor: 'action.hover' }, transition: 'background 0.1s' }}>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 0.25 }}>
                        <HighlightText text={doc.name} query={search} />
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                        <HighlightText text={doc.description} query={search} />
                      </Typography>
                    </Box>
                    {idx < cat.documents.length - 1 && <Hr />}
                  </Box>
                ))}
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
