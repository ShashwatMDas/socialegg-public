import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InfoIcon from '@material-ui/icons/Info';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Frequency = ({ HandleChange, frequency }) => {

    const classes = useStyles();

    // const [freq, setFreq] = useState('');

    const SelectOptions = [];

    for(var i = 3; i < 25; i=i+3){
        SelectOptions.push(<MenuItem value={i}>{i}</MenuItem>)
    }
    const [isShown, setIsShown] = useState(false);
    // render(){
        return(
            <div className = 'mainpage'>
                <p> 
                    3. Choose the Frequency at which you'd like to receive the news (in hours)<hr id='line' style={{width:'250px', opacity:0.2}}></hr>
                </p>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={frequency}
                    onChange={(e) => HandleChange(e)}
                    >
                    {SelectOptions}
                    </Select>
                    
                </FormControl>
                <InfoIcon style={{marginTop:31,marginLeft:5}}  onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
              ></InfoIcon>
              {isShown && (
                <div style={{fontSize:15}}>
                 Suppose you select 12 hours, that would mean you get a mail every 12 hours<br />
                 <stong>containing articles only in the last 12 hour time-span</stong>
                 <br />on the topics you choose from the sources you trust.
                </div>
              )}
            </div>
        )
    
}
export default Frequency;