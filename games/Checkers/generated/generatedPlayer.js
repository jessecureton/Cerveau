// Generated by Creer, git hash fa0ddf38a9de12f1ec780817a1333033da78ca83
// Note: this file should never be modified, instead if you want to add game logic modify just the ../Player.js file. This is to ease merging main.data changes
var Class = require("../../../utilities/class");
var GameObject = require("../gameObject")


// @class GeneratedPlayer: The generated version of the Player, that handles basic logic.
var GeneratedPlayer = Class(GameObject, {
	init: function(data) {
		GameObject.init.apply(this, arguments);

		this.gameObjectName = "Player";

		this.lost = (data.lost === undefined ? false : data.lost);
		this.winReason = String(data.winReason === undefined ? "" : data.winReason);
		this.name = String(data.name === undefined ? "Anonymous" : data.name);
		this.checkers = (data.checkers === undefined ? [] : data.checkers);
		this.yDirection = parseInt(data.yDirection === undefined ? 0 : data.yDirection);
		this.loseReason = String(data.loseReason === undefined ? "" : data.loseReason);
		this.clientType = String(data.clientType === undefined ? "" : data.clientType);
		this.timeRemaining = parseInt(data.timeRemaining === undefined ? 0 : data.timeRemaining);
		this.won = (data.won === undefined ? false : data.won);

		this._serializableKeys["lost"] = true;
		this._serializableKeys["winReason"] = true;
		this._serializableKeys["name"] = true;
		this._serializableKeys["checkers"] = true;
		this._serializableKeys["yDirection"] = true;
		this._serializableKeys["loseReason"] = true;
		this._serializableKeys["clientType"] = true;
		this._serializableKeys["timeRemaining"] = true;
		this._serializableKeys["won"] = true;
	},

	command_endTurn: function(player, data) {
		return this.endTurn(player);
	},
});

module.exports = GeneratedPlayer;
