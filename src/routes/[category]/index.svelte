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
  import Modal from "$lib/Modal.svelte";

  export let data;
  let visible = false;
  let currentPhoto;

  function getImage({ server, id, secret }, size) {
    const prefix = "https://live.staticflickr.com";
    return `${prefix}/${server}/${id}_${secret}_${size}.jpg`;
  }

  function openPhoto(photo) {
    visible = true;
    currentPhoto = photo;
  }
</script>

<div class="scroll">
  <ul class="row jcenter xfill">
    {#each data.photo as photo}
      <li class="row fcenter">
        <img
          class="fill"
          src={getImage(photo, "w")}
          alt={photo.title}
          on:click={() => openPhoto(photo)}
        />
      </li>
    {/each}
  </ul>

  <Modal bind:visible {currentPhoto} />
</div>

<style lang="scss">
  ul {
    gap: 10px;
    padding: 40px;

    @media (max-width: $mobile) {
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
