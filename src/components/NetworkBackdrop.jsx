const nodes = [
  [7, 18], [19, 32], [31, 14], [43, 38], [56, 20], [70, 34], [88, 15],
  [12, 67], [27, 53], [40, 76], [58, 61], [74, 78], [91, 57],
];

const connections = [
  [0,1], [0,2], [1,2], [1,8], [2,3], [3,4], [3,8], [3,10], [4,5],
  [5,6], [5,10], [6,12], [7,8], [8,9], [8,10], [9,10], [10,11],
  [10,12], [11,12],
];

export default function NetworkBackdrop() {
  return (
    <svg className="network-backdrop" viewBox="0 0 100 90" preserveAspectRatio="none" aria-hidden="true">
      <g className="network-lines">
        {connections.map(([from,to],index) => (
          <line
            key={index}
            x1={nodes[from][0]}
            y1={nodes[from][1]}
            x2={nodes[to][0]}
            y2={nodes[to][1]}
          />
        ))}
      </g>
      <g className="network-nodes">
        {nodes.map(([x,y],index) => (
          <circle key={index} cx={x} cy={y} r={index % 4 === 0 ? .38 : .25} style={{'--node-delay':`${index * -0.32}s`}} />
        ))}
      </g>
    </svg>
  );
}
