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

  export let data;

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }

  function openPhoto(i) {
    let currentIndex = i;

    $currentPhoto = {
      currentIndex,
      lenght: data.photo.lenght,
      ...data.photo[currentIndex],
    };
  }
</script>

<div class="scroll">
  <ul class="row jcenter xfill">
    {#each data.photo as photo, i}
      <li class="row fcenter">
        <img
          class="fill"
          src={getImage(photo, "w")}
          alt={photo.title}
          on:click={() => openPhoto(i)}
          oncontextmenu="return false"
        />
      </li>
    {/each}
  </ul>

  {#if $currentPhoto.id}
    <Modal />
  {/if}
</div>

<style lang="scss">
  .scroll {
    padding: 100px 0;
  }

  ul {
    gap: 10px;
    padding: 40px;

    @media (max-width: 980px) {
      padding: 20px;
    }
  }

  li {
    width: 300px;
    height: 300px;
    background: $white;
    border: 1px solid $border;
    border-radius: 16px;
    padding: 10px;

    img {
      height: 280px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 5px 10px -5px rgba($black, 0.3);
      transition: 200ms;
    }

    &:hover {
      img {
        filter: opacity(0.5);
      }
    }
  }
</style>
