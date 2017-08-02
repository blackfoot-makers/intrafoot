import React from 'react';
import { object } from 'prop-types';
import { Footer, Grid, Button } from 'react-mdl';
import { browserHistory } from 'react-router';

const AppFooter = ({ location }) => {
  const pathname = location && location.pathname;

  switch (pathname) {
    case '/project':
      return (
        <Footer size="mini">
          <Grid>
            <Button
              raised
              colored
              ripple
              onClick={() => {
                browserHistory.push('/project/add');
                return false;
              }}
            >
              Ajouter
            </Button>
          </Grid>
        </Footer>
      );
    default:
      return <div />;
  }
};

AppFooter.propTypes = {
  location: object
};

export default AppFooter;
