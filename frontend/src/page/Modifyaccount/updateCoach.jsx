import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import video from "../../Components/HeroSection/pottery2.mp4";
import "../../Components/HeroSection/HeroSection.css";
import "../Register/register.css"
import { faBuilding,faChalkboardUser} from '@fortawesome/free-solid-svg-icons';

import UploadfFile from "../UploadfFile";

import SpecialButton from "../../Components/Button/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Message from "../../Components/Message";
 import Loader from "../../Components/Loader";
 import { Alert } from "react-bootstrap";
 import FormContainer from "../../Components/FormContainer";
 import {
  ArrowWrapperLeft,
  ArrowWrapperRight,
} from "../../Components/Arrows/Arrows";
import {update} from "../../userredux/useraction"
const UpdateCoach = () => {

  const [step, setStep] = useState(1);

    const [firstName , setFirstName]=useState('')
    const [lastName , setLastName] = useState('')
    const [phone , setPhone]=useState('')
    const [email , setEmail]=useState('')
    const [imageUrl , setImageUrl] = useState('')
    const [password , setPassword]=useState('')
  
    const [speciality , setSpeciality]=useState('')
    const [descriptionCoach , setDescriptionCoach]=useState('')
    const [dateDebutExperience , setDateDebutExperience]=useState('')
    const [dateFinExperience , setDateFinExperience]=useState('')
    const [titrePoste , setTitrePoste]=useState('')
    const [dateOfBirth , setDateOfBirth]=useState('')


    const [file, setFile] = useState("");
    const [fil, setFi] = useState(file);


    const userLogin =useSelector(state =>state.userLogin)
    const {userInfo} =userLogin

      //validateurs simple user
      const [validFirstName, setValidFirstName] = useState(false);
      const [validLastName, setValidLastName] = useState(false);
      const [validCin, setValidCin] = useState(false);
      const [validPhone, setValidPhone] = useState(false);
      const [validDateOfBirth, setValidDateOfBirth] = useState(false);
      const [validImageUrl, setValidImageUrl] = useState(false);
      const [validEmail, setValidEmail] = useState(false);
      const [validPassword, setValidPassword] = useState(false);
  const [validSpeciality, setvalidSpeciality] = useState(false);
  const [validDateDebutExperience, setValidDateDebutExperience] = useState(false);
  const [validDateFinExperience, setValidDateFinExperience] = useState(false);
  const [validTitrePoste, setvalidTitrePoste] = useState(false);



    // Clear the input field when the user interacts with it

    function handleInputFocus(e) {
        e.target.value = "";
      }


    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error } = userRegister;

    const dispatch = useDispatch();

      //hedhi bch taamelek el redirection
  const navigate = useNavigate();

  const messageSuccess = "";




    const submitHandler=async(e)=>{
      e.preventDefault();

       // dispatch(update(firstName,lastName,phone,email,imageUrl,password,dateOfBirth))




       let result = await fetch(`http://localhost:5000/api/user/updateCoach/${userInfo._id}`,{
        method:"put",
        body:JSON.stringify({firstName,lastName,phone,email,imageUrl,password,dateOfBirth,speciality,descriptionCoach,dateDebutExperience,dateFinExperience,titrePoste,file}),
        headers:{
            "Content-type":"application/json"
        }
       
    })


    result = await result.json();
    console.warn(result)


    }




    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PHONE_REGEX = /^[2-9][0-9]{7}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const DATE_REGEX =/^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
    const IMAGE_REGEX = /\.(png|jpe?g)$/i;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



{/* use effects taa controle de saisie */}

  useEffect(() => {
    const result = USER_REGEX.test(firstName);

    setValidFirstName(result);
  }, [firstName]);

  useEffect(() => {
    const result = USER_REGEX.test(lastName);

    setValidLastName(result);
  }, [lastName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);

    setValidEmail(result);
  }, [email]);


  
  useEffect(() => {
    const result = PWD_REGEX.test(password);

    setValidPassword(result);
  }, [password]);




  useEffect(() => {
    const result = PHONE_REGEX.test(phone);

    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    const result = IMAGE_REGEX.test(imageUrl.name);

    setValidImageUrl(result);
  }, [imageUrl]);
  useEffect(() => {
    if (dateOfBirth) {
      const inputDate = new Date(dateOfBirth);
      const today = new Date();
      const diffInMilliseconds = today.getTime() - inputDate.getTime();
      const age = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));
      if (age >= 18) {
        setValidDateOfBirth(true);
      } else {
        setValidDateOfBirth(false);
      }
    }
  }, [dateOfBirth]);


 //Fonction Onclick taa el previous step
 const handlePrevStep = () => {
  if (step === 2) {
    setStep(1);
  } 
  else setStep((prevStep) => prevStep - 1);
}
//Fonction Onclick taa el next step

