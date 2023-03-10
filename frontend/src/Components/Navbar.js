import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LinkContainer from 'react-bootstrap/NavLink'
import '../components/Navbar.css'
import { useDispatch , useSelector } from 'react-redux';
import { Logout } from '../userredux/useraction';

function Navbarr() {
    const dispatch = useDispatch()
    const userLogin =useSelector(state =>state.userLogin)
    const {userInfo} =userLogin
    const logoutHandler = () => {
        dispatch(Logout())
    }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand id='carthage' href="#home">Carthage Cares</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Shop</Nav.Link>
            <NavDropdown title="Courses" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">WEB DEVELOPMENT</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                CYBER SECURITY
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">ALGORITHMES</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className='about'>
            <Nav.Link href="#deets">About Us</Nav.Link>
            {userInfo?(
                    <NavDropdown title={userInfo.lastName + " " + userInfo.firstName} id="username">
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                    </NavDropdown>
            ): 
            <LinkContainer to='/login'>
            <Nav.Link eventKey={2} href="#memes">
             Sign in
            </Nav.Link>
            </LinkContainer>}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;