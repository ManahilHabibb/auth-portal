const handleMessage = (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'A valid message is required' });
  }

  // Basic echo-style response. Replace with custom business logic when available.
  const reply = `You said: ${message}`;

  res.status(200).json({ message: 'Message processed successfully', reply });
};

module.exports = { handleMessage };
