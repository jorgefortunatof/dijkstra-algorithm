const graph = {
    start: { A: 2, B: 5, C: 3, D: 2 },
    A: { E: 5, B: 4 },
    B: { E: 3, F: 2 },
    C: { B: 8, F: 7 },
    D: { F: 9 },
    E: { F: 6, finish: 2 },
    F: { finish: 1 },
    finish: {}
};

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
    const results = {
        distance: trackedCosts[finalNode],
        path: optimalPath
    };

    console.log({ trackedCosts });
    console.log({ trackedParents });

    return results;
}

console.log('dijkstra: ', dijkstra(graph, 'start', 'finish'));
