'use strict';

//all the teams.. using constants
var FRA = "France";
var ROM = "Romania";
var ALB = "Albania";
var SWI = "Switzerland";

var ENG = "England";
var RUS = "Russia";
var WAL = "Wales";
var SLO = "Slovakia";

var GER = "Germany";
var UKR = "Ukraine";
var POL = "Poland";
var NIR = "Northern Ireland";

var SPA = "Spain";
var CZR = "Czech Republic";
var TUR = "Turkey";
var CRO = "Croatia";

var BEL = "Belgium";
var ITA = "Italy";
var EIR = "Republic of Ireland";
var SWE = "Sweden";

var POR = "Portugal";
var ICE = "Iceland";
var AUS = "Austria";
var HUN = "Hungary";

//static informations! Enough for phase 1.
var groups = [ 
	["A",[FRA,ROM,ALB,SWI]],
	["B",[ENG,RUS,WAL,SLO]],
	["C",[GER,UKR,POL,NIR]],
	["D",[SPA,CZR,TUR,CRO]],
	["E",[BEL,ITA,EIR,SWE]],
	["F",[POR,ICE,AUS,HUN]] 
];	

//next release...var matches = [ ["France","Romania","10 Jun"]]; //time missing...

function EuroUtils() {}

//return all the groups of the cup.
EuroUtils.prototype.allGroups = function() {
	var ggroups = [];
	for(var i=0;i<groups.length;i++)
		ggroups.push(groups[i][0]);
	if( ggroups.length === 0 ) 
		return false;
	return ggroups;
}

//returns a formatted output for the list of items passed.. for example groups or teams
EuroUtils.prototype.formattedOutput = function(listOfItems) {
	var result = "";
	if(listOfItems.length===undefined)
		return "I don't know, sorry.";
	for(var i=0;i<listOfItems.length;i++) {
		result += listOfItems[i] + ",";
	}
	if(result.length===0)
		return "I don't know, sorry.";
	return result;
}

//return the group for the team passed... in string, or false.
EuroUtils.prototype.groupForTeam = function(theTeam) {
	for (var i=0;i<groups.length;i++) { // for each group
		if( groups[i][1].indexOf(theTeam) !== -1 ){ //check if the group contains the team
			return groups[i][0];
		}
	}
	return false;
};

//return the teams found for the group passed.. as an array of string, or false.
EuroUtils.prototype.teamsForGroup = function(groupLetter) {
	var theTeams = false;
	for ( var i=0;i<groups.length;i++ ) { // for each group
		if ( groups[i][0] === groupLetter ) //check if the group contains the team
			theTeams = groups[i][1];
	}
	return theTeams;
};

//return the adversary of team theTeam, or false if the theTeam is not found.
//SHOULD CHANGE AFTER 10 June.
EuroUtils.prototype.adversariesForTeam = function(theTeam) {
	var groupLetter = this.groupForTeam(theTeam);
	if( groupLetter !== false ) {
		var allTeamsInGroup = this.teamsForGroup(groupLetter);
		if(allTeamsInGroup !==false) {
			var tteams = [];
			for( var i=0;i<allTeamsInGroup.length;i++) {
				if( allTeamsInGroup[i] !== theTeam ) 
					tteams.push(allTeamsInGroup[i]);
			}
			return tteams;
		}
	}
	return false;
};

//return all the teams of the cup
EuroUtils.prototype.teamsForCup = function() {
	var theTeams = new Array();
	for ( var i=0;i<groups.length;i++ ) { // for each group
		for ( var j=0;j<groups[i][1].length;j++) {
			theTeams.push(groups[i][1][j]);
		}
	}
	if ( theTeams.length === 0 )
		return false;
	return theTeams.sort();
};


module.exports = EuroUtils;
