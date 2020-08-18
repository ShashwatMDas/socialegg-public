import React, { useState, useEffect } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    style={{ height: 600 }}
    {...props}
  />
));



const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);





const Media = () => {

    const [newssrc, setNewssrc] = useState({});

    useEffect(() => {
      axios.get(
        "https://newsapi.org/v2/sources?apiKey=8238274e2c804ba7846c193f425ee6d3",
      ).then(res => {
        // console.log(res.data.sources);
        setSources(res.data.sources);
      }).catch(err => {
        console.log(err);
      })
    }, [])

    const [anchorEl, setAnchorEl] = useState(null);
    const [sources, setSources] = useState([]);
    

    const obj = {};



    const listitems = [];

    let temp1, temp2;

    const HandleCheck = (e) => {
        setNewssrc({ ...newssrc, [e.target.value]: e.target.checked });
        // console.log(newssrc);
    }

    sources.forEach(source => {
      temp1 = source.id;
      obj[temp1] = false;
      listitems.push(<FormControlLabel onChange={HandleCheck}  control={<StyledMenuItem key={source.id}><Checkbox checked={newssrc[temp1] || false} value={source.id} name={source}  /><ListItemText primary={source.name} /></StyledMenuItem>}/>);
    });
    var i = 0;
    const handleClick = event => {
      setAnchorEl(event.currentTarget);

      if(i == 0){
      setNewssrc(obj);
      i++;
      }
      
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // console.log(obj);
    

    // render(){
        return(
            <div className = 'mainpage'>
                <p> 
                    2. Choose your favorite news source(s)<hr id='line' style={{width:'250px', opacity:0.2}}></hr>
                    <TextField 
                    id = "outlined-basic"
                    label = "Media"
                    variant = "outlined"
                />
                    <IconButton
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                        edge="start"
                        
                        color="inherit"
                        aria-label="open drawer"
                        style={ { marginLeft : 0, flex: 0 } }
                    >
                        <ArrowDropDownCircleIcon />
                    </IconButton>
                    <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <FormControl>
                      <FormGroup>
                        {listitems}
                      </FormGroup>
                    </FormControl>
                    </StyledMenu>
                </p>
            </div>
        )
}
export default Media;