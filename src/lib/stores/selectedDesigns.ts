import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store'

type DesignUnit = {
  // define the properties of a design unit
  name: string;
  unit?: {}
  // ...other properties
};

export const selectedDesigns: Writable<DesignUnit[]> = writable([]);