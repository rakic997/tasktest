import React, { useState } from 'react'
import './ui.scss'

const AddItemInput = ({ placeholder, value, onChange, onClick, className, disabled }) => {
    const [error, setError] = useState('')

    const handleClick = () => {
        if (!value.trim()) {
            setError('Input cannot be empty!')
            setTimeout(() => {
                setError('')
            }, 2000)
        } else {
            onClick()
        }
    };

    return (
        <div className={`add-item-input ${className}`}>
            <input
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            <button onClick={handleClick} disabled={disabled}>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="23.75" height="23" rx="7.5" fill="#FCA311" />
                    <rect x="0.5" y="0.5" width="23.75" height="23" rx="7.5" stroke="#FCA311" />
                    <path d="M16.125 12.625H13V15.75C13 15.9158 12.9342 16.0747 12.8169 16.1919C12.6997 16.3092 12.5408 16.375 12.375 16.375C12.2092 16.375 12.0503 16.3092 11.9331 16.1919C11.8158 16.0747 11.75 15.9158 11.75 15.75V12.625H8.625C8.45924 12.625 8.30027 12.5592 8.18306 12.4419C8.06585 12.3247 8 12.1658 8 12C8 11.8342 8.06585 11.6753 8.18306 11.5581C8.30027 11.4408 8.45924 11.375 8.625 11.375H11.75V8.25C11.75 8.08424 11.8158 7.92527 11.9331 7.80806C12.0503 7.69085 12.2092 7.625 12.375 7.625C12.5408 7.625 12.6997 7.69085 12.8169 7.80806C12.9342 7.92527 13 8.08424 13 8.25V11.375H16.125C16.2908 11.375 16.4497 11.4408 16.5669 11.5581C16.6842 11.6753 16.75 11.8342 16.75 12C16.75 12.1658 16.6842 12.3247 16.5669 12.4419C16.4497 12.5592 16.2908 12.625 16.125 12.625Z" fill="white" />
                </svg>
            </button>
            {error && <p className='error-message'>{error}</p>}
        </div>
    );
};

export default AddItemInput