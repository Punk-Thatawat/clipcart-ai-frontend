export interface ApiUser {
  id: string;
  email: string;
  displayName: string;
  role: string;
  status: string;
  avatarUrl: string | null;
  createdAtUtc: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: ApiUser;
}

export interface ApiProduct {
  externalId: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  shop: string;
  commissionRate: number;
  viralScore: number;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface AnalyticsDashboard {
  clicks: number;
  conversions: number;
  conversionRate: number;
  estimatedEarnings: number;
}

export interface CreditBalance {
  balance: number;
  reservedBalance: number;
  availableBalance: number;
}

export interface SubscriptionPlan {
  id: string;
  code: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyGenerationLimit: number;
  features: string[];
}

export interface CurrentSubscription {
  id: string;
  planId: string;
  planName: string;
  status: string;
  billingCycle: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface CheckoutSession {
  paymentId: string;
  checkoutUrl: string;
}
