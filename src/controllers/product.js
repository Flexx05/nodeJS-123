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
    const product = res.json(data); //Logic lấy tất cả sản phẩm từ data fake
    return res.status(200).json(product); //Trả về trạng thái OK
  } catch (error) {
    return res.status(400).json({ error: error.message }); // Trả về lỗi
  }
};

export const getProductById = (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ trên URL được gửi lên từ phía client
    const product = data.find((item) => item.id === +id); // Logic tìm sản phẩm có id trùng với id trên URL
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" }); // Nếu không tồn tại sản phẩm nào trùng id thì trả về lỗi
    return res.status(200).json(product); // Nếu có thì trả về sản phẩm có id trùng với id trên URL
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
    const newData = data.filter((item) => item.id !== +id); // Logic lọc các sản phẩm có id không trùng với id trên URL
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
    const { body } = req; // Lấy dữ liệu được gửi lên từ phía client
    const product = data.find((item) => item.id === +id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    data.map((item) => (item.id === +id ? { id: +id, ...body } : item)); // Cú pháp ... : spread operator => copy tất cả dữ liệu trong 1 mảng hoặc 1 object
    /*** Logic cập nhật sản phẩm:
     * Gán với mỗi sản phẩm vào item
     * Kiểm tra id của sản phẩm(item.id) có trùng với id từ trên URL không
     * Nếu trùng => Cập nhật sản phẩm với id: id từ trên URL và dữ liệu được gửi từ phía client(...body) => {id: +id, ...body}: sản phẩm sau khi cập nhật
     * Nếu không trùng thì trả về sản phẩm ban đầu(item)
     */
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
    const { id, name, price } = req.body; // Lấy đữ liệu được gửi lên từ phía client
    // Kiểm tra dữ liệu đầu vào
    if (!id || !name || !price) {
      return res.status(400).json({ message: "Thiếu thông tin sản phẩm" });
    }
    const existProduct = data.find((item) => item.id === id); // Logic tìm sản phẩm có id trùng với id được gửi lên từ phía client
    // Kiểm tra nếu id được gửi lên từ phía client trùng với id của sản phẩm trong data fake thì trả về lỗi
    if (existProduct)
      return res.status(400).json({ message: "Sản phẩm đã tồn tại" });
    const newProduct = { id, name, price }; // Lấy dữ liệu được gửi lên từ phía client gán cho newProduct
    data.push(newProduct); // Logic thêm sản phẩm với data fake
    return res
      .status(201)
      .json({ message: "Thêm sản phẩm thành công", newProduct });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
