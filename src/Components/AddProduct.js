import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Axios from 'axios';
import {postProducts} from '../Public/Redux/Actions/Products'
import { connect } from "react-redux";


 function AddProduct(props) {
    const [products, setProducts] = useState({name:'', discription:'',image: '', category_id:'', price:'',quantity:''});
    const [open,setOpen] = useState(false);
    const [category, setCategory] = useState([]);

    const getCategory=()=>{
      Axios.get('http://localhost:5000/category')
      // .then(response=> console.log(response))
      .then(response=> setCategory(response.data.result))
    }

    const postAProducts= async (e) => {
      e.preventDefault();
      handleClose();
      await props.dispatch(postProducts(products))
      .then(response => {
          console.log(products)
          // props.onAddProductSuccess(products)
          }
        )
      .catch (error => console.log (error));
    }

    const handleClickOpen = () => {
      setOpen(true)
    };
  
    const handleClose = () => {
      setOpen(false)
    };

    // const handleChangeCategory=(e)=>{
    //   setProducts({category_id:e.target.value})
    // }
    const handleChange = name => e => {
      setProducts({ ...products, [name]: e.target.value });
  };
  
    
    useEffect ( () => {
      getCategory()

    },[])
   
  
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
        <DialogContent>
          <TextField 
            onChange={handleChange('name')}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={products.name}
          />
          <TextField
            onChange={handleChange('discription')}
            autoFocus
            margin="dense"
            id="discription"
            label="Discription"
            type="text"
            fullWidth
            value={products.discription}
          />
          <TextField
            onChange={ handleChange('image')}
            autoFocus
            margin="dense"
            id="image"
            label="Image"
            type="text"
            fullWidth
            value={products.image}
          />
          <FormControl >
            <InputLabel htmlFor="demo-controlled-open-select">Category</InputLabel>
              <Select
                // open={false}
                // onClose={this.handleClosed}
                // onOpen={this.handleOpen}
                value={category.category_id}
                onChange={handleChange('category_id')}
                // name="category_id"
                id="category_id"
              > 
              
              {category.map((item,index) => (
                <MenuItem key={index} value={item.id} > {item.category} </MenuItem>
              ))}
              </Select>
            </FormControl>
          <TextField
            onChange={handleChange('price')}
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={products.price}
          />
          <TextField
            onChange={handleChange('quantity')}
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={products.quantity}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary"
            onClick={postAProducts} 
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    products: state.product.productList
  };
};

export default (connect(mapStateToProps)(AddProduct));
// export default AddProduct;
