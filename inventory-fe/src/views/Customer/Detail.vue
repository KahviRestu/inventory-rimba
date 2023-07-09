<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 card py-3">
        <h3 class="mb-3">Detail Customer</h3>
        <form class="card-body">
          <div class="mb-3">
            <label for="nama" class="form-label">Nama</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              disabled
              :value="customer.nama"
            />
          </div>
          <div class="mb-3">
            <label for="contact" class="form-label">Contact</label>
            <input
              type="text"
              class="form-control"
              id="contact"
              disabled
              :value="customer.contact"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              disabled
              :value="customer.contact"
            />
          </div>
          <div class="mb-3">
            <label for="alamat" class="form-label">Alamat</label>
            <textarea
              type="text"
              class="form-control"
              id="alamat"
              disabled
              :value="customer.alamat"
            ></textarea>
          </div>
          <div class="mb-3 col-6 row">
            <label for="ktp" class="form-label">KTP</label>
            <img
              alt="KTP"
              class="img-thumbnail mb-3 ml-3"
              :src="customer.ktp"
            />
          </div>
          <div class="mb-3">
            <label for="diskon" class="form-label">Diskon</label>
            <input
              type="text"
              class="form-control"
              id="diskon"
              disabled
              :value="customer.diskon"
            />
          </div>
          <div class="mb-3">
            <label for="type_diskon" class="form-label">Tipe Diskon</label>
            <input
              type="text"
              class="form-control"
              id="type_diskon"
              disabled
              :value="customer.type_diskon"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DetailCustomer",
  data() {
    return { customer: {} };
  },
  methods: {
    fetchData() {
      const customerId = this.$route.params.customerId;
      axios
        .get(`http://localhost:5000/customer/${customerId}`)
        .then((response) => {
          this.customer = response.data.data;
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
