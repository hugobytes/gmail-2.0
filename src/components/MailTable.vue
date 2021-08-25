<template>
  <div
    class="
      cursor-pointer
      hover:bg-gray-100
      w-full
      flex
      items-center
      px-6
      py-3
      border-b border-gray-200
      relative
    "
    v-for="email in unarchivedEmails"
    :key="email.id"
    @click="readEmail(email)"
  >
    <div class="mr-4">
      <input type="checkbox" class="cursor-pointer" />
    </div>
    <div class="w-48 truncate">
      {{ email.from }}
    </div>
    <div
      class="relative w-12 h-full flex items-center justify-center"
      v-if="!email.read"
    >
      <span class="flex h-3 w-3 absolute">
        <span
          class="
            animate-ping
            absolute
            inline-flex
            h-full
            w-full
            rounded-full
            bg-purple-400
            opacity-75
          "
        ></span>
        <span
          class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"
        ></span>
      </span>
    </div>
    <div :class="email.read ? '' : 'font-bold'" class="flex-1 truncate">
      {{ email.subject }}
    </div>
    <div class="text-gray-700">
      {{ format(new Date(email.sentAt), "do MMM, yyyy") }}
    </div>
    <button
      class="
        px-4
        py-2
        bg-gradient-to-br
        from-blue-500
        to-purple-900
        hover:from-purple-900
        focus:ring-4
        rounded
        font-bold
        text-white
        ml-3
      "
      @click="archiveEmail(email)"
    >
      Archive
    </button>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";
import { defineComponent, ref } from "vue";
import axios from "axios";

interface Email {
  id: number;
  from: string;
  subject: string;
  body: string;
  sentAt: string;
  archived: boolean;
  read: boolean;
}

export default defineComponent({
  name: "MailTable",
  computed: {
    sortedEmails() {
      return this.emails.sort(
        (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
      );
    },
    unarchivedEmails() {
      return this.sortedEmails.filter((email) => !email.archived);
    },
  },
  async setup() {
    const { data: emails } = await axios.get("emails");

    return {
      format,
      emails: ref(emails),
    };
  },
  methods: {
    readEmail(email: Email) {
      email.read = true;
      this.updateEmail(email);
    },
    archiveEmail(email: Email) {
      email.archived = true;
      this.updateEmail(email);
    },
    updateEmail(email: Email) {
      axios.put(`emails/${email.id}`, email);
    },
  },
});
</script>
