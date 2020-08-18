import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const Submit = ({ onclick }) => {
    
    // render(){
        const HandleCaptcha = () => {
            axios.post(
                "https://kvay6yvnsh.execute-api.ap-south-1.amazonaws.com/default/recaptcha",{
                    "key1": "6LeDneQUAAAAAL9yp3IlNKE72B0b3sODs8v7c_q-",
                    "body": this.GoogleToken,
                    headers: { 
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                      },
                },
            ).then(response => {
                // console.log(response);
            }).catch(err => {
                // console.log(err);
                // console.log(this.GoogleToken);
            })
        }
        if(document.cookie!='email='){
        return(
            <div className = 'mainpage'>
                <br />

                <Button variant="contained" style={{background:'#0065A4',color:'#e3e3e3'}} onClick={onclick}>
                    submit &nbsp; &rarr;
                </Button>
            </div>
        )
        }
        else{
            return(
            <div className = 'mainpage'>
            <br />

            <Button variant="contained" style={{background:'#0065A4',color:'#e3e3e3', cursor:'not-allowed'}}>
                Please Login For Submitting&nbsp;
            </Button>
        </div>
            )
        }
    // }
}
export default Submit;