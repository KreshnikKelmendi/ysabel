"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const AboutUsinHomePage = () => {
    const easeBezier = [0.16, 1, 0.3, 1] as const;

    const leftVariants: Variants = {
        hidden: { x: -40, opacity: 0 },
        visible: (i = 1) => ({
            x: 0,
            opacity: 1,
            transition: { delay: 0.12 * i, duration: 0.9, ease: easeBezier }
        })
    };
    const rightVariants: Variants = {
        hidden: { x: 40, opacity: 0 },
        visible: (i = 1) => ({
            x: 0,
            opacity: 1,
            transition: { delay: 0.18 + 0.12 * i, duration: 1.0, ease: easeBezier }
        })
    };
    const bottomVariants: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0, opacity: 1,
            transition: { delay: 0.5, duration: 1.05, ease: easeBezier }
        }
    };

    return (
        <div className="relative bg-[#1D3428] px-6 lg:px-24 overflow-hidden">
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto overflow-hidden">
                <motion.div
                    className="lg:w-[30%] h-full flex flex-col lg:justify-center gap-6 py-16 lg:py-64"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    <motion.div
                        className="relative w-full sm:w-44 md:w-56 lg:w-72 xl:w-80 aspect-[327/252] overflow-hidden"
                        variants={leftVariants}
                        custom={1}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <Image
                            src="/assets/ysabel-1.JPG"
                            alt="Main"
                            fill
                            priority
                            sizes="(min-width:1280px) 20rem, (min-width:1024px) 18rem, (min-width:768px) 14rem, (min-width:640px) 11rem, 8rem"
                            className="object-contain"
                        />
                    </motion.div>
                    <motion.p
                        className="text-[#BDBDB9] font-roboto text-[20px] text-left lg:pt-6"
                        variants={leftVariants}
                        custom={2}
                        style={{ willChange: "transform, opacity" }}
                    >
                        In the heart of Prishtina, Ysabel Society blends modern gastronomy with Mediterranean soul.
                    </motion.p>
                </motion.div>
                <motion.div
                    className="lg:w-[70%] h-full flex flex-col lg:pl-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.28 }}
                >
                    <div className="flex flex-col lg:flex-row lg:justify-center">
                        <motion.p
                            className="text-5xl lg:text-[60px] z-30 relative font-rhiffiral lg:pt-32 text-[#BDBDB9] text-center leading-tight lg:w-[633px]"
                            variants={rightVariants}
                            custom={1}
                            style={{ willChange: "transform, opacity" }}
                        >
                            “Temple of taste and atmosphere.”
                        </motion.p>
                        <motion.div
                            className="relative h-[243px] lg:mt-20 overflow-hidden"
                            variants={rightVariants}
                            custom={2}
                            style={{ willChange: "transform, opacity" }}
                        >
                            <img
                                src="/assets/ysabel-3.JPG"
                                alt="Main"
                                className="object-contain h-full w-full"
                            />
                        </motion.div>
                    </div>
                    <motion.div className="w-full relative overflow-hidden"
                        variants={bottomVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <img src="/assets/ysabel-2.JPG" alt="Main" className="object-cover py-10 w-full h-full" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUsinHomePage;


