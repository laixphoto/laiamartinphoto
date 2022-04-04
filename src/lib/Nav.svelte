<script>
  import { ui } from "$content/nav";
  import { page } from "$app/stores";
</script>

<nav class="row jbetween acenter xfill">
  <a href="/" class="row acenter">
    <img class="logo" src="/logo-p.jpg" alt="Laia Martín Photo" />
  </a>

  <ul class="desktop-menu row yfill">
    <li class="row acenter yfill"><a href="/" class="row acenter yfill">Inicio</a></li>

    <li class="row acenter yfill">
      <p class="row acenter yfill">{ui.menu_title}</p>

      <ul class="expand-menu col">
        {#each ui.routes as { slug, title, id }}
          <li class="xfill" class:active={$page.path === slug}>
            <a href="{slug}?id={id}" class="row nowrap acenter fill">
              <p>{title}</p>
            </a>
          </li>
        {/each}
      </ul>
    </li>

    <li class="row acenter yfill"><a href="/contacto" class="row acenter yfill">Contacto</a></li>
  </ul>
</nav>

<style lang="scss">
  nav {
    height: 70px;
    background: $white;
    border-bottom: 1px solid $border;
    padding: 0 40px;

    @media (max-width: $mobile) {
      padding: 0 20px;
    }
  }

  .logo {
    width: 150px;

    @media (max-width: $mobile) {
      width: 175px;
    }
  }

  li {
    cursor: pointer;
    position: relative;
    padding: 0 20px;

    .expand-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: $white;
      opacity: 0;
      pointer-events: none;
      z-index: 999;
      transition: 200ms;

      li {
        height: 40px;
        border-bottom: 1px solid $border;
        padding: 0.5em 1em;
        transition: 200ms;

        &:hover {
          background: $border;
        }

        &:last-of-type {
          border-bottom: none;
        }
      }
    }

    &:hover {
      background: $border;

      .expand-menu {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
</style>
