<script>
  import { fade } from "svelte/transition";
  export let visible = false;
  export let currentPhoto;

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }
</script>

{#if visible}
  <div class="outer fill" on:click={() => (visible = false)} transition:fade />
  <img
    class="modal row fcenter"
    src={getImage(currentPhoto, "b")}
    alt={currentPhoto.title}
    transition:fade
  />
{/if}

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
</style>
