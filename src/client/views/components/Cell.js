import React from 'react';
import { number, string, node, any } from 'prop-types';
import {
  Cell,
  Card,
  CardTitle,
  CardText,
  CardActions,
  CardMenu,
  Badge,
  Button,
  Icon
} from 'react-mdl';

const CustomCell = ({
  colSize,
  title,
  children,
  actionComponent,
  actionText,
  notification
}) =>
  <Cell col={colSize} component={Card} shadow={0}>
    <CardTitle>
      {title}
    </CardTitle>
    <CardText>
      {children}
    </CardText>
    <CardActions border>
      <Button colored ripple component={actionComponent}>
        {actionText}
      </Button>
    </CardActions>
    {notification !== '0' &&
      <CardMenu>
        <Badge text={notification} overlap>
          <Icon name="notifications" />
        </Badge>
      </CardMenu>}
  </Cell>;

CustomCell.defaultProps = {
  colSize: 6,
  notification: '0'
};

CustomCell.propTypes = {
  colSize: number,
  title: string.isRequired,
  children: node.isRequired,
  actionComponent: any.isRequired,
  actionText: string.isRequired,
  notification: string
};

export default CustomCell;
