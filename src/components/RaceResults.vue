<template>
  <div class="results">
    <div
      v-for="result in roundResults"
      :key="result.roundNumber"
      class="round-result"
    >
      <div class="round-header">Round {{ result.roundNumber }} ({{ result.length }} m)</div>
      <ol class="finish-list">
        <li
          v-for="(finish, pos) in result.finishOrder"
          :key="finish.horseId"
          class="finish-item"
          :style="{ '--horse-color': finish.color }"
        >
          <span class="pos">{{ pos + 1 }}</span>
          <span class="swatch"></span>
          <span class="horse-label">Horse {{ finish.horseId }}</span>
        </li>
      </ol>
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
  max-height: 280px;
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
  margin: 0;
  padding-left: 1.25rem;
  list-style: decimal;
}
.finish-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0;
  font-size: 0.875rem;
}
.pos {
  position: absolute;
  margin-left: -1.25rem;
  font-weight: 600;
  color: #aaa;
}
.swatch {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: var(--horse-color);
  flex-shrink: 0;
}
.empty {
  color: #666;
  margin: 0;
  font-size: 0.875rem;
}
</style>
