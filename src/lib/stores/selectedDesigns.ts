import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store'

type DesignUnit = {
  // define the properties of a design unit
  selected: boolean;
  id: string;
    design_name: {
      text: string
    }
  // ...other properties
};

export const selectedDesigns: Writable<DesignUnit[]> = writable([]);