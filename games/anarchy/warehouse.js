// Generated by Creer at 03:39AM on October 10, 2015 UTC, git hash: '98604e3773d1933864742cb78acbf6ea0b4ecd7b'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var Building = require("./building");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between cree runs
//<<-- /Creer-Merge: requires -->>

// @class Warehouse: A typical abandoned warehouse... that anarchists hang out in and can be bribed to burn down Buildings.
var Warehouse = Class(Building, {
    /**
     * Initializes Warehouses.
     *
     * @param {Object} a simple mapping passsed in to the constructor with whatever you sent with it.
     */
    init: function(data) {
        Building.init.apply(this, arguments);

        /**
         * How exposed the anarchists in this warehouse are to PoliceStations. Raises when bribed to ignite buildings, and drops each turn if not bribed.
         *
         * @type {number}
         */
        this._addProperty("exposure", serializer.defaultInteger(data.exposure));

        /**
         * The amount of fire added to buildings when bribed to ignite a building. Headquarters add more fire than normal Warehouses.
         *
         * @type {number}
         */
        this._addProperty("fireAdded", serializer.defaultInteger(data.fireAdded));


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // put any initialization logic here. the base variables should be set from 'data' above
        // NOTE: no players are connected (nor created) at this point. For that logic use 'begin()'

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Warehouse",


    /**
     * Bribes the Warehouse to light a Building on fire. This adds this building's fireAdded to their fire, and then this building's exposure is increased based on the Manhatten distance between the two buildings.
     *
     * @param {Player} player - the player that called this.
     * @param {Building} building - The Building you want to light on fire.
     * @param {function} asyncReturn - if you nest orders in this function you must return that value via this function in the order's callback.
     * @returns {number} The exposure added to this Building's exposure. -1 is returned if there was an error.
     */
    ignite: function(player, building, asyncReturn) {
        // <<-- Creer-Merge: ignite -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: Put your game logic for the Warehouse's ignite function here
        return 0;

        // <<-- /Creer-Merge: ignite -->>
    },

    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    // You can add additional functions here. These functions will not be directly callable by client AIs

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Warehouse;
