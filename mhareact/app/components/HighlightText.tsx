'use client';

import Box from '@mui/material/Box';

interface Props {
  text: string;
  query: string;
}

/**
 * Renders `text` with every occurrence of `query` wrapped in a
 * styled <mark> element. Case-insensitive, regex-safe.
 */
export default function HighlightText({ text, query }: Props) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Box
            key={i}
            component="mark"
            sx={{
              bgcolor: 'warning.light',
              color: 'text.primary',
              borderRadius: 0.5,
              px: 0.25,
              fontStyle: 'inherit',
              fontWeight: 'inherit',
            }}
          >
            {part}
          </Box>
        ) : (
          part
        )
      )}
    </>
  );
}
