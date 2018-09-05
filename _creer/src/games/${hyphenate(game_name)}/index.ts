// WARNING: Here be Dragons
// This file is generated by Creer, do not modify it
// It basically sets up all the classes, interfaces, types, and what-not that
// we need for TypeScript to know the base classes, while allowing for minimal
// code for developers to be forced to fill out.
<%include file="functions.noCreer" />
// tslint:disable:max-classes-per-file
// ^ because we need to build a bunch of base class wrappers here

// base game classes
${shared['cerveau']['imports']({
    "~/core/game": [ 'BaseAI', 'BaseGame', 'BaseGameManager', 'BaseGameObject', 'BaseGameObjectFactory', 'BaseGameSettingsManager', 'IBasePlayer', 'makeNamespace' ]
})}
// mixins<%

mixin_imports = []
mixed_players = []
mixins = []
for parent_class in game['serverParentClasses']:
    no_game = upcase_first(parent_class[:-4]) # slice off "Game" from the end of the string

    mixed_player = 'I' + no_game + 'Player'
    mixed_players.append(mixed_player)

    mixin = 'mix' + no_game
    mixins.append(mixin)

    mixin_imports.extend([mixin, mixed_player])

imports = {
    "~/core/game/mixins": mixin_imports,
}

%>
${shared['cerveau']['imports'](imports)}
% if len(game_objs) > 2:
// extract game object constructor args
import { FirstArgumentFromConstructor } from "~/utils";

% endif
/**
 * The interface the Player for the ${game_name} game
 * must implement from mixed in game logic.
 */
export interface IBase${game_name}Player extends
    IBasePlayer${',\n    '.join([''] + [m for m in mixed_players])} {
}
<% base_index = 1 %>
const base0 = {
    AI: BaseAI,
    Game: BaseGame,
    GameManager: BaseGameManager,
    GameObject: BaseGameObject,
    GameSettings: BaseGameSettingsManager,
};

% for i, mixin in enumerate(mixins):
const base${i + 1} = ${mixin}(base${i});
% endfor

const mixed = base${len(mixins)};

/** The base AI class for the ${game_name} game will mixin logic. */
class Base${game_name}AI extends mixed.AI {}

/** The base Game class for the ${game_name} game will mixin logic. */
class Base${game_name}Game extends mixed.Game {}

/** The base GameManager class for the ${game_name} game will mixin logic. */
class Base${game_name}GameManager extends mixed.GameManager {}

/** The base GameObject class for the ${game_name} game will mixin logic. */
class Base${game_name}GameObject extends mixed.GameObject {}

/** The base GameSettings class for the ${game_name} game will mixin logic. */
class Base${game_name}GameSettings extends mixed.GameSettings {}

/** The Base classes that game classes build off of. */
export const BaseClasses = {
    AI: Base${game_name}AI,
    Game: Base${game_name}Game,
    GameManager: Base${game_name}GameManager,
    GameObject: Base${game_name}GameObject,
    GameSettings: Base${game_name}GameSettings,
};

// Now all the base classes are created;
// so we can start importing/exporting the classes that need them.

% for game_obj_name in sort_dict_keys(game_objs):
<%
game_obj = game_objs[game_obj_name]
%>/** All the possible properties for an ${game_obj_name}. */
export interface I${game_obj_name}Properties {
%   for attr_name in sort_dict_keys(game_obj['attributes']):
<%
if attr_name in ['gameObjectName', 'id', 'logs']:
    continue

attr = game_obj['attributes'][attr_name]
%>${shared['cerveau']['block_comment']('    ', attr)}
    ${attr_name}?: ${shared['cerveau']['type'](attr['type'], nullable=False)};

%   endfor
}

%    for function_name in game_obj['function_names']:
<%
    if game_obj_name == 'GameObject' and function_name == 'log':
        continue
    function_parms = game_obj['functions'][function_name]
%>${shared['cerveau']['block_comment'](
    '',
    "Argument overrides for {}'s {} function. If you return an object of this interface from the invalidate functions, the value(s) you set will be used in the actual function.".format(game_obj_name, function_name)
)}
export interface I${game_obj_name}${upcase_first(function_name)}Args {
%       for arg in function_parms['arguments']:
${shared['cerveau']['block_comment']('    ', arg)}
    ${arg['name']}?: ${shared['cerveau']['type'](arg['type'])};
%       endfor
}

