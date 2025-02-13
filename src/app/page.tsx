"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { Maximize } from "lucide-react";
import confetti from "canvas-confetti";

export default function Page() {
  const router = useRouter();
  const [showPreparationScreen, setShowPreparationScreen] = useState(false);
  const [confettiIntervalId, setConfettiIntervalId] =
    useState<NodeJS.Timeout | null>(null);

  function showConfetti() {
    const duration = 2 * 1000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const animationEnd = Date.now() + duration;

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(confettiInterval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }, duration);

    return interval;
  }

  useEffect(() => {
    if (!showPreparationScreen) {
      const intervalId = showConfetti();
      setConfettiIntervalId(intervalId);
    }

    return () => {
      if (confettiIntervalId) {
        clearInterval(confettiIntervalId);
        setConfettiIntervalId(null);
      }
    };
  }, [showPreparationScreen]);

  function stopConfetti() {
    if (confettiIntervalId) {
      clearInterval(confettiIntervalId);
      setConfettiIntervalId(null);
    }
  }

  function handlePreparationScreen() {
    stopConfetti();
    setShowPreparationScreen(true);
  }

  function backStart() {
    setShowPreparationScreen(false);
  }

  function handleStartQuiz() {
    stopConfetti();
    router.push("/quiz");
  }

  function goFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  }

  if (!showPreparationScreen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-carnaval-bg bg-cover bg-center p-24 w-full">
        <Button
          onClick={goFullscreen}
          className="absolute top-6 right-6 bg-black bg-opacity-50 text-white p-3 rounded-full shadow-md hover:bg-opacity-70 transition z-10"
        >
          <Maximize size={32} strokeWidth={3} />
        </Button>
        <div
          className="absolute inset-0 flex flex-col items-center gap-24
         bg-black bg-opacity-60 backdrop-blur-md transition-opacity duration-500 pt-16"
        >
          <Image
            src="/dagua.svg"
            alt="Logo"
            width={200}
            height={200}
            className="pt-8"
          />
          <Image
            src="/logo.svg"
            alt="Logo"
            width={500}
            height={500}
            className="animate-shake"
          />
          <div className="flex  flex-col h-40 gap-12 items-center">
            <Button
              onClick={handlePreparationScreen}
              className="text-white text-3xl shadow-elevationfour p-8 bg-button-react animate-tada"
            >
              Bora começar a festa?
            </Button>
          </div>
        </div>
      </div>
    );
  }

  console.log("Você ta na tela de começar ?", showPreparationScreen);

  return (
    <div className="flex flex-col items-center  min-h-screen bg-carnaval-bg bg-cover bg-center w-full p-12">
      <div className="bg-zinc-200 p-6 flex flex-col gap-4 rounded-t-3xl justify-center items-center w-full shadow-elevationcard">
        <Image
          src="/logoblack.svg"
          alt="Resultado"
          width={200}
          height={200}
          className="mb-6"
        />
      </div>
      <div className="bg-zinc-100 p-10 flex flex-col gap-4 rounded-b-3xl w-full items-center">
        <p className="text-2xl font-normal text-zinc-800 text-center">
          Vamos testar seus conhecimentos carnavalescos?
        </p>
        <p className="text-2xl font-normal text-zinc-800 text-center">
          {" "}
          Os <b>Jacarés Foliantes</b> te acompanharão neste game!
        </p>
        <Image
          src="/logoalt.svg"
          alt="Resultado"
          width={400}
          height={400}
          className="mb-6"
        />
        <div className="flex flex-row gap-2">
          <Button
            onClick={backStart}
            className="text-white text-3xl shadow-elevationfour p-8 bg-button-grayramp flex items-center gap-2 "
          >
            Agora não
          </Button>
          <Button
            onClick={handleStartQuiz}
            className="text-white text-3xl shadow-elevationfour p-8 bg-button-react flex items-center gap-2"
          >
            Iniciar
          </Button>
        </div>
      </div>
    </div>
  );
}
