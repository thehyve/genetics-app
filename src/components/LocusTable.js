import React from 'react';
import { Link } from 'react-router-dom';
import { OtTable } from 'ot-ui';

import { pvalThreshold } from '../constants';

export const tableColumns = [
  {
    id: 'studyId',
    label: 'Study ID',
    renderCell: rowData => (
      <Link to={`/study/${rowData.studyId}`}>{rowData.studyId}</Link>
    ),
  },
  {
    id: 'traitReported',
    label: 'Trait',
    renderCell: rowData => rowData.study.traitReported,
  },
  {
    id: 'indexVariantId',
    label: 'Lead Variant',
    renderCell: rowData => (
      <Link to={`/variant/${rowData.indexVariantId}`}>
        {rowData.indexVariantId}
      </Link>
    ),
  },
  {
    id: 'tagVariantId',
    label: 'Tag Variant',
    renderCell: rowData => (
      <Link to={`/variant/${rowData.tagVariantId}`}>
        {rowData.tagVariantId}
      </Link>
    ),
  },
  {
    id: 'geneId',
    label: 'Gene',
    tooltip: 'Gene functionally implicated by the tag variant',
    renderCell: rowData => (
      <Link to={`/gene/${rowData.geneId}`}>{rowData.gene.symbol}</Link>
    ),
  },
  {
    id: 'pval',
    label: 'Lead Variant P-value',
    renderCell: rowData =>
      rowData.pval < pvalThreshold
        ? `<${pvalThreshold}`
        : rowData.pval.toPrecision(3),
  },
  {
    id: 'method',
    label: 'Expansion',
    renderCell: rowData =>
      rowData.posteriorProbability ? 'Finemapping' : 'LD Expansion',
  },
  {
    id: 'r2',
    label: 'LD (r²)',
    tooltip: 'Linkage disequilibrium between lead and tag variants',
    renderCell: rowData =>
      rowData.r2 ? rowData.r2.toPrecision(3) : 'No information',
  },
  {
    id: 'posteriorProbability',
    label: 'Posterior Probability',
    tooltip:
      'Posterior probability from finemapping that this tag variant is causal',
    renderCell: rowData =>
      rowData.posteriorProbability !== null
        ? rowData.posteriorProbability.toPrecision(3)
        : '',
  },
  {
    id: 'overallScore',
    label: 'Overall G2V',
    renderCell: rowData =>
      rowData.overallScore
        ? rowData.overallScore.toPrecision(3)
        : 'No information',
  },
];

function LocusTable({ loading, error, data, filenameStem }) {
  return (
    <OtTable
      loading={loading}
      error={error}
      columns={tableColumns}
      data={data}
      sortBy="pval"
      order="asc"
      downloadFileStem={filenameStem}
    />
  );
}

export default LocusTable;
