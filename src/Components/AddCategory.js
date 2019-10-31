import React, {  useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';

function AddCategory(props){
  const [category, setCategory] = useState('');
  const [open,setOpen] = useState(false);

  const postCategory = () => {
    // console.log('sebelum'+category)
      Axios.post(`http://localhost:5000/category`, {category})
      .then(response => {
          console.log(response)
          props.onAddSuccess(response.data.result)
          handleClose()
        })
  }

  const inputChange = e => {
    setCategory(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Category
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            onChange={inputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={postCategory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default AddCategory;