
import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  texts: { text: string; delay: number }[];
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  className = "",
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentTextIndex >= texts.length) return;

    const currentTextObj = texts[currentTextIndex];
    if (currentCharIndex < currentTextObj.text.length) {
      const timeout = setTimeout(() => {
        if (currentTextIndex > 0) {
          // For subsequent texts, append to previous text
          setCurrentText(texts.slice(0, currentTextIndex).map(t => t.text).join("") + currentTextObj.text.slice(0, currentCharIndex + 1));
        } else {
          // For first text, just show current progress
          setCurrentText(currentTextObj.text.slice(0, currentCharIndex + 1));
        }
        setCurrentCharIndex(prev => prev + 1);
      }, currentTextObj.delay);

      return () => clearTimeout(timeout);
    } else if (currentTextIndex < texts.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [currentCharIndex, currentTextIndex, texts]);

  return (
    <div className={`inline-block ${className}`}>
      <span>{currentText}</span>
      {currentTextIndex < texts.length && currentCharIndex < texts[currentTextIndex].text.length && (
        <span className="animate-cursor-blink border-r-2 border-white ml-1" />
      )}
    </div>
  );
};

export default TypewriterText;
