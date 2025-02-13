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
import { AudioPlayer } from "@/src/components/audio-player";

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
  const [customErrorMessage, setCustomErrorMessage] = useState<string | null>(
    null
  );
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showHalfwayMessage, setShowHalfwayMessage] = useState(false);

  function handleAnswerChange(answer: string) {
    const selectedOption = currentQuestion.options.find(
      (option) => option.text === answer
    );

    if (selectedOption) {
      setSelectedAnswer(answer);

      if ("audio" in selectedOption) {
        setAudioSrc(selectedOption.audio);
      }
    }
  }

  function stopAudio() {
    setAudioSrc(null);
  }

  function handleNextQuestion() {
    if (selectedAnswer === currentQuestion.answer) {
      setCorrectCount((prev) => prev + 1);
      setFeedbackType(`acerto${Math.min(correctCount + 1, 3)}`);
      setShowCorrectMessage(true);
      confettiEffect();
    } else {
      setWrongCount((prev) => prev + 1);
      setFeedbackType(`erro${Math.min(wrongCount + 1, 3)}`);
      setShowCorrectMessage(true);
      setCustomErrorMessage(`${currentQuestion.answer}`);
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
    stopAudio();
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
      <div className="flex flex-row justify-center items-stretch min-h-screen bg-carnaval-bg bg-cover bg-center p-14 py-28">
        <div className="bg-zinc-100 p-12 flex flex-col rounded-l-3xl justify-center items-center w-full shadow-custom">
          <h3 className="text-4xl text-bold text-zinc-800 text-center">
            <b>
              {correctCount}/{totalAnswered}
            </b>
            <br />
            acertos
          </h3>

          <Image
            src={image}
            alt="Resultado"
            width={250}
            height={250}
            className="my-6"
          />
          <h1
            className={` text-zinc-800 text-2xl font-bold text-center pt-4`}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
        <div className="bg-zinc-300 p-12 flex flex-col gap-8 rounded-r-3xl justify-center w-full">
          <div className="flex flex-row items-center gap-4">
            <h3 className="text-3xl text-bold text-zinc-800">Fim do</h3>
            <Image
              src="/logoblack.svg"
              alt="Fim do saberfolia"
              width={250}
              height={250}
            />
          </div>

          <p className="text-3xl font-normal text-zinc-800">
            Curtiu o quiz? Agora é só cair na folia e espalhar a alegria!
          </p>
          <div className="flex flex-row gap-4 pt-8">
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
      <div className="flex gap-8 flex-col py-20 px-40  bg-blue rounded-b-[120px] shadow-custom">
        <Progress
          value={(currentQuestionIndex / questions.length) * 100}
          className="h-5"
        />
        <h1 className="text-5xl font-bold text-center text-white ">
          {currentQuestion.question}
        </h1>
      </div>

      <div className="flex flex-col gap-8 py-12 items-center">
        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={(value) => handleAnswerChange(value)}
        >
          <div
            className={`grid  gap-4 ${
              currentQuestion.options.some((option) => "image" in option)
                ? "grid-cols-4"
                : "grid-cols-2 w-screen px-28"
            }`}
          >
            {currentQuestion.options.map((option, optionIndex) => {
              const isSelected = selectedAnswer === option.text;
              return (
                <div
                  key={optionIndex}
                  className={`flex items-center px-8 h-28 bg-button-answer rounded-md shadow-elevationfour transition-opacity duration-300 ${
                    currentQuestion.options.some((option) => "image" in option)
                      ? "w-[280px] h-[260px]"
                      : "grid-cols-1"
                  } ${isSelected ? "border-4 border-yellow-400" : ""}`}
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
                    {"image" in option ? (
                      <div className="flex flex-col justify-center items-center gap-4">
                        <Image
                          src={option.image || ""}
                          alt={option.text}
                          width={150}
                          height={150}
                          className="object-cover"
                        />
                        <span className="text-center text-2xl">
                          {option.text}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        {"audio" in option && (
                          <Image
                            src="/audioindicator.svg"
                            alt="Áudio"
                            width={36}
                            height={24}
                            className="object-cover"
                          />
                        )}
                        <span>{option.text}</span>
                      </div>
                    )}
                  </Label>
                </div>
              );
            })}
          </div>
        </RadioGroup>
      </div>

      {audioSrc && <AudioPlayer src={audioSrc} />}

      <div className="flex justify-center">
        <Button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="text-white text-2xl shadow-elevationfour p-8 bg-button-react font-bold "
        >
          {" "}
          Avançar
          <ArrowRight />
        </Button>
      </div>

      {(showCorrectMessage || showHalfwayMessage) && feedbackType && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-feedback backdrop-blur-md transition-opacity duration-500 ">
          {feedbackType.startsWith("erro") && customErrorMessage && (
            <div className="flex flex-col ">
              <h2
                className={`${poetsen.className} text-white text-3xl font-bold text-center mb-6`}
              >
                A resposta correta é: <br />{" "}
                <span
                  className={`${poetsen.className}  text-3xl font-bold text-center text-yellow-400`}
                >
                  {customErrorMessage}
                </span>
              </h2>
            </div>
          )}

          <Image
            src={feedbackMessages[feedbackType].image}
            alt="Feedback"
            width={300}
            height={300}
            className="mb-4"
          />
          <h2
            className={`${poetsen.className} text-white text-3xl font-bold text-center mb-6`}
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
