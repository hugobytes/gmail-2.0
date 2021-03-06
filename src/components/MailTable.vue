<template>
  <div class="flex mt-3 mb-8 mx-auto w-full justify-center">
    <button
      class="
        mr-2
        font-extrabold
        disabled:underline
        disabled:text-green-500
        text-gray-400
        hover:text-white
      "
      :disabled="screen == 'inbox'"
      @click="setScreen('inbox')"
    >
      Inbox
    </button>
    <div class="text-gray-500">|</div>
    <button
      class="
        ml-2
        font-extrabold
        disabled:underline
        disabled:text-green-500
        text-gray-400
        hover:text-white
      "
      :disabled="screen == 'archives'"
      @click="setScreen('archives')"
    >
      Archives
    </button>
  </div>
  <super-action-bar :emails="emails" />
  <div class="border border-gray-600 rounded shadow-md overflow-hidden">
    <div
      class="
        cursor-pointer
        hover:bg-gray-800
        w-full
        flex
        items-center
        px-6
        h-12
        border-b border-gray-600
        last:border-b-0
        relative
      "
      v-for="email in filteredEmails"
      :key="email.id"
    >
      <div class="mr-4">
        <input
          type="checkbox"
          @click="emailSelection.toggle(email)"
          :checked="emailSelection.emails.has(email)"
          class="checkbox checkbox-primary focus:ring-4"
        />
      </div>
      <div
        @click="openEmail(email)"
        class="flex flex-1 items-center h-full px-3 truncate"
      >
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
        <div class="text-gray-400">
          {{ format(new Date(email.sentAt), "d MMM, yyyy") }}
        </div>
      </div>
      <button
        class="
          px-3
          py-1
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
import { defineComponent, reactive, Ref, ref } from "vue";
import axios from "axios";
import Email from "../models/email";
import MailView from "./MailView.vue";
import ModalView from "./ModalView.vue";
import useEmailSelection from "../composables/use-email-selection";
import SuperActionBar from "./SuperActionBar.vue";

interface ChangeEmailOptions {
  toggleArchived: boolean;
  toggleRead: boolean;
  save: boolean;
  changeIndex: number;
}

export default defineComponent({
  components: { MailView, ModalView, SuperActionBar },
  name: "MailTable",
  computed: {
    sortedEmails(): Email[] {
      return this.emails.sort(
        (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
      );
    },
    filteredEmails(): Email[] {
      return this.screen == "inbox"
        ? this.sortedEmails.filter((email) => !email.archived)
        : this.sortedEmails.filter((email) => email.archived);
    },
  },
  async setup() {
    const screen = ref("inbox");
    const { data: emails } = await axios.get("emails");
    const openedEmail: Ref<Email | null> = ref(null);
    const emailSelection = useEmailSelection();

    const setScreen = (newScreen: string) => {
      screen.value = newScreen;
      emailSelection.clear();
    };

    return {
      format: format as Function,
      emails: ref(emails) as Email[],
      openedEmail,
      emailSelection: useEmailSelection(),
      setScreen,
      screen,
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
        const currentIndex = this.filteredEmails
          .map((email) => email.id)
          .indexOf(this.openedEmail.id);
        const nextIndex = currentIndex + changeIndex;
        this.openEmail(this.filteredEmails[nextIndex]);
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
