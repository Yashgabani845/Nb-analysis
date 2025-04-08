import React, { useState } from "react";
import './App.css';
import FileUpload from './components/Fileupload';

function App() {
  const [extractedText, setExtractedText] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <FileUpload onExtract={setExtractedText} />
    </div>
  );
}

export default App;