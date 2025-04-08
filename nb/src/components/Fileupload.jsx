import React, { useState } from "react";
import { createWorker } from "tesseract.js";

const FileUpload = ({ onExtract }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOCR = async () => {
    if (!file) return;
    setLoading(true);

    const worker = await createWorker("eng"); // use 'eng' for English
    const image = URL.createObjectURL(file);
    const {
      data: { text },
    } = await worker.recognize(image);
    setText(text);
    onExtract(text);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-xl shadow bg-white space-y-4">
      <h2 className="text-2xl font-semibold text-center">📤 Upload Handwritten Notes</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 border p-2 rounded"
      />

      <button
        onClick={handleOCR}
        disabled={!file || loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Extracting..." : "Extract Text"}
      </button>

      {text && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">📝 Extracted Text:</h3>
          <p className="whitespace-pre-wrap text-sm">{text}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
