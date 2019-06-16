<template>
  <div class="joke">
    <div class="joke-container">
      <h1>"{{joke.joke ? joke.joke : 'No Joke found'}}"</h1>
    </div>
    <v-container>
      <v-layout row justify-center wrap>
        <v-flex xs12 md6>
          <v-btn color="teal" large @click="handleClick">
            New Random Joke
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12 md6>
          <v-overflow-btn :items="types" label="Select a Filter" editable v-model="type"></v-overflow-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts" src="./Joke.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.joke {
  text-align: center;
  .joke-container {
    min-height: 200px;
    margin: 100px auto 0 auto;
  }
  .v-btn {
    color: white;
    margin: 10px auto;
  }
  .v-overflow-btn {
    margin: 10px auto;
    width: 238px;
  }
}
</style>
