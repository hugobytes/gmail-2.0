<template>
  <div
    class="
      h-screen
      w-screen
      flex
      items-center
      justify-center
      fixed
      top-0
      left-0
    "
  >
    <div
      class="
        bg-gradient-to-br
        from-red-500
        to-purple-800
        h-screen
        w-screen
        absolute
        z-0
        opacity-75
      "
      @click="emit('closeModal')"
    />
    <div class="bg-white rounded-2xl p-12 z-10 w-full max-w-screen-md">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "ModalView",
  setup(_props, { emit }) {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        emit("closeModal");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", onKeyDown);
    });

    return {
      emit,
    };
  },
});
</script>
