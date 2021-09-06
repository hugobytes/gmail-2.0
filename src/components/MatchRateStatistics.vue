<template>
  <div v-for="stat in stats" class="flex items-cente text-xl">
    <div class="font-bold mr-2">{{ stat.key }}</div>
    <div class="font-bold mr-2">{{ stat.value }}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async setup() {
    const stats = await axios.get("match-rate-statistics");

    return {
      stats: new Map(Object.entries(stats)),
    };
  },
};
</script>