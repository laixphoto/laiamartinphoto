<script context="module">
  import { ui } from "$content/nav";

  export async function load({ page, fetch }) {
    let { id: album_id } = ui.routes.filter((r) => {
      if (r.slug === `/${page.params.category}`) return r;
    })[0];

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
  import { currentPhoto } from "$src/stores";
  import Modal from "$lib/components/Modal.svelte";
  import Footer from "$lib/components/Footer.svelte";

  export let data;

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }

  function openPhoto(currentIndex) {
    const lastIndex = data.photo.length - 1;

    $currentPhoto = {
      active: true,
      currentIndex,
      lastIndex,
      photos: data.photo,
    };
  }
</script>

<div class="scroll">
  <section
    id="welcome"
    class="col fcenter xfill"
    style="background-image: url({getImage(data.photo[0], 'b')})"
  >
    <h1>{data.title}</h1>
  </section>

  <section id="gallery">
    <ul class="row jcenter xfill">
      {#each data.photo as img, i}
        <li class="xfill">
          <img
            class="fill"
            src={getImage(img, "b")}
            alt={img.title}
            on:click={() => openPhoto(i)}
            oncontextmenu="return false"
          />
        </li>
      {/each}
    </ul>
  </section>

  {#if $currentPhoto.active}
    <Modal />
  {/if}

  <Footer />
</div>

<style lang="scss">
  section {
    background-color: #fff;
  }

  #welcome {
    position: static;
    height: 75%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    
    @media (max-width: 980px) {
      height: 50%;
      aspect-ratio: 1;
      background-attachment: scroll;
      margin-top: 80px;
    }

    h1 {
      color: #fff;
      font-family: var(--font-title);
      font-size: 100px;
      line-height: 1;
      text-align: center;
      text-shadow: 0 0 15px rgba(#000, 0.2);
      z-index: 1;

      @media (max-width: 980px) {
        font-size: 40px;
      }
    }
  }

  #gallery {
    ul {
      max-width: 1300px;
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
        cursor: pointer;
        border-radius: 10px;
        outline: 2px solid var(--color-pri);
        overflow: hidden;
        transition: 200ms;

        &:hover {
          box-shadow: 0 15px 15px -10px rgba(#000, 0.2);
          transform: scale(1.005);
        }

        &:nth-of-type(5n + 1) {
          height: 840px;
          grid-row: span 2;
        }
        &:nth-of-type(5n + 2) {
          height: 400px;
          grid-row: span 1;
        }
        &:nth-of-type(5n + 3) {
          height: 400px;
          grid-row: span 1;
        }
        &:nth-of-type(5n + 4) {
          height: 400px;
          grid-row: span 1;
        }
        &:nth-of-type(5n + 5) {
          height: 400px;
          grid-row: span 1;
        }

        @media (max-width: 980px) {
          grid-row: unset !important;
          height: 300px !important;
        }

        img {
          object-fit: cover;
        }
      }
    }
  }
</style>
