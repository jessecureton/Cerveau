// Generated by Creer at 12:34AM on March 01, 2016 UTC, git hash: 'f67dd2eb994fc0ce12bba97b92a5c185ebfa7a5d'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var GameObject = require("./gameObject");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between Creer re-runs

//<<-- /Creer-Merge: requires -->>

// @class Move: Contains all details about a Piece's move in the game.
var Move = Class(GameObject, {
    /**
     * Initializes Moves.
     *
     * @param {Object} data - a simple mapping passsed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        GameObject.init.apply(this, arguments);

        /**
         * The Piece captured by this Move, null if no capture.
         *
         * @type {Piece}
         */
        this._addProperty("captured", serializer.defaultGameObject(data.captured));

        /**
         * The file the Piece moved from.
         *
         * @type {string}
         */
        this._addProperty("fromFile", serializer.defaultString(data.fromFile));

        /**
         * The rank the Piece moved from.
         *
         * @type {number}
         */
        this._addProperty("fromRank", serializer.defaultInteger(data.fromRank));

        /**
         * The Piece that was moved.
         *
         * @type {Piece}
         */
        this._addProperty("piece", serializer.defaultGameObject(data.piece));

        /**
         * The Piece type this Move's Piece was promoted to from a Pawn, empty string if no promotion occured.
         *
         * @type {string}
         */
        this._addProperty("promotion", serializer.defaultString(data.promotion));

        /**
         * The standard algebraic notation (SAN) representation of the move.
         *
         * @type {string}
         */
        this._addProperty("san", serializer.defaultString(data.san));

        /**
         * The file the Piece moved to.
         *
         * @type {string}
         */
        this._addProperty("toFile", serializer.defaultString(data.toFile));

        /**
         * The rank the Piece moved to.
         *
         * @type {number}
         */
        this._addProperty("toRank", serializer.defaultInteger(data.toRank));


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // put any initialization logic here. the base variables should be set from 'data' above
        // NOTE: no players are connected (nor created) at this point. For that logic use 'begin()'

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Move",


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    // You can add additional functions here. These functions will not be directly callable by client AIs

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Move;
