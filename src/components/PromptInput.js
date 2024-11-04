// src/components/PromptInput.js
import React, { useState } from 'react';

const PromptInput = ({ onKeywordsExtracted }) => {
    const [prompt, setPrompt] = useState("");
    const [keywords, setKeywords] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const simulatedKeywords = ["relaxed", "cozy"]; // Mock data for keywords
        setKeywords(simulatedKeywords);
        onKeywordsExtracted(simulatedKeywords);
    };

    return (
        <div style={styles.promptContainer}>
            <form onSubmit={handleSubmit} className="prompt-form">
                <textarea
                    placeholder="Describe your mood or what you’re looking for..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="prompt-textarea"
                    style={styles.textarea}
                />
                <button type="submit" className="prompt-button" style={styles.button}>
                    Find the perfect match!
                </button>
            </form>
            {keywords.length > 0 && (
                <div style={styles.keywordContainer}>
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

const styles = {
    promptContainer: {
        width: '100%',
        marginBottom: '20px',
    },
    textarea: {
        width: '100%',
        height: '150px',
        padding: '15px',
        fontSize: '18px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        resize: 'vertical',
        marginBottom: '10px',
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    keywordContainer: {
        marginTop: '15px',
    },
};

export default PromptInput;
