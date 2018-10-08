import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import {
  SectionHeading,
  Button,
  Typography,
  OverviewIcon,
  DrugsIcon,
  MouseIcon,
  PathwaysIcon,
  ExpressionIcon,
} from 'ot-ui';

import BasePage from './BasePage';
import LocusLink from '../components/LocusLink';
import AssociatedStudiesTable from '../components/AssociatedStudiesTable';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

const SEARCH_QUERY = gql`
  query GenePageQuery($geneId: String!) {
    search(queryString: $geneId) {
      genes {
        id
        symbol
        chromosome
        start
        end
        bioType
      }
    }
    studiesForGene(geneId: $geneId) {
      study {
        studyId
        traitReported
        pubAuthor
        pubDate
        pmid
        nInitial
        nReplication
        nCases
      }
    }
  }
`;

function hasGeneData(data, geneId) {
  return (
    data &&
    data.search &&
    data.search.genes &&
    data.search.genes.length === 1 &&
    data.search.genes[0].id === geneId
  );
}

function geneData(data) {
  return data.search.genes[0];
}

function hasAssociatedStudies(data) {
  return data && data.studiesForGene;
}

const styles = () => {
  return {
    card: {
      height: '100%',
    },
    link: {
      textDecoration: 'none',
    },
  };
};

const GenePage = ({ match, classes }) => {
  const { geneId } = match.params;
  return (
    <BasePage>
      <Query query={SEARCH_QUERY} variables={{ geneId }}>
        {({ loading, error, data }) => {
          const isValidGene = hasGeneData(data, geneId);
          const gene = isValidGene ? geneData(data) : {};
          const associatedStudies =
            isValidGene && hasAssociatedStudies(data)
              ? data.studiesForGene.map(d => d.study)
              : [];

          const { chromosome, start, end, symbol } = gene;
          return (
            <React.Fragment>
              <Helmet>
                <title>{symbol}</title>
              </Helmet>
              <Grid container style={{ marginBottom: '10px' }}>
                <Grid item md={12}>
                  <Card>
                    <CardContent>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography variant="display1">{symbol}</Typography>
                        </Grid>
                        {isValidGene ? (
                          <Grid item>
                            <LocusLink
                              chromosome={chromosome}
                              position={Math.round((start + end) / 2)}
                              selectedGenes={[geneId]}
                            >
                              View associated variants and traits within Locus
                              View plot
                            </LocusLink>
                          </Grid>
                        ) : null}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container justify="space-between" spacing={8}>
                <Grid item md={8}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography>
                        Information about {symbol} from the Open Targets
                        Platform
                      </Typography>
                      <Grid container>
                        <Grid item>
                          <OverviewIcon />
                          <Typography>Target profile overview</Typography>
                        </Grid>
                        <Grid item>
                          <DrugsIcon />
                          <Typography>Is there known drug data</Typography>
                        </Grid>
                        <Grid item>
                          <MouseIcon />
                          <Typography>
                            Is there mouse phenotype data?
                          </Typography>
                        </Grid>
                        <Grid item>
                          <PathwaysIcon />
                          <Typography>Is there pathway data?</Typography>
                        </Grid>
                        <Grid item>
                          <ExpressionIcon />
                          <Typography>Is there expression data?</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md="4">
                  <Card className={classes.card}>
                    <CardContent>
                      <Grid container>
                        <Grid item>
                          <Typography>Other links</Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={8}>
                        <Grid item>
                          <a
                            className={classes.link}
                            href={`https://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${geneId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outlined">Ensembl</Button>
                          </a>
                        </Grid>
                        <Grid item>
                          <a
                            className={classes.link}
                            href={`https://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${geneId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outlined">ExAC</Button>
                          </a>
                        </Grid>
                        <Grid item>
                          <a
                            className={classes.link}
                            href={`https://www.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=${geneId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outlined">Gene Cards</Button>
                          </a>
                        </Grid>
                        <Grid item>
                          <a
                            className={classes.link}
                            href={`https://gtexportal.org/home/eqtls/byGene?geneId=${symbol}&tissueName=All`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outlined">GTEx</Button>
                          </a>
                        </Grid>
                        <Grid item>
                          <a
                            className={classes.link}
                            href={`https://gtexportal.org/home/eqtls/byGene?geneId=${symbol}&tissueName=All`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outlined">HGNC</Button>
                          </a>
                        </Grid>
                        <Grid item>
                          <a
                            className={classes.link}
                            href={`https://gtexportal.org/home/eqtls/byGene?geneId=${symbol}&tissueName=All`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outlined">UniProt</Button>
                          </a>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <SectionHeading
                heading={`Associated studies`}
                subheading={`Which studies are associated with ${symbol}?`}
                entities={[
                  {
                    type: 'study',
                    fixed: false,
                  },
                  {
                    type: 'gene',
                    fixed: true,
                  },
                ]}
              />
              <AssociatedStudiesTable
                loading={loading}
                error={error}
                data={associatedStudies}
                geneId={geneId}
                chromosome={chromosome}
                position={Math.round((start + end) / 2)}
              />
            </React.Fragment>
          );
        }}
      </Query>
    </BasePage>
  );
};

export default withStyles(styles)(GenePage);
