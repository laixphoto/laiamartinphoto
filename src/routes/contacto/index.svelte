<script>
  import Footer from "$lib/components/Footer.svelte";

  function sendForm(e) {
    console.log(e);
    const email = "hola@laiamartinphoto.com";
  }
</script>

<section id="contact" class="scroll">
  <article class="col fcenter xfill">
    <h1>Contacto</h1>

    <p>
      Email: <a href="mailto:hola@laiamartinphoto.com">
        hola@laiamartinphoto.com
      </a>
      <br />
      Teléfono: <a href="tel:0034661100652">(+34) 661.100.652</a>
      <br />
      <br />
      <a
        class="btn sec semi"
        href="https://wa.me/34661100652">Enviar un Whatsapp</a
      >
    </p>

    <!-- <form class="col xfill" on:submit={() => sendForm(e)}>
        <div class="input-wrapper col xfill">
          <label for="name">Nombre</label>
          <input class="xfill" type="text" id="name" name="name" />
        </div>
  
        <div class="input-wrapper col xfill">
          <label for="email">Email</label>
          <input class="xfill" type="email" id="email" name="email" />
        </div>
  
        <div class="input-wrapper col xfill">
          <label for="phone">Teléfono</label>
          <input class="xfill" type="phone" id="phone" name="phone" />
        </div>
  
        <div class="input-wrapper col xfill">
          <label for="message">Mensaje</label>
          <textarea class="xfill" id="message" name="message" />
        </div>
  
        <button class="pri semi" type="submit">Enviar</button>
      </form> -->
  </article>

  <Footer />
</section>

<style lang="scss">
  section {
    background: #fff;
  }

  article {
    min-height: calc(100% - 260px);
    padding: 40px;
    
    @media (max-width: $mobile) {
      min-height: calc(100% - 323px);
      padding-top: 120px;
    }
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    text-align: center;
    line-height: 1.8;
  }

  a:not(.btn) {
    text-decoration: underline;
    transition: 200ms;

    &:hover {
      text-decoration: none;
    }
  }

  a.btn {
    width: 200px;
    margin: 0 auto;
  }

  /* form {
    max-width: 600px;
    background: $white;
    gap: 20px;
    box-shadow: 0 5px 10px -5px rgba($black, 0.3);
    padding: 40px;
    margin-top: 60px;

    @media (max-width: $mobile) {
      padding: 20px;
    }
  }

  .input-wrapper {
    gap: 10px;
  }

  label {
    font-size: 12px;
    text-transform: uppercase;
    padding: 0 15px;
  }

  input,
  textarea {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.2rem;

    &:focus {
      outline: none;
      border-color: $pri;
    }
  }

  textarea {
    height: 150px;
    resize: none;
  }

  button {
    width: 200px;
    color: $white;
    margin: 20px auto 0 auto;
  } */
</style>
