import { useEffect, useRef, useState } from "react";

const GestureDetector = ({ onGesture }) => {
  const MODEL_URL =
    "https://teachablemachine.withgoogle.com/models/sG3DX3BM_/model.json"
    // "https://teachablemachine.withgoogle.com/models/ys_R_htjT/model.json";

  const videoRef = useRef();
  const [isVideoStarted, setIsVideoStarted] = useState(false);
  const [classifier, setClassifier] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedClassifier = await window.ml5.imageClassifier(
          MODEL_URL,
          () => {
            console.log("Gesture Model Loaded!");
          }
        );

        setClassifier(loadedClassifier);
      } catch (error) {
        console.error("Error loading the model:", error);
      }
    };

    loadModel();
  }, []);

  const classifyGesture = () => {
    if(classifier && videoRef.current) {
      classifier.classify(videoRef.current, (results, error) => {
        if (error) {
          console.error("Error during classification:", error);
          return;
        }

        // console.log(results)
        if (results && results[0]) {
          const gesture = results[0].label;
          const confidence = results[0].confidence;
          onGesture(gesture, confidence);
        }

        setTimeout(() => classifyGesture(), 30);
      });
    } else {
      setTimeout(() => classifyGesture(), 30);
    }
  }

  const startVideo = () => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if(videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play();
              setIsVideoStarted(true);
              classifyGesture();
            };
          }
        })
        .catch((err) => {
          console.error("Error accessing webcam: ", err);
        });
    }
  }

  useEffect(() => {
    if (classifier && !isVideoStarted) {
      startVideo();
    }
  }, [classifier]);

  return (
    <video
      width={640}
      height={480}
      style={{ display: "none" }}
      autoPlay
      muted
      ref={videoRef}
    />
  );
};

export default GestureDetector;
