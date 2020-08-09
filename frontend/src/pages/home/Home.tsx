import React from 'react';
import { Container, Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import { useQuery, gql } from '@apollo/client';
import styles from './Home.module.scss';
import { Country, CardBlockProps, LivesCasesByCountryProps } from './Home.type';
import numeral from 'numeral';
import { cloneDeep } from 'lodash';

const SUMMARY = gql`
    query getSummary {
        summary {
            Global {
                NewConfirmed
                TotalConfirmed
                NewDeaths
                TotalDeaths
                NewRecovered
                TotalRecovered
            } 
            Countries {
                Country
                TotalConfirmed
            }    
        }
    }
`;

const getDisplayNumber = (value: number): string => {
    if (value === 0) {
        return '0';
    }
    return value >= 1000 ? numeral(value / 1000).format('+0,0.0') + 'K' : numeral(value).format('+0,0.0');
};

const CardBlock = ({ title, value1, value2, isValue1ColorGreen = false }: CardBlockProps ) => {
    return (
        <Card className={styles.card}>
            <CardTitle className={styles.cardTitle}>
                { title }
            </CardTitle>
            <CardText className={isValue1ColorGreen ? styles.cardTextGreen : styles.cardTextRed}>
                { getDisplayNumber(value1) }
            </CardText>
            <CardText className={styles.cardTotalText}>
                { getDisplayNumber(value2) } total
            </CardText>
        </Card>
    );
};

const LivesCasesByCountry = ({ Country, TotalConfirmed, rowNumber}: LivesCasesByCountryProps) => {
    return (
        <div className={rowNumber % 2 === 0 ? styles.liveCaseByCountryOdd:  styles.liveCaseByCountryEven}>
            <span>{Country}</span>
            <span>{numeral(TotalConfirmed).format('0,0')}</span>
        </div>
    );
};

const Home = () => {
    const { loading, error, data } = useQuery(SUMMARY);
    if (loading) {
        return (
            <p>
                Loading...
            </p>
        );
    }
    if (error) {
        return (
            <p>
                Error!!!
            </p>
        );
    }

    const {Global, Countries = []} = data && data.summary;
    const { 
        NewConfirmed, 
        TotalConfirmed, 
        NewDeaths, 
        TotalDeaths, 
        NewRecovered, 
        TotalRecovered } = Global;
    
    const countries: Country[] = cloneDeep(Countries).sort(
        (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed
    );
    return (
        <Container>
            <Row>
                <Col sm={12} className={styles.title}>
                    Covid19 Tracker
                </Col>
            </Row>
            <Row>
                <Col md={3} lg={2}>
                    <CardBlock 
                        title='Corona Virus Cases' 
                        value1={NewConfirmed}
                        value2={TotalConfirmed}
                    />
                </Col>
                <Col md={3} lg={2}>
                    <CardBlock 
                        title='Recovered' 
                        value1={NewRecovered}
                        value2={TotalDeaths}
                        isValue1ColorGreen={true}
                    />
                </Col>
                <Col md={3} lg={2}>
                    <CardBlock 
                        title='Deaths' 
                        value1={NewDeaths}
                        value2={TotalRecovered}
                    />
                </Col>
                <Col sm={3} lg={6}>
                    <div className={styles.liveCasesByCountryTitle}>Live Cases By Country</div>

                    {countries.map(
                        ({Country, TotalConfirmed}: Country, index: number) => 
                            <LivesCasesByCountry Country={Country} TotalConfirmed={TotalConfirmed} key={index} rowNumber={index} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;