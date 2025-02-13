const data = [
  {
    id: 1,
    name: "product 1",
    price: 100,
  },
  {
    id: 2,
    name: "product 2",
    price: 200,
  },
  {
    id: 3,
    name: "product 3",
    price: 300,
  },
];

export const getAllProducts = (req, res) => {
  try {
    const product = res.json(data);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = data.find((item) => item.id === +id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const removeProduct = (req, res) => {
  try {
    const { id } = req.params;
    const product = data.find((item) => item.id === +id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    const newData = data.filter((item) => item.id !== +id);
    return res
      .status(200)
      .json({ message: "Xóa sản phẩm thành công", newData });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const product = data.find((item) => item.id === +id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    data.map((item) => (item.id === +id ? { id: +id, ...body } : item));
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      product: { id: +id, ...body },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createProduct = (req, res) => {
  try {
    const { id, name, price } = req.body;
    if (!id || !name || !price) {
      return res.status(400).json({ message: "Thiếu thông tin sản phẩm" });
    }
    const existProduct = data.find((item) => item.id === id);
    if (existProduct)
      return res.status(400).json({ message: "Sản phẩm đã tồn tại" });
    const newProduct = { id, name, price };
    data.push(newProduct);
    return res
      .status(201)
      .json({ message: "Thêm sản phẩm thành công", newProduct });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
