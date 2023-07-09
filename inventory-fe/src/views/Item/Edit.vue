<template>
  <div class="container">
    <h3 class="mt-3">Update Item Baru</h3>
    <div class="container mt-3">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="nama_item" class="form-label">Nama Item</label>
          <input
            type="text"
            class="form-control"
            id="nama_item"
            v-model="form.nama_item"
          />
        </div>
        <div class="mb-3">
          <label for="unit" class="form-label">Unit</label>
          <select class="form-control" id="unit" v-model="form.unit">
            <option value="kg">KG</option>
            <option value="pcs">PCS</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="stok" class="form-label">Stok</label>
          <input
            type="number"
            class="form-control"
            id="stok"
            v-model="form.stok"
          />
        </div>
        <div class="mb-3">
          <label for="harga" class="form-label">Harga Satuan</label>
          <input
            type="number"
            class="form-control"
            id="harga"
            v-model="form.harga_satuan"
          />
        </div>
        <div class="mb-3 row">
          <label for="barang" class="form-label">Foto Barang</label>
          <img alt="" class="col-4 mb-3" :src="form.barang" />
          <input type="file" class="form-control" id="barang" @change="handleFileUpload" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditItem",
  data() {
    return {
      form: {
        nama_item: "",
        unit: "",
        stok: "",
        harga_satuan: "",
        barang: "",
      },
    };
  },
  methods: {
    fetchData() {
      const itemId = this.$route.params.itemId;
      axios
        .get(`http://localhost:5000/item/${itemId}`)
        .then((response) => {
          const item = response.data.data;
          this.form.nama_item = item.nama_item;
          this.form.unit = item.unit;
          this.form.stok = item.stok;
          this.form.harga_satuan = item.harga_satuan;
          this.form.barang = item.barang;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFileUpload(event) {
      this.form.barang = event.target.files[0];
    },
    submitForm() {
      const itemId = this.$route.params.itemId;
      axios
        .patch(`http://localhost:5000/item/${itemId}`, this.form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
          this.$router.push({ name: "item" });
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
