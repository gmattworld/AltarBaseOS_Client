export interface ConfigModel {
    id?: string;
    name: string;
    description: string;
    mission: string;
    vision: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
    website: string;
    logoUrl?: string;
    heroImageUrl?: string;
    aboutContent: string;
    serviceTimes: string;
    pastorName: string;
    foundedYear: number;
    denomination: string;
    socialMedia: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        youtube?: string;
    };
    created_at?: string;
    updated_at?: string;


    youtubeVideoId: string;
    pastorWelcomeMessage: string;
} 