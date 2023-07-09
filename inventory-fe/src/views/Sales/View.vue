<template>
  <div class="container">
    <div class="row justify-content-between mt-4">
      <div class="col-4">
        <h4>Data Sales</h4>
      </div>
      <div class="col-2 d-grid gap-5">
        <router-link :to="{ name: 'add-data-sales' }" class="btn btn-primary"
          >Tambah Data</router-link
        >
      </div>
    </div>
    <div class="mt-4">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Kode Transaksi</th>
            <th scope="col">Tanggal Transaksi</th>
            <th scope="col">Customer</th>
            <th scope="col">Diskon</th>
            <th scope="col">Harga</th>
            <th scope="col">Bayar</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sales" :key="item.salesId">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ item.code_transaksi }}</td>
            <td>{{ formatDate(item.tanggal_transaksi) }}</td>
            <td>{{ item.Customer.nama }}</td>
            <td>{{ item.total_diskon }}</td>
            <td>{{ item.total_harga }}</td>
            <td>{{ item.total_bayar }}</td>
            <td>
              <router-link
                :to="{
                  name: 'detail-data-sales',
                  params: { salesId: item.salesId },
                }"
                class="btn btn-info text-white"
                href="#"
                >Detail</router-link
              >
              |
              <a
                class="btn btn-danger"
                href="#"
                @click="deleteSales(item.salesId)"
                >Delete</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Sales",
  data() {
    return { sales: [] };
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:5000/sales")
        .then((response) => {
          this.sales = response.data.data;
          console.log(this.sales);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID");
    },
    deleteSales(id) {
      if (confirm("Are you sure you want to delete this sales?")) {
        axios
          .delete(`http://localhost:5000/sales/${id}`)
          .then((response) => {
            this.fetchData();
            alert(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
