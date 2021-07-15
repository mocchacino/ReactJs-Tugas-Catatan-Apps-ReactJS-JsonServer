import React from "react"
import 'semantic-ui-css/semantic.min.css'
import {
  Grid,
  Header,
  Image,
  Segment
} from 'semantic-ui-react'

const HeaderLeft = () =>{
    return(
        <div>
            <Segment floated='left' color='grey' inverted>
                <Image src='https://asset-niomic.s3-ap-southeast-1.amazonaws.com/logo-niomic-black-.png' size='small' verticalAlign='middle'/>
            
            </Segment>
        </div>
    )
}

export default HeaderLeft;