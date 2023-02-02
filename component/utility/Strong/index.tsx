import { motion } from "framer-motion";

export default function Strong({ children }: { children: any }) {
  return <motion.strong whileHover={{ scale: 1.2 }}>{children}</motion.strong>;
}
