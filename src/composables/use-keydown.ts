import { onBeforeUnmount } from "vue";

interface KeyCombo {
    key: string;
    fn: Function;
}

const useKeydown = (keyCombos: KeyCombo[]) => {
    const onKeydown = (e: KeyboardEvent) => {

        const matchedKeyCallback = keyCombos.find(kc => kc.key == e.key)

        if (matchedKeyCallback) {
            matchedKeyCallback.fn()
        }
    };

    window.addEventListener("keydown", onKeydown);

    onBeforeUnmount(() => {
        window.removeEventListener("keydown", onKeydown);
    });
}

export default useKeydown