import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import './Settings.css';

function Settings() {
    const [isCursorBeingUsed, setIsCursorBeingUsed] = useState(false);

    useEffect(() => {
        const savedCursorUsage = localStorage.getItem('isCursorBeingUsed') === 'true';
        setIsCursorBeingUsed(savedCursorUsage);
    }, []);

    const toggleCursorUsage = () => {
        const newCursorUsage = !isCursorBeingUsed;
        setIsCursorBeingUsed(newCursorUsage);
        localStorage.setItem('isCursorBeingUsed', newCursorUsage);

        fetch('/api/cursor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isCursorBeingUsed: newCursorUsage }),
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Error:', error));
    };

    return (
        <>
            <Menu />
            <div className="settings-container">
                <button onClick={toggleCursorUsage}>
                    {isCursorBeingUsed ? 'Disable Special Cursor' : 'Enable Special Cursor'}
                </button>
            </div>
        </>
    );
}

export default Settings;
