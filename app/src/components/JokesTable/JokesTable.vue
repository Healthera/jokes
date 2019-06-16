<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="jokes" :search="search" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.joke }}</td>
          <td>{{ props.item.type }}</td>
          <td>
            <v-icon small @click="deleteJoke(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts" src="./JokesTable.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
