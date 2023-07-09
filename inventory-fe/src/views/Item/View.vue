<template>
  <div class="container">
    <div class="row justify-content-between mt-4">
      <div class="col-4">
        <h4>Data Items</h4>
      </div>
      <div class="col-2 d-grid gap-5">
        <router-link :to="{ name: 'add-data-item' }" class="btn btn-primary"
          >Tambah Data</router-link
        >
      </div>
    </div>
    <div class="mt-4">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Nama Item</th>
            <th scope="col">Unit</th>
            <th scope="col">Stok</th>
            <th scope="col">Harga Satuan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.itemId">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.nama_item }}</td>
            <td>{{ item.unit }}</td>
            <td>{{ item.stok }}</td>
            <td>{{ item.harga_satuan }}</td>
            <td>
              <router-link
                :to="{
                  name: 'detail-data-item',
                  params: { itemId: item.itemId },
                }"
                class="btn btn-info text-white"
                href="#"
                >Detail</router-link
              >
              |
              <router-link
                :to="{
                  name: 'edit-data-item',
                  params: { itemId: item.itemId },
                }"
                class="btn btn-warning text-white"
                href="#"
                >Edit</router-link
              >
              |
              <a
                href=""
                class="btn btn-danger"
                @click.prevent="deleteData(item.itemId)"
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
  name: "Items",
  data() {
    return { items: [] };
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:5000/item")
        .then((response) => {
          this.items = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteData(id) {
      if (confirm("Are you sure want to delete this item?")) {
        axios
          .delete(`http://localhost:5000/item/${id}`)
          .then(() => {
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
