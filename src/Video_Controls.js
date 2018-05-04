import React from 'react';

const controls = () => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Controls</th>
          <td>
            <button onClick={this.stop}>Stop</button>
            <button onClick={this.playPause}>
              {playing ? 'Pause' : 'Play'}
            </button>
            <button onClick={this.onClickFullscreen}>Fullscreen</button>
            <button onClick={this.setPlaybackRate} value={1}>
              1
            </button>
            <button onClick={this.setPlaybackRate} value={1.5}>
              1.5
            </button>
            <button onClick={this.setPlaybackRate} value={2}>
              2
            </button>
          </td>
        </tr>
        <tr>
          <th>Seek</th>
          <td>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
            />
          </td>
        </tr>
        <tr>
          <th>Volume</th>
          <td>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={this.setVolume}
            />
          </td>
        </tr>
        <tr>
          <th>
            <label htmlFor="muted">Muted</label>
          </th>
          <td>
            <input
              id="muted"
              type="checkbox"
              checked={muted}
              onChange={this.toggleMuted}
            />
          </td>
        </tr>
        <tr>
          <th>
            <label htmlFor="loop">Loop</label>
          </th>
          <td>
            <input
              id="loop"
              type="checkbox"
              checked={loop}
              onChange={this.toggleLoop}
            />
          </td>
        </tr>
        <tr>
          <th>Played</th>
          <td>
            <progress max={1} value={played} />
          </td>
        </tr>
        <tr>
          <th>Loaded</th>
          <td>
            <progress max={1} value={loaded} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default controls;
