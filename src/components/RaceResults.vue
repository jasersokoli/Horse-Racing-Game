<template>
  <div class="results">
    <div
      v-for="result in roundResults"
      :key="result.roundNumber"
      class="round-result"
    >
      <div class="round-header">Round {{ result.roundNumber }} ({{ result.length }} m)</div>
      <div class="finish-list">
        <div
          v-for="finish in result.finishOrder"
          :key="finish.horseId"
          class="finish-item"
        >
          <span class="pos">{{ finish.position }}</span>
          <span class="swatch" :style="{ background: finish.color }"></span>
          <span class="horse-label">Horse {{ finish.horseId }}</span>
        </div>
      </div>
    </div>
    <p v-if="!roundResults.length" class="empty">Results will appear here after each round.</p>
  </div>
</template>

<script>
export default {
  name: 'RaceResults',
  props: {
    roundResults: {
      type: Array,
      default: () => [],
    },
    horses: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.results {
  max-height: 400px;
  overflow-y: auto;
}
.round-result {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #0f3460;
}
.round-result:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
.round-header {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #e94560;
}
.finish-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.finish-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: #0f3460;
  border-radius: 4px;
  font-size: 0.85rem;
}
.pos {
  width: 1.5rem;
  text-align: center;
  font-weight: 700;
  color: #e94560;
  flex-shrink: 0;
}
.swatch {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}
.horse-label {
  color: #ddd;
}
.empty {
  color: #666;
  margin: 0;
  font-size: 0.875rem;
}
</style>
