'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

import { orgChart, layouts } from '../data/index';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleNode, toggleRelevance, expandAll, collapseAll } from '../store/slices/orgChartSlice';
import type { OrgNode } from '../data/types';

function countNodes(node: OrgNode): number {
  return 1 + node.children.reduce((s, c) => s + countNodes(c), 0);
}
function countHighlighted(node: OrgNode): number {
  return (node.highlight ? 1 : 0) + node.children.reduce((s, c) => s + countHighlighted(c), 0);
}

function OrgChartNode({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const dispatch = useAppDispatch();
  const expandedNodes = useAppSelector((s) => s.orgChart.expandedNodes);
  const openRelevanceNode = useAppSelector((s) => s.orgChart.openRelevanceNode);

  const isExpanded = expandedNodes.includes(node.id);
  const showRelevance = openRelevanceNode === node.id;
  const hasChildren = node.children.length > 0;

  return (
    <Box sx={{ ml: depth > 0 ? 3 : 0, mt: 1, position: 'relative' }}>
      {depth > 0 && (
        <Box
          sx={{
            position: 'absolute',
            left: -16,
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: 'divider',
          }}
        />
      )}

      <Paper
        sx={{
          p: 1.5,
          bgcolor: node.highlight ? 'primary.main' : 'background.paper',
          color: node.highlight ? 'primary.contrastText' : 'text.primary',
          border: node.highlight ? '2px solid' : '1px solid',
          borderColor: node.highlight ? 'primary.dark' : 'divider',
          cursor: hasChildren ? 'pointer' : 'default',
          '&:hover': hasChildren ? { borderColor: node.highlight ? 'primary.light' : 'primary.main' } : {},
          transition: 'border-color 0.15s',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          {hasChildren && (
            <IconButton
              size="small"
              onClick={() => dispatch(toggleNode(node.id))}
              sx={{
                color: node.highlight ? 'primary.contrastText' : 'text.secondary',
                p: 0.25,
                mt: 0.25,
                flexShrink: 0,
              }}
            >
              {isExpanded ? (
                <ExpandMoreIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )}
            </IconButton>
          )}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{ color: node.highlight ? 'inherit' : 'text.primary', lineHeight: 1.3 }}
            >
              {node.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: node.highlight ? 'primary.contrastText' : 'text.secondary', opacity: 0.85 }}
            >
              {node.subtitle}
            </Typography>
          </Box>

          <Tooltip title={showRelevance ? 'Hide relevance' : 'Why does this matter?'}>
            <IconButton
              size="small"
              onClick={() => dispatch(toggleRelevance(node.id))}
              sx={{
                color: node.highlight ? 'primary.contrastText' : 'text.secondary',
                p: 0.25,
                flexShrink: 0,
                opacity: 0.7,
                '&:hover': { opacity: 1 },
              }}
            >
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Collapse in={showRelevance}>
          <Box
            sx={{
              mt: 1,
              pt: 1,
              borderTop: '1px solid',
              borderColor: node.highlight ? 'primary.light' : 'divider',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: node.highlight ? 'primary.contrastText' : 'text.secondary',
                lineHeight: 1.5,
              }}
            >
              {node.relevance}
            </Typography>
          </Box>
        </Collapse>
      </Paper>

      <Collapse in={isExpanded && hasChildren}>
        <Box>
          {node.children.map((child) => (
            <OrgChartNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

export default function OrgChart() {
  const dispatch = useAppDispatch();
  const totalNodes = countNodes(orgChart);
  const highlightedNodes = countHighlighted(orgChart);
  const layout = layouts.orgChart;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Hospital Organisation Chart
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Who does what in a typical NHS mental health trust. Click{' '}
              <Box component="span" sx={{ fontFamily: 'monospace', bgcolor: 'action.hover', px: 0.5, borderRadius: 1, fontSize: '0.8em' }}>
                ▶
              </Box>{' '}
              to expand/collapse. Click{' '}
              <Box component="span" sx={{ fontFamily: 'monospace', bgcolor: 'action.hover', px: 0.5, borderRadius: 1, fontSize: '0.8em' }}>
                ℹ
              </Box>{' '}
              to see why a role matters.
            </Typography>
          </Box>
          {/* Expand / collapse all */}
          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<UnfoldMoreIcon fontSize="small" />}
              onClick={() => dispatch(expandAll())}
              sx={{ fontSize: '0.75rem' }}
            >
              Expand all
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<UnfoldLessIcon fontSize="small" />}
              onClick={() => dispatch(collapseAll())}
              sx={{ fontSize: '0.75rem' }}
            >
              Collapse all
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {totalNodes} roles
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: 'primary.main' }} />
            <Typography variant="caption" color="text.secondary">
              {highlightedNodes} key roles
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            layout: {layout.variant}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
        <Chip
          size="small"
          label="Directly relevant to your detention"
          sx={{ bgcolor: 'primary.main', color: 'white', fontSize: '0.7rem' }}
        />
        <Chip
          size="small"
          variant="outlined"
          label="Supporting role"
          sx={{ fontSize: '0.7rem' }}
        />
      </Box>

      <Paper sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
        <OrgChartNode node={orgChart} depth={0} />
      </Paper>
    </Box>
  );
}
