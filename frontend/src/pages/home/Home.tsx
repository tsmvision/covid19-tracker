import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useQuery, gql } from '@apollo/client';

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
        }
    }
`;

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
    const { 
        NewConfirmed, 
        TotalConfirmed, 
        NewDeaths, 
        TotalDeaths, 
        NewRecovered, 
        TotalRecovered } = data && data.summary && data.summary.Global;
    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        New Confirmed: { NewConfirmed }
                    </div>
                    <div>
                        Total Confirmed: { TotalConfirmed }
                    </div>
                    <div>
                        Total Confirmed: { NewDeaths}
                    </div>
                    <div>
                        Total Confirmed: { TotalDeaths }
                    </div>
                    <div>
                        Total Confirmed: { NewRecovered }
                    </div>
                    <div>
                        Total Confirmed: { TotalRecovered }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;