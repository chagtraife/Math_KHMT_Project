
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
using path_t = vector<int>;
using matrix_t = vector<vector<int>>;

class Graph {
public:
    Graph(matrix_t adjacenyMatrix): m_adjacenyMatrix(adjacenyMatrix)
    {
        removeNodes.assign(size(), false);
    };

    matrix_t getMaxtix() const{
        return m_adjacenyMatrix;
    };

    void removeEgde(int node_1, int node_2){
        m_adjacenyMatrix[node_1][node_2] = 0;
    };

    int getWeight(int node_1, int node_2) {
        return m_adjacenyMatrix[node_1][node_2];
    }

    int size(){
        return m_adjacenyMatrix.size();
    }

    void removeNode(int node){
        removeNodes[node] = true;
    };

    vector<bool> removeNodes;
private:
    matrix_t m_adjacenyMatrix;
};

path_t dijkstra(int src, int dest, Graph graph){
    // use dijkstra:
    int V = graph.size();
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
            if (graph.getWeight(u,v) > 0 && !T[v] && !graph.removeNodes[v]){
                if (d[v] == 0){
                    d[v]= graph.getWeight(u,v);
                    p[v] = u;
                }
                if (d[v] > d[u] + graph.getWeight(u,v)){
                    d[v] = d[u] + graph.getWeight(u,v);
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
    shortestWay.push_back(dest);
    if (d[dest] > 0){
        while (k != src)
        {
            shortestWay.push_back(p[k]);
            k = p[k];
        }
    }
    std::reverse(shortestWay.begin(), shortestWay.end());
    return shortestWay;
}

path_t YenKSP(int src, int dest,  Graph graph, int K){
    vector<path_t> A(K);
   // Tính toán đường đi ngắn nhất đầu tiên nhờ vào thuật toán Dijkstra. Từ node bắt đầu đến node đích.
   A[0] = dijkstra(src, dest, graph);
   // Khởi tạo tập hợp B lưu trữ những đường đi có khả năng trở thành K đường đi ngắn nhất.
   vector<path_t> B;
  
    for (int k = 1; k < K; k++){
       // Giả định node-I thỏa mãn Ak-I = Rk-I + Sk-I, với node-I thuộc Ak-1
        for (int i = 0; i < size(A[k - 1]) - 1; i++){
            Graph newGraph(graph);
           // Xác định node-I trung gian là node bắt đầu để tính Sk-i
           int spurNode = A[k-1][i];
           // Xác định Rk-I là đường đi từ node-1 đến node-I bằng cách đi Ak-1
           path_t rootPath (A[k-1].begin(), A[k-1].begin() + i);
          
            for (int j = 0; j < k; j++){
                path_t p = A[j];
                path_t p_(p.begin(), p.begin()+i);
                if (std::equal(rootPath.begin(), rootPath.end(), p_.begin())){
                    // Remove the links that are part of the previous shortest paths which share the same root path.
                    newGraph.removeEgde(p[i], p[i+1]);
                }
            }
          
            for (int node : rootPath){
                newGraph.removeNode(node);
            }
          
           // Tính toán Sk-I với điểm bắt đầu là I và điểm kết thúc là node-n bằng thuật toán Dijkstra.
           path_t spurPath = dijkstra(spurNode, dest, newGraph);
          
           // Kết quả đường đi với node-I trung gian được tính từ kết quả Rk-I + Sk-i
            path_t totalPath(rootPath);
            totalPath.insert( totalPath.end(), spurPath.begin(), spurPath.end());
           // Lưu kết quả đường đi thành một kết quả có khả năng trở thành một đường đi ngắng nhất.
           if (!totalPath.empty()){
                B.push_back(totalPath);
           }
        }
                  
        if(B.empty()){
            break;
            // Nếu tập hợp B là rỗng, xác định thuật toán kết thúc, không thể tìm đủ k đường đi.
        }
           
        // Sắp xếp tập hợp B theo giá trị độ dài những đường đi khả dĩ tăng dần.
        int d_min = 0;
        int bMinId = 0;
        for (int i = 0; i < B.size(); i++){
            path_t p = B.at(i);
            int d = 0;
            for (int j = 0; j < p.size()-1; j++){
                d += graph.getWeight(j,j+1);
            }

            if (d_min == 0 || d_min > d){
                d_min = d;
                bMinId = i;
            }
        }

        // Lưu giá trị của đường đi thứ k bằng đường đi ngắn nhất có trong B.
        A[k] = B[bMinId];
        // Loại kết quả Ak ra khỏi B.
        B.erase(B.begin() + bMinId);
    }
   return A[K-1];
}

path_t getFirstShortestWay(int src, int dest, Graph graph)
{
    return dijkstra(src, dest, graph);
}

path_t getSecondShortestWay(int src, int dest, Graph graph)
{
    return YenKSP(src, dest, graph, 2);
}

path_t getThirdShortestWay(int src, int dest, Graph graph)
{
    return YenKSP(src, dest, graph, 3);
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
    cout << "Vertex Number of graph: " << V << endl;
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
    cout << "firstShortestWay 0 -> 4: " << endl;
    for (auto i: getFirstShortestWay(0, 4, graph))
        std::cout << i << ' ';

    cout << endl << "secondShortestWay 0 -> 4: " <<endl;
    for (auto i: getSecondShortestWay(0, 4, graph))
        std::cout << i << ' ';

    cout << endl << "thirdShortestWay 0 -> 4: " << endl;
    for (auto i: getThirdShortestWay(0, 4, graph))
        std::cout << i << ' ';

    return 0;
}