const handleNextStep = () => {
  if (step === 1) {
    setStep(2);
  } 
   else setStep((prevStep) => prevStep + 1);
};

  



  return (
    <>   
      {/* el video taa el background */}
      <div className="hero-container">
        <video src={video} autoPlay loop muted />
        {/* el message taa el controle de saisie w el loader   */}
       
        <section className="marginTops">
          {error && <div className="alert">{error}</div>}
          {messageSuccess && <div className="alertgreen">{messageSuccess}</div>}

          {loading && <Loader />}
        </section>
        {/* form start    */}
        <form
          className="register"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <div
            align="center"
            style={{ marginBottom: "20px", marginTop: "-20px" }}
          >
          
          </div>
          {/* les boutons mtaa previous w next */}

          <ArrowWrapperLeft
            onClick={handlePrevStep}
            disabled={step === 1}
            visibility={step === 2 ? "hidden" : "visible"}
          />
          <ArrowWrapperRight
            onClick={handleNextStep}
           
            visibility={step === 2 ? "hidden" : "visible"}
          />

          {/* step lowla mtaa el form eli fiha el info taa simple user */}
          {step === 1 && (
            <>
             
            <h1>Sign In</h1>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              ></input>

              <p
                id="notefirstname"
                className={firstName && !validFirstName ? "none" : "hide"}
              >
                First Name is at least 3 letters and cannot contain special
                characters or numbers
              </p>
              <input
                id="lastName"
                required
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
              <p
                id="notelastname"
                className={lastName && !validLastName ? "none" : "hide"}
              >
                Last Name is at least 3 letters and cannot contain special
                characters or numbers
              </p>
              <input
                id="email"
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <p
                id="noteemail"
                className={email && !validEmail ? "none" : "hide"}
              >
                Enter a valid e-mail adress{" "}
              </p>

              <input
                id="password"
                type={"text" }
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>


            
              <p
                id="notepwd"
                className={password && !validPassword ? "none" : "hide"}
              >
                Password needs to contain at least 1 UpperCase letter , 1
                LowerCase letter, 1 Number and at least 8{" "}
              </p>

             

              <input
                id="phone"
                type="phone"
                placeholder="phone number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
              <p
                id="noteephone"
                className={phone && !validPhone ? "none" : "hide"}
              >
                Phone contains 8 digits{" "}
              </p>
              {dateOfBirth ? (
                <input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  required
                  onFocus={handleInputFocus}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                />
              ) : (
                <input
                  id="dateOfBirth"
                  type="text"
                  required
                  value=""
                  placeholder="Date of Birth"
                  onFocus={handleInputFocus}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                />
              )}

              <p
                id="noteedate"
                className={dateOfBirth && !validDateOfBirth ? "none" : "hide"}
              >
                You need to be at least 18 years old{" "}
              </p>
              <input
                id="imageUrl"
                type="file"
                name="imageUrl"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setImageUrl(e.target.files[0])}
              ></input>

              <p
                id="noteimag"
                className={imageUrl && !validImageUrl ? "none" : "hide"}
              >
                Enter Valid image type : png , jpg or jpeg{" "}
              </p>
             
            </>
          )}

      

     
          {/* step 4 mtaa be9i el form for Coach */}

          {step === 2 && (
            <> 

                                <FontAwesomeIcon className="fontcenter" icon={faChalkboardUser} size="3x" />

              <input
                id="speciality"
                type="text"
                placeholder="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              ></input>

              <input
                id="descriptionCoach"
                type="text"
                placeholder="Description Coach"
                value={descriptionCoach}
                onChange={(e) => setDescriptionCoach(e.target.value)}
              ></input>
  <h1 className="h111">Your most Recent Job Experience For Review</h1>
              <input
                id="titrePoste"
                type="text"
                placeholder="Job Title"
                value={titrePoste}
                onChange={(e) => setTitrePoste(e.target.value)}
              ></input>

{dateDebutExperience ? (
                <input
                id="dateDebutExperience"
                  type="date"
                  value={dateDebutExperience}
                  required
                  onFocus={handleInputFocus}
                  onChange={(event) => setDateDebutExperience(event.target.value)}
                />
              ) : (
                <input
                id="dateDebutExperience"
                  type="text"
                  required
                  value=""
                  placeholder="Experience Begins"
                  onFocus={handleInputFocus}
                  onChange={(event) => setDateDebutExperience(event.target.value)}
                />
              )}

{dateFinExperience ? (
                <input
                id="dateFinExperience"
                  type="date"
                  value={dateFinExperience}
                  required
                  onFocus={handleInputFocus}
                  onChange={(event) => setDateFinExperience(event.target.value)}
                />
              ) : (
                <input
                id="dateFinExperience"
                  type="text"
                  required
                  value=""
                  placeholder="Experience Begins"
                  onFocus={handleInputFocus}
                  onChange={(event) => setDateFinExperience(event.target.value)}
                />
              )}
               <p
                id="notedateFinExperience"
                className={dateFinExperience && dateDebutExperience && !validDateFinExperience && !validDateDebutExperience ? "none" : "hide"}
              >
                Date beginning needs to be older than finish
              </p>
              <UploadfFile setFile={setFile} setFi={setFi}  ></UploadfFile>
              {console.log(file)}
              <Button
                style={{ marginTop: "5px" }}
                type="submit"
                
              >
                Sign In
              </Button>
                </>
          )}

       
        </form>
        {/* fin form */}
      </div>{" "}
      {/* fin video background */}
      </>
  )
}

export default UpdateCoach



