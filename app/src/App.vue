<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Jokes</router-link>|
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
}
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    font-size: 20px;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.v-menu__content {
  top: 50px !important;
  left: 0 !important;
}
</style>
