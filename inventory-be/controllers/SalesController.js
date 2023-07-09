const { Sales, SalesItem, Item, Customer } = require('../models');

const saveSales = async (req, res) => {
  try {
    let total_harga = 0;
    let total_diskon = 0;

    const tanggal = new Date();
    const tanggal_transaksi = tanggal.getFullYear() + '-' +
      ('0' + (tanggal.getMonth() + 1)).slice(-2) + '-' +
      ('0' + tanggal.getDate()).slice(-2);

    const code_transaksi = "KTR-" + Date.now();

    const customerId = req.body.customerId;
    const items = req.body.items;

    for (const item of items) {
      const dataItem = await Item.findOne({
        where:
          { itemId: item.itemId }
      });
      if (item.qty > dataItem.stok) {
        return res.status(400).json({
          message: `Item ${it.nama_item} is out of stock!`,
        });
      }
      const harga = dataItem.harga_satuan * item.qty;
      total_harga += harga;

      await Item.update({ stok: dataItem.stok - item.qty }, {
        where:
          { itemId: item.itemId }
      });
    }

    await Customer.findOne({
      where: { customerId }
    }).then(response => {
      if (response.type_diskon === "persentase") {
        total_diskon = total_harga * (response.diskon / 100);
      } else {
        total_diskon = response.diskon
      }
    });

    const total_bayar = total_harga - total_diskon;

    const sales = await Sales.create({
      code_transaksi: code_transaksi,
      tanggal_transaksi: tanggal_transaksi,
      customerId: customerId,
      total_diskon: total_diskon,
      total_harga: total_harga,
      total_bayar: total_bayar
    })

    items.forEach(async item => {
      await SalesItem.create({
        itemId: item.itemId,
        qty: item.qty,
        salesId: sales.salesId
      })
    });

    const data = await Sales.findOne({
      where: {
        salesId: sales.salesId
      },
      include: {
        model: SalesItem,
        attributes: ['itemId', 'qty'],
        include: {
          model: Item,
          attributes: ['nama_item', 'barang']
        }
      }
    })

    return res.status(200).json({
      message: 'Sales has been created!',
      data
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: 'Failed to create Sales',
    });
  }

}

const getSales = async (req, res) => {
  try {
    const sales = await Sales.findAll({
      include: [{
        model: SalesItem,
        attributes: ['itemId', 'qty'],
        include: {
          model: Item,
          attributes: ['nama_item', 'barang']
        }
      }, {
        model: Customer
      }]
    })
    // console.log(data)
    return res.status(200).json({

      data: sales
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: 'Failed to retrive Sales',
    });
  }
}

const getSalesById = async (req, res) => {
  try {
    const sales = await Sales.findOne({
      where: {
        salesId: req.params.salesId
      },
      include: [{
        model: SalesItem,
        attributes: ['itemId', 'qty'],
        include: {
          model: Item
        }
      }, {
        model: Customer
      }]
    })

    return res.status(200).json({
      data: sales
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: 'Failed to retrive item',
    });
  }
}

const deleteSales = async (req, res) => {
  const sales = await Sales.findOne({
    where: {
      salesId: req.params.salesId
    }
  });

  if (!sales) return res.status(404).json({ message: "No data found" });

  try {
    await Sales.destroy({
      where: {
        salesId: req.params.salesId
      }
    });

    return res.status(200).json({
      message: 'Sales has been deleted'
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: 'Failed to delete sales',
    });
  }
}

module.exports = { saveSales, getSales, deleteSales, getSalesById }