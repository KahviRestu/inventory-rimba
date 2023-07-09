const { Item } = require('../models');
const path =  require("path");

const getItem = async (req, res) => {
  try {
    const item = await Item.findAll();

    return res.status(200).json({
      data: item
    })

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: 'Failed to retrive item',
    })
  }
}

const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({
      where: {
        itemId: req.params.itemId
      }
    });

    return res.status(200).json({
      data: item
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: 'Failed to retrive item',
    });
  }
}

const saveItem = async (req, res) => {
  
  if (req.files === null) return res.status(400).json({ message: "No file uploaded" });
  const nama_item = req.body.nama_item;
  const unit = req.body.unit;
  const stok = req.body.stok;
  const harga_satuan = req.body.harga_satuan;

  const file = req.files.barang;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Invalid images" });
  if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      await Item.create({
        nama_item: nama_item,
        unit: unit,
        stok: stok,
        harga_satuan: harga_satuan,
        barang: url,
      });
      res.status(201).json({ message: "Item Created Successfuly" });
    } catch (error) {
      console.log(req);
      console.log(error.message);
      return res.status(400).json({
        message: 'Failed to create item',
      });
    }
  })
}

const updateItem = async (req, res) => {
  const item = await Item.findOne({
    where: {
      itemId: req.params.itemId
    }
  });

  if (!item) return res.status(404).json({ message: "No Data Found" });

  let barang = ''
  if (req.files === null) {
    barang = item.barang;
  } else {
    const file = req.files.barang;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    barang = url;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });
  }

  const nama_item = req.body.nama_item;
  const unit = req.body.unit;
  const stok = req.body.stok;
  const harga_satuan = req.body.harga_satuan;

  try {
    await Item.update({
      nama_item: nama_item,
      unit: unit,
      stok: stok,
      harga_satuan: harga_satuan,
      barang: barang,
    }, {
      where: {
        itemId: req.params.itemId
      }
    });
    return res.status(200).json({
      message: 'Item has been updated!'
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Failed to update item',
    });
  }

}

const deleteItem = async (req, res) => {
  const item = await Item.findOne({
    where: {
      itemId: req.params.itemId
    }
  });

  if (!item) return res.status(404).json({ message: "No data found" });

  try {
    await Item.destroy({
      where: {
        itemId: req.params.itemId
      }
    });

    return res.status(200).json({
      message: 'Item deleted successfuly'
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Failed to delete item',
    });
  }
}

module.exports = { getItem, updateItem, saveItem, getItemById, deleteItem }