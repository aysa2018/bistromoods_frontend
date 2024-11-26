import React, { useState } from 'react';

// PromptInput component allows users to input a free-form description of their mood or preferences
const PromptInput = ({ onUserInputExtracted }) => {
    const [prompt, setPrompt] = useState(""); // State to hold the user's input text

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Trim whitespace and extract the input as a single string
        const extractedInput = prompt.trim();

        // Call the provided function to send the extracted input back to the parent component
        if (onUserInputExtracted) {
            onUserInputExtracted(extractedInput);
        }

        // Clear the input field after submission
        setPrompt("");
    };

    return (
        <div style={styles.promptContainer}>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Describe your mood or what you’re looking for..."
                    value={prompt} // Bind textarea value to state
                    onChange={(e) => setPrompt(e.target.value)} // Update state on input change
                    style={styles.textarea}
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--button-hover-color)';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'var(--secondary-color)';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Find the perfect match!
                </button>
            </form>
        </div>
    );
};

// Styling for the component
const styles = {
    promptContainer: {
        width: '100%',
        marginTop: '50px',
        marginBottom: '20px',
    },
    textarea: {
        width: '100%',
        height: '150px',
        padding: '15px',
        fontSize: '18px',
        fontFamily: 'var(--body-font)',
        color: 'var(--text-color)',
        backgroundColor: 'var(--card-background)',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        resize: 'vertical',
        marginBottom: '10px',
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        fontFamily: 'var(--body-font)',
        color: 'var(--primary-color)', // Cream text
        backgroundColor: 'var(--secondary-color)', // Green background
        border: '2px solid var(--primary-color)', // Cream outline
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out',
    },
};

export default PromptInput;