"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [showPreparationScreen, setShowPreparationScreen] = useState(false);

  function handleStartQuiz() {
    router.push("/quiz");
  }

  function enterFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Erro ao entrar em tela cheia: ${err.message}`);
      });
    }
    setShowPreparationScreen(true);
  }

  if (!showPreparationScreen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-carnaval-bg bg-cover bg-center p-24 w-full">
        <div className="absolute inset-0 flex flex-col items-center justify-between bg-black bg-opacity-60 backdrop-blur-md transition-opacity duration-500 p-48">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={500}
            height={500}
            className=""
          />
          <div className="flex  flex-col h-40 gap-8">
            <Button
              onClick={enterFullScreen}
              className="text-white text-3xl shadow-elevationfour p-8 bg-button-react"
            >
              Bora começar a festa?
            </Button>
            <Image
              src="/dagua.svg"
              alt="Logo"
              width={500}
              height={500}
              className=""
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-carnaval-bg bg-cover bg-center p-24">
      <div className="bg-zinc-200 p-12 flex flex-col gap-4 rounded-t-3xl justify-center items-center w-full ">
        <Image
          src="/logo.svg"
          alt="Resultado"
          width={400}
          height={400}
          className="mb-6"
        />
      </div>
      <div className="bg-zinc-100 p-12 flex flex-col gap-8 rounded-b-3xl w-full items-center">
        <p className="text-2xl font-normal text-zinc-800 text-center">
          Vamos testar seus conhecimentos carnavalescos? <br /> Os Jacarés
          Foliantes te acompanharão neste game!
        </p>
        <Image
          src="/metade.svg"
          alt="Resultado"
          width={400}
          height={400}
          className="mb-6"
        />
        <Button
          onClick={handleStartQuiz}
          className="text-white text-3xl shadow-elevationfour p-8 bg-button-react flex items-center gap-2"
        >
          Iniciar
        </Button>
      </div>
    </div>
  );
}
