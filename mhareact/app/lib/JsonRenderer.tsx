'use client';

/**
 * Recursive JSON → MUI component renderer.
 *
 * Layout nodes in data.json use this schema:
 *   { "component": "Box",          // name in REGISTRY
 *     "props": { "sx": {...} },     // MUI props
 *     "text": "static text",        // OR literal text
 *     "i18nKey": "some.key",        // OR translation key
 *     "dataKey": "app.title",       // OR dot-path into appData
 *     "iconProps": { "startIcon": "Search" },  // icon prop bindings
 *     "children": [...]             // nested nodes (recursive)
 *   }
 */

import { createElement, Fragment, type ReactNode, type ComponentType } from 'react';

// ── Layout ────────────────────────────────────────────────────────────────────
import AppBar    from '@mui/material/AppBar';
import Box       from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider   from '@mui/material/Divider';
import Grid      from '@mui/material/Grid';
import Paper     from '@mui/material/Paper';
import Stack     from '@mui/material/Stack';
import Toolbar   from '@mui/material/Toolbar';

// ── Navigation ────────────────────────────────────────────────────────────────
import BottomNavigation       from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Breadcrumbs            from '@mui/material/Breadcrumbs';
import Link                   from '@mui/material/Link';
import Menu                   from '@mui/material/Menu';
import MenuItem               from '@mui/material/MenuItem';
import MenuList               from '@mui/material/MenuList';
import Pagination             from '@mui/material/Pagination';
import PaginationItem         from '@mui/material/PaginationItem';
import SpeedDial              from '@mui/material/SpeedDial';
import SpeedDialAction        from '@mui/material/SpeedDialAction';
import SpeedDialIcon          from '@mui/material/SpeedDialIcon';
import Step                   from '@mui/material/Step';
import StepButton             from '@mui/material/StepButton';
import StepConnector          from '@mui/material/StepConnector';
import StepContent            from '@mui/material/StepContent';
import StepIcon               from '@mui/material/StepIcon';
import StepLabel              from '@mui/material/StepLabel';
import Stepper                from '@mui/material/Stepper';
import Tab                    from '@mui/material/Tab';
import Tabs                   from '@mui/material/Tabs';
import TabScrollButton        from '@mui/material/TabScrollButton';

// ── Surfaces ──────────────────────────────────────────────────────────────────
import Accordion        from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Card             from '@mui/material/Card';
import CardActionArea   from '@mui/material/CardActionArea';
import CardActions      from '@mui/material/CardActions';
import CardContent      from '@mui/material/CardContent';
import CardHeader       from '@mui/material/CardHeader';
import CardMedia        from '@mui/material/CardMedia';

// ── Feedback ──────────────────────────────────────────────────────────────────
import Alert             from '@mui/material/Alert';
import AlertTitle        from '@mui/material/AlertTitle';
import Backdrop          from '@mui/material/Backdrop';
import CircularProgress  from '@mui/material/CircularProgress';
import Dialog            from '@mui/material/Dialog';
import DialogActions     from '@mui/material/DialogActions';
import DialogContent     from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle       from '@mui/material/DialogTitle';
import LinearProgress    from '@mui/material/LinearProgress';
import Modal             from '@mui/material/Modal';
import Skeleton          from '@mui/material/Skeleton';
import Snackbar          from '@mui/material/Snackbar';
import SnackbarContent   from '@mui/material/SnackbarContent';
import Tooltip           from '@mui/material/Tooltip';

