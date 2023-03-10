import React, {useState,useEffect} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom'
import {Form , Button,Row,Col} from 'react-bootstrap'
import { useDispatch , useSelector } from "react-redux";
import { login } from "../userredux/useraction";

 //import log from '../page/login.css'
 import Message from "../components/Message";
 import Loader from "../components/Loader";
 import { Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const Login = () => {
    const [email , setEmail]=useState('')
    const [password , setPassword] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading , error } = userLogin

    const submitHandler=(e)=>{
        e.preventDefault()
        //Dispatch LOGIN
        dispatch(login(email, password))

    }
 
  return (
    <>      
        <br /> 
        <FormContainer>
      <center>  <h1 className="sign">Sign In</h1> </center>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="Password">
                <Form.Label>
                    Password
                </Form.Label>               
                <Form.Control type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" >Sign In</Button>

            <Row className="py-3">
                <Col>
                        New Customer?{''} <Link to={redirect ? `register?redirect=${redirect}`:'/register'}  >Register</Link>
                </Col>
            </Row>
        </Form>
        </FormContainer>
    </>
  )
}

export default Login