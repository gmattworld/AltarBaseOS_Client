export interface Donation {
  amount: number;
  currency: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  paymentMethod: 'credit' | 'debit' | 'bank';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  bankAccountNumber?: string;
  bankRoutingNumber?: string;
  isRecurring: boolean;
  recurringFrequency?: 'weekly' | 'monthly' | 'quarterly' | 'annually';
  designation?: string;
  message?: string;
} 