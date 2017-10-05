import React, {Component} from "react";
import PropTypes from "prop-types";

import MenuItem from "material-ui/MenuItem";
import {withRouter} from "react-router";

export class MenuItemLinkComponent extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired,
    onTouchTap: PropTypes.func,
  };

  handleMenuTap = () => {
    const {history, onTouchTap} = this.props;
    history.push(this.props.to);
    if (onTouchTap) onTouchTap();
  };
  render() {
    const {history, match, location, staticContext, ...props} = this.props; // eslint-disable-line

    return <MenuItem {...props} onTouchTap={this.handleMenuTap} />;
  }
}

export default withRouter(MenuItemLinkComponent);
