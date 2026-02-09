<template>
  <div class="schedule">
    <ul v-if="schedule.length" class="rounds">
      <li
        v-for="(round, index) in schedule"
        :key="round.roundNumber"
        class="round"
        :class="{ active: index === currentRoundIndex }"
      >
        <span class="round-num">Round {{ round.roundNumber }}</span>
        <span class="round-length">{{ round.length }} m</span>
        <span class="horses-count">{{ round.horseIds.length }} horses</span>
      </li>
    </ul>
    <p v-else class="empty">Click "Generate" to create the 6-round schedule.</p>
  </div>
</template>

<script>
export default {
  name: 'RaceSchedule',
  props: {
    schedule: {
      type: Array,
      default: () => [],
    },
    currentRoundIndex: {
      type: Number,
      default: null,
    },
  },
}
</script>

<style scoped>
.schedule {
  min-height: 80px;
}
.rounds {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.round {
  padding: 0.4rem 0.6rem;
  background: #0f3460;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid transparent;
}
.round.active {
  border-color: #e94560;
  background: #1a4a7a;
}
.round-num {
  font-weight: 600;
  margin-right: 0.5rem;
}
.round-length {
  color: #aaa;
  margin-right: 0.5rem;
}
.horses-count {
  color: #888;
}
.empty {
  color: #666;
  margin: 0;
  font-size: 0.875rem;
}
</style>
