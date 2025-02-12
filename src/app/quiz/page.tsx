"use client";

import { ArrowRight, RotateCcw } from "lucide-react";

import confetti from "canvas-confetti";

import { useRef, useState } from "react";
import Image from "next/image";
import { Poetsen_One } from "next/font/google";
import { questions } from "@/src/data/questions";
import { resultMessages } from "@/src/data/resultMessage";
import { Button } from "@/src/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Progress } from "@/src/components/ui/progress";
import { Label } from "@/src/components/ui/label";
import { feedbackMessages } from "@/src/data/feedbackMessage";
import { useRouter } from "next/navigation";

const poetsen = Poetsen_One({ subsets: ["latin"], weight: "400" });

export default function Quiz() {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const confettiRef = useRef(null);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

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
      confettiEffect();
    } else {
      setWrongCount((prev) => prev + 1);
      setFeedbackType(`erro${Math.min(wrongCount + 1, 3)}`);
      setShowCorrectMessage(true);
    }
  }

  function confettiEffect() {
    if (typeof window !== "undefined") {
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
          colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors,
        });
        requestAnimationFrame(frame);
      };

      frame();
    }
  }

  function confettiEmission() {
    const scalar = 3;
    const crocodile = confetti.shapeFromText({ text: "🐊", scalar });

    const defaults = {
      spread: 450,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 20,
      shapes: [crocodile],
      scalar,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
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
      if (correctCount > wrongCount) {
        confettiEmission();
      }
    }

    if (currentQuestionIndex + 1 === questions.length) {
      setQuizFinished(true);
    }
  }

  function restartQuiz() {
    setSelectedAnswer(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCorrectCount(0);
    setWrongCount(0);
    setTotalAnswered(0);
    setShowCorrectMessage(false);
    setFeedbackType(null);
    setQuizFinished(false);
  }

  function getResultData() {
    if (correctCount >= 8) return resultMessages.high;
    if (correctCount >= 5) return resultMessages.medium;
    return resultMessages.low;
  }

  if (quizFinished) {
    const { image, message } = getResultData();

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-carnaval-bg bg-cover bg-center p-24">
        <div className="bg-zinc-300 p-12 flex flex-col gap-4 rounded-t-3xl justify-center items-center w-full">
          <h3 className="text-4xl text-bold text-zinc-800">
            {correctCount}/{totalAnswered}
          </h3>
          <p className="text-4xl font-normal text-zinc-800">acertos</p>
          <Image
            src={image}
            alt="Resultado"
            width={400}
            height={400}
            className="mb-6"
          />
          <h1
            className={` text-zinc-800 text-4xl font-bold text-center mb-6`}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
        <div className="bg-zinc-100 p-12 flex flex-col gap-8 rounded-b-3xl w-full">
          <h3 className="text-4xl text-bold text-zinc-800">
            Fim do SABER FOLIA
          </h3>
          <p className="text-4xl font-normal text-zinc-800">
            Curtiu o quiz? Agora é só cair na folia e espalhar a alegria!
          </p>
          <div className="flex flex-row gap-4">
            <Button
              onClick={() => router.push("/")}
              className="text-white text-3xl shadow-elevationfour p-8 bg-button-grayramp flex items-center gap-2"
            >
              Preciso descansar
            </Button>
            <Button
              onClick={restartQuiz}
              className="text-white text-3xl shadow-elevationfour p-8 bg-button-react flex items-center gap-2"
            >
              <RotateCcw /> Foliar de novo
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          <div
            className={`grid gap-8 ${
              currentQuestion.options.some((option) => option.image)
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {currentQuestion.options.map((option, optionIndex) => {
              const isSelected = selectedAnswer === option.text;
              return (
                <div
                  key={optionIndex}
                  className={`flex items-center  p-8 h-30 bg-button-answer rounded-md shadow-elevationfour transition-opacity duration-300 ${
                    currentQuestion.options.some((option) => option.image)
                      ? "w-[280px] h-[280px]"
                      : ""
                  } ${
                    isSelected
                      ? "border-4 border-yellow-400"
                      : "border-4 border-transparent"
                  }`}
                >
                  <RadioGroupItem
                    value={option.text}
                    id={`q${currentQuestion.id}-option${optionIndex}`}
                    className="hidden"
                  />
                  <Label
                    htmlFor={`q${currentQuestion.id}-option${optionIndex}`}
                    className="text-white text-3xl w-full"
                  >
                    {option.image ? (
                      <div className="flex flex-col justify-center items-center gap-2 ">
                        <Image
                          src={option.image}
                          alt={option.text}
                          width={100}
                          height={100}
                          className="w-24 h-24 object-cover"
                        />
                        <span className="text-center text-2xl">
                          {option.text}
                        </span>
                      </div>
                    ) : (
                      option.text
                    )}
                  </Label>
                </div>
              );
            })}
          </div>
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
