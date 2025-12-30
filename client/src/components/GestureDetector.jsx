import { useEffect, useRef, useState } from "react";

const GestureDetector = () => {
  const MODEL_URL =
    "https://teachablemachinbe.withgoogle.com/models/sG3DX3BM_/model.json";

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
