const voteSubmitHandler = async () => {
  var voterId = document.getElementById('voterId').value

  var radio = Array.from(document.querySelectorAll('#candidates-list input'))
  var value = radio.length && radio.find(r => r.checked).value

  var res = await fetch('/vote', {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      voter_id: voterId,
      candidate_id: value
    })
  })
}