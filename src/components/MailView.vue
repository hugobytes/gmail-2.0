<template>
  <div>
    <h2 class="text-xl mt-3">{{ email.subject }}</h2>
    <h3 class="font-semibold mt-2">
      From: {{ email.from }} on
      {{ format(new Date(this.email.sentAt), "d MMM, yyyy") }}
    </h3>
    <div v-html="marked(email.body)" class="mt-2" />
  </div>
</template>

<script lang="ts">
import marked from "marked";
import { format } from "date-fns";
import { defineComponent, PropType } from "vue";
import Email from "../models/email";

export default defineComponent({
  name: "MailView",
  setup() {
    return {
      marked,
      format,
    };
  },
  props: {
    email: {
      type: Object as PropType<Email>,
      required: true,
    },
  },
});
</script>
