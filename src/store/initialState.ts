import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RootState {
  game: {
    present: PresentState
  }
}

export interface Player {
  id: number
  name: string
  score: number
  winner: boolean
  hits: Array<number | undefined>
}

export type PlayersArray = Player[]

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

export const initialState = {
  present: {
    players: [
      { id: 0, name: 'Darko', score: 501, hits: [] as Array<number | undefined>, winner: false },
      { id: 1, name: 'Marko', score: 501, hits: [] as Array<number | undefined>, winner: false }
    ],
    currentPlayerId: 0,
    isGameStarted: false
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
      const nextPlayerIndex = (state.present.currentPlayerId + 1) % state.present.players.length
      state.present.currentPlayerId = nextPlayerIndex
    },
    UPDATE_PLAYER_SCORE: (state, action: PayloadAction<{ CurrPlayerId: number, newScore: number, hit?: number }>) => {
      const { CurrPlayerId, newScore, hit } = action.payload
      const player = state.present.players.find(player => player.id === CurrPlayerId)
      if (player !== undefined) {
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
    SHOW_HITS: (state, action: PayloadAction<{ pId: number, hit: number }>) => {
      const { pId, hit } = action.payload
      const player = state.present.players.find((p) => p.id === pId)
      player?.hits.push(hit)
    }
  }
})

export const players = (state: RootState): Player[] => state.game.present.players
export const isGameStarted = (state: RootState): boolean => state.game.present.isGameStarted
export const currentPlayerId = (state: RootState): number => state.game.present.currentPlayerId
export const selectCurrentPlayer = (state: RootState): Player => state.game.present.players[state.game.present.currentPlayerId]

export const { REMOVE_PLAYER, SHOW_HITS, UPDATE_PLAYER_SCORE, ADD_PLAYER, START_GAME, NEXT_PLAYER, RESET_GAME } = gameSlice.actions

export default gameSlice.reducer
