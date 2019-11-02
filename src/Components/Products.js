import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AddProduct from "./AddProduct";
import Axios from 'axios';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


import { useSelector , useDispatch } from "react-redux";
import { getProducts, updateProducts , deleteProduct} from "../Public/Redux/Actions/Products";
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});


function Products(props) {
  const dataProducts = useSelector(state=>state.product.productList);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [products, setProducts] = useState({name:'', discription:'',image: '', category_id:'', price:'',quantity:''});
  const [selectedRow, setSelectedRow] = useState({});
  const [alert, setAlert] = useState(false);
  const [open,setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  

  const getCategory=()=>{
    Axios.get('http://localhost:5000/category')
    // .then(response=> console.log(response))
    .then(response=> setCategory(response.data.result))
  }

  const updateAProducts= (e) => {
    e.preventDefault();
    handleClose();
    dispatch(updateProducts(selectedRow))
    .then(response => {
        setProducts(dataProducts)
        }
      )
    .catch (error => console.log (error));
  }

  function deleteAProduct() {
    dispatch(deleteProduct(selectedRow))
    .then(response => {
        handleAlertClose()
    })
  }

    const handleClickOpen = (row) => {
      setOpen(true)
      setSelectedRow(row)
    };

    const handleClose = () => {
      setOpen(false)

    };
    const handleChange = name => e => {
      setSelectedRow({ ...selectedRow, [name]: e.target.value });
    };
    
    const handleAlertOpen =(row)=> {
        setAlert(true)
        setSelectedRow(row)
    }

    const handleAlertClose = () => {
        setAlert(false)
    }


    useEffect(()=> {
      dispatch(getProducts())
      getCategory()
    },[])


  return (
    <Paper className={classes.root}>
      <h3>Products</h3>
        {/* <AddProduct onAddProductSuccess={handleAddProductSuccess(products)}/> */}
        <AddProduct />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>       
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Discripton</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataProducts.map((item ,index )=> (
            <TableRow key={item.name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">{item.discription}</TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="center">
                  <Button onClick={ () => handleClickOpen(item)}>
                      <EditIcon />
                  </Button>
                  {/* <Button onClick={ () => handleAlertOpen(item)}> */}
                  <Button onClick={ () => handleAlertOpen(item)}>
                      <DeleteIcon style={{color:red}} />
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* modal Delete */}
        <Dialog open={alert} onClose={handleAlertClose}>
            <DialogTitle><b>Are You Sure Delete This product? ?</b></DialogTitle>    
            <DialogActions>
            <Button onClick={handleAlertClose}  color="primary" >
                No
            </Button>
            <Button  onClick={deleteAProduct} color="secondary" >
                Yess
            </Button>
            </DialogActions>
        </Dialog>
          {/* end Modal Delete  */}
          {/* Modal Update  */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Product</DialogTitle>
            <DialogContent>
              <TextField 
                onChange={handleChange('name')}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                defaultValue={selectedRow.name}
              />
              <TextField
                onChange={handleChange('discription')}
                autoFocus
                margin="dense"
                id="discription"
                label="Discription"
                type="text"
                fullWidth
                defaultValue={selectedRow.discription}
              />
              <TextField
                onChange={ handleChange('image')}
                autoFocus
                margin="dense"
                id="image"
                label="Image"
                type="text"
                fullWidth
                defaultValue={selectedRow.image}
              />
              <FormControl >
                <InputLabel htmlFor="demo-controlled-open-select">Category</InputLabel>
                  <Select
                    defaultValue={category.category_id}
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
                defaultValue={selectedRow.price}
              />
              <TextField
                onChange={handleChange('quantity')}
                autoFocus
                margin="dense"
                id="quantity"
                label="Quantity"
                type="number"
                fullWidth
                defaultValue={selectedRow.quantity}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary"
                onClick={updateAProducts} 
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
          {/* end Modal Update  */}
      </Table>
    </Paper>
  );
}

// const mapStateToProps = state => ({
//     dataProducts : state.product.productList
// })


export default (
    withStyles(useStyles)(Products)
)