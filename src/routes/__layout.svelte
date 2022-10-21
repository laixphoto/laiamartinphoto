<script>
  import { ui } from "$content/layout.js";
  import Nav from "$lib/Nav.svelte";
  import "$fonts/circular.css";
  import "$fonts/operator.css";
</script>

<main>
  <Nav />

  <div class="view fill">
    <slot />
  </div>
</main>

<style lang="scss">
  :global {
    @import "./src/_reset.scss";
    @import "../node_modules/verdu/verdu.scss";
    @import ".noe-display.css";
  }

  :root {
    --color-pri: #e3feff;
    --color-sec: #0f2426;

    --font-title: "NoeDisplay";
  }
</style>
