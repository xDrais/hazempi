import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Event from '../../Components/event/event';
import { getCourses } from '../../coursereduc/courseActions';
import backg from "./backg.jpg";


function Courses() {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courseDisplay.courses);
    const bestCourses = courses
    ?.sort((a, b) => b.rating - a.rating)
    ?.slice(0, 4);
  
    useEffect(() => {
      dispatch(getCourses());
    }, [dispatch ]);
    console.log("ena el products" + Array.isArray(courses) );

   
   const handleRefresh = () => {
     setTimeout(() => {
       dispatch(getCourses());
     }, 1000); 
     console.log("after 1 second");// Refresh after 1 seconds (adjust the number as needed)
   };
  return (
    <>
  <body style={{backgroundImage:`url(${backg})`,height:"1900px"}}>
    <div style={{marginTop:"100px"}}>  

    <div><h1 className="SectionTitle">Courses</h1>
            <p className="paragraph2">Best Rating Courses </p></div> 
 {Array.isArray(bestCourses) && bestCourses.map((c) => (
          
          <Event coursee={c} key={c._id} >

          </Event>
        ))} 
          
   <div><h1 className="SectionTitle" style={{ color : 'white'}}>Courses</h1>
            <p className="paragraph2" style={{ color : 'white'}}>learn this amazing skill with us </p></div> 
            
            {Array.isArray(courses) && courses.map((c) => (
          
          <Event coursee={c} key={c._id} >

          </Event>
        ))}

    </div> </body>
    </>
  )
}

export default Courses