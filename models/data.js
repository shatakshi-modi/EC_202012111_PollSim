let candidates_list = { '202012111': { 'name': "Shatakshi Modi", votes: 9 }, '202012007': { 'name': "Pranay Joshi", votes: 3 }, '202012091': { 'name': "Bhagyashree Ranawat", votes: 4 } }
let voters_list = []

exports.findVoter = (voter) => {
  return voters_list.find(ele => ele === voter)
}

exports.addVote = (voter, id) => {
  candidates_list[id].votes += 1
  voters_list.push(voter)
}

exports.addCandidate = (id, name) => {
  candidates_list[id] = { name: name, votes: 0 }
  return candidates_list[id];
}

exports.findCandidate = (id) => {
  if (id in candidates_list) {
    return candidates_list[id]
  } else {
    return null
  }
}

exports.getCandidates = () => {
  var candidatesNames = []
  for (var key in candidates_list) {
    candidatesNames.push({ id: key, name: candidates_list[key].name })
  }
  return { candidatesNames }
}

exports.getCandidatesWVotes = () => {
  return { candidates_list }
}

exports.findTopTwo = () => {
  var winner = { id: undefined, name: undefined, votes: -1 }
  var runnerUp = { id: undefined, name: undefined, votes: -1 }

  for (var can in candidates_list) {
    if (winner.votes < candidates_list[can].votes) {
      if (can !== winner.id) {
        runnerUp.id = winner.id
        runnerUp.name = winner.name
        runnerUp.votes = winner.votes
      }
      winner.id = can
      winner.name = candidates_list[can].name
      winner.votes = candidates_list[can].votes

    }

    if (runnerUp.votes < candidates_list[can].votes && candidates_list[can].votes <= winner.votes && can !== winner.id) {
      runnerUp.id = candidates_list[can].id
      runnerUp.name = candidates_list[can].name
      runnerUp.votes = candidates_list[can].votes
    }
  }

  return [winner, runnerUp]
}