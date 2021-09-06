<template>
  <div
    v-for="[key, value] in stats"
    class="flex items-cente text-lg"
    :key="key"
  >
    <div class="font-bold mr-2">{{ key }}:</div>
    <div class="mr-2">{{ value }}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async setup() {
    const { data } = await axios.get("match-rate-statistics");

    console.log(new Map(Object.entries(data)));

    return {
      stats: new Map(Object.entries(data)),
    };
  },
};
</script>