import { IBaseGameObjectRequiredData } from "~/core/game";
import { IUnitAttackArgs, IUnitMineArgs, IUnitMoveArgs, IUnitOpenArgs,
         IUnitProperties, IUnitShootDownArgs, IUnitTransferArgs } from "./";
import { Body } from "./body";
import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Projectile } from "./projectile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A unit in the game. May be a corvette, missleboat, martyr, transport, miner.
 */
export class Unit extends GameObject {
    /**
     * Whether or not this Unit has performed its action this turn.
     */
    public acted!: boolean;

    /**
     * The x value this unit is dashing to.
     */
    public dashX!: number;

    /**
     * The y value this unit is dashing to.
     */
    public dashY!: number;

    /**
     * The remaining health of a unit.
     */
    public energy!: number;

    /**
     * The amount of Generium ore carried by this unit. (0 to job carry
     * capacity - other carried items).
     */
    public genarium!: number;

    /**
     * Tracks wheither or not the ship is dashing.
     */
    public isDashing!: boolean;

    /**
     * The Job this Unit has.
     */
    public readonly job: Job;

    /**
     * The amount of Legendarium ore carried by this unit. (0 to job carry
     * capacity - other carried items).
     */
    public legendarium!: number;

    /**
     * The distance this unit can still move.
     */
    public moves!: number;

    /**
     * The amount of Mythicite carried by this unit. (0 to job carry capacity -
     * other carried items).
     */
    public mythicite!: number;

    /**
     * The Player that owns and can control this Unit.
     */
    public owner?: Player;

    /**
     * The martyr ship that is currently shielding this ship if any.
     */
    public protector?: Unit;

    /**
     * The radius of the circle this unit occupies.
     */
    public radius!: number;

    /**
     * The amount of Rarium carried by this unit. (0 to job carry capacity -
     * other carried items).
     */
    public rarium!: number;

    /**
     * The x value this unit is on.
     */
    public x!: number;

    /**
     * The y value this unit is on.
     */
    public y!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Unit is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        args: Readonly<IUnitProperties & {
            // <<-- Creer-Merge: constructor-args -->>
            job: Job;
            // You can add more constructor args in here
            // <<-- /Creer-Merge: constructor-args -->>
        }>,
        required: Readonly<IBaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>
        this.job = args.job;
        this.radius = 10;
        // setup any thing you need here
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Invalidation function for attack. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param enemy - The Unit being attacked.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateAttack(
        player: Player,
        enemy: Unit,
    ): void | string | IUnitAttackArgs {
        // <<-- Creer-Merge: invalidate-attack -->>
        const reason = this.invalidate(player, true);
        // if there is a reason, return it.
        if (reason) {
            return reason;
        }

        // Check all the arguments for attack here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        // <<-- /Creer-Merge: invalidate-attack -->>
    }

    /**
     * Attacks the specified unit.
     *
     * @param player - The player that called this.
     * @param enemy - The Unit being attacked.
     * @returns True if successfully attacked, false otherwise.
     */
    protected async attack(player: Player, enemy: Unit): Promise<boolean> {
        // <<-- Creer-Merge: attack -->>

        // Add logic here for attack.

        // TODO: replace this with actual logic
        return false;

        // <<-- /Creer-Merge: attack -->>
    }

    /**
     * Invalidation function for mine. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param body - The object to be mined.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateMine(
        player: Player,
        body: Body,
    ): void | string | IUnitMineArgs {
        // <<-- Creer-Merge: invalidate-mine -->>
        const reason = this.invalidate(player, true);
        // if there is a reason, return it.
        if (reason) {
            return reason;
        }

        // Check all the arguments for mine here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        // <<-- /Creer-Merge: invalidate-mine -->>
    }

    /**
     * allows a miner to mine a asteroid
     *
     * @param player - The player that called this.
     * @param body - The object to be mined.
     * @returns True if successfully acted, false otherwise.
     */
    protected async mine(player: Player, body: Body): Promise<boolean> {
        // <<-- Creer-Merge: mine -->>

        // Add logic here for mine.

        // TODO: replace this with actual logic
        return false;

        // <<-- /Creer-Merge: mine -->>
    }

    /**
     * Invalidation function for move. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param x - The x value of the destination's coordinates.
     * @param y - The y value of the destination's coordinates.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateMove(
        player: Player,
        x: number,
        y: number,
    ): void | string | IUnitMoveArgs {
        // <<-- Creer-Merge: invalidate-move -->>
        const reason = this.invalidate(player, true);
        // if there is a reason, return it.
        if (reason) {
            return reason;
        }

        if ((((this.x - x) ** 2 + (this.y - y) ** 2) ** .5) > this.moves) {
            return `${this} can only move ${this.moves} distance!`;
        }

        if (x < 0 || y < 0 || x > this.game.sizeX || y > this.game.sizeY) {
            return `${this} is dead and cannot move.`;
        }

        // Check all the arguments for move here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        // <<-- /Creer-Merge: invalidate-move -->>
    }

    /**
     * Moves this Unit from its current location to the new location specified.
     *
     * @param player - The player that called this.
     * @param x - The x value of the destination's coordinates.
     * @param y - The y value of the destination's coordinates.
     * @returns True if it moved, false otherwise.
     */
    protected async move(
        player: Player,
        x: number,
        y: number,
    ): Promise<boolean> {
        // <<-- Creer-Merge: move -->>

        // Add logic here for move.
        this.moves -= ((x - this.x) ** 2) + ((y - this.y) ** 2) ** .5;
        this.x = x;
        this.y = y;

        // detect collisions and flag ship, or resolve.

        // magic code that updates the units grid position.

        // TODO: replace this with actual logic
        return false;

        // <<-- /Creer-Merge: move -->>
    }

