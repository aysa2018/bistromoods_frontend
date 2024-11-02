// src/components/PromptInput.js
import React, { useState } from 'react';

const PromptInput = ({ onKeywordsExtracted }) => {
    const [prompt, setPrompt] = useState("");
    const [keywords, setKeywords] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate extracted keywords based on the prompt for now
        const simulatedKeywords = ["relaxed", "cozy"]; // Example mock data
        setKeywords(simulatedKeywords);
        onKeywordsExtracted(simulatedKeywords);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Describe your mood or what you’re looking for..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit">Analyze Mood</button>
            </form>
            {keywords.length > 0 && (
                <div>
                    <h3>Extracted Keywords:</h3>
                    <ul>
                        {keywords.map((keyword, index) => (
                            <li key={index}>{keyword}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PromptInput;
