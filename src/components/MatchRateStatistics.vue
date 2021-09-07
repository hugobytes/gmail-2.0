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
        class="ml-2 flex items-center text"
        :class="{ 'text-green-400': value > average_match_rate }"
        :key="key"
      >
        <div class="font-bold mr-2">{{ key }}:</div>
        <div class="mr-2">{{ value }}</div>
        <div class="text-gray-400">
          {{ getConfidenceIntervalForApplication(key) }}
        </div>
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
        class="ml-2 flex items-center text"
        :class="{ 'text-green-400': value > average_match_rate }"
        :key="key"
      >
        <div class="font-bold mr-2">{{ key }}:</div>
        <div class="mr-2">{{ value }}</div>
        <div class="text-gray-400">
          {{ getConfidenceIntervalForShortlisted(key) }}
        </div>
      </div>
    </div>
  </div>

  <div class="pt-12" />
  <div
    v-for="item in ratesByState"
    class="ml-2 flex items-center text-pink-400 text-xl"
    :key="item.match_rate"
  >
    <div class="font-bold mr-2">{{ item.state }}:</div>
    <div class="mr-2">{{ item.match_rate }}</div>
  </div>
  <div class="pb-24" />
</template>

<script>
import axios from "axios";

const confidenceIntervalsForApplications = {
  "Nurole Financial": 28.29,
  "Nurole PE": 12.98,
  "Nurole Technology": 31.01,
  "Nurole Government & regulatory": 3.0,
  "Nurole NFP": 5.73,
  "Nurole Education": 4.88,
  "Nurole Consumer": 18.35,
  "Nurole Real estate": 12.617040768947675,
  "Nurole Professional services": 22.743739938677905,
  "Nurole VC": 20.242883009291575,
  "Nurole Healthcare": 24.380356179081375,
  "Nurole Energy & natural resources": 2.498260983224114,
  "Nurole Industrial": 28.291913983303402,
  "Nurole Social impact": 16.683973658058125,
  "Nurole Affiliate": 12.324284922323649,
  "Nurole Media": 2.196923815677607,
};

const confidenceIntervalsForShortlisted = {
  "Nurole NFP": 11.37660228221634,
};

export default {
  async setup() {
    const { data: stats } = await axios.get("match-rate-statistics");

    const average_match_rate_per_application_per_sector = new Map(
      [
        ...Object.entries(stats.average_match_rate_per_application_per_sector),
      ].sort((a, b) => b[1] - a[1])
    );
    const average_match_rate_per_shortlisted_per_sector = new Map(
      [...Object.entries(stats.average_match_rate_per_shortlisted_per_sector)]
        .sort((a, b) => b[1] - a[1])
        .filter(([key, value]) => key.includes("Nurole"))
    );

    const ratesByState = [
      {
        state: "rejected pre-gate",
        count: 496,
        match_rate: 56.96772661275529,
      },
      {
        state: "pre-gate",
        count: 4683,
        match_rate: 55.664763792481914,
      },
      {
        state: "rejected (personally) pre-gate",
        count: 1183,
        match_rate: 61.49769019270139,
      },
      {
        state: "rejected (personally)",
        count: 787,
        match_rate: 62.2539450649289,
      },
      {
        state: "accepted",
        count: 110,
        match_rate: 60.64758560786415,
      },
      {
        state: "rejected",
        count: 225,
        match_rate: 59.680723333596994,
      },
      {
        state: "candidate_withdrawn",
        count: 22,
        match_rate: 56.37351137415507,
      },
      {
        state: "shortlisted",
        count: 131,
        match_rate: 65.49750665137022,
      },
      {
        state: "active",
        count: 115,
        match_rate: 63.80467397374715,
      },
      {
        state: "candidate withdrawn pre-gate",
        count: 12,
        match_rate: 55.73961039668243,
      },
      {
        state: "offered",
        count: 7,
        match_rate: 55.7727139906336,
      },
      {
        state: "active (unread)",
        count: 23,
        match_rate: 61.41327133304775,
      },
      {
        state: "to_be_rejected",
        count: 16,
        match_rate: 63.189508129277016,
      },
    ];

    return {
      average_match_rate: stats.average_match_rate,
      average_match_rate_per_application:
        stats.average_match_rate_per_application,
      average_match_rate_per_application_per_sector,
      average_match_rate_per_shortlisted:
        stats.average_match_rate_per_shortlisted,
      average_match_rate_per_shortlisted_per_sector,
      ratesByState,
    };
  },

  methods: {
    getConfidenceIntervalForApplication(sectorName) {
      if (!confidenceIntervalsForApplications[sectorName]) return "";
      return `+- ${confidenceIntervalsForApplications[sectorName].toFixed(2)}`;
    },
    getConfidenceIntervalForShortlisted(sectorName) {
      if (!confidenceIntervalsForShortlisted[sectorName]) return "";
      return `+- ${confidenceIntervalsForShortlisted[sectorName].toFixed(2)}`;
    },
  },
};
</script>