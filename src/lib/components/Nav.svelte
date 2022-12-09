<script>
  import { ui } from "$content/nav";
  import { onMount } from "svelte";

  let showMenu = false;

  function togMenu() {
    showMenu = !showMenu;
  }

  function closeMenu() {
    showMenu = false;
  }

  onMount(() => {
    const wH = window.innerHeight;
    const scroll = document.querySelector(".scroll");
    const verticalLinks = document.querySelectorAll("aside>a");
    const artisticEl = document.querySelector("#artistic");

    scroll.addEventListener("scroll", (e) => {
      const { scrollTop } = e.target;
      console.log(artisticEl.offsetTop - artisticEl.offsetHeight, scrollTop);

      if (
        scrollTop >= wH / 1.7 &&
        scrollTop <= artisticEl.offsetTop - artisticEl.offsetHeight
      ) {
        verticalLinks.forEach((link) => {
          link.style.cssText = "color: #000";
        });
      } else {
        verticalLinks.forEach((link) => {
          link.style.cssText = "color: #fff";
        });
      }
    });
  });
</script>

<nav class="row jbetween xfill">
  <a href="/" class="logo row acenter" on:click={closeMenu}>
    <img src="/logo.svg" alt="Logotipo" />
  </a>

  <button class="menu-btn row fcenter" on:click={togMenu}>
    <img class:close-btn={showMenu} src="/menu.svg" alt="Menú" />
  </button>

  <ul class="col jcenter aend" class:open-menu={showMenu}>
    <li class="row acenter">
      <a href="/" class="row acenter" on:click={togMenu}>
        <p>Inicio</p>
      </a>
    </li>

    {#each ui.routes as { slug, title }, i}
      {#if i === 0 || i === 6}
        <span class="row" />
      {/if}
      <li class="row acenter">
        <a href={slug} class="row nowrap acenter fill" on:click={togMenu}>
          <p>{title}</p>
        </a>
      </li>
    {/each}

    <li class="row acenter">
      <a href="/contacto" class="row acenter" on:click={togMenu}>
        <p>Contacto</p>
      </a>
    </li>
  </ul>
</nav>

<aside>
  <a href="mailto:hola@laiamartinphoto.com">hola@laiamartinphoto.com</a>
  <a href="tel:0034661100652">(+34) 661.100.652</a>
</aside>

<style lang="scss">
  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;

    .logo {
      height: 80px;
      background: var(--color-pri);
      padding: 30px 60px;
      z-index: 1;

      @media (max-width: 980px) {
        width: calc(100% - 80px);
        padding: 30px;
      }

      img {
        width: 120px;

        @media (max-width: 980px) {
          width: 150px;
        }
      }
    }

    .menu-btn {
      width: 80px;
      height: 80px;
      background: var(--color-sec);
      z-index: 1;

      img {
        width: 30px;
        transform: rotateY(180deg);
        transition: 200ms;
      }

      .close-btn {
        transform: rotateY(0deg);
      }
    }

    ul {
      position: fixed;
      top: 0;
      right: -200px;
      width: 100%;
      max-width: 600px;
      height: 100%;
      gap: 10px;
      background: rgba(#0f2426, 0.7);
      backdrop-filter: blur(10px);
      opacity: 0;
      padding-top: 80px;
      transition: 800ms;
      pointer-events: none;

      a {
        font-size: 32px;
        color: var(--color-pri);
        font-weight: bold;
        padding: 0 40px;
        transition: 200ms;

        &:hover {
          transform: scale(1.1);
        }
      }

      span {
        width: 60%;
        height: 1px;
        background: #fff;
        margin: 20px 40px 20px 0;
        opacity: 0.2;
      }
    }

    .open-menu {
      right: 0;
      opacity: 1;
      pointer-events: all;
    }
  }

  aside {
    @media (max-width: 980px) {
      display: none;
    }

    a {
      position: fixed;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
      color: var(--color-pri);
      writing-mode: vertical-lr;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 2px;
      padding: 20px;
      transition: 200ms;
      z-index: 98;
    }

    a:first-of-type {
      left: 0;
    }

    a:last-of-type {
      right: 0;
    }
  }
</style>
