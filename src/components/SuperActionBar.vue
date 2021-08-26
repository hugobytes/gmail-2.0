<template>
  <div class="flex items-center h-12">
    <div class="ml-6">
      <input
        type="checkbox"
        @click="bulkSelect"
        :checked="someSelected || allSelected"
        class="checkbox checkbox-primary focus:ring-4"
        :class="{ 'opacity-25': someSelected }"
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
import { computed, ComputedRef, defineComponent, PropType } from "vue";
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

    const noneSelected = computed(() => emailSelection.emails.size == 0);
    const allSelected = computed(
      () => emailSelection.emails.size == emails.length
    );
    const someSelected: ComputedRef<boolean> = computed(
      () => !allSelected.value && !noneSelected.value
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
      noneSelected,
      emailSelection,
    };
  },
});
</script>
