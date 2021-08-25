<template>
  <div class="bg-white">
    <div class="flex mb-4">
      <button class="mr-2 px-3 py-2 rounded bg-blue-500" @click="toggleRead">
        {{ email.read ? "Mark as Unread (r)" : "Mark as Read (r)" }}
      </button>
      <button
        class="mr-2 px-3 py-2 rounded bg-purple-500"
        @click="toggleArchived"
      >
        {{ email.archived ? "Move to Inbox (e)" : "Archive (e)" }}
      </button>
      <button class="mr-2 px-3 py-2 rounded bg-green-500" @click="goOlder">
        Older
      </button>
      <button class="mr-2 px-3 py-2 rounded bg-red-500" @click="goNewer">
        Newer
      </button>
    </div>
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
import axios from "axios";
import useKeydown from "../composables/use-keydown";

export default defineComponent({
  name: "MailView",
  setup(props) {
    useKeydown([
      {
        key: "r",
        fn: () => toggleRead(),
      },
      {
        key: "e",
        fn: () => toggleArchived(),
      },
    ]);

    const email = props.email;

    const toggleRead = () => {
      email.read = !email.read;
      axios.put(`emails/${email.id}`, email);
    };

    const toggleArchived = () => {
      email.archived = !email.archived;
      axios.put(`emails/${email.id}`, email);
    };

    const goNewer = () => {};

    const goOlder = () => {};

    return {
      marked,
      format,
      toggleRead,
      toggleArchived,
      goNewer,
      goOlder,
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
