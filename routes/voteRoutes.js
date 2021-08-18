const express = require("express");
const router = express.Router();

const dataModel = require('../models/data')

router.route('/').get((req, res) => {
  res.render('home')
})

router.route('/vote').get((req, res) => {
  var candidates = dataModel.getCandidates()
  res.render('vote', { candidates: candidates.candidatesNames, message: '' })
})

router.route('/vote').post((req, res, next) => {
  try {
    const voter_id = req.body.voter_id
    const candidate_id = req.body.candidate_id
    var candidates = dataModel.getCandidates()

    if (dataModel.findVoter(voter_id)) {
      res.render('vote', { candidates: candidates.candidatesNames, message: 'Already Voted!' })
      return false
    }

    if (dataModel.findCandidate(candidate_id)) {
      dataModel.addVote(voter_id, candidate_id)
    } else {
      throw new Error('Invalid Candidate')
    }

    res.render('vote', { candidates: candidates.candidatesNames, message: 'Successfully Voted!' })
  } catch (e) {
    console.log(e)
    res.render('vote', { candidates: candidates.candidatesNames, message: 'Something went wrong..' })

  }
})

router.route('/results').get((req, res, next) => {
  const data = dataModel.findTopTwo()
  res.render('results', { winner: data[0], runnerup: data[1] })
})

module.exports = router