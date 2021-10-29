export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
}

export const checkValidity = ( value, rules ) => {
    
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    return isValid;
}

export const getPageNumber = (page) => {

    if(typeof page != 'number'){
        if(page === '«') page = 1;
        else if(page === '‹') page = this.props.pagination.currentPage - 1;
        else if(page === '›') page = this.props.pagination.currentPage + 1;
        else if(page === '»') page = this.props.pagination.totalPages;
    }
    return page;
}