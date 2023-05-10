import React, { useState, useEffect  } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom'; 
import "./CourseDetail.css"
import { Container, Row, Col, Button, Card ,CardGroup, Accordion, ListGroup, Form} from 'react-bootstrap';
import { useDispatch , useSelector , } from "react-redux";
import { getCourses,createCourseReview } from '../../coursereduc/courseActions';
import backg from "./backg.jpg";
import axios from 'axios'
import SpecialButton from '../../Components/Button/button';
import confetti from "https://esm.run/canvas-confetti@1";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Components/Loader';

import Certification from './Certification';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Rating from '../../Components/Rating/Rating';
import VideoPlayer from '../VideoChat/VideoPlayer';
const CourseDetail= () => {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo } = userLogin
  const date = new Date().toLocaleDateString(); // get the current date as a string

  const navigate = useNavigate();
    const dispatch = useDispatch();

      const { id } = useParams();
      const [qty,setQty]= useState(1);
      const [enrollId,setEnrollId]= useState(userInfo.enrollement?._id);
      const [lessonIndex,setLessonIndex]=useState(0);
      //initialise state
      const [rating, setRating] = useState(0)
      const [comment, setComment] = useState('')
      const [showMeet, setShowMeet] = useState(false)

      const courseReviewCreate = useSelector((state) => state.courseReviewCreate) 
      const successProductReview = courseReviewCreate ? courseReviewCreate.success : false;
      const courses = useSelector((state) => state.courseDisplay.courses);
      console.log(courses);
      const [lessonCompletionStatus, setLessonCompletionStatus] = useState([]);


      const isLessonCompleted = (index) => {
        return lessonCompletionStatus[index];
      };
      
      const completeLesson = (index) => {
        const newLessonCompletionStatus = [...lessonCompletionStatus];
        newLessonCompletionStatus[index] = true;
        setLessonCompletionStatus(newLessonCompletionStatus);
      };



      const [test,setTest]= useState({});
      const [validTest,setValidTest]= useState(false);
      const [showLessons,setShowLessons]= useState(true);


    useEffect(() => {
      dispatch(getCourses());
    }, [id]);
      console.log("///////enrollllllllllllllllll");
      console.log(enrollId)

      const coursse = courses && courses.find((p) => p._id === id);

        const [isExpanded, setIsExpanded] = useState(true);
      
        const toggleExpand = () => {
          if (lessonIndex === 0 || isLessonCompleted(lessonIndex - 1)) {
            setIsExpanded(!isExpanded);
          } else {
            alert('Please complete the previous lesson before accessing this one.');
          }
        };

        const gettest = async () => {
          try {    if (!coursse) return; // check if coursse is null or undefined
      
            const response = await fetch(
      
              `http://localhost:5000/course/getTest/${coursse._id}`,
              { method: "GET" }
            );
            const data = await response.json();
            setTest(data);
          } catch (error) {
            console.error(error);
          }
        };
       
          //test handeling 
        const [selectedAnswers, setSelectedAnswers] = useState([]);
const TestPassed=(enrollId) => {
  axios.post(`http://localhost:5000/course/TestPassed/${enrollId}`)
  .then(response => {
    console.log(response.data); // log the updated enrollment object
  })
  .catch(error => {
    console.error(error);
  });
}

