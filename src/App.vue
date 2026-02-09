<template>
  <div class="app">
    <header class="header">
      <h1>Horse Racing Game</h1>
    </header>
    <main class="main">
      <section class="panel horse-panel">
        <h2>Horses</h2>
        <HorseList :horses="horses" />
        <button
          class="btn btn-primary"
          :disabled="phase === 'racing'"
          @click="onGenerateHorses"
        >
          Generate Horses
        </button>
      </section>
      <section class="panel schedule-panel">
        <h2>Race Schedule</h2>
        <RaceSchedule :schedule="schedule" :current-round-index="currentRoundIndex" />
        <div class="actions">
          <button
            class="btn btn-primary"
            :disabled="!horses.length || phase === 'racing'"
            @click="onGenerateSchedule"
          >
            Generate
          </button>
          <button
            class="btn btn-secondary"
            :disabled="!isScheduleGenerated || phase === 'racing'"
            @click="onStartRace"
          >
            Start
          </button>
        </div>
      </section>
      <section class="panel track-panel">
        <h2>Track</h2>
        <RaceTrack
          v-if="currentRound"
          :round="currentRound"
          :horses="horses"
          :phase="phase"
        />
        <p v-else class="placeholder">Generate a schedule and start the race.</p>
      </section>
      <section class="panel results-panel">
        <h2>Results</h2>
        <RaceResults :round-results="roundResults" :horses="horses" />
      </section>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import HorseList from './components/HorseList.vue'
import RaceSchedule from './components/RaceSchedule.vue'
import RaceTrack from './components/RaceTrack.vue'
import RaceResults from './components/RaceResults.vue'

export default {
  name: 'App',
  components: {
    HorseList,
    RaceSchedule,
    RaceTrack,
    RaceResults,
  },
  computed: {
    ...mapState(['phase']),
    ...mapGetters([
      'horses',
      'schedule',
      'currentRoundIndex',
      'roundResults',
      'currentRound',
      'isScheduleGenerated',
    ]),
  },
  methods: {
    ...mapActions(['generateHorses', 'generateSchedule', 'startRaces']),
    onGenerateHorses() {
      this.generateHorses()
    },
    onGenerateSchedule() {
      this.generateSchedule()
    },
    async onStartRace() {
      await this.startRaces()
    },
  },
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #1a1a2e;
  color: #eee;
}
.header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #333;
}
.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
.panel {
  background: #16213e;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #0f3460;
}
.panel h2 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #e94560;
}
.horse-panel {
  grid-column: 1;
  grid-row: 1;
}
.schedule-panel {
  grid-column: 2;
  grid-row: 1;
}
.track-panel {
  grid-column: 1 / -1;
  grid-row: 2;
}
.results-panel {
  grid-column: 1 / -1;
}
.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 500;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-primary {
  background: #e94560;
  color: #fff;
}
.btn-primary:hover:not(:disabled) {
  background: #c73e54;
}
.btn-secondary {
  background: #0f3460;
  color: #fff;
}
.btn-secondary:hover:not(:disabled) {
  background: #1a4a7a;
}
.placeholder {
  color: #666;
  margin: 0;
  font-size: 0.875rem;
}
</style>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}
</style>
