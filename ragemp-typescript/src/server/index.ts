import './setup';

import './core/init'
import './commands/playerCommands'
//eventhandler init
import "./core/ServerEventHandler";

import { ADMIN_LEVELS, SHARED_CONSTANTS } from '@shared/constants';

mp.events.add('playerReady', (player) => {
	console.log(`${player.name} is ready!`);

	player.customProperty = 1;
	player.adminLevel = ADMIN_LEVELS.adminOwner
	player.customMethod = () => {
		console.log('customMethod called.');
	};

	player.customMethod();
});

console.log(SHARED_CONSTANTS.HELLO_WORLD);
