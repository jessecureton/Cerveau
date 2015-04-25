// Generated by Creer, git hash fa0ddf38a9de12f1ec780817a1333033da78ca83
// Note: this file should never be modified, instead if you want to add game logic modify just the ../Game.js file. This is to ease merging main.data changes
var Class = require("../../../utilities/class");
var TurnBasedGame = require("../../turnBasedGame")


// Custom Game Objects
var GameObject = require("../gameObject");
var Checker = require("../checker");
var Player = require("../player");

// @class GeneratedGame: The generated version of the Game, that handles basic logic.
var GeneratedGame = Class(TurnBasedGame, {
	init: function(data) {
		TurnBasedGame.init.apply(this, arguments);

		this.name = "Checkers";
		this.gameObjectName = "Game";

		this.boardWidth = parseInt(data.boardWidth === undefined ? 8 : data.boardWidth);
		this.checkerMoved = (data.checkerMoved === undefined ? null : data.checkerMoved);
		this.checkers = (data.checkers === undefined ? [] : data.checkers);
		this.boardHeight = parseInt(data.boardHeight === undefined ? 8 : data.boardHeight);
		this.checkerMovedJumped = (data.checkerMovedJumped === undefined ? false : data.checkerMovedJumped);

		this._serializableKeys["boardWidth"] = true;
		this._serializableKeys["checkerMoved"] = true;
		this._serializableKeys["checkers"] = true;
		this._serializableKeys["boardHeight"] = true;
		this._serializableKeys["checkerMovedJumped"] = true;
	},

	/// Creates a new instance of the GameObject game object that has reference to the creating game
	newGameObject: function(data) {
		data.game = this;
		return new GameObject(data);
	},

	/// Creates a new instance of the Checker game object that has reference to the creating game
	newChecker: function(data) {
		data.game = this;
		return new Checker(data);
	},

	/// Creates a new instance of the Player game object that has reference to the creating game
	newPlayer: function(data) {
		data.game = this;
		return new Player(data);
	},
});

module.exports = GeneratedGame;
