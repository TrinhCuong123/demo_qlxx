<template>
  <div class="bg-white m-5 rounded-lg">
    <Button label="Quay lại" icon="pi pi-arrow-left" severity="danger" class="flex ml-4 justify-items-end"
    title="Quay lại" @click="onBack" />
    <div class="grid grid-cols-1 gap-1">
      <div class="col-span-1">
        
        <p>Tên khách hàng: <span class="font-bold">{{ customerInfo.tenKhachHang }}</span></p>

        <p>Số điện thoại: <span class="font-bold">{{ customerInfo.dien_thoai }}</span></p>

        <p>Địa chỉ: <span class="font-bold">{{ customerInfo.dia_chi }}</span></p>

        <p>Thương hiệu: <span class="font-bold">{{ customerInfo.thuongHieu }}</span></p>

        <p>Biển số xe: <span class="font-bold">{{ customerInfo.bienSoXe }}</span></p>

        <p>Số km: <span class="font-bold">{{ customerInfo.soKm }}</span></p>

        <p>Số vin: <span class="font-bold">{{ customerInfo.soVin }}</span></p>

        <p>Ngày sửa: <span class="font-bold">{{ customerInfo.ngaySua }}</span></p>

        <p>Kinh độ: <span class="font-bold">{{ customerInfo.kinhDo }}</span></p>

        <p>Vĩ độ: <span class="font-bold">{{ customerInfo.viDo }}</span></p>

        <p>Ghi chú: <span class="font-bold">{{ customerInfo.ghiChu }}</span></p>
      </div>
      <!-- <div class="col-span-1">
        <div class="flex justify-content-between">
          <h5 class="font-bold m-1 text-xl mb-2" style="line-height: 2; color: #0b5ee7">II. Thông tin sửa chữa</h5>
        </div>
        <div>
          <h6 class="font-bold m-1 text-md mb-2">1. Phụ tùng thay thế </h6>
        </div>
        <DataTable :value="customerInfo.phuTungThay" tableStyle="min-width: 50rem;  " showGridlines>
          <Column class="text-center" body-style="text-align: center; width: 12px">
            <template #header>
              <span class="m-auto"><b>STT</b></span>
            </template>
            <template #body="slotPros">
              {{ getRowSTT(slotPros.index) }}
            </template>
          </Column>
          <Column field="tenPhuTung" header="Tên phụ tùng" style="min-width: 10rem"></Column>
          <Column field="donVi" header="Đơn vị"></Column>
          <Column field="soLuong" header="Số lượng"></Column>
          <Column field="giaBan" header="Giá bán">
            <template #body="slotProps">
              {{ slotProps.data.giaBan.toLocaleString('vi-VN') }} VNĐ
            </template>
          </Column>
        </DataTable>
        <h6 class="font-bold m-1 text-md mt-5">2. Tiền công sửa chữa </h6>
        <DataTable :value="customerInfo.tienCong" tableStyle="min-width: 50rem;  " showGridlines>
          <Column class="text-center" body-style="text-align: center; width: 12px">
            <template #header>
              <span class="m-auto"><b>STT</b></span>
            </template>
            <template #body="slotPros">
              {{ getRowSTT(slotPros.index) }}
            </template>
          </Column>
          <Column field="tenTienCong" header="Nội dung sửa chữa" style="min-width: 10rem"></Column>
          <Column field="giaCong" header="Đơn giá">
            <template #body="slotProps">
              {{ slotProps.data.giaCong.toLocaleString('vi-VN') }} VNĐ
            </template>
          </Column>
        </DataTable>
        <div class="mt-5 text-md">
          <p>Tổng chi phí: <span class="font-bold">{{ customerInfo.tongChiPhi.toLocaleString("vi-VN") }} VNĐ</span></p>
          <p>Tình trạng thanh toán:
            <span class="font-bold">
              {{ customerInfo.daThanhToan ? "Đã thanh toán" : "Chưa thanh toán" }}
            </span>
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive} from 'vue'
import { useRouter } from 'vue-router';
import { setTitleHeader } from '~/composables/globalTitleHeader';

setTitleHeader(`Chi tiết doanh thu tháng ${1}`);

const router = useRouter();

const onBack = () => {
  router.push('/doanh-thu');
};

const customerInfo = reactive(
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
    phuTungThay: [
      {
        tenPhuTung: 'PT-001 - Lọc gió',
        donVi: "Lít",
        soLuong: 2,
        giaBan: 200000,
      },
      {
        tenPhuTung: 'PT-002 - Lọc dầu',
        donVi: "Can",
        soLuong: 1,
        giaBan: 200000,
      },
      {
        tenPhuTung: 'PT-003 - Lốp',
        donVi: "Thùng",
        soLuong: 5,
        giaBan: 500000,
      },
      {
        tenPhuTung: 'PT-004 - Gương',
        donVi: "Cái",
        soLuong: 2,
        giaBan: 150000,
      }
    ],
    tienCong: [
      {
        tenTienCong: 'Công số 1',
        giaCong: 2000000,
      },
      {
        tenTienCong: 'Công số 2',
        giaCong: 2600000,
      },
      {
        tenTienCong: 'Công số 3',
        giaCong: 3500000,
      },
      {
        tenTienCong: 'Công số 4',
        giaCong: 650000,
      },
    ],
    tongChiPhi: 900000,
    daThanhToan: false,
    ghiChu: "Đã kiểm tra"
  },
);
</script>