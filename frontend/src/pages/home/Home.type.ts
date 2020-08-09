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

export interface LivesCasesByCountryProps extends Country {
    rowNumber: number
}