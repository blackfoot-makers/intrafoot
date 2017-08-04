import { Meteor } from 'meteor/meteor';
import React, { PureComponent } from 'react';

export default ComposedComponent =>
  class extends PureComponent {
    constructor() {
      super();
      this.subs = {};
      // Can't use decko here: does not works
      this.subscribe = this.subscribe.bind(this);
      this.subscriptionReady = this.subscriptionReady.bind(this);
    }

    subscribe(name, ...args) {
      if (this.subs[name]) {
        this.subs[name].stop();
      }
      // console.log('subscriboing stuff == ', name, ...args);
      this.subs[name] = Meteor.subscribe(name, ...args);
    }

    subscriptionReady(name) {
      if (this.subs[name]) {
        return this.subs[name].ready();
      }
      // console.log('subscriptionReady is ', name);
      return false;
    }

    componentWillUnmount() {
      Object.keys(this.subs).map(key => this.subs[key].stop());
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          subscribe={this.subscribe}
          subscriptionReady={this.subscriptionReady}
        />
      );
    }
  };
