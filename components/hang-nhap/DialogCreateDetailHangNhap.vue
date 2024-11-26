<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '800px' }" :header="'Thêm hàng nhập'" :modal="true"
    :close-on-escape="true">
    <!-- <div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
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
    </div> -->
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-3">
      <div class="min-w-40">
        <label for="maPhuTung" class="block font-bold mb-3">Mã phụ tùng</label>
      <Select 
        id="maPhuTung" 
        v-model="selectedMaPhuTung" 
        :options="listLoaiHang" 
        option-label="maPhuTung" 
        option-value="id" 
        placeholder="Chọn mã phụ tùng"
        size="large"
        class="mr-2 w-full h-[42.72px]"
        show-clear
        filter
        @change="updateTenPhuTung" 
      />
      </div>
      <div class="min-w-40">
        <label for="tenPhuTung" class="block font-bold mb-3">Tên phụ tùng</label>
      <Select 
        id="tenPhuTung" 
        v-model="selectedTenPhuTung" 
        :options="listLoaiHang" 
        option-label="tenPhuTung" 
        option-value="id" 
        placeholder="Chọn tên phụ tùng"
        size="large"
        show-clear
        filter
        class="mr-2 w-full h-[42.72px]"
        @change="updateMaPhuTung" 
      />
      </div>
      <div class="min-w-40">
        <label for="tenPhuTung" class="block font-bold mb-3 required">Thêm phụ tùng</label>
        <Button icon="pi pi-plus" severity="warn" class="mr-2 w-full h-[42.72px]" @click="onOpenModal()" />
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
    <div class="gap-4 grid grid-cols-1 sm:grid-cols-2 mt-5">
      <div class="min-w-40">
        <label for="soLuong" class="block font-bold mb-3 required">Số lượng</label>
        <InputNumber id="soLuong" v-model="soLuong" :invalid="errors.soLuong != null" class="h-[42.72px]" size="large"
          fluid placeholder="Nhập số lượng" />
        <span class="text-red-500">{{ errors.soLuong }}</span>
      </div>
      <div class="min-w-40">
        <label for="giaNhap" class="block font-bold mb-3 required">Giá nhập</label>
        <InputNumber v-model="giaNhap" fluid input-id="giaNhap" placeholder="Nhập giá nhập" mode="currency"
          currency="VND" locale="vi-VN" :invalid="errors.giaNhap != null" />
        <span class="text-red-500">{{ errors.giaNhap }}</span>
      </div>
    </div>
    <!-- end form -->
    <template #footer>
      <Button label="Hủy" icon="pi pi-times" severity="danger" @click="handleHideModal" />
      <Button label="Lưu" icon="pi pi-check" type="submit" @click="onSubmit" />
    </template>
  </Dialog>
  <LoaiHangDialogCreateLoaiHang :is-visible="isOpenModal" @hide-modal="isOpenModal = false" />

</template>
<script setup>
import { computed } from 'vue';
import { ref } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
const emit = defineEmits(['hideModal']);
const props = defineProps({
  isVisible: {
    type: Boolean,
  },
});
const isOpenModal = ref();
const onOpenModal = () => {
  isOpenModal.value = true;
};

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
  giaNhap: yup
    .number()
    .required('Vui lòng nhập giá nhập!')
    .min(0, 'Không được nhập số âm'),
});
const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});
// const [id] = defineField('id');
// const [maPhuTung] = defineField('maPhuTung');
// const [tenPhuTung] = defineField('tenPhuTung');
const [ngaySanXuat] = defineField('ngaySanXuat');
const [hanSuDung] = defineField('hanSuDung');
const [ngayNhap] = defineField('ngayNhap');
const [soLuong] = defineField('soLuong');
const [giaNhap] = defineField('giaNhap');
const onSubmit = handleSubmit(() => {
  console.log('onSubmit');
});
const listLoaiHang = [
  { id: 1, maPhuTung: 'PT001', tenPhuTung: 'Bộ lọc dầu' },
  { id: 2, maPhuTung: 'PT002', tenPhuTung: 'Dây curoa' },
];
// State cho giá trị được chọn
const selectedMaPhuTung = ref(null);
const selectedTenPhuTung = ref(null);

// Cập nhật tên phụ tùng khi chọn mã phụ tùng
const updateTenPhuTung = () => {
  const selectedItem = listLoaiHang.find(item => item.id === selectedMaPhuTung.value);
  selectedTenPhuTung.value = selectedItem ? selectedItem.id : null;
};

// Cập nhật mã phụ tùng khi chọn tên phụ tùng
const updateMaPhuTung = () => {
  const selectedItem = listLoaiHang.find(item => item.id === selectedTenPhuTung.value);
  selectedMaPhuTung.value = selectedItem ? selectedItem.id : null;
};
</script>