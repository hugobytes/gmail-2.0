<template>
  <div class="flex items-center h-12">
    <div class="ml-6">
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

    return {
      bulkSelect,
      someSelected,
      allSelected,
      emailSelection,
    };
  },
});
</script>
