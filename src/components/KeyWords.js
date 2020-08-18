import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InfoIcon from '@material-ui/icons/Info';

const KeyWords = ({ HandleChange, keywords }) => {

        // const [keywords, setKeywords] = useState('')
        const [isShown, setIsShown] = useState(false);
        return(
            <div className = 'mainpage'>
                <br />
                <br />
                <p> 
                    1. Mention the topic you'd like to subscribe to<hr id='line' style={{width:'250px', opacity:0.2}}></hr>
                </p>
                <TextField 
                    id = "outlined-basic"
                    label = "Keywords"
                    variant = "outlined"
                    value={keywords}
                    onChange={(e => HandleChange(e))} 
                /><InfoIcon style={{marginTop:31,marginLeft:5}}  onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
              ></InfoIcon>
              {isShown && (
                <div style={{fontSize:15}}>
                    <br />
                 Seperate Key words using", "(comma and a space).<br />Prepend words or phrases that must appear with a + symbol.<br />Prepend words that must not appear with a - symbol.
                 <br />Eg. +chelsea, football, +willian, -liverpool
                 <br />Eg. funding, -layoffs, +tech
                </div>
              )}
            </div>
        )
}
export default KeyWords;