import { Json } from "utils/supabase/client";

/* eslint-disable prettier/prettier */
export const quizResults = [
  "Scholar",
  "Shipper",
  "Whale",
  "Merch Collector",
  "Hypeman",
  "Dreamer",
  "Creative",
  "Casual Fan",
  "Connoisseur"
];

export type QuizResult = (typeof quizResults)[number];

export interface QuizQuestion {
  question: string;
  associatedResult: QuizResult;
  selectedOption?: number;
}

export interface QuizDBItem {
  created_at: string
  id: number
  result_id: number | null
  result_name: string | null
  result_values: Json | null
}

export const quizQuestions: QuizQuestion[] = [
  {
    question:
      "I have strong opinions on each Enstars writer and how they write my favorite characters.",
    associatedResult: "Scholar",
  },
  {
    question:
      "I will read a story even if it doesn’t focus on my favorite character or unit.",
    associatedResult: "Scholar",
  },
  {
    question: "I intend to read every story.",
    associatedResult: "Scholar",
  },
  {
    question:
      "I enjoy debating with others on our interpretations of stories and characters.",
    associatedResult: "Scholar",
  },
  {
    question: "I hold the Reminiscence stories to a high regard.",
    associatedResult: "Scholar",
  },
  {
    question: "I have an arsenal of story screenshots.",
    associatedResult: "Scholar",
  },
  {
    question:
      "I translate stories, or would like to study Japanese to read stories.",
    associatedResult: "Scholar",
  },
  {
    question:
      "I actively try to max out 5 star cards of my favorite characters.",
    associatedResult: "Whale",
  },
  {
    question:
      "I will do anything to pull a card on a gacha, even spending money.",
    associatedResult: "Whale",
  },
  {
    question:
      "I have attempted tiering for an event, or I plan on tiering an event.",
    associatedResult: "Whale",
  },
  {
    question:
      "Don’t ask me how much I’ve spent on the game. I don’t want to talk about it.",
    associatedResult: "Whale",
  },
  {
    question: "I try to max 4 star gacha cards of my favorite characters.",
    associatedResult: "Whale",
  },
  {
    question:
      "If my favorite character gets a limited card, I need to max it immediately.",
    associatedResult: "Whale",
  },
  {
    question: "I plan out my dia count for future events.",
    associatedResult: "Whale",
  },
  {
    question:
      "I do or would like to run a daily/hourly account for my favorite character or unit.",
    associatedResult: "Hypeman",
  },
  {
    question: "My friends can easily associate me with one character.",
    associatedResult: "Hypeman",
  },
  {
    question: "I often talk about my favorite character unprompted.",
    associatedResult: "Hypeman",
  },
  {
    question: "Everything I see reminds me of them.",
    associatedResult: "Hypeman",
  },
  {
    question: "Character polls are serious business to me.",
    associatedResult: "Hypeman",
  },
  {
    question:
      "My social media layouts are based entirely on my favorite character.",
    associatedResult: "Hypeman",
  },
  {
    question:
      "If I were to make a word cloud of my social media posts or messages, my favorite character’s name would appear in the center with a large font.",
    associatedResult: "Hypeman",
  },
  {
    question: "I enjoy reading self-insert fanfiction.",
    associatedResult: "Dreamer",
  },
  {
    question: "I have an OC that represents me or would like to create one.",
    associatedResult: "Dreamer",
  },
  {
    question:
      "I ship my favorite character with myself or an OC that represents me.",
    associatedResult: "Dreamer",
  },
  {
    question:
      "I frequently do Picrews of myself or an OC with my favorite character.",
    associatedResult: "Dreamer",
  },
  {
    question:
      "I frequently imagine myself in scenarios with my favorite character.",
    associatedResult: "Dreamer",
  },
  {
    question:
      "I often, or would like to, commission content of myself or my OC with my favorite character.",
    associatedResult: "Dreamer",
  },
  {
    question: "I wish my favorite character was real :(",
    associatedResult: "Dreamer",
  },
  {
    question: "I often frequent Mercari.",
    associatedResult: "Merch Collector",
  },
  {
    question: "I have or would like to own a nui.",
    associatedResult: "Merch Collector",
  },
  {
    question: "I have or would like to make an ita bag.",
    associatedResult: "Merch Collector",
  },
  {
    question:
      "I am a part of Discord servers to seek out merch of my favorite character.",
    associatedResult: "Merch Collector",
  },
  {
    question: "I have hosted or taken part in group orders for merch.",
    associatedResult: "Merch Collector",
  },
  {
    question:
      "I have or am planning to set up a shelf or space for all of my merch.",
    associatedResult: "Merch Collector",
  },
  {
    question:
      "I consider buying non-Enstars related items because they would look good with my merch.",
    associatedResult: "Merch Collector",
  },
  {
    question: "I have multiple ships for my favorite characters.",
    associatedResult: "Shipper",
  },
  {
    question:
      "People who know me can easily associate me with my favorite ship.",
    associatedResult: "Shipper",
  },
  {
    question: "I have a lot of ships that may not make sense to most people.",
    associatedResult: "Shipper",
  },
  {
    question: "Ship name order is something that matters a lot to me.",
    associatedResult: "Shipper",
  },
  {
    question:
      "I find ways to analyze my ship’s dynamic and interactions in any way possible.",
    associatedResult: "Shipper",
  },
  {
    question: "I produce a ship rather than a character or unit.",
    associatedResult: "Shipper",
  },
  {
    question:
      "There are ships I don’t like because they conflict with my own ships.",
    associatedResult: "Shipper",
  },
  {
    question: "I often forget my headcanons aren’t technically canon.",
    associatedResult: "Creative",
  },
  {
    question: "I like to incorporate headcanons into my art.",
    associatedResult: "Creative",
  },
  {
    question: "I have or would like to take part in a zine.",
    associatedResult: "Creative",
  },
  {
    question:
      "I have OC(s) that are unrelated to myself, or would like to create some.",
    associatedResult: "Creative",
  },
  {
    question:
      "I frequently share creative projects, such as art and fanfiction, on social media.",
    associatedResult: "Creative",
  },
  {
    question: "I enjoy drawing or writing fanfiction for Enstars characters.",
    associatedResult: "Creative",
  },
  {
    question: "I like to talk to others about my creative ideas.",
    associatedResult: "Creative",
  },
  {
    question: "I listen to Ensemble Stars music in my free time.",
    associatedResult: "Connoisseur",
  },
  {
    question: "I listen to the songs of units I don't produce.",
    associatedResult: "Connoisseur",
  },
  {
    question: "I can tell each character apart by their singing voice.",
    associatedResult: "Connoisseur",
  },
  {
    question: "I take the yearly song poll very seriously.",
    associatedResult: "Connoisseur",
  },
  {
    question: "Ensemble Stars songs going global on streaming platforms was the best news of my life.",
    associatedResult: "Connoisseur",
  },
  {
    question: "I like finding pleasant voice combinations for songs such as Brand New Stars and the anniversary songs.",
      associatedResult: "Connoisseur",
  },
  {
    question: "I take note of and appreciate the instruments used in each Ensemble Stars song.",
    associatedResult: "Connoisseur",
  }
];

export function shuffleQuestions(array: QuizQuestion[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
