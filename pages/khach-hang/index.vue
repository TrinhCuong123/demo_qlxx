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
        <Column class="text-center" body-style="text-align: center;width:10px">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="tenKhachHang" header="Tên khách hàng" style="min-width: 10rem">
          <template #body="{ data }">
            <NuxtLink class="font-bold text-xl text-cyan-800" :to="`/khach-hang/${data.id}`">{{ data.tenKhachHang
              }}</NuxtLink>
          </template>
        </Column>
        <Column field="dien_thoai" header="Điện thoại"></Column>
        <Column field="diaChi" header="Địa chỉ"></Column>
        <Column field="thuongHieu" header="Thương hiệu"></Column>
        <Column field="bienSoXe" header="Biển số xe"></Column>
        <Column field="soVin" header="Số vin"></Column>
        <Column :exportable="false" style="min-width: 9rem" :frozen="true" align-frozen="right">
          <template #header>
            <span class="m-auto"><b>Thao tác</b></span>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <Button v-tooltip="'Sửa'" icon="pi pi-pencil" outlined rounded severity="success"
                class="mr-2" title="chỉnh sửa" @click="onOpenEditModal" />
              <Button v-tooltip="'Xóa'" icon="pi pi-trash" outlined rounded severity="danger"
                title="Xóa" @click="confirmDeleteProject()" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <KhachHangDialogCreateKhachHang :is-visible="isOpenModal" @hide-modal="isOpenModal = false" />
  <KhachHangDialogEditKhachHang :is-visible="isOpenEditModel" @hide-modal="isOpenEditModel = false" />
  <KhachHangDialogShowInfoKhachHang :is-visible="isOpenShowModel" @hide-modal="isOpenShowModel = false" />
</template>
<script setup lang="ts">
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
const isOpenShowModel = ref();


const onOpenShowModel = () => {
  isOpenShowModel.value = true;
};
const onOpenEditModal = () => {
  isOpenEditModel.value = true;
};
const onOpenModal = () => {
  isOpenModal.value = true;
};
const statePay = {
  Active: 'Đã thanh toán',
  Inactive: 'Chưa thanh toán',
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
const getRowSTT = (index: number) => {
  return index + 1;
}

const customerList = reactive([
  {
    id: 1,
    tenKhachHang: 'Nguyễn Văn A',
    diaChi: 'Hà Nội, Việt Nam',
    dien_thoai: '0123456789',
    thuongHieu: 'Honda',
    bienSoXe: '29A-12345',
    soKm: 15000,
    soVin: '1HGCM82633A123456',
    ngaySua: '2023-10-10',
    kinhDo: 105.8542,
    viDo: 21.0285,
    phuTungThay: [
      {
        tenPhuTung: 'PT-001 - Lọc gió',
        soLuong: 2,
        giaBan: 200000,
      },
      {
        tenPhuTung: 'PT-002 - Lọc gió',
        soLuong: 2,
        giaBan: 200000,
      }
    ],
    tienCong: 50000,
    chiPhiPhatSinh: 10000,
    tongChiPhi: 900000,
    daThanhToan: false,
  },
  {
    id: 2,
    tenKhachHang: 'Trần Thị B',
    diaChi: 'Đà Nẵng, Việt Nam',
    dien_thoai: '0934567890',
    thuongHieu: 'Toyota',
    bienSoXe: '43C-56789',
    soKm: 20000,
    soVin: '2T1BR32E93C123456',
    ngaySua: '2023-11-05',
    kinhDo: 108.2213,
    viDo: 16.0471,
    phuTungThay: [
      {
        tenPhuTung: 'PT-003 - Dầu động cơ',
        soLuong: 4,
        giaBan: 150000,
      },
      {
        tenPhuTung: 'PT-004 - Lọc dầu',
        soLuong: 1,
        giaBan: 120000,
      }
    ],
    tienCong: 70000,
    chiPhiPhatSinh: 20000,
    tongChiPhi: 1100000,
    daThanhToan: true,
  },
  {
    id: 3,
    tenKhachHang: 'Lê Văn C',
    diaChi: 'Hồ Chí Minh, Việt Nam',
    dien_thoai: '0987654321',
    thuongHieu: 'Ford',
    bienSoXe: '51F-67890',
    soKm: 25000,
    soVin: '1FMCU93168KA12345',
    ngaySua: '2023-09-15',
    kinhDo: 106.7043,
    viDo: 10.7769,
    phuTungThay: [
      {
        tenPhuTung: 'PT-005 - Bugi đánh lửa',
        soLuong: 4,
        giaBan: 100000,
      },
      {
        tenPhuTung: 'PT-006 - Lọc xăng',
        soLuong: 1,
        giaBan: 250000,
      }
    ],
    tienCong: 60000,
    chiPhiPhatSinh: 15000,
    tongChiPhi: 1250000,
    daThanhToan: false,
  },
  {
    id: 4,
    tenKhachHang: 'Phạm Thị D',
    diaChi: 'Cần Thơ, Việt Nam',
    dien_thoai: '0912345678',
    thuongHieu: 'Mazda',
    bienSoXe: '65B-98765',
    soKm: 30000,
    soVin: 'JM1BL1UG5B1234567',
    ngaySua: '2023-08-20',
    kinhDo: 105.7285,
    viDo: 10.0459,
    phuTungThay: [
      {
        tenPhuTung: 'PT-007 - Đèn pha',
        soLuong: 1,
        giaBan: 500000,
      }
    ],
    tienCong: 40000,
    chiPhiPhatSinh: 10000,
    tongChiPhi: 550000,
    daThanhToan: true,
  },
  {
    id: 5,
    tenKhachHang: 'Hoàng Văn E',
    diaChi: 'Hải Phòng, Việt Nam',
    dien_thoai: '0909876543',
    thuongHieu: 'Kia',
    bienSoXe: '15A-24680',
    soKm: 18000,
    soVin: 'KNALD1245J3456789',
    ngaySua: '2023-07-30',
    kinhDo: 106.6825,
    viDo: 20.8449,
    phuTungThay: [
      {
        tenPhuTung: 'PT-008 - Lọc gió điều hòa',
        soLuong: 1,
        giaBan: 300000,
      },
      {
        tenPhuTung: 'PT-009 - Dây curoa',
        soLuong: 1,
        giaBan: 400000,
      }
    ],
    tienCong: 80000,
    chiPhiPhatSinh: 50000,
    tongChiPhi: 830000,
    daThanhToan: false,
  }
]);

</script>