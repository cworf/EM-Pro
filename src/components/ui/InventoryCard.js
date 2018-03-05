import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import {observer} from 'mobx-react';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

function InventoryCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="headline" component="h2">
            {props.item.manufacturer} {props.item.series} {props.item.model}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant='raised' color="primary">
            Details
          </Button>
          <Button size="small" color="primary">
            +1
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

InventoryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(InventoryCard);
