import React, { useState } from "react";
import axios from "axios";

const Dictionary = () => {
    const [meaning, setMeaning] = useState(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleMeaning = async () => {
        if (!input.trim()) {
            setError("Please enter a word to find its meaning!");
            return;
        }

        setLoading(true);
        setError("");

        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;  // dont need an api key
        try {
            const { data } = await axios.get(apiUrl);
            if (data && data.length > 0) {
                setMeaning(data[0]);
            } else {
                setMeaning(null);
                setError("Word not found!");
            }
        } catch (error) {
            console.error("Word not found or server issue", error);
            setError("Word not found!");
            setMeaning(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-start pt-5">
            <h1 className="text-6xl m-10">Dictionary</h1>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-70 h-10 border-2 p-2"
                />
                <button
                    onClick={handleMeaning}
                    className="w-30 h-10 border-2 rounded bg-blue-400 cursor-pointer m-5"
                >
                    {loading ? "Loading..." : "Search"}
                </button>
            </div>
            <div>
                {error && <h1 className="text-red-500 mt-4">{error}</h1>}
                {meaning && (
                    <div className="mt-6 p-4 border rounded bg-gray-100">
                        <h2 className="text-xl font-bold">{meaning.word}</h2>
                        {meaning.meanings && meaning.meanings.length > 0 ? (
                            <>
                                <p className="italic">{meaning.meanings[0].partOfSpeech}</p>
                                <p>Definition: {meaning.meanings[0].definitions[0].definition}</p>
                            </>
                        ) : (
                            <p>No meaning found for this word.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dictionary;
