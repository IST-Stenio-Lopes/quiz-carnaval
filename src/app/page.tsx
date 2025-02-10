"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import confetti from "canvas-confetti";

import { questions } from "../data/questions";
import { useRef, useState } from "react";
import Image from "next/image";
import { Poetsen_One } from "next/font/google";
import { feedbackMessages } from "../data/feedbackMessage";

const poetsen = Poetsen_One({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const confettiRef = useRef(null);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string | null>(null);

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showHalfwayMessage, setShowHalfwayMessage] = useState(false);

  function handleAnswerChange(answer: string) {
    setSelectedAnswer(answer);
  }

  function handleNextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer) {
      setCorrectCount((prev) => prev + 1);
      setFeedbackType(`acerto${Math.min(correctCount + 1, 3)}`);
      setShowCorrectMessage(true);

      const animationEnd = Date.now() + 2 * 1000;
      const colors = ["#14C187", "#FA068A", "#F1F101"];

      const frame = () => {
        if (Date.now() > animationEnd) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    } else {
      setWrongCount((prev) => prev + 1);
      setFeedbackType(`erro${Math.min(wrongCount + 1, 3)}`);
      setShowCorrectMessage(true);
    }
  }

  function goToNextQuestion() {
    setShowCorrectMessage(false);
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer || ""]);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    setTotalAnswered((prev) => prev + 1);

    if (totalAnswered + 1 === 5) {
      setShowHalfwayMessage(true);
      setFeedbackType(correctCount > wrongCount ? "metadeMais" : "metadeMenos");
    }
  }

  console.log("Erros: ", wrongCount);
  console.log("Acertos: ", correctCount);

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="flex flex-col min-h-screen w-full bg-carnaval-bg bg-cover bg-center ">
      <div className="flex gap-8 flex-col p-14 bg-blue rounded-b-3xl shadow-custom">
        <Progress value={(currentQuestionIndex / questions.length) * 100} />
        <h1 className="text-5xl font-bold text-center text-white ">
          {currentQuestion.question}
        </h1>
      </div>

      <div className="flex flex-col gap-8 pt-14 px-28">
        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={handleAnswerChange}
        >
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = selectedAnswer === option;
            return (
              <div
                key={optionIndex}
                className={`flex items-center space-x-4 p-8 h-30 bg-button-answer rounded-md shadow-elevationfour transition-opacity duration-300 ${
                  isSelected
                    ? "border-4 border-yellow-400"
                    : "border-4 border-transparent"
                }`}
              >
                <RadioGroupItem
                  value={option}
                  id={`q${currentQuestion.id}-option${optionIndex}`}
                  className="hidden"
                />
                <Label
                  htmlFor={`q${currentQuestion.id}-option${optionIndex}`}
                  className="text-white text-3xl w-full"
                >
                  {option}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div className="p-14 flex justify-center">
        <Button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="text-white text-3xl shadow-elevationfour p-8 bg-button-react"
        >
          {" "}
          Avançar
          <ArrowRight />
        </Button>
      </div>

      {(showCorrectMessage || showHalfwayMessage) && feedbackType && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-md transition-opacity duration-500">
          <Image
            src={feedbackMessages[feedbackType].image}
            alt="Feedback"
            width={400}
            height={400}
            className="mb-4"
          />
          <h2
            className={`${poetsen.className} text-white text-4xl font-bold text-center mb-6`}
            dangerouslySetInnerHTML={{
              __html: feedbackMessages[feedbackType].message,
            }}
          />
          <div className="p-6">
            <Button
              onClick={() => {
                if (showHalfwayMessage) {
                  setShowHalfwayMessage(false);
                } else {
                  goToNextQuestion();
                }
              }}
              className="text-white text-3xl shadow-elevationfour p-8 bg-button-react"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
