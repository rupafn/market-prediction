import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
class Filter extends React.Component{
    render() {
        return (
            <Row className="justify-content-md-center">
                <Col xs lg="2" className="custom-width-filter text-center">
                <Button className='filter-btn' onClick={this.props.filterDays.bind(this,1)}>1D</Button>
                </Col>
                <Col xs lg="2" className="custom-width-filter text-center">
                <Button className='filter-btn' onClick={this.props.filterDays.bind(this,7)}>7D</Button>
                </Col>
                <Col xs lg="2" className="custom-width-filter text-center">
                <Button className='filter-btn' onClick={this.props.filterDays.bind(this,14)}>14D</Button>
                </Col>
                <Col xs lg="2" className="custom-width-filter text-center">
                <Button className='filter-btn' onClick={this.props.filterDays.bind(this,30)}>30D</Button>
                </Col>
            </Row>
        )
    }
}

export default Filter