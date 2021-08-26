import { onBeforeUnmount, onBeforeMount } from "vue";

interface KeyCombo {
    key: string;
    fn: Function;
}

const useKeydown = (keyCombos: KeyCombo[]) => {
    const onKeydown = (e: KeyboardEvent) => {

        const matchedKeyCallbacks = keyCombos.filter(kc => kc.key == e.key)

        for (const match of matchedKeyCallbacks) {
            match.fn()
        }
    };

    window.addEventListener("keydown", onKeydown);

    onBeforeUnmount(() => {
        window.removeEventListener("keydown", onKeydown);
    });
}

export default useKeydown