module.exports = ({ events, sockets }) => {
    const handler = (id) => sockets.host.emit('user:remove', id);
    events.on('user:add', handler);
    events.on('user:modify', handler);
};