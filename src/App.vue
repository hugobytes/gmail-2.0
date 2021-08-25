<template>
  <div class="mx-auto max-w-screen-xl">
    <h1
      class="
        font-extrabold
        leading-tight
        text-4xl
        my-4
        mx-auto
        animate-bounce
        text-center text-blue-500
      "
    >
      GMail 2.0
    </h1>
    <suspense>
      <template #default>
        <mail-table />
      </template>
      <template #fallback>
        <div
          class="
            justify-center
            flex
            h-screen
            w-screen
            items-center
            animate-bounce
          "
        >
          Loading ...
        </div>
      </template>
    </suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MailTable from "./components/MailTable.vue";

export default defineComponent({
  components: { MailTable },
  name: "App",
});
</script>
