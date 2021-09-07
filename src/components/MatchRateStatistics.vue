<template>
  <h1 class="text-8xl font-bold">{{ average_match_rate }}</h1>
  <h2 class="text-xl font-semibold mt-1">Average match rate</h2>

  <div class="flex">
    <div class="flex-1">
      <h1 class="text-6xl font-bold mt-12">
        {{ average_match_rate_per_application }}
      </h1>
      <h2 class="text-xl font-semibold mt-1">
        Average match rate per application
      </h2>
      <div
        v-for="[key, value] in average_match_rate_per_application_per_sector"
        class="ml-2 flex items-cente text"
        :key="key"
      >
        <div class="font-bold mr-2">{{ key }}:</div>
        <div class="mr-2">{{ value }}</div>
      </div>
    </div>

    <div class="flex-1">
      <h1 class="text-6xl font-bold mt-12">
        {{ average_match_rate_per_shortlisted }}
      </h1>
      <h2 class="text-xl font-semibold mt-1">
        Average match rate per shortlisted candidate
      </h2>
      <div
        v-for="[key, value] in average_match_rate_per_shortlisted_per_sector"
        class="ml-2 flex items-cente text"
        :key="key"
      >
        <div class="font-bold mr-2">{{ key }}:</div>
        <div class="mr-2">{{ value }}</div>
      </div>
    </div>
  </div>
  <div class="pb-24" />
</template>

<script>
import axios from "axios";
export default {
  async setup() {
    const { data: stats } = await axios.get("match-rate-statistics");

    const average_match_rate_per_application_per_sector = new Map(
      [
        ...Object.entries(stats.average_match_rate_per_application_per_sector),
      ].sort((a, b) => b[1] - a[1])
    );
    const average_match_rate_per_shortlisted_per_sector = new Map(
      [
        ...Object.entries(stats.average_match_rate_per_shortlisted_per_sector),
      ].sort((a, b) => b[1] - a[1])
    );

    return {
      average_match_rate: stats.average_match_rate,
      average_match_rate_per_application:
        stats.average_match_rate_per_application,
      average_match_rate_per_application_per_sector,
      average_match_rate_per_shortlisted:
        stats.average_match_rate_per_shortlisted,
      average_match_rate_per_shortlisted_per_sector,
    };
  },
};
</script>