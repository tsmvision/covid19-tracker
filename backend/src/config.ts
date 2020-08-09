export const BASE_URL = 'https://api.covid19api.com';
export const SUMMARY_URL = `${BASE_URL}/summary`;
const DAY_ONE_TOTAL_BY_COUNTRY = `${BASE_URL}/total/dayone/country`
export const getDayOneTotalByCountry = (country: string) => `${DAY_ONE_TOTAL_BY_COUNTRY}/${country}/status/confirmed`;