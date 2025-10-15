export enum TenantStatus {
    Active = 'Active',
    Inactive = 'Inactive'
}

export interface Tenant {
    name: string
    id: string
    slug: string
    domain: string
    secondary_domain: string
    status: TenantStatus
    subscription_expires_at: string
    created_at: string
}
