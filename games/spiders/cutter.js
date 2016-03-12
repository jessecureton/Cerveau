// Generated by Creer at 04:24PM on March 02, 2016 UTC, git hash: '0cc14891fb0c7c6bec65a23a8e2497e80f8827c1'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var Spiderling = require("./spiderling");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between Creer re-runs

//<<-- /Creer-Merge: requires -->>

// @class Cutter: A Spiderling that can cut existing Webs.
var Cutter = Class(Spiderling, {
    /**
     * Initializes Cutters.
     *
     * @param {Object} data - a simple mapping passsed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        Spiderling.init.apply(this, arguments);

        /**
         * The Web that this Cutter is trying to cut. Null if not cutting.
         *
         * @type {Nest}
         */
        this._addProperty("cuttingWeb", serializer.defaultGameObject(data.cuttingWeb));


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // put any initialization logic here. the base variables should be set from 'data' above
        // NOTE: no players are connected (nor created) at this point. For that logic use 'begin()'

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Cutter",


    /**
     * Cuts a web, destroying it, and any Spiderlings on it.
     *
     * @param {Player} player - the player that called this.
     * @param {Web} web - The web you want to Cut. Must be connected to the Nest this Cutter is currently on.
     * @param {function} asyncReturn - if you nest orders in this function you must return that value via this function in the order's callback.
     * @returns {boolean} True if the cut was successfully started, false otherwise.
     */
    cut: function(player, web, asyncReturn) {


        // <<-- Creer-Merge: cut -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        if(this.owner !== player){
            return this.game.logicError(false, "{player} does not own {this}.".format({
                player: player,
                this: this,
            }));
        }
        if(this.nest !== web.nestA && this.nest !== web.nestB){
            return this.game.logicError(false, "{this} can only cut webs connected to the nest it is on ({this.nest}).".format({
                this: this,
            }));
        }
        if(this.isDead){
            return this.game.logicError(false, "{player} cannot control dead {this}.".format({
                player: player,
                this: this,
            }));
        }
        web.snap();
        // Developer: Put your game logic for the Cutter's cut function here
        return true;
        // <<-- /Creer-Merge: cut -->>
    },

    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    // You can add additional functions here. These functions will not be directly callable by client AIs

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Cutter;
