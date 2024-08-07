  
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import navbar from "./components/Layout/navbar"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

class SellingPage extends Component {
  render() {
    return (
    
      <BrowserRouter>
            <div className="SellingPage">          
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Selling games.com</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Sell games</Nav.Link>
                    <Nav.Link href="#link">Discussion</Nav.Link>      
                    <Nav.Link href="#link">another page</Nav.Link>
                    
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Log in</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Register</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>

        test
          <Switch>

            </Switch>
      </div>
      </BrowserRouter>
    );
  }
}
export default SellingPage;