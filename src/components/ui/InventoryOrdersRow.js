import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {compose} from 'recompose'
import withData from '../Session/withData'
import { TableCell, TableRow } from 'material-ui/Table';
import './InventoryOrdersRow.css'



const InventoryOrdersRow = ({
  dataStore: {dynamicDocs},
  order: {data: {start, end, qty}},
  event_ref, onRowClick
}) => {

  const eventDoc = dynamicDocs.get(event_ref)
  if (!eventDoc) return null
  return (
    <TableRow className='clickable-row' onClick={onRowClick.bind(null,eventDoc)}>
      <TableCell>
        {start}
      </TableCell>
      <TableCell>
        {end}
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
