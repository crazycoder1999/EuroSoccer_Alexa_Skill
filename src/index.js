
/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.abcd12345"; //to change with corrected one...

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var EuroUtils = require('./EuroUtils');
var euroUtils = new EuroUtils();
var skillName = 'Euro Soccer';

/**
 * EuroCup is a child of AlexaSkill.
 */
var EuroCup = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
EuroCup.prototype = Object.create(AlexaSkill.prototype);
EuroCup.prototype.constructor = EuroCup;

EuroCup.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log(skillName + " onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);// any initialization logic goes here
};

EuroCup.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log(skillName + " onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNoIntent(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
EuroCup.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log(skillName + " onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

EuroCup.prototype.intentHandlers = {
    "NoIntent": function (intent, session, response) {
        handleNoIntent(response);
    },

    "ListTeamsIntent": function (intent, session, response) {
        handleListTeams(response);
    },

    "ListGroupsIntent": function (intent, session, response) {
        handleListGroups(response);
    },

    "TeamsInAGroupIntent": function (intent, session, response) {
        handleTeamsInAGroup(response,intent.slots.Group.value);
    },

    "GroupForTeamIntent": function (intent, session, response) {
        handleGroupForTeam(response,intent.slots.Team.value);
    },

    "AdversaryOfTeamIntent": function (intent, session, response) {
        handleAdversaryOfTeam(response,intent.slots.Team.value);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask " +skillName + " give me the list of teams, or you can ask " + skillName + " give me the adversary for your team or which is the group for your team or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Ok!";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "May the best team win";
        response.tell(speechOutput);
    }
};

function handleNoIntent(response) {
	response.ask("Welcome to " + skillName + ". You can ask: give me the list of teams, or you can ask give me the adversary for your team or which is the group for your team or, you can say exit... What can I help you with?", "What can I help you with?");
}

/**
 * Return the list of the teams in the EuroCup 
 */
function handleListTeams(response) {
 
    var teams = euroUtils.teamsForCup();
    // Create speech output
    var speechOutput = "This is the list of the 24 teams qualified for Euro 2016: " + euroUtils.formattedOutput(teams);
    speechOutput += " done.";
    response.tellWithCard(speechOutput, skillName, speechOutput);
}

/**
 * Return the list of the teams in the EuroCup 
 */
function handleListGroups(response) {
 
    var teams = euroUtils.allGroups();
    // Create speech output
    var speechOutput = "These are the groups for Euro 2016: " + euroUtils.formattedOutput(teams);
    speechOutput += " done.";
    response.tellWithCard(speechOutput, skillName , speechOutput);
}

//send the list of adversaries of a "teamInput"
function handleAdversaryOfTeam(response, teamInput) {
	//read the inputs..

	var tteams = euroUtils.formattedOutput(euroUtils.adversariesForTeam(teamInput));
	
	if(teamInput===undefined) {
		var speechOutput = "Please repeat..";
		response.tellWithCard(speechOutput, skillName, speechOutput);
	} else if ( tteams !== false) {
		// Create speech output
		var speechOutput = "The adversaries of " + teamInput + ", are: " + tteams + " done." ; 
		response.tellWithCard(speechOutput, skillName, speechOutput);
	} else {
		var speechOutput = "The adversaries of " + letterInput + " are not available" ; 
		response.tellWithCard(speechOutput, skillName, speechOutput);
	}
}

//the teams in the group of "letterInput"
function handleTeamsInAGroup(response,letterInput) {
	//read the inputs..
	var tteams = euroUtils.formattedOutput(euroUtils.teamsForGroup(letterInput));
	
	if(letterInput===undefined) {
		var speechOutput = "Invalid group.. Try with another one.";
		response.tellWithCard(speechOutput, skillName, speechOutput);
	} else if ( tteams !== false) {
		// Create speech output
		var speechOutput = "In the group " + letterInput + ", there are: " + tteams + " done." ; 
		response.tellWithCard(speechOutput, skillName, speechOutput);
	} else {
		var speechOutput = "The information for group " + letterInput + " is not available" ; 
		response.tellWithCard(speechOutput, skillName, speechOutput);
	}
}

/**
 * Return the group for the team
 */
function handleGroupForTeam(response,teamInput) {
	//read the inputs..

	var letter = euroUtils.groupForTeam(teamInput);
	if ( teamInput === undefined) {
		var speechOutput = "The team is not available... try again with another one.";
		response.tellWithCard(speechOutput, skillName, speechOutput);
	} else if ( letter !== false) {
		// Create speech output
		var speechOutput = "The team " + teamInput + ", is in group: " + letter ; 
		response.tellWithCard(speechOutput, skillName, speechOutput);
	} else {
		var speechOutput = "The information for " + teamInput + " is not available" ; 
		response.tellWithCard(speechOutput, skillName, speechOutput);
	}
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the EuroCup skill.
    var tBot = new EuroCup();
    tBot.execute(event, context);
};

