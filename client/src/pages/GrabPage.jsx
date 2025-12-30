import React, { useEffect, useRef, useState } from 'react'
import {Upload} from 'lucide-react'
import { Link } from 'react-router-dom';

const GrabPage = ({ currentGesture, gestureConfidence }) => {

  const GRAB_COOLDOWN = 10000;
  const USER_ID = "id1"
  const API_URL = "http://localhost:5000";
  const CONFIDENCE_THRESHOLD = 0.7;

  const [selectedImage , setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [hasGrabbed, setHasGrabbed] = useState(false);
  const lastGrabTime = useRef(0);

  const handleGrab = async () => {
    
    if(!selectedImage || isGrabbing) return;

    lastGrabTime.current = Date.now();
    setIsGrabbing(true);

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('userId', USER_ID);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if(data.success) {
        setHasGrabbed(true);
        setTimeout(() => {
          setIsGrabbing(false);
        }, 2000);
      }

    } catch (error) {
      console.log("Error during grab:", error);
      setIsGrabbing(false);
      setHasGrabbed(false);
    }
  }

  useEffect(() => {
    const timeSinceLastGrab = Date.now() - (lastGrabTime.current || 0);
    if(currentGesture === "grab" && 
      gestureConfidence > CONFIDENCE_THRESHOLD 
      && selectedImage 
      && !isGrabbing 
      && !hasGrabbed 
      && timeSinceLastGrab > GRAB_COOLDOWN) {
      handleGrab();
    }
  }, [currentGesture, gestureConfidence, selectedImage, isGrabbing, hasGrabbed])

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setHasGrabbed(false);
      lastGrabTime.current = 0;
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4'>
      {
        !imagePreview ? 
        <div className='bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full'>
          <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
            Image Transfer
          </h1>

          <p className='text-gray-600 mb-6 text-center'>
            Select an Image, them make a <strong>"GRAB"</strong> gesture. 
          </p>

          <label className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors bg-indigo-50 hover:bg-indigo-100'>
            <Upload className='w-16 h-16 text-indigo-400 mb-4' />
            <span className='text-small text-gray-600'>Click to select image.</span>
            <input type="file" className='hidden' accept='images/*' onChange={handleImageSelect}/>
          </label>

          <Link to="/drop" className='mt-6 w-fit flex items-center justify-center gap-2 text-gray-600 underline py-2 text-xs rounded-xl transition-colors'>
            Go to Drop Page
          </Link>

        </div> 
        : 
        <div className='relative w-full h-screen'>
          <img src={imagePreview} alt="Selected Image" className='w-full h-full object-contain' />
          {
            isGrabbing && (
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                <div className='animate-ping absolute w-96 h-96 rounded-full opacity-75 bg-white'></div>
                <div className='animate-pulse absolute w-64 h-64 rounded-full opacity-75 bg-white'></div>
                <div className='animate-bounce absolute w-32 h-32 rounded-full opacity-75 bg-white'></div>
              </div>
            )
          }
        </div>
      }
    </div>
  )
}

export default GrabPage