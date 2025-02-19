import { useState, useEffect, useRef } from "react";

export default function SpeechToText() {
  const [finalText, setFinalText] = useState(""); // Stores finalized transcript
  const [interimText, setInterimText] = useState(""); // keeps the inbetween words so we can dynamically show in UI.
  const [isListening, setIsListening] = useState(false);// pretty selfexplanatory.
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    // recognition.lang = "en-US"; //we can use this for forcing english transcript

    recognition.onresult = (event) => {
      let tempFinal = "";
      let tempInterim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          tempFinal += result[0].transcript + " ";
        } else {
          tempInterim += result[0].transcript;
        }
      }

      setFinalText((prev) => prev + tempFinal); // appends to the final text
      setInterimText(tempInterim); // keeps Showing between text results while the 
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);//error handling BS
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    setFinalText("");
    setInterimText("");
    setIsListening(true);
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Speech to Text</h1>
      <div className="border p-4 w-full max-w-lg bg-gray-900 rounded-lg min-h-[100px]">
        <span>{finalText}</span>
        <span className="text-gray-500">{interimText}</span> {/* Inbetween text in grey to imitate processing lmao*/}
      </div>
      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={startListening}
          disabled={isListening}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={stopListening}
          disabled={!isListening}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
