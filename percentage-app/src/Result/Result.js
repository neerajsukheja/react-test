import React, { Component } from 'react';

class Result extends Component {
    state = {
        showResultTab: false,
    }

    toggleResultTabHandler = () => {
        const showResultTab = this.state.showResultTab;
        this.setState({
            showResultTab: !showResultTab
        });
    }
    render(props) {
        let buttonText = 'Show Result Tab';
        let result = false;
        if (this.state.showResultTab) {
            buttonText = 'Hide Result Tab';
            const filterResult = this.props.scores.filter((scores) => scores.subjectName !== '');
            result = (
                <div>
                    {filterResult.map((subjects, index) => {
                        return (
                            <p key={index}>You have Scored {subjects.score} in {subjects.subjectName}</p>
                        );
                    })}
                </div>
            );
        }
        return (
            <div className="Result">
                <button onClick={this.toggleResultTabHandler}>{buttonText}</button>
                {result}
            </div>
        );
    }
}

export default Result;