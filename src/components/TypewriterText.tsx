
import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  texts: { text: string; delay: number }[];
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (currentTextIndex >= texts.length) {
      setIsDone(true);
      return;
    }

    const currentTextObj = texts[currentTextIndex];
    if (currentCharIndex < currentTextObj.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentTextObj.text[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, currentTextObj.delay);

      return () => clearTimeout(timeout);
    } else if (currentTextIndex < texts.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [currentCharIndex, currentTextIndex, texts]);

  // If animation is done, show full text to ensure visibility
  const finalText = isDone ? texts.map(t => t.text).join("") : displayedText;

  return (
    <span className={`inline-block relative ${className}`}>
      {finalText}
      {!isDone && (
        <span className="animate-cursor-blink border-r-2 border-white ml-1" />
      )}
    </span>
  );
};

export default TypewriterText;
