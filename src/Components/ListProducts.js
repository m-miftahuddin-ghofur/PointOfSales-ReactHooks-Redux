import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Grid } from '@material-ui/core';


// export default function ListProduct() {
class ListProduct extends React.Component { 
    constructor (props){
      super(props);
      this.state = {
        data : []
    };
    };
    
    render() {
      const classes = makeStyles({
        card: {
          maxWidth: 100,
          maxHeight: 200,
        },
        prod: {
          maxWidth: 50,
          direction: "row", 
          // justify:"space-around",
        }
      });

      // console.log(this.props.name);
      
  return (
    <div className={classes.prod}>
      <Grid 
      direction="row" 
      alignItems="flex-start"
      justify="space-around">
      <Grid >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={this.props.name}
                height="140"
                image={this.props.image}
                title={this.props.name}
              /> 
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {/* {this.props.category} */}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Buy
              </Button>
              <Button size="small" color="primary">
                Rp. {this.props.price}
              </Button>
            </CardActions>
          </Card>
        </Grid> 
    {/* end map */}
    </Grid>
    </div>
  );
    }
}

export default ListProduct;