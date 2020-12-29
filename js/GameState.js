class GameState {
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    getState() {
        state = database.ref('gameState');
        state.on('value', (data) => {
            gameState = (data.val());
        });
    }
}