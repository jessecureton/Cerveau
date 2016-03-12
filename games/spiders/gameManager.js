// Generated by Creer at 04:24PM on March 02, 2016 UTC, git hash: '0cc14891fb0c7c6bec65a23a8e2497e80f8827c1'
// Note: You should never modify this file... probably.

var GameManager = require(__basedir + "/gameplay/shared/gameManager");
var serializer = require(__basedir + "/gameplay/serializer");

/**
 * An instance of the base GameManager class, given the structure of this Spiders game so it can manage the game safely.
 */
var spidersGameManager = new GameManager({
    Game: {
        name: "Spiders",
    },

    AI: {
        runTurn: {
            args: [
            ],
            returns: {
                converter: serializer.defaultBoolean,
                defaultValue: true,
            },
        },

        //<<-- Creer-Merge: secret-AI -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-AI -->>

    },

    BroodMother: {
        consume: {
            args: [
                {
                    name: "spiderling",
                    converter: serializer.defaultGameObject,
                },
            ],
            returns: {
                converter: serializer.defaultBoolean,
                defaultValue: false,
            },
        },
        spawn: {
            args: [
                {
                    name: "spiderlingType",
                    converter: serializer.defaultString,
                },
            ],
            returns: {
                converter: serializer.defaultGameObject,
                defaultValue: null,
            },
        },

        //<<-- Creer-Merge: secret-BroodMother -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-BroodMother -->>

    },

    Cutter: {
        cut: {
            args: [
                {
                    name: "web",
                    converter: serializer.defaultGameObject,
                },
            ],
            returns: {
                converter: serializer.defaultBoolean,
                defaultValue: false,
            },
        },

        //<<-- Creer-Merge: secret-Cutter -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-Cutter -->>

    },

    GameObject: {
        log: {
            args: [
                {
                    name: "message",
                    converter: serializer.defaultString,
                },
            ],
            returns: undefined,
        },

        //<<-- Creer-Merge: secret-GameObject -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-GameObject -->>

    },

    Nest: {

        //<<-- Creer-Merge: secret-Nest -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-Nest -->>

    },

    Player: {

        //<<-- Creer-Merge: secret-Player -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-Player -->>

    },

    Spider: {

        //<<-- Creer-Merge: secret-Spider -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-Spider -->>

    },

    Spiderling: {
        attack: {
            args: [
                {
                    name: "spiderling",
                    converter: serializer.defaultGameObject,
                },
            ],
            returns: {
                converter: serializer.defaultBoolean,
                defaultValue: false,
            },
        },
        move: {
            args: [
                {
                    name: "web",
                    converter: serializer.defaultGameObject,
                },
            ],
            returns: {
                converter: serializer.defaultBoolean,
                defaultValue: false,
            },
        },

        //<<-- Creer-Merge: secret-Spiderling -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-Spiderling -->>

    },

    Spitter: {
        spit: {
            args: [
            ],
            returns: {
                converter: serializer.defaultBoolean,
                defaultValue: false,
            },
        },

        //<<-- Creer-Merge: secret-Spitter -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-Spitter -->>

    },

    Weaver: {
        strengthen: {
            args: [
                {
                    name: "web",
                    converter: serializer.defaultGameObject,
                },
            ],
            returns: {
                converter: serializer.defaultBoolean,
                defaultValue: false,
            },
        },
        weaken: {
            args: [
                {
                    name: "web",
                    converter: serializer.defaultGameObject,
                },
            ],
            returns: {
                converter: serializer.defaultBoolean,
                defaultValue: false,
            },
        },

        //<<-- Creer-Merge: secret-Weaver -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-Weaver -->>

    },

    Web: {
        
        //<<-- Creer-Merge: secret-Web -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // if you want to add a "secret" method that clients don't publicly know about, but can call, do so here. Best use case is an easy way for human clients to ask for special game information, otherwise forget this exists.

        //<<-- /Creer-Merge: secret-Web -->>

    },
});

module.exports = spidersGameManager;
