<script>
  import { fade } from "svelte/transition";
  import { currentPhoto } from "$src/stores";
  import { swipe } from "svelte-gestures";

  import Arrow from "$lib/icons/Arrow.svelte";

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }

  function closePhoto() {
    $currentPhoto = {};
  }

  function prevPhoto() {
    if ($currentPhoto.currentIndex === 0) $currentPhoto.currentIndex = 0;
    else $currentPhoto.currentIndex--;
  }

  function nextPhoto() {
    if ($currentPhoto.currentIndex < $currentPhoto.lastIndex)
      $currentPhoto.currentIndex++;
    else $currentPhoto.currentIndex = $currentPhoto.lastIndex;
  }

  function handleSwipe(e) {
    const { direction } = e.detail;

    if (direction === "right") prevPhoto();
    if (direction === "left") nextPhoto();
  }
</script>

<div class="outer fill" on:click={closePhoto} transition:fade />
<img
  class="modal row fcenter"
  src={getImage($currentPhoto.photos[$currentPhoto.currentIndex], "b")}
  alt={$currentPhoto.title}
  transition:fade
  oncontextmenu="return false"
  use:swipe
  on:swipe={handleSwipe}
/>

<button
  class="btn-prev row fcenter"
  class:disabled={$currentPhoto.currentIndex === 0}
  on:click={prevPhoto}
>
  <Arrow />
</button>

<button
  class="btn-next row fcenter"
  class:disabled={$currentPhoto.currentIndex === $currentPhoto.lastIndex}
  on:click={nextPhoto}
>
  <Arrow invert={true} />
</button>

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
    z-index: 98;
  }

  .modal {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: calc(90% - 120px);
    z-index: 99;
  }

  button {
    position: fixed;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 70px;
    height: 70px;
    background: rgba(#000, 0.7);
    border-radius: 50%;
    padding: 0;
    z-index: 999;

    &:hover {
      transform: scale(1.1);
      transform-origin: center;
    }

    @media (max-width: 980px) {
      display: none;
    }
  }

  .btn-prev {
    left: 8%;
  }

  .btn-next {
    right: 8%;
  }

  .disabled {
    opacity: 0.2;
  }
</style>