// ── Data Display ──────────────────────────────────────────────────────────────
import Avatar                  from '@mui/material/Avatar';
import AvatarGroup             from '@mui/material/AvatarGroup';
import Badge                   from '@mui/material/Badge';
import Chip                    from '@mui/material/Chip';
import ImageList               from '@mui/material/ImageList';
import ImageListItem           from '@mui/material/ImageListItem';
import ImageListItemBar        from '@mui/material/ImageListItemBar';
import List                    from '@mui/material/List';
import ListItem                from '@mui/material/ListItem';
import ListItemAvatar          from '@mui/material/ListItemAvatar';
import ListItemButton          from '@mui/material/ListItemButton';
import ListItemIcon            from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText            from '@mui/material/ListItemText';
import ListSubheader           from '@mui/material/ListSubheader';
import MobileStepper           from '@mui/material/MobileStepper';
import Table                   from '@mui/material/Table';
import TableBody               from '@mui/material/TableBody';
import TableCell               from '@mui/material/TableCell';
import TableContainer          from '@mui/material/TableContainer';
import TableFooter             from '@mui/material/TableFooter';
import TableHead               from '@mui/material/TableHead';
import TablePagination         from '@mui/material/TablePagination';
import TableRow                from '@mui/material/TableRow';
import TableSortLabel          from '@mui/material/TableSortLabel';
import Typography              from '@mui/material/Typography';

// ── Inputs ────────────────────────────────────────────────────────────────────
import Autocomplete      from '@mui/material/Autocomplete';
import Button            from '@mui/material/Button';
import ButtonBase        from '@mui/material/ButtonBase';
import ButtonGroup       from '@mui/material/ButtonGroup';
import Checkbox          from '@mui/material/Checkbox';
import Fab               from '@mui/material/Fab';
import FilledInput       from '@mui/material/FilledInput';
import FormControl       from '@mui/material/FormControl';
import FormControlLabel  from '@mui/material/FormControlLabel';
import FormGroup         from '@mui/material/FormGroup';
import FormHelperText    from '@mui/material/FormHelperText';
import FormLabel         from '@mui/material/FormLabel';
import IconButton        from '@mui/material/IconButton';
import Input             from '@mui/material/Input';
import InputAdornment    from '@mui/material/InputAdornment';
import InputBase         from '@mui/material/InputBase';
import InputLabel        from '@mui/material/InputLabel';
import NativeSelect      from '@mui/material/NativeSelect';
import OutlinedInput     from '@mui/material/OutlinedInput';
import Radio             from '@mui/material/Radio';
import RadioGroup        from '@mui/material/RadioGroup';
import Rating            from '@mui/material/Rating';
import Select            from '@mui/material/Select';
import Slider            from '@mui/material/Slider';
import Switch            from '@mui/material/Switch';
import TextareaAutosize  from '@mui/material/TextareaAutosize';
import TextField         from '@mui/material/TextField';
import ToggleButton      from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// ── Transitions ───────────────────────────────────────────────────────────────
import Collapse from '@mui/material/Collapse';
import Fade     from '@mui/material/Fade';
import Grow     from '@mui/material/Grow';
import Slide    from '@mui/material/Slide';
import Zoom     from '@mui/material/Zoom';

// ── Utils ─────────────────────────────────────────────────────────────────────
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CssBaseline       from '@mui/material/CssBaseline';
import Drawer            from '@mui/material/Drawer';
import Popover           from '@mui/material/Popover';
import Popper            from '@mui/material/Popper';
import Portal            from '@mui/material/Portal';
import SvgIcon           from '@mui/material/SvgIcon';

