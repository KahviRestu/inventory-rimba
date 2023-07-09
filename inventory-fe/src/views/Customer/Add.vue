<template>
  <div class="container my-4">
    <h3 class="mt-3">Tambah Customer</h3>
    <div class="container mt-3">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="nama" class="form-label">Nama</label>
          <input type="text" class="form-control" id="nama" v-model="form.nama"/>
        </div>
        <div class="mb-3">
          <label for="contact" class="form-label">Contact</label>
          <input type="text" class="form-control" id="contact" v-model="form.contact"/>
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
        <div class="mb-3">
          <label for="ktp" class="form-label">KTP</label>
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
  name: "TambahCustomer",
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
    handleFileUpload(event) {
      this.form.ktp = event.target.files[0];
    },
    submitForm() {
      axios
        .post("http://localhost:5000/customer", this.form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          alert("Customer added successfully");
          this.$router.push({ name: "customer" });
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to add customer");
        });
    },
  },
};
</script>
