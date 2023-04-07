import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function PriceCard(props) {
    const { title, price } = props;
    return (<Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            ${price}
        </Card.Text>
      </Card.Body>
   </Card>);
  }

class Cards extends React.Component {
    render() {
        return (
            <Row>
                <Col md={4}>
                    <PriceCard title="Current Price" price={this.props.currentPrice} />
                </Col>
                <Col md={4}>
                <PriceCard title="Predicted Minimum Price" price={this.props.predictedMin} />
                </Col>
                <Col md={4}>
                <PriceCard title="Predicted Maximum Price" price={this.props.predictedMax} />
                </Col>
            </Row>
        )
    }
}

export default Cards