import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';

const PasswordGe = () => {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null);

    const characterSet = useMemo(() => {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) chars += "0123456789";
        if (charAllowed) chars += "!@#$&";
        return chars;
    }, [numberAllowed, charAllowed]);

    const passwordGenerator = useCallback(() => {
        const pass = Array.from({ length }, () => 
            characterSet[Math.floor(Math.random() * characterSet.length)]
        ).join('');

        setPassword(pass);
    }, [length, characterSet]);

    useEffect(() => {
        passwordGenerator();
    }, [passwordGenerator]);

    const copyPassword = useCallback(() => {
        if (passwordRef.current) {
            passwordRef.current.select();
            navigator.clipboard.writeText(password);
        }
    }, [password]);

    return (
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500">
            <h1 className="text-white text-center my-3">Password Generator</h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input 
                    type="text" 
                    value={password} 
                    className="outline-none w-full py-1 px-3 bg-white"
                    placeholder="password" 
                    ref={passwordRef} 
                    readOnly
                />
                <button 
                    className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
                    onClick={copyPassword}
                >
                    Copy
                </button>
            </div>
            <div className="flex text-sm gap-x-2">
                <div className="flex items-center gap-x-1">
                    <input 
                        type="range" 
                        min={6} 
                        max={50} 
                        value={length} 
                        className="cursor-pointer"
                        onChange={(e) => setLength(Number(e.target.value))} 
                    />
                    <label>Length: {length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        checked={numberAllowed}
                        onChange={() => setNumberAllowed(prev => !prev)}
                    />
                    <label>Numbers</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        checked={charAllowed}
                        onChange={() => setCharAllowed(prev => !prev)}
                    />
                    <label>Characters</label>
                </div>
            </div>
        </div>
    );
};

export default PasswordGe;
