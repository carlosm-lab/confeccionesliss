"use client";

import React from "react";
import type { LucideProps } from "lucide-react";
import {
  Home,
  Store,
  Palette,
  Building2,
  Building,
  Mail,
  Scale,
  HelpCircle,
  Search,
  SearchX,
  X,
  Menu,
  ShoppingBag,
  ShoppingCart,
  Heart,
  MapPin,
  Phone,
  Clock,
  Star,
  StarHalf,
  CheckCircle2,
  Truck,
  CreditCard,
  ShieldCheck,
  Shield,
  Leaf,
  Shirt,
  Cookie,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  MoveLeft,
  ExternalLink,
  Printer,
  Terminal,
  GraduationCap,
  Trophy,
  Headphones,
  Briefcase,
  Bell,
  BellRing,
  BellOff,
  Share2,
  Filter,
  SlidersHorizontal,
  Plus,
  Minus,
  Trash2,
  Check,
  CheckSquare,
  Info,
  AlertTriangle,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  Layers,
  Scissors,
  Ruler,
  Sparkles,
  Download,
  Upload,
  RefreshCw,
  User,
  UserX,
  UserSearch,
  Users,
  LogOut,
  LogIn,
  BadgeCheck,
  Tag,
  Tags,
  Gift,
  FileText,
  Sliders,
  Send,
  MessageSquare,
  MessageCircle,
  Camera,
  Image,
  Folder,
  Grid2X2,
  Factory,
  Handshake,
  Package,
  BarChart3,
  Calendar,
  Megaphone,
  CloudUpload,
  HardHat,
  BookOpen,
  Pin,
  Edit,
  Edit3,
  Power,
  Timer,
  Zap,
  ShieldX,
  ShieldUser,
  Ban,
  Blocks,
  ListChecks,
  Settings2,
  Activity,
  Loader2,
  Mouse,
  Accessibility,
  Landmark,
  AtSign,
  DollarSign,
  Wallet,
  Bed,
  Moon,
  Bookmark,
  Baby,
  Puzzle,
  UserPlus,
  Key,
  Coffee,
  Cross,
  Map,
  MailWarning,
  Stethoscope,
  PlayCircle,
  Brain,
  Radar,
  Rocket,
  PiggyBank,
  TrendingUp,
  Video,
  Rows3,
} from "lucide-react";

// ─── Type ─────────────────────────────────────────────────────────────────────

type IconName = string;

interface IconProps extends Omit<LucideProps, "ref" | "fill"> {
  name: IconName;
  /** true = fill currentColor, false = none (default) */
  fill?: boolean | string;
  className?: string;
  size?: number | string;
}

