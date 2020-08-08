interface Global {
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    NewRecovered: number,
    TotalRecovered: number
}

interface Country {
    Country: string,
    CountryCode: string,
    Slug: string,
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number,
    Date: String,
}

export interface Data {
    Global: Global,
    Countries: [Country]
}