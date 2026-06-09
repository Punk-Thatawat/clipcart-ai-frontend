import {
  GenerationSettings,
  StoryboardScene,
  VideoDuration,
  VideoStyle,
} from "@/types/generator";

interface StoryboardBeat {
  key: string;
  shot: string;
  visual: string;
  text: string;
  voiceover: string;
  transition: string;
  weight?: number;
}

const durationSeconds: Record<VideoDuration, number> = {
  "15s": 15,
  "30s": 30,
  "60s": 60,
};

const sceneCounts: Record<VideoDuration, Record<VideoStyle, number>> = {
  "15s": {
    Review: 3,
    "Problem-Solution": 3,
    Funny: 4,
    Storytelling: 3,
    "Hard Sell": 4,
    "Soft Sell": 3,
  },
  "30s": {
    Review: 5,
    "Problem-Solution": 4,
    Funny: 6,
    Storytelling: 5,
    "Hard Sell": 5,
    "Soft Sell": 4,
  },
  "60s": {
    Review: 8,
    "Problem-Solution": 8,
    Funny: 9,
    Storytelling: 9,
    "Hard Sell": 8,
    "Soft Sell": 7,
  },
};

const styleBeats: Record<VideoStyle, StoryboardBeat[]> = {
  Review: [
    ["hook", "Macro close-up", "Reveal {product} immediately.", "Worth the hype?", "I finally tried {product}, and here is my honest take.", "Punch in", 0.8],
    ["context", "Talking head", "Explain why the product caught your attention.", "Why I tried it", "I kept seeing it everywhere, so I tested it for myself.", "Quick cut"],
    ["unbox", "Top-down shot", "Show packaging and first impression.", "First impression", "It arrived looking better than I expected.", "Quick cut"],
    ["feature", "Detail close-up", "Highlight the strongest product feature.", "Best feature", "The first thing I noticed was how simple it feels.", "Match cut"],
    ["demo", "Hands-on demo", "Use the product in a realistic setting.", "Real test", "Here is what it looks like when you actually use it.", "Match cut", 1.5],
    ["benefit", "Before and after", "Compare the situation before and after.", "The difference", "This is the part that made the biggest difference.", "Split screen", 1.3],
    ["proof", "Reaction shot", "Show the final result and genuine reaction.", "My result", "The result was visible right away.", "Quick cut"],
    ["verdict", "Talking head", "Give a concise final recommendation.", "Final verdict", "For the price, this is a genuinely useful find.", "Slow push in"],
    ["cta", "Product hero shot", "End on the product and link prompt.", "Check today's price", "Tap the link to see today's price.", "Fade out", 0.8],
  ].map(toBeat),
  "Problem-Solution": [
    ["hook", "Problem close-up", "Open with the frustrating everyday problem.", "Still dealing with this?", "If this keeps happening to you, you need to see this.", "Punch in", 0.8],
    ["pain", "POV shot", "Show the problem wasting time.", "So annoying", "It is a small problem, but it gets annoying every day.", "Quick cut"],
    ["relate", "Talking head", "React directly to the frustration.", "I was done", "I got tired of dealing with it the hard way.", "Quick cut"],
    ["reveal", "Product reveal", "Bring {product} into frame.", "The simple fix", "Then I found {product}.", "Whip pan"],
    ["demo", "Hands-on demo", "Demonstrate the main use step by step.", "Watch this", "You use it like this and let it handle the difficult part.", "Match cut", 1.6],
    ["benefit", "Detail montage", "Show practical product benefits.", "Fast. Easy. Useful.", "It is faster, easier, and fits into a normal routine.", "Quick cut"],
    ["result", "Before and after", "Show a clear result comparison.", "Problem solved", "The before and after speaks for itself.", "Split screen", 1.3],
    ["recommend", "Talking head", "Explain who should consider the product.", "Who needs this?", "I recommend it if you deal with the same problem.", "Slow push in"],
    ["cta", "Product hero shot", "Finish with the product and link prompt.", "See the deal", "Tap the link to check the current deal.", "Fade out", 0.8],
  ].map(toBeat),
  Funny: [
    ["hook", "Reaction close-up", "Open with an exaggerated shocked reaction.", "Me before finding this", "Why did nobody tell me about {product} sooner?", "Smash cut", 0.7],
    ["fail", "Wide comedy shot", "Show a relatable attempt going wrong.", "Attempt number 47", "This was me trying to solve it the old way.", "Quick cut"],
    ["reaction", "Talking head", "Pause and look directly at camera.", "Absolutely not", "Even my patience wanted a refund.", "Freeze frame", 0.8],
    ["reveal", "Whip-pan reveal", "Dramatically reveal {product}.", "Enter: {product}", "Then this tiny hero entered the chat.", "Whip pan"],
    ["demo", "Fast demo montage", "Use the product with energetic cuts.", "Wait for it...", "I tried it once, and suddenly I looked like an expert.", "Speed ramp", 1.3],
    ["punchline", "Reaction close-up", "React to the unexpectedly good result.", "Excuse me?", "That worked suspiciously well.", "Snap zoom", 0.8],
    ["benefit", "Split screen", "Contrast the chaotic before and easy after.", "Chaos vs. easy mode", "Same problem, completely different energy.", "Split screen"],
    ["verdict", "Product selfie", "Give a playful recommendation.", "10/10 upgrade", "Useful, affordable, and now part of my routine.", "Quick cut"],
    ["cta", "Product hero shot", "Point toward the affiliate link.", "Link is right there", "Tap the link before I buy another one.", "Pop out", 0.8],
  ].map(toBeat),
  Storytelling: [
    ["hook", "Cinematic close-up", "Start on the final result.", "This changed my routine", "I did not expect one small product to change my routine.", "Slow push in", 0.9],
    ["setting", "Lifestyle wide shot", "Establish the creator's normal environment.", "A normal day", "It started on a completely normal day.", "Dissolve"],
    ["struggle", "POV sequence", "Show repeated frustration.", "Every single day", "I had been putting up with the same problem for weeks.", "Quick cut"],
    ["discovery", "Phone over-shoulder", "Show discovering {product} while scrolling.", "Then I found this", "That night, I came across {product}.", "Dissolve"],
    ["first-use", "Unboxing close-up", "Open and prepare the product.", "First try", "When it arrived, I tested it immediately.", "Match cut", 1.2],
    ["turning-point", "Hands-on demo", "Capture the moment the product works.", "The moment it worked", "A few seconds later, it did exactly what I needed.", "Match cut", 1.5],
    ["result", "Before and after", "Reveal the completed result.", "Look at the difference", "The result was simple and immediately visible.", "Split screen", 1.3],
    ["reflection", "Talking head", "Share a personal takeaway.", "Small find, big help", "It makes one part of every day much easier.", "Slow push in"],
    ["cta", "Warm product shot", "Close naturally on the product.", "Find it here", "I left the link here if you want to see it too.", "Fade out", 0.9],
  ].map(toBeat),
  "Hard Sell": [
    ["hook", "Bold close-up", "Show product and strongest claim immediately.", "Stop scrolling", "Stop scrolling if you want an easier solution.", "Impact cut", 0.7],
    ["pain", "Problem montage", "Show the cost of the problem.", "Time wasted", "You are wasting time doing this the slow way.", "Quick cut"],
    ["offer", "Product hero shot", "Present {product} as the direct solution.", "The smarter option", "{product} gives you a faster, simpler solution.", "Impact cut"],
    ["feature", "Feature close-up", "Highlight the strongest selling feature.", "Built for this", "Its best feature is designed for this exact job.", "Quick cut"],
    ["demo", "Fast hands-on demo", "Demonstrate the product clearly.", "See it in action", "Watch how quickly it works from start to finish.", "Speed ramp", 1.5],
    ["proof", "Before and after", "Display the result and proof.", "Real result", "The result is immediate and easy to repeat.", "Split screen", 1.2],
    ["value", "Price comparison", "Compare price with time and effort saved.", "Worth the price", "For this price, it can save you time and effort.", "Quick cut"],
    ["urgency", "Countdown graphic", "Add a price or stock reminder.", "Deal may change", "The current deal may not stay available.", "Impact cut"],
    ["cta", "Product and link", "Point clearly toward the purchase link.", "Tap to check the deal", "Tap the link now to check price and availability.", "Hard cut", 0.8],
  ].map(toBeat),
  "Soft Sell": [
    ["hook", "Lifestyle close-up", "Show the product naturally in a calm routine.", "A little daily upgrade", "This small find quietly makes life easier.", "Gentle dissolve", 0.9],
    ["context", "Lifestyle wide shot", "Show where the product fits naturally.", "Part of my routine", "I started using it during my normal routine.", "Dissolve"],
    ["introduce", "Natural close-up", "Introduce {product} without a dramatic reveal.", "Meet {product}", "This is {product}, and it fits into the routine easily.", "Slow push in"],
    ["detail", "Feature close-up", "Show useful product details.", "Simple by design", "It is straightforward and comfortable to use.", "Match cut"],
    ["demo", "Slow hands-on demo", "Demonstrate the product at a relaxed pace.", "How I use it", "I use it whenever I need a quick practical fix.", "Match cut", 1.5],
    ["benefit", "Lifestyle result", "Show the subtle improvement.", "Makes things easier", "It saves time and makes the process easier.", "Dissolve", 1.2],
    ["proof", "Before and after", "Show a natural comparison.", "A small difference", "The change is simple, but noticeable.", "Split screen"],
    ["verdict", "Talking head", "Give a low-pressure recommendation.", "My honest take", "It is worth considering if you face this often.", "Slow push in"],
    ["cta", "Clean product shot", "Close with a gentle link prompt.", "More details here", "I left the link here if you want the details.", "Fade out", 0.9],
  ].map(toBeat),
};

