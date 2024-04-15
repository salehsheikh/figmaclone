"use client";
import LeftSidebar from "@/components/LeftSidebar";
import {fabric} from 'fabric';
import Live from "@/components/Live";
import RightSidebar from "@/components/RightSidebar";
import Navbar from "@/components/users/Navbar";
import { handleCanvasMouseDown, handleCanvasMouseUp, handleCanvasObjectModified, handleCanvaseMouseMove, handleResize, initializeFabric } from "@/lib copy/canvas";
import { useEffect, useRef, useState } from "react";
import { ActiveElement } from "@/types/type";
import { useMutation, useStorage } from "@/liveblocks.config";


export default function Page() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const fabricRef=useRef<fabric.Canvas | null>(null);
  const isDrawing=useRef(false);
  const shapeRef=useRef<fabric.Object  | null>(null);
  const selectedShapeRef=useRef<string | null>('rectangle');
  const  activeObjectRef=useRef<fabric.Object | null>(null);
  const canvasObjects=useStorage((root)=>root.
canvasObjects)

const syncShapeInStorage=useMutation(({storage},
object)=>{
  if(!object)return;
  const {objectId}=object;
  const shapeData=object.toJSON();
  shapeData.objectId=objectId;

  const canvasObjects=storage.get('canvasObjects');
  canvasObjects.set(objectId,shapeData);

},[])
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

canvas.on("mouse:move",(options)=>{
  handleCanvaseMouseMove({
    options,
    canvas,
    isDrawing,
    shapeRef,
    selectedShapeRef,
    syncShapeInStorage
  })
})
canvas.on("mouse:up",(options)=>{
  handleCanvasMouseUp({
    canvas,
    isDrawing,
    shapeRef,
    selectedShapeRef,
    syncShapeInStorage,
    setActiveElement,
    activeObjectRef,
  })
})
canvas.on("object:modified",(options)=>{
  handleCanvasObjectModified({
    options,
    syncShapeInStorage
  })
})
window.addEventListener("resize",()=>{
  handleResize({fabricRef})
})
  },[])
  useEffect(()=>{
    fabricRef,
    canvasObjects,
    activeObjectRef
  },[canvasObjects])
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