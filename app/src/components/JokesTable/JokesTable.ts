import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex'

@Component({
  computed: mapState([ 
    'jokes',
  ])
})
export default class JokesTable extends Vue {
  public jokes!: {}[];
  public search: string = '';
  public headers: {}[] = [
    { text: 'Jokes', value: 'joke' },
    { text: 'Type', value: 'type' },
    { text: 'Actions', value: 'actions', sortable: false }
  ]

  mounted() {
    this.$store.dispatch('loadJokes');
  }


  deleteJoke(joke) {
    let confirmDelete = confirm('Are you sure you want to delete this joke');
    if(confirmDelete) {
      this.$store.dispatch('deleteJoke', joke);
    }
  }

}