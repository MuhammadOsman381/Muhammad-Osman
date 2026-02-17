import { useContext } from "react";
import { MyContext } from "../Context";

interface MyContextType {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Education = () => {
  const context: MyContextType | any = useContext(MyContext);
  const { isDarkMode } = context;

  return (
    <section
      id="education"
      className={`${isDarkMode
        ? "bg-zinc-950 text-white"
        : "bg-zinc-100 text-black"
        } rounded-xl flex flex-col items-center justify-center py-16 px-6 md:px-12`}
    >
      {/* Section Title Button */}
      <button
        className={`
          relative text-sm py-2 px-6 rounded-full transition-all duration-300
          mb-10
          ${isDarkMode
            ? "bg-zinc-800 text-zinc-200 shadow-[0_0_10px_rgba(244,244,245,0.35)] hover:shadow-[0_0_25px_rgba(244,244,245,0.6)]"
            : "bg-zinc-900 text-zinc-100 shadow-[0_0_10px_rgba(113,113,122,0.6)] hover:shadow-[0_0_25px_rgba(113,113,122,0.9)]"
          }
        `}
      >
        Education
      </button>

      {/* Cards */}
      <div className="max-sm:p-3 p-5 w-full bg-zinc-900 rounded-3xl border border-zinc-700" >
        <div className="flex flex-col gap-3  max-w-full w-full">
          {/* BSCS */}
          <div className={`p-4 rounded-2xl bg-zinc-950 border-l-4 border-zinc-700  `}>
            <h3 className="text-md font-semibold">
              Bachelor of Science in Computer Science (BSCS)
            </h3>
            <p className="text-zinc-400 mt-2 text-sm">
              National Fertilizer Corporation Institute of Engineering & Technology (NFC-IET),
              Multan, Pakistan
            </p>
            <p className="mt-3 text-xs">
              Nov 2022 – Jul 2026 (Expected Graduation)
            </p>
          </div>

          {/* Intermediate */}
          <div className={`p-4 rounded-2xl  bg-zinc-950 border-l-4 border-zinc-700 `}>
            <h3 className="text-md font-semibold">
              Intermediate in Computer Science
            </h3>
            <p className="text-zinc-400 mt-2 text-sm">
              Board of Intermediate and Secondary Education (BISE), Faisalabad
            </p>
            <p className="mt-3 text-xs">
              Pirmahal | 2020 – 2022
            </p>
          </div>

          {/* Matric */}
          <div className={`p-4 bg-zinc-950 border-l-4 border-zinc-700 rounded-2xl  `}>
            <h3 className="text-md font-semibold">
              Secondary School Certificate (Science)
            </h3>
            <p className="text-zinc-400 mt-2 text-sm">
              Board of Intermediate and Secondary Education (BISE), Faisalabad
            </p>
            <p className="mt-3 text-xs">
              Pirmahal | 2018 – 2020
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;