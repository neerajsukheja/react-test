import React, { Component } from 'react';

class UserInput extends Component {
    render(props) {
        const style = {
            'backgroundColor': 'blue',
            'color': 'white',
        }
        return (
            <div className='UserInput'>
                <input style={style} type='text' value={this.props.data} onChange={this.props.change} />
            </div>
        );
    }
}

export default UserInput;