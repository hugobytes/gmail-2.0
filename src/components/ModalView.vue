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
    <transition name="bounce">
      <div
        v-if="show"
        class="
          bg-gray-800
          shadow-2xl
          rounded-2xl
          p-12
          z-10
          w-full
          max-w-screen-md
        "
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import useKeydown from "../composables/use-keydown";
import { defineComponent, nextTick } from "vue";

export default defineComponent({
  name: "ModalView",
  data() {
    return {
      show: false,
    };
  },
  created() {
    nextTick(() => {
      this.show = true;
    });
  },
  beforeUnmount() {
    this.show = false;
  },
  setup(_props, { emit }) {
    useKeydown([
      {
        key: "Escape",
        fn: () => emit("closeModal"),
      },
    ]);

    return {
      emit,
    };
  },
});
</script>

