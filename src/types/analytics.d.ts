interface UserInsightsData {
  totalUsers: TotalUsers;
  newUsers: NewUsers;
  avgSessionDuration: AvgSessionDuration;
  topCity: TopCity;
  userGrowth: UserGrowth[];
  topCities: City[];
  topRoles: TopRole[];
  topIndustries: TopIndustry[];
}

interface TotalUsers {
  count: number;
  change: number;
}

interface NewUsers {
  count: number;
  change: number;
}

interface AvgSessionDuration {
  duration: number;
  unit: string;
}

interface TopCity {
  city: string;
  country: string;
}

interface UserGrowth {
  month: string;
  count: number;
}

interface City {
  city: string;
  count: number;
}

interface TopRole {
  name: string;
  count: number;
}

interface TopIndustry {
  name: any;
  count: number;
}

interface ReviewVolumeByIndustryData {
  industry: string;
  count: number;
}

interface CoverageDepthByIndustryData {
  industry: string;
  count: number;
}
