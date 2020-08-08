import axios from 'axios';
import { SUMMARY_URL } from '../config';
import { Data } from './summaryResolver.type';

const summaryResolver = async (parent: any, args: any, context: any, info: any) => {
    try {
        const response = await axios.get(SUMMARY_URL);
        const data: Data = response.data;
        const {Global, Countries} = data;
        return {
            Global,
            Countries
        }
    } catch (e) {
        console.log(e);
        return {};
    }
};

export default summaryResolver;