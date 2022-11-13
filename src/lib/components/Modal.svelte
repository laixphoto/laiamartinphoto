<script>
  import { fade } from "svelte/transition";
  import { currentPhoto } from "$src/stores";

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }

  function closePhoto() {
    $currentPhoto = {};
  }

  function nextPhoto() {
    $currentPhoto.currentIndex++;
  }
</script>

<div class="outer fill" on:click={closePhoto} transition:fade />
<img
  class="modal row fcenter"
  src={getImage($currentPhoto, "b")}
  alt={$currentPhoto.title}
  transition:fade
/>

<!-- <button on:click={nextPhoto}>next</button> -->

<style lang="scss">
  .outer,
  .modal {
    position: fixed;
  }

  .outer {
    cursor: zoom-out;
    top: 0;
    left: 0;
    background: rgba($black, 0.9);
    backdrop-filter: blur(10px);
  }

  .modal {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 80%;
  }

  button {
    position: fixed;
    bottom: 0;
  }
</style>
