
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // If mobile, show all text immediately
    if (isMobile) {
      setCurrentText(texts.map(t => t.text).join(""));
      return;
    }

    // Normal typewriter effect for desktop
    if (currentTextIndex >= texts.length) return;

    const currentTextObj = texts[currentTextIndex];
    if (currentCharIndex < currentTextObj.text.length) {
      const timeout = setTimeout(() => {
        if (currentTextIndex > 0) {
          setCurrentText(texts.slice(0, currentTextIndex).map(t => t.text).join("") + currentTextObj.text.slice(0, currentCharIndex + 1));
        } else {
          setCurrentText(currentTextObj.text.slice(0, currentCharIndex + 1));
        }
        setCurrentCharIndex(prev => prev + 1);
      }, currentTextObj.delay);

      return () => clearTimeout(timeout);
    } else if (currentTextIndex < texts.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [currentCharIndex, currentTextIndex, texts, isMobile]);

  return (
    <div className={`inline-block ${className} ${isMobile ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' : 'text-3xl sm:text-4xl md:text-5xl'}`}>
      <span className="whitespace-nowrap">{currentText}</span>
      {!isMobile && currentTextIndex < texts.length && currentCharIndex < texts[currentTextIndex].text.length && (
        <span className="animate-cursor-blink border-r-2 border-white ml-1" />
      )}
    </div>
  );
};

export default TypewriterText;
