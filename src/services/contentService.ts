import { GeneratorInputs, GenerationResponse } from "../types";

// TODO: Add API key here later for external AI service when available
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const NICHE_TEMPLATES: Record<string, {
  titles: string[];
  texts: string[];
  concepts: string[];
}> = {
  education: {
    titles: [
      "10 {topic} Hacks Every Student Must Know",
      "How I Mastered {topic} in Just 30 Days",
      "The Secret to Learning {topic} Faster",
      "Why You're Failing at {topic} (And How to Fix It)",
      "Stop Studying {topic} the Wrong Way!",
      "Master {topic}: The Ultimate Guide for Beginners",
      "I Tried Every {topic} Method... This One Actually Works",
      "7 {topic} Tips That Will Change Your Life",
      "The Truth About {topic} Nobody Tells You",
      "How to Get an A+ in {topic} Without Trying"
    ],
    texts: ["STUDY SMARTER", "MASTER {topic}", "SECRET HACK", "A+ RESULTS", "STOP FAILING"],
    concepts: [
      "Clean desk setup with a laptop showing {topic} notes and a bright 'A+' overlay.",
      "Split screen: 'Before' (stressed student) vs 'After' (confident student with {topic} mastery).",
      "Close-up of a notebook with key {topic} concepts highlighted in neon colors."
    ]
  },
  tech: {
    titles: [
      "The Future of {topic}: Everything You Need to Know",
      "I Used {topic} for 7 Days... Here's What Happened",
      "Stop Buying {topic} Until You Watch This!",
      "10 {topic} Features You Didn't Know Existed",
      "Is {topic} Actually Worth It? (Honest Review)",
      "How {topic} is Changing the World in 2026",
      "The Best {topic} Setup for Under $500",
      "Why I'm Quitting {topic} for Good",
      "7 {topic} Secrets the Pros Use",
      "Don't Make This Huge {topic} Mistake!"
    ],
    texts: ["TECH REVEALED", "DON'T BUY", "10X FASTER", "FUTURE TECH", "IS IT WORTH IT?"],
    concepts: [
      "High-tech dark background with glowing blue lines and the {topic} device in the center.",
      "Extreme close-up of the {topic} logo with a 'SHOCKING' text overlay.",
      "Person holding the {topic} looking surprised with a '2026' badge in the corner."
    ]
  },
  gaming: {
    titles: [
      "How to Win Every {topic} Match (Pro Tips)",
      "I Found the Secret {topic} Level!",
      "10 {topic} Glitches That Still Work in 2026",
      "Why {topic} is the Best Game of the Year",
      "The Most Insane {topic} Moment Ever Caught on Camera",
      "Stop Playing {topic} Until You See This!",
      "I Spent 100 Hours in {topic}... Here's What I Found",
      "7 {topic} Items You Need to Get Right Now",
      "The Sad Truth About {topic}",
      "How to Level Up in {topic} Instantly"
    ],
    texts: ["PRO LEVEL", "SECRET FOUND", "OP BUILD", "GAME CHANGER", "STOP NOW"],
    concepts: [
      "Action-packed screenshot of {topic} with a bright red arrow pointing to a hidden detail.",
      "Split screen: 'Noob' (basic gear) vs 'Pro' (legendary {topic} gear).",
      "Dramatic lighting on a gaming controller with '{topic} MASTER' text."
    ]
  },
  finance: {
    titles: [
      "How to Make $10,000/Month with {topic}",
      "The {topic} Strategy That Made Me a Millionaire",
      "Stop Saving Money! Do This {topic} Instead",
      "10 {topic} Mistakes That Are Costing You Thousands",
      "The Truth About {topic} Investing in 2026",
      "Why I'm Putting All My Money into {topic}",
      "7 {topic} Passive Income Ideas for Beginners",
      "How to Retire Early with {topic}",
      "The Secret {topic} Portfolio of the Rich",
      "Don't Invest in {topic} Until You Watch This!"
    ],
    texts: ["GET RICH", "MONEY HACK", "RETIRE EARLY", "10K/MONTH", "DON'T LOSE MONEY"],
    concepts: [
      "Person holding a stack of cash with a rising green graph overlaying {topic} data.",
      "Minimalist white background with a large '{topic}' coin and 'X100' text.",
      "Split screen: 'Poor' (empty wallet) vs 'Rich' (luxury car and {topic} success)."
    ]
  },
  lifestyle: {
    titles: [
      "My {topic} Morning Routine (Productive & Relaxing)",
      "How {topic} Changed My Life Forever",
      "10 {topic} Habits for a Happier Life",
      "The Ultimate {topic} Transformation",
      "Why I Started {topic} (And Why You Should Too)",
      "7 {topic} Essentials I Can't Live Without",
      "How to Simplify Your Life with {topic}",
      "My Honest {topic} Experience",
      "Stop Doing {topic} This Way!",
      "The Best {topic} Advice I've Ever Received"
    ],
    texts: ["LIFE CHANGED", "DAILY HABITS", "MUST HAVE", "NEW ME", "SIMPLIFY"],
    concepts: [
      "Aesthetic room setup with soft morning light and a '{topic}' journal.",
      "Before and after photos of a room or person showing the {topic} impact.",
      "Close-up of a smiling person holding a {topic} related item."
    ]
  }
};