// ── Icons (curated for JSON-driven layouts) ───────────────────────────────────
import AccountTreeOutlinedIcon  from '@mui/icons-material/AccountTreeOutlined';
import AddIcon                  from '@mui/icons-material/Add';
import ArrowBackIcon            from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon         from '@mui/icons-material/ArrowForward';
import AssignmentIcon           from '@mui/icons-material/Assignment';
import BookmarkBorderIcon       from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon             from '@mui/icons-material/Bookmark';
import CalendarTodayIcon        from '@mui/icons-material/CalendarToday';
import CancelOutlinedIcon       from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon          from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon   from '@mui/icons-material/CheckCircleOutline';
import CheckIcon                from '@mui/icons-material/Check';
import ChevronLeftIcon          from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon         from '@mui/icons-material/ChevronRight';
import ClearIcon                from '@mui/icons-material/Clear';
import CloseIcon                from '@mui/icons-material/Close';
import ContentCopyIcon          from '@mui/icons-material/ContentCopy';
import DarkModeIcon             from '@mui/icons-material/DarkMode';
import DeleteIcon               from '@mui/icons-material/Delete';
import DescriptionIcon          from '@mui/icons-material/Description';
import EditIcon                 from '@mui/icons-material/Edit';
import EmailIcon                from '@mui/icons-material/Email';
import ErrorOutlineIcon         from '@mui/icons-material/ErrorOutline';
import EventIcon                from '@mui/icons-material/Event';
import ExpandLessIcon           from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon           from '@mui/icons-material/ExpandMore';
import ExitToAppOutlinedIcon    from '@mui/icons-material/ExitToAppOutlined';
import FavoriteBorderIcon       from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon             from '@mui/icons-material/Favorite';
import FiberManualRecordIcon    from '@mui/icons-material/FiberManualRecord';
import FilterListIcon           from '@mui/icons-material/FilterList';
import GavelIcon                from '@mui/icons-material/Gavel';
import GavelOutlinedIcon        from '@mui/icons-material/GavelOutlined';
import HomeIcon                 from '@mui/icons-material/Home';
import HomeOutlinedIcon         from '@mui/icons-material/HomeOutlined';
import InfoIcon                 from '@mui/icons-material/Info';
import InfoOutlinedIcon         from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon    from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon    from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon   from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon      from '@mui/icons-material/KeyboardArrowUp';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import LightModeIcon            from '@mui/icons-material/LightMode';
import LightbulbOutlinedIcon    from '@mui/icons-material/LightbulbOutlined';
import LocalHospitalIcon        from '@mui/icons-material/LocalHospital';
import LockIcon                 from '@mui/icons-material/Lock';
import LockOpenIcon             from '@mui/icons-material/LockOpen';
import MailOutlinedIcon         from '@mui/icons-material/MailOutlined';
import MenuIcon                 from '@mui/icons-material/Menu';
import MoreHorizIcon            from '@mui/icons-material/MoreHoriz';
import MoreVertIcon             from '@mui/icons-material/MoreVert';
import NotificationsIcon        from '@mui/icons-material/Notifications';
import NotificationsNoneIcon    from '@mui/icons-material/NotificationsNone';
import PeopleIcon               from '@mui/icons-material/People';
import PersonIcon               from '@mui/icons-material/Person';
import PhoneIcon                from '@mui/icons-material/Phone';
import PlayArrowIcon            from '@mui/icons-material/PlayArrow';
import PsychologyIcon           from '@mui/icons-material/Psychology';
import RefreshIcon              from '@mui/icons-material/Refresh';
import RemoveIcon               from '@mui/icons-material/Remove';
import ScheduleIcon             from '@mui/icons-material/Schedule';
import SearchIcon               from '@mui/icons-material/Search';
import ShareIcon                from '@mui/icons-material/Share';
import ShieldIcon               from '@mui/icons-material/Shield';
import ShieldOutlinedIcon       from '@mui/icons-material/ShieldOutlined';
import SortIcon                 from '@mui/icons-material/Sort';
import StarBorderIcon           from '@mui/icons-material/StarBorder';
import StarIcon                 from '@mui/icons-material/Star';
import WarningAmberIcon         from '@mui/icons-material/WarningAmber';
import WarningIcon              from '@mui/icons-material/Warning';

// ── Type helpers ──────────────────────────────────────────────────────────────
type AnyComponent = ComponentType<Record<string, unknown>>;
/** Silence strict prop-type mismatch on every registry entry */
const c = (x: unknown) => x as AnyComponent;

