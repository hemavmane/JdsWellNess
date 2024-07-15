const ProductModal = require("../Modal/Product");

exports.GetDataWithClients = async (req, res) => { };

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}



exports.AddProduct = async (req, res) => {
  const {
    productName,
    subtitle,
    offerPrice,
    realPrice,
    packsize,
    unit,
    discription,
    category, Reviews
  } = req.body;

  const files = req.files;
  const fileNames = files.map((file) => file.filename);

  try {
    const newProduct = new ProductModal({
      productName,
      subtitle,
      offerPrice,
      realPrice,
      packsize,
      unit,
      discription,
      category, Reviews,
      productimage: fileNames,
    });

    const savedProduct = await newProduct.save();
    if (savedProduct) {
      return res
        .status(200)
        .json({ message: "Product Added Successfully", savedProduct });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.getdata = async (req, res) => {
  try {


    const { page = 1, limit = 16 } = req.query;

    try {
      const products = await ProductModal.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const total = await ProductModal.countDocuments();

      res.json({
        data: products,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const ProductData = await ProductModal.find({});
    return res.status(200).json({ data: ProductData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getSearchedProduct = async (req, res) => {
  try {
    const { searchValue } = req.query;

    const query = searchValue
      ? { Workshopname: { $regex: new RegExp(escapeRegex(searchValue), "i") } }
      : {};

    const CategoryIdData = await ProductModal.find(query);

    return res.status(200).json({ data: CategoryIdData || [] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
exports.getByid = async (req, res) => {
  let id = req.params.id;
  try {
    const ProductData = await ProductModal.findOne({ _id: id });

    if (ProductData) {
      return res.status(200).json(ProductData);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.getByUserid = async (req, res) => {
  try {
    const clientId = req.params.id;
    const products = await ProductModal.find({ clientId });

    return res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};

exports.update = async (req, res) => {
  let { productName, Reviews, offerPrice, realPrice, subtitle, packsize, unit, discription, category } =
    req.body;
  const files = req.files;
  const fileNames = files.map(file => file.filename);

  try {
    let idd = req.params.id;
    const findProduct = await ProductModal.findOne({ _id: idd });
    if (!findProduct) {
      return res.json({ error: "No such record found" });
    }
    findProduct.Reviews = Reviews || findProduct.Reviews;
    findProduct.productName = productName || findProduct.productName;
    findProduct.subtitle = subtitle || findProduct.subtitle;
    findProduct.offerPrice = offerPrice || findProduct.offerPrice;
    findProduct.category = category || findProduct.category;
    findProduct.realPrice = realPrice || findProduct.realPrice;
    findProduct.packsize = packsize || findProduct.packsize;
    findProduct.unit = unit || findProduct.unit;
    findProduct.discription = discription || findProduct.discription;
    findProduct.productimage =
      fileNames.length > 0 ? fileNames : findProduct.productimage;

    const updateProduct = await ProductModal.findOneAndUpdate(
      { _id: idd },
      findProduct,
      { new: true }
    );

    return res.status(200).json({
      message: "Updated successfully",
      data: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update the Product" });
  }
};

exports.trash = async (req, res) => {
  let id = req.params.id;
  try {
    const ProductData = await ProductModal.findOneAndDelete({
      _id: id,
    });

    if (ProductData) {
      return res.status(200).json({ data: ProductData });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
