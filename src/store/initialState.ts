import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RootState = {
    game: {
        [key in keyof GameState]: GameState[key]
    }
}

export interface Player {
    id: number
    name: string
    score: number
    penalty: number
    winner: boolean
    hits: (number | never)[]

}



interface PresentState {
    players: Player[]
    currentPlayerId: number
    gameStage: number
    lastHit: any
    currentRound: number
    winner: Player | null
    rounds: number
    isGameStarted: boolean
};

interface GameState {
    players: Player[]
    currentPlayerId: number
    gameStage: number
    lastHit: any // Ovde je potrebno precizirati tip za lastHit
    currentRound: number
    winner: Player | null// Ovde koristimo union tip za null i id igrača
    rounds: number
    isGameStarted: boolean
    present: PresentState
}


export const initialState = {
    present: {
        players: [
            { id: 0, name: 'Darko', score: 501, hits: [] as number[], winner: false },
            { id: 1, name: 'Marko', score: 501, hits: [] as number[], winner: false },
        ],
        currentPlayerId: 0,
        isGameStarted: false,
    }
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        REMOVE_PLAYER: (state, action: PayloadAction<number>) => {
            const removedPlayer = state.present.players.filter((player) => (
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
            const { CurrPlayerId, newScore, hit } = action.payload
            const player = state.present.players.find(player => player.id === CurrPlayerId)
            if (player) {
                player.score = newScore
                if (player.score <= 0) {
                    player.winner = true

                } else {
                    player.hits.push(hit)
                    
                }
            }
            // const updatedPlayers = state.present.players.map(player => {
            //     if (player.id === CurrPlayerId) {
            //       return {
            //         ...player,
            //         score: newScore,
            //         winner: newScore <= 0,
            //         hits: hit
            //       };
            //     }
            //     return player;
            //   });
            //   state.present.players = updatedPlayers;
        },
        RESET_GAME: (state) => {
            state.present.players.forEach(p => {
                p.score = 501
                p.winner = false
                p.hits = []
            }
            )
            // state.present.players = [
            //     { id: 0, name: "Darko", score: 501, winner: false },
            //     { id: 1, name: "Marko", score: 501, winner: false },
            // ];
            state.present.currentPlayerId = 0
            state.present.isGameStarted = false
        },
        SHOW_HITS: (state, action: PayloadAction<{ pId: number; hit: number; }>) => {
            const { pId, hit } = action.payload
            const player = state.present.players.find((p) => p.id === pId)
            player?.hits.push(hit)

        }
    }
})

export const players = (state: RootState) => state.game.present.players
export const isGameStarted = (state: RootState) => state.game.present.isGameStarted
export const currentPlayerId = (state: RootState) => state.game.present.currentPlayerId
export const selectCurrentPlayer = (state: RootState) => state.game.present.players[state.game.present.currentPlayerId];

export const { REMOVE_PLAYER, SHOW_HITS, UPDATE_PLAYER_SCORE, ADD_PLAYER, START_GAME, NEXT_PLAYER, RESET_GAME } = gameSlice.actions

export default gameSlice.reducer