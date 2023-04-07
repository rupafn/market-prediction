import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Plot from 'react-plotly.js';
class Analysis extends React.Component{
    render() {
        return (
            <Row>
                <Col className="d-flex justify-content-center" md={12}>
                    <Plot
                    data = {this.props.data}
                    layout={this.props.layout}
                    />
                </Col>
                
             </Row>
                
        )
    }
}

export default Analysis