    /**
     * Invalidation function for open. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param x - The x position of the location you wish to check.
     * @param y - The y position of the location you wish to check.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateOpen(
        player: Player,
        x: number,
        y: number,
    ): void | string | IUnitOpenArgs {
        // <<-- Creer-Merge: invalidate-open -->>
        const reason = this.invalidate(player, true);
        // if there is a reason, return it.
        if (reason) {
            return reason;
        }

        // Check all the arguments for open here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        // <<-- /Creer-Merge: invalidate-open -->>
    }

    /**
     * tells you if your ship can dash to that location.
     *
     * @param player - The player that called this.
     * @param x - The x position of the location you wish to check.
     * @param y - The y position of the location you wish to check.
     * @returns True if pathable by this unit, false otherwise.
     */
    protected async open(
        player: Player,
        x: number,
        y: number,
    ): Promise<boolean> {
        // <<-- Creer-Merge: open -->>

        // Add logic here for open.

        // TODO: replace this with actual logic
        return false;

        // <<-- /Creer-Merge: open -->>
    }

    /**
     * Invalidation function for shootDown. Try to find a reason why the passed
     * in parameters are invalid, and return a human readable string telling
     * them why it is invalid.
     *
     * @param player - The player that called this.
     * @param missile - The projectile being shot down.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateShootDown(
        player: Player,
        missile: Projectile,
    ): void | string | IUnitShootDownArgs {
        // <<-- Creer-Merge: invalidate-shootDown -->>

        // Check all the arguments for shootDown here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        // <<-- /Creer-Merge: invalidate-shootDown -->>
    }

    /**
     * Attacks the specified projectile.
     *
     * @param player - The player that called this.
     * @param missile - The projectile being shot down.
     * @returns True if successfully attacked, false otherwise.
     */
    protected async shootDown(
        player: Player,
        missile: Projectile,
    ): Promise<boolean> {
        // <<-- Creer-Merge: shootDown -->>

        // Add logic here for shootDown.

        // TODO: replace this with actual logic
        return false;

        // <<-- /Creer-Merge: shootDown -->>
    }

    /**
     * Invalidation function for transfer. Try to find a reason why the passed
     * in parameters are invalid, and return a human readable string telling
     * them why it is invalid.
     *
     * @param player - The player that called this.
     * @param unit - The unit you are grabbing the resources from.
     * @param amount - The amount of materials to you with to grab. Amounts <=
     * 0 will pick up all the materials that the unit can.
     * @param material - The material the unit will pick up. 'resource1',
     * 'resource2', or 'resource3'.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateTransfer(
        player: Player,
        unit: Unit,
        amount: number,
        material: "genarium" | "rarium" | "legendarium" | "Mythicite",
    ): void | string | IUnitTransferArgs {
        // <<-- Creer-Merge: invalidate-transfer -->>
        const reason = this.invalidate(player, true);
        // if there is a reason, return it.
        if (reason) {
            return reason;
        }

        // Check all the arguments for transfer here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        // <<-- /Creer-Merge: invalidate-transfer -->>
    }

    /**
     * Grab materials from a friendly unit. Doesn't use a action.
     *
     * @param player - The player that called this.
     * @param unit - The unit you are grabbing the resources from.
     * @param amount - The amount of materials to you with to grab. Amounts <=
     * 0 will pick up all the materials that the unit can.
     * @param material - The material the unit will pick up. 'resource1',
     * 'resource2', or 'resource3'.
     * @returns True if successfully taken, false otherwise.
     */
    protected async transfer(
        player: Player,
        unit: Unit,
        amount: number,
        material: "genarium" | "rarium" | "legendarium" | "Mythicite",
    ): Promise<boolean> {
        // <<-- Creer-Merge: transfer -->>

        // Add logic here for transfer.

        // TODO: replace this with actual logic
        return false;

        // <<-- /Creer-Merge: transfer -->>
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    /**
     * Tries to invalidate args for an action function
     *
     * @param player - the player commanding this Unit
     * @param checkAction - true to check if this Unit has an action
     * @returns The reason this is invalid, undefined if looks valid so far.
     */
    private invalidate(
        player: Player,
        checkAction: boolean = false,
    ): string | undefined {
        if (!player || player !== this.game.currentPlayer) {
            return `It isn't your turn, ${player}.`;
        }

        if (this.owner !== player || this.owner === undefined) {
            return `${this} isn't owned by you.`;
        }
        // Make sure the unit hasn't acted.
        if (checkAction && this.acted) {
            return `${this} has already acted this turn. Or not enough coffee`;
        }
        // Make sure the unit is alive.
        if (this.energy <= 0) {
            return `${this} is dead, and cannot do anything.`;
        }
    }

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}