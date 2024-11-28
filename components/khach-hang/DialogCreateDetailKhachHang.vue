<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Thêm khách hàng'" :modal="true"
    :close-on-escape="closeEscapeKeyModalInfo">
    <div>
      <div class="col-span-1 px-3 pt-3">
        <div class="grid grid-cols-1 mb-4">
          <img src="../../assets/fonts/imageGear.svg" class="max-w-full h-28 ml-3">
        </div>
        <div class="grid grid-cols-2 mb-4 gap-4">
          <div class="col-span-1 min-w-40">
            <label for="ngaySua" class="block font-bold mb-3">Ngày sửa</label>
            <DatePicker v-model="ngaySua" :invalid="errors.ngaySua != null" input-class="h-[42.72px]"
              date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngaySua" />
            <span class="text-red-500">{{ errors.ngayNhap }}</span>

          </div>
          <div class="col-span-1 min-w-40">
            <label for="soKm" class="block font-bold mb-3">Số km</label>
            <InputText id="soKm" v-model="soKm" placeholder="Chọn Số km" size="large" class="mr-2 w-full h-[42.72px]" />
          </div>
        </div>
        <div class="flex justify-between items-center gap-4 mb-2">
          <h6 class="uppercase text[#0b5ee7] font-bold m-0" style="color: #0b5ee7">
            Phụ tùng thay thế
          </h6>
          <Button class="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4" @click="themPhuTung">
            Thêm phụ tùng
          </Button>
        </div>
        <div v-for="(phuTung, index) in phuTungs" :key="index" class="grid grid-cols-3 gap-4 mb-1">
          <div class="min-w-40">
            <label v-if="index === 0" for="tenPhuTung" class="block font-bold mb-3">Tên phụ tùng</label>
            <InputText id="tenPhuTung" v-model="phuTung.tenPhuTung" placeholder="Chọn tên phụ tùng" size="large"
              class="mr-2 w-full h-[42.72px]" />
          </div>
          <div class="col-span-1">
            <label v-if="index === 0" class="block font-bold mb-3">Số lượng</label>
            <InputNumber v-model="phuTung.soLuong" placeholder="Nhập số lượng" class="w-full" />
          </div>
          <div class="col-span-1">
            <label v-if="index === 0" class="block font-bold mb-3">Giá bán</label>
            <InputNumber v-model="phuTung.giaBan" class="w-full" fluid input-id="tienCong" placeholder="Nhập giá tiền"
              mode="currency" currency="VND" locale="vi-VN" />
          </div>
        </div>
        <!-- Nút thêm phụ tùng -->
        <!-- <div class="grid grid-cols-2 gap-4 my-5">
                <div class="col-span-1">
                  <label class="block font-bold mb-3">Tiền công</label>
                  <InputNumber v-model="tienCong" class="w-full" fluid input-id="tienCong" placeholder="Nhập tiền công"
                    mode="currency" currency="VND" locale="vi-VN" :invalid="errors.tienCong != null" />
                  <span class="text-red-500">{{ errors.tienCong }}</span>
                </div>
                <div class="col-span-1">
                  <label class="block font-bold mb-3">Chi phí phát sinh</label>
                  <InputNumber v-model="chiPhiPhatSinh" class="w-full" fluid input-id="chiPhiPhatSinh"
                    placeholder="Nhập chi phí phát sinh" mode="currency" currency="VND" locale="vi-VN"
                    :invalid="errors.chiPhiPhatSinh != null" />
                  <span class="text-red-500">{{ errors.chiPhiPhatSinh }}</span>
                </div>
              </div> -->
        <div class="flex justify-between items-center gap-4 mt-6 mb-2">
          <h6 class="uppercase text[#0b5ee7] font-bold m-0" style="color: #0b5ee7">
            Tiền công sữa chữa và chi phí phát sinh
          </h6>
          <Button class="bg-blue-500 text-white font-bold py-2 px-4 rounded " @click="themTienCong">
            Thêm tiền công
          </Button>
        </div>

        <div v-for="(tienCong, index) in tienCongs" :key="index" class="grid grid-cols-2 gap-4 mb-1">
          <div class="min-w-40">
            <label v-if="index === 0" for="tenTienCong" class="block font-bold mb-3">Nội dung sửa chữa</label>
            <InputText id="tenTienCong" v-model="tienCong.tenTienCong" placeholder="Chọn Nội dung tiền công"
              size="large" class="mr-2 w-full h-[42.72px]" />
          </div>
          <div class="col-span-1">
            <label v-if="index === 0" class="block font-bold mb-3">Đơn giá</label>
            <InputNumber v-model="tienCong.giaCong" placeholder="Nhập Đơn giá" class="w-full" fluid input-id="tienCong"
              mode="currency" currency="VND" locale="vi-VN" />
          </div>
        </div>
      </div>
      <div class="border-t border-gray-300 mt-3">
        <div class="flex justify-between mx-28 my-3">
          <div class="mt-6">
            <div class="flex items-center text-xl">
              <label class="block font-bold mr-3">Tổng tiền thanh toán</label>
              <div>
                {{ tongTienSuaXe.toLocaleString("vi-VN") }} &#8363;
              </div>
            </div>
          </div>
          <div class="mt-6">
            <div class="flex items-center">
              <label class="block font-bold mr-3 text-xl">Tình trạng thanh toán</label>
              <Checkbox v-model="daThanhToan" inputId="daThanhToan" name="daThanhToan" value="daThanhToan"
                :invalid="errors.daThanhToan != null" />
              <span class="text-red-500">{{ errors.daThanhToan }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Hủy" icon="pi pi-times" class="p-button-danger" @click="close" />
      <Button label="Lưu" icon="pi pi-check" class="p-button-primary" @click="onSubmit" />
    </template>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { ref, watch } from 'vue'

const emit = defineEmits(['hideModal']);

const visible_map = ref(false);
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
  phuTungs.value = [
    {
      maPhuTung: '',
      tenPhuTung: '',
      soLuong: 0,
      giaBan: 0,
    },
  ];
};
const schema = yup.object({
  // maPhuTung: yup
  //   .string()
  //   .required('Vui lòng nhập mã phụ tùng!')
  //   .max(100, 'Tối đa 100 ký tự!'),
  // tenPhuTung: yup.string().required('Vui lòng nhập tên phụ tùng!'),
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

const close = () => {
  internalVisible.value = false;
  resetForm();
  phuTungs.value = [
    {
      maPhuTung: '',
      tenPhuTung: '',
      soLuong: 0,
      giaBan: 0,
    },
  ];
  tienCongs.value = ref([
    {
      tenTienCong: '',
      giaCong: 0,
    },
  ]);

}
const onOpenMap = () => {
  visible_map.value = true;
  closeEscapeKeyModalInfo.value = false;
  closeEscapeKeyModalMap.value = true;
};
watch(visible_map, () => {
  if (!visible_map.value) {
    closeEscapeKeyModalInfo.value = true;
  }
});
const map = ref();
// const onclick = () => {
//   const mapRef = map.value;
//   const latlng = mapRef.leafletObject.mouseEventToLatLng(event);
//   lon.value = latlng.lng;
//   lat.value = latlng.lat;
// };
const closeEscapeKeyModalInfo = ref(true);
const closeEscapeKeyModalMap = ref(false);
// const [id] = defineField('id');
const [soKm] = defineField('soKm');
const [ngaySua] = defineField('ngaySua');
const [daThanhToan] = defineField('daThanhToan');

const tongTienSuaXe = computed(() => {
  let sumHangHoa = 0
  let sumTienCong = 0
  for (var i = 0; i < phuTungs.value.length; i++) {
    sumHangHoa += Number(phuTungs.value[i].soLuong) * Number(phuTungs.value[i].giaBan)
  }
  for (var j = 0; j < tienCongs.value.length; j++) {
    sumTienCong += Number(tienCongs.value[j].giaCong)
  }
  return ((sumHangHoa + sumTienCong) || 0);
});
const phuTungs = ref([
  {
    maPhuTung: '',
    tenPhuTung: '',
    soLuong: 0,
    giaBan: 0,
  },
]);

// Hàm thêm phụ tùng mới
const themPhuTung = () => {
  phuTungs.value.push({
    maPhuTung: '',
    tenPhuTung: '',
    soLuong: 0,
    giaBan: 0,
  });
};
const tienCongs = ref([
  {
    tenTienCong: '',
    giaCong: 0,
  },
]);

// Hàm thêm phụ tùng mới
const themTienCong = () => {
  tienCongs.value.push({
    tenTienCong: '',
    giaCong: 0,
  });
};
const onSubmit = handleSubmit(() => {
  console.log('onSubmit');
});
</script>

<style scoped>
.custom-button {
  background-color: #0b5ee7;
  color: white;
  width: 100%;
  margin-top: auto;
  transition: background-color 0.3s ease;
  /* Tạo hiệu ứng mượt */
}

.custom-button:hover {
  background-color: #8586ec;
  /* Màu khi hover */
}
</style>