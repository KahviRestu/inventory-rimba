<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12">
        <h3 class="mb-3">Detail Customer</h3>
        <form>
          <div class="mb-3">
            <label for="nama" class="form-label">Code Transaksi</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              :value="sales.code_transaksi"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="nama" class="form-label">Tanggal Transaksi</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              :value="formatDate(sales.tanggal_transaksi)"
              disabled
            />
          </div>
          <div class="mb-3" v-if="sales.Customer">
            <label for="nama" class="form-label">Nama Customer</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              :value="sales.Customer.nama"
              disabled
            />
          </div>

          <div class="mb-3">
            <label for="nama" class="form-label">Total Diskon</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              :value="sales.total_diskon"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="nama" class="form-label">Total Harga</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              :value="sales.total_harga"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="nama" class="form-label">Total Bayar</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              :value="sales.total_bayar"
              disabled
            />
          </div>
          <div class="">
            <label for="nama" class="form-label">Barang</label>
          </div>
          <div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Kuantitas</th>
                  <th>Harga Satuan</th>
                  <th>Total Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in sales.SalesItems" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.Item.nama_item }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.Item.harga_satuan }}</td>
                  <td>{{ item.Item.harga_satuan * item.qty }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DetailSales",
  data() {
    return { sales: {} };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID");
    },
    fetchData() {
      const salesId = this.$route.params.salesId;
      axios
        .get(`http://localhost:5000/sales/${salesId}`)
        .then((response) => {
          this.sales = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
