import React, { useState } from "react";
import './App.css';
import FileUpload from './components/Fileupload';

function App() {
  const [extractedText, setExtractedText] = useState("");

  return (
      <FileUpload onExtract={setExtractedText} />
  );
}

export default App;