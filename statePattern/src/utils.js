export function drawStatusText(ctx, input, player) {
    ctx.font = "24px Helvetica";
    ctx.fillText(`Last input: ${input.lastKey}`, 24, 36);
    ctx.fillText(`Player status: ${player.currentState.stateName}`, 24, 70);
}
