// Generated by Creer at 05:17PM on April 08, 2016 UTC, git hash: 'e7ec4e35c89d7556b9e07d4331ac34052ac011bd'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var Spiderling = require("./spiderling");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between Creer re-runs

//<<-- /Creer-Merge: requires -->>

// @class Spitter: A Spiderling that creates and spits new Webs from the Nest it is on to another Nest, connecting them.
var Spitter = Class(Spiderling, {
    /**
     * Initializes Spitters.
     *
     * @param {Object} data - a simple mapping passsed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        Spiderling.init.apply(this, arguments);

        /**
         * The Nest that this Spitter is creating a Web to spit at, thus connecting them. Null if not spitting.
         *
         * @type {Nest}
         */
        this._addProperty("spittingWebToNest", serializer.defaultGameObject(data.spittingWebToNest));


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        this.spittingSpeed = 10;

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Spitter",


    /**
     * Creates and spits a new Web from the Nest the Spitter is on to another Nest, connecting them.
     *
     * @param {Player} player - the player that called this.
     * @param {Nest} nest - The Nest you want to spit a Web to, thus connecting that Nest and the one the Spitter is on.
     * @param {function} asyncReturn - if you nest orders in this function you must return that value via this function in the order's callback.
     * @returns {boolean} True if the spit was successful, false otherwise.
     */
    spit: function(player, nest, asyncReturn) {
        // <<-- Creer-Merge: spit -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        var error = Spiderling._validate.call(this, player, false);
        if(error) {
            return error;
        }

        if(!nest) {
            return this.game.logicError(false, "'{nest}' is not a Nest for {this} to spit at.".format({
                this: this,
                nest: nest,
            }));
        }

        for(var i = 0; i < nest.webs.length; i++) {
            var web = nest.webs[i];
            if(web.isConnectedTo(this.nest, nest)) {
                return this.game.logicError(false, "{this} cannot spit a new Web from {this.nest} to {nest} because {web} already exists.".format({
                    this: this,
                    nest: nest,
                    web: web,
                }));
            }
        }

        // if we got here, then everything should be ok for the spit to start

        this.busy = "Spitting";
        this.spittingWebToNest = nest;
        this.turnsRemaining = Math.ceil(this.nest.distanceTo(nest) / this.spittingSpeed);

        return true;

        // <<-- /Creer-Merge: spit -->>
    },

    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    /**
     * @override
     */
    kill: function() {
        Spiderling.kill.apply(this, arguments);

        this.spittingWebToNest = null;
    },

    /**
     * @override
     */
    finish: function() {
        if(Spiderling.finish.apply(this, arguments)) {
            return; // because they finished moving or something the base Spiderling class can handle
        }

        if(this.spittingWebToNest === null) { // then we got here because we got forced to finish early
            return;
        }

        // if we got here they finished spitting
        var newWeb = this.game.create("Web", {
            nestA: this.nest,
            nestB: this.spittingWebToNest,
        });

        this.game.webs.push(newWeb);

        // cancel spitters on the current nest to the destination
        var sideSpiders = newWeb.getSideSpiders();
        for(var i = 0; i < sideSpiders.length; i++) {
            var spider = sideSpiders[i];
            if(spider.spittingWebToNest === this.spittingWebToNest) {
                spider.spittingWebToNest = null; // so they know they are finishing early
                spider.finish();
            }
        }
    },

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Spitter;
