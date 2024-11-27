<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Hiển thị thông tin in'" :modal="true"
    :close-on-escape="true">
    <div>
      <div class="flex justify-end mb-3">
        <Button label="In thông tin" icon="pi pi-print" severity="info" @click="printById('printSection')" />
      </div>
      <div class="border border-black">
        <div id="printSection" class="m-5">
          <div class="grid grid-cols-3">
            <div class="col-span-1">
              <img src="assets/fonts/qr.png" alt="" width="90px" height="90px">
              <div class="font-bold mt-2">
                <div>
                  STK:4510428362 <br />
                  Trịnh Ngọc Tiến - NH BIDV
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <div class="flex flex-col items-center justify-center text-center h-full">
                <div class="font-bold text-2xl ">
                  GARA Ô TÔ TIẾN NGA
                </div>
                <div class="font-normal">
                  Đ/c:Tổ 13 TTNT VL - Vị Xuyên - Hà Giang
                </div>
                <div class="font-normal">
                  ĐT: (Tiến) 0333 271 688
                </div>
              </div>
              <div class="flex justify-end italic text-sm">
                Ngày {{ data.getDay() }} tháng {{ data.getMonth() }} năm {{ data.getFullYear() }}
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center text-center mt-8 mb-6">
            <div class="font-bold text-3xl">
              HÓA ĐƠN THANH TOÁN
            </div>
          </div>
          <div class="ml-3">
            <div class="grid grid-cols-2 ">
              <div class=" text-[20px]">Chủ xe: {{ customerInfo.tenKhachHang }}</div>
              <div class=" text-[20px]">Biển số: {{ customerInfo.bienSoXe }}</div>
            </div>
            <div class="grid grid-cols-2 ">
              <div class=" text-[20px]">Hiện xe: {{ customerInfo.thuongHieu }}</div>
              <div class=" text-[20px]">Số km: {{ customerInfo.soKm.toLocaleString('vi-VN') }} km</div>
            </div>
          </div>
          <div class="flex justify-center">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Phụ Tùng</th>
                  <th>Số Lượng</th>
                  <th>Giá Bán</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="(item, index) in customerInfo.phuTungThay" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.tenPhuTung }}</td>
                  <td>{{ item.soLuong }}</td>
                  <td>{{ item.giaBan.toLocaleString('vi-VN') }} VND</td>
                  <td>{{ (item.giaBan * item.soLuong).toLocaleString('vi-VN') }} VND</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div></div>
          <div class="flex flex-col items-end mx-6">
            <div class="flex justify-between w-full">
              <span>Tiền công:</span>
              <span>{{ customerInfo.tienCong.toLocaleString('vi-VN') }} VND</span>
            </div>
            <div class="flex justify-between w-full">
              <div class="flex justify-center items-center">
                <span>Chi phí phát sinh</span>
                <span class="text-[14px] italic ml-1"> ({{ customerInfo.ghiChu }}):</span>
              </div>
              <span>{{ customerInfo.chiPhiPhatSinh.toLocaleString('vi-VN') }} VND</span>
            </div>
            <div class="flex justify-between w-full font-bold text-xl">
              <span>Tổng:</span>
              <span>{{ customerInfo.tongChiPhi.toLocaleString('vi-VN') }} VND</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
});

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
        soLuong: 2,
        giaBan: 200000,
      },
      {
        tenPhuTung: 'PT-002 - Lọc dầu',
        soLuong: 1,
        giaBan: 200000,
      },
      {
        tenPhuTung: 'PT-003 - Lốp',
        soLuong: 5,
        giaBan: 500000,
      },
      {
        tenPhuTung: 'PT-004 - Gương',
        soLuong: 2,
        giaBan: 150000,
      }
    ],
    tienCong: 50000,
    chiPhiPhatSinh: 10000,
    tongChiPhi: 900000,
    ghiChu: "Tiền nhân công và tiền hàng tăng",
    daThanhToan: false,
  },
);

const emit = defineEmits(['hideModal']);

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
};

const data = new Date(customerInfo.ngaySua);

function printById(elementId: string) {
  const content = document.getElementById(elementId).innerHTML; // Lấy nội dung cần in

  // Tạo iframe ẩn
  const printWindow = document.createElement("iframe");
  printWindow.style.position = "absolute";
  printWindow.style.width = "0";
  printWindow.style.height = "0";
  printWindow.style.border = "none";

  // Gắn vào body
  document.body.appendChild(printWindow);

  // Lấy toàn bộ CSS từ tài liệu chính
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map(style => style.outerHTML)
    .join('');

  // Ghi nội dung vào iframe
  const doc = printWindow.contentWindow.document;
  doc.open();
  doc.write(`
    <html>
      <head>
        <title>In Nội Dung</title>
        ${styles} <!-- Nhúng toàn bộ style -->
      </head>
      <body>${content}</body>
    </html>
  `);
  doc.close();

  // Thực hiện in và xóa iframe sau đó
  printWindow.contentWindow.focus();
  printWindow.contentWindow.print();
  document.body.removeChild(printWindow); // Xóa iframe sau khi in
}



</script>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  text-align: left;
  border-color: #000000;
}

.styled-table thead tr {
  background-color: #f3f3f3;
  color: #000000;
  text-align: center;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  border: 1px solid #dddddd;
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

/* .styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
} */

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #ffffff;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>