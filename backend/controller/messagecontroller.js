const Message = require('../model/message');
const User = require('../model/user');

const getChatUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select('name email role department')
      .sort({ role: 1, name: 1 });

    res.json({ users });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load chat users',
      error: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: otherUserId },
        { sender: otherUserId, receiver: req.user._id },
      ],
    })
      .populate('sender', 'name email role')
      .populate('receiver', 'name email role')
      .sort({ createdAt: 1 });

    res.json({ messages });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load messages',
      error: error.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;

    if (!receiver || !message) {
      return res.status(400).json({
        message: 'Receiver and message are required',
      });
    }

    const receiverExists = await User.findById(receiver);

    if (!receiverExists) {
      return res.status(404).json({
        message: 'Receiver not found',
      });
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver,
      message,
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'name email role')
      .populate('receiver', 'name email role');

    res.status(201).json({
      message: 'Message sent successfully',
      chatMessage: populatedMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not send message',
      error: error.message,
    });
  }
};

module.exports = {
  getChatUsers,
  getMessages,
  sendMessage,
};