<template>
  <div class="flex mb-8">
    <button
      class="
        mr-2
        px-4
        py-2
        rounded
        bg-blue-500
        font-bold
        text-white
        focus:ring-4
      "
      @click="toggleRead"
    >
      {{ email.read ? "Mark as Unread (r)" : "Mark as Read (r)" }}
    </button>
    <button
      class="
        mr-2
        px-4
        py-2
        rounded
        bg-blue-600
        font-bold
        text-white
        focus:ring-4
      "
      @click="toggleArchived"
    >
      {{ email.archived ? "Move to Inbox (e)" : "Archive (e)" }}
    </button>
    <button
      class="
        mr-2
        px-4
        py-2
        rounded
        bg-purple-600
        font-bold
        text-white
        focus:ring-4
      "
      @click="goOlder"
    >
      Older
    </button>
    <button
      class="
        mr-2
        px-4
        py-2
        rounded
        bg-purple-700
        font-bold
        text-white
        focus:ring-4
      "
      @click="goNewer"
    >
      Newer
    </button>
  </div>
  <h2 class="text-xl mt-3">{{ email.subject }}</h2>
  <h3 class="font-semibold mt-2">
    From: {{ email.from }} on
    {{ format(new Date(this.email.sentAt), "d MMM, yyyy") }}
  </h3>
  <div v-html="marked(email.body)" class="mt-2" />
</template>

<script lang="ts">
import marked from "marked";
import { format } from "date-fns";
import { defineComponent, PropType } from "vue";
import Email from "../models/email";
import useKeydown from "../composables/use-keydown";

export default defineComponent({
  name: "MailView",
  emits: ["changeEmail"],
  setup(_props, { emit }) {
    useKeydown([
      {
        key: "r",
        fn: () => toggleRead(),
      },
      {
        key: "e",
        fn: () => toggleArchived(),
      },
      {
        key: "j",
        fn: () => goNewer(),
      },
      {
        key: "k",
        fn: () => goOlder(),
      },
      {
        key: "[",
        fn: () => goNewerAndArchive(),
      },
      {
        key: "]",
        fn: () => goOlderAndArchive(),
      },
    ]);

    const toggleRead = () => {
      emit("changeEmail", { toggleRead: true, save: true });
    };

    const toggleArchived = () => {
      emit("changeEmail", { toggleArchived: true, save: true });
    };

    const goNewer = () => {
      emit("changeEmail", { changeIndex: -1 });
    };

    const goOlder = () => {
      emit("changeEmail", { changeIndex: 1 });
    };

    const goNewerAndArchive = () => {
      emit("changeEmail", { toggleArchived: true, save: true, changeIndex: 1 });
    };

    const goOlderAndArchive = () => {
      emit("changeEmail", { toggleArchived: true, save: true, changeIndex: 1 });
    };

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
