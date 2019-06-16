import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex'

@Component
export default class NewJoke extends Vue {
  public types: string[] = [
    'General',
    'Popular',
    'Science',
    'Love',
    'Animal',
    'Clean',
    'Fantasy',
    'Insult',
    'Holiday',
    'Politics'
  ];
  public joke: string = '';
  public type: string = '';

  submit() {
    this.$store.dispatch('addNewJoke', {joke: this.joke, type: this.type});
    this.joke = '';
    this.type = '';
  }
}