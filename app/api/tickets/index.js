const { Router } = require('express');
const { Ticket, Student } = require('../../models');
// const { logger } = require('../../utils/logger');

const router = new Router();

const attachStudent = function (ticket) {
  /* const studId = ticket.studentID;
  const stud = Student.getById(studId);
  Ticket.update('student', stud); */
  const ticketCopy = ticket;
  ticketCopy.student = Student.getById(ticket.studentID);
  return ticketCopy;
};

const getTickets = function () {
  let i;
  // logger.info('Salut Ghetto JMD');
  const res = [];
  for (i = 0; i < Ticket.items.length; i += 1) {
    res.push(attachStudent(Ticket.items[i]));
  }
  return res;
};

const getTicketById = function (id) {
  let idstr;
  if (typeof id === 'string') idstr = parseInt(id, 10);
  const ticket = getTickets()
    .find(i => i.id === idstr);
  return ticket;
};

router.get('/', (req, res) => res.status(200).json(Ticket.get()));
// router.get('/', (req, res) => res.status(200).json(getTickets()));
router.get('/statusJmd', (req, res) => res.status(200).json('ok JMD.'));
router.get('/attachJmd', (req, res) => res.status(200).json(getTickets()));

router.get('/:ticketId', (req, res) => {
  res.status(200).json(getTicketById(req.params.ticketId));
});
router.delete('/:ticketId', (req, res) => res.status(200).json(Ticket.delete(req.params.ticketId)));
router.put('/:ticketId', (req, res) => res.status(200).json(attachStudent(Ticket.update(req.params.ticketId, req.body))));
router.post('/', (req, res) => {
  try {
    const ticket = Ticket.create(req.body);
    attachStudent(ticket);
    res.status(201).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = {
  attachStudent,
  getTickets,
  getTicketById,
};

module.exports = router;
