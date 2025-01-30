import { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please upload a file.");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);

        setLoading(true);
        setError(null);  // Clear any previous errors

        try {
            const response = await fetch("http://localhost:8000/translate-pdf/", {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Create a link element to download the translated PDF
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'translated.pdf';  // Suggested file name
                link.click();
            } else {
                const data = await response.json();
                setError(data.error || "Error occurred during translation.");
            }
        } catch (err) {
            setError("Failed to upload file.");
            console.error("Error uploading file:", err);  // Log for debugging
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg mt-40">
            <h2 className="text-xl font-semibold text-center mb-4">Upload and Translate PDF</h2>
            <div className="mb-4">
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Choose a PDF file</label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered file-input-primary w-full mt-2"
                />
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`btn ${loading ? "btn-disabled" : "btn-primary"} w-full`}
                >
                    {loading ? "Translating..." : "Upload and Translate"}
                </button>
            </div>

            {error && (
                <p className="mt-4 text-red-500 text-center">{error}</p>
            )}
        </div>
    );
};

export default FileUpload;
