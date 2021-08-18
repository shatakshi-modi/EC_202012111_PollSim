const express = require("express");
const router = express.Router();

const dataModel = require('../models/data')

router.route('/').post((req, res) => {
  try {
    const candidate_id = req.body.candidate_id
    const candidate_name = req.body.candidate_name

    const checkIfExists = dataModel.findCandidate(candidate_id)
    if (checkIfExists) {
      res.render('addCandidate', { message: 'Candidate with that ID already exists' })
    } else {
      const newCandidate = dataModel.addCandidate(candidate_id, candidate_name)
      res.render('addCandidate', { message: 'Successfully Added' })
    }
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}).get((req, res) => {
  res.render('addCandidate', { message: '' })
})

router.route('/votes-data').get((req, res) => {
  res.render('summary', { candidates: dataModel.getCandidatesWVotes().candidates_list })
})

module.exports = router