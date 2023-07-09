<template>
  <div class="container my-4">
    <h3 class="mt-3">Update Customer</h3>
    <div class="container mt-3">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="nama" class="form-label">Nama</label>
          <input type="text" class="form-control" id="nama" v-model="form.nama" />
        </div>
        <div class="mb-3">
          <label for="contact" class="form-label">Contact</label>
          <input type="text" class="form-control" id="contact" v-model="form.contact" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="form.email"/>
        </div>
        <div class="mb-3">
          <label for="alamat" class="form-label">Alamat</label>
          <textarea class="form-control" id="alamat" rows="3" v-model="form.alamat"></textarea>
        </div>
        <div class="mb-3">
          <label for="diskon" class="form-label">Diskon</label>
          <input type="number" class="form-control" id="diskon" v-model="form.diskon"/>
        </div>
        <div class="mb-3">
          <label for="type_diskon" class="form-label">Tipe Diskon</label>
          <select class="form-control" id="type_diskon" v-model="form.type_diskon">
            <option value="persentase">Percent</option>
            <option value="fix">Fix</option>
          </select>
        </div>
        <div class="mb-3 row">
          <label for="ktp" class="form-label">KTP</label>
          <img :src="form.ktp" alt="" class="col-4 mb-3" />
          <input type="file" class="form-control" id="ktp" @change="handleFileUpload"/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TambahData",
  data() {
    return {
      form: {
        nama: "",
        contact: "",
        email: "",
        alamat: "",
        diskon: "",
        type_diskon: "",
        ktp: "",
      },
    };
  },
  methods: {
    fetchData() {
      const customerId = this.$route.params.customerId;
      axios
        .get(`http://localhost:5000/customer/${customerId}`)
        .then((response) => {
          const customer = response.data.data;
          this.form.nama = customer.nama;
          this.form.contact = customer.contact;
          this.form.alamat = customer.alamat;
          this.form.email = customer.email;
          this.form.diskon = customer.diskon;
          this.form.type_diskon = customer.type_diskon;
          this.form.ktp = customer.ktp;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFileUpload(event) {
      this.form.ktp = event.target.files[0];
    },
    submitForm() {
      const customerId = this.$route.params.customerId;
      console.log(customerId);
      axios
        .patch(`http://localhost:5000/customer/${customerId}`, this.form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
          this.$router.push({ name: "customer" });
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.messsage);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
