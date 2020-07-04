import { scaleLinear } from 'd3';
import { find, flatten, get, map, max } from 'lodash';
import React from 'react';
import { FiddleOutput } from '../redux/types';

interface Props {
  output: FiddleOutput | null;
}

const OutputViz: React.FC<Props> = props => {
  const { output } = props;
  if (!output || output.length === 0) {
    return null;
  }
  const maxTimeValue =
    max(flatten(map(output, stream => stream.events.map(event => event.timestamp)))) || 0;
  const xScale = scaleLinear()
    .domain([0, maxTimeValue * 1.1])
    .range([0, 700])
    .clamp(true);
  return (
    <svg width={700} height={500}>
      {output.map((stream, i) => {
        const completionTime = get(
          find(stream.events, { type: 'complete' }),
          'timestamp',
          Infinity,
        );
        return (
          <g key={stream.name} transform={`translate(0, ${100 * i})`}>
            <text dominantBaseline="hanging">{stream.name}</text>
            <path strokeWidth={1} stroke="black" d={`M 0 50 L ${xScale(completionTime)} 50`} />
            {stream.events
              .filter(event => event.type === 'value' || event.type === 'error')
              .map((event, j) => (
                <g key={j} transform={`translate(${xScale(event.timestamp)}, 50)`}>
                  {event.type === 'value' && (
                    <>
                      <circle r={25} fill="green" />
                      <text dominantBaseline="middle" textAnchor="middle">
                        {event.value}
                      </text>
                    </>
                  )}
                  {event.type === 'error' && (
                    <>
                      <circle r={25} fill="red" />
                    </>
                  )}
                </g>
              ))}
          </g>
        );
      })}
    </svg>
  );
};

export default OutputViz;