// ─── Map: Material Symbols / String name → Lucide component ──────────────────

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  // Navigation & Layout
  home: Home,
  storefront: Store,
  store: Store,
  menu: Menu,
  close: X,
  cancel: X,
  search: Search,
  search_off: SearchX,
  manage_search: Search,
  dashboard: Grid2X2,
  grid_view: Grid2X2,
  category: Grid2X2,

  // Brand / Services
  design_services: Palette,
  palette: Palette,
  business: Building2,
  business_center: Briefcase,
  work: Briefcase,
  work_history: Briefcase,
  domain: Building,
  construction: HardHat,
  factory: Factory,
  handshake: Handshake,
  groups: Users,
  group: Users,
  people: Users,
  family_restroom: Users,
  wc: Users,
  boy: User,
  child_care: Baby,

  // Communication
  mail: Mail,
  drafts: Mail,
  send: Send,
  message: MessageSquare,
  chat: MessageCircle,
  forum: MessageCircle,
  quick_phrases: MessageCircle,
  contact_support: Headphones,
  support_agent: Headphones,
  campaign: Megaphone,
  rate_review: Star,
  mark_email_read: Check,
  mark_email_unread: MailWarning,
  call: Phone,
  alternate_email: AtSign,

  // Legal / Policy
  gavel: Scale,
  shield: Shield,
  shield_lock: ShieldCheck,
  shield_person: ShieldCheck,
  security: ShieldCheck,
  health_and_safety: ShieldCheck,
  verified: BadgeCheck,
  verified_user: BadgeCheck,
  remove_moderator: ShieldX,
  lock: Lock,
  key: Key,

  // Commerce & Cart
  shopping_bag: ShoppingBag,
  shopping_cart: ShoppingCart,
  favorite: Heart,
  favorite_border: Heart,
  local_shipping: Truck,
  payments: CreditCard,
  attach_money: DollarSign,
  savings: PiggyBank,
  local_offer: Tag,
  sell: Tags,
  inventory_2: Package,
  add_photo_alternate: Camera,
  photo_camera: Camera,
  credit_card: CreditCard,
  wallet: Wallet,

  // Product / Catalog
  draw: Edit3,
  mouse: Mouse,
  styler: Shirt,
  steps: ListChecks,
  checkroom: Shirt,
  apparel: Shirt,
  dry_cleaning: Shirt,
  layers: Layers,
  content_cut: Scissors,
  cut: Scissors,
  straighten: Ruler,
  texture: Blocks,
  strikethrough_s: Edit3,

  // People & Accounts
  person: User,
  user: User,
  account_circle: User,
  person_off: UserX,
  person_search: UserSearch,
  group_add: UserPlus,
  manage_accounts: Settings2,
  admin_panel_settings: ShieldCheck,
  logout: LogOut,
  login: LogIn,
  accessibility_new: Accessibility,

  // Status & Feedback
  check: Check,
  check_circle: CheckCircle2,
  task_alt: CheckCircle2,
  check_box: CheckSquare,
  checklist: ListChecks,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  block: Ban,
  pending: Loader2,
  progress_activity: Loader2,
  hourglass_empty: Loader2,
  power_off: Power,
  help: HelpCircle,

  // Nature / Sustainability
  eco: Leaf,
  cookie: Cookie,

  // Time & Schedule
  schedule: Clock,
  timer: Timer,
  calendar_month: Calendar,
  calendar_today: Calendar,

  // Education & Medical & Misc
  school: GraduationCap,
  menu_book: BookOpen,
  sports_soccer: Trophy,
  sports: Trophy,
  workspace_premium: Sparkles,
  medical_services: Stethoscope,
  local_hospital: Cross,
  local_cafe: Coffee,
  bed: Bed,
  bedtime: Moon,
  extension: Puzzle,
  account_balance: Landmark,

  // Arrows & Navigation
  arrow_right_alt: ArrowRight,
  arrow_forward: ArrowRight,
  arrow_forward_ios: ChevronRight,
  arrow_back: ArrowLeft,
  arrow_back_ios: ChevronLeft,
  arrow_downward: ArrowDown,
  arrow_upward: ArrowUp,
  keyboard_backspace: MoveLeft,
  expand_more: ChevronDown,
  expand_less: ChevronUp,
  chevron_right: ChevronRight,
  chevron_left: ChevronLeft,

  // Actions
  add: Plus,
  remove: Minus,
  delete: Trash2,
  trash: Trash2,
  edit: Edit,
  edit_note: Edit3,
  refresh: RefreshCw,
  replay: RefreshCw,
  share: Share2,
  facebook: Share2,
  open_in_new: ExternalLink,
  print: Printer,
  download: Download,
  upload: Upload,
  cloud_upload: CloudUpload,
  tune: SlidersHorizontal,
  sliders: Sliders,
  filter_list: Filter,
  sort: SlidersHorizontal,

  // Files & Media & Tools
  image: Image,
  folder: Folder,
  file_text: FileText,
  description: FileText,
  request_quote: FileText,
  tag: Tag,
  gift: Gift,
  near_me: MapPin,
  push_pin: Pin,
  map: Map,
  location_on: MapPin,
  phone: Phone,

  // Notifications
  notifications: Bell,
  notifications_active: BellRing,
  notifications_none: BellOff,

  // Stars
  star: Star,
  star_half: StarHalf,
  star_outline: Star,

  // Interactive & Features
  auto_awesome: Sparkles,
  sparkles: Sparkles,
  new_releases: Sparkles,
  monitoring: BarChart3,
  trending_up: TrendingUp,
  badge_check: BadgeCheck,
  activity: Activity,
  play_circle: PlayCircle,
  videocam: Video,
  psychology: Brain,
  radar: Radar,
  rocket_launch: Rocket,
  bookmark: Bookmark,
  view_agenda: Rows3,
  terminal: Terminal,

  // Extra
  eye: Eye,
  eye_off: EyeOff,
  zap: Zap,
  shield_user: ShieldUser,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Icon({
  name,
  fill = false,
  className,
  size,
  color,
  strokeWidth = 2,
  ...props
}: IconProps) {
  const rawKey = (name ?? "").toLowerCase().trim();
  const underscoreKey = rawKey.replace(/-/g, "_");
  const dashKey = rawKey.replace(/_/g, "-");
  const cleanKey = rawKey.replace(/[-_]/g, "");

  const IconComponent =
    ICON_MAP[rawKey] ??
    ICON_MAP[underscoreKey] ??
    ICON_MAP[dashKey] ??
    ICON_MAP[cleanKey] ??
    HelpCircle;

  const isFillableIcon =
    [
      "favorite",
      "favorite_border",
      "heart",
      "star",
      "star_half",
      "bookmark",
    ].includes(rawKey) ||
    [
      "favorite",
      "favorite_border",
      "heart",
      "star",
      "star_half",
      "bookmark",
    ].includes(underscoreKey);

  const fillStyle =
    typeof fill === "string"
      ? fill
      : fill && isFillableIcon
        ? "currentColor"
        : "none";

  return (
    <IconComponent
      className={className}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      fill={fillStyle}
      {...props}
    />
  );
}
