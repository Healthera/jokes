import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Joke extends Vue {
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
  public type: string = '';
  @Prop() private joke!: {};

  handleClick() {
    this.$emit('getNewRandomJoke', this.type);
  }

}