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
          <Select v-model="hangNhap" :options="listHangNhap" option-label="tenPhuTung" option-value="id"
            placeholder="Chọn loại hàng" class="w-48" show-clear />
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
    <div>
      <Button label="Quay lại" icon="pi pi-arrow-left" severity="danger" class="flex ml-4 justify-items-end"
        title="Quay lại" @click="onBack" />
    </div>
    <div class="m-4" style="padding-bottom: 16px;">
      <DataTable :value="listHangNhap" tableStyle="min-width: 50rem" showGridlines paginator :rows="5">
        <Column class="text-center" body-style="text-align: center">
          <template #header>
            <span class="m-auto"><b>STT</b></span>
          </template>
          <template #body="slotPros">
            {{ getRowSTT(slotPros.index) }}
          </template>
        </Column>
        <Column field="ngaySanXuat" header="Ngày sản xuất" className="text-sm"></Column>
        <Column field="hanSuDung" header="Hạn sử dụng" className="text-sm"></Column>
        <Column field="soLuong" header="Số lượng nhập" className="text-sm"></Column>
        <Column field="soLuongTon" header="Số lượng còn lại" className="text-sm"></Column>
        <Column field="giaNhap" header="Giá nhập" className="text-sm">
          <template #body="slotProps">
            <span>{{ slotProps.data.giaNhap }} &#8363;</span>
          </template>
        </Column>
        <Column field="giaBan" header="Giá bán">
          <template #body="slotProps">
            <span>{{ slotProps.data.giaBan }} &#8363;</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <HangNhapDialogCreateDetailHangNhap :is-visible="isOpenModal" @hide-modal="isOpenModal = false" />
  <HangNhapDialogEditDetailHangNhap :is-visible="isOpenEditModel" @hide-modal="isOpenEditModel = false" />
</template>

<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import 'primeicons/primeicons.css'
import { useRouter } from 'vue-router';

setTitleHeader("Lịch sử nhập PT001 - Bộ lọc dầu");

const router = useRouter();
const keyWords = ref();
const hangNhap = ref();
const isOpenModal = ref();
const isOpenEditModel = ref();


const onBack = () => {
  router.push('/kho-hang');
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


const listHangNhap = [
  {
    id: 1,
    tenPhuTung: 'PT001 - Bộ lọc dầu',
    ngaySanXuat: '2023-01-15',
    hanSuDung: '2025-01-15',
    ngayNhap: '2023-02-01',
    soLuong: 100,
    soLuongTon: 90,
    giaNhap: '50.000',
    giaBan: '60.000'
  },
  {
    id: 2,
    tenPhuTung: 'PT002 - Dây curoa',
    ngaySanXuat: '2023-03-20',
    hanSuDung: '2026-03-20',
    ngayNhap: '2023-04-05',
    soLuong: 200,
    soLuongTon: 200,
    giaNhap: '75.000',
    giaBan: '85.000'
  }
];
</script>