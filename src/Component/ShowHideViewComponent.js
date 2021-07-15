import React from "react"
import 'semantic-ui-css/semantic.min.css'
import {
  Header,
  Segment,
  Divider
} from 'semantic-ui-react'

const ShowHideViewComponent = (props) =>{
    return(
        <div>
            <Segment>
            <Header as='h3' floated='left'>
                <p>{props.dataPost.judul}</p>
            </Header>
            <Divider clearing />
                <p>{props.dataPost.isi}</p>
            </Segment>
            
        </div>
    )
}

export default ShowHideViewComponent;