import { motion } from "framer-motion";

export function IconSignature(props: any) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-signature"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="still"
      variants={props.variants}
      animate={props.animate}
      custom={props.custom}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <motion.path
        d="M3 17c3.333 -3.333 5 -6 5 -8c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 4.877 2.5 6c1.5 2 2.5 2.5 3.5 1l2 -3c.333 2.667 1.333 4 3 4c.53 0 2.639 -2 3 -2c.517 0 1.517 .667 3 2"
        variants={props.variants}
      ></motion.path>
    </motion.svg>
  );
}

export function IconZodiacAries(props: any) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-zodiac-aries"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="still"
      variants={props.variants}
      animate={props.animate}
      custom={props.custom}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <motion.path
        d="M12 5a5 5 0 1 0 -4 8"
        variants={props.variants}
      ></motion.path>
      <motion.path
        d="M16 13a5 5 0 1 0 -4 -8"
        variants={props.variants}
      ></motion.path>
      <motion.path d="M12 21l0 -16" variants={props.variants}></motion.path>
    </motion.svg>
  );
}

export function IconCircleCheck(props: any) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-circle-check"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="still"
      variants={props.variants}
      animate={props.animate}
      custom={props.custom}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <motion.path
        d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
        variants={props.variants}
      ></motion.path>
      <motion.path d="M9 12l2 2l4 -4" variants={props.variants}></motion.path>
    </motion.svg>
  );
}

export function IconNextJS(props: any) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-brand-nextjs"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={props.variants}
      animate={props.controls}
      custom={props.custom}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <motion.path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993"></motion.path>
      <motion.path d="M15 12v-3"></motion.path>
    </motion.svg>
  );
}

export function IconSass(props: any) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-brand-sass"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={props.variants}
      animate={props.controls}
      custom={props.custom}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <motion.path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></motion.path>
      <motion.path d="M12 10.523c2.46 -.826 4 -.826 4 -2.155c0 -1.366 -1.347 -1.366 -2.735 -1.366c-1.91 0 -3.352 .49 -4.537 1.748c-.848 .902 -1.027 2.449 -.153 3.307c.973 .956 3.206 1.789 2.884 3.493c-.233 1.235 -1.469 1.823 -2.617 1.202c-.782 -.424 -.454 -1.746 .626 -2.512s2.822 -.992 4.1 -.24c.98 .575 1.046 1.724 .434 2.193"></motion.path>
    </motion.svg>
  );
}

export function IconFramer(props: any) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-brand-framer"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={props.variants}
      animate={props.controls}
      custom={props.custom}
    >
      <motion.path stroke="none" d="M0 0h24v24H0z" fill="none"></motion.path>
      <motion.path d="M6 15h12l-12 -12h12v6h-12v6l6 6v-6"></motion.path>
    </motion.svg>
  );
}

export function IconMDX(props: any) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-markdown"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={props.variants}
      animate={props.controls}
      custom={props.custom}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <motion.path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></motion.path>
      <motion.path d="M7 15v-6l2 2l2 -2v6"></motion.path>
      <motion.path d="M14 13l2 2l2 -2m-2 2v-6"></motion.path>
    </motion.svg>
  );
}
