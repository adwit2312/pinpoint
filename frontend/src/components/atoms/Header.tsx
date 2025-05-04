import React from "react";
import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { textVariant } from "../../utils/motion";

interface IHeader {
  useMotion: boolean;
  p: string;
  h2: string;
  titleParts?: [string, string]; // 👈 added this
}

export const Header: React.FC<IHeader> = ({ useMotion, p, h2, titleParts }) => {
  const Content = () => (
    <>
      <p className={styles.sectionSubText}>{p}</p>
      <h2 className={styles.sectionHeadText}> 
        {titleParts ? (
          <>
            {titleParts[0]}
           
            <span className="text-[#FF3C57]">{titleParts[1]}</span>
          </>
        ) : (
          <>
          
          {h2}
          <span className={`${styles.heroHeadText} text-white`}>
                      <span className="text-red-500">Pin</span>
                      <span className="text-[brown] ml-2">Point</span>
          </span>
          </>
        )}
      </h2>
    </>
  );

  return useMotion ? (
    <motion.div variants={textVariant()}>
      <Content />
    </motion.div>
  ) : (
    <Content />
  );
};
