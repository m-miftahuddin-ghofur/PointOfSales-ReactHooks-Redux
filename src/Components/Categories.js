import React, {  useEffect, useState } from 'react';
import Axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//modal
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';

import AddCategory from '../Components/AddCategory';


const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      width:100,
      
    },
  });


function Categories(props){
    const [dataCategory, setDataCategory] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    const [alert, setAlert] = useState(false);
    const [edit, setEdit] = useState(false);

    
    function getCategory() {
        Axios.get( `http://localhost:5000/category`)
        // .then(response  =>  console.log(response))
        .then(response  => setDataCategory( response.data.result))
    }

    function deleteCategory() {
        Axios.delete(`http://localhost:5000/category/${selectedRow.id}`)
        .then(response => {
            getCategory()
            handleAlertClose()
        })
    }

    function editCategory(){
        Axios.put(`http://localhost:5000/category/${selectedRow.id}`,selectedRow)
        .then(response => {
            handleEditClose()
            getCategory()
        })
    }

    const handleAlertOpen =(row)=> {
        setAlert(true)
        setSelectedRow(row)
    }

    const handleAlertClose = () => {
        setAlert(false)
    }

    const handleEditOpen=(row) => {
        setSelectedRow(row)
        setEdit(true)
    }

    const handleEditClose = () => {
            setEdit(false)
    }

    const inputChange = (e) => {
        let newDataPost = selectedRow;
        newDataPost["category"] = e.target.value;
        setSelectedRow(newDataPost)
    }

    const handleAddSuccess=(cat)=> {
        const categories = dataCategory.splice(0)
        categories.push(cat)
        setDataCategory(categories)
    }

    useEffect(()=> {
        getCategory()
    },[])
    
    // componentDidMount(){
    //     this.dataCategory();
    // }

        const {classes} = props;

        return (
            <Paper className={classes.root}>
                <AddCategory onAddSuccess={handleAddSuccess} />
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nomor</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Update</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataCategory.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                           <TableCell align="center">{item.category}</TableCell>
                           <TableCell align="center">
                               <Button onClick={ () => handleEditOpen(item)}>
                                    Edit
                               </Button>
                           </TableCell>
                           <TableCell align="center">
                               <Button onClick={ () => handleAlertOpen(item)}>
                                    Delete
                               </Button>
                           </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>

                    {/* modal delete */}
                    <Dialog open={alert} onClose={handleAlertClose}>
                        <DialogTitle><b>Are You Sure Delete This Category ?</b></DialogTitle>    
                        <DialogActions>
                        <Button onClick={handleAlertClose} variant="contained" color="primary" >
                            No
                        </Button>
                        <Button onClick={deleteCategory} variant="contained" color="secondary" >
                            Yess
                        </Button>
                        </DialogActions>
                    </Dialog>    
                    {/* end modal delete*/}
                    
                    {/* modal edit */}
                    <Dialog open={edit} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="categoryName"
                                label="Category"
                                type="text"
                                fullWidth
                                name="category"
                                defaultValue={selectedRow.category}
                                // onChange={ e => this.setState({category : e.target.value})}
                                onChange={inputChange} 
                                
                            />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleEditClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={editCategory} color="primary">
                            Edit
                        </Button>
                        </DialogActions>
                    </Dialog>

                </Table>
            </Paper>
        )
    
}

export default withStyles(styles)(Categories);