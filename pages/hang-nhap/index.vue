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
    <div style="display: flex; justify-content: flex-end;">
      <Button label="Thêm mới" icon="pi pi-plus" class="flex mr-4 justify-items-end" title="Thêm mới"
        @click="onOpenModal" />
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
        <Column field="tenLanNhap" header="Tên lần nhập hàng" className="text-sm">
          <template #body="{ data }">
            <NuxtLink class="font-bold text-xl text-cyan-800" :to="`/hang-nhap/${data.id}`">{{ data.tenLanNhap
              }}</NuxtLink>
          </template>
        </Column>
        <Column field="ngayNhapHang" header="Ngày nhập hàng" className="text-sm"></Column>
        <Column :exportable="false" style="min-width: 9rem" :frozen="true" align-frozen="right">
          <template #header>
            <span class="m-auto"><b>Thao tác</b></span>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <Button icon="pi pi-pencil" outlined rounded severity="success" class="mr-2" title="chỉnh sửa"
                @click="onOpenEditModal()" />
              <Button icon="pi pi-trash" outlined rounded severity="danger" title="Xóa"
                @click="confirmDeleteProject()" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <HangNhapDialogCreateHangNhap :is-visible="isOpenModal" @hide-modal="isOpenModal = false" />
  <HangNhapDialogEditHangNhap :is-visible="isOpenEditModel" @hide-modal="isOpenEditModel = false" />
</template>

<script setup lang="ts">
import { setTitleHeader } from '~/composables/globalTitleHeader';
import { ref } from 'vue';
import 'primeicons/primeicons.css'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

setTitleHeader("Hàng nhập");

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
  ConfirmDialog.showConfirmDialog(
    confirm,
    `${'Bạn có chắc muốn cập nhật thông tin báo cáo này?'
    }`,
    'Xác nhận',
    'pi pi-question-circle',
    () => {
      console.log(1);
    },
    () => { },
    '',
    ' p-button-danger',
  );
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
    tenLanNhap: 'PT001',
    ngayNhapHang: '2023-02-01',
  },
  {
    id: 2,
    tenLanNhap: 'PT002',
    ngayNhapHang: '2023-04-05',
  }
];
</script>