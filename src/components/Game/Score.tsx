import React, { useEffect } from 'react'
import { useState } from 'react';

export const Score = ({ onThrowDart, score, handleScoreUpdate }: any) => {
    
    return (
        <div>
            {/* Trenutni rezultat: {score} */}
            <button onClick={onThrowDart} >Baci strelicu</button></div>
    )
}
