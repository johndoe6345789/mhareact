import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', pt: 8 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>404 — Page not found</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        This page doesn&apos;t exist.
      </Typography>
      <Button component={Link} href="/" variant="contained">Back to Overview</Button>
    </Box>
  );
}