function toBeat(values: (string | number)[]): StoryboardBeat {
  return {
    key: values[0] as string,
    shot: values[1] as string,
    visual: values[2] as string,
    text: values[3] as string,
    voiceover: values[4] as string,
    transition: values[5] as string,
    weight: (values[6] as number | undefined) ?? 1,
  };
}

export function getStoryboardSceneCount(
  duration: VideoDuration,
  style: VideoStyle,
) {
  return sceneCounts[duration][style];
}

function selectBeats(beats: StoryboardBeat[], count: number) {
  return Array.from({ length: count }, (_, index) => {
    const beatIndex = Math.round((index * (beats.length - 1)) / (count - 1));
    return beats[beatIndex];
  });
}

function allocateSeconds(total: number, beats: StoryboardBeat[]) {
  const totalWeight = beats.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  const raw = beats.map((item) => ((item.weight ?? 1) / totalWeight) * total);
  const seconds = raw.map(Math.floor);
  const order = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);
  const remaining = total - seconds.reduce((sum, value) => sum + value, 0);

  for (let index = 0; index < remaining; index += 1) {
    seconds[order[index].index] += 1;
  }

  return seconds;
}

function interpolate(value: string, productName: string) {
  return value.replaceAll("{product}", productName);
}

export function buildStoryboard(
  settings: GenerationSettings,
  productName: string,
): StoryboardScene[] {
  const count = getStoryboardSceneCount(settings.duration, settings.style);
  const beats = selectBeats(styleBeats[settings.style], count);
  const seconds = allocateSeconds(durationSeconds[settings.duration], beats);
  let start = 0;

  return beats.map((item, index) => {
    const end = start + seconds[index];
    const hideCta = item.key === "cta" && !settings.includeCta;
    const scene = {
      scene: index + 1,
      time: `${start}-${end}s`,
      shot: item.shot,
      visual: interpolate(item.visual, productName),
      onScreenText: hideCta
        ? "Final thoughts"
        : interpolate(item.text, productName),
      voiceover: hideCta
        ? "That is my honest take after trying it in a real routine."
        : interpolate(item.voiceover, productName),
      transition: item.transition,
    };

    start = end;
    return scene;
  });
}
