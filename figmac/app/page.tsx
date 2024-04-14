"use client";
import LeftSidebar from "@/components/LeftSidebar";

import Live from "@/components/Live";
import RightSidebar from "@/components/RightSidebar";
import Navbar from "@/components/users/Navbar";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib copy/canvas";
import { useEffect, useRef, useState } from "react";
import { ActiveElement } from "@/types/type";

import {fabric} from 'fabric';
export default function Page() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const fabricRef=useRef<fabric.Canvas | null>(null);
  const isDrawing=useRef(false);
  const shapeRef=useRef<fabricRef.Object  | null>(null);
  const selectedShapeRef=useRef<string | null>('rectangle');
  const [activeElement, setActiveElement] = useState<ActiveElement>({
  name:'',
  value:'',
  icon:'',
  })
  const  handleActiveElement=(elem:ActiveElement) =>{
    setActiveElement(elem);
    selectedShapeRef.current=elem?.value as string;
  }
  useEffect(()=>{
const canvas= initializeFabric({canvasRef,fabricRef})
canvas.on("mouse:down",(options)=>{
  handleCanvasMouseDown({
    options,
    canvas,
    isDrawing,
    shapeRef,
    selectedShapeRef
  })
})
window.addEventListener("resize",()=>{
  handleResize({fabricRef})
})
  },[])
  return (
    
      <main className="h-screen overflow-hidden ">
      <Navbar
       activeElement={activeElement}
     handleActiveElement={handleActiveElement} />
      <section className="flex h-full flex-row">
        <LeftSidebar/>
      <Live canvasRef={canvasRef}/>
      <RightSidebar/>
      </section>
      
      </main>
    
  );
}