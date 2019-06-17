<template>
  <div>
    <!-- <h1>Welcome! Lets Joke around</h1> -->
    <Joke :joke="randomJoke" @getNewRandomJoke="getNewRandomJoke"/>
  </div>
</template>

<script lang="ts" src="./Jokes.ts"></script>
