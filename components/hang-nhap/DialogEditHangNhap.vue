<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '800px' }" :header="'Sửa hàng nhập'" :modal="true"
    :close-on-escape="true">
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
      <div class="min-w-40">
        <label for="maPhuTung" class="block font-bold mb-3 required">Mã phụ tùng</label>
        <InputText id="maPhuTung" v-model="maPhuTung" :invalid="errors.maPhuTung != null" size="large" fluid
          input-class="h-[42.72px]" placeholder="Nhập mã phụ tùng" />
        <span class="text-red-500">{{ errors.maPhuTung }}</span>
      </div>
      <div class="min-w-40">
        <label for="tenPhuTung" class="block font-bold mb-3 required">Tên phụ tùng</label>
        <InputText id="tenPhuTung" v-model="tenPhuTung" :invalid="errors.tenPhuTung != null" size="large" fluid
          input-class="h-[42.72px]" placeholder="Nhập tên phụ tùng" />
        <span class="text-red-500">{{ errors.tenPhuTung }}</span>
      </div>
    </div>

    <div class="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div class="min-w-40">
        <label for="ngaySanXuat" class="font-bold block mb-3 required">Ngày sản xuất</label>
        <DatePicker v-model="ngaySanXuat" :invalid="errors.ngaySanXuat != null" input-class="h-[42.72px]"
          date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngaySanXuat" />
        <span class="text-red-500">{{ errors.ngaySanXuat }}</span>
      </div>
      <div class="min-w-40">
        <label for="hanSuDung" class="font-bold block mb-3 required">Hạn sử dụng</label>
        <DatePicker v-model="hanSuDung" :invalid="errors.hanSuDung != null" input-class="h-[42.72px]"
          date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="hanSuDung" />
        <span class="text-red-500">{{ errors.hanSuDung }}</span>
      </div>
      <div class="min-w-40">
        <label for="ngayNhap" class="font-bold block mb-3 required">Ngày nhập hàng</label>
        <DatePicker v-model="ngayNhap" :invalid="errors.ngayNhap != null" input-class="h-[42.72px]"
          date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngayNhap" />
        <span class="text-red-500">{{ errors.ngayNhap }}</span>
      </div>
    </div>

    <div class="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div class="min-w-40">
        <label for="soLuong" class="block font-bold mb-3 required">Số lượng</label>
        <InputNumber id="soLuong" v-model="soLuong" :invalid="errors.soLuong != null" class="h-[42.72px]" size="large"
          fluid placeholder="Nhập số lượng" />
        <span class="text-red-500">{{ errors.soLuong }}</span>
      </div>
      <div class="min-w-40">
        <label for="giaNhap" class="block font-bold mb-3 required">Giá nhập</label>
        <InputNumber
            v-model="giaNhap"
            fluid
            input-id="giaNhap"
            placeholder="Nhập giá nhập"
            mode="currency"
            currency="VND"
            locale="vi-VN"
            :invalid="errors.giaNhap != null"/>
        <span class="text-red-500">{{ errors.giaNhap }}</span>
      </div>
      <div class="min-w-40">
        <label for="giaBan" class="block font-bold mb-3 required">Giá bán</label>
        <InputNumber
            v-model="giaBan"
            fluid
            :min-fraction-digits="2"
            input-id="giaBan"
            placeholder="Nhập giá nhập"
            mode="currency"
            currency="VND"
            locale="vi-VN"
            :invalid="errors.giaBan != null"/>
        <span class="text-red-500">{{ errors.giaBan }}</span>
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
  maPhuTung: yup
    .string()
    .required('Vui lòng nhập mã phụ tùng!')
    .max(100, 'Tối đa 100 ký tự!'),
  tenPhuTung: yup.string().required('Vui lòng nhập tên phụ tùng!'),
  ngaySanXuat: yup.date()
    .required('Vui lòng nhập sản xuất!'),
  hanSuDung: yup.date()
    .required('Vui lòng nhập hạn sử dụng!'),
  ngayNhap: yup.date()
    .required('Vui lòng nhập ngày nhập hàng!'),
  soLuong: yup
    .number()
    .required('Vui lòng nhập số lượng!')
    .max(100, 'Tối đa 100 ký tự!')
    .min(0, 'Không được nhập số âm'),
  giaBan: yup
    .number()
    .required('Vui lòng nhập giá nhập!')
    .min(0, 'Không được nhập số âm'),
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

// const [id] = defineField('id');
const [maPhuTung] = defineField('maPhuTung');
const [tenPhuTung] = defineField('tenPhuTung');
const [ngayBan] = defineField('ngayBan');
const [hanSuDung] = defineField('hanSuDung');
const [ngayNhap] = defineField('ngayNhap');
const [soLuong] = defineField('soLuong');
const [giaNhap] = defineField('giaNhap');
const [giaBan] = defineField('giaBan');


const onSubmit = handleSubmit(() => {
  console.log('onSubmit');
});
</script>