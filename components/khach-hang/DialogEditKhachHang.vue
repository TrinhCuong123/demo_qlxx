<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Thêm khách hàng'" :modal="true"
    :close-on-escape="closeEscapeKeyModalInfo">
    <div>
      <div class="grid grid-cols-1">
        <div class="col-span-1 px-3 pt-3">
          <div class="grid grid-cols-1 gap-4 mb-4">
            <img src="../../assets/fonts/imageCustumer1.svg" class="max-w-full h-28 ml-3">
          </div>
          <div class="grid grid-cols-1 gap-4 mb-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Tên khách hàng</label>
              <InputText v-model="tenKhachHang" name="tenKhachHang" placeholder="Nhập tên khách hàng"
                :invalid="errors.tenKhachHang ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.tenKhachHang }}</span>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 mb-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Địa chỉ</label>
              <InputText v-model="dia_chi" name="dia_chi" placeholder="Nhập địa chỉ"
                :invalid="errors.dia_chi ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.dia_chi }}</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Điện thoại</label>
              <InputText v-model="dien_thoai" name="dien_thoai" placeholder="Nhập điện thoại"
                :invalid="errors.dien_thoai ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.dien_thoai }}</span>
            </div>
            <div class="col-span-1">
              <label class="block font-bold mb-3">Thương hiệu</label>
              <InputText v-model="thuongHieu" name="thuongHieu" placeholder="Nhập thương hiệu"
                :invalid="errors.thuongHieu ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.thuongHieu }}</span>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Biển số xe</label>
              <InputText v-model="bienSoXe" name="bienSoXe" placeholder="Nhập biển số xe"
                :invalid="errors.bienSoXe ? true : false" class="w-full" />
              <span class="text-red-500">{{ errors.bienSoXe }}</span>
            </div>
            <div class="col-span-1">
              <label class="block font-bold mb-3">Số vin</label>
              <InputText v-model="soVin" name="soVin" placeholder="Nhập vin" :invalid="errors.soVin ? true : false"
                class="w-full" />
              <span class="text-red-500">{{ errors.soVin }}</span>
            </div>
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Ngày sửa</label>
              <DatePicker v-model="ngaySua" :invalid="errors.ngaySua != null" input-class="h-[42.72px]"
                date-format="dd/mm/yy" show-icon fluid placeholder="dd/mm/yyyy" input-id="ngaySua" />
              <span class="text-red-500">{{ errors.ngaySua }}</span>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 my-4">
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Kinh độ</label>
              <InputNumber v-model="kinhDo" class="w-full" name="kinhDo" placeholder="Nhập kinh độ" mode="decimal"
                :min-fraction-digits="6" />
            </div>
            <div class="col-span-1">
              <label class="block font-bold mb-3 required">Vĩ độ</label>
              <InputNumber v-model="viDo" class="w-full" name="viDo" mode="decimal" :min-fraction-digits="6"
                placeholder="Nhập vĩ độ" />
            </div>
            <div class="col-span-1">
              <label for="icon" class="font-bold block mb-3">Chọn trên bản đồ</label>
              <Button icon="pi pi-send" class="custom-button" label="Chọn ví trí trên bản đồ" @click="onOpenMap" />
              <Dialog v-model:visible="visible_map" modal header="Chọn vị trí"
                :close-on-escape="closeEscapeKeyModalMap">
                <div class="w-80 h-[600px] sm:w-[900px] sm:h-[650px] m-2" >
                  <ClientOnly>
                    <LMap ref="map" :options="{ attributionControl: false }" :zoom="5.5"
                      :center="[viDo ?? 16.675763720046184, kinhDo ?? 106.69921875000000]" :use-global-leaflet="false">
                      <LTileLayer url="https://tiles.gisgo.vn/base/{z}/{x}/{y}.png" layer-type="base"
                        name="OpenStreetMap" />
                    </LMap>
                  </ClientOnly>
                </div>
              </Dialog>
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
const [tenKhachHang] = defineField('tenKhachHang');
const [dia_chi] = defineField('dia_chi');
const [dien_thoai] = defineField('dien_thoai');
const [thuongHieu] = defineField('thuongHieu');
const [bienSoXe] = defineField('bienSoXe');
const [soVin] = defineField('soVin');
const [ngaySua] = defineField('ngaySua');
const [kinhDo] = defineField('kinhDo');
const [viDo] = defineField('viDo');

const onSubmit = handleSubmit(() => {
  console.log('onSubmit');
});
</script>

<style scoped>
.custom-button {
  background-color: rgb(11, 94, 0);
  color: white;
  width: 100%;
  margin-top: auto;
  transition: background-color 0.3s ease;
  /* Tạo hiệu ứng mượt */
}

.custom-button:hover {
  background-color: rgba(11, 94, 0, 0.9);
  /* Màu khi hover */
}
</style>