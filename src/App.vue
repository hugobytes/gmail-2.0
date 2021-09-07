<template>
  <div class="mx-auto max-w-screen-xl">
    <h1
      class="
        font-extrabold
        leading-tight
        text-4xl
        my-8
        mx-auto
        text-center text-green-400
        animate-bounce
      "
    >
      Match Rate Analysis
    </h1>
    <suspense>
      <template #default> <match-rate-statistics /> </template>
      <template #fallback>
        <div
          class="
            justify-center
            flex
            h-screen
            w-screen
            items-center
            animate-bounce
          "
        >
          Loading ...
        </div>
      </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MatchRateStatistics from "./components/MatchRateStatistics.vue";

export default defineComponent({
  components: { MatchRateStatistics },
  name: "App",
});
</script>
