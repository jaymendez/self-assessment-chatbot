module.exports = (req, res) => {
  console.log(req.query);
  const hubChallenge = req.query["hub.challenge"];
  const hubMode = req.query["hub.mode"];
  const verifyTokenMatches = req.query["hub.verify_token"] === "jaytestbot";
  if (hubMode && verifyTokenMatches) {
    res.status(200).send(hubChallenge);
  } else {
    res.status(403).end();
  }
};
