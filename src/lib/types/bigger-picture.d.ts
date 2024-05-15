declare module 'bigger-picture/svelte' {
  export interface BiggerPictureProps {
    // Define the properties based on the documentation or usage
    target: HTMLElement;
    // ... other properties
  }

  // If BiggerPicture is a function or class, declare its type
  export default function BiggerPicture(options: BiggerPictureProps): any; // Replace 'any' with a more specific type if possible
}