pragma solidity >0.4.2;

contract Diario{

    struct Entrada {
        string contenido;
        uint256 fecha;
    }

    mapping (address => mapping(uint => Entrada)) private entradas;
    mapping (address => uint) private numEntradas;

    function getOwnNumEntradas() public view returns (uint) {
        return numEntradas[msg.sender];
    }

    function setEntrada(string memory contenido, uint256 fecha) public {
        uint numEnt = getOwnNumEntradas();
        if (numEnt != 0) {
            require(entradas[msg.sender][numEnt].fecha < fecha, "La fecha introducida debe ser mayor que la de la anterior entrada");
        }
        numEntradas[msg.sender]++;
        numEnt = getOwnNumEntradas();
        Entrada memory nuevaEntrada = Entrada(contenido, fecha);
        entradas[msg.sender][numEnt] = nuevaEntrada;
    }

    function getContenidoEntada(uint i) public view returns (string memory) {
        return entradas[msg.sender][i].contenido;
    }

    function getFechaEntrada(uint i) public view returns (uint256) {
        return entradas[msg.sender][i].fecha;
    }

}