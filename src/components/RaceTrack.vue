<template>
  <div class="track">
    <div class="track-info">
      Round {{ round.roundNumber }} - {{ round.length }} m
    </div>
    <div class="lane-wrap">
      <div
        v-for="(horseId, index) in round.horseIds"
        :key="horseId"
        class="lane"
      >
        <div
          class="runner"
          :style="runnerStyle(horseId, index)"
          :class="{ racing: phase === 'racing' }"
        >
          <span class="horse-dot" :style="{ background: horseColor(horseId) }"></span>
          <span class="horse-id">Horse {{ horseId }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RaceTrack',
  props: {
    round: {
      type: Object,
      required: true,
    },
    horses: {
      type: Array,
      default: () => [],
    },
    phase: {
      type: String,
      default: 'idle',
    },
  },
  methods: {
    horseColor(horseId) {
      const h = this.horses.find((x) => x.id === horseId)
      return h ? h.color : '#888'
    },
    runnerStyle(horseId, index) {
      const h = this.horses.find((x) => x.id === horseId)
      const condition = h ? h.condition : 50
      const duration = 2 + (100 - condition) / 50 + (index % 3) * 0.2
      return {
        '--duration': `${duration}s`,
        '--lane': index,
      }
    },
  },
}
</script>

<style scoped>
.track {
  background: #0f3460;
  border-radius: 6px;
  padding: 1rem;
}
.track-info {
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: #aaa;
}
.lane-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.lane {
  position: relative;
  height: 32px;
  background: #1a4a7a;
  border-radius: 4px;
  overflow: hidden;
}
.runner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.5rem;
  width: max-content;
  transition: left 0.1s linear;
}
.runner.racing {
  animation: run var(--duration) ease-out forwards;
}
@keyframes run {
  from {
    left: 0;
  }
  to {
    left: calc(100% - 120px);
  }
}
.horse-dot {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  flex-shrink: 0;
}
.horse-id {
  font-size: 0.8rem;
}
</style>
