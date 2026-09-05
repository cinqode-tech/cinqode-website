'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export function HeroArtwork() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="hero-artwork" aria-hidden="true">
      <div className="art-halo halo-one" />
      <div className="art-halo halo-two" />
      <motion.div
        className="orbit orbit-a"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="orbit orbit-b"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 31, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="hero-object"
        animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image src="/cinqode-hero-art-v2.png" alt="" width={1300} height={1209} priority />
      </motion.div>
      <motion.span className="floating-tag tag-ai" animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>AI Solutions</motion.span>
      <motion.span className="floating-tag tag-web" animate={reduceMotion ? undefined : { y: [0, 6, 0] }} transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut' }}>Web &amp; Mobile</motion.span>
      <motion.span className="floating-tag tag-cloud" animate={reduceMotion ? undefined : { y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>Cloud &amp; Server</motion.span>
      <motion.span className="floating-tag tag-design" animate={reduceMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>Design &amp; Edit</motion.span>
    </div>
  );
}
