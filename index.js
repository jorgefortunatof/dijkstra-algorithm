// -----------------------------------------
// [X] Ordem do grafo
// [X] Tamanho do grafo
// [X] Grau dos vértice
// [X] Se possui vértice isolado
// [X] Se possui loop
// -----------------------------------------
// [ ] Se possui aresta paralela (??)
// [ ] Corrigir para funcionar com arestas paralela

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


// tem loop
function graphHasLoop(graph) {
    let hasLoop = false;
    for (let node in graph) {
        if (Object.keys(graph[node])
            .some(item => item === node)) {
            hasLoop = true;
            break;
        }
    };

    return hasLoop;
}

// tem vértice isolado
function graphHasIsolatedVertex(vertexDegrees) {
    return Object
        .keys(vertexDegrees)
        .some(item =>
            vertexDegrees[item].output === 0 &&
            vertexDegrees[item].input === 0
        );
}

// graus de entrada do vértice
function graphVertexInputDegree(graph, nodeItem) {
    const nodes = Object.keys(graph).filter(item => item !== nodeItem);

    let degree = 0;
    nodes.forEach(node => {
        degree += Object.keys(graph[node]).filter(item => item === nodeItem).length;
    });

    return degree;
}

// graus dos vértices
function graphVertexDegrees(graph) {
    const nodes = Object.keys(graph);
    const vertexDegrees = {};

    nodes.forEach(node => {
        vertexDegrees[node] = {
            output: Object.keys(graph[node]).length,
            input: graphVertexInputDegree(graph, node)
        };
    });

    return vertexDegrees;
}

// tamanho do grafo
function graphSize(graph) {
    const nodes = Object.keys(graph);

    let size = 0;
    size += nodes.length;

    nodes.forEach(node => {
        size += Object.keys(graph[node]).length;
    });

    return size;
}

// ordem do grafo
function graphOrder(graph) {
    return Object.keys(graph).length;
}

// retorna o nó com menor custo que ainda não foi processado
function lowestCostNode(costs, processed) {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
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
