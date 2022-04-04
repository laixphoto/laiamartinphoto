<script>
  import { fade } from "svelte/transition";
  export let visible = false;
  export let currentPhoto;

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }

  /* $: if (visible) {
    const image = new Image();
    image.src = getImage(currentPhoto, "b");
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const { naturalWidth, naturalHeight } = image;
    const ratio = naturalWidth / naturalHeight;
    const width = canvas.width;
    const height = canvas.height;
    const x = (width - height * ratio) / 2;
    const y = 0;
    const w = height * ratio;
    const h = height;

    ctx.drawImage(image, x, y, w, h, 0, 0, width, height);
  } */
</script>

{#if visible}
  <div class="outer fill" on:click={() => (visible = false)} transition:fade />
  <div class="modal row fcenter" style="background-image: url({getImage(currentPhoto, 'b')})" transition:fade />
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
    width: 90%;
    height: 90%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>
