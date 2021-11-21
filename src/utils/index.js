// tem aresta paralela
export function graphHasParallelEdge(graph) {
    for (let node in graph) {
        for (let child in graph[node]) {
            if (Object.keys(graph[child]).includes(node)) {
                return true;
            }
        }
    }

    return false;
}

// tem loop
export function graphHasLoop(graph) {
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
export function graphHasIsolatedVertex(vertexDegrees) {
    return Object
        .keys(vertexDegrees)
        .some(item =>
            vertexDegrees[item].output === 0 &&
            vertexDegrees[item].input === 0
        );
}

function graphVertexInputDegree(graph, nodeItem) {
    const nodes = Object.keys(graph).filter(item => item !== nodeItem);

    let degree = 0;
    nodes.forEach(node => {
        degree += Object.keys(graph[node]).filter(item => item === nodeItem).length;
    });

    return degree;
}

// graus dos vértices
export function graphVertexDegrees(graph) {
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
export function graphSize(graph) {
    const nodes = Object.keys(graph);

    let size = 0;
    size += nodes.length;

    nodes.forEach(node => {
        size += Object.keys(graph[node]).length;
    });

    return size;
}

// ordem do grafo
export function graphOrder(graph) {
    return Object.keys(graph).length;
}

// nó com menor custo que ainda não foi processado
export function lowestCostNode(costs, processed) {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
};

export function showGraphResult(graphResult) {
    console.log('\n=====================================');
    console.log('Caminho: ', graphResult.path);
    console.log('Distância: ', graphResult.distance);
    console.log('-------------------------------------');
    console.log('Tamanho: ', graphResult.size);
    console.log('Ordem: ', graphResult.order);
    console.log('-------------------------------------');
    console.log('Graus dos Vértices: ', graphResult.vertexDegrees);
    console.log('-------------------------------------');
    console.log('Tem Vértice Isolado: ', graphResult.hasIsolatedVertex);
    console.log('Tem Loop: ', graphResult.hasLoop);
    console.log('Tem Aresta Paralela: ', graphResult.hasParallelEdge);
    console.log('=====================================\n');
}
