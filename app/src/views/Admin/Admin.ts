import { Component, Vue } from 'vue-property-decorator';
import JokesTable from '@/components/JokesTable/JokesTable.vue'; // @ is an alias to /src
import NewJoke from '@/components/NewJoke/NewJoke.vue';

@Component({
  components: {
    JokesTable,
    NewJoke
  }
})
export default class Admin extends Vue {
}