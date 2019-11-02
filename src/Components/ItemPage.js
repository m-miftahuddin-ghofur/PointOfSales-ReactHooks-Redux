import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


//item
import ListProduct from '../Components/ListProducts';

import { connect } from "react-redux";
import { getProducts } from "../Public/Redux/Actions/Products";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    direction: "row",
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
  prod: {
      maxWidth: 200,
      direction: "row", 
      justify:"right",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const ItemsPage = (props) => {
    // const [products, setProducts] = useState({name:'', discription:'',image: '', category_id:'', price:'',quantity:''})
    // const [input, setInput] = useState({sort : ''})
  const [params, setParams] = useState({sortby:'', order:'', name: ''})
     

  const handleChange = name => e => {
    setParams({ ...params, [name]: e.target.value });
};
    useEffect(()=> {
      props.dispatch(getProducts())
      // console.log(getProducts(params));
      
    },[])

    useEffect(()=> {
      // console.log(getProducts(params));
      props.dispatch(getProducts(params))
      
    },[params])
  
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Grid>
          <Paper className={classes.paper} >
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel  id="demo-simple-select-outlined-label">
                Sort By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="sortby"
                  value={params.sortby}
                  onChange={handleChange('sortby')}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'name'}>Name</MenuItem>
                  <MenuItem value={'category'}>Category</MenuItem>
                  <MenuItem value={'updated'}>Date Update</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel  id="demo-simple-select-outlined-label">
                Order
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="order"
                  value={params.order}
                  onChange={handleChange('order')}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'acending'}>Ascending</MenuItem>
                  <MenuItem value={'descending'}>Descending</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel  id="demo-simple-select-outlined-label">
                
                </InputLabel>
                
                  <TextField
                    id="outlined-name"
                    label="Search"
                    value={params.name}
                    onChange={handleChange('name')}
                    variant="outlined"
                    
                  />
                
              </FormControl>
            </Paper>
          </Grid>
          <Paper className={classes.paper} >
          <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                  {props.dataProducts.map(value => ( 
                    <Grid key={value} item xs={12} md={6} lg={3}  >
                      <ListProduct name={value.name} image={value.image} discription={value.discription} category={value.category} price={value.price}/>
                    </Grid>
                  ))}
                 </Grid>
               </Grid>
             </Grid>
          </Paper>
        </Grid>
        {/* order */}
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}> <h3>Cart</h3>
            <img src="https://image.flaticon.com/icons/png/512/102/102661.png" height="300" />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  dataProducts : state.product.productList
})

export default (withStyles(useStyles)(connect(mapStateToProps)(ItemsPage)));

