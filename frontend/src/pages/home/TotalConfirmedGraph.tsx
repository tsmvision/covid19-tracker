import React from 'react';
import {Line} from 'react-chartjs-2';
import {TotalConfirmedGraphInput} from './TotalConfirmedGraph.type';
import moment from 'moment';

interface GetLabelResultRow {
    Date: string
}

/**
 * create label array from data
 */
const getDateLabel = (inputArray: TotalConfirmedGraphInput[]): GetLabelResultRow[] => {
    return inputArray.map(
        ({ Date }: any): any => moment(Date).format('MMM Do YYYY')
    );
};

/**
 * create array with Cases from data
 */
const getData = (inputArray: any): any => {
    return inputArray.map(
        ({ Cases }: any): any => Cases
    );
};

const getState = (inputArray: TotalConfirmedGraphInput[]): any => {
    return {
        labels: getDateLabel(inputArray),
        datasets: [
            {
                label: 'New Cases',
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(255,187,48)',
                borderColor: 'rgba(255,187,48)',
                borderWidth: 2,
                data: getData(inputArray)
            }
        ]
    };
};

const TotalConfirmedGraph = ({ data }: any)=> {
    return (
        <Line
          data={getState(data)}
          options={{
            title:{
              display:true,
              text:'United States New Cases',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
    );
};

export default TotalConfirmedGraph;
