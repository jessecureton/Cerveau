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
    "~/core/game": [ 'BaseAI', 'BaseGame', 'BaseGameManager', 'BaseGameObject', 'BaseGameObjectFactory', 'BaseGameSettingsManager', 'BasePlayer', 'makeNamespace' ]
})}
// mixins<%

mixin_imports = []
mixed_players = ['BasePlayer']
mixins = []
for parent_class in game['serverParentClasses']:
    no_game = upcase_first(parent_class[:-4]) # slice off "Game" from the end of the string

    mixed_player = no_game + 'Player'
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
 * The interface that the Player for the ${game_name} game
 * must implement from mixed in game logic.
 */<%
front = 'export interface Base{}Player'.format(game_name)
one_line = front + ' extends ' + ', '.join(mixed_players) + ' {' + '}'

if len(one_line) < 80:
    base_player_interface = one_line
else:
    base_player_interface = front + '\n    extends ' + ',\n'.join([('        ' if i > 0 else '') + m for i, m in enumerate(mixed_players)]) + ' {' + '}'
%>
${base_player_interface}
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
attrs = []
attr_i = 0
for attr_name in sort_dict_keys(game_obj['attributes']):
    if attr_name in ['gameObjectName', 'id', 'logs']:
        continue

    attrs.append((attr_i, attr_name, game_obj['attributes'][attr_name]))
    attr_i += 1
%>/** All the possible properties for ${game_obj_name} instances. */
export interface ${game_obj_name}Properties {${'}' if not attrs else ''}
%   for i, attr_name, attr in attrs:
${'\n' if i > 0 else ''}${shared['cerveau']['block_comment']('    ', attr)}
<%
    prop_name = '    {}?:'.format(attr_name)
    type_val = shared['cerveau']['type'](attr['type'], nullable=False)
    attr_type = prop_name + ' ' + type_val
    if len(attr_type) > 80:
        attr_type = prop_name + shared['cerveau']['type'](attr['type'], nullable=False, wrap_literals_indent=1)
%>${attr_type};
%   endfor
${'}\n' if attrs else ''}
%    for function_name in game_obj['function_names']:
<%
    if game_obj_name == 'GameObject' and function_name == 'log':
        continue
    function_parms = game_obj['functions'][function_name]
%>${shared['cerveau']['block_comment'](
    '',
    "Argument overrides for {}'s {} function. If you return an object of this interface from the invalidate functions, the value(s) you set will be used in the actual function.".format(game_obj_name, function_name)
)}
export interface ${game_obj_name}${upcase_first(function_name)}Args {
%       for arg in function_parms['arguments']:
${shared['cerveau']['block_comment']('    ', arg)}
    ${arg['name']}?: ${shared['cerveau']['type'](arg['type'])};
%       endfor
}

%    endfor
% endfor
% for i, game_obj_name in enumerate(sort_dict_keys(game_objs)):
<%
game_obj = game_objs[game_obj_name]
parent_unions = []
for parent_class in game_obj['parentClasses']:
    if parent_class == 'GameObject':
        continue
    parent_unions.append('{}Args'.format(parent_class))
if game_obj_name == 'Player':
    parent_unions.append('Base' + game_name + 'Player')
unions = parent_unions + [ game_obj_name + 'Properties', 'T' ]
%>/**
 * The default args passed to a constructor function for
 * ${game_obj_name} instances.
 */
export type ${game_obj_name}ConstructorArgs<T extends {} = {}> = Readonly<
    ${' & '.join(unions)}
>;

%endfor
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

    oargs_front = 'export type ' + game_obj_name + 'Args = FirstArgumentFromConstructor<'
    oargs_typeof = 'typeof ' + game_obj_name
    oargs_end = ">;"

    oargs = oargs_front + oargs_typeof + oargs_end

    if len(oargs) > 80:
        oargs = oargs_front + '\n    ' + oargs_typeof + '\n' + oargs_end
%>/** The arguments used to construct a ${game_obj_name} */
${oargs}

% endfor
/**
 * The factory that **must** be used to create any game objects in
 * the ${game_name} game.
 */<%
game_objs_factory = []
for game_obj_name in sort_dict_keys(game_objs):
    if game_obj_name in ['Player', 'GameObject']:
        continue # skip these, they can never be created via game logic

    game_objs_factory.append(game_obj_name)
%>
export class ${game_name}GameObjectFactory extends BaseGameObjectFactory {${'}' if not game_objs_factory else ''}
% for i, game_obj_name in enumerate(game_objs_factory):
${'\n' if i > 0 else ''}${shared['cerveau']['block_comment']('    ', {
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
})}<%
def build_fac_top():
    fac_sig = '    public {}<T extends {}Args>('.format(uncapitalize(game_obj_name), game_obj_name)
    fac_arg = 'args: Readonly<T>'
    fac_ret = '): {} & T {{'.format(game_obj_name)

    fac_one_line = fac_sig + fac_arg + fac_ret
    if (len(fac_one_line) < 80):
        return fac_one_line
    return fac_sig + '\n        ' + fac_arg + ',\n    ' + fac_ret

def build_cgo_func():
    cgo_sig = '        return this.createGameObject('
    cgo_args = ['"{}"'.format(game_obj_name), game_obj_name, 'args']
    cgo_end = ');'

    one_line = cgo_sig + ', '.join(cgo_args) + cgo_end
    if len(one_line) <= 80:
        return one_line

    return cgo_sig + '\n' + ''.join(['            {},\n'.format(a) for a in cgo_args]) + '        ' + cgo_end

%>
${build_fac_top()}
${build_cgo_func()}
    }
% endfor
${'}\n' if game_objs_factory else ''}
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
%   if 'attributes' in obj and obj['attributes']:
            attributes: {
%       for attr_name in sort_dict_keys(obj['attributes']):
                ${attr_name}: {
${shared['cerveau']['schema_type'](obj['attributes'][attr_name]['type'], 5)}
                },
%       endfor
            },
%   else:
            attributes: {},
%   endif
%   if 'functions' in obj and obj['functions']:
            functions: {
%       for function_name in sort_dict_keys(obj['functions']):
<%
    function_parms = obj['functions'][function_name]
    returns = function_parms['returns']
%>                ${function_name}: {
%           if function_parms['arguments']:
                    args: [
%               for arg in function_parms['arguments']:
                        {
                            argName: "${arg['name']}",
${shared['cerveau']['schema_type'](arg['type'], 7, arg['optional'])}
%                   if arg['optional']:
                            defaultValue: ${shared['cerveau']['value'](arg['type'], arg['default'])},
%                   endif
                        },
%               endfor
                    ],
%           else:
                    args: [],
%           endif
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
%   else:
            functions: {},
%   endif
        },
% endfor
    },
    gameVersion:
        "${game_version}",
});