// ── Component registry — maps JSON "component" string → React component ───────
export const REGISTRY: Record<string, AnyComponent> = {
  // Layout
  AppBar: c(AppBar), Box: c(Box), Container: c(Container), Divider: c(Divider),
  Grid: c(Grid), Paper: c(Paper), Stack: c(Stack), Toolbar: c(Toolbar),

  // Navigation
  BottomNavigation: c(BottomNavigation), BottomNavigationAction: c(BottomNavigationAction),
  Breadcrumbs: c(Breadcrumbs), Link: c(Link),
  Menu: c(Menu), MenuItem: c(MenuItem), MenuList: c(MenuList),
  Pagination: c(Pagination), PaginationItem: c(PaginationItem),
  SpeedDial: c(SpeedDial), SpeedDialAction: c(SpeedDialAction), SpeedDialIcon: c(SpeedDialIcon),
  Step: c(Step), StepButton: c(StepButton), StepConnector: c(StepConnector),
  StepContent: c(StepContent), StepIcon: c(StepIcon), StepLabel: c(StepLabel), Stepper: c(Stepper),
  Tab: c(Tab), Tabs: c(Tabs), TabScrollButton: c(TabScrollButton),

  // Surfaces
  Accordion: c(Accordion), AccordionActions: c(AccordionActions),
  AccordionDetails: c(AccordionDetails), AccordionSummary: c(AccordionSummary),
  Card: c(Card), CardActionArea: c(CardActionArea), CardActions: c(CardActions),
  CardContent: c(CardContent), CardHeader: c(CardHeader), CardMedia: c(CardMedia),

  // Feedback
  Alert: c(Alert), AlertTitle: c(AlertTitle), Backdrop: c(Backdrop),
  CircularProgress: c(CircularProgress),
  Dialog: c(Dialog), DialogActions: c(DialogActions), DialogContent: c(DialogContent),
  DialogContentText: c(DialogContentText), DialogTitle: c(DialogTitle),
  LinearProgress: c(LinearProgress), Modal: c(Modal),
  Skeleton: c(Skeleton), Snackbar: c(Snackbar), SnackbarContent: c(SnackbarContent),
  Tooltip: c(Tooltip),

  // Data Display
  Avatar: c(Avatar), AvatarGroup: c(AvatarGroup), Badge: c(Badge), Chip: c(Chip),
  ImageList: c(ImageList), ImageListItem: c(ImageListItem), ImageListItemBar: c(ImageListItemBar),
  List: c(List), ListItem: c(ListItem), ListItemAvatar: c(ListItemAvatar),
  ListItemButton: c(ListItemButton), ListItemIcon: c(ListItemIcon),
  ListItemSecondaryAction: c(ListItemSecondaryAction),
  ListItemText: c(ListItemText), ListSubheader: c(ListSubheader),
  MobileStepper: c(MobileStepper),
  Table: c(Table), TableBody: c(TableBody), TableCell: c(TableCell),
  TableContainer: c(TableContainer), TableFooter: c(TableFooter),
  TableHead: c(TableHead), TablePagination: c(TablePagination),
  TableRow: c(TableRow), TableSortLabel: c(TableSortLabel),
  Typography: c(Typography),

  // Inputs
  Autocomplete: c(Autocomplete), Button: c(Button), ButtonBase: c(ButtonBase),
  ButtonGroup: c(ButtonGroup), Checkbox: c(Checkbox), Fab: c(Fab),
  FilledInput: c(FilledInput), FormControl: c(FormControl),
  FormControlLabel: c(FormControlLabel), FormGroup: c(FormGroup),
  FormHelperText: c(FormHelperText), FormLabel: c(FormLabel),
  IconButton: c(IconButton), Input: c(Input), InputAdornment: c(InputAdornment),
  InputBase: c(InputBase), InputLabel: c(InputLabel), NativeSelect: c(NativeSelect),
  OutlinedInput: c(OutlinedInput), Radio: c(Radio), RadioGroup: c(RadioGroup),
  Rating: c(Rating), Select: c(Select), Slider: c(Slider), Switch: c(Switch),
  TextareaAutosize: c(TextareaAutosize), TextField: c(TextField),
  ToggleButton: c(ToggleButton), ToggleButtonGroup: c(ToggleButtonGroup),

  // Transitions
  Collapse: c(Collapse), Fade: c(Fade), Grow: c(Grow), Slide: c(Slide), Zoom: c(Zoom),

  // Utils
  ClickAwayListener: c(ClickAwayListener), CssBaseline: c(CssBaseline),
  Drawer: c(Drawer), Popover: c(Popover), Popper: c(Popper),
  Portal: c(Portal), SvgIcon: c(SvgIcon),

  // Special
  Fragment: Fragment as unknown as AnyComponent,
};

