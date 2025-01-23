import { useState } from "react";
import axios from "axios";

const TranslateForm = () => {
  const [fromLanguage, setFromLanguage] = useState("");
  const [toLanguage, setToLanguage] = useState("");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Language options (can be expanded as needed)
  const languages = [
    { code: "en", name: "English" },
    { code: "ja", name: "Japanese" },
    
  ];

  const handleTranslation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make a POST request to your Django API
      const response = await axios.post("http://localhost:8000/translate/", {
        text: textToTranslate,
        from_language: fromLanguage,
        to_language: toLanguage,
      });

      // Set translated text in the state
      setTranslatedText(response.data.translation);
    } catch (error) {
      // Handle errors (e.g., network errors)
      setError("There was an error translating the text.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <form onSubmit={handleTranslation} method="post">
        {/* From Language Select */}
        <div className="mb-6">
          <label htmlFor="fromlanguage" className="block text-lg font-semibold mb-2">
            Choose to translate from Language
          </label>
          <select
            id="fromlanguage"
            name="fromlanguage"
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select a language</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Textarea for Text to Translate */}
        <div className="mb-6">
          <label htmlFor="translate" className="block text-lg font-semibold mb-2">
            Enter your text here
          </label>
          <textarea
            id="translate"
            name="translate"
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            placeholder="Enter your text here"
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        {/* To Language Select */}
        <div className="mb-6">
          <label htmlFor="tolanguage" className="block text-lg font-semibold mb-2">
            Choose to translate to Language
          </label>
          <select
            id="tolanguage"
            name="tolanguage"
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select a language</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Translate Button */}
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>

        {/* Display Error */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Translated Text Area */}
        <div className="mb-6">
          <label htmlFor="translated-text" className="block text-lg font-semibold mb-2">
            Translated Text
          </label>
          <textarea
            id="translated-text"
            name="translated-text"
            value={translatedText}
            placeholder="Translated text will appear here..."
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg"
            disabled
          ></textarea>
        </div>
      </form>

      {/* Loading Overlay (optional) */}
      {loading && (
        <div className="absolute inset-0 bg-gray-800 opacity-50 flex justify-center items-center">
          <div className="text-white font-semibold">Translating...</div>
        </div>
      )}
    </div>
  );
};

export default TranslateForm;
