import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';


const Email = ({ HandleChange, emailid }) => {

        // const [email, setEmail] = useState('');
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


        return ( 
            <div className = 'mainpage'>
            <p>
            4. Enter your Email - ID 
            <hr id = 'line' style = {{ width: '250px', opacity: 0.2 }} />  
            </p>
            <TextField 
                style={styles.wrapper}
                id = "outlined-basic"
                label = "Email"
                variant = "outlined"
                error={((validEmailRegex.test(emailid)) || emailid.length == 0) ? false : true}
                helperText={((validEmailRegex.test(emailid)) || emailid.length == 0) ? " " : "Invalid Email"}
                value={emailid}
                onChange={(e => HandleChange(e))}
            ></TextField>
            </div>
        )
}
const styles= {
    wrapper: {
      color: '#e3e3e3',
      borderColor : '#e3e3e3',
    },
  };
export default Email;