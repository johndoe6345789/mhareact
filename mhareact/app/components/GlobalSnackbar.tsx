'use client';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { hideToast } from '../store/slices/uiSlice';

export default function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector((s) => s.ui.toast);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideToast())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={() => dispatch(hideToast())}
        sx={{ minWidth: 240, borderRadius: 2 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
