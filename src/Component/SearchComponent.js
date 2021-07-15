import React, {useState, useEffect} from "react";
import 'semantic-ui-css/semantic.min.css'
import {
    Segment,
    Input,
    Grid
} from 'semantic-ui-react'

const SearchComponent = (props) =>{
    return(
            <Segment.Group>
                <Input 
                    fluid
                    value={props.value}
                    onChange={props.onChange}
                    placeholder='Cari Judul'
                    icon='search'
                    iconPosition='left'
                />
            </Segment.Group>
    )
}

export default SearchComponent