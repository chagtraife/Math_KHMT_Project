
#include <iostream>
#include <vector>
using namespace std;
using path_t = vector<int>;
using matrix_t = vector<vector<int>>;

std::pair<path_t, int> dijkstra(int src, int dest, matrix_t adjacenyMatrix){
    // use dijkstra:
    int V = adjacenyMatrix.size();
    int d[V] = {}; // d[v]: chi phí của nut nguồn tới nút đích v
    int p[V] = {}; // P[v]: nút ngay trước nút v trên đường đi từ nguồn tới đích
    bool T[V] = {};

    int dmin;
    int pmin = src;
    for (int i = 0; i < V; i++){
        T[pmin] = true;
        int u = pmin;
        dmin = 0;
        for (int v = 0; v < V; v++){
            if (adjacenyMatrix[u][v] > 0 && !T[v]){
                if (d[v] == 0){
                    d[v]= adjacenyMatrix[u][v];
                    p[v] = u;
                }
                if (d[v] > d[u] + adjacenyMatrix[u][v]){
                    d[v] = d[u] + adjacenyMatrix[u][v];
                    p[v] = u;
                }
                if (dmin == 0 || dmin > d[v]){
                    dmin = d[v];
                    pmin = v;
                }
            }
        }
    }

    int k = dest;
    path_t shortestWay;
    if (d[dest] > 0){
        while (k != src)
        {
            shortestWay.push_back(p[k]);
            k = p[k];
        }
    }
    return std::make_pair(shortestWay, d[dest]);
}

class Graph {
public:
    Graph(matrix_t adjacenyMatrix): m_adjacenyMatrix(adjacenyMatrix)
    {
    };
    path_t getFirstShortestWay(int src, int dest);
    path_t getSecondShortestWay(int src, int dest);
    path_t getThirdShortestWay(int src, int dest);
    path_t getKShortestWay(int src, int dest, int k);

private:
    matrix_t m_adjacenyMatrix; 
};

path_t Graph::getFirstShortestWay(int src, int dest)
{
    return dijkstra(src, dest, m_adjacenyMatrix).first;
}

path_t Graph::getSecondShortestWay(int src, int dest)
{
    path_t firstShortestWay = getFirstShortestWay(src, dest);
    std::pair<path_t, int> secondShortestWay(path_t(), 0);
    for (int i = 0; i < firstShortestWay.size() - 1; i++){
        matrix_t matrix(m_adjacenyMatrix);
        matrix[firstShortestWay[i]][firstShortestWay[i+1]] = 0;
        matrix[firstShortestWay[i+1]][firstShortestWay[i]] = 0;
        std::pair<path_t, int> shortestWay;
        shortestWay = dijkstra(src, dest, matrix);
        if (secondShortestWay.second == 0 || secondShortestWay.second > shortestWay.second){
            secondShortestWay = shortestWay;
        }
    }
    
    return secondShortestWay.first;
}

path_t Graph::getThirdShortestWay(int src, int dest)
{

    return path_t {3, 3, 3};
}

path_t Graph::getKShortestWay(int src, int dest, int k)
{
    return path_t {4, 4, 4};
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
    cout << "firstShortestWay 0 -> 2: " << endl;
    for (auto i: graph.getFirstShortestWay(0, 2))
        std::cout << i << ' ';

    cout << endl << "secondShortestWay 0 -> 2: " <<endl;
    for (auto i: graph.getSecondShortestWay(0, 2))
        std::cout << i << ' ';

    cout << endl << "thirdShortestWay 0 -> 2: " << endl;
    for (auto i: graph.getThirdShortestWay(0, 2))
        std::cout << i << ' ';

    return 0;
}