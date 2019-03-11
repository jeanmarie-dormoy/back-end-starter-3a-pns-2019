const { Router } = require('express');
const { Student } = require('../../models');

const router = new Router();
const getStudentByName = function (name) {
  return Student.get().filter(
    student => student.firstName.includes(name) || student.lastName.includes(name),
  );
};
router.get('/', (req, res) => res.status(200).json(Student.get()));
router.get('/:studentId', (req, res) => {
  res.status(200).json(Student.getById(req.params.studentId));
});
router.delete('/:studentId', (req, res) => res.status(200).json(Student.delete(req.params.studentId)));
router.put('/:studentId', (req, res) => res.status(200).json(Student.update(req.params.studentId, req.body)));
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

router.get('/searchByName/:studentName', (req, res) => res.status(200).json(getStudentByName(req.params.studentName)));

module.exports = router;