// ── Icon registry — maps JSON "iconName" string → icon component ──────────────
export const ICON_REGISTRY: Record<string, AnyComponent> = {
  // Used in this app
  AccountTreeOutlined: c(AccountTreeOutlinedIcon),
  CancelOutlined:      c(CancelOutlinedIcon),
  CheckCircleOutline:  c(CheckCircleOutlineIcon),
  Clear:               c(ClearIcon),
  ExitToAppOutlined:   c(ExitToAppOutlinedIcon),
  FiberManualRecord:   c(FiberManualRecordIcon),
  GavelOutlined:       c(GavelOutlinedIcon),
  HomeOutlined:        c(HomeOutlinedIcon),
  LibraryBooksOutlined: c(LibraryBooksOutlinedIcon),
  LightbulbOutlined:   c(LightbulbOutlinedIcon),
  MailOutlined:        c(MailOutlinedIcon),
  PlayArrow:           c(PlayArrowIcon),
  ShieldOutlined:      c(ShieldOutlinedIcon),
  WarningAmber:        c(WarningAmberIcon),
  // Common UI
  Add:                 c(AddIcon),
  ArrowBack:           c(ArrowBackIcon),
  ArrowForward:        c(ArrowForwardIcon),
  Assignment:          c(AssignmentIcon),
  Bookmark:            c(BookmarkIcon),
  BookmarkBorder:      c(BookmarkBorderIcon),
  CalendarToday:       c(CalendarTodayIcon),
  Check:               c(CheckIcon),
  CheckCircle:         c(CheckCircleIcon),
  ChevronLeft:         c(ChevronLeftIcon),
  ChevronRight:        c(ChevronRightIcon),
  Close:               c(CloseIcon),
  ContentCopy:         c(ContentCopyIcon),
  DarkMode:            c(DarkModeIcon),
  Delete:              c(DeleteIcon),
  Description:         c(DescriptionIcon),
  Edit:                c(EditIcon),
  Email:               c(EmailIcon),
  ErrorOutline:        c(ErrorOutlineIcon),
  Event:               c(EventIcon),
  ExpandLess:          c(ExpandLessIcon),
  ExpandMore:          c(ExpandMoreIcon),
  Favorite:            c(FavoriteIcon),
  FavoriteBorder:      c(FavoriteBorderIcon),
  FilterList:          c(FilterListIcon),
  Gavel:               c(GavelIcon),
  Home:                c(HomeIcon),
  Info:                c(InfoIcon),
  InfoOutlined:        c(InfoOutlinedIcon),
  KeyboardArrowDown:   c(KeyboardArrowDownIcon),
  KeyboardArrowLeft:   c(KeyboardArrowLeftIcon),
  KeyboardArrowRight:  c(KeyboardArrowRightIcon),
  KeyboardArrowUp:     c(KeyboardArrowUpIcon),
  LightMode:           c(LightModeIcon),
  LocalHospital:       c(LocalHospitalIcon),
  Lock:                c(LockIcon),
  LockOpen:            c(LockOpenIcon),
  Menu:                c(MenuIcon),
  MoreHoriz:           c(MoreHorizIcon),
  MoreVert:            c(MoreVertIcon),
  Notifications:       c(NotificationsIcon),
  NotificationsNone:   c(NotificationsNoneIcon),
  People:              c(PeopleIcon),
  Person:              c(PersonIcon),
  Phone:               c(PhoneIcon),
  Psychology:          c(PsychologyIcon),
  Refresh:             c(RefreshIcon),
  Remove:              c(RemoveIcon),
  Schedule:            c(ScheduleIcon),
  Search:              c(SearchIcon),
  Share:               c(ShareIcon),
  Shield:              c(ShieldIcon),
  Sort:                c(SortIcon),
  Star:                c(StarIcon),
  StarBorder:          c(StarBorderIcon),
  Warning:             c(WarningIcon),
};

