import React from "react";
import {
  Container,
  Row,
  Col,
  CardTitle,
  Card,
  CardText,
  CardBody,
} from "reactstrap";
import { useQuery, gql } from "@apollo/client";
import styles from "./Home.module.scss";
import {
  Country,
  CardBlockProps,
  LivesCasesByCountryRowProps,
  LiveCasesByCountryProps,
} from "./Home.type";
import numeral from "numeral";
import { cloneDeep } from "lodash";
import TotalConfirmedGraph from './TotalConfirmedGraph';
import moment from 'moment';

const GET_SUMMARY = gql`
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

const GET_DAY_ONE_TOTAL_BY_UNITED_STATES =gql`
    query getDayOneTotalByUnitedStates {
        getDayOneTotalByCountry(country: "united-states") {
            Country
            Date
            Cases
        }
    }
`;

/**
 * if value === 0, just return 0
 * if value >= 1000, replace 1000 with 'K'
 * add ',' separator
 */
const getDisplayNumber = (value: number): string => {
  if (value === 0) {
    return "0";
  }
  return value >= 1000
    ? numeral(value / 1000).format("+0,0.0") + "K"
    : numeral(value).format("+0,0.0");
};

const CardBlock = ({
  title,
  value1,
  value2,
  isValue1ColorGreen = false,
}: CardBlockProps) => {
  return (
    <Card className={styles.card}>
      <CardTitle className={styles.card__title}>{title}</CardTitle>
      <CardText
        className={
          isValue1ColorGreen ? styles.card__textGreen : styles.card__textRed
        }
      >
        {getDisplayNumber(value1)}
      </CardText>
      <CardText className={styles.card__totalText}>
        {getDisplayNumber(value2)} total
      </CardText>
    </Card>
  );
};

const LivesCasesByCountryRow = ({
  Country,
  TotalConfirmed,
  rowNumber,
}: LivesCasesByCountryRowProps) => {
  return (
    <div
      className={
        rowNumber % 2 === 0
          ? styles.liveCasesByCountry__row__Odd
          : styles.liveCasesByCountry__row__Even
      }
    >
      <span>{Country}</span>
      <span>{numeral(TotalConfirmed).format("0,0")}</span>
    </div>
  );
};

const LiveCaseByCountry = ({
  countries,
  limit = 12,
}: LiveCasesByCountryProps) => {
  return (
    <Card className={styles.liveCasesByCountry__card}>
      <CardBody>
        <div className={styles.liveCasesByCountry__title}>
          Live Cases By Country
        </div>
        {countries
          .slice(0, limit)
          .map(({ Country, TotalConfirmed }: Country, index: number) => (
            <LivesCasesByCountryRow
              key={index}
              Country={Country}
              TotalConfirmed={TotalConfirmed}
              rowNumber={index}
            />
          ))}
      </CardBody>
    </Card>
  );
};

const Home = () => {
  const { loading: loadingGetSummary, error: errorGetSummary, data: dataGetSummary } = useQuery(GET_SUMMARY);
  const { loading: loadingDayOneUS, error: errorDayOneUS, data: dataDayOneUS} = useQuery(GET_DAY_ONE_TOTAL_BY_UNITED_STATES);
  if (loadingGetSummary || loadingDayOneUS) {
    return <p>Loading...</p>;
  }
  if (errorGetSummary || errorDayOneUS) {
    return <p>Error!!!</p>;
  }

  const { Global, Countries = [] } = dataGetSummary && dataGetSummary.summary;
  const {
    NewConfirmed,
    TotalConfirmed,
    NewDeaths,
    TotalDeaths,
    NewRecovered,
    TotalRecovered,
  } = Global;

  const countries: Country[] = cloneDeep(Countries).sort(
    (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed
  );
  const totalConfirmedGraphData = dataDayOneUS.getDayOneTotalByCountry;
  return (
    <Container>
      <Row>
        <Col md={6} lg={6}>
          <Row>
            <Col md={9} l={6} className={styles.title}>
              Covid19 Tracker
            </Col>
          </Row>
          <Row>
            <Col md={4} lg={4}>
              <CardBlock
                title="Corona Virus Cases"
                value1={NewConfirmed}
                value2={TotalConfirmed}
              />
            </Col>
            <Col md={4} lg={4}>
              <CardBlock
                title="Recovered"
                value1={NewRecovered}
                value2={TotalDeaths}
                isValue1ColorGreen={true}
              />
            </Col>
            <Col md={4} lg={4}>
              <CardBlock
                title="Deaths"
                value1={NewDeaths}
                value2={TotalRecovered}
              />
            </Col>
          </Row>
          <Row className={styles.totalConfirmedGraph}>
            <Col md={12} lg={12}>
              <TotalConfirmedGraph data={totalConfirmedGraphData} />
            </Col>
          </Row>
        </Col>
        <Col md={6} lg={6}>
          <LiveCaseByCountry countries={countries} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
