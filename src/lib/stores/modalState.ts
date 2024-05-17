import { writable } from 'svelte/store'

const modalState = writable({
  errorModal: false as boolean,
  successModal: false as boolean,
  deleteModal: false as boolean,
})

export { modalState };