const DEFAULT_TEMPLATES = {
  titles: [
    "The Ultimate {topic} Guide for 2026",
    "Why Everyone is Talking About {topic}",
    "10 {topic} Secrets You Need to Know",
    "How to Master {topic} Fast",
    "The Truth About {topic} Revealed",
    "Stop Ignoring {topic}!",
    "I Tried {topic} for a Week... Wow",
    "7 {topic} Tips for Success",
    "The Best {topic} Strategy Ever",
    "Don't Start {topic} Without This"
  ],
  texts: ["{topic} GUIDE", "MUST WATCH", "SECRET REVEALED", "FAST RESULTS", "WOW!"],
  concepts: [
    "Bright, high-contrast background with '{topic}' in large bold letters.",
    "Person looking shocked at a screen showing {topic} results.",
    "A collage of images representing different aspects of {topic}."
  ]
};

export async function generateViralContent(inputs: GeneratorInputs): Promise<GenerationResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const topic = inputs.topic.trim();
  const niche = inputs.niche.toLowerCase().trim();
  
  // Find matching niche or use default
  let templates = DEFAULT_TEMPLATES;
  let isCovered = false;

  for (const key in NICHE_TEMPLATES) {
    if (niche.includes(key) || topic.toLowerCase().includes(key)) {
      templates = NICHE_TEMPLATES[key];
      isCovered = true;
      break;
    }
  }

  // If not covered and not a very generic input, we might want to flag it
  // But for this implementation, we'll try to be helpful unless it's completely gibberish
  if (!isCovered && topic.length < 3) {
    return {
      freeTitles: [],
      freeThumbnailTexts: [],
      freeThumbnailConcepts: [],
      premiumTitles: [],
      premiumThumbnailTexts: [],
      premiumThumbnailConcepts: [],
      premiumHookFormulas: [],
      premiumDescriptionTemplate: "",
      notCovered: true
    };
  }

  const format = (str: string) => str.replace(/{topic}/g, topic);

  const allTitles = templates.titles.map(format);
  const allTexts = templates.texts.map(format);
  const allConcepts = templates.concepts.map(format);

  return {
    freeTitles: allTitles.slice(0, 5),
    freeThumbnailTexts: allTexts.slice(0, 2),
    freeThumbnailConcepts: allConcepts.slice(0, 1),
    premiumTitles: allTitles.slice(5, 10),
    premiumThumbnailTexts: allTexts.slice(2, 5),
    premiumThumbnailConcepts: allConcepts.slice(1, 3),
    premiumHookFormulas: [
      "The '{topic}' curiosity gap: Start with a question about {topic} that can't be ignored.",
      "The 'Before/After' hook: Show the struggle with {topic} and the ultimate solution.",
      "The 'Contrarian' hook: Challenge a common belief about {topic} immediately.",
      "The 'Listicle' hook: '10 reasons why {topic} is...' creates instant structure.",
      "The 'Personal Story' hook: 'I spent 100 days doing {topic} and...'"
    ],
    premiumDescriptionTemplate: `
# ${topic.toUpperCase()} - EVERYTHING YOU NEED TO KNOW

In this video, we dive deep into ${topic} and explore why it's trending in 2026. Whether you're a beginner or a pro, these tips will help you master ${topic} faster than ever.

## What we cover:
- The secret to ${topic} success
- Common mistakes to avoid with ${topic}
- My personal ${topic} journey
- Top 5 ${topic} resources

## Resources mentioned:
- [Link to tool 1]
- [Link to tool 2]

## Connect with me:
- Twitter: @peterlightspeed
- Instagram: @lightspeedstudio

#${topic.replace(/\s+/g, '')} #YouTubeGrowth #LightspeedStudio
    `.trim()
  };
}
