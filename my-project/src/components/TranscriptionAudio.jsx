import { useState } from 'react';

function TranscriptionAudio() {
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const handleAudioFileChange = (event) => {
    setAudioFile(event.target.files[0]);
    console.log(audioFile);
  };

  const handleImageFileChange = (event) => {
    setImageFile(event.target.files[0]);
    console.log(imageFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., sending the files to the server)

    // Simulate setting a result after processing the files
    setResult("Simulated result: Text from audio or image");

    // Simulate setting the uploaded file URL (for demonstration purposes)
    setUploadedFileUrl("/path/to/uploaded/file");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-control mb-4">
          <label htmlFor="audio-upload" className="label">
            <span className="label-text">Upload Audio File:</span>
          </label>
          <input
            type="file"
            id="audio-upload"
            name="myfilest"
            accept="audio/*"
            className="file-input file-input-bordered file-input-primary w-full"
            onChange={handleAudioFileChange}
          />
        </div>

        <div className="form-control mb-4">
          <label htmlFor="image-upload" className="label">
            <span className="label-text">Upload Image File:</span>
          </label>
          <input
            type="file"
            id="image-upload"
            name="myfilestimg"
            accept="image/*"
            className="file-input file-input-bordered file-input-accent w-full"
            onChange={handleImageFileChange}
          />
        </div>

        <div className="form-control mb-6">
          <button type="submit" className="btn btn-primary w-full">
            Convert
          </button>
        </div>

        {result && (
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Result:</span>
            </label>
            <textarea
              name="textarea"
              placeholder="Result will be displayed here..."
              rows="5"
              disabled
              value={result}
              className="textarea textarea-bordered w-full"
            />
          </div>
        )}

        {uploadedFileUrl && (
          <div className="mt-4">
            <p>
              File uploaded at:{" "}
              <a href={uploadedFileUrl} className="text-blue-600 underline">
                {uploadedFileUrl}
              </a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default TranscriptionAudio;
