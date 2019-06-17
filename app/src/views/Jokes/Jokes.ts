import { Component, Vue } from 'vue-property-decorator';
import Joke from '@/components/Joke/Joke.vue'; // @ is an alias to /src
import { mapState } from 'vuex'

@Component({
  components: {
    Joke,
  },
  computed: mapState([ 
    'randomJoke',
  ]),
})
export default class Jokes extends Vue {

    public randomJoke!: {};

    mounted() {
        this.$store.dispatch('loadRandomJoke');
    }
    
    getNewRandomJoke(filter) {
        this.$store.dispatch('loadRandomJoke', filter);
    }
}