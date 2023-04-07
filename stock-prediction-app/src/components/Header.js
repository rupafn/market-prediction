import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
class Header extends React.Component {
    render() {
        return (
            <Row>
                <Col md={2}>
            
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown-select' id="dropdown-basic">
                            <span className='header-font'>{this.props.stock_name}</span>
                             <ArrowDropDownCircleIcon className='header-icon'/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item onClick={this.props.selectStock.bind(this,'TSLA')}  href="#/BTC-USD">TSLA</Dropdown.Item>
                        <Dropdown.Item onClick={this.props.selectStock.bind(this,'AMZN')} href="#/AMZN">AMZN</Dropdown.Item>
                        <Dropdown.Item onClick={this.props.selectStock.bind(this,'ETH-USD')} href="#/ETH-USD">ETH-USD</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Col>
                <Col md={{span:2, offset:8}}><Button className="refresh-btn">Refresh data</Button></Col>
            </Row>
        )
    }

}

export default Header