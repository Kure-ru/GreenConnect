<template>
  <main>
    <div class="hero">
      <div data-aos="fade-up" class="displayBox" data-aos-easing="ease-in">
        <h2 class="hero__subtitle">
          Vous avez des <span>amis partout dans le monde</span>
        </h2>
      </div>

      <div data-aos="fade-up" class="displayBox" data-aos-easing="ease-in">
        <h2 class="hero__subtitle">
          Vous ne les avez juste pas encore rencontrés.
        </h2>
      </div>

      <div class="story">
        <div class="story__content">
          <div data-aos="fade-up" class="displayBox" data-aos-easing="ease-in">
            <h1 class="hero__title">Faisons bouger les choses ensemble !</h1>
          </div>
        </div>
        <figure class="story__globe">
          <img
            class="globe__img"
            src="/hero.png"
            alt="globe avec photos d'utilisateurs"
          />
        </figure>
      </div>
    </div>

    <section class="home__section">
      <div data-aos="fade-up" class="displayBox" data-aos-easing="ease-in">
        <h2>Encourage les expériences hors-ligne</h2>
        <p>Les vrais amis ne sont pas des invitations sur une appli. Ils se produisent, mais à l'extérieur, pas devant un écran qui clignote. GreenConnect a été conçu dans un esprit de simplicité, pour créer un sentiment de calme et pour que l'on se souvienne de lui non pas grâce à ses fonctions sophistiquées, mais grâce à ses expériences hors ligne authentiques.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  min-width: 90vw;
}

.home__section h2{
  color: #005959;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.story {
  display: flex;
  overflow: hidden;
  justify-content: center;
  max-width: 900px;
  align-items: center;
}

figure {
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
    rotateY(0deg) rotateZ(335.477deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  will-change: transform;
}

.story__globe {
  position: relative;
  z-index: -50;
  margin-bottom: 0;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  min-width: 650px;
  padding: 0px 0;
  animation: rotateAnimation 90s infinite linear;
}

.globe__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

img {
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
}

.hero__title {
  font-size: 2rem;
  width: 350px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  color: #f2efe6;
  text-align: center;
}

.story__content {
  position: absolute;
  z-index: 150;
  max-width: 560px;
  color: white;
  text-align: center;
}

.home__section {
  padding: 5rem 0;
  max-width: 40%;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
