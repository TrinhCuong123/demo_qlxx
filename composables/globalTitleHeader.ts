// ~/composables/globalTitleHeader.ts
import { ref } from 'vue';

const titleHeader = ref<string>(''); // Khai báo kiểu cho titleHeader

const setTitleHeader = (title: string): void => { // Định nghĩa hàm với kiểu
  titleHeader.value = title;
};

export { titleHeader, setTitleHeader };