%    endfor
% endfor
% for game_obj_name in sort_dict_keys(game_objs):
export * from "./${hyphenate(game_obj_name)}";
% endfor
export * from "./game";
export * from "./game-manager";
export * from "./ai";

<%
for game_obj_name in sort_dict_keys(game_objs):
    imports = {}
    imports['./' + hyphenate(game_obj_name)] = [game_obj_name]

    context.write(shared['cerveau']['imports'](imports))
%>
% if game_name > 'AI':
import { AI } from "./ai";
% endif
import { ${game_name}Game } from "./game";
import { ${game_name}GameManager } from "./game-manager";
import { ${game_name}GameSettingsManager } from "./game-settings";
% if game_name <= 'AI':
import { AI } from "./ai";
% endif

% for game_obj_name in sort_dict_keys(game_objs):
<%
    if game_obj_name in ['Player', 'GameObject']:
        continue
%>/** The arguments used to construct a ${game_obj_name} */
export type ${game_obj_name}Args = FirstArgumentFromConstructor<typeof ${game_obj_name}>;

% endfor
/**
 * The factory that **must** be used to create any game objects in
 * the ${game_name} game.
 */
export class ${game_name}GameObjectFactory extends BaseGameObjectFactory {
% for game_obj_name in sort_dict_keys(game_objs):
<%
    if game_obj_name in ['Player', 'GameObject']:
        continue # skip these, they can never be created via game logic
%>${shared['cerveau']['block_comment']('    ', {
    'description': 'Creates a new {} in the Game and tracks it for all players.'.format(game_obj_name),
    'arguments': [
        {
            'name': 'args',
            'description': 'Data about the {} to set. Any keys matching a property in the game object\'s class will be automatically set for you.'.format(game_obj_name)
        }
    ],
    'returns': {
        'description': 'A new {} hooked up in the game and ready for you to use.'.format(game_obj_name)
    }
})}
    public ${uncapitalize(game_obj_name)}<T extends ${game_obj_name}Args>(args: T): ${game_obj_name} & T {
        return this.createGameObject("${game_obj_name}", ${game_obj_name}, args);
    }

% endfor
}

/**
 * The shared namespace for ${game_name} that is used to
 * initialize each game instance.
 */
export const Namespace = makeNamespace({
    AI,
    Game: ${game_name}Game,
    GameManager: ${game_name}GameManager,
    GameObjectFactory: ${game_name}GameObjectFactory,
    GameSettingsManager: ${game_name}GameSettingsManager,
    Player,

    // These are generated metadata that allow delta-merging values from
    // clients.
    // They are never intended to be directly interfaced with outside of the
    // Cerveau core developers.
    gameName: "${game_name}",
    gameSettingsManager: new ${game_name}GameSettingsManager(),
    gameObjectsSchema: {
% for obj_name in (['AI', 'Game'] + sort_dict_keys(game_objs)):
<%
obj = None
if obj_name == 'AI':
    obj = ai
elif obj_name == 'Game':
    obj = game
else:
    obj = game_objs[obj_name]


%>        ${obj_name}: {
%   if 'parentClasses' in obj and len(obj['parentClasses']) > 0:
            parentClassName: "${obj['parentClasses'][0]}",
%   endif
            attributes: {
%   if 'attributes' in obj:
%           for attr_name in sort_dict_keys(obj['attributes']):
                ${attr_name}: {
${shared['cerveau']['schema_type'](obj['attributes'][attr_name]['type'], 5)}
                },
%       endfor
%   endif
            },
            functions: {
%   if 'functions' in obj:
%       for function_name in sort_dict_keys(obj['functions']):
<%
    function_parms = obj['functions'][function_name]
    returns = function_parms['returns']
%>                ${function_name}: {
                    args: [
%           for arg in function_parms['arguments']:
                        {
                            argName: "${arg['name']}",
${shared['cerveau']['schema_type'](arg['type'], 7, arg['optional'])}
%               if arg['optional']:
                            defaultValue: ${shared['cerveau']['value'](arg['type'], arg['default'])},
%               endif
                        },
%           endfor
                    ],
%           if returns and 'invalidValue' in returns:
                    invalidValue: ${shared['cerveau']['value'](returns['type'], returns['invalidValue']) if returns else 'undefined'},
%           endif
                    returns: {
%           if returns:
${shared['cerveau']['schema_type'](returns['type'], 6)}
%           else:
                        typeName: "void",
%           endif
                    },
                },
%       endfor
            },
%   endif
        },
% endfor
    },
});
