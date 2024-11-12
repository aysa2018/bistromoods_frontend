// src/components/PromptInput.js
import React, { useState } from 'react';

const PromptInput = ({ onKeywordsExtracted }) => {
    const [prompt, setPrompt] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const extractedKeywords = prompt.split(" "); // Simple split; replace with actual extraction logic if available
        onKeywordsExtracted(extractedKeywords); // Pass extracted keywords to parent component
    };

    return (
        <div style={styles.promptContainer}>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Describe your mood or what you’re looking for..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>
                    Find the perfect match!
                </button>
            </form>
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
};

export default PromptInput;
