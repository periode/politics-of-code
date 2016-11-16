var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};


function setStatusVote(message) {
  var status = document.getElementById("status_vote");
  status.innerHTML = message;
};

function assignVote(){
  var ballot = Ballot.deployed({from: account}, 3);

  var voter = document.getElementById("voter").value;

  ballot.giveRightToVote(voter, {from: account}).then(function(){
    setStatusVote("Voting right assigned!");
  }).catch(function(e){
    console.log(e);
    setStatusVote("Error assigning vote; see log.");
  });
}


function fetchProposals(){
  var ballot = Ballot.deployed();

  ballot.getProposals.call({from: account}).then(function(proposals){
    console.log(proposals);
  }).catch(function(e){
    console.log(e);
    setStatusVote("Error finding proposals; see log.");
  });
}

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}
