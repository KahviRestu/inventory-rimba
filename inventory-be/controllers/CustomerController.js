const { Customer } = require('../models')
const path =  require("path");

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findAll();

    return res.status(200).json({
      data: customer
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: 'Failed to retrive customer',
    })
  }
}

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: {
        customerId: req.params.customerId
      }
    });

    return res.status(200).json({
      data: customer
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: 'Failed to retrive customer',
    });
  }
}

const saveCustomer = async (req, res) => {
  if (req.files === null) return res.status(400).json({ message: "No file uploaded" });

  const nama = req.body.nama;
  const contact = req.body.contact;
  const email = req.body.email;
  const alamat = req.body.alamat;
  const diskon = req.body.diskon;
  const type_diskon = req.body.type_diskon;

  const file = req.files.ktp;
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
      await Customer.create({
        nama: nama,
        contact: contact,
        email: email,
        alamat: alamat,
        diskon: diskon,
        type_diskon: type_diskon,
        ktp: url,
      });
      res.status(201).json({ message: "Customer created successfuly" });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({
        message: 'Failed to create customer',
      });
    }
  })
}

const updateCustomer = async (req, res) => {
  const customer = await Customer.findOne({
    where: {
      customerId: req.params.customerId
    }
  });

  if (!customer) return res.status(404).json({ message: "No data found" });

  let ktp = ''
  if (req.files === null) {
    ktp = customer.ktp;
  } else {
    const file = req.files.ktp;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    ktp = url;

    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ message: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });
  }

  const nama = req.body.nama;
  const contact = req.body.contact;
  const email = req.body.email;
  const alamat = req.body.alamat;
  const diskon = req.body.diskon;
  const type_diskon = req.body.type_diskon;

  try {
    await Customer.update({
      nama: nama,
      contact: contact,
      email: email,
      alamat: alamat,
      diskon: diskon,
      type_diskon: type_diskon,
      ktp: ktp,
    }, {
      where: {
        customerId: req.params.customerId
      }
    });

    return res.status(200).json({
      message: 'Customer has been updated!'
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Failed to update customer',
    });
  }


}

const deleteCustomer = async (req, res) => {
  const customer = await Customer.findOne({
    where: {
      customerId: req.params.customerId
    }
  });

  if (!customer) return res.status(404).json({ message: "No data found" });

  try {
    await Customer.destroy({
      where: {
        customerId: req.params.customerId
      }
    });

    return res.status(200).json({
      message: 'Item deleted successfuly'
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Failed to delete customer',
    });
  }
}

module.exports = { getCustomer, getCustomerById, saveCustomer, updateCustomer, deleteCustomer }