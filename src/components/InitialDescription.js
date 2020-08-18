import React from 'react';
import Grid from '@material-ui/core/Grid';
import news from '../images/news.jpg'

class InitialDescription extends React.Component{
    render(){
        return(
            <div>
                    <br />
                    <p>
                    
                        Follow these simple steps to begin your subscription<br /><br />
                    </p>
            </div>
        )
    }
}

const styles = {
    desc: {
        paddingTop: 150,
        paddingRight: 100,
    }
}

export default InitialDescription;