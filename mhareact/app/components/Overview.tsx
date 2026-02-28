'use client';

import { createElement } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { navigation, overviewConfig, appMeta, documentCategories, mhaSections, rights, componentLayouts } from '../data/index';
import { useTranslation } from '../lib/useTranslation';
import { JsonRenderer, ICON_REGISTRY } from '../lib/JsonRenderer';

const STAT_VALUES: Record<string, string> = {
  orgChartRoles:    '20+ roles',
  totalDocuments:   `${documentCategories.reduce((s, c) => s + c.documents.length, 0)} document types`,
  totalMHASections: `${mhaSections.length} sections`,
  totalRights:      `${rights.length} rights`,
};

const navIcon = (name: string) => {
  const C = ICON_REGISTRY[name];
  return C ? createElement(C as React.ComponentType) : null;
};

export default function Overview() {
  const t = useTranslation();
  const router = useRouter();
  const hero = overviewConfig.hero;
  const alert = overviewConfig.alert;

  const navigate = (tabId: string) => {
    const tab = navigation.tabs.find((tab) => tab.id === tabId);
    if (tab) router.push(tab.path);
  };

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Paper sx={{ p: 4, mb: 3, bgcolor: 'primary.main', color: 'white', border: 'none' }}>
        <Typography variant="caption" sx={{ opacity: 0.75, letterSpacing: 1.5, textTransform: 'uppercase' }}>
          {t('overview.hero.label')}
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, mb: 1.5, color: 'white' }}>
          {t('overview.hero.title')}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.7, maxWidth: 600, mb: 3 }}>
          {t('overview.hero.description')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button variant="contained"
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
            startIcon={navIcon(hero.primaryAction.iconName)}
            onClick={() => navigate(hero.primaryAction.tab)}>
            {hero.primaryAction.label}
          </Button>
          <Button variant="outlined"
            sx={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
            startIcon={navIcon(hero.secondaryAction.iconName)}
            onClick={() => navigate(hero.secondaryAction.tab)}>
            {hero.secondaryAction.label}
          </Button>
        </Box>
      </Paper>

      <Alert severity={alert.severity as 'warning'} variant="outlined" sx={{ mb: 3 }}>
        <AlertTitle sx={{ fontWeight: 700 }}>{alert.title}</AlertTitle>
        <List dense disablePadding>
          {alert.points.map((point: string, i: number) => (
            <ListItem key={i} disableGutters sx={{ py: 0.15 }}>
              <ListItemIcon sx={{ minWidth: 18 }}>
                <FiberManualRecordIcon sx={{ fontSize: 8, color: 'warning.main' }} />
              </ListItemIcon>
              <ListItemText primary={point} primaryTypographyProps={{ variant: 'body2' }} />
            </ListItem>
          ))}
        </List>
      </Alert>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {overviewConfig.cards.map((card) => (
          <Grid key={card.tab} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: '100%', border: '2px solid', borderColor: 'divider',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              '&:hover': { borderColor: `${card.muiColor}.main`, boxShadow: 2 } }}>
              <CardActionArea onClick={() => navigate(card.tab)} sx={{ height: '100%', alignItems: 'flex-start', p: 0 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ fontSize: '1.5rem', color: `${card.muiColor}.main` }}>
                      {navIcon(card.iconName)}
                    </Box>
                    <Chip
                      label={'statKey' in card ? STAT_VALUES[(card as {statKey: string}).statKey] ?? (card as {statKey: string}).statKey
                            : 'statLabel' in card ? (card as {statLabel: string}).statLabel : ''}
                      size="small" color={card.muiColor as 'primary'} variant="outlined" sx={{ fontSize: '0.65rem' }}
                    />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{card.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <JsonRenderer node={componentLayouts.LegalDisclaimer} t={t} appData={appMeta as Record<string, unknown>} />

      <Box sx={{ mt: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {appMeta.legislationLinks.map((link) => (
          <Link key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" variant="caption">
            {link.label}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
