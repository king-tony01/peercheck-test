interface MetricCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  type: "more" | "link";
  path?: string;
  options?: DropdownOption[];
  isLoading?: boolean;
  trend?: {
    direction: "up" | "down";
    percentage: number;
  };
  chip?: {
    label: string;
    color: ChipColor;
  };
}

type ChipColor = "green" | "red";

interface Chip {
  label: string;
  color: ChipColor;
  direction?: "up" | "down";
}

interface OverviewMetricCards {
  allCompanies: AllCompanies;
  allInstitutions: AllInstitutions;
  totalUsers: TotalUsers;
  totalReviewsSubmitted: TotalReviewsSubmitted;
}

interface AllCompanies {
  count: number;
  change: number;
}

interface AllInstitutions {
  count: number;
  change: number;
}

interface TotalUsers {
  count: number;
  change: number;
}

interface TotalReviewsSubmitted {
  count: number;
  change: number;
}

interface DashboardUserEngagementPoint {
  month: string;
  users: number;
  reviews: number;
  highlight?: string;
}

interface PulseChartData {
  pulseData: PulseData;
  totalReviewsByCategory: TotalReviewsByCategory[];
}

interface PulseData {
  data: PulseChartDataPoint[];
  activeUsers: number;
  period: string;
}

interface PulseChartDataPoint {
  month: string;
  users: number;
  reviews: number;
}

interface TotalReviewsByCategory {
  category: string;
  count: number;
}

interface RecentActivtyData {
  id: string;
  logName: string;
  event: any;
  description: string;
  action: any;
  model_type: any;
  model_id: any;
  meta: any;
  created_at: string;
}
