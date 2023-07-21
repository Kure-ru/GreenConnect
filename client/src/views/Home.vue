<template>
  <div class="hero">
    <h2 class="hero__subtitle">
      Vous avez des <span>amis partout dans le monde</span>,
      <br />
      Vous ne les avez juste pas encore rencontrés.
    </h2>

    <div class="story">
      <div class="story__content">
        <div class="story__content__heading">
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
</template>

<style>
* {
  box-sizing: border-box;
}

.hero {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.story {
  display: flex;
  overflow: visible;
  justify-content: center;
  max-width: 100vh;
}

figure {
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
    rotateY(0deg) rotateZ(335.477deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  will-change: transform;
}

.story__globe {
  position: relative;
  z-index: 50;
  width: 1420px;
  height: 1420px;
  margin-bottom: 0;
  padding: 0px 0;
  animation: rotateAnimation 30s infinite linear;
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
  top: 650px;
  left: 50%;
  transform: translateX(-50%);
  color: #f2efe6;
  text-align: center;
}

.title__container {
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
    rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
}

.story__content {
  position: absolute;
  z-index: 150;
  max-width: 560px;
  color: white;
  text-align: center;
}

.story__content__heading {
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
    rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  opacity: 1;
  transform-style: preserve-3d;
  margin-bottom: 36px;
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
