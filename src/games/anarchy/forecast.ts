import { BaseGameObjectRequiredData } from "~/core/game";
import { ForecastConstructorArgs } from "./";
import { GameObject } from "./game-object";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * The direction the wind will blow fires in. Can be 'north', 'east', 'south',
 * or 'west'.
 */
export type ForecastDirection = "North" | "East" | "South" | "West";

/**
 * The weather effect that will be applied at the end of a turn, which causes
 * fires to spread.
 */
export class Forecast extends GameObject {
    /**
     * The Player that can use WeatherStations to control this Forecast when
     * its the nextForecast.
     */
    public readonly controllingPlayer: Player;

    /**
     * The direction the wind will blow fires in. Can
     * be 'north', 'east', 'south', or 'west'.
     */
    public direction!: "North" | "East" | "South" | "West";

    /**
     * How much of a Building's fire that can be blown in the direction of
     * this Forecast. Fire is duplicated (copied), not moved (transferred).
     */
    public intensity!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Forecast is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        args: ForecastConstructorArgs<{
            // <<-- Creer-Merge: constructor-args -->>
            /** The direction this Forecast will be. */
            direction: ForecastDirection;
            /** The intensity value of this Forecast. */
            intensity: number;
            /** The player whose turn it will be on the turn this Forecast can be manipulated. */
            controllingPlayer: Player;
            // <<-- /Creer-Merge: constructor-args -->>
        }>,
        required: Readonly<BaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>

        this.controllingPlayer = args.controllingPlayer;

        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: public-functions -->>

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
