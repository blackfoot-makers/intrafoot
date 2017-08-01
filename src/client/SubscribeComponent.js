import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { bind } from "decko";

export default ComposedComponent =>
  class extends Component {
    constructor() {
      super();
      this.subs = {};
    }

    @bind
    subscribe(name, ...args) {
      if (this.subs[name]) {
        this.subs[name].stop();
      }
      console.log("subscriboing stuff == ", name, ...args);
      this.subs[name] = Meteor.subscribe(name, ...args);
    }

    @bind
    subscriptionReady(name) {
      if (this.subs[name]) {
        return this.subs[name].ready();
      }
      console.log("subscriptionReady is ", name);
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
