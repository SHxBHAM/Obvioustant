import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModeToggle from "@/components/ui/mode-toggle";
import ToDoList from "@/components/ToDoList";
import Summary from "@/components/Summary";

export default function SpeechToText() {
  // State for keeping track of words you mumble into the mic
  const [finalText, setFinalText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState("");
  const recognitionRef = useRef(null); // Holds the speech recognition instance so it doesn’t vanish into the void

  useEffect(() => {
    // If your browser doesn’t support this, then too bad
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser is trash and doesn’t support Speech Recognition. Instead use Firefox or Chrome like a normal person.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Because stopping after one sentence is for losers
    recognition.interimResults = true; // Let's see those half-baked words in real-time

    recognition.onresult = (event) => {
      let tempFinal = "";
      let tempInterim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          tempFinal += result[0].transcript + " "; // Words you actually committed to
        } else {
          tempInterim += result[0].transcript; // Half-formed gibberish
        }
      }

      setFinalText((prev) => prev + tempFinal); // Storing whatever nonsense you blurted out
      setInterimText(tempInterim); // Keeping that live updating mess visible
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition failed because of course it did:", event.error);
    };

    recognitionRef.current = recognition; // Store it so it doesn’t disappear like your motivation
  }, []);

  const startListening = () => {
    // Reset everything because why not start fresh
    setFinalText("");
    setInterimText("");
    setTasks([]);
    setEvents([]);
    setNotes("");
    setIsListening(true);
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
    processTranscript(finalText); // Ship it off for processing
  };

  const processTranscript = async (text) => {
    setLoading(true);
    try {
      // AI magic to turn your ramblings into structured data
      const response = await axios.post("http://localhost:5000/extract-actions", { text });
      setTasks(response.data.tasks);
      setEvents(response.data.events);
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Backend exploded while processing transcript:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl font-bold mb-4">Obvioustant</h1>

      <Card className="w-full max-w-lg">
        <CardContent className="p-4">
            <>
              <span>{finalText}</span>
              <span className="text-gray-500">{interimText}</span> {/* Because we love a good unfinished thought */}
            </>

        </CardContent>
      </Card>

      <div className="mt-4 flex gap-4">
        <Button onClick={startListening} disabled={isListening}>Start</Button>
        <Button variant="destructive" onClick={stopListening} disabled={!isListening}>Process</Button>
        <ModeToggle />
      </div>

      {/* Here’s the part where we pretend like this does something productive */}
      <ToDoList tasks={tasks} isLoading={loading} />
      <Summary  events={events} isLoading={loading} />
    </div>
  );
}