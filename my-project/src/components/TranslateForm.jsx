import { useState } from "react";

const TranslateForm = () => {
  const [fromLanguage, setFromLanguage] = useState("cl");
  const [toLanguage, setToLanguage] = useState("cl");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslation = (e) => {
    e.preventDefault();
    // Translation logic here
    // For now, simulate translation for demo purposes
    setTranslatedText(`Translated text from ${fromLanguage} to ${toLanguage}: ${textToTranslate}`);
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
            <option value="cl">Choose to translate from Language</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
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
            <option value="cl">Choose to translate to Language</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
          </select>
        </div>

        {/* Translate Button */}
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Translate
          </button>
        </div>

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
    </div>
  );
};

export default TranslateForm;
