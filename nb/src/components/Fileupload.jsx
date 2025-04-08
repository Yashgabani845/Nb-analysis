import React, { useState } from "react";
import { createWorker } from "tesseract.js";
import "./fileupload.css"

const FileUpload = ({ onExtract }) => {
  const [file, setFile] = useState(null)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleOCR = async () => {
    if (!file) return
    setLoading(true)

    const worker = await createWorker("eng") // use 'eng' for English
    const image = URL.createObjectURL(file)
    const {
      data: { text },
    } = await worker.recognize(image)
    setText(text)
    onExtract(text)
    setLoading(false)
  }

  return (
    <div className="file-upload-container">
      <h2 className="file-upload-title">📤 Upload Handwritten Notes</h2>

      <input type="file" accept="image/*" onChange={handleChange} className="file-input" />

      <button onClick={handleOCR} disabled={!file || loading} className="extract-button">
        {loading ? "Extracting..." : "Extract Text"}
      </button>

      {text && (
        <div className="result-container">
          <h3 className="result-title">📝 Extracted Text:</h3>
          <p className="result-text">{text}</p>
        </div>
      )}
    </div>
  )
}

export default FileUpload
