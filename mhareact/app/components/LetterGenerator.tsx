'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import Grid from '@mui/material/Grid';

import { letterTemplate, layouts } from '../data/index';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFieldValue } from '../store/slices/letterSlice';
import { useTranslation } from '../lib/useTranslation';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────────
// TODO: Implement this function (5–10 lines)
//
// Replace {{fieldId}} placeholders in each template line with
// the user's field values.
//
// Consider:
//   • How to handle empty / missing values?
//     - Option A: show [fieldId] as a visual placeholder  ← current default
//     - Option B: leave blank (cleaner for printing)
//     - Option C: show _________ underscores
//   • Dates arrive pre-formatted (e.g. "27 February 2026")
//   • Multi-line textarea values already contain \n characters
//
// Parameters:
//   lines    — string[], each line of the letter from data.json
//   values   — Record<fieldId, displayValue>
//
// Returns:
//   string[] — same lines with {{tokens}} substituted
// ─────────────────────────────────────────────────────────────────
function renderLetterLines(lines: string[], values: Record<string, string>): string[] {
  return lines.map((line) =>
    line.replace(/\{\{(\w+)\}\}/g, (_match, fieldId) => values[fieldId] ?? `[${fieldId}]`)
  );
}
// ─────────────────────────────────────────────────────────────────

function formatDateDisplay(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  return isNaN(d.getTime())
    ? isoDate
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function LetterGenerator() {
  const dispatch = useAppDispatch();
  const values = useAppSelector((s) => s.letter.values);
  const [copied, setCopied] = useState(false);
  const t = useTranslation();
  const layout = layouts.letterGenerator;

  // Format dates for display before passing to renderer
  const displayValues: Record<string, string> = {};
  for (const field of letterTemplate.fields) {
    const raw = values[field.id] ?? '';
    displayValues[field.id] = field.type === 'date' ? formatDateDisplay(raw) : raw;
  }

  const renderedLines = renderLetterLines(letterTemplate.templateLines, displayValues);
  const plainText = renderedLines.join('\n');

  const filledCount = letterTemplate.fields.filter((f) => f.required && values[f.id]?.trim()).length;
  const requiredCount = letterTemplate.fields.filter((f) => f.required).length;
  const progress = requiredCount > 0 ? (filledCount / requiredCount) * 100 : 0;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    const [letterPart, citationPart] = plainText.split('---');
    const style = w.document.createElement('style');
    style.textContent =
      'body{font-family:Arial,sans-serif;font-size:12pt;line-height:1.6;max-width:700px;margin:40px auto}' +
      'pre{font-family:Arial,sans-serif;white-space:pre-wrap;font-size:12pt}' +
      '.ref{font-size:10pt;margin-top:32px;padding-top:12px;border-top:1px solid #ccc;color:#555}';
    w.document.head.appendChild(style);
    w.document.title = 'Section 23 Discharge Notice';
    const pre = w.document.createElement('pre');
    pre.textContent = letterPart.trim();
    w.document.body.appendChild(pre);
    if (citationPart) {
      const div = w.document.createElement('div');
      div.className = 'ref';
      const small = w.document.createElement('small');
      small.textContent = citationPart.trim();
      div.appendChild(small);
      w.document.body.appendChild(div);
    }
    w.print();
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('section.letter.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {t('section.letter.subtitle')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ flex: 1, height: 6, borderRadius: 3 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', flexShrink: 0 }}>
            {filledCount}/{requiredCount} {t('section.letter.requiredNote')}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.disabled">
          layout: {layout.variant}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Form — left side */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {letterTemplate.fields.map((field) => (
              <Box key={field.id}>
                {field.type === 'textarea' ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label={
                      <>
                        {field.label}
                        {field.required ? (
                          <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>*</Box>
                        ) : (
                          <Box component="span" sx={{ color: 'text.disabled', ml: 0.5, fontWeight: 400 }}>
                            ({t('section.letter.optionalNote')})
                          </Box>
                        )}
                      </>
                    }
                    value={values[field.id] ?? ''}
                    onChange={(e) => dispatch(setFieldValue({ id: field.id, value: e.target.value }))}
                    placeholder={field.placeholder}
                    size="small"
                    inputProps={{ style: { fontFamily: 'monospace', fontSize: '0.85rem' } }}
                  />
                ) : (
                  <TextField
                    fullWidth
                    type={field.type}
                    label={
                      <>
                        {field.label}
                        {field.required ? (
                          <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>*</Box>
                        ) : (
                          <Box component="span" sx={{ color: 'text.disabled', ml: 0.5, fontWeight: 400 }}>
                            ({t('section.letter.optionalNote')})
                          </Box>
                        )}
                      </>
                    }
                    value={values[field.id] ?? ''}
                    onChange={(e) => dispatch(setFieldValue({ id: field.id, value: e.target.value }))}
                    placeholder={field.type !== 'date' ? field.placeholder : undefined}
                    size="small"
                  />
                )}
                {field.hint && (
                  <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.25, ml: 0.25 }}>
                    {field.hint}
                  </Typography>
                )}
              </Box>
            ))}

            {/* Legal notes */}
            <Alert severity="warning" variant="outlined">
              <AlertTitle sx={{ fontSize: '0.8rem' }}>{t('section.letter.legalTitle')}</AlertTitle>
              <List dense disablePadding>
                {[
                  t('section.letter.legal1'),
                  t('section.letter.legal2'),
                  t('section.letter.legal3'),
                  t('section.letter.legal4'),
                ].map((note, i) => (
                  <ListItem key={i} disableGutters sx={{ py: 0.15 }}>
                    <ListItemIcon sx={{ minWidth: 18 }}>
                      <FiberManualRecordIcon sx={{ fontSize: 7, color: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText primary={note} primaryTypographyProps={{ variant: 'caption' }} />
                  </ListItem>
                ))}
              </List>
            </Alert>
          </Box>
        </Grid>

        {/* Live preview — right side */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase" letterSpacing={0.5} fontSize="0.7rem">
              Live Preview
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ContentCopyIcon fontSize="small" />}
                onClick={handleCopy}
                sx={{ fontSize: '0.75rem' }}
              >
                {copied ? t('section.letter.copiedButton') : t('section.letter.copyButton')}
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<PrintIcon fontSize="small" />}
                onClick={handlePrint}
                sx={{ fontSize: '0.75rem' }}
              >
                {t('section.letter.printButton')}
              </Button>
            </Box>
          </Box>

          <Paper sx={{ p: 2.5, maxHeight: 600, overflow: 'auto' }}>
            <pre
              style={{
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0,
              }}
            >
              {renderedLines.map((line, i) => {
                if (line === '---') {
                  return (
                    <span key={i}>
                      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '12px 0' }} />
                    </span>
                  );
                }
                return (
                  <span key={i}>
                    {line
                      .split(/(\[[^\]]+\])/)
                      .map((part, j) =>
                        part.startsWith('[') && part.endsWith(']') ? (
                          <mark
                            key={j}
                            style={{
                              background: '#FFF9C4',
                              color: '#5D4037',
                              borderRadius: 2,
                              padding: '0 2px',
                            }}
                          >
                            {part}
                          </mark>
                        ) : (
                          part
                        )
                      )}
                    {'\n'}
                  </span>
                );
              })}
            </pre>
          </Paper>

          <Paper sx={{ p: 1.5, mt: 1.5, bgcolor: 'grey.50' }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" gutterBottom>
              {t('section.letter.citationTitle')}
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ lineHeight: 1.6 }}>
              {letterTemplate.citation}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
