import React from 'react';
import { object, func, shape } from 'prop-types';
import { Footer, Grid, Button } from 'react-mdl';

const AppFooter = ({ location, history }) => {
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
                history.push('/project/add');
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
  location: object,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

export default AppFooter;
