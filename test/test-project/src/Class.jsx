import React from 'react'

class Class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }

        setInterval(() => this.setState({count: this.state.count + 1}), 1000);
    }

    render() {

        return (
            <>
                <h1>This is a test</h1>
                <p>{this.props.text}</p>
                <p>{this.state.count}</p>
            </>
        )
    }

}
export default Class