<template>
  <Dialog v-model:visible="internalVisible" :style="{ width: '1000px' }" :header="'Hiển thị thông tin in'" :modal="true"
    :close-on-escape="true">
    <div>
      <div class="flex justify-end mb-3">
        <Button label="In thông tin" icon="pi pi-print" severity="info" @click="printById('printSection')" />
      </div>
      <div class="border border-black">
        <div id="printSection" class="m-3">
          <div class="grid grid-cols-3">
            <div class="col-span-1 ml-5">
              <img src="assets/fonts/qr.jpg" alt="" width="90px" height="90px" class="m-3">
              <div class="font-bold mt-1">
                <div>
                  STK:4510428362 <br />
                  Trịnh Ngọc Tiến - NH BIDV
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <div class="flex flex-col items-center justify-center text-center h-full ">
                <div class="font-bold text-[32px] ">
                  GARA Ô TÔ TIẾN NGA
                </div>
                <div class="font-normal">
                  Đ/c:Tổ 13 TTNT VL - Vị Xuyên - Hà Giang
                </div>
                <div class="font-normal">
                  ĐT: (Tiến) 0333 271 688
                </div>
              </div>
              <div class="mr-5 flex justify-end italic text-[18px]">
                Ngày {{ data.getDay() }} tháng {{ data.getMonth() }} năm {{ data.getFullYear() }}
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center text-center mt-8 mb-6">
            <div class="font-bold text-[32px]">
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
          <div>
            <div class="text-[18px] font-bold mt-5 mb-3">
              1. Phụ tùng thay thế
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
          </div>

          <div>
            <div class="text-[18px] font-bold mt-5 mb-3">
              2. Tiền công sửa chữa
            </div>
            <div class="flex justify-center">
              <table class="styled-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Nội dung sửa chữa</th>
                    <th>Đơn giá</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="(item, index) in customerInfo.tienCong" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.tenTienCong }}</td>
                    <td>{{ item.giaCong.toLocaleString('vi-VN') }} VND</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- <div class="m-3"> -->
            <!-- <div class="w-full font-normal text-md"> -->
              <!-- <span>Ghi chú: </span> -->
              <!-- <span>{{ customerInfo.tongChiPhi.toLocaleString('vi-VN') }} VND</span> -->
              <!-- <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro deserunt enim soluta, quibusdam commodi accusantium saepe ratione, unde ab officiis ad atque quisquam quaerat? Nobis ex unde dolorum non hic?</span>
            </div>
          </div> -->
          <div class="flex flex-col items-end m-6">
            <div class="flex justify-between w-full font-bold text-2xl">
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
        ${styles} 
      </head>
      <body>${content}</body>
    </html>
  `);
  doc.close();

  // Đảm bảo tất cả ảnh trong iframe được tải trước khi in
  const images = printWindow.contentWindow.document.images;
  const imageLoadPromises = Array.from(images).map((img) => {
    return new Promise((resolve) => {
      if (img.complete) {
        resolve(null); // Ảnh đã tải xong
      } else {
        img.onload = img.onerror = () => resolve(null); // Đợi tải xong
      }
    });
  });

  Promise.all(imageLoadPromises).then(() => {
    // Thực hiện in và xóa iframe sau đó
    printWindow.contentWindow.focus();
    printWindow.contentWindow.print();
    document.body.removeChild(printWindow); // Xóa iframe sau khi in
  });
}

</script>

<style scoped>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  text-align: left;
  border: 1px solid #000; /* Đường viền bao quanh bảng */
}

.styled-table thead tr {
  background-color: #f3f3f3;
  color: #000000;
  text-align: center;
  font-weight: bold;
}

.styled-table th,
.styled-table td {
  border: 1px solid #000; /* Đường viền ô trong bảng */
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #000; /* Đường viền giữa các hàng */
}

.styled-table tbody tr:last-of-type {
  border-bottom: 1px solid #000; /* Đường viền cuối bảng */
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

</style>