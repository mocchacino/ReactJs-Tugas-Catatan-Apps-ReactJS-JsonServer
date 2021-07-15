import React from "react"
import 'semantic-ui-css/semantic.min.css'
import {
  Table,
  Button
} from 'semantic-ui-react'

const ShowTable = (props) =>{
    return(
        
            <Table.Row key={props.catatan.id}>
                <Table.Cell textAlign='center'>
                    {props.catatan.date}
                </Table.Cell>
                <Table.Cell>{props.catatan.judul}</Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button value={props.catatan.id} onClick={props.hideComponent} color='green'>View</Button>
                    <Button value={props.catatan.id} onClick={props.getDataId} color='blue'>Edit</Button>
                    <Button value={props.catatan.id} onClick={props.handleRemove} color='red'>Delete</Button>
                </Table.Cell>
            </Table.Row>
        
    )
}

export default ShowTable;