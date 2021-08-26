<template>
  <div class="flex items-center h-12 pb-4">
    <div class="ml-6 mt-[6px]">
      <input
        type="checkbox"
        @click="bulkSelect"
        :checked="allSelected"
        class="checkbox checkbox-primary focus:ring-4"
        :class="{
          'animate-spin bg-purple-600': someSelected,
        }"
      />
    </div>
    <button
      class="
        ml-6
        px-3
        py-1
        rounded
        bg-blue-600
        font-bold
        text-white
        focus:ring-4
        disabled:opacity-50
        disabled:bg-gray-600
      "
      @click="markRead"
    >
      Mark Read
    </button>
    <button
      class="
        ml-2
        px-3
        py-1
        rounded
        bg-blue-700
        font-bold
        text-white
        focus:ring-4
        disabled:opacity-50
        disabled:bg-gray-600
      "
      @click="markUnread"
    >
      Mark Unread
    </button>
    <button
      class="
        ml-2
        px-3
        py-1
        rounded
        bg-purple-700
        font-bold
        text-white
        focus:ring-4
        disabled:opacity-50
        disabled:bg-gray-600
      "
      @click="archive"
    >
      Archive
    </button>
    <div class="flex-1" />
    <div>
      <h2 class="font-bold text-xl text-white">
        Emails selected: {{ emailSelection.emails.size }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import useEmailSelection from "../composables/use-email-selection";
import Email from "../models/email";

export default defineComponent({
  name: "SuperActionBar",
  props: {
    emails: {
      type: Array as PropType<Email[]>,
      required: true,
    },
  },
  setup(props) {
    const emails = props.emails;
    const emailSelection = useEmailSelection();

    const allSelected = computed(
      () => emailSelection.emails.size === emails.length
    );
    const someSelected = computed(
      () =>
        emailSelection.emails.size !== emails.length &&
        emailSelection.emails.size > 0
    );

    const bulkSelect = () => {
      if (allSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.selectMultiple(emails);
      }
    };

    const markRead = () => {};

    const markUnread = () => {};

    const archive = () => {};

    return {
      bulkSelect,
      someSelected,
      allSelected,
      emailSelection,
      markRead,
      markUnread,
      archive,
    };
  },
});
</script>
