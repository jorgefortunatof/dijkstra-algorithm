import {
    graphHasIsolatedVertex,
    graphHasLoop,
    graphHasParallelEdge,
    graphOrder,
    graphSize,
    graphVertexDegrees,
    lowestCostNode,
    showGraphResult
} from './utils/index.js';

const graph1 = {
    A: { B: 2, C: 5, D: 3, E: 2 },
    B: { C: 4, F: 5 },
    C: { F: 3, G: 2 },
    D: { C: 8, G: 7 },
    E: { G: 9 },
    F: { G: 6, H: 2 },
    G: { H: 1 },
    H: {},
};

const graph2 = {
    A: { B: 1, E: 2, C: 4 },
    B: { D: 2 },
    C: { F: 5 },
    D: { G: 8, D: 0 },
    E: { G: 9 },
    F: { G: 1 },
    G: { F: 1 },
    H: {}
};

function dijkstra(graph, initialNode, finalNode) {
    const trackedCosts = { ...graph[initialNode] };
    trackedCosts[finalNode] = Infinity;
    const processedNodes = [];

    const trackedParents = {};
    trackedParents[finalNode] = null;

    // adiciona sucessores do nó inicial
    for (let child in graph[initialNode]) {
        trackedParents[child] = initialNode;
    }

    let node = lowestCostNode(trackedCosts, processedNodes);

    // verifica os nós, atribui peso e antecessores para o menor caminho
    while (node) {
        let cost = trackedCosts[node];
        let children = graph[node];

        for (let n in children) {
            let newCost = cost + children[n];

            if (!trackedCosts[n]) {
                trackedCosts[n] = newCost;
                trackedParents[n] = node;
            }

            if (trackedCosts[n] > newCost) {
                trackedCosts[n] = newCost;
                trackedParents[n] = node;
            }
        }

        processedNodes.push(node);
        node = lowestCostNode(trackedCosts, processedNodes);
    }

    // pega o caminho
    let optimalPath = [finalNode];
    let parent = trackedParents[finalNode];

    while (parent) {
        optimalPath.push(parent);
        parent = trackedParents[parent];

        if (parent === initialNode) {
            optimalPath.push(parent);
            break;
        }
    }

    optimalPath.reverse();

    // monta resultado e retorna
    const degrees = graphVertexDegrees(graph);
    const hasIsolatedVertex = graphHasIsolatedVertex(degrees);

    const results = {
        distance: trackedCosts[finalNode],
        path: optimalPath,
        order: graphOrder(graph),
        size: graphSize(graph),
        vertexDegrees: degrees,
        hasIsolatedVertex: hasIsolatedVertex,
        hasLoop: graphHasLoop(graph),
        hasParallelEdge: graphHasParallelEdge(graph)
    };

    return results;
}


const results = dijkstra(graph1, 'A', 'G');
showGraphResult(results);
