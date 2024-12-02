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
      <DataTable :value="listKhachHang" tableStyle="min-width: 50rem" showGridlines>
        <Column class="text-center" body-style="text-align: center; width: 5rem">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="tenNhanVien" header="Tên nhân viên"></Column>
        <Column field="ngaySinh" header="Ngày sinh"></Column>
        <Column field="dienThoai" header="Số điện thoại"></Column>
        <Column field="diaChi" header="Địa chỉ"></Column>
        <Column field="tienLuong" header="Tiền lương">
          <template #body="slotProps">
            <span>{{ slotProps.data.tienLuong.toLocaleString('vi-VN') }} &#8363;</span>
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
  <NhanVienDialogCreateKhachHang :is-visible="isOpenModal" @hide-modal="isOpenModal = false" />
  <NhanVienDialogEditKhachHang :is-visible="isOpenEditModel" @hide-modal="isOpenEditModel = false" />
</template>
<script setup>
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import 'primeicons/primeicons.css'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

setTitleHeader("Nhân viên");
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


const listKhachHang = [
    {
        "tenNhanVien": "Nguyen Van A",
        "ngaySinh": "12-09-2003",
        "dienThoai": "0987654321",
        "diaChi": "123 Nguyen Trai, Ha Noi",
        "tienLuong": 15000000
    },
    {
        "tenNhanVien": "Tran Thi B",
        "ngaySinh": "06-08-1996",
        "dienThoai": "0912345678",
        "diaChi": "45 Le Loi, TP. Ho Chi Minh",
        "tienLuong": 12000000
    },
    {
        "tenNhanVien": "Pham Van C",
        "ngaySinh": "10-06-2002",
        "dienThoai": "0978123456",
        "diaChi": "678 Hai Ba Trung, Da Nang",
        "tienLuong": 14000000
    },
    {
        "tenNhanVien": "Le Thi D",
        "ngaySinh": "30-06-1990",
        "dienThoai": "0932112345",
        "diaChi": "56 Tran Hung Dao, Hai Phong",
        "tienLuong": 13000000
    },
    {
        "tenNhanVien": "Hoang Van E",
        "ngaySinh": "12-03-2001",
        "dienThoai": "0965432109",
        "diaChi": "789 Le Thanh Ton, Can Tho",
        "tienLuong": 11000000
    }
];
</script>