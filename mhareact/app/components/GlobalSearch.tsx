'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import { useRouter } from 'next/navigation';
import { documentCategories, mhaSections, rights, orgChart, navigation } from '../data/index';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchOpen } from '../store/slices/uiSlice';
import { setSearch as setDocSearch, setActiveCategory } from '../store/slices/documentsSlice';
import { toggleSection } from '../store/slices/mhaSectionsSlice';
import { toggleRight } from '../store/slices/rightsSlice';
import HighlightText from './HighlightText';
import type { OrgNode } from '../data/types';

function flattenOrgChart(node: OrgNode): Array<{ id: string; title: string; subtitle: string }> {
  return [
    { id: node.id, title: node.title, subtitle: node.subtitle },
    ...node.children.flatMap(flattenOrgChart),
  ];
}

type Category = 'document' | 'section' | 'right' | 'role';

type ResultItem = {
  id: string;
  label: string;
  sublabel: string;
  category: Category;
  categoryLabel: string;
  onSelect: () => void;
};

const MAX_PER_CAT = 5;
const ORG_ROLES = flattenOrgChart(orgChart);

const CATEGORY_COLORS: Record<Category, 'primary' | 'secondary' | 'success' | 'info'> = {
  document: 'primary',
  section: 'secondary',
  right: 'success',
  role: 'info',
};

const tabPath = (id: string) => navigation.tabs.find((t) => t.id === id)?.path ?? '/';

export default function GlobalSearch() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isOpen = useAppSelector((s) => s.ui.searchOpen);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setFocused(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        dispatch(setSearchOpen(true));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dispatch]);

  const close = () => dispatch(setSearchOpen(false));

  const results: ResultItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const items: ResultItem[] = [];

    // Documents
    let docCount = 0;
    outer: for (const cat of documentCategories) {
      for (const doc of cat.documents) {
        if (docCount >= MAX_PER_CAT) break outer;
        if (doc.name.toLowerCase().includes(q) || doc.description.toLowerCase().includes(q)) {
          items.push({
            id: `doc-${doc.name}`,
            label: doc.name,
            sublabel: cat.category,
            category: 'document',
            categoryLabel: 'Document',
            onSelect: () => {
              dispatch(setActiveCategory(null));
              dispatch(setDocSearch(doc.name));
              router.push(tabPath('documents'));
              close();
            },
          });
          docCount++;
        }
      }
    }

    // MHA Sections
    let secCount = 0;
    for (const sec of mhaSections) {
      if (secCount >= MAX_PER_CAT) break;
      if (
        sec.section.toLowerCase().includes(q) ||
        sec.title.toLowerCase().includes(q) ||
        sec.purpose.toLowerCase().includes(q)
      ) {
        items.push({
          id: `sec-${sec.section}`,
          label: `${sec.section} — ${sec.title}`,
          sublabel: sec.purpose.substring(0, 70) + (sec.purpose.length > 70 ? '…' : ''),
          category: 'section',
          categoryLabel: 'MHA Section',
          onSelect: () => {
            dispatch(toggleSection(sec.section));
            router.push(tabPath('mhasections'));
            close();
          },
        });
        secCount++;
      }
    }

    // Patient Rights
    let rightCount = 0;
    for (const right of rights) {
      if (rightCount >= MAX_PER_CAT) break;
      if (
        right.title.toLowerCase().includes(q) ||
        right.summary.toLowerCase().includes(q) ||
        right.detail.toLowerCase().includes(q)
      ) {
        items.push({
          id: `right-${right.id}`,
          label: right.title,
          sublabel: right.summary.substring(0, 70) + (right.summary.length > 70 ? '…' : ''),
          category: 'right',
          categoryLabel: 'Patient Right',
          onSelect: () => {
            dispatch(toggleRight(right.id));
            router.push(tabPath('rights'));
            close();
          },
        });
        rightCount++;
      }
    }

    // Org Chart Roles
    let roleCount = 0;
    for (const role of ORG_ROLES) {
      if (roleCount >= MAX_PER_CAT) break;
      if (
        role.title.toLowerCase().includes(q) ||
        role.subtitle.toLowerCase().includes(q)
      ) {
        items.push({
          id: `role-${role.id}`,
          label: role.title,
          sublabel: role.subtitle,
          category: 'role',
          categoryLabel: 'Org Role',
          onSelect: () => {
            router.push(tabPath('orgchart'));
            close();
          },
        });
        roleCount++;
      }
    }

    return items;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Keyboard navigation within results list
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocused((f) => Math.min(f + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocused((f) => Math.max(f - 1, 0));
      } else if (e.key === 'Enter' && results[focused]) {
        results[focused].onSelect();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, results, focused]);

  // Reset focus when results change
  useEffect(() => { setFocused(0); }, [query]);

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, mt: '8vh', verticalAlign: 'top', maxHeight: '80vh' },
      }}
      TransitionProps={{ timeout: 150 }}
    >
      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Search input */}
        <Box sx={{ px: 2, pt: 1.5, pb: 1, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
          <TextField
            inputRef={inputRef}
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search documents, MHA sections, rights, roles…'
            variant="standard"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { fontSize: '1.05rem', py: 0.5 },
            }}
          />
        </Box>

        {/* Results */}
        <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          {!query.trim() ? (
            <Box sx={{ py: 5, textAlign: 'center', px: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Search across all documents, MHA sections, patient rights, and hospital roles.
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
                Try: &ldquo;discharge&rdquo;, &ldquo;IMHA&rdquo;, &ldquo;s.3&rdquo;, &ldquo;tribunal&rdquo;, &ldquo;consultant&rdquo;
              </Typography>
            </Box>
          ) : results.length === 0 ? (
            <Box sx={{ py: 5, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                No results for &ldquo;{query}&rdquo;
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Try a different keyword
              </Typography>
            </Box>
          ) : (
            <List dense disablePadding>
              {results.map((item, idx) => (
                <ListItemButton
                  key={item.id}
                  selected={idx === focused}
                  onClick={item.onSelect}
                  onMouseEnter={() => setFocused(idx)}
                  sx={{
                    px: 2,
                    py: 1,
                    '&.Mui-selected': { bgcolor: 'action.selected' },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="body2" fontWeight={600} component="span">
                          <HighlightText text={item.label} query={query} />
                        </Typography>
                        <Chip
                          label={item.categoryLabel}
                          size="small"
                          color={CATEGORY_COLORS[item.category]}
                          variant="outlined"
                          sx={{ fontSize: '0.6rem', height: 18 }}
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary" component="span">
                        <HighlightText text={item.sublabel} query={query} />
                      </Typography>
                    }
                  />
                  {idx === focused && (
                    <KeyboardReturnIcon sx={{ fontSize: 13, color: 'text.disabled', flexShrink: 0, ml: 1 }} />
                  )}
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>

        {/* Footer hints */}
        <Box
          sx={{
            px: 2,
            py: 0.75,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            gap: 2,
            flexShrink: 0,
          }}
        >
          {(['↑↓ navigate', '↵ select', 'Esc close'] as const).map((hint) => (
            <Typography key={hint} variant="caption" color="text.disabled">
              {hint}
            </Typography>
          ))}
          <Box sx={{ flex: 1 }} />
          {results.length > 0 && (
            <Typography variant="caption" color="text.disabled">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
