<template>
  <div class="border">
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
      @click="openEmail(email)"
    >
      <div class="mr-4">
        <input
          type="checkbox"
          class="h-5 w-5 text-pink-600 cursor-pointer focus:ring-4 rounded"
        />
      </div>
      <div class="w-48 truncate mr-3">
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
        {{ format(new Date(email.sentAt), "d MMM, yyyy") }}
      </div>
      <button
        class="
          px-4
          py-2
          bg-gradient-to-br
          from-red-400
          to-purple-600
          hover:to-red-400
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
  </div>
  <modal-view v-if="openedEmail" @closeModal="openedEmail = null">
    <mail-view :email="openedEmail" @changeEmail="changeEmail" />
  </modal-view>
</template>

<script lang="ts">
import { format } from "date-fns";
import { defineComponent, Ref, ref } from "vue";
import axios from "axios";
import Email from "../models/email";
import MailView from "./MailView.vue";
import ModalView from "./ModalView.vue";

interface ChangeEmailOptions {
  toggleArchived: boolean;
  toggleRead: boolean;
  save: boolean;
  changeIndex: number;
}

export default defineComponent({
  components: { MailView, ModalView },
  name: "MailTable",
  computed: {
    sortedEmails(): Email[] {
      return this.emails.sort(
        (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
      );
    },
    unarchivedEmails(): Email[] {
      return this.sortedEmails.filter((email) => !email.archived);
    },
  },
  async setup() {
    const { data: emails } = await axios.get("emails");
    const openedEmail: Ref<Email | null> = ref(null);

    return {
      format: format as Function,
      emails: ref(emails) as Email[],
      openedEmail,
    };
  },
  methods: {
    openEmail(email: Email | null) {
      this.openedEmail = email;

      if (email) {
        email.read = true;
        this.updateEmail(email);
      }
    },
    archiveEmail(email: Email) {
      email.archived = true;
      this.updateEmail(email);
    },
    updateEmail(email: Email) {
      axios.put(`emails/${email.id}`, email);
    },
    changeEmail({
      toggleArchived,
      toggleRead,
      changeIndex,
      save,
    }: ChangeEmailOptions) {
      const email = this.openedEmail;

      if (changeIndex && this.openedEmail) {
        const currentIndex = this.unarchivedEmails
          .map((email) => email.id)
          .indexOf(this.openedEmail.id);
        const nextIndex = currentIndex + changeIndex;
        this.openEmail(this.unarchivedEmails[nextIndex]);
      }

      if (email) {
        if (toggleArchived) {
          email.archived = !email.archived;
        }

        if (toggleRead) {
          email.read = !email.read;
        }

        if (save) {
          this.updateEmail(email);
        }
      }
    },
  },
});
</script>
