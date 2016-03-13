// Generated by Creer at 04:24PM on March 02, 2016 UTC, git hash: '0cc14891fb0c7c6bec65a23a8e2497e80f8827c1'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var TwoPlayerGame = require(__basedir + "/gameplay/shared/twoPlayerGame");
var TurnBasedGame = require(__basedir + "/gameplay/shared/turnBasedGame");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between Creer re-runs

//<<-- /Creer-Merge: requires -->>

// @class Game: There's an infestation of enemy spiders challenging your queen broodmother spider! Protect her and attack the other broodmother in this turn based, node based, game.
var Game = Class(TwoPlayerGame, TurnBasedGame, {
    /**
     * Initializes Games.
     *
     * @param {Object} data - a simple mapping passsed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        TurnBasedGame.init.apply(this, arguments);
        TwoPlayerGame.init.apply(this, arguments);

        /**
         * Every Nest in the game.
         *
         * @type {list.<Nest>}
         */
        this._addProperty("nests", serializer.defaultArray(data.nests));

        /**
         * Every Web in the game.
         *
         * @type {list.<Web>}
         */
        this._addProperty("webs", serializer.defaultArray(data.webs));


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        this.maxTurns = 300;

        // used for map generation
        this._mapSize = 5000;
        this._maxNests = 60; // per side, as are the folling
        this._minNests = 10;
        this._maxWebs = 30;
        this._minWebs = 0;

        //<<-- /Creer-Merge: init -->>
    },

    name: "Spiders",
    webserverID: "MegaMinerAI-##-Spiders",


    /**
     * This is called when the game begins, once players are connected and ready to play, and game objects have been initialized. Anything in init() may not have the appropriate game objects created yet..
     */
    begin: function() {
        TurnBasedGame.begin.apply(this, arguments);
        TwoPlayerGame.begin.apply(this, arguments);

        //<<-- Creer-Merge: begin -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // genreate Nests on the left
        var numNests = Math.randomInt(this._maxNests, this._minNests);
        for(var i = 0; i < numNests; i++) {
            this.nests.push(this.create("Nest", {
                x: Math.randomInt(this._mapSize/2),
                y: Math.randomInt(this._mapSize),
            }));
        }

        // geneate Webs on the left
        var numWebs = Math.randomInt(this._maxWebs, this._minWebs);
        for(var i = 0; i < numWebs; i++) {
            var nestA = this.nests.randomElement();
            var nestB = nestA;
            while(nestB !== nestA) {
                nestB = this.nests.randomElement();
            }

            this.webs.push(this.create("Web", {
                nestA: nestA,
                nestB: nestB,
            }));
        }

        // create the BroodMother
        this.players[0].broodMother = this.create("BroodMother", {
            nest: this.nests.randomElement(),
        });

        // now mirror it

        // mirror the Nests
        var mirroredNests = {};
        for(var i = 0; i < numNests; i++) {
            var mirroring = this.nests[i];
            var mirrored = this.create("Nest", {
                x: this._mapSize - mirroring.x,
                y: mirroring.y,
            });

            mirroredNests[mirroring.id] = mirrored;
            this.nests.push(mirrored);
        }

        // mirror the Webs
        for(var i = 0; i < numWebs; i++) {
            var mirroring = this.webs[i];

            this.webs.push(this.create("Web", {
                nestA: mirroredNests[mirroring.nestA.id],
                nestB: mirroredNests[mirroring.nestB.id],
            }));
        }

        // mirror the BroodMother
        this.players[1].broodMother = this.create("BroodMother", {
            nest: mirroredNests[this.players[0].broodMother.nest.id],
        });

        //<<-- /Creer-Merge: begin -->>
    },

    /**
     * This is called when the game has started, after all the begin()s. This is a good spot to send orders.
     */
    _started: function() {
        TurnBasedGame._started.apply(this, arguments);
        TwoPlayerGame._started.apply(this, arguments);

        //<<-- Creer-Merge: _started -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // any logic for _started can be put here
        //<<-- /Creer-Merge: _started -->>
    },


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    /**
     * @override
     */
    nextTurn: function() {
        var movers = [];
        for(var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            for(var j = 0; j < player.spiders.length; j++) {
                var spider = player.spiders[j];

                if(spider.turnsRemaining) {
                    spider.turnsRemaining -= 1;
                }

                if(spider.turnsRemaining === 0) { // then they are done
                    if(spider.busy === "Moving") {
                        movers.push(spider); // they will finish moving AFTER other actions (e.g. cut)
                    }
                    else {
                        spider.finish();
                    }
                }
            }
        }

        for(var i = 0; i < movers.length; i++) {
            movers[i].finish(); // now the spiderling moving can finish, because his Web may have been snapped above
        }

        if(this._checkPrimaryWin()) {
            return;
        }

        return TurnBasedGame.nextTurn.apply(this, arguments);
    },

    /**
     * Checks if the game is over because the primary win condition was reached (broodmother died), and delcares winners/losers as such
     *
     * @param {boolean} True if the game is over, false otherwise
     */
    _checkPrimaryWin: function() {
        var losers = [];
        var stillPlaying = [];
        for(var i = 0; i < this.players.length; i++) {
            var player = this.players[i];

            if(player.broodMother.isDead) {
                losers.push(player);
            }
            else {
                stillPlaying.push(player);
            }
        }

        if(losers.length > 0) { // someone lost
            if(losers.length === this.players.length) {
                this._secondaryWin("All BroodMothers died on same turn");
            }
            else {
                for(var i = 0; i < losers.length; i++) {
                    var loser = losers[i];
                    if(!loser.lost) { // then they JUST lost
                        loser.declareLoser(loser, "BroodMother died.");
                    }
                }

                if(stillPlaying.length === 1) { // they won!
                    this.declareWinner(stillPlaying[0], "Eliminated enemy BroodMother!");
                    return true;
                }
            }
        }

        return false;
    },

    /**
     * declares winners and losers based on win/loses
     *
     * @param {boolean} True if the game is over, false otherwise
     */
    _secondaryWin: function(secondaryReason) {
        var players = this.players.clone();
        players.sort(function(a, b) {
            return b.broodMother.health - a.broodMother.health;
        });

        // check if one player has more health in his broodmother than the rest
        if(players[0].broodMother.health !== players[1].broodMother.health) {
            var winner = players.shift();
            this.declareWinner(winner, "{} - BroodMother has the most remaining health ({}).".format(secondaryReason, winner.broodMother.health));
            this.declareLosers(players, "{} - BroodMother has less health remaining that winner.".format(secondaryReason));
            return;
        }

        // else check if one player has more spiders than the other
        players.sort(function(a, b) {
            return b.spiders.length - a.spiders.length;
        });

        if(players[0].spiders.length !== players[1].spiders.length) {
            var winner = players.shift();
            this.declareWinner(winner, "{} - Player has the most Spiders ({}).".format(secondaryReason, winner.spiders.length));
            this.declareLosers(players, "{} - Player has less Spiders alive than winner.".format(secondaryReason));
            return;
        }

        this._endGameViaCoinFlip();
    },

    /**
     * @override
     */
   _maxTurnsReached: function(){TurnBasedGame._maxTurnsReached.apply(this, arguments);
        var returned = TurnBasedGame._maxTurnsReached.apply(this, arguments);

        this._secondaryWinConditions("Max turns reached (" + this.maxTurns + ")");

        return returned;
   },

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Game;
