pragma solidity >0.4.2;


contract TresRaya {
    enum Opciones {vacio, jugador1, jugador2}

    address player1;
    address player2;
    Opciones turno;
    Opciones[3][3] tablero;

    function reset() public {
        player1 = address(0);
        player2 = address(0);
        turno = Opciones.vacio;
        tablero[0][0] = Opciones.vacio;
        tablero[0][1] = Opciones.vacio;
        tablero[0][2] = Opciones.vacio;
        tablero[1][0] = Opciones.vacio;
        tablero[1][1] = Opciones.vacio;
        tablero[1][2] = Opciones.vacio;
        tablero[2][0] = Opciones.vacio;
        tablero[2][1] = Opciones.vacio;
        tablero[2][2] = Opciones.vacio;
    }

    constructor() public {
        reset();
    }

    function getTablero(uint i, uint j) public view returns (uint) {
        if (tablero[i][j] == Opciones.jugador1){
            return 1;
        } else {
            if (tablero[i][j] == Opciones.jugador2) {
                return 2;
            } else {
                return 0;
            }
        }
    }

    function hayHueco() public view returns(bool){
        return player1 == address(0) || player2 == address(0);
    }

    function hayJugador1() public view returns(bool){
        return player1 != address(0);
    }

    function setPlayer1() public {
        player1 = msg.sender;
    }

    function setPlayer2() public {
        // require(player1 != msg.sender, "Los jugadores tienen que ser distintos");
        player2 = msg.sender;
    }

    event movimientoRealizado(uint x, uint y, uint turno,uint ganador);

    function movimiento(uint x, uint y) public{
        if (turno == Opciones.vacio) {
            turno = Opciones.jugador1;
        }
        // uint salida = 0;
        // require(
        //     turno == Opciones.jugador1 && msg.sender == player1,
        //     "Es el turno del jugador 1"
        // );
        // require(
        //     turno == Opciones.jugador2 && msg.sender == player2,
        //     "Es el turno del jugador 2"
        // );
        require(tablero[x][y] == Opciones.vacio, "Posición no valida");
        tablero[x][y] = turno;
        Opciones ganador = hayGanador();
        uint intganador;
        uint intturno;
        if(ganador == Opciones.jugador1){intganador = 1;}
        if(ganador == Opciones.jugador2){intganador = 2;}
        if(ganador == Opciones.vacio){intganador = 0;}
        if(turno == Opciones.jugador1){intturno = 1;}
        if(turno == Opciones.jugador2){intturno = 2;}
        emit movimientoRealizado(x, y, intturno, intganador);
        if (ganador != Opciones.vacio) {
            // if (ganador == Opciones.jugador1) {
            //     salida = 1;
            // } else {
            //     salida = 2;
            // }
            reset();
        } else {
            if (turno == Opciones.jugador1) {
                turno = Opciones.jugador2;
            } else {
                turno = Opciones.jugador1;
            }
        }
    }

    function hayGanador() private view returns (Opciones) {
        // Comprobamos las filas y las columnas
        for (uint256 i = 0; i < 3; i++) {
            // filas
            if (
                tablero[i][0] == tablero[i][1] && tablero[i][0] == tablero[i][2]
            ) {
                if (tablero[i][0] == Opciones.jugador1) {
                    return Opciones.jugador1;
                }
                if (tablero[i][0] == Opciones.jugador2) {
                    return Opciones.jugador2;
                }
            }
            // columnas
            if (
                tablero[0][i] == tablero[1][i] && tablero[0][i] == tablero[2][i]
            ) {
                if (tablero[0][i] == Opciones.jugador1) {
                    return Opciones.jugador1;
                }
                if (tablero[0][i] == Opciones.jugador2) {
                    return Opciones.jugador2;
                }
            }
        }
        // Diagonales
        if (tablero[0][0] == tablero[1][1] && tablero[0][0] == tablero[2][2]) {
            if (tablero[0][0] == Opciones.jugador1) {
                return Opciones.jugador1;
            }
            if (tablero[0][0] == Opciones.jugador2) {
                return Opciones.jugador2;
            }
        }
        if (tablero[0][2] == tablero[1][1] && tablero[0][2] == tablero[2][0]) {
            if (tablero[0][2] == Opciones.jugador1) {
                return Opciones.jugador1;
            }
            if (tablero[0][2] == Opciones.jugador2) {
                return Opciones.jugador2;
            }
        }
        // Si no se a encontrado ganador devolvemos vacio
        return Opciones.vacio;
    }
}
