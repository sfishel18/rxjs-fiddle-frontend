import { useTheme } from '@chakra-ui/react';
import { scaleLinear } from 'd3';
import { find, flatten, get, map, max } from 'lodash';
import React, { memo } from 'react';
import { ViewModel } from '../hooks/use-view-model';

type Props = Pick<ViewModel, 'fiddleOutputLoadable'>;

const OutputViz: MemoizedFC<Props> = memo(props => {
  const theme = useTheme();
  const textColor = theme.colors.whiteAlpha['900'];
  const fiddleOutput = props.fiddleOutputLoadable.getValue();
  if (!fiddleOutput || fiddleOutput.length === 0) {
    return null;
  }
  const maxTimeValue =
    max(flatten(map(fiddleOutput, stream => stream.events.map(event => event.timestamp)))) || 0;
  const xScale = scaleLinear()
    .domain([0, maxTimeValue * 1.1])
    .range([0, 700])
    .clamp(true);
  return (
    <svg width={700} height={500}>
      {fiddleOutput.map((stream, i) => {
        const completionTime = get(
          find(stream.events, { type: 'complete' }),
          'timestamp',
          Infinity,
        );
        return (
          <g key={stream.name} transform={`translate(0, ${100 * i})`}>
            <text fill={textColor} dominantBaseline="hanging">
              {stream.name}
            </text>
            <path strokeWidth={1} stroke={textColor} d={`M 0 50 L ${xScale(completionTime)} 50`} />
            {stream.events
              .filter(event => event.type === 'value' || event.type === 'error')
              .map((event, j) => (
                <g key={j} transform={`translate(${xScale(event.timestamp)}, 50)`}>
                  {event.type === 'value' && (
                    <>
                      <circle r={25} fill="green" />
                      <text fill={textColor} dominantBaseline="middle" textAnchor="middle">
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
});

export default OutputViz;
