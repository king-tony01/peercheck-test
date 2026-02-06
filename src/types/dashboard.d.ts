interface MetricCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  type: "more" | "link";
  path?: string;
  options?: DropdownOption[];
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
