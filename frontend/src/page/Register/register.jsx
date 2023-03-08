import React, {useState,useEffect} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom'
import {Form , Button,Row,Col,Message} from 'react-bootstrap'
import { useDispatch , useSelector } from "react-redux";
import { register } from "../../userredux/useraction";
const Register = () => {
    const [firstName , setFirstName]=useState('')
    const [lastName , setLastName]=useState('')
    const [cin , setCin]=useState('')
    const [phone , setPhone]=useState('')
    const [dateOfBirth , setDateOfBirth]=useState('')
    const [imageUrl , setImageUrl]=useState('')

    const [email , setEmail]=useState('')
    const [confirmPassword , setConfirmPassword] = useState('')

    const [password , setPassword] = useState('')
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading , error , userInfo} = userRegister

    const submitHandler=(e)=>{
        e.preventDefault()
        //Dispatch LOGIN
        dispatch(register(firstName,email, password))

       
    }
 
  return (
    <>
        <h1>Sign In</h1>
        {error && <div variant="danger">{error}</div>}
        
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="firstName">
                <Form.Label>
firstname                </Form.Label>
                <Form.Control type="text" placeholder="Email" value={firstName} onChange={(e)=> setFirstName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>
firstname                </Form.Label>
                <Form.Control type="text" placeholder="Email" value={lastName} onChange={(e)=> setLastName(e.target.value)}>
                </Form.Control>
            </Form.Group>
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

            <Form.Group controlId="cin">
                <Form.Label>
                Cin                </Form.Label>               
                <Form.Control type="text" 
                placeholder="Cin" 
                value={cin} 
                onChange={(e)=> setCin(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="phone">
                <Form.Label>
                dateOfBirth
                </Form.Label>               
                <Form.Control type="text" 
                placeholder="                dateOfBirth
                " 
                value={phone} 
                onChange={(e)=> setPhone(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
                <Form.Label>
                dateOfBirth
                                </Form.Label>               
                <Form.Control type="date" 
                placeholder="                dateOfBirth
                " 
                value={dateOfBirth} 
                onChange={(e)=> setDateOfBirth(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="imageUrl">
                <Form.Label>
                imageUrl
                </Form.Label>               
                <Form.Control type="text" 
                placeholder="imageUrl" 
                value={imageUrl} 
                onChange={(e)=> setImageUrl(e.target.value)}>
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

export default Register