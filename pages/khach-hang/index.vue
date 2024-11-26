<template>
  <div class="bg-white m-5 rounded-lg">
    <Toolbar class="mb-5">
      <template #start>
        <div class="flex flex-column justify-center gap-4">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="keyWords" placeholder="Tìm kiếm" class="w-full" />
          </IconField>
        </div>
      </template>

      <template #end>
        <div class="mx-4">
          <Button type="button" icon="pi pi-filter" label="Tìm kiếm" class="w-full" @click="timKiem" />
        </div>
        <div class="">
          <Button type="button" icon="pi pi-filter-slash" label="Bỏ lọc" outlined severity="danger" class="w-full"
            @click="clearFilter()" />
        </div>
      </template>
    </Toolbar>
    <div style="display: flex; justify-content: flex-end;">
      <Button label="Thêm mới" icon="pi pi-plus" class="flex mr-4 justify-items-end" title="Thêm mới"
        @click="onOpenModal" />
    </div>

    <div class="m-4" style="padding-bottom: 16px;">
      <DataTable :value="customerList" tableStyle="min-width: 50rem" showGridlines>
        <Column class="text-center" body-style="text-align: center">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="tenKhachHang" header="Mã phụ tùng"></Column>
        <Column field="dia_chi" header="Tên phụ tùng"></Column>
        <Column field="dien_thoai" header="Ngày sản xuất"></Column>
        <Column field="thuongHieu" header="Hạn sử dụng"></Column>
        <Column field="bienSoXe" header="Ngày nhập hàng"></Column>
        <Column field="soLuong" header="Số lượng"></Column>
        <Column field="giaNhap" header="Giá nhập">
          <template #body="slotProps">
            <span>{{ slotProps.data.giaNhap }} &#8363;</span>
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 9rem" :frozen="true" align-frozen="right">
          <template #header>
            <span class="m-auto"><b>Thao tác</b></span>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <Button icon="pi pi-pencil" outlined rounded severity="success" class="mr-2" title="chỉnh sửa"
                @click="onOpenEditModal(slotProps.data)" />
              <Button icon="pi pi-trash" outlined rounded severity="danger" title="Xóa"
                @click="confirmDeleteProject()" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <KhachHangDialogCreateKhachHang :is-visible="isOpenModal" @hide-modal="isOpenModal = false" />
  <KhachHangDialogEditKhachHang :is-visible="isOpenEditModel" @hide-modal="isOpenEditModel = false" />
</template>
<script setup>
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref, reactive } from 'vue';
import 'primeicons/primeicons.css'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

setTitleHeader("Khách hàng");

const confirm = useConfirm();
const toast = useToast();
const keyWords = ref();
const hangNhap = ref();
const isOpenModal = ref();
const isOpenEditModel = ref();


const onOpenEditModal = () => {
  isOpenEditModel.value = true;
};
const onOpenModal = () => {
  isOpenModal.value = true;
};


const confirmDeleteProject = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Save'
    },
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
};

const timKiem = () => {
  console.log("Đây là tìm kiếm");
};
const clearFilter = () => {
  keyWords.value = ''
  hangNhap.value = null
}
const getRowSTT = (index) => {
  return index + 1;
}

const customerList = reactive([
  {
    tenKhachHang: 'Nguyễn Văn A',
    dia_chi: 'Hà Nội, Việt Nam',
    dien_thoai: '0123456789',
    thuongHieu: 'Honda',
    bienSoXe: '29A-12345',
    soKm: 15000,
    soVin: '1HGCM82633A123456',
    ngaySua: '2023-10-10',
    kinhDo: 105.8542,
    viDo: 21.0285,
    maPhuTung: 'PT-001',
    tenPhuTung: 'Lọc gió',
    soLuong: 2,
    giaBan: 200000,
    tienCong: 50000,
    chiPhiPhatSinh: 10000,
    daThanhToan: false
  },
  {
    tenKhachHang: 'Trần Thị B',
    dia_chi: 'TP. HCM, Việt Nam',
    dien_thoai: '0987654321',
    thuongHieu: 'Yamaha',
    bienSoXe: '59A-67890',
    soKm: 23000,
    soVin: '2HGCM82633A654321',
    ngaySua: '2023-11-01',
    kinhDo: 106.6891,
    viDo: 10.8231,
    maPhuTung: 'PT-002',
    tenPhuTung: 'Bugi',
    soLuong: 4,
    giaBan: 80000,
    tienCong: 70000,
    chiPhiPhatSinh: 15000,
    daThanhToan: true
  },
  {
    tenKhachHang: 'Lê Minh C',
    dia_chi: 'Đà Nẵng, Việt Nam',
    dien_thoai: '0931122334',
    thuongHieu: 'Kawasaki',
    bienSoXe: '43A-54321',
    soKm: 5000,
    soVin: '3HGCM82633A987654',
    ngaySua: '2023-11-10',
    kinhDo: 108.2215,
    viDo: 16.0493,
    maPhuTung: 'PT-003',
    tenPhuTung: 'Lốp xe',
    soLuong: 1,
    giaBan: 400000,
    tienCong: 100000,
    chiPhiPhatSinh: 20000,
    daThanhToan: false
  },
  {
    tenKhachHang: 'Phạm Thị D',
    dia_chi: 'Cần Thơ, Việt Nam',
    dien_thoai: '0912345678',
    thuongHieu: 'Suzuki',
    bienSoXe: '65A-98765',
    soKm: 12000,
    soVin: '4HGCM82633A112233',
    ngaySua: '2023-10-20',
    kinhDo: 105.7462,
    viDo: 10.0234,
    maPhuTung: 'PT-004',
    tenPhuTung: 'Phanh xe',
    soLuong: 3,
    giaBan: 300000,
    tienCong: 60000,
    chiPhiPhatSinh: 5000,
    daThanhToan: true
  },
  {
    tenKhachHang: 'Vũ Minh E',
    dia_chi: 'Hải Phòng, Việt Nam',
    dien_thoai: '0978543210',
    thuongHieu: 'BMW',
    bienSoXe: '15A-12321',
    soKm: 8000,
    soVin: '5HGCM82633A112233',
    ngaySua: '2023-09-15',
    kinhDo: 106.6952,
    viDo: 20.8446,
    maPhuTung: 'PT-005',
    tenPhuTung: 'Đèn pha',
    soLuong: 1,
    giaBan: 500000,
    tienCong: 120000,
    chiPhiPhatSinh: 25000,
    daThanhToan: true
  }
]);
</script>