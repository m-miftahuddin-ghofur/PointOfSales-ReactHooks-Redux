import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import Axios from 'axios';

import {Link as Links, Redirect } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.instagram.com/natachicken/">
        Nata Chicken
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const classes = makeStyles(theme => ({

 
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// export default function SignIn() {
class Login extends React.Component {
  // const classes = useStyles();
  state = {
    isLogin : false,
  }

  componentDidMount (){
    if(localStorage.getItem('token')!= null) {
      this.setState({isLogin:true})
    }else{
      this.setState({isLogin:false})
    }
  }

render() {
  
  if(this.state.isLogin){
    return <Redirect to="/dashboard" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RestaurantMenuIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Nata Chicken
        </Typography>
        <form className={classes.form} noValidate
        onSubmit={ e => {
          e.preventDefault();
          Axios.post ('http://localhost:5000/user/login', this.state)
          .then (response=> {
              if(response.data.status==200){
                localStorage.setItem('token',response.data.result.token)
                this.setState({isLogin:true})
              }
          })
          .catch (error => console.log (error));
      }}
        >
          <TextField
            onChange={ e => this.setState({username : e.target.value})}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={ e => this.setState({password : e.target.value})}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
    
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // component={ Links } to='/dashboard' 
          >
            Sign In
          </Button>
          <Grid container>
           
            <Grid item>
              <Links to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Links>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
}

export default Login;