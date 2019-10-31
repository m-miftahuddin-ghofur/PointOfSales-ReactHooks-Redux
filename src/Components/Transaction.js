import React, {Component} from 'react';
import '../App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



class Cart extends Component {
 
    render() {
        const classes = makeStyles(theme => ({
            root: {
              flexGrow: 1,
            },
            paper: {
              height: 900,
              width: 100,
            },
            control: {
              padding: theme.spacing(2),
            },
            card: {
              maxWidth: 345,
            },
            media: {
              height: 140,
            },
          }));
        
          const [spacing, setSpacing] = React.useState(2);
        return (
            <div >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
        )
    }
}

export default Cart;