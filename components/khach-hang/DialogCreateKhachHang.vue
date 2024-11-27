<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Thêm khách hàng'" :modal="true"
    :close-on-escape="closeEscapeKeyModalInfo">
    <div>
      <Tabs value="0">
        <TabList>
          <Tab value="0" style="color:#0b5ee7"> Thông tin Khách hàng </Tab>
          <Tab value="1" style="color:#0b5ee7"> Phụ tùng thay thế </Tab>
        </TabList>
        <div class="grid grid-cols-1">
          <TabPanel value="0">
            <div class="col-span-1 px-3 pt-3">
              <div class="grid grid-cols-1 gap-4 mb-4">
                <img src="../../assets/fonts/imageCustumer1.svg" class="max-w-full h-28 ml-3">
              </div>
              <div class="grid grid-cols-1 gap-4 mb-4">
                <h6 class="uppercase text[#0b5ee7] font-bold m-0" style="color: #0b5ee7">
                  Thông tin khách hàng
                </h6>
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
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="col-span-1">
                  <label class="block font-bold mb-3 required">Biển số xe</label>
                  <InputText v-model="bienSoXe" name="bienSoXe" placeholder="Nhập biển số xe"
                    :invalid="errors.bienSoXe ? true : false" class="w-full" />
                  <span class="text-red-500">{{ errors.bienSoXe }}</span>
                </div>
                <div class="col-span-1">
                  <label class="block font-bold mb-3 required">Số km</label>
                  <InputNumber v-model="soKm" name="soKm" placeholder="Nhập số km" :invalid="errors.soKm ? true : false"
                    class="w-full" />
                  <span class="text-red-500">{{ errors.soKm }}</span>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
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
              <div>
                <label class="block font-bold mb-3">Ghi chú</label>

                <Textarea v-model="ghiChu" class="w-full" rows="3"/>
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
                    <div class="w-80 h-[500px] sm:w-[900px] sm:h-[600px] m-2">
                      <ClientOnly>
                        <LMap ref="map" :options="{ attributionControl: false }" :zoom="6"
                          :center="[viDo ?? 17.175763720046184, kinhDo ?? 106.69921875000001]"
                          :use-global-leaflet="false">
                          <LTileLayer url="https://tiles.gisgo.vn/base/{z}/{x}/{y}.png" layer-type="base"
                            name="OpenStreetMap" />
                          <!-- <LMarker v-if="lat != null && lon" :lat-lng="[lat, lon]" draggable /> -->
                        </LMap>
                      </ClientOnly>
                    </div>
                  </Dialog>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div class="col-span-1 px-3 pt-3">
              <div class="grid grid-cols-1 mb-4">
                <img src="../../assets/fonts/imageGear.svg" class="max-w-full h-28 ml-3">
              </div>
              <div class="flex justify-between items-center gap-4 mb-4">
                <h6 class="uppercase text[#0b5ee7] font-bold m-0" style="color: #0b5ee7">
                  Phụ tùng thay thế
                </h6>
                <Button class="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4" @click="themPhuTung">
                  Thêm phụ tùng
                </Button>
              </div>

              <div v-for="(phuTung, index) in phuTungs" :key="index" class="grid grid-cols-4 gap-4 mb-1">
                <div class="min-w-40">
                  <label v-if="index === 0" for="maPhuTung" class="block font-bold mb-3">Mã phụ tùng</label>
                  <InputText id="maPhuTung" v-model="phuTung.maPhuTung" placeholder="Chọn mã phụ tùng" size="large"
                    class="mr-2 w-full h-[42.72px]" />
                </div>
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
                  <InputNumber v-model="phuTung.giaBan" class="w-full" fluid input-id="tienCong"
                    placeholder="Nhập giá tiền" mode="currency" currency="VND" locale="vi-VN" />
                </div>
              </div>
              <!-- Nút thêm phụ tùng -->
              <div class="grid grid-cols-2 gap-4 my-5">
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
              </div>
            </div>
            <div class="border-t border-gray-300">
              <div class="flex justify-between mx-28 my-3">
                <div class="mt-6">
                  <div class="flex items-center text-xl">
                    <label class="block font-bold mr-3">Tổng tiền thanh toán</label>
                    <div>
                      {{ tongTienSuaXe }} &#8363;
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
          </TabPanel>
        </div>
      </Tabs>
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
const [soKm] = defineField('soKm');
const [soVin] = defineField('soVin');
const [ngaySua] = defineField('ngaySua');
const [kinhDo] = defineField('kinhDo');
const [viDo] = defineField('viDo');
const [tienCong] = defineField('tienCong');
const [chiPhiPhatSinh] = defineField('chiPhiPhatSinh');
const [daThanhToan] = defineField('daThanhToan');
const [ghiChu] = defineField('ghiChu');

const tongTienSuaXe = computed(() => {
  let sumHangHoa = 0
  for (var i = 0; i < phuTungs.value.length; i++) {
    sumHangHoa += Number(phuTungs.value[i].soLuong) * Number(phuTungs.value[i].giaBan)
  }
  return (sumHangHoa + Number(tienCong.value) + Number(chiPhiPhatSinh.value) || 0);
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
  console.log(phuTungs.value)
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