const TestFailed=(enrollId) => {
  axios.post(`http://localhost:5000/course/TestFailed/${enrollId}`)
  .then(response => {
    console.log(response.data); // log the updated enrollment object
  })
  .catch(error => {
    console.error(error);
  });
}
        const handleOptionClick = (questionIndex, optionIndex) => {
          const newSelectedAnswers = [...selectedAnswers];
          newSelectedAnswers[questionIndex] = optionIndex;
          setSelectedAnswers(newSelectedAnswers);
        };
      
        const isAnswerCorrect = (questionIndex, optionIndex) => {
          return test.existingTest.questions[questionIndex].answer ===
            test.existingTest.questions[questionIndex].options[optionIndex];
        };
       
        const submittedtest = () => {

          const correctAnswersCount = selectedAnswers.reduce((count, answer, index) => {

            if (isAnswerCorrect(index, answer)) {
              return count + 1;
            }
            return count;
          }, 0);
          if (selectedAnswers.length > 0 && correctAnswersCount >= selectedAnswers.length / 2) {
            console.log("confetti");
            confetti({
              particleCount: 200,
              spread: 100
            });
            TestPassed(enrollId);
            toast("Congrats for passing this course! Check your e-mail!");
            document.getElementById("testbutton").disabled = true;

          } else {
            TestFailed(enrollId);

            toast.error("Oops... You can redo this test by reloading the page !", {
              hideProgressBar: true});
                          document.getElementById("testbutton").disabled = true;

          }}
        
        useEffect(() => {
          gettest();
        }, [coursse]);

        if (!courses || courses.length === 0) {
          return <Loader/>;
        }

        console.log(coursse?.coach?.firstName);
        
        const submitHandler = (e)=>{
          e.preventDefault()
          
          dispatch(createCourseReview(id,{
            rating,
            comment,
          }))
        
        }
  return ( 
    
    <body style={{backgroundImage:`url(${backg})`,color:"white",height:"1900px"}}>
     <div style={{marginBottom:"-130px",color:"beige"}}><h1 style={{color:"white"}}className="SectionTitle">{coursse?.titleCourse}</h1>
            <p style={{color:"white"}} className="paragraph2">learn this amazing skill with us </p></div> 
            
    <Container style={{marginTop:"160px",
    paddingTop:"30px",
  background: "rgba(215, 200, 200, 0.299)",
  backdropFilter: "blur(60px)",
  borderRadius: "10px",
  height:"auto"
}}>
{showMeet === true
          (           <Card.Body >

            <VideoPlayer />
            </Card.Body >

          )}
      {coursse ? (
     <>
                      < ToastContainer style={{marginRight: "400px"}}/>

    <Row >
        <Col md={8}>
          
        { showLessons === true && coursse.lessons[lessonIndex].typeLesson ==="Video"?         (
<>
          <iframe
            width="100%"
            height="415"
            src={coursse.lessons[lessonIndex].contentLesson}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> <h4 style={{color:"white"}}>{coursse.lessons[lessonIndex].titleLesson}</h4> </>):(<Card style={{
            background: "transparent",
            height:"410px",
            backdropFilter: "blur(60px)",
      }}className="lessons description-card">

          <Card.Body >
            
             { test.existingTest && validTest===true &&  <Card.Text style={{color: "#362824"}}> <h4 style={{color:"white"}}>
           Test </h4>
           
           
           {test.existingTest && test.existingTest.questions.map((question,i) => (
  <div key={question._id}>
        <br />

    <h5 style={{color:"white"}}>Question {i+1}: {question.text}</h5>
    <div className="row">
      {question.options.map((option, j) => (
                <div key={j} className="col-sm-4 mb-3">
                <Card
                    onClick={() => handleOptionClick(i, j)}
                    style={{
                      border: "1px solid #000000",
                       background:
                        selectedAnswers[i] === j
                          ? "rgb(173, 148, 111) "
                          : "rgba(255, 255, 255, 0.58)",
                      backdropFilter: "blur(60px)",
                      height: "80px",
                    }}
                  >
            <Card.Body >
              <Card.Text>{option}</Card.Text>
            </Card.Body>
          </Card>

        </div>
      ))} 
    </div>
  </div> 
))}             <button id="testbutton" name="Submit" onClick={() => {
 submittedtest()
}}> Submit</button>
          
            </Card.Text> }
            { validTest===false && showLessons===true &&
            <Card.Text style={{color: "#362824"}}> <h4 style={{color:"white"}}>{coursse.lessons[lessonIndex].titleLesson}</h4>
            {coursse.lessons[lessonIndex].contentLesson}         </Card.Text>
}
          </Card.Body>
        </Card>)} </Col>
        <Col md={4}>

        <Card  style={{
        background: "transparent",
        background: "rgba(215, 200, 200, 0.299)",
        backdropFilter: "blur(60px)",
        height:"410px",

      }}className="lessons">
            <Card.Header onClick={toggleExpand} style={{ cursor: 'pointer' }}>
              Lessons
            </Card.Header>
            {isExpanded && coursse && coursse.lessons.map((lesson,index) =>  (
              
                <div  key={lesson._id}>
                  <Card.Body  style={{
        background: "transparent",
      }}>
                    <ListGroup variant="flush">
                      <ListGroup.Item style={{
        background: "transparent",padding:"-20px"
      }}>
                        <div className="d-flex justify-content-between align-items-center">

                        {index === 0 ? (
              <Link style={{ color: "white" }} onClick={() => {
                setLessonIndex(index);
                setShowLessons(true);
                setValidTest(false);
              
              }}>Lesson {index + 1} 

                </Link>

            ) : (
                        isLessonCompleted(index - 1) ? (
              <Link
                style={{ color: "white", cursor: isLessonCompleted(index - 1) ? "pointer" : "not-allowed" }}
                onClick={() => {
                  setLessonIndex(index);
                  setShowLessons(true);
                  setValidTest(false);
                
                }}
              >
                Lesson {index + 1} 

              </Link>
            ) : (
              <span style={{ color: "grey", cursor: "not-allowed" }}>
                Lesson {index + 1}
              </span>
            )
            )}  
                 {!isLessonCompleted(index) && (
                        <lord-icon
                  src="https://cdn.lordicon.com/hrqqslfe.json"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#16c72e"

                  scale="40"
                  onClick={() => completeLesson(index)}
                 >
              </lord-icon>
                )}   
            {isLessonCompleted(index) &&
              <div>
                <i className="far fa-check-circle text-success mr-2"></i>
                <span style={{ color: "#362824" }} className="text-muted">{lesson.typeLesson}</span>
              </div>
            }
               


                        </div>

                      </ListGroup.Item>

                    </ListGroup>


                  </Card.Body>

                </div>
                
              ))}

              {test.existingTest &&
              <div >
                  <Card.Body  style={{
        background: "transparent",
      }}>
                    <ListGroup variant="flush">
                      <ListGroup.Item style={{
        background: "transparent",padding:"-20px"
      }}>
                        <div className="d-flex justify-content-between align-items-center">
                        <Link style={{color: "white"}} onClick={() => {
  setValidTest(true);
  setShowLessons(false);
}}>Test</Link>
  <Link style={{color: "white"}} onClick={() => {
  setValidTest(false);
  setShowLessons(false);
  setShowMeet(true);

}}>Meet</Link>
                          <div>
                            
                            <i className="far fa-check-circle text-success mr-2"></i>
                            <span style={{color: "#362824"}}className="text-muted">Test</span>
                          </div>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </div> }




          </Card>
          {/* <Button variant="primary">Enroll Now</Button>  */}
          </Col>
        </Row>
          <br />
           <div className="mt-2">
            
            <Row md={2}>
            {/* <Card className="description-card">
              <Card.Body>
                <Card.Text>
                  ken pdf
             </Card.Text>
              </Card.Body>
            </Card> */}

            </Row>

      <PDFDownloadLink document={<Certification name={userInfo.firstName } lastname={userInfo.lastName } paragraph={coursse.titleCourse}   date={date}   />} fileName="certificate.pdf">
  {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Your Certifcate')}
</PDFDownloadLink>

            <ListGroup.Item  style={{color: "#362824"}}> 
                  <Rating
                    style={{color: "#362824"}}
                    value={coursse.rating}
                    text={`  ${coursse.numReviews} reviews`}


                  />
                </ListGroup.Item>
            <h4 className="mt-5" style={{color: "white"}}>What you'll learn</h4>
            <ListGroup className="learning-list">
              <ListGroup.Item style={{
          paddingTop:"30px",
        background: "transparent",
        background: "rgba(215, 200, 200, 0.299)",
        backdropFilter: "blur(60px)",
      }}>
                <div className="d-flex align-items-center">
                  <div className="learning-icon">
                    <i className="far fa-check-circle"></i>
                  </div>
                  <div style={{color: "#362824"}}>
                    <h5>In This Lesson You will learn : </h5>
                    <p>
                    {coursse.lessons[lessonIndex].descriptionLesson}                  </p>
                  </div>
                </div>
              </ListGroup.Item>
              
             </ListGroup> </div>
      <br />       <br />
      <Row style={{
          paddingTop:"30px",
        background: "transparent",
        background: "rgba(215, 200, 200, 0.299)",
        backdropFilter: "blur(60px)",
      }}>
        <Col style={{marginLeft:"50px" , color:'black',}}md={10}>
          <h2> Reviews({`${coursse.numReviews}`})
</h2>
          {coursse?.reviews.length=== 0 && <p> No Reviews </p> }
          <ListGroup style={{
          paddingTop:"30px",
        background: "transparent",
        background: "rgba(215, 200, 200, 0.299)",
        backdropFilter: "blur(60px)",
      }}variant="flush">
            {coursse?.reviews.map(review=>(
              <ListGroup.Item style={{
                paddingTop:"30px",
              background: "transparent",
              background: "rgba(215, 200, 200, 0.299)",
              backdropFilter: "blur(60px)",
            }} key={review._id} >
                <strong>{review.name}</strong> 
                <Rating style={{
          paddingTop:"30px",
        background: "transparent",
        background: "rgba(215, 200, 200, 0.299)",
        backdropFilter: "blur(60px)",
      }}
                    value={review.rating}
                    

                  />
                  <p>{review.createdAt?.substring(0,10)}</p>
                  <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item style={{
          paddingTop:"30px",
        background: "transparent",
        background: "rgba(215, 200, 200, 0.299)",
        backdropFilter: "blur(60px)",
      }}>
              <h2 className='cust'>Write a Customer Review</h2>
              {userInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="rating" >
                  <Form.Label>Rating</Form.Label>
                  
                  <Form.Control as='select' value={rating} onChange={(e)=>{
                    
                    setRating(+e.target.value)
                    ;}}>
                      <option value=''>Select...</option>
                      <option value='1'>1 -poor</option>
                      <option value='2'>2 -fair</option>
                      <option value='3'>3 -good</option>
                      <option value='4'>4 -veryGood</option>
                      <option value='5'>5 -Excellent</option>
                    </Form.Control>
                </Form.Group >

                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as='textarea' rows='3' value={comment} onChange={(e)=>setComment(e.target.value)} ></Form.Control>

                </Form.Group>
                   <Button type="submit" variant="primary"> submit</Button>
              </Form>): (<alert> please <Link to='/login'>sign in</Link> to write a review </alert>)}
            </ListGroup.Item>

          </ListGroup>
        </Col>
      </Row>
          <div className="mt-4">
            <h4>Related Courses</h4>
            <CardGroup>
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/150" />
                <Card.Body>
                  <Card.Title>Course 1</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod massa id erat congue, euismod
                    maximus enim laoreet.
                  </Card.Text>
                  <Button variant="primary">View Course</Button>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/150" />
                <Card.Body>
                  <Card.Title>Course 2</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod massa id erat congue, euismod
                    maximus enim laoreet.
                  </Card.Text>
                  <Button variant="primary">View Course</Button>
                </Card.Body>               </Card>
                <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/150" />
                <Card.Body>
                  <Card.Title>Course 2</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod massa id erat congue, euismod
                    maximus enim laoreet.
                  </Card.Text>
                  <Button variant="primary">View Course</Button>
                </Card.Body>               </Card> </CardGroup> </div>

       


      </>):(<p> no Course found </p>)}
    </Container> </body>
  );
};

export default CourseDetail;