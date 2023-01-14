import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false, 
            error: null,
            errorInfo: null
        }
    }

    static getDerivedStateFromError(error){
        console.log(error)
        return {hasError: true}
    }

    componentDidCatch(error, info){
        console.log(error, info);
        this.setState({
            hasError: true,
            error, 
            errorInfo: info
        });
    }

    render(){
        if(this.state.hasError){
            return <div>{this.props.errorComponent}</div>
        }
        return this.props.children
    }
}

export default ErrorBoundary;