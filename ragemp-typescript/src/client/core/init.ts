//CHAT INIT
mp.gui.chat.show(false); // Disables default RageMP Chat
const chatbox = mp.browsers.new('http://package2/scripts/advanced-chat/index.html');
chatbox.markAsChat();
//

//UI init
const ui = mp.browsers.new('http://package2/ui/index.html')
export {ui}