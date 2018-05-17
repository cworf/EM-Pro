import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {compose} from 'recompose'
import withData from '../Session/withData'
import { TableCell, TableRow } from 'material-ui/Table';
import './InventoryOrdersRow.css'
import Moment from 'moment'
import {extendMoment} from 'moment-range'

const moment = extendMoment(Moment);

function relativeToNow(order) {
  const orderRange = moment.range(order.start, order.end)
  if (orderRange.contains(moment())) {
    return 'now'
  } else if (moment() < moment(order.start)) {
    return 'future'
  } else {
    return 'past'
  }
}

const InventoryOrdersRow = ({
  dataStore: {dynamicDocs},
  order: {data, data: {start, end, qty}},
  event_ref, onRowClick
}) => {

  const eventDoc = dynamicDocs.get(event_ref)
  if (!eventDoc) return null
  return (
    <TableRow className={`clickable-row row-${relativeToNow(data)}`} onClick={onRowClick.bind(null,eventDoc)}>
      <TableCell>
        {moment(start).format("MMMM Do YYYY - dddd")}
      </TableCell>
      <TableCell>
        {moment(end).format("MMMM Do YYYY - dddd")}
      </TableCell>
      <TableCell>
        {eventDoc.data.title}
      </TableCell>
      <TableCell>
        {qty}
      </TableCell>

    </TableRow>
  );
}

InventoryOrdersRow.propTypes = {
  event_ref: PropTypes.string.isRequired,
  order: PropTypes.any.isRequired
}

export default compose(
  withData(({event_ref}) => [event_ref]),
  inject('dataStore'),
  observer,
)(InventoryOrdersRow);
