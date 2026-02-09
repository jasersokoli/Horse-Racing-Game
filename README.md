# Horse Racing Game

Interactive horse racing game built with Vue.js. Generate a pool of horses, create a 6-round race schedule, and run races with animated movement and sequential results.

## Requirements

- **Horses:** 20 horses, each with a unique color and a condition score from 1 to 100.
- **Race schedule:** 6 rounds. Each round uses 10 randomly selected horses.
- **Round lengths (meters):** 1200, 1400, 1600, 1800, 2000, 2200.
- **Flow:** Generate horses, then generate the schedule, then start the race. Races run one round at a time with visible horse movement; results appear in the Results section as each round finishes.

## Tech Stack

- Vue 3
- Vuex 4 (state management)
- Vite 5
- Vitest (unit tests)
- Cypress (E2E tests)

## Project Structure

```
src/
  App.vue                 # Root layout and panels
  main.js                 # App entry, store registration
  components/
    HorseList.vue         # Horse list with color and condition
    RaceSchedule.vue      # 6-round schedule display
    RaceTrack.vue         # Animated track for current round
    RaceResults.vue       # Per-round finish results
  store/
    index.js              # Vuex store
    state.js              # State and round lengths
    getters.js            # Derived state
    mutations.js          # State updates
    actions.js            # generateHorses, generateSchedule, startRaces
cypress/
  e2e/                    # E2E specs
  support/                 # Cypress support
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in the browser.

### Build

```bash
npm run build
```

Output is in `dist/`. Preview with:

```bash
npm run preview
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Serve production build locally |
| `npm run test:unit` | Run unit tests (Vitest) |
| `npm run test:unit:watch` | Run unit tests in watch mode |
| `npm run test:e2e` | Run E2E tests (Cypress) |
| `npm run test:e2e:open` | Open Cypress UI |

## Testing

### Unit tests

```bash
npm run test:unit
```

Covers store (state, getters, mutations, actions) and components (HorseList, RaceResults).

### E2E tests

Start the dev server in one terminal:

```bash
npm run dev
```

In another terminal run Cypress:

```bash
npm run test:e2e
```

Or use the Cypress UI:

```bash
npm run test:e2e:open
```

E2E specs are in `cypress/e2e/`. The full race flow test waits for all 6 rounds to complete (about 15 seconds).
