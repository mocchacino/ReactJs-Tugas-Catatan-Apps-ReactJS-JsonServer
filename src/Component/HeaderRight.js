import React from "react"
import 'semantic-ui-css/semantic.min.css'
import {
  Grid,
  Header,
  Image,
  Segment
} from 'semantic-ui-react'

const HeaderRight = () =>{
    return(
        <div>
            <Segment floated='right' color='grey' inverted textAlign='center'>
                <Header as='h5' floated='right' >
                    <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' size='big' verticalAlign='middle' /> 
                    <span>Wiladhianty</span>
                </Header>
                </Segment>
                
            

    
        </div>
    )
}

export default HeaderRight;