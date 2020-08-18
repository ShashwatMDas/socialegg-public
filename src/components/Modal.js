import React, { useState, useEffect } from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';    
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { black } from '@material-ui/core/colors';
import AWS from 'aws-sdk';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { useAlert } from 'react-alert';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader';


var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

// Credentials removed

  AWS.config.update({
    region: config.region,
    endpoint: config.dynamodbEndpoint,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
  });

const ModalBox = ({ open, CloseModal }) => {
    const alert = useAlert()

    const [active, setActive] = useState(false);
    const classes = useStyles();

    const [loginform, setLoginform] = useState('none');
    const [regform, setRegform] = useState('none');

    const [values, setValues] = useState({
        loginemail: '',
        loginpassword: '',
        showPassword: false,
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const ShowLoginForm = () => {
        setLoginform('block');
        setRegform('none');
    }

    const ShowRegForm = () => {
        setRegform('block');
        setLoginform('none');
    }

    const LoginForm = {
        "email": values.loginemail,
        "password": values.loginpassword
    }


    const RegForm = {
        "email": values.email,
        "password": values.password,
        "confPassword": values.confirmPassword,
    }
    const history = useHistory();
    const onLogin = () => {
        setActive(true);
        var authenticationData = {
            username: LoginForm.email,
            Password: LoginForm.password,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationData
        );
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
	Username: LoginForm.email,
	Pool: userPool,
};
var str1 = 'Welcome ';
var str = str1.concat(LoginForm.email);
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
	onSuccess: function(result) {
		var accessToken = result.getAccessToken().getJwtToken();
        // sessionStorage.setItem("token", accessToken);
        // console.log((accessToken));
		//POTENTIAL: Region needs to be set if not already set previously elsewhere.
		AWS.config.region = 'ap-south-1';

		// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		// 	IdentityPoolId: 'ap-south-1_c7BW8CdCB', // your identity pool id here
		// 	Logins: {
		// 		// Change the key below according to the specific region your user pool is in.
		// 		'cognito-idp.ap-south-1.amazonaws.com/ap-south-1_c7BW8CdCB': result
		// 			.getIdToken()
		// 			.getJwtToken(),
		// 	},
		// });
        // console.log(accessToken);
		//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
		AWS.config.credentials.refresh(error => {
			if (error) {
				alert.show(error);
			} else {
				// Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();
                document.cookie = "email=".concat(LoginForm.email);
                alert.show(str);
                window.location.reload();
                history.push("/infinity");
			}
		});
        setActive(false);
        CloseModal();
	},

	onFailure: function(err) {
		alert.show(err.message || JSON.stringify(err));
        setActive(false);
	},
});
    }
    const onReg = () => {
        setActive(true);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var attributeList = [];

var dataEmail = {
	Name: 'email',
	Value: RegForm.email,
};
var dataPhoneNumber = {
	Name: 'phone_number',
	Value: RegForm.mobile,
};

var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
	dataPhoneNumber
);

attributeList.push(attributeEmail);
attributeList.push(attributePhoneNumber);

userPool.signUp(RegForm.email, RegForm.password, attributeList, null, function(
	err,
	result
) {
   const event = {
        request: {
            "userAttributes": {
                "email": RegForm.email,
            },
            "validationData": {
                "Name": "email",
                "Value": RegForm.password
            },
        },
    }
    	if (err) {
		alert.show(err.message || JSON.stringify(err));
        setActive(false);
        return;
	}
    // var cognitoUser = result.user;
    else{
        var params2 = {
            TableName: 'socialegg',
            Item: {
                "email":RegForm.email,
                "topics": {}
            },
        }
        console.log(params2);
        let docClient3 = new AWS.DynamoDB.DocumentClient();
        docClient3.put(params2, function(err, data) {
           if (err) {
               console.log(err);
               alert.show("There's problem with our servers, please try later");
           } else {
            window.alert('A link has been sent to verify your email. Verify your email for logging in');
            setActive(false);
            CloseModal();
           }
        });
    }
    // return;
});
    }



    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    
    return (
        <div>
        <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={CloseModal}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <p>
                        Do you want to Login or Register?
                      </p>
                      <center>
                      <ButtonGroup variant="contained" color="#ffffff"  aria-label="contained primary button group">
                            <Button style={{backgroundColor: '#ffffff', color: 'black'}} onClick={ShowLoginForm} >Login</Button>
                            <Button style={{backgroundColor: '#ffffff', color: 'black'}} onClick={ShowRegForm}>Register</Button>
                      </ButtonGroup>
                      </center>
                      <LoadingOverlay
                            active={active}
                            spinner
                            // text='Loading your content...'
                            style={{}}
                            >
                      <form className={classes.login} noValidate autoComplete="off" style={{display: loginform}}>
                        <h3>Login</h3>
                        <div>
                            <TextField
                            id = "outlined"
                            label="Email-ID"
                            value={values.loginemail}
                            onChange={handleChange('loginemail')}
                            style={{color: 'black !important'}}
                            />
                        </div>
                        <div>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.loginpassword}
                                    variant = "outlined"
                                    onChange={handleChange('loginpassword')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                        <div>
                        <Button variant="contained" style={{background:'#0065A4',color:'#e3e3e3'}} onClick={onLogin}>
                            Login
                        </Button>
                        </div>
                      </form>
                      <form className={classes.login} noValidate autoComplete="off" style={{display: regform}}>
                        <h3>Register</h3>
                        <div>
                            <TextField
                            id = "outlined"
                            label="Email"
                            value={values.email}
                            onChange={handleChange('email')}
                            style={{color: 'black !important'}}
                            />
                            <FormHelperText id="component-error-text" style={{color: '#a02a2a', letterSpacing: 1.5}}>{((validEmailRegex.test(values.email)) || values.email.length == 0) ? '' : 'Not a valid email'}</FormHelperText>
                        </div>
                        <div>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type='password'
                                    value={values.password}
                                    variant = "outlined"
                                    onChange={handleChange('password')}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    error={(values.password == values.confirmPassword) ? true : true}
                                    type='password'
                                    value={values.confirmPassword}
                                    variant = "outlined"
                                    helperText={(values.password == values.confirmPassword) ? '' : "Passwords don't match"}
                                    onChange={handleChange('confirmPassword')}
                                />
                                <FormHelperText id="component-error-text" style={{color: '#a02a2a', letterSpacing: 1.5}}>{((values.password == values.confirmPassword) || values.confirmPassword.length == 0) ? '' : "Passwords don't match"}</FormHelperText>
                            </FormControl>
                        </div>
                        <div>
                        <Button variant="contained" style={{background:'#0065A4',color:'#e3e3e3'}} onClick={onReg}>
                            Register
                        </Button>
                        </div>
                      
                </form>
                </LoadingOverlay>

                    </div>
                  </Fade>
                </Modal>
                
            </div>
    );
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    paper: {
        backgroundColor: '#2665a4',
        // border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: 'auto'
    },
    login: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        color: 'black',
        borderColor: 'black'
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
        color: 'black',
    },
}));

export default ModalBox;