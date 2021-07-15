import React from "react"
import 'semantic-ui-css/semantic.min.css'
import {
  Header,
  Icon
} from 'semantic-ui-react'

const HeaderTitle = () =>{
    return(
        <div>
            <Header as='h2' icon textAlign='center'>
            <Icon name='sticky note' circular />
            <Header.Content>Aplikasi Catatan</Header.Content>
            </Header>
        </div>
    )
}

export default HeaderTitle;