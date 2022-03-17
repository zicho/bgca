import { writable } from "svelte/store";

export let confirmDialogIsOpen = writable<boolean>(false);
export let messageDialogIsOpen = writable<boolean>(false);
export let dialogMessage = writable<string>();

let dialogConfirmAction: Function;

export function showMessageDialog(msg: string) {
    messageDialogIsOpen.set(true);
    dialogMessage.set(msg);
}

export function showConfirmDialog(msg: string, confirmAction: Function) {
    confirmDialogIsOpen.set(true);
    dialogConfirmAction = confirmAction;
    dialogMessage.set(msg);
}

export function onDialogConfirmClicked() {
    dialogConfirmAction();
    confirmDialogIsOpen.set(false);
}