function generateAdvice({ message, riskProfile, recommendation }) {
  const responses = [];

  const riskLevel = riskProfile?.riskLevel;

  // 🧠 Base advice by risk
  if (riskLevel === "LOW") {
    responses.push(
      "You prefer safety over high returns. Debt-oriented funds are suitable for you."
    );
  }

  if (riskLevel === "MODERATE") {
    responses.push(
      "You have a balanced risk profile. A mix of equity and debt funds is appropriate."
    );
  }

  if (riskLevel === "HIGH") {
    responses.push(
      "You are comfortable with market volatility. Equity-oriented funds can help you grow wealth faster."
    );
  }

  // 🔍 Keyword-based intent detection
  if (message) {
    const text = message.toLowerCase();

    if (text.includes("safe")) {
      responses.push(
        "For safety, avoid short-term equity exposure and prefer debt or hybrid funds."
      );
    }

    if (text.includes("returns") || text.includes("grow")) {
      responses.push(
        "Higher returns usually come with higher risk. Stay invested long-term to manage volatility."
      );
    }

    if (text.includes("sip")) {
      responses.push(
        "SIPs help average market volatility and are ideal for long-term investing."
      );
    }
  }

  // 📊 Allocation sanity check
  if (recommendation?.allocation?.EQUITY >= 70) {
    responses.push(
      "Since your equity allocation is high, ensure you stay invested for at least 5–7 years."
    );
  }

  return {
    advice: responses,
    disclaimer:
      "This is general financial guidance, not investment advice. Please consult a certified advisor for final decisions."
  };
}

module.exports = {
  generateAdvice
};
