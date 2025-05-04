// src/components/sections/About.jsx
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { Footer } from "./Footer";
import PageButtons from "../layout/PageButtons";

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(index == 2){
    navigate("/chatbot");}
    else if(index == 0){
    navigate("/cheap-groceries");}
    else if(index == 1){
    navigate("/price-match");}
    else if(index == 3){
    navigate("/recipe-finder");}
  };

  return (
    <button onClick={handleClick}>
    <Tilt
      glareEnable
      tiltEnable
      tiltMaxAngleX={30}
      tiltMaxAngleY={30}
      glareColor="#aaa6c3"
    >
      <div className="max-w-[250px] w-full xs:w-[250px]">
        <motion.div
          variants={fadeIn("right", "spring", index * 0.5, 0.75)}
          className="green-pink-gradient shadow-card w-full rounded-[20px] p-[1px]"
        >
          <div className="bg-tertiary flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] px-12 py-5">
            <img
              src={icon}
              alt={title}
              className="h-16 w-16 object-contain"
            />

            <div
              
              className="text-center text-[20px] font-bold text-white mt-2"
              
            >
              {title}
            </div>
          </div>
        </motion.div>
      </div>
    </Tilt>
    </button>
  );
};

const AboutSection: React.FC = () => (
  <>
  <PageButtons/>
    <Header useMotion={true} {...config.sections.about} />

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="text-secondary mt-4 max-w-3xl text-[17px] leading-[30px]"
    >
      {config.sections.about.content}
    </motion.p>

    <div className="mt-20 flex flex-wrap gap-10 max-sm:justify-center">
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
    
  </>
);

export default SectionWrapper(AboutSection, "about");
