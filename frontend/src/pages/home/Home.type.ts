export interface Country {
    Country: string,
    TotalConfirmed: number
}
export type Countries = Country[];

export interface CardBlockProps {
    title: string,
    value1: number,
    value2: number,
    isValue1ColorGreen?: boolean
}

export interface LiveCasesByCountryProps {
    countries: Country[],
    limit?: number
} 

export interface LivesCasesByCountryRowProps extends Country {
    rowNumber: number
}