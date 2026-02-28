'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LinkIcon from '@mui/icons-material/Link';

import { appMeta } from '../data/index';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleDark, setSearchOpen, showToast } from '../store/slices/uiSlice';

export default function AppHeader() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((s) => s.ui.isDark);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      dispatch(showToast({ message: 'Link copied to clipboard', severity: 'success' }));
    } catch {
      dispatch(showToast({ message: 'Could not copy link', severity: 'error' }));
    }
  };

  return (
    <AppBar position="static" color="primary" elevation={0} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar sx={{ gap: 1.5, minHeight: 56, px: { xs: 2, sm: 3 } }}>
        {/* Logo mark */}
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            bgcolor: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            flexShrink: 0,
          }}
        >
          ⚕
        </Box>

        {/* Title block */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 700, lineHeight: 1.2, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {appMeta.title}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            sx={{ opacity: 0.75, color: 'white', display: { xs: 'none', sm: 'block' } }}
          >
            {appMeta.subtitle}
          </Typography>
        </Box>

        {/* Search button — pill style on larger screens, icon on mobile */}
        <Button
          onClick={() => dispatch(setSearchOpen(true))}
          variant="outlined"
          startIcon={<SearchIcon sx={{ fontSize: '1rem !important' }} />}
          sx={{
            display: { xs: 'none', md: 'flex' },
            borderColor: 'rgba(255,255,255,0.35)',
            color: 'rgba(255,255,255,0.85)',
            bgcolor: 'rgba(255,255,255,0.08)',
            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.15)' },
            borderRadius: 6,
            px: 1.5,
            py: 0.5,
            fontSize: '0.8rem',
            minWidth: 160,
            justifyContent: 'flex-start',
            gap: 1,
          }}
        >
          <span style={{ flex: 1, textAlign: 'left' }}>Search…</span>
          <Box
            component="kbd"
            sx={{
              fontSize: '0.65rem',
              bgcolor: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 1,
              px: 0.75,
              py: 0.25,
              fontFamily: 'inherit',
              lineHeight: 1.4,
            }}
          >
            ⌘K
          </Box>
        </Button>

        {/* Icon-only search for mobile */}
        <Tooltip title="Search (⌘K)">
          <IconButton
            onClick={() => dispatch(setSearchOpen(true))}
            sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}
            aria-label="Search"
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>

        {/* Dark mode toggle */}
        <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
          <IconButton
            onClick={() => dispatch(toggleDark())}
            sx={{ color: 'white' }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
        </Tooltip>

        {/* Share / copy link */}
        <Tooltip title="Copy link">
          <IconButton onClick={handleShare} sx={{ color: 'white' }} aria-label="Copy link">
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
