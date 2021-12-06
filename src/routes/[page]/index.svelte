<script context="module">
  export async function load({ page, fetch }) {
    const album_id = page.query.get("id");

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
  console.log(data);
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
          title={photo.title}
          on:click={() => openPhoto(photo)}
        />
      </li>
    {/each}
  </ul>

  <Modal bind:visible {currentPhoto} />
</div>

<style lang="scss">
  ul {
    padding: 60px;
  }

  li {
    width: 100%;
    max-width: 400px;
    aspect-ratio: 4/3;
    padding: 7px;
  }

  img {
    cursor: zoom-in;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 5px 10px rgba($black, 0.3);
    transition: 300ms;

    &:hover {
      transform: scale(1.1);
    }
  }
</style>
