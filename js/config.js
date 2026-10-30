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
      "yrr khansa I am really sorry yrr jo apke sath hua sahi nhi hua mujha pata tha lekin kasm se mein ye ni chata tha .",
       "PLease forgive me from heart aur mera wada hai apse i will protect you in every case you need me and never be the",
       "reason of ruiling your respect please be my friend "
    ],
    btn: "Next"
  },

  chance: {
    title: "Will you give me another chance?",
    text: ["I can’t promise I’ll be perfect. I can promise I’ll try, every day, and that you’ll never doubt how much you matter to me."
           "yrr can we be friends again and talk just one time just like friends ek baar dosti kerlo beshaq 2nd year ke bad kerlena "
           "mager please mujhe friendship ka moqa dena i want to talk to you aur is website ke akiri page pe option hai jis se ap aur mein "
           "baat ker sakte hain ghar jake ek bar msg kerdena ispe ek zaroori baat apse karni hai please"],
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
