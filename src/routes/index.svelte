<script context="module">
  const API = {
    key: import.meta.env.VITE_KEY,
    user: import.meta.env.VITE_USER,
  };

  export async function load({ fetch }) {
    const cover_id = "72177720303667443";
    const sections_id = "72157720267167555";

    const coverURL = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API.key}&photoset_id=${cover_id}&user_id=${API.user}&format=json&nojsoncallback=1`;
    const sectionsURL = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API.key}&photoset_id=${sections_id}&user_id=${API.user}&format=json&nojsoncallback=1`;

    const reqCover = await fetch(coverURL);
    const reqSections = await fetch(sectionsURL);

    const resCover = await reqCover.json();
    const resSections = await reqSections.json();

    const { photoset: coverData } = resCover;
    const { photoset: sectionsData } = resSections;

    return {
      props: {
        coverData,
        sectionsData,
      },
    };
  }
</script>

<script>
  import { ui } from "$content/home";
  import { ui as pages } from "$content/nav";
  import Mouse from "$lib/icons/Mouse.svelte";
  import Footer from "$lib/components/Footer.svelte";

  /* export let coverData; */
  export let coverData;
  export let sectionsData;
  const routes = [...pages.routes];

  const coverImage = {
    id: coverData.photo[0].id,
    server: coverData.photo[0].server,
    secret: coverData.photo[0].secret,
  };

  routes.forEach((route) => {
    sectionsData.photo.forEach((photo) => {
      if (photo.title === route.title) {
        route["photo"] = photo;
      }
    });
  });

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }

  function toSlug(title) {
    return title.toLowerCase().replaceAll(" ", "-");
  }
</script>

<svelte:head>
  <title>{ui.title}</title>
  <meta name="description" content={ui.description} />
</svelte:head>

<div class="scroll">
  <section
    id="welcome"
    class="col fcenter fill"
    style="background-image: url({getImage(
      {
        server: coverImage.server,
        id: coverImage.id,
        secret: coverImage.secret,
      },
      'b'
    )})"
  >
    <img src="/logo-white-full.svg" alt="Laia Martín Photography" />
    <Mouse />
  </section>
  <!-- <section
    id="welcome"
    class="col fcenter fill"
    style="background-image: url('/bg-welcome.jpg')"
  >
    <img src="/logo-white-full.svg" alt="Laia Martín Photography" />
    <Mouse />
  </section> -->

  <section id="sections" class="col xfill">
    <ul class="xfill">
      {#each sectionsData.photo as { title, server, id, secret }}
        {#if title !== "Diseño Gráfico"}
          <li>
            <a class="row fill" href={toSlug(title)}>
              <img
                class="fill"
                src={getImage({ server, id, secret }, "b")}
                alt={title}
              />
              <p class="row fcenter">{title}</p>
            </a>
          </li>
        {/if}
      {/each}
    </ul>
  </section>

  <section id="artistic" class="col fcenter xfill">
    <div class="gradient" />
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
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;

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
        border-radius: 10px;
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
          color: #fff;
          text-align: center;
          line-height: 1;
          font-family: var(--font-title);
          font-size: 60px;
          font-weight: bold;
          text-shadow: 0 0 15px rgba(#000, 0.2);
          opacity: 0;
          margin-top: auto;
          padding: 10px;
          transition: 500ms;

          &:hover {
            opacity: 1;
          }

          @media (hover: none) {
            opacity: 1;
            font-size: 40px;
          }
        }
      }
    }
  }

  #artistic {
    position: relative;
    gap: 20px;
    background: url("/artistica.jpg") no-repeat center;
    background-size: cover;
    background-attachment: fixed;
    padding: 15% 40px;
    color: #fff;

    @media (max-width: 980px) {
      padding: 100px 20px;
    }

    .gradient {
      position: absolute;
      inset: 0;
      background: radial-gradient(closest-side, transparent, #000);
    }

    h2 {
      font-family: var(--font-title);
      font-size: 60px;
      line-height: 1;
      text-align: center;
      z-index: 1;

      @media (max-width: 980px) {
        font-size: 40px;
      }
    }

    p {
      max-width: 900px;
      text-align: center;
      z-index: 1;
    }
  }
</style>
