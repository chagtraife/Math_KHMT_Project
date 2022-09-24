

/******************************************************************************

Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/
#include <iostream>
#include <vector>
using namespace std;
using path = vector<int>;

class Graph {
public:
    Graph(vector<vector<int>> adjacenyMatrix): m_adjacenyMatrix(adjacenyMatrix)
    {
    };
    path firstShortestWay();
    path secondShortestWay();
    path thirdShortestWay();
    path getKShortestWay(int k);

private:
    vector<vector<int>> m_adjacenyMatrix; 
};

path Graph::firstShortestWay()
{
    // use dijkstra:
    
    return path {1, 1, 1};
}

path Graph::secondShortestWay()
{

    return path {2, 2, 2};
}

path Graph::thirdShortestWay()
{

    return path {3, 3, 3};
}

path Graph::getKShortestWay(int k)
{
    return path {4, 4, 4};
}

void init()
{
    freopen("graph.txt", "r", stdin);
    freopen("Output.txt", "w", stdout);
};

Graph getGraph()
{
    int V;
    scanf("%d", &V);
    cout << "Vertex Number of graph" << V << endl;
    vector<vector<int>> adjacenyMatrix; 
    
    for (int i = 0; i < V; i++) {
        vector<int> edges(V);
        for (int j = 0; j < V; j++){
            scanf("%d ", &edges[j]);
        }
        adjacenyMatrix.push_back(edges);
    }
    return Graph(adjacenyMatrix);
};

int main()
{
    init();
    Graph graph = getGraph();
    cout << "firstShortestWay: " << endl;
    for (auto i: graph.firstShortestWay())
        std::cout << i << ' ';

    cout << endl << "secondShortestWay: " <<endl;
    for (auto i: graph.secondShortestWay())
        std::cout << i << ' ';

    cout << endl << "thirdShortestWay: " << endl;
    for (auto i: graph.thirdShortestWay())
        std::cout << i << ' ';

    return 0;
}