// ── LayoutNode schema ─────────────────────────────────────────────────────────
export interface LayoutNode {
  component: string;
  props?: Record<string, unknown>;
  /** Literal string content */
  text?: string;
  /** Translation key — resolved via t() */
  i18nKey?: string;
  /** Dot-path into appData — e.g. "app.disclaimer" */
  dataKey?: string;
  /**
   * Icon prop bindings — maps a prop name to an ICON_REGISTRY key.
   * e.g. { "startIcon": "Search" } renders <SearchIcon /> as the startIcon prop.
   */
  iconProps?: Record<string, string>;
  /** Child nodes or string */
  children?: LayoutNode[] | string;
}

type Translations = Record<string, string>;
type AppData = Record<string, unknown>;

/** Resolve a dot-path like "app.disclaimer" against a nested object */
function resolvePath(obj: AppData, path: string): string {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof value === 'string' ? value : path;
}

interface RendererProps {
  node: LayoutNode;
  /** Translation dictionary */
  t: (key: string) => string;
  /** Flat app data for dataKey bindings */
  appData?: AppData;
  /** Slot overrides — if a node's component matches a slot key, render that instead */
  slots?: Record<string, ReactNode>;
}

export function JsonRenderer({ node, t, appData = {}, slots = {} }: RendererProps): ReactNode {
  // Slot override: if a named slot exists for this component, render that
  if (slots[node.component]) {
    return slots[node.component];
  }

  const Component = REGISTRY[node.component];
  if (!Component) {
    console.warn(`[JsonRenderer] Unknown component: "${node.component}"`);
    return null;
  }

  // Resolve text content (priority: i18nKey > dataKey > text)
  let textContent: ReactNode = null;
  if (node.i18nKey) {
    textContent = t(node.i18nKey);
  } else if (node.dataKey) {
    textContent = resolvePath(appData, node.dataKey);
  } else if (typeof node.text === 'string') {
    textContent = node.text;
  }

  // Resolve children
  let childContent: ReactNode = textContent;
  if (node.children) {
    if (typeof node.children === 'string') {
      childContent = node.children;
    } else {
      childContent = node.children.map((child, i) => (
        <JsonRenderer key={i} node={child} t={t} appData={appData} slots={slots} />
      ));
      // Merge text content before children if both exist
      if (textContent) {
        childContent = (
          <>
            {textContent}
            {childContent}
          </>
        );
      }
    }
  }

  // Resolve iconProps — { startIcon: "Search" } → { startIcon: <SearchIcon /> }
  const resolvedIconProps: Record<string, ReactNode> = {};
  if (node.iconProps) {
    for (const [propKey, iconName] of Object.entries(node.iconProps)) {
      const IconCmp = ICON_REGISTRY[iconName];
      if (IconCmp) resolvedIconProps[propKey] = createElement(IconCmp as ComponentType);
      else console.warn(`[JsonRenderer] Unknown icon: "${iconName}"`);
    }
  }

  return (
    <Component {...(node.props ?? {})} {...resolvedIconProps}>
      {childContent ?? null}
    </Component>
  );
}
