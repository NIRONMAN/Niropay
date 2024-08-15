import React from 'react';

export default function NameInitial({ theName }) {
    const initial = theName.charAt(0).toUpperCase();

    return (
        <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
            <span className="text-2xl text-gray-800 font-bold">{initial}</span>
        </div>
    );
}
