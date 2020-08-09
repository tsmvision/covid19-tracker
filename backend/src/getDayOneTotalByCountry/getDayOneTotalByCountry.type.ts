interface DayOneTotalByCountry {
    Country: string,
    CountryCode: string,
    Province: string,
    City: string,
    Lat: string,
    Lon: string,
    Cases: number,
    Status: string,
    Date: string
}

export interface Data {
    dayOneTotal: DayOneTotalByCountry[]
}