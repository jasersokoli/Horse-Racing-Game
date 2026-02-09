<template>
  <div class="horse-list">
    <ul v-if="horses.length" class="list">
      <li
        v-for="horse in horses"
        :key="horse.id"
        class="horse-item"
        :style="{ '--horse-color': horse.color }"
      >
        <span class="swatch"></span>
        <span class="label">Horse {{ horse.id }}</span>
        <span class="condition">Condition: {{ horse.condition }}</span>
      </li>
    </ul>
    <p v-else class="empty">Click "Generate Horses" to create the horse list.</p>
  </div>
</template>

<script>
export default {
  name: 'HorseList',
  props: {
    horses: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.horse-list {
  max-height: 200px;
  overflow-y: auto;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.horse-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.5rem;
  background: #0f3460;
  border-radius: 4px;
  font-size: 0.8rem;
}
.swatch {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: var(--horse-color);
}
.condition {
  color: #888;
  margin-left: 0.25rem;
}
.empty {
  color: #666;
  margin: 0;
  font-size: 0.875rem;
}
</style>
