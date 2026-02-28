'use client';

import { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SHOW_THRESHOLD = 300;

export default function ScrollToTopFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > SHOW_THRESHOLD);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <Zoom in={visible}>
      <Tooltip title="Back to top" placement="left">
        <Fab
          size="small"
          color="primary"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1300,
          }}
          aria-label="Scroll to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
