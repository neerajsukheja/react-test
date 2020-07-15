import React from 'react';

const errorBoundaryParagraph = () => {
    const random = Math.random();
    if(random > 0.7){
        throw new Error('Something Went Wrong, Please try again');
    }
    return (
        <div className='ErrorBoundaryParagraph'>
            <p>Error Boundary Paragraph</p>
        </div>
    );
}

export default errorBoundaryParagraph;