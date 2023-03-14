import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
// import Header from "/components/Header/Header.js";
// import Footer from "/components/Footer/Footer.js";
import Button from "../Components/CustomButtons/Button.js";
import GridContainer from "../Components/Grid/GridContainer.js";
import GridItem from "../Components/Grid/GridItem.js";
import NavPills from "../Components/NavPills/NavPills.js"
import Parallax from "../Components/Parallax/Parallax.js";

import styles from "../Components/styles/jss/nextjs-material-kit/pages/profilePage.js";
import { useSelector } from "react-redux";
import Loader from "../Components/Loader.js";
import { toast,ToastContainer } from "react-toastify";

const useStyles = makeStyles(styles);

export default function Profile() {

    const userLogin = useSelector(state => state.userLogin)
    const {loading , error,userInfo } = userLogin  
    useEffect(()=>{
        if(error){
            toast.error(error)
        }
    },[error])
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
    {loading && <Loader></Loader>}
      <Parallax small filter image="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={"/images/"+userInfo.imageUrl}
                      alt="..."
                      style={{"borderRadius": "50%","height":"120px"}}
                    />
                  </div>
                  <div className={classes.name +"py-3"}>
                    <h3 className={classes.title}>{userInfo.lastName+" "+userInfo.firstName}</h3>
                     <h6>{userInfo.role.name}</h6> 
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
               
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Course",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Events",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Favorite",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src="/images/1e8e248f-04de-428d-bb5a-ef1b4992550e-1678730933200.png"
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}