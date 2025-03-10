import React, { useRef, useState, useEffect } from 'react';
import './Note.css';
import { jsPDF } from 'jspdf';

import BoldLogo from './Logos/BoldLogo.png';
import ItalicLogo from './Logos/ItalicsLogo.png';
import UnderlineLogo from './Logos/UnderlineLogo.png';
import BulletLogo from './Logos/BulletLogo.png';
import NumberLogo from './Logos/NumberingLogo.png';
import DrawLogo from './Logos/DrawLogo.png';
import EraseLogo from './Logos/EraseLogo.png';

const Note = () => {

  // List modes: "none", "bullet", or "number"
  const [listMode, setListMode] = useState("none");
  const [numberCounter, setNumberCounter] = useState(1);

  // Bold/Italic/Underline toggles
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Document metadata
  const [title, setTitle] = useState("");
  const [docDate, setDocDate] = useState(new Date().toISOString().substr(0, 10));

  // Drawing states
  const [drawingEnabled, setDrawingEnabled] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState("black");
  const [isErasing, setIsErasing] = useState(false);

  // Refs for editor and canvas
  const editorRef = useRef(null);
  const canvasRef = useRef(null);

  // Initialize canvas once
  useEffect(() => {
    if (!editorRef.current || !canvasRef.current) return;
    setupCanvasSize();
  }, []);

  // Update canvas stroke style whenever color or eraser changes
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.strokeStyle = isErasing ? "#ffffff" : drawColor;
    }
  }, [drawColor, isErasing]);

  // Set up canvas size to match editor
  const setupCanvasSize = () => {
    const editor = editorRef.current;
    const canvas = canvasRef.current;

    // Temporarily store existing drawing
    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    offscreen.getContext("2d").drawImage(canvas, 0, 0);

    // Match editor bounding box
    const rect = editor.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Redraw saved drawing
    const ctx = canvas.getContext("2d");
    ctx.drawImage(offscreen, 0, 0);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = isErasing ? "#ffffff" : drawColor;

    // Position canvas
    canvas.style.top = editor.offsetTop + "px";
    canvas.style.left = editor.offsetLeft + "px";
  };

  // Observe editor resizing
  useEffect(() => {
    if (!editorRef.current || !canvasRef.current) return;
    const editor = editorRef.current;
    const resizeObserver = new ResizeObserver(() => {
      setupCanvasSize();
    });
    resizeObserver.observe(editor);

    return () => {
      resizeObserver.disconnect();
    };
  }, [drawColor, isErasing]);

  // Toggle bold/italic/underline with execCommand
  const toggleBold = () => {
    document.execCommand('bold', false, null);
    setIsBold(!isBold);
  };

  const toggleItalic = () => {
    document.execCommand('italic', false, null);
    setIsItalic(!isItalic);
  };

  const toggleUnderline = () => {
    document.execCommand('underline', false, null);
    setIsUnderline(!isUnderline);
  };

  // Toggle bullet mode
  const toggleBulletMode = () => {
    setListMode((prev) => (prev === "bullet" ? "none" : "bullet"));
  };

  // Toggle number mode
  const toggleNumberMode = () => {
    if (listMode === "number") {
      setListMode("none");
      setNumberCounter(1);
    } else {
      setListMode("number");
      setNumberCounter(1);
    }
  };

  // Handle Enter for bullet/number
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      // Insert a tab character
      e.preventDefault();
      document.execCommand("insertText", false, "\t");
    } else if (e.key === "Enter") {
      if (listMode === "bullet") {
        // Bullet mode: always insert \t- 
        e.preventDefault();
        document.execCommand("insertHTML", false, "<br>\t- ");
      } else if (listMode === "number") {
        // Number mode: insert \t{number}. 
        e.preventDefault();
        const prefix = `<br>\t${numberCounter}. `;
        document.execCommand("insertHTML", false, prefix);
        setNumberCounter((prev) => prev + 1);
      } 
      // Otherwise, let default behavior handle Enter
    }
  };

  // Save
  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      alert(`Note saved:\nTitle: ${title}\nDate: ${docDate}\nContent: ${content}`);
    }
  };

  // Export to PDF (including drawings)
  const handleExport = () => {
    if (editorRef.current && canvasRef.current) {
      // Get the text content from the editor
      const content = editorRef.current.innerText || "";

      // Create a jsPDF instance
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'letter',
      });

      // Add title with larger font size (18pt)
      doc.setFontSize(18);
      doc.text(`${title}`, 20, 40);
      
      // Add date with smaller font size (10pt)
      doc.setFontSize(10);
      doc.text(`${docDate}`, 20, 60);

      // Add the note text
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(content, 550); // 550 = page width minus margins
      doc.text(lines, 20, 100);

      // Capture the drawings from the canvas as an image
      const canvasDataUrl = canvasRef.current.toDataURL("image/png");
      // Determine dimensions: scale the canvas image to fit within 550pt width
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      const pdfImgWidth = 550;
      const pdfImgHeight = (canvasHeight * pdfImgWidth) / canvasWidth;

      // Add the canvas drawing on top of the text area.
      // Adjust the Y coordinate (here 100) to position the drawing exactly as desired.
      doc.addImage(canvasDataUrl, 'PNG', 20, 100, pdfImgWidth, pdfImgHeight);

      // Save the PDF with the title as the filename; fallback if title is empty
      const pdfFileName = title.trim() ? `${title}.pdf` : "myNote.pdf";
      doc.save(pdfFileName);
    }
  };

  // Clear text + drawings
  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    clearCanvas();
  };

  // Clear only drawings
  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Drawing events
  const startDrawing = (e) => {
    if (!drawingEnabled) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !drawingEnabled) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!drawingEnabled) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
  };

  // Color palette
  const colorOptions = [
    "red", "orangered", "orange", "gold",
    "yellow", "chartreuse", "lime", "green",
    "cyan", "deepskyblue", "blue", "indigo",
    "violet", "purple", "magenta", "black"
  ];

  return (
    <div>
      <div className="header-container">
        <div className="header-left">
          {/* Save/Export/Clear buttons */}
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="export-button" onClick={handleExport}>Export</button>
          <button className="clear-button" onClick={handleClear}>Clear</button>
        </div>
        <div className="header-right">
          
          {/* Title and Date inputs */}
          <input
            type="text"
            className="title-input"
            placeholder="Add Your Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            className="date-input"
            value={docDate}
            onChange={(e) => setDocDate(e.target.value)}
          />
        </div>
      </div>

      <div className="note-content">
        <div className="toolbar">
          {/* Bold/Italic/Underline */}
          <button onClick={toggleBold} className={isBold ? "active" : ""}>
            <img src={BoldLogo} alt="Bold" className="icon" />
          </button>
          <button onClick={toggleItalic} className={isItalic ? "active" : ""}>
            <img src={ItalicLogo} alt="Italic" className="icon" />
          </button>
          <button onClick={toggleUnderline} className={isUnderline ? "active" : ""}>
            <img src={UnderlineLogo} alt="Underline" className="icon" />
          </button>

          {/* Bullet / Number */}
          <button 
            onClick={toggleBulletMode}
            className={listMode === "bullet" ? "active" : ""}
          >
            <img src={BulletLogo} alt="Bullet Points" className="icon" />
          </button>
          <button
            onClick={toggleNumberMode}
            className={listMode === "number" ? "active" : ""}
          >
            <img src={NumberLogo} alt="Number Sequence" className="icon" />
          </button>

          {/* Draw container */}
          <div className="draw-container">
            <button
              onClick={() => setDrawingEnabled(prev => !prev)}
              className={drawingEnabled ? "active" : ""}
            >
              <img src={DrawLogo} alt="Draw" className="icon" />
            </button>

            {drawingEnabled && (
              <div className="drawing-controls">
                <div className="color-grid">
                  {colorOptions.map((col) => (
                    <button
                      key={col}
                      onClick={() => {
                        setIsErasing(false);
                        setDrawColor(col);
                      }}
                      className="color-button"
                      style={{
                        backgroundColor: col,
                        border:
                          !isErasing && drawColor === col
                            ? "2px solid #007bff"
                            : "1px solid #ccc",
                      }}
                    />
                  ))}
                </div>
                <button
                  className={`erase-draw-button ${isErasing ? "active" : ""}`}
                  onClick={() => setIsErasing(prev => !prev)}
                >
                  <img src={EraseLogo} alt="Eraser" className="icon" />
                </button>
                <button
                  className="erase-draw-button"
                  onClick={clearCanvas}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Editor + Canvas container */}
        <div className="note-editor-container">
          <div
            className="note-editor"
            ref={editorRef}
            contentEditable="true"
            onKeyDown={handleKeyDown}
            placeholder="Take your note here..."
          />
          <canvas
            ref={canvasRef}
            className="drawing-canvas"
            style={{ pointerEvents: drawingEnabled ? "auto" : "none" }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
