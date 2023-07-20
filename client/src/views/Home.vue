<template>
  <div class="hero">
    <h2 class="hero__subtitle">
      Vous avez des <span>amis partout dans le monde</span>,
      <br />
      Vous ne les avez juste pas encore rencontrés.
    </h2>

    <div>
      <figure>
        <img
          class="hero__img"
          src="/hero.png"
          alt="globe avec photos d'utilisateurs"
        />
      </figure>
      <div class="title__container">
        <h1 class="hero__title">Faisons bouger les choses ensemble !</h1>
      </div>
    </div>
  </div>
</template>

<style>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
}
figure {
  margin-top: 150px;
  animation: rotation 100s infinite linear;
  position: relative;
}

.hero__img {
  max-width: 100%;
  object-fit: contain;
}

.hero__title {
  font-size: clamp(1.2rem, 3.5vw, 3rem);
  width: 500px;
  position: absolute;
  bottom: 500px;
  left: 340px;
  color: #f2efe6;
  text-align: center;
}

.title__container {
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
    rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
}

.hero__subtitle {
  z-index: 5;
  position: relative;
  margin-bottom: -2rem;
  padding-top: 2rem;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@media (max-width: 1200px) {
  .hero__title {
    width: 450px;
    bottom: 400px;
    left: 280px;
  }
}

@media (max-width: 992px) {
  .hero__title {
    width: 350px;
    bottom: 350px;
    left: 250px;
  }
}

@media (max-width: 768px) {
  .hero__title {
    width: 400px;
    bottom: 350px;
    left: 160px;
  }
}

@media (max-width: 576px) {
  .hero__title {
    width: 300px;
    bottom: 200px;
    left: 110px;
  }
}

@media (max-width: 576px) {
  .hero__title {
    width: 300px;
    bottom: 200px;
    left: 110px;
  }
}

@media (max-width: 576px) {
  .hero__title {
    width: 200px;
    bottom: 150px;
    left: 110px;
  }
}
</style>
