<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6 card py-3">
        <h3 class="mb-3">Detail Data Item</h3>
        <form class="card-body">
          <div class="mb-3">
            <label for="nama-item" class="form-label" >Nama Item</label>
            <input type="text" class="form-control" id="nama-item" disabled :value="item.nama_item"/>
          </div>
          <div class="mb-3">
            <label for="unit" class="form-label">Unit</label>
            <input type="text" class="form-control" id="unit" disabled :value="item.unit" />
          </div>
          <div class="mb-3">
            <label for="stok" class="form-label">Stok</label>
            <input type="text" class="form-control" id="stok" disabled :value="item.unit" />
          </div>
          <div class="mb-3">
            <label for="harga-satuan" class="form-label">Harga Satuan</label>
            <input type="text" class="form-control" id="harga-satuan" disabled :value="item.harga_satuan"/>
          </div>
          <div class="mb-3 col-6 row">
            <label for="barang" class="form-label">Foto Barang</label>
            <img alt="KTP" class="img-thumbnail mb-3 ml-3" :src="item.barang"/>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    name: 'DetailItem',
    data() {
      return { item: {} };
    },
    methods: {
      fetchData() {
        const itemId = this.$route.params.itemId;
        axios
          .get(`http://localhost:5000/item/${itemId}`)
          .then((response) => {
            this.item = response.data.data;
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
