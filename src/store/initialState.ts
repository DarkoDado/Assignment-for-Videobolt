import { createSlice } from "@reduxjs/toolkit"

export const hits = {
    20: 0,
    19: 0,
    18: 0,
    17: 0,
    16: 0,
    15: 0,
}

export const BEFORE_GAME = 0
export const DURING_GAME = 1
export const AFTER_GAME = 2
// export type PlayersType = {
//     id: number,
//     name: string,
//     score: number,
//     penalty: number,
//     hits: number
// }

export const initialState = {
    before: {},
    future: {},
    present: {
        players: [
            { id: 0, name: "Darko", score: 0, penalty: 0, hits },
            { id: 1, name: "Marko", score: 0, penalty: 0, hits },
        ],
        currentPlayerId: 0,
        gameStage: BEFORE_GAME,
        lastHit: {},
        currentRound: 1,
        winner: null,
        rounds: 5,
        isGameStarted: false
    }
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        REMOVE_PLAYER: (state, action) => {
            const removedPlayer = state.present.players.filter(player => (
                player.id !== action.payload
            ))
            state.present.players = removedPlayer
        },
        ADD_PLAYER: (state, action) => {
            state.present.players.push(action.payload)
        },
        START_GAME: (state, action) => {

        }

    }
})

export const players = (state: any) => state.game.present.players
export const isGameStarted = (state: any) => state.game.present.isGameStarted
export const { REMOVE_PLAYER, ADD_PLAYER, START_GAME } = gameSlice.actions

export default gameSlice.reducer