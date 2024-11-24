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
              placeholder="Chọn loại hàng" class="w-48" />
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
      <Button label="Thêm mới" icon="pi pi-plus" class="flex mr-4 justify-items-end" title="Thêm mới" />
    </div>

    <div class="m-4" style="padding-bottom: 16px;">
      <DataTable :value="listHangNhap" tableStyle="min-width: 50rem" showGridlines>
        <Column field="maPhuTung" header="Mã phụ tùng"></Column>
        <Column field="tenPhuTung" header="Tên phụ tùng"></Column>
        <Column field="ngaySanXuat" header="Ngày sản xuất"></Column>
        <Column field="hanSuDung" header="Hạn sử dụng"></Column>
        <Column field="ngayNhap" header="Ngày nhập hàng"></Column>
        <Column field="soLuong" header="Số lượng"></Column>
        <Column field="giaNhap" header="Giá nhập">
          <template #body="slotProps">
            <span>{{ slotProps.data.giaNhap }} &#8363;</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

</template>
<script setup>
// import { titleHeader, setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import 'primeicons/primeicons.css'

// onMounted(() =>{ 
//   setTitleHeader("Hàng nhập");
// })
const keyWords = ref();
const hangNhap = ref();
const listHangNhap = [
  {
    id: 1,
    maPhuTung: 'PT001',
    tenPhuTung: 'Bộ lọc dầu',
    ngaySanXuat: '2023-01-15',
    hanSuDung: '2025-01-15',
    ngayNhap: '2023-02-01',
    soLuong: 100,
    giaNhap: '50.000'
  },
  {
    id: 2,
    maPhuTung: 'PT002',
    tenPhuTung: 'Dây curoa',
    ngaySanXuat: '2023-03-20',
    hanSuDung: '2026-03-20',
    ngayNhap: '2023-04-05',
    soLuong: 200,
    giaNhap: '75.000'
  }
];
</script>