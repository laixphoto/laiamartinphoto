<script>
  import "$fonts/circular.css";
  import "$fonts/operator.css";

  import { navigating } from "$app/stores";
  import { fade } from "svelte/transition";

  import Nav from "$lib/components/Nav.svelte";
  import Loading from "$lib/components/Loading.svelte";
</script>

<main>
  <Nav />

  {#if $navigating}
    <span class="row fcenter fill" transition:fade>
      <Loading />
    </span>
  {:else}
    <div class="view fill">
      <slot />
    </div>
  {/if}
</main>

<style lang="scss">
  :global {
    @import "./src/_reset.scss";
    @import "../node_modules/verdu/verdu.scss";
    @import ".noe-display.css";

    main {
      background: #000;
    }

    .scroll {
      scroll-behavior: smooth;
    }
  }

  :root {
    --color-pri: #e3feff;
    --color-sec: #0f2426;

    --font-title: "NoeDisplay";
  }

  span {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;
  }
</style>
