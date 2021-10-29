import React from 'react';
import Pagination from 'react-bootstrap/lib/Pagination';

const pagination = (props) => {

    let items = null;
    let pagination = null;
    if(props.pagination){

        items = [];
        let totalPages = props.pagination.totalPages;        
        let active = props.pagination.currentPage;

        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item active={number === active} key={number} onClick={props.changed}>{number}</Pagination.Item>
            );
        }

        pagination = (
            <Pagination>
                <Pagination.First onClick={props.changed} disabled={active === 1}/>
                <Pagination.Prev onClick={props.changed} disabled={active === 1}/>
                {items}
                <Pagination.Next onClick={props.changed} disabled={active === totalPages} />
                <Pagination.Last onClick={props.changed} disabled={active === totalPages}/>
            </Pagination>
        );
    }    

    return(
        <div className="text-center">
            {pagination}
        </div>        
    )
}

export default pagination;