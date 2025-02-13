type OptionWithAudio = {
  text: string;
  audio: string;
};

type OptionWithImage = {
  text: string;
  image: string | null;
};

type OptionClear = {
  text: string;
};

export type Option = OptionWithAudio | OptionWithImage | OptionClear;
