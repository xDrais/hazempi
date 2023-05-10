import React, { useState } from 'react'
import { ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';



function RoomPage() {
    const userLogin =useSelector(state =>state.userLogin)
const {userInfo} =userLogin

    const {roomId} = useParams()



    const myMeeting = async (element) =>{
         // generate Kit Token
  const appID = 1651094763;
  const serverSecret = "1d7ae60d06d0e4a98e5d2720f121aaac";
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID, serverSecret, roomId, Date.now().toString(), userInfo.firstName
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
        container: element,
        scenario: {
            mode: ZegoUIKitPrebuilt.LiveStreaming,
          },

    });
    }

    return ( <div className='room-page'>
<div ref={myMeeting}/>

    </div> );
}

export default RoomPage;

