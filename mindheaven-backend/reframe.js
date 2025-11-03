export default async function reframeThought(thought) {
    let lower = thought.toLowerCase().trim();
  
    // Convert common informal forms to their standard equivalents
    const contractionMap = {
      "im ": "i'm ",
      "i m ": "i'm ",
      "ive ": "i've ",
      "id ": "i'd ",
      "ill ": "i'll ",
      "cant": "can't",
      "wont": "won't",
      "dont": "don't",
      "doesnt": "doesn't",
      "isnt": "isn't",
      "wasnt": "wasn't",
      "shouldnt": "shouldn't",
      "couldnt": "couldn't",
      "wouldnt": "wouldn't",
      "havent": "haven't",
      "hasnt": "hasn't",
      "arent": "aren't",
      "werent": "weren't",
      "aint": "isn't"
    };
  
    for (const [pattern, replacement] of Object.entries(contractionMap)) {
      // add a space before pattern so we don’t match inside words like "camp"
      const regex = new RegExp(`\\b${pattern}\\b`, 'g');
      lower = lower.replace(regex, replacement);
    }
  
    // Step 2: now run your pattern matching logic
    // 1️⃣  Confidence & Self-worth
    if (lower.includes("i'm not good enough") || lower.includes("not enough") || lower.includes("i'm worthless")) {
      return "You *are* enough. Your worth isn’t determined by how productive or perfect you are — it’s intrinsic.";
    }
  
    if (lower.includes("i'm a failure") || lower.includes("i failed")) {
      return "Failing doesn’t make you a failure — it means you’re learning, adjusting, and building resilience.";
    }
  
    if (lower.includes("i can't") || lower.includes("can't do this") || lower.includes("impossible")) {
      return "It might seem impossible now, but every skill feels that way at first. You’re more capable than you think.";
    }
  
    // 2️⃣  Anxiety & Overthinking
    if (lower.includes("i'm scared") || lower.includes("i'm anxious") || lower.includes("worried")) {
      return "It’s okay to feel anxious. Try to focus on what’s within your control and take one calm breath at a time.";
    }
  
    if (lower.includes("i'm overthinking") || lower.includes("think too much")) {
      return "Your mind is trying to protect you by finding certainty. Try writing your thoughts down — it helps separate fear from fact.";
    }
  
    // 3️⃣  Loneliness & Relationships
    if (lower.includes("nobody cares") || lower.includes("no one cares")) {
      return "It may feel that way right now, but there *are* people who care — sometimes quietly, but genuinely.";
    }
  
    if (lower.includes("i'm alone") || lower.includes("no one understands")) {
      return "You’re not as alone as it feels. Connection often starts with small steps — reach out to one person you trust.";
    }
  
    if (lower.includes("people hate me") || lower.includes("everyone hates me")) {
      return "It’s unlikely everyone feels that way — your mind might be magnifying a small moment. You’re still worthy of kindness.";
    }
  
    // 4️⃣  Motivation & Productivity
    if (lower.includes("i'm lazy") || lower.includes("i never get anything done") || lower.includes("i'm unmotivated")) {
      return "You’re not lazy — you might just be tired, stressed, or uninspired. Rest and compassion often restart motivation better than guilt.";
    }
  
    if (lower.includes("i have to be perfect") || lower.includes("never make mistakes")) {
      return "Perfection isn’t the goal — progress is. Every mistake is a sign that you’re trying and improving.";
    }
  
    if (lower.includes("i always mess up") || lower.includes("i ruin everything")) {
      return "Everyone makes mistakes — it’s part of being human. You can learn, adjust, and still do great things.";
    }
  
    // 5️⃣  Stress & Burnout
    if (lower.includes("i can't handle this") || lower.includes("too much") || lower.includes("overwhelmed")) {
      return "You’ve handled hard things before — take one step, one breath, one task at a time. It doesn’t all need fixing today.";
    }
  
    if (lower.includes("i'm exhausted") || lower.includes("i'm tired of everything")) {
      return "You sound drained — that’s your body asking for rest, not proof of weakness. Take a break; recovery is productive.";
    }
  
    // 6️⃣  Self-image & Body confidence
    if (lower.includes("i hate my body") || lower.includes("i'm ugly") || lower.includes("i look terrible")) {
      return "Your worth isn’t defined by appearance. Your body does incredible things for you every day — it deserves care, not criticism.";
    }
  
    if (lower.includes("i wish i looked like") || lower.includes("i'm fat") || lower.includes("i'm too skinny")) {
      return "Comparison steals peace. Bodies come in endless forms — focus on how you *feel*, not how you measure up.";
    }
  
    // 7️⃣  Future & Hopelessness
    if (lower.includes("what's the point") || lower.includes("nothing matters") || lower.includes("i give up")) {
      return "It might seem pointless now, but feelings shift — even tiny actions can create meaning again. Start small.";
    }
  
    if (lower.includes("things will never get better") || lower.includes("it's hopeless")) {
      return "It may not feel like it, but change is possible. Healing isn’t linear — some days are just steps toward a better one.";
    }
  
    // 8️⃣  Comparison & Imposter feelings
    if (lower.includes("everyone is better than me") || lower.includes("i don't belong") || lower.includes("imposter")) {
      return "You belong here as much as anyone. You’re comparing your behind-the-scenes to someone else’s highlight reel.";
    }
  
    // 9️⃣  Regret & Guilt
    if (lower.includes("i shouldn't have") || lower.includes("i regret") || lower.includes("i feel guilty")) {
      return "Regret shows you care. Use it as a guide, not a punishment — you can still make things right or learn from it.";
    }
  
    // 🔟  General fallback
    return "Pause for a moment — what would you tell a close friend feeling this way? Speak that same kindness to yourself.";
  }