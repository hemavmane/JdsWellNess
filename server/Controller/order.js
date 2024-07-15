const Order = require('../Modal/Order');

// Create a new Order
exports.createOrder = async (req, res) => {
  try {
    const { OrderId, userId, ProductDetails, status } = req.body;
    const newOrder = new Order({ OrderId, userId, ProductDetails, status });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all active Orders
exports.getAllOrders = async (req, res) => {
  try {
    const Orders = await Order.find({ isActive: true });
    res.status(200).json(Orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Update a Order
exports.updateOrder = async (req, res) => {
  try {
    const { OrderId, userId, ProductDetails, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { OrderId, userId, ProductDetails, status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
