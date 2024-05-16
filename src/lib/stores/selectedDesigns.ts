import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store'

type DesignUnit = {
  // define the properties of a design unit
  name: string;
  unit?: {
    design_name: {
      text: string
    }
    design_artwork?: any;
  }
  // ...other properties
};

export const selectedDesigns: Writable<DesignUnit[]> = writable([]);