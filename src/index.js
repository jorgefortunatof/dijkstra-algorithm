// -----------------------------------------
// [X] Ordem do grafo
// [X] Tamanho do grafo
// [X] Grau dos vértice
// [X] Se possui vértice isolado
// [X] Se possui loop
// -----------------------------------------
// [ ] Se possui aresta paralela (??)
// [ ] Remover start e finish

import {
    graphHasIsolatedVertex,
    graphHasLoop,
    graphHasParallelEdge,
    graphOrder,
    graphSize,
    graphVertexDegrees,
    lowestCostNode
} from './utils/index.js';

const graph = {
    start: { A: 2, B: 5, C: 3, D: 2 },
    A: { E: 5, B: 4 },
    B: { E: 3, F: 2 },
    C: { B: 8, F: 7 },
    D: { F: 9 },
    E: { F: 6, finish: 2 },
    F: { finish: 1 },
    finish: {},
};

function dijkstra(graph, initialNode, finalNode) {
    const trackedCosts = { ...graph[initialNode] };
    trackedCosts[finalNode] = Infinity;

    const trackedParents = {};
    trackedParents[finalNode] = null;

    const processedNodes = [];

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
    trackedParents[initialNode] = null;
    let optimalPath = [finalNode];
    let parent = trackedParents[finalNode];

    while (parent) {
        optimalPath.push(parent);
        parent = trackedParents[parent];
    }

    optimalPath.reverse();

    // monta resultado e retorna
    const degrees = graphVertexDegrees(graph);
    const hasIsolatedVertex = graphHasIsolatedVertex(degrees);

    const results = {
        distancia: trackedCosts[finalNode],
        caminho: optimalPath,
        ordem: graphOrder(graph),
        tamanho: graphSize(graph),
        grauDosVertices: degrees,
        temVerticeIsolado: hasIsolatedVertex,
        temLoop: graphHasLoop(graph),
    };

    return results;
}

console.log('dijkstra: ', dijkstra(graph, 'start', 'finish'));
