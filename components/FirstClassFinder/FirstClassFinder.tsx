"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import type { Session } from "@/lib/schedule";
import { business } from "@/lib/business";
import { classByKey } from "@/lib/classes";
import { BookButton } from "@/components/ui/BookButton";
import { Spots } from "@/components/ui/Spots";
import { Avatar } from "@/components/ui/Avatar";
import { SeeTimesButton } from "@/components/ui/SeeTimesButton";
import { experienceOptions, goalOptions, matchClass, type Experience, type Goal } from "./finder-rules";

const loadFeatures = () => import("@/lib/motion-features").then((r) => r.default);

function OptionGroup<T extends string>({
  name,
  legend,
  step,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  step: number;
  options: readonly { key: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="flex items-baseline gap-3 font-display text-h3">
        <span className="tnum text-[0.9375rem] font-sans font-semibold text-teal">0{step}</span>
        {legend}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.key;
          return (
            <label
              key={o.key}
              className={`relative inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[0.9375rem] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal ${
                on ? "border-teal bg-mist text-ink" : "border-line bg-surface text-ink hover:border-teal"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.key}
                checked={on}
                onChange={() => onChange(o.key)}
                className="sr-only"
              />
              {on && <Check aria-hidden="true" className="size-4 text-teal" strokeWidth={2.25} />}
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function TimeRow({ s }: { s: Session }) {
  return (
    <li className="grid gap-3 border-t border-line py-4 first:border-t-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar src={s.teacherPhoto} name={s.teacher} size={40} decorative />
        <p className="min-w-0 leading-snug">
          <span className="tnum block font-display text-[1.25rem] leading-tight sm:whitespace-nowrap">
            {s.dateLabel}, {s.timeLabel}
          </span>
          <span className="text-[0.9375rem] text-muted">with {s.teacher}</span>
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 sm:justify-end">
        <Spots remaining={s.remaining} capacity={s.capacity} className="text-[0.9375rem]" />
        <BookButton session={s} size="sm" className="w-full sm:w-auto" />
      </div>
    </li>
  );
}

export function FirstClassFinder({ upcoming }: { upcoming: Record<string, Session[]> }) {
  const reduce = useReducedMotion();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const match = experience && goal ? matchClass(experience, goal) : null;
  const main = match ? classByKey(match.main) : undefined;
  const also = match?.also ? classByKey(match.also) : undefined;
  const times = match ? (upcoming[match.main] ?? []).slice(0, 3) : [];
  const resultRef = useRef<HTMLDivElement>(null);
  const resultKey = match ? `${match.main}-${experience}` : "";

  // On phones the result opens below the questions. Bring the matched class name into view.
  useEffect(() => {
    const el = resultRef.current;
    if (!resultKey || !el || window.matchMedia("(min-width: 1024px)").matches) return;
    const id = window.setTimeout(() => {
      const top = el.getBoundingClientRect().top;
      if (top < 80 || top > window.innerHeight * 0.6) {
        el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
      }
    }, 60);
    return () => window.clearTimeout(id);
  }, [resultKey, reduce]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-10 lg:col-span-5">
          <OptionGroup
            name="experience"
            step={1}
            legend="Have you done Pilates on equipment before?"
            options={experienceOptions}
            value={experience}
            onChange={setExperience}
          />
          <OptionGroup name="goal" step={2} legend="What are you after?" options={goalOptions} value={goal} onChange={setGoal} />
        </div>

        <div ref={resultRef} className="scroll-mt-24 lg:col-span-7" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            {!main ? (
              <m.div
                key="empty"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex min-h-32 items-center rounded-[14px] border border-dashed border-line p-6 sm:p-8"
              >
                <p className="measure text-muted">
                  {experience || goal
                    ? "One more answer and your class appears here, with its next real times."
                    : "Answer both questions and your class appears here, with its next real times."}
                </p>
              </m.div>
            ) : (
              <m.article
                key={resultKey}
                aria-label={`Your first class: ${main.name}`}
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduce ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="card overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <p className="eyebrow text-teal">Your first class</p>
                  <h3 className="mt-2 text-h2">{main.name}</h3>
                  <p className="tnum mt-2 text-[0.9375rem] text-muted">
                    {main.length} <span aria-hidden="true">·</span> ${main.price} single class
                    {main.levelNote ? ` · ${main.levelNote}` : ""}
                  </p>
                  <p className="measure mt-4">{main.description}</p>
                  {main.extraNote && (
                    <p className="measure mt-3 rounded-[10px] bg-mist px-4 py-3 text-[0.9375rem]">{main.extraNote}</p>
                  )}

                  <h4 className="mt-7 eyebrow text-muted">Next times</h4>
                  {times.length > 0 ? (
                    <ul className="mt-1">
                      {times.map((s) => (
                        <TimeRow key={s.id} s={s} />
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3">
                      No upcoming times right now.{" "}
                      <a href={business.momence.consultation} className="link">
                        Book a free 15 minute consultation
                      </a>
                    </p>
                  )}

                  {also && (
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                      <p>
                        <span className="text-muted">Also for you: </span>
                        <span className="font-semibold">{also.name}</span>
                        {also.levelNote && <span className="text-muted">. {also.levelNote}</span>}
                      </p>
                      <SeeTimesButton cls={also.key} label={also.shortName} />
                    </div>
                  )}
                </div>
                <p className="border-t border-line bg-ivory px-6 py-4 text-[0.9375rem] sm:px-8">
                  {business.newcomerAdvice}{" "}
                  <a href={business.momence.consultation} className="link">
                    Book a free 15 minute consultation
                  </a>
                </p>
              </m.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  );
}
