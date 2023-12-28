import './index.css'
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { EcctrlJoystick } from "../src/EcctrlJoystick";
import { Suspense, useEffect, useState } from "react";
import { PointerLockControls } from "@react-three/drei";
/* import Map from "./Map"; */
import {LoadingScreen} from './Intro'

const root = ReactDOM.createRoot(document.querySelector("#root"));

const EcctrlJoystickControls = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false)

  useEffect(() => {
    // Check if using a touch control device, show/hide joystick
    if (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0)) {
      setIsTouchScreen(true)
    } else {
      setIsTouchScreen(false)
    }
  }, [])
  return (
    <>
      {isTouchScreen && <EcctrlJoystick buttonNumber={5} />}
    </>
  )
}

const Main = () => {
  const [start, setStart] = useState(false);


  return (
<>
<div className='flex absolute w-full h-full bg-black'>
    <Leva collapsed />
    <EcctrlJoystickControls />

    
    
      <Canvas 
      shadows
      camera={{
        fov: 65,
        near: 0.1,
        far: 1000,
        
      }}

    >
      
      <Suspense fallback={null}>{start && <Experience />}</Suspense>
      </Canvas>
{/*       <div className='dot'></div> */}
      </div>            
      <div className='flex fixed items-center text-center bg-transparent'>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />  
      </div>
      
      </>

  )
}
root.render(
  <>
  
 
    <Main />
   
  </>
);
