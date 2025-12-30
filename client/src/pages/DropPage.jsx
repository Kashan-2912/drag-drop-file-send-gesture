import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DROP_COOLDOWN = 10000;
const RECIEVER_ID = "id1";
const API_URL = "http://localhost:5000";
const CONFIDENCE_THRESHOLD = 0.7;

const DropPage = ({ currentGesture, gestureConfidence }) => {
  const [recievedImage, setRecievedImage] = useState(null);
  const [isDropping, setIsDropping] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);

  const lastDropTime = useRef(0);

  const handleDrop = async () => {
    if (isDropping || hasDropped) return;

    lastDropTime.current = Date.now();
    setIsDropping(true);

    try {
      const response = await fetch(`${API_URL}/drop/${RECIEVER_ID}`);
      const data = await response.json();

      if (data.success && data.imagePath) {
        setTimeout(() => {
          setRecievedImage(`${API_URL}/${data.imagePath}`);
          setIsDropping(false);
          setHasDropped(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsDropping(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error during drop:", error);
      setTimeout(() => {
        setIsDropping(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const timeSinceLastDrop = Date.now() - lastDropTime.current;
    if (
      currentGesture === "drop" &&
      gestureConfidence > CONFIDENCE_THRESHOLD &&
      !isDropping &&
      !hasDropped &&
      !recievedImage &&
      timeSinceLastDrop > DROP_COOLDOWN
    ) {
      handleDrop();
    }
  }, [
    currentGesture,
    gestureConfidence,
    isDropping,
    hasDropped,
    recievedImage,
  ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4">
      {!recievedImage ? (
        <div className="rounded-2xl p-8 max-w-md w-full ">
          {currentGesture === "drop" ? (
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-cyan-200 animate-pulse shadow-2xl flex justify-center items-center">
                <div className="w-32 h-32 rounded-full bg-emerald-100 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Drop Zone
              </h1>

              <p className="text-gray-600 mb-6 text-center">
                Select an Image, them make a <strong>"DROP"</strong> gesture.
              </p>

              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-green-300 rounded-xl bg-green-50 mb-6">
                <ArrowDown className="w-16 h-16 text-green-400 mb-4" />
                <span className="text-sm text-gray-600">Waiting for drop gesture...</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DropPage;
