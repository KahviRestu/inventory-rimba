<template>
  <div class="container">
    <h1>Tambah Sales</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="customer">Customer</label>
        <select
          class="form-control"
          id="customer"
          v-model="selectedCustomer"
          required
        >
          <option
            v-for="customer in customers"
            :key="customer.customerId"
            :value="customer.customerId"
          >
            {{ customer.nama }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="items">Items</label>
        <div v-for="(item, index) in items" :key="item.itemId">
          <div class="form-inline">
            <select
              class="form-control mr-2 mt-2"
              v-model="selectedItems[index].itemId"
              :name="'items[' + index + '][itemId]'"
              required
            >
              <option
                v-for="i in itemOptions"
                :key="i.itemId"
                :value="i.itemId"
              >
                {{ i.nama_item }}
              </option>
            </select>
            <input
              type="number"
              class="form-control mr-2 mt-2"
              v-model="selectedItems[index].qty"
              :name="'items[' + index + '][qty]'"
              min="1"
              required
            />
            <button
              type="button"
              class="btn btn-danger mt-2"
              @click="removeItem(index)"
              v-show="index > 0"
            >
              Hapus
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-success mt-2" @click="addItem">
          Tambah Item
        </button>
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TambahSales",
  data() {
    return {
      customers: [],
      items: [{ itemId: "", qty: 1 }],
      itemOptions: [],
      selectedCustomer: "",
      selectedItems: [{ itemId: "", qty: 1 }],
    };
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:5000/customer")
        .then((response) => {
          this.customers = response.data.data;
          console.log(this.customers);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:5000/item")
        .then((response) => {
          this.itemOptions = response.data.data;
          console.log(this.itemOptions);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      const data = {
        customerId: this.selectedCustomer,
        items: this.selectedItems,
      };

      axios
        .post("http://localhost:5000/sales", data)
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
          this.$router.push({ name: "sales" });
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    },
    addItem() {
      this.items.push({ itemId: "", qty: 1 });
      this.selectedItems.push({ itemId: "", qty: 1 });
    },
    removeItem(index) {
      this.items.splice(index, 1);
      this.selectedItems.splice(index, 1);
    },
    getMaxQty(itemId) {
      const selectedItem = this.itemOptions.find(
        (item) => item.itemId === itemId
      );
      return selectedItem ? selectedItem.stok : 0;
    },
    validateQty() {
      for (let i = 0; i < this.selectedItems.length; i++) {
        const selectedItemId = this.selectedItems[i].itemId;
        const selectedQty = this.selectedItems[i].qty;
        const maxQty = this.getMaxQty(selectedItemId);
        if (selectedQty > maxQty) {
          alert(`Stok untuk item "${selectedItemId}" tidak mencukupi.`);
          return false;
        }
      }
      return true;
    },

    submitForm() {
      if (!this.validateQty()) {
        return;
      }
      const data = {
        customerId: this.selectedCustomer,
        items: this.selectedItems,
      };
      axios
        .post("http://localhost:5000/sales", data)
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
          this.$router.push({ name: "sales" });
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to add sales");
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
