import React from 'react'
import { useState } from 'react';

export const Score = ({onThrowDart, score}:any) => {
  
  return (
    <div>Trenutni rezultat: {score}
    <button onClick={onThrowDart}>Baci strelicu</button></div>
  )
}
