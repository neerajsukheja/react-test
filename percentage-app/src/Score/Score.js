import React, { Component } from 'react';

class Score extends Component {
    render(props) {
        return (
            <div className="Score">
                <input
                    name="subject-name"
                    type="text"
                    value={this.props.name}
                    onChange={this.props.nameChange}
                />
                <input
                    name="score"
                    type="text"
                    value={this.props.score}
                    onChange={this.props.scoreChange}
                />
                <button onClick={this.props.deleteSubject}>Delete</button>
            </div>
        );
    }
}

export default Score;