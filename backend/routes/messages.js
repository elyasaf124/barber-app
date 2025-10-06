const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.get('/', async (req, res) => {
  const { scope, barberId } = req.query;
  const q = {};
  if (scope) q.scope = scope;
  if (barberId) q.barberId = barberId;
  const messages = await Message.find(q).sort({ publishedAt: -1 }).lean();
  res.json(messages);
});

module.exports = router;
