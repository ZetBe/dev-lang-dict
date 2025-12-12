"use client";

import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TTSButtonProps {
  text: string;
}

export default function TTSButton({ text }: TTSButtonProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSpeak = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const textToSpeak = text.replace(/-/g, "");

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const preferredVoice =
      voices.find((v) => v.name.includes("Google US English")) ||
      voices.find((v) => v.name.includes("Samantha")) ||
      voices.find((v) => v.lang === "en-US") ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.lang = "en-US";
    utterance.rate = 0.9;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSpeak}
      disabled={speaking}
      className={`rounded-full transition-all ${
        speaking
          ? "text-blue-400 bg-blue-400/20 scale-110"
          : "text-zinc-400 hover:text-blue-400 hover:bg-blue-400/10"
      }`}
      title={speaking ? "Speaking..." : "Listen to pronunciation"}
    >
      <Volume2 className={`w-6 h-6 ${speaking ? "animate-pulse" : ""}`} />
    </Button>
  );
}
