import {} from 'vue';
//import { useStore } from '@/store';

import Todo from '@/components/@logic/todo/default'

export default {
  name: 'Todo-View',
  components: {
    Todo
  },
  props: {
  },
  setup() {
    //const store = useStore();
    console.log()
    console.log('init')
    return {
    };
  },
};
