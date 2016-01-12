/* config.js contains constants.
 */

CONFIG = {};

CONFIG.SCREEN_WIDTH = 768;
CONFIG.SCREEN_HEIGHT = 520;
CONFIG.FLOOR_HEIGHT = 474;

CONFIG.MEELEE_ATTACK = 0;
CONFIG.FIRST_SPELL = 1;
/* Array of cooldowns that have been called
 * On update loop performs the visual behavior necessary for cooldown
 */
CONFIG.COOLDOWNS = [];

CONFIG.ACTION = {};
CONFIG.ACTION.MOVING_LEFT = 0;
CONFIG.ACTION.MOVING_RIGHT = 1;
CONFIG.ACTION.ATTACK_LEFT = 2;
CONFIG.ACTION.ATTACK_RIGHT = 3;

CONFIG.ACTION.IDLE = 4;
CONFIG.ARENA_WIDTH = 1836;

CONFIG.REDHATTER_NAME = "Redhatter";
CONFIG.SHANKER_NAME = "Shanker";
CONFIG.FLY_NAME = "Fly";


CONFIG.SHOW_HITBOXES = true;
