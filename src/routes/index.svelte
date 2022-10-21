<script context="module">
  export async function load({ fetch }) {
    const album_id = "72157720267167555";

    const req = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ album_id }),
    });

    const res = await req.json();
    const data = res.photoset;

    return {
      props: {
        data,
      },
    };
  }
</script>

<script>
  import { ui } from "$content/home";
  import { ui as pages } from "$content/nav";
  import Mouse from "$lib/icons/Mouse.svelte";
  import Footer from "$lib/Footer.svelte";

  export let data;
  const routes = [...pages.routes];

  routes.forEach((route) => {
    data.photo.forEach((photo) => {
      if (photo.title === route.title) {
        route["photo"] = photo;
      }
    });
  });

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }
</script>

<svelte:head>
  <title>{ui.title}</title>
  <meta name="description" content={ui.description} />
</svelte:head>

<div class="scroll">
  <section id="welcome" class="col fcenter fill">
    <img src="/logo-white-full.svg" alt="Laia Martín Photography" />
    <Mouse />
  </section>

  <section id="sections" class="col xfill">
    <ul class="xfill">
      {#each routes as route}
        {#if route.photo && !route.section}
          <li>
            <a class="row fill" href={route.slug}>
              <img
                class="fill"
                src={getImage(route.photo, "w")}
                alt={route.title}
              />
              <p class="row fcenter">{route.title}</p>
            </a>
          </li>
        {/if}
      {/each}
    </ul>
  </section>

  <section id="artistic" class="col fcenter xfill">
    <h2>Fotografía artística</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum voluptas,
      sequi repellendus officia minus ipsam neque debitis rerum veritatis quidem
      nemo ab maxime ducimus dolor placeat? Voluptatibus iusto magnam quo.
    </p>
  </section>

  <Footer />
</div>

<style lang="scss">
  #welcome {
    background: url("/bg-welcome.jpg") no-repeat center;
    background-size: cover;

    img {
      width: 40%;
      min-width: 250px;
    }
  }

  #sections {
    ul {
      max-width: 1200px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: repeat(3, 1fr);
      justify-content: stretch;
      gap: 40px;
      margin: 0 auto;
      padding: 100px 40px;

      @media (max-width: 980px) {
        grid-template-columns: 1fr;
        grid-auto-rows: 1fr;
        gap: 20px;
        padding: 60px 20px;
      }

      li {
        position: relative;
        overflow: hidden;

        &:nth-of-type(5n + 1) {
          grid-row: span 2;
        }
        &:nth-of-type(5n + 2) {
          grid-row: span 1;
        }
        &:nth-of-type(5n + 3) {
          grid-row: span 1;
        }
        &:nth-of-type(5n + 4) {
          grid-row: span 1;
          aspect-ratio: 12/9;
        }
        &:nth-of-type(5n + 5) {
          grid-row: span 1;
          aspect-ratio: 12/9;
        }

        @media (max-width: 980px) {
          grid-row: unset !important;
          aspect-ratio: 12/9;
        }

        img {
          object-fit: cover;
        }

        p {
          position: absolute;
          inset: 0;
          background: rgba(#000, 0.5);
          backdrop-filter: saturate(50%);
          color: #fff;
          text-align: center;
          line-height: 1;
          font-family: var(--font-title);
          font-size: 60px;
          font-weight: bold;
          margin-top: auto;
          transition: 500ms;
          padding: 10px;

          &:hover {
            opacity: 0;
          }
        }
      }
    }
  }

  #artistic {
    gap: 20px;
    background: url("/artistica.jpg") no-repeat center;
    background-attachment: fixed;
    background-size: cover;
    padding: 200px 40px;
    color: #fff;
    
    @media (max-width: 980px) {
      padding: 100px 20px;
    }

    h2 {
      font-family: var(--font-title);
      font-size: 60px;
      line-height: 1;
      text-align: center;

      @media (max-width: 980px) {
        font-size: 40px;
      }
    }

    p {
      max-width: 900px;
      text-align: center;
    }
  }
</style>
