<template>
  <div class="container">
    <div class="row justify-content-between mt-4">
      <div class="col-4">
        <h4>Data Customer</h4>
      </div>
      <div class="col-2 d-grid gap-5">
        <router-link :to="{ name: 'add-data-customer' }" class="btn btn-primary"
          >Tambah Data</router-link
        >
      </div>
    </div>
    <div class="mt-4">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama</th>
            <th scope="col">contact</th>
            <th scope="col">email</th>
            <th scope="col">diskon</th>
            <th scope="col">Tipe Diskon</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in customer" :key="item.customerId">
            <td>{{ index + 1 }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.contact }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.diskon }}</td>
            <td>{{ item.type_diskon }}</td>
            <td>
              <router-link
                :to="{
                  name: 'detail-data-customer',
                  params: { customerId: item.customerId },
                }"
                class="btn btn-info text-white"
                href="#"
                >Detail</router-link
              >
              |
              <router-link
                :to="{
                  name: 'edit-data-customer',
                  params: { customerId: item.customerId },
                }"
                class="btn btn-warning text-white"
                href="#"
                >Edit</router-link
              >
              |
              <a
                href="#"
                class="btn btn-danger"
                @click.prevent="deleteCustomer(item.customerId)"
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
  name: "Customer",
  data() {
    return { customer: [] };
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:5000/customer")
        .then((response) => {
          this.customer = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCustomer(id) {
      if (confirm("Anda yakin ingin menghapus data ini?")) {
        axios
          .delete(`http://localhost:5000/customer/${id}`)
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
