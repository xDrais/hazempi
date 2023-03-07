import React, {useState,useEffect} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom'
import {Form , Button,Row,Col,Message} from 'react-bootstrap'
import { useDispatch , useSelector } from "react-redux";
import { login } from "../userredux/useraction";
const Login = () => {
    const [email , setEmail]=useState('')
    const [password , setPassword] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading , error , userInfo} = userLogin

    const submitHandler=(e)=>{
        e.preventDefault()
        //Dispatch LOGIN
        dispatch(login(email, password))

       
    }
 
  return (
    <>
        <h1>Sign In</h1>
        {error && <div variant="danger">{error}</div>}
        
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
                    Email Address
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

    </>
  )
}

export default Login