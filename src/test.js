var EuroUtils = require('./EuroUtils');

var euroUtils = new EuroUtils();
console.log("TEST 1: count teams");

var teams = euroUtils.teamsForCup();
if ( teams.length !== 24 ) {
	console.log("The number of teams is not 24!");
	return;
}

console.log("Listing teams...");
for(var i=0;i<teams.length;i++) {
	console.log("" + teams[i]);
}
console.log("***");

console.log("TEST 2: group for team Sweden");
var tempTeam = "Sweden";
var groupForTeam = euroUtils.groupForTeam(tempTeam);
if (groupForTeam !== 'E')
	console.log(""+tempTeam+ " found in wrong group: " + groupForTeam);

console.log("TEST 3: group for unexisting team");
tempTeam = "ABCDE";
var groupForTeam = euroUtils.groupForTeam(tempTeam);
if (groupForTeam !== false)
	console.log("Unexisting team ("+tempTeam+ ") found in a group... " + groupForTeam);

console.log("TEST 4: teams for group B");
var tempGroup = 'B';
var teamsForGroup = euroUtils.teamsForGroup(tempGroup);
var groupB = ["England","Russia","Wales","Slovakia"];

for(var i=0; i < groupB.length ; i++) {
	if(teamsForGroup.indexOf(groupB[i]) === -1) {
		console.log("Team " + groupB[i] + " not found on group B");
		for(var j=0;j<teamsForGroup.length;j++)
			console.log(teamsForGroup[j]);
		return;
	}
}

console.log("TEST 5: teams for unexisting group");

tempGroup = "ABCDE";
teamsForGroup = euroUtils.teamsForGroup(tempGroup);
if( teamsForGroup !== false) {
	console.log("Teams ("+teamsForGroup.length+") found for unexisting group");
	return;
}

console.log("TEST 6: adversary for team Sweden");
tempTeam = "Sweden";
adversaries = euroUtils.adversariesForTeam(tempTeam);
if( adversaries === false ) {
	console.log("Adversary for " + tempTeam + " not found..");
	return;
}
if(adversaries.length !== 3 ) {
	console.log("Adversary for " + tempTeam + " not 3!");
	for(var i=0;i<adversaries.length;i++)
		console.log(adversaries[i]);
	return;
}

if( adversaries.indexOf("Belgium") === -1 && 
	adversaries.indexOf("Italy") === -1 && 
	adversaries.indexOf("Republic of Ireland") === -1 ) {
	console.log("One of the adversary of Sweden is missing!");
	return;
}

console.log("TEST 7: adversary for unexisting team");
tempTeam = "ABCDE";
adversaries = euroUtils.adversariesForTeam(tempTeam);
if( adversaries !== false ) {
	console.log("Found adversaries for unexisting team!");
}

console.log("TEST 8: all groups letter");
var letters = euroUtils.allGroups();

if( letters.length !== 6 ) {
	console.log("Missing some letters..");
	for(var i=0;i<letters.length;i++) 
		console.log(letters[i]);
	return;
}

console.log("TEST 9: Formatted Output");
var lettersFormatted = euroUtils.formattedOutput(euroUtils.allGroups());
if ( "A,B,C,D,E,F," !== lettersFormatted ) {
	console.log("Wrong Output: [" + lettersFormatted + "]");
	return;
}
/**/

console.log("TEST 10: Formatted Output empty array");
if ( euroUtils.formattedOutput([]) !== "I don't know, sorry." ) {
	console.log("Error on empty input array");
	return;
}

console.log("TEST 11: Formatted output teams in a group(A)");
if ( euroUtils.formattedOutput(euroUtils.teamsForGroup('A')) === false ){
	console.log("Unable format the response correctly...");
	return;
}

console.log("TEST 12: Formatted output unexisting group");
var outUnexisting = euroUtils.formattedOutput(euroUtils.teamsForGroup('z'));
if ( outUnexisting === false ){
	console.log("Unable format the response correctly...");
	return;
}
console.log(outUnexisting);
console.log("ALL TESTS PASSED");

