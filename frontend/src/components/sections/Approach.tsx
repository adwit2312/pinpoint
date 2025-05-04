"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../../lib/utils";

import { CanvasRevealEffect } from "../ui/canvas-reveal-effect";
import { MagicButton } from "../ui/magic-button";
import { useNavigate } from "react-router-dom";

export const Approach = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const navigate = useNavigate();
  const handleClick = () => {
     

      navigate("/");}
    
  

  return (
    <section className="w-full py-12">
<h1 className="heading text-center text-3xl font-bold">
  <span className="text-red">PinPoints'</span> Additional Features
</h1>


      <div className="my-10 flex flex-col items-center justify-center gap-4 lg:flex-row">
        {/* ✅ Card 1: Cardio Compass */}
        <CardWithImage
          hovered={hoveredCard === "cardio"}
          setHovered={(v) => setHoveredCard(v ? "cardio" : null)}
          image="cardioCompass.png"
          title="Lose Weight Quicker (COMING SOON!)"
          description="No more guessing at the gym. Cardio Compass guides you to the perfect machine for your fitness goals—burn fat, build stamina, or go beast mode, all based on your personal profile."
          buttonTitle="Cardio Compass"
        />

        {/* ✅ Card 2: MealSync AI */}
        <CardWithImage
          hovered={hoveredCard === "meal"}
          setHovered={(v) => setHoveredCard(v ? "meal" : null)}
          image="mealai.png"
          title="Meal Planning AI (COMING SOON!)"
          description="Syncs meals to your habits, schedule, and health preferences with smart suggestions."
          buttonTitle="MealSync AI"
        />

        {/* ✅ Card 3: CampusChef */}
        <CardWithImage
          hovered={hoveredCard === "chef"}
          setHovered={(v) => setHoveredCard(v ? "chef" : null)}
          image="campusChef.png"
          title="Campus Cooking (COMING SOON!)"
          description="Curated meal plans and recipes for students with limited time and budgets."
          buttonTitle="CampusChef"
        />
      </div>
    </section>
  );
};

// 🔁 Image-based card
const CardWithImage = ({
  hovered,
  setHovered,
  image,
  title,
  description,
  buttonTitle,
}: {
  hovered: boolean;
  setHovered: (v: boolean) => void;
  image: string;
  title: string;
  description: string;
  buttonTitle: string;
}) => {
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative mx-auto flex w-full max-w-[17rem] items-center justify-center rounded-2xl border-[3px] border-red-600 p-4 lg:h-[22rem] overflow-hidden"
    >
      {/* ✅ Background image with inline style */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 0 : 1 }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{ backgroundImage: `url('/${image}')` }}
      />

      {/* ✅ Center button */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 0 : 1 }}
        className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center transition duration-300"
      >
        <MagicButton title={buttonTitle} asChild />
      </motion.div>

      {/* ✅ Hover content */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-20 text-center"
          >
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p
              className="mt-2 text-sm font-medium text-white"
              style={{ color: "#e4ecff" }}
            >
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧩 decorative corners */}
      <Icon className="absolute -left-2 -top-2 h-4 w-4 text-white/40" />
      <Icon className="absolute -bottom-2 -left-2 h-4 w-4 text-white/40" />
      <Icon className="absolute -right-2 -top-2 h-4 w-4 text-white/40" />
      <Icon className="absolute -bottom-2 -right-2 h-4 w-4 text-white/40" />
    </div>
  );
};

export const Icon = ({ className, ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
