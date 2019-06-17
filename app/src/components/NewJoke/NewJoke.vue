<template>
  <v-card class="new-joke">
    <v-form>
      <v-container>
        <v-layout>
          <v-flex xs12 md6>
            <v-text-field v-model="joke" label="Joke" required></v-text-field>
          </v-flex>

          <v-flex xs12 md6>
            <v-select v-model="type" :items="types" label="Type" required></v-select>
          </v-flex>

          <v-btn @click="submit">add</v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts" src="./NewJoke.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.new-joke {
  margin-bottom: 20px;
  .v-btn {
    margin: 20px;
  }
}
</style>
