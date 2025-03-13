module.exports = ({ events, stream }) => {
    events.on('user:modify', (id, user) => user.auth && !stream.state && stream.start());
};