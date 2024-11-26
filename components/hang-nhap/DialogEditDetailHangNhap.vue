<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '800px' }" :header="'Sửa hàng nhập'" :modal="true"
    :close-on-escape="true">
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
      <div class="min-w-40">
        <label for="tenLanNhap" class="block font-bold mb-3 required">Tên lần nhập hàng</label>
        <InputText id="tenLanNhap" v-model="tenLanNhap" :invalid="errors.tenLanNhap != null" size="large" fluid
          input-class="h-[42.72px]" placeholder="Nhập mã phụ tùng" />
        <span class="text-red-500">{{ errors.tenLanNhap }}</span>
      </div>
      <div class="min-w-40">
        <label for="ngayNhap" class="font-bold block mb-3 required">Ngày nhập hàng</label>
        <DatePicker v-model="ngayNhap" :invalid="errors.ngayNhap != null" input-class="h-[42.72px]"
          date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngayNhap" />
        <span class="text-red-500">{{ errors.ngayNhap }}</span>
      </div>
    </div>
    <!-- end form -->
    <template #footer>
      <Button label="Hủy" icon="pi pi-times" severity="danger" @click="handleHideModal" />
      <Button label="Lưu" icon="pi pi-check" type="submit" @click="onSubmit" />
    </template>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';

const emit = defineEmits(['hideModal']);

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
});
const internalVisible = computed({
  get() {
    return props.isVisible;
  },
  set() {
    handleHideModal();
  },
});

const handleHideModal = () => {
  emit('hideModal');
  resetForm();
};
const schema = yup.object({
  tenLanNhap: yup
    .string()
    .required('Vui lòng nhập mã phụ tùng!')
    .max(100, 'Tối đa 100 ký tự!'),
  ngayNhap: yup.date()
    .required('Vui lòng nhập ngày nhập hàng!'),
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

// const [id] = defineField('id');
const [tenLanNhap] = defineField('tenLanNhap');
const [ngayNhap] = defineField('ngayNhap');


const onSubmit = handleSubmit(() => {
  console.log('onSubmit');
});
</script>