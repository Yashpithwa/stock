// src/pages/InstPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InstPage = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const instructions = [
    "This platform provides AI-assisted trading insights for informational and educational purposes only.",
    "The predictions are generated using historical data and machine learning models; they are not guaranteed to be accurate or profitable.",
    "Past performance is not indicative of future results. All trading involves risk of loss.",
    "You acknowledge that you are solely responsible for your own investment and trading decisions.",
    "The platform and its creators are not liable for any financial losses incurred from the use of this service.",
    "Do not share your account credentials or sensitive information with others.",
    "By proceeding, you agree to comply with all applicable financial laws and regulations in your jurisdiction.",
    "The content provided should not be considered financial, investment, or legal advice.",
    "Your continued use of this platform signifies your full acceptance of these terms and conditions."
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gray-900/80 p-10 rounded-2xl shadow-2xl border border-green-400/40 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">
          Disclaimer & User Agreement
        </h1>

        <div className="max-h-[400px] overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-green-500/40 scrollbar-track-transparent">
          <ul className="list-decimal list-inside space-y-3 text-gray-300 leading-relaxed">
            {instructions.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-start mb-6">
          <input
            type="checkbox"
            id="agree"
            className="mt-1 mr-3 w-5 h-5 accent-green-400"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="agree" className="text-gray-300">
            I have read, understood, and agree to the disclaimer and terms of
            use.
          </label>
        </div>

        <button
          onClick={() => navigate("/FrontPage")}
          disabled={!agreed}
          className={`w-full p-3 rounded-lg font-semibold transition ${
            agreed
              ? "bg-green-500 hover:bg-green-600 text-black"
              : "bg-gray-600 cursor-not-allowed text-gray-300"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InstPage;
