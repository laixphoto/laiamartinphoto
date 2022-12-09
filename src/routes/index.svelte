<script context="module">
  const API = {
    key: import.meta.env.VITE_KEY,
    user: import.meta.env.VITE_USER,
  };

  export async function load({ fetch }) {
    const cover_id = "72177720303667443";
    const sections_id = "72157720267167555";
    const artistic_id = "72177720303648025";

    const coverURL = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API.key}&photoset_id=${cover_id}&user_id=${API.user}&format=json&nojsoncallback=1`;
    const sectionsURL = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API.key}&photoset_id=${sections_id}&user_id=${API.user}&format=json&nojsoncallback=1`;
    const artisticURL = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API.key}&photoset_id=${artistic_id}&user_id=${API.user}&format=json&nojsoncallback=1`;

    const reqCover = await fetch(coverURL);
    const reqSections = await fetch(sectionsURL);
    const reqArtistic = await fetch(artisticURL);

    const resCover = await reqCover.json();
    const resSections = await reqSections.json();
    const resArtistic = await reqArtistic.json();

    const { photoset: coverData } = resCover;
    const { photoset: sectionsData } = resSections;
    const { photoset: artisticData } = resArtistic;

    return {
      props: {
        coverData,
        sectionsData,
        artisticData,
      },
    };
  }
</script>

<script>
  import { ui } from "$content/home";
  import { ui as pages } from "$content/nav";
  import Mouse from "$lib/icons/Mouse.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { fade } from "svelte/transition";

  /* export let coverData; */
  export let coverData;
  export let sectionsData;
  export let artisticData;
  const routes = [...pages.routes];

  const coverImage = {
    id: coverData.photo[0].id,
    server: coverData.photo[0].server,
    secret: coverData.photo[0].secret,
  };

  const artisticImage = {
    id: artisticData.photo[0].id,
    server: artisticData.photo[0].server,
    secret: artisticData.photo[0].secret,
    title: artisticData.photo[0].title,
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

  let DOM = false;
  setTimeout(() => {
    DOM = true;
  });
</script>

<svelte:head>
  <title>{ui.title}</title>
  <meta name="description" content={ui.description} />
</svelte:head>

<div class="scroll">
  {#if DOM}
    <section
      transition:fade
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
      <a href="#sections">
        <Mouse />
      </a>
    </section>

    <section id="sections" class="col xfill" transition:fade>
      <ul class="xfill">
        {#each sectionsData.photo as { title, server, id, secret }}
          {#if title !== "Diseño Gráfico"}
            <li>
              <a class="row fill" href={toSlug(title)}>
                <img
                  class="fill"
                  src={getImage({ server, id, secret }, "b")}
                  alt={title}
                  oncontextmenu="return false"
                />
                <p class="row fcenter">{title}</p>
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </section>

    <section
      transition:fade
      id="artistic"
      class="col fcenter xfill"
      style="background-image: url({getImage(
        {
          server: artisticImage.server,
          id: artisticImage.id,
          secret: artisticImage.secret,
        },
        'b'
      )})"
    >
      <div class="gradient" />
      <h2>Fotografía artística</h2>
      <a class="btn sec semi" href={toSlug(artisticImage.title)}>VER FOTOS</a>
    </section>

    <Footer />
  {/if}
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

          @media (max-width: 980px) {
            font-size: 40px;
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
    background-repeat: no-repeat;
    background-position: center;
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
      background: radial-gradient(closest-side, transparent, rgba(#000, 0.3));
      pointer-events: none;
    }

    h2 {
      font-family: var(--font-title);
      font-size: 60px;
      line-height: 1;
      text-align: center;
      text-shadow: 0 0 15px rgba(#000, 0.2);
      z-index: 1;

      @media (max-width: 980px) {
        font-size: 40px;
      }
    }
  }
</style>
