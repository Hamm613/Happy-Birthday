/* ============================================================
   EDIT EVERYTHING HERE: names, date, messages, songs
   ============================================================ */
const CONFIG = {
  name: "Khansa",
  creator: "Hamza",
  birthday: { month: 11, day: 9 },          // 9 November

  api: "/api",                              // chat backend (Netlify Function)

  songs: ["audio/song1.mp3", "audio/song2.mp3", "audio/song3.mp3", "audio/song4.mp3"],

  intro: { pre: "A little something, made just for", btn: "Tap to begin 💌" },

  wish: {
    title: "Happy Birthday, {name}! 🎂",
    dateLine: "{date}",
    countdown: { days: "{n} days until your day ✨", tomorrow: "Your birthday is tomorrow ✨", today: "Today is your day ✨" },
    text: [
      "On the ninth of November the world got one of its softest, brightest people, and I got to know her.",
      "I hope this year wraps you in the same warmth you give everyone else. You deserve every good thing, every single day.",
      "Edit this paragraph with your own words, from the heart."
    ],
    btn: "Next 💖"
  },

  apology: {
    title: "I owe you an apology",
    text: [
      "I’m sorry for the moments I let you down, and for the words I didn’t say when they mattered.",
      "You deserved patience, and I gave you less than that. I have thought about it more than you know.",
      "Replace these lines with exactly what you want to say to her."
    ],
    btn: "Next"
  },

  chance: {
    title: "Will you give me another chance?",
    text: ["I can’t promise I’ll be perfect. I can promise I’ll try, every day, and that you’ll never doubt how much you matter to me."],
    yes: "Yes 💕",
    maybe: "Let me think 🥺",
    maybeReplies: ["Are you sure? 🥺", "Please? 💗", "Pretty please…", "I’ll wait forever 🌹", "Just press Yes 😭"]
  },

  final: {
    title: "Khansa, you are my favourite person",
    text: [
      "Thank you for giving me this chance. I’ll spend it making you smile.",
      "Happy birthday, my love. Every year with you is a gift."
    ],
    signature: "Made with love by Hamza 💗",
    chatBtn: "Chat with Hamza 💬"
  },

  chat: {
    title: "Chat with Hamza",
    placeholder: "Write to Hamza…",
    welcome: "This is a private chat between you and Hamza 💌 Say anything you like.",
    notConnected: "The chat isn’t connected yet. Hamza still needs to finish setting it up."
  }
};
