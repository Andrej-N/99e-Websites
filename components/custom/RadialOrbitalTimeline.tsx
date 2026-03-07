'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ClipboardList, Paintbrush, Code2, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

const ICON_MAP = {
  ClipboardList,
  Paintbrush,
  Code2,
  Rocket,
};
type IconName = keyof typeof ICON_MAP;

export function RadialOrbitalTimeline() {
  const { t } = useLanguage();

  const features = t.process.steps.map((step: any) => ({
    title: step.title,
    description: step.description,
    icon: ICON_MAP[step.icon as IconName] ?? ClipboardList,
  }));

  return (
    <section id="process" className="py-24 px-6 md:px-12 bg-background border-y border-border/10">
      <div className="mx-auto w-full max-w-6xl space-y-12">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-4 glow-text tracking-wide text-balance xl:font-extrabold">
            {t.process.title}
          </h2>
          <p className="text-foreground-secondary mt-4 text-base tracking-wide text-balance md:text-lg">
            {t.process.subtitle}
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature: any, i: number) => (
            <div key={i} className="border border-border/40 rounded-2xl bg-card overflow-hidden transition-colors hover:border-primary/30">
              <FeatureCard feature={feature} className="h-full" />
            </div>
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>['className'];
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
