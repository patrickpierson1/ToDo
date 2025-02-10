import { useRef, useState, useEffect } from "react";

export default function DrawingApp() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("black");


  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 100;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (ctxRef.current){
      ctxRef.current.strokeStyle = color;
    }
  }, [color]);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="drawing-app">
      {/* erase button */}
      <button
        onClick={clearCanvas}
        className="erase-button"
      >
        Erase
      </button>
      
      {/* color buttons */}
      <button
        onClick = {() => setColor("red")}
        className = "red-color-button"
      > Red </button>
      <button
        onClick = {() => setColor("black")}
        className = "black-color-button"
      > Black </button>
      <button
        onClick = {() => setColor("yellow")}
        className = "yellow-color-button"
      > Yellow </button>

      {/* canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="canvas"
      ></canvas>
    </div>
  );
}