'use client';

import { createElement } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { navigation } from '../data/index';
import { ICON_REGISTRY } from '../lib/JsonRenderer';

export default function NavTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = navigation.tabs.findIndex((tab) =>
    tab.path === '/' ? pathname === '/' : pathname === tab.path || pathname.startsWith(tab.path + '/')
  );

  return (
    <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider',
      position: 'sticky', top: 0, zIndex: 1100, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <Container maxWidth="xl" disableGutters>
        <Tabs
          value={Math.max(0, activeIndex)}
          onChange={(_, idx) => router.push(navigation.tabs[idx].path)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 48 }}
        >
          {navigation.tabs.map((tab) => {
            const IconCmp = ICON_REGISTRY[tab.iconName];
            return (
              <Tab
                key={tab.id}
                icon={IconCmp ? createElement(IconCmp as React.ComponentType) as React.ReactElement : undefined}
                iconPosition="start"
                label={tab.label}
                sx={{ minHeight: 48, py: 1.5 }}
              />
            );
          })}
        </Tabs>
      </Container>
    </Box>
  );
}
