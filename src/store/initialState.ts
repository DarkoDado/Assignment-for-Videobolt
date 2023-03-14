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
export type Player = {
    id: number,
    name: string,
    score: number,
    penalty: number,
    hits: any,
    winner: boolean
}

type PresentState = {
    players: Player[];
    currentPlayerId: number;
    gameStage: number;
    lastHit: any;
    currentRound: number;
    winner: Player | null
    rounds: number;
    isGameStarted: boolean;
};

type GameState = {
    players: Player[]
    currentPlayerId: number
    gameStage: number;
    lastHit: any; // Ovde je potrebno precizirati tip za lastHit
    currentRound: number;
    winner: Player | null  // Ovde koristimo union tip za null i id igrača
    rounds: number;
    isGameStarted: boolean;
    present: PresentState;
}


export const initialState = {
    present: {
        players: [
            { id: 0, name: "Darko", score: 501, winner: false },
            { id: 1, name: "Marko", score: 501, winner: false},
        ],
        currentPlayerId: 0,
        gameStage: BEFORE_GAME,
        isGameStarted: false,
        winner: null,
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
            const { CurrPlayerId, newScore } = action.payload
            const player = state.present.players.find(player => player.id === CurrPlayerId)
            if (player) {
                player.score = newScore
                if (player.score <= 0) {
                    player.winner = true
                 
                } 
                // CurrPlayerId as  null;
            }
        },
        RESET_GAME: (state) => {
            state.present.players.forEach(p => p.score = 501)
            // state.present.players = [
            //     { id: 0, name: "Darko", score: 501, winner: false },
            //     { id: 1, name: "Marko", score: 501, winner: false },
            // ];
            state.present.currentPlayerId = 0;
            state.present.isGameStarted = false;
            state.present.winner = null;
        },
    }
})

export const players = (state: RootState) => state.game.present.players
export const isGameStarted = (state: RootState) => state.game.present.isGameStarted
export const currentPlayerId = (state: RootState) => state.game.present.currentPlayerId
export const selectCurrentPlayer = (state: RootState) => state.game.present.players[state.game.present.currentPlayerId];
export const selectWinner = (state: RootState) => {
    const winner = state.game.winner;
    if (winner && typeof winner !== "number") {
        const winnerId = winner.id;
        return state.game.present.players.find(p => p.id === winnerId);
    }
    return winner;
};

export const { REMOVE_PLAYER, UPDATE_PLAYER_SCORE, ADD_PLAYER, START_GAME, NEXT_PLAYER, RESET_GAME } = gameSlice.actions

export default gameSlice.reducer