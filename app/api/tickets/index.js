const { Router } = require('express');
const { Ticket, Student } = require('../../models');
// const logger = require('../../utils/logger');

const router = new Router();

const attachStudent = function (ticket) {
  const ticketCopy = ticket.valueOf();
  ticketCopy.student = Student.getById(ticket.studentID);
  return ticketCopy;
};

const getTickets = function () {
  let i;
  const res = [];
  for (i = 0; i < Ticket.get().length; i += 1) {
    res.push(attachStudent(Ticket.get()[i]));
  }
  return res;
};

const getTicketById = function (id) {
  let idstr;
  if (typeof id === 'string') idstr = parseInt(id, 10);
  return getTickets().find(i => i.id === idstr);
};

const getTicketsByStudentId = function (studId) {
  return getTickets().filter(ticket => ticket.studentID === +studId);
};

router.get('/', (req, res) => res.status(200).json(getTickets()));
router.get('/ticketsByStudId/:studentId', (req, res) => res.status(200).json(getTicketsByStudentId(req.params.studentId)));
router.get('/:ticketId', (req, res) => res.status(200).json(attachStudent(getTicketById(req.params.ticketId))));

router.delete('/:ticketId', (req, res) => res.status(200).json(Ticket.delete(req.params.ticketId)));

router.put('/:ticketId', (req, res) => res.status(200).json(attachStudent(Ticket.update(req.params.ticketId, req.body))));

router.post('/', (req, res) => {
  try {
    const ticket = Ticket.create(req.body);
    res.status(201).json(attachStudent(ticket));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
