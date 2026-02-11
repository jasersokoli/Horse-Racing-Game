<template>
  <div class="track">
    <div class="track-info">
      Round {{ round.roundNumber }} - {{ round.length }} m
    </div>
    <div class="lane-wrap">
      <div
        v-for="(entry, index) in displayOrder"
        :key="entry.horseId"
        class="lane"
      >
        <div
          class="runner"
          :style="runnerStyle(entry)"
          :class="{ racing: phase === 'racing' }"
        >
          <span class="horse-dot" :style="{ background: entry.color }"></span>
          <span class="horse-id">Horse {{ entry.horseId }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ANIMATION_DURATION } from '../config'

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
    finishOrder: {
      type: Array,
      default: null,
    },
    phase: {
      type: String,
      default: 'idle',
    },
  },
  computed: {
    horsesById() {
      const map = new Map()
      this.horses.forEach((h) => map.set(h.id, h))
      return map
    },
    displayOrder() {
      if (this.finishOrder && this.finishOrder.length > 0) {
        return this.finishOrder.map(({ horseId, color }) => ({ horseId, color }))
      }
      return this.round.horseIds.map((horseId) => {
        const h = this.horsesById.get(horseId)
        return { horseId, color: h ? h.color : '#888' }
      })
    },
  },
  methods: {
    runnerStyle(entry) {
      const position = this.finishOrder
        ? this.finishOrder.findIndex((e) => e.horseId === entry.horseId)
        : 0
      const duration =
        ANIMATION_DURATION.BASE_SECONDS +
        position * ANIMATION_DURATION.POSITION_OFFSET_PER_PLACE
      return { '--duration': `${duration}s` }
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
  will-change: transform;
}
.runner.racing {
  animation: run var(--duration) ease-out forwards;
}
@keyframes run {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(1200px);
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
