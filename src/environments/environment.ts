export const environment = {
  // production: false,
  // churchName: process.env['CHURCH_NAME'] || 'Pharez Church',
  // churchAddress: process.env['CHURCH_ADDRESS'] || '123 Church Street',
  // churchCity: process.env['CHURCH_CITY'] || 'City',
  // churchState: process.env['CHURCH_STATE'] || 'State',
  // churchZip: process.env['CHURCH_ZIP'] || '12345',
  // churchPhone: process.env['CHURCH_PHONE'] || '(123) 456-7890',
  // churchEmail: process.env['CHURCH_EMAIL'] || 'info@pharezchurch.com',
  // sundayService1: process.env['SUNDAY_SERVICE_1'] || '9:00 AM',
  // sundayService2: process.env['SUNDAY_SERVICE_2'] || '11:00 AM',
  // wednesdayService: process.env['WEDNESDAY_SERVICE'] || '7:00 PM',
  // facebookUrl: process.env['FACEBOOK_URL'] || '#',
  // instagramUrl: process.env['INSTAGRAM_URL'] || '#',
  // youtubeUrl: process.env['YOUTUBE_URL'] || '#'

  production: false,
  churchName: 'Pharez Tech Church',
  churchAddress: '123 Church Street',
  churchCity: 'San Francisco',
  churchState: 'CA',
  churchZip: '94105',
  churchPhone: '(555) 123-4567',
  churchEmail: 'info@phareztechchurch.com',
  sundayService1: '10:00 AM',
  sundayService2: '6:00 PM',
  wednesdayService: '7:00 PM',
  facebookUrl: '#',
  instagramUrl: '#',
  youtubeUrl: 'https://www.youtube.com/@phareztechchurch',
  googleMapsApiKey: 'AIzaSyA1kJyimQbtmc0MLZ-o0IzBLQZAt28MKoE',
  serviceTimes: {
    sunday: {
      morning: '10:00 AM',
      evening: '6:00 PM',
    },
    wednesday: '7:00 PM',
  },

  // AltarBase Config
  API_BASE_URL: 'http://127.0.0.1:8087/api',
  TENANT_PUBLIC_KEY: 'f65c6575-acb0-4bd2-87a2-1a00d5d9eede',
  TENANT_SECRET_KEY: 'af347116-d602-4303-9cf8-7f3c0785f526',
};
