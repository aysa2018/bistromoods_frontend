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
            {/* Form to handle the user input */}
            <form onSubmit={handleSubmit}>
                {/* Textarea for user input */}
                <textarea
                    placeholder="Describe your mood or what you’re looking for..."
                    value={prompt} // Bind textarea value to state
                    onChange={(e) => setPrompt(e.target.value)} // Update state on input change
                    style={styles.textarea}
                />
                {/* Button to submit the form */}
                <button type="submit" style={styles.button}>
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
