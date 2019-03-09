const { Router } = require('express');
const { Student } = require('../../models');

const router = new Router();
router.get('/', (req, res) => res.status(200).json(Student.get()));
router.get('/:ticketId', (req, res) => {
  res.status(200).json(Student.getById(req.params.ticketId));
});
router.delete('/:ticketId', (req, res) => res.status(200).json(Student.delete(req.params.ticketId)));
router.put('/:ticketId', (req, res) => res.status(200).json(Student.update(req.params.ticketId, req.body)));
router.post('/', (req, res) => {
  try {
    const ticket = Student.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
