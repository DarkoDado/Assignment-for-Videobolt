import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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

export type RootState = {
    game: {
        [key in keyof GameState]: GameState[key]
    }
}
type Player = {
    id: number,
    name: string,
    score: number,
    penalty: number,
    hits: any
}

type PresentState = {
    players: Player[];
    currentPlayerId: number;
    gameStage: number;
    lastHit: any;
    currentRound: number;
    winner: Player | null;
    rounds: number;
    isGameStarted: boolean;
    
};

type GameState = {
        players: Player[]
        currentPlayerId: number
        gameStage: string;
        lastHit: any; // Ovde je potrebno precizirati tip za lastHit
        currentRound: number;
        winner: Player | null; // Ovde koristimo union tip za null i id igrača
        rounds: number;
        isGameStarted: boolean;
        present: PresentState;
    }

    


export const initialState = {
    before: {},
    future: {},
    present: {
        players : [
            { id: 0, name: "Darko", score: 501, penalty: 0, hits },
            { id: 1, name: "Marko", score: 501, penalty: 0, hits },
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
        REMOVE_PLAYER: (state, action: PayloadAction<number>) => {
            const removedPlayer = state.present.players.filter(player => (
                player.id !== action.payload
            ))
            state.present.players = removedPlayer
        },
        ADD_PLAYER: (state, action: PayloadAction<Player>) => {
            state.present.players.push(action.payload)
        },
        START_GAME: (state, action) => {
            state.present.isGameStarted = true
            state.present.currentPlayerId = 0
        },
        NEXT_PLAYER: (state, action) => {
            const nextPlayerIndex = (state.present.currentPlayerId + 1) % state.present.players.length;
            state.present.currentPlayerId = nextPlayerIndex;
        },
        UPDATE_PLAYER_SCORE: (state, action) => {
            const {CurrPlayerId, newScore} = action.payload
            const player = state.present.players.find(player => player.id === CurrPlayerId)
            if(player) {
                player.score = newScore
            }
        
        }
    }
})

export const players = (state: RootState) => state.game.present.players
export const isGameStarted = (state: RootState) => state.game.present.isGameStarted
export const currentPlayerId = (state: RootState ) => state.game.present.currentPlayerId
export const { REMOVE_PLAYER,UPDATE_PLAYER_SCORE, ADD_PLAYER, START_GAME, NEXT_PLAYER } = gameSlice.actions
export const selectCurrentPlayer = (state: RootState) => state.game.present.players[state.game.present.currentPlayerId];
export default gameSlice.reducer