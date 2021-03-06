import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { OtUiThemeProvider } from 'ot-ui';

import HomePage from './pages/HomePage';
import StudyPage from './pages/StudyPage';
import StudiesPage from './pages/StudiesPage';
import GenePage from './pages/GenePage';
import VariantPage from './pages/VariantPage';
import LocusPage from './pages/LocusPage';
import StudyLocusPage from './pages/StudyLocusPage';
import ImmunobasePage from './pages/ImmunobasePage';

const App = () => (
  <OtUiThemeProvider>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={HomePage} />
        <Route path="/study/:studyId" component={StudyPage} />
        <Route path="/study-comparison/:studyId" component={StudiesPage} />
        <Route path="/gene/:geneId" component={GenePage} />
        <Route path="/variant/:variantId" component={VariantPage} />
        <Route path="/locus" component={LocusPage} />
        <Route
          path="/study-locus/:studyId/:indexVariantId"
          component={StudyLocusPage}
        />
        <Route path="/immunobase" component={ImmunobasePage} />
      </React.Fragment>
    </Router>
  </OtUiThemeProvider>
);

export default App;
