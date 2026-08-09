import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

import "./FacialDetection.css";
import axios from "axios";
export default function FacialExpression({ setsongs }) {



    const videoRef = useRef();
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };
  async function DetectMood() {
  
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    let mostProbleExpression = 0;
    let _expression = "";
    
    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }
    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbleExpression) {
        mostProbleExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }
    
    console.log(_expression);
    // get method ki song hit krne he
    axios.get(`http://localhost:3000/songs?mood=${_expression}`)
      .then(response=>{
        console.log(response.data)
        setsongs(response.data.songs)
      })
  
  }
  useEffect(() => {
    loadModels().then(startVideo);
  }, []);
  return (
    <div className="mood-element">
      <video ref={videoRef} autoPlay muted className="user-video-feed" />
      <button onClick={DetectMood}> Detect Mood</button>
    </div>
  );
}
