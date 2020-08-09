import axios from 'axios';
import { getDayOneTotalByCountry } from '../config';
import { Data } from './getDayOneTotalByCountry.type';

const getDayOneTotalByCountryResolver = async (parent: any, args: any, context: any, info: any) => {
    try {
        const country: string = args.country;
        const response = await axios.get(getDayOneTotalByCountry(country));
        const data: Data = response.data;
        return data
    } catch (e) {
        console.log(e);
        return {};
    }
};

export default getDayOneTotalByCountryResolver;