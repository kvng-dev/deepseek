import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";

interface Props {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
const PromptBox = ({ isLoading, setIsLoading }: Props) => {
  const [prompt, setPrompt] = useState("");
  console.log(isLoading, setIsLoading);

  return (
    <form
      className={`w-full ${
        false ? "max-w-3xl" : "max-w-2xl"
      } bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
    >
      <textarea
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
        rows={2}
        placeholder="Message DeepSeek"
        required
      />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-xs cursor-pointer border border-gray-300/40 px-2 py-1 rounded-full hover:bg-gray-500/20 transition">
            <Image alt="" src={assets.deepthink_icon} className="h-5" />
            DeepThink (R1)
          </p>
          <p className="flex items-center gap-2 text-xs cursor-pointer border border-gray-300/40 px-2 py-1 rounded-full hover:bg-gray-500/20 transition">
            <Image alt="" src={assets.search_icon} className="h-5" />
            Search (R1)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image alt="" src={assets.pin_icon} className="w-4 cursor-pointer" />
          <button
            className={`${
              prompt ? "bg-primary" : "bg-[#71717a]"
            } rounded-full p-2 cursor-pointer`}
          >
            <Image
              alt=""
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              className="w-3.5 aspect-square"
            />
          </button>
        </div>
      </div>
    </form>
  );
};
export default PromptBox;
