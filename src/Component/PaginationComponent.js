import 'semantic-ui-css/semantic.min.css';
import { Divider, Grid, Pagination, Segment } from 'semantic-ui-react';
import { useState } from 'react';

const PaginationComponent = props =>{
    // PAGINATION
    // const setPageNum = (e, { activePage }) => {
    //     setPage(activePage)
    // }
    // const itemsPerPage = 3;
    const totalPages = Math.ceil((Object.keys(props.dataApi).length)/props.itemsPerPage);
    
    // const items  = props.dataApi.slice(
    // (page - 1) * itemsPerPage,
    // (page - 1) * itemsPerPage + itemsPerPage
    // );
    
    return (
        <div>
            <Segment textAlign='center'>
                <Grid.Row>
                    <Grid.Column mobile={5} tablet={5} computer={5} >
                    <Pagination 
                        activePage={props.page} 
                        totalPages={totalPages} 
                        onPageChange={props.onPageChange}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                    />
                    </Grid.Column>
                </Grid.Row>
            </Segment>
        </div>
    )
}

export default PaginationComponent;