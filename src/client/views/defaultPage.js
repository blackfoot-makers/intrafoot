import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link, IndexLink } from 'react-router';

import SubscribeComponent from '../SubscribeComponent';

class DefaultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Projets</h2>
          </div>
          <div className="mdl-card__supporting-text">
            <table className="mdl-data-table mdl-js-data-table">
              <thead>
                <tr>
                  <th className="mdl-data-table__cell--non-numeric">Type</th>
                  <th>Hors taxes</th>
                  <th>TVA</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mdl-data-table__cell--non-numeric">Acceptés</td>
                  <td>189800</td>
                  <td>37960</td>
                  <td>227760</td>
                </tr>
                <tr>
                  <td className="mdl-data-table__cell--non-numeric">Signés</td>
                  <td>189800</td>
                  <td>37960</td>
                  <td>227760</td>
                </tr>
                <tr>
                  <td className="mdl-data-table__cell--non-numeric">Stand by</td>
                  <td>189800</td>
                  <td>37960</td>
                  <td>227760</td>
                </tr>
                <tr>
                  <td className="mdl-data-table__cell--non-numeric">Terminé</td>
                  <td>189800</td>
                  <td>37960</td>
                  <td>227760</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <IndexLink className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Voir les projets
            </IndexLink>
          </div>
          <div className="mdl-card__menu">
            <span className="mdl-badge" data-badge="4" />
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Factures</h2>
          </div>
          <div className="mdl-card__supporting-text">
              Résumé des factures
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <IndexLink className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Voir les factures
            </IndexLink>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Devis</h2>
          </div>
          <div className="mdl-card__supporting-text">
              Résumé des devis
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <IndexLink className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Voir les devis
            </IndexLink>
          </div>
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Contacts</h2>
          </div>
          <div className="mdl-card__supporting-text">
            Résumé des contacts
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <IndexLink className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Voir les contacts
            </IndexLink>
          </div>
        </div>
      </div>
    );
  }
}

DefaultPage.propTypes = {
  currentUser: PropTypes.object,
};

DefaultPage.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

function mapStateToProps() {
  return {
    currentUser: Meteor.user(),
  };
}

export default connect(mapStateToProps)(SubscribeComponent(DefaultPage));
