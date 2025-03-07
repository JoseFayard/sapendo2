import { useLocation } from "react-router";
import Navbar from "../Components/Navbar";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import { fechaLegible } from "../Utils/funcionesUtiles";
import { useEffect, useRef, useState } from "react";
// import "../Utils/odontograma";

const Odontograma = () => {
  const { state } = useLocation();
  const camada1Ref = useRef(null);
  const camada2Ref = useRef(null);
  const camada3Ref = useRef(null);
  const camada4Ref = useRef(null);

  const [procedimentos, setProcedimentos] = useState([]);
  const [currentProcedimento, setCurrentProcedimento] = useState({
    nombre: null,
    color: null,
    numeroDiente: null,
    caraDiente: null,
    informacionAdicional: null,
    indice: null,
  });
  const [showModal, setShowModal] = useState(false); // State for modal

  // Utility functions (placeholders, MUST be implemented)
  const storage = {
    save: (data) => {
      console.log("Saving data:", data);
      localStorage.setItem("procedimentos", JSON.stringify(data));
    },
    load: () => {
      const storedData = localStorage.getItem("procedimentos");
      return storedData ? JSON.parse(storedData) : [];
    },
  };

  const tamanoDeLaReferencia = 1895;
  const alturaDeLaReferencia = 872;

  const itemsProcedimientos = [
    {
      nombre: "Lesión activa de caries",
      color: "#008000",
    },
    {
      nombre: "Lesión inactiva de caries",
      color: "#FFFF00",
    },
    {
      nombre: "Lesión de caries cavitada",
      color: "#FF0000",
    },
    {
      nombre: "Caries detenida/pigmentación de los surcos",
      color: "#bc6c25",
    },
    {
      nombre: "Restauraciones en buen estado.",
      color: "#0000FF",
    },
    {
      nombre: "Restauración para ser reemplazada",
      color: "#FFC0CB",
    },
    {
      nombre: "Lesión cervical no cariosa",
      color: "#8B0000",
    },
    {
      nombre: "Faceta de desgaste",
      color: "#FA8072",
    },
    {
      nombre: "Limpar Sección",
      color: "#FFFFFF",
    },
    {
      nombre: "Diente Removido",
      color: "#212121",
    },
    {
      nombre: "Otro",
      color: "#008080",
    },
  ];

  let posicionPadre = {
    posicionYInicialDiente: 180,
    margenXEntreDientes: 8,
    margenYEntreDientes: 200,
  };

  let tamanhoColuna = 1000 / 16;
  let tamanoDiente = tamanhoColuna - 2 * posicionPadre.margenXEntreDientes;

  let dimensionesTrapecio = {
    // Base maior será a altura e largura do dente
    // Base menor será 3/4 da base maior
    // Lateral será 1/4 da base maior

    baseMayor: tamanoDiente,
    lateral: tamanoDiente / 4,
    baseMenor: (tamanoDiente / 4) * 3,
  };

  let numeroDientes = {
    superior: [
      "18",
      "17",
      "16",
      "15",
      "14",
      "13",
      "12",
      "11",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
    ],
    inferior: [
      "48",
      "47",
      "46",
      "45",
      "44",
      "43",
      "42",
      "41",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
    ],
  };

  let numeroDeDientePorOrden = new Array();

  /**
   *Define a posição inicial do dente no eixo x a partir de seu índice.
   *
   * @example
   *   definePosicaoXInicialDente(5)
   *
   * @param   {Number}    index      Parâmetro obrigatório
   * @returns {Number}
   */
  const definePosicaoXInicialDente = (index) => {
    if (index === 0)
      return (
        index * tamanoDiente +
        posicionPadre.margenXEntreDientes * index +
        posicionPadre.margenXEntreDientes
      );
    else
      return (
        index * tamanoDiente +
        2 * posicionPadre.margenXEntreDientes * index +
        posicionPadre.margenXEntreDientes
      );
  };

  /**
   * Desenha os dentes com suas respectivas caras.
   *
   * @example
   *   desenharDente(20, 20)
   *
   * @param   {Number} posicionX      Parâmetro obrigatório
   * @param   {Number} posicionY      Parâmetro obrigatório
   */
  const desenharDente = (context1, posicionX, posicionY) => {
    context1.fillStyle = "black";
    context1.strokeStyle = "black";

    /* 1º trapézio */
    context1.beginPath();
    context1.moveTo(posicionX, posicionY);
    context1.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
    context1.lineTo(
      dimensionesTrapecio.baseMenor + posicionX,
      dimensionesTrapecio.lateral + posicionY
    );
    context1.lineTo(
      dimensionesTrapecio.lateral + posicionX,
      dimensionesTrapecio.lateral + posicionY
    );
    context1.closePath();
    context1.stroke();

    /* 2º trapézio */
    context1.beginPath();
    context1.moveTo(
      dimensionesTrapecio.baseMenor + posicionX,
      dimensionesTrapecio.lateral + posicionY
    );
    context1.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
    context1.lineTo(
      dimensionesTrapecio.baseMayor + posicionX,
      dimensionesTrapecio.baseMayor + posicionY
    );
    context1.lineTo(
      dimensionesTrapecio.baseMenor + posicionX,
      dimensionesTrapecio.baseMenor + posicionY
    );
    context1.closePath();
    context1.stroke();

    /* 3º trapézio */
    context1.beginPath();
    context1.moveTo(
      dimensionesTrapecio.lateral + posicionX,
      dimensionesTrapecio.baseMenor + posicionY
    );
    context1.lineTo(
      dimensionesTrapecio.baseMenor + posicionX,
      dimensionesTrapecio.baseMenor + posicionY
    );
    context1.lineTo(
      dimensionesTrapecio.baseMayor + posicionX,
      dimensionesTrapecio.baseMayor + posicionY
    );
    context1.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
    context1.closePath();
    context1.stroke();

    /* 4º trapézio */
    context1.beginPath();
    context1.moveTo(posicionX, posicionY);
    context1.lineTo(
      dimensionesTrapecio.lateral + posicionX,
      dimensionesTrapecio.lateral + posicionY
    );
    context1.lineTo(
      dimensionesTrapecio.lateral + posicionX,
      dimensionesTrapecio.baseMenor + posicionY
    );
    context1.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
    context1.closePath();
    context1.stroke();
  };

  const marcarSecao = (contexto, ordenExibicionDiente, cara) => {
    contexto.lineWidth = 2;
    let color_linea = "orange";
    let posicionY = 0;

    if (ordenExibicionDiente < 17)
      posicionY = posicionPadre.posicionYInicialDiente;
    else {
      ordenExibicionDiente -= 16;
      posicionY =
        dimensionesTrapecio.baseMayor +
        posicionPadre.margenYEntreDientes +
        posicionPadre.posicionYInicialDiente;
    }

    let posicionX = definePosicaoXInicialDente(ordenExibicionDiente - 1);

    /* 1ª zona */
    if (cara === 1) {
      if (contexto) {
        contexto.fillStyle = color_linea;
        contexto.beginPath();
        contexto.moveTo(posicionX, posicionY);
        contexto.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
        contexto.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.closePath();
        contexto.strokeStyle = "orange";
        contexto.stroke();
      }
    }
    /* 2ª zona */
    if (cara === 2) {
      if (contexto) {
        contexto.fillStyle = color_linea;
        contexto.beginPath();
        contexto.moveTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
        contexto.lineTo(
          dimensionesTrapecio.baseMayor + posicionX,
          dimensionesTrapecio.baseMayor + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.closePath();
        //contexto.fill();
        contexto.strokeStyle = "orange";
        contexto.stroke();
      }
    }
    /* 3ª zona */
    if (cara === 3) {
      if (contexto) {
        contexto.fillStyle = color_linea;
        contexto.beginPath();
        contexto.moveTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMayor + posicionX,
          dimensionesTrapecio.baseMayor + posicionY
        );
        contexto.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contexto.closePath();
        contexto.strokeStyle = "orange";
        contexto.stroke();
      }
    }
    /* 4ª zona */
    if (cara === 4) {
      if (contexto) {
        contexto.fillStyle = color_linea;
        contexto.beginPath();
        contexto.moveTo(posicionX, posicionY);
        contexto.lineTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contexto.closePath();
        contexto.strokeStyle = "orange";
        contexto.stroke();
      }
    }
    /* 5ª zona(medio) */
    if (cara === 5) {
      if (contexto) {
        contexto.fillStyle = color_linea;
        contexto.beginPath();
        contexto.moveTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.closePath();
        contexto.strokeStyle = "orange";
        contexto.stroke();
      }
    }
  };

  /**
   * Dá o start no odontograma, Desenhando a estrutura, carregando os dados, etc.
   */
  const iniciaOdontograma = (
    contexto2,
    contexto1,
    camada1,
    camada2,
    camada3,
    camada4
  ) => {
    const options = itemsProcedimientos.map((problema) => {
      return `\n<option value='${problema.nombre}'>${problema.nombre}</option>`;
    });
    document.querySelector("#nombreProcedimiento").innerHTML += options;

    document
      .querySelector("#nombreProcedimiento")
      .addEventListener("change", (event) => {
        let procedimento = document.querySelector("#nombreProcedimiento");
        if (procedimento.value !== "") {
          procedimento = itemsProcedimientos.find(
            (problemaAtual) => problemaAtual.nombre === procedimento.value
          );
          document.querySelector("#color").value = procedimento.color;
          if (procedimento.nombre === "Outro") {
            document.querySelector("#color").disabled = false;
            document.getElementById("colOutroProcedimento").style.display =
              "block";
          } else {
            document.querySelector("#color").disabled = true;
            document.getElementById("colOutroProcedimento").style.display =
              "none";
          }
        } else {
          document.querySelector("#color").disabled = true;
          document.getElementById("colOutroProcedimento").style.display =
            "none";
        }
      });

    document
      .querySelector("#nombreProcedimiento")
      .dispatchEvent(new Event("change"));

    document.querySelector("#botaoAdicionar").onclick = (event) => {
      procedimento.nombre = document.querySelector(
        "#nombreProcedimiento"
      ).value;
      procedimento.color = document.querySelector("#color").value;
      procedimento.informacionAdicional = document.querySelector(
        "#informacionAdicional"
      ).value;

      procedimento.salvar();

      pintarCara(contexto2, procedimento, "black", procedimento.color);
      actualizarTabla();
    };

    setProcedimentos(storage.load());

    numeroDientes.superior.forEach(
      (numero, index) => (numeroDeDientePorOrden[numero] = index)
    );
    numeroDientes.inferior.forEach(
      (numero, index) => (numeroDeDientePorOrden[numero] = index + 16)
    );

    resizeCanvas(contexto1, contexto2, camada1, camada2, camada3, camada4);
  };

  /**
   * Retorna a ordem de exibição do dente a partir de seu número.
   *
   * @example
   *   obtenerPosicionPorNumeroDeDiente(17); // 2
   *
   * @param   {Number} numero   Parâmetro obrigatório
   * @returns {Number}
   */
  const obtenerPosicionPorNumeroDeDiente = (numero) => {
    return numeroDeDientePorOrden[numero] + 1;
  };

  /**
   * Retorna o número do dente a partir de sua ordem de exibição.
   *
   * @example
   *   getNumeroDentePorOrdemExibicao(2); // 17
   *
   * @param   {Number} ordem   Parâmetro obrigatório
   * @returns {Number}
   */
  const getNumeroDentePorOrdemExibicao = (ordem) => {
    return numeroDeDientePorOrden.indexOf(ordem - 1);
  };

  /**
   * Retorna Todos os procedimentos adicionados para o dente informado.
   *
   * @example
   *   getProcedimentosPorDente(17); // [{...}]
   *
   * @param   {Number} numero   Parâmetro obrigatório
   * @returns {Array}
   */
  const getProcedimentosPorDente = (numero, cara) => {
    return procedimentos.filter(
      (procedimento) =>
        procedimento.numeroDiente === numero && procedimento.caraDiente === cara
    );
  };

  // Procedimento class (adapted for React state)
  const valido = (proc) => {
    return proc.nombre && proc.color && proc.numeroDiente && proc.caraDiente;
  };

  const criaObjeto = (proc) => {
    return {
      nombre: proc.nombre,
      color: proc.color,
      numeroDiente: proc.numeroDiente,
      caraDiente: proc.caraDiente,
      informacionAdicional: proc.informacionAdicional,
    };
  };

  const salvarProcedimento = (proc) => {
    if (valido(proc)) {
      const existingIndex = procedimentos.findIndex(
        (p) =>
          p.nombre === proc.nombre &&
          p.numeroDiente === proc.numeroDiente &&
          p.caraDiente === proc.caraDiente
      );

      const updatedProcedimentos = [...procedimentos];
      if (existingIndex === -1) {
        updatedProcedimentos.push(criaObjeto(proc));
      } else {
        updatedProcedimentos[existingIndex] = criaObjeto(proc);
      }
      setProcedimentos(updatedProcedimentos);
      storage.save(updatedProcedimentos);
    }
  };

  const removerProcedimento = (proc) => {
    const updatedProcedimentos = procedimentos.filter(
      (p) =>
        !(
          p.nombre === proc.nombre &&
          p.numeroDiente === proc.numeroDiente &&
          p.caraDiente === proc.caraDiente
        )
    );

    setProcedimentos(updatedProcedimentos);
    storage.save(updatedProcedimentos);
  };

  // --- Event Handlers ---
  const handleMouseMove = (event) => {
    if (!camada1Ref.current || !camada3Ref.current) return;
    const contexto3 = camada3Ref.current.getContext("2d");
    if (!contexto3) return;

    const rect = camada1Ref.current.getBoundingClientRect(); // Get bounding rect
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let tempProcedimento = {
      ...currentProcedimento,
      nombre: null,
      color: null,
      informacionAdicional: null,
      indice: null,
    };
    tempProcedimento = getInformacionDientePosicionActual(
      tempProcedimento,
      x,
      y
    );
    setCurrentProcedimento(tempProcedimento);

    contexto3.clearRect(
      0,
      0,
      camada3Ref.current.width,
      camada3Ref.current.height
    );
    if (
      obtenerPosicionPorNumeroDeDiente(tempProcedimento.numeroDiente) > 0 &&
      tempProcedimento.caraDiente
    ) {
      marcarSecao(
        contexto3,
        obtenerPosicionPorNumeroDeDiente(tempProcedimento.numeroDiente),
        tempProcedimento.caraDiente
      );
    }
  };

  const handleClick = (event) => {
    if (!camada1Ref.current || !camada4Ref.current) return;

    const rect = camada1Ref.current.getBoundingClientRect(); //get the bounding rectangle of camada1
    const x = event.clientX - rect.left; // Calculate x relative to camada1
    const y = event.clientY - rect.top; // Calculate y relative to camada1

    let tempProcedimento = {
      ...currentProcedimento,
      nombre: null,
      color: null,
      informacionAdicional: null,
      indice: null,
    };
    tempProcedimento = getInformacionDientePosicionActual(
      tempProcedimento,
      x,
      y
    );
    setCurrentProcedimento(tempProcedimento);

    if (tempProcedimento.caraDiente) {
      setShowModal(true);
    }
    //No need for actualizarTabla, it will be called after state update in useEffect
  };

  const actualizarTabla = () => {
    const tbody = document.getElementById("bodyProcedimentos");
    let trs = "";
    procedimentos
      .filter(
        (prc) =>
          prc.numeroDiente === currentProcedimento.numeroDiente &&
          prc.caraDiente === currentProcedimento.caraDiente
      )
      .forEach((item) => {
        const tr = `
                <tr>
                    <td>
                        ${item.nombre}
                    </td>
                    <td>
                        <input type="color" disabled class="form-control form-control-color" value="${
                          item.color
                        }">
                    </td>
                    <td>
                        ${item.informacionAdicional || "No Especificado"}
                    </td>
                    <td>
                        <a onclick="apagar('${item.nombre}', ${
          item.numeroDiente
        }, ${item.caraDiente})" class="btn btn-danger">
                            <i class="far fa-trash-alt"></i>
                        </a>
                    </td>
                </tr>
            `;
        trs += tr;
      });
    tbody.innerHTML = trs;
  };

  window.apagar = (nombre, numeroDiente, caraDiente) => {
    const procd = procedimentos.find(
      (prc) =>
        prc.nombre === nombre &&
        prc.numeroDiente === numeroDiente &&
        prc.caraDiente === caraDiente
    );
    procedimentos.splice(procedimentos.indexOf(procd), 1);
    storage.save(procedimentos);
    actualizarTabla();
    resizeCanvas();
  };

  const exibirEstrutura = (contexto1) => {
    // document.querySelector("#canva-group").style.display = 'block'

    for (let index = 0; index < 16; index++) {
      const posicionX = definePosicaoXInicialDente(index);
      desenharDente(contexto1, posicionX, posicionPadre.posicionYInicialDiente);
    }

    for (let index = 0; index < 16; index++) {
      const posicionX = definePosicaoXInicialDente(index);
      desenharDente(
        contexto1,
        posicionX,
        posicionPadre.margenYEntreDientes +
          tamanoDiente +
          posicionPadre.posicionYInicialDiente
      );
    }

    numeroDientes.superior.forEach((numero, index) => {
      const posicionX = definePosicaoXInicialQuadrado(index);
      desenharQuadradoNumDente(contexto1, {
        position: {
          x: posicionX,
          y:
            posicionPadre.margenYEntreDientes / 5 +
            tamanoDiente +
            posicionPadre.posicionYInicialDiente,
        },
        primeiroOuUltimoDente: index === 0 || index === 15,
        numeroDiente: numero,
        altura: tamanoDiente / 1.8,
        largura:
          index === 0 || index === 15
            ? tamanoDiente + posicionPadre.margenXEntreDientes
            : tamanoDiente + 2 * posicionPadre.margenXEntreDientes,
      });
    });

    numeroDientes.inferior.forEach((numero, index) => {
      const posicionX = definePosicaoXInicialQuadrado(index);
      desenharQuadradoNumDente(contexto1, {
        position: {
          x: posicionX,
          y:
            posicionPadre.margenYEntreDientes / 5 +
            tamanoDiente / 1.8 +
            tamanoDiente +
            posicionPadre.posicionYInicialDiente,
        },
        primeiroOuUltimoDente: index === 0 || index === 15,
        numeroDiente: numero,
        altura: tamanoDiente / 1.8,
        largura:
          index === 0 || index === 15
            ? tamanoDiente + posicionPadre.margenXEntreDientes
            : tamanoDiente + 2 * posicionPadre.margenXEntreDientes,
      });
    });
  };

  const definePosicaoXInicialQuadrado = (index) => {
    if (index === 0)
      return index * tamanoDiente + posicionPadre.margenXEntreDientes;
    else
      return (
        index * tamanoDiente + 2 * index * posicionPadre.margenXEntreDientes
      );
  };

  const desenharQuadradoNumDente = (contexto1, quadrado) => {
    let tamanhoFonte =
      (40 *
        (quadrado.primeiroOuUltimoDente
          ? quadrado.largura + posicionPadre.margenXEntreDientes
          : quadrado.largura)) /
      118.4375;
    contexto1.font = `${tamanhoFonte}px arial`;
    contexto1.strokeRect(
      quadrado.position.x,
      quadrado.position.y,
      quadrado.largura,
      quadrado.altura
    );
    contexto1.fillText(
      quadrado.numeroDiente,
      quadrado.position.x + tamanoDiente / 2.8,
      quadrado.position.y + tamanoDiente / 2.5
    );
  };

  const pintarCara = (contexto2, procedimento, color_linea, color_interior) => {
    let numeroDiente =
      obtenerPosicionPorNumeroDeDiente(procedimento.numeroDiente) - 1;
    contexto2.fillStyle = color_interior;
    contexto2.strokeStyle = color_linea;

    let posicionY = 0;

    if (numeroDiente < 16) posicionY = posicionPadre.posicionYInicialDiente;
    else {
      numeroDiente -= 16;
      posicionY =
        dimensionesTrapecio.baseMayor +
        posicionPadre.margenYEntreDientes +
        posicionPadre.posicionYInicialDiente;
    }

    const prcdms = getProcedimentosPorDente(
      procedimento.numeroDiente,
      procedimento.caraDiente
    );
    const numeroDivisoes = prcdms.length - 1;
    let dividir = false;
    if (numeroDivisoes > 0) dividir = true;

    let posicionX = definePosicaoXInicialDente(numeroDiente);

    /* 1ª zona */
    if (procedimento.caraDiente === 1 && !dividir) {
      if (contexto2) {
        contexto2.beginPath();
        contexto2.moveTo(posicionX, posicionY);
        contexto2.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
        contexto2.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto2.lineTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto2.closePath();
        contexto2.fill();
        contexto2.stroke();
      }
    } else if (procedimento.caraDiente === 1 && dividir) {
      if (contexto2) {
        const larguraDivisao =
          dimensionesTrapecio.baseMayor / (numeroDivisoes + 1);
        prcdms.forEach((procedimentoItem, divisao) => {
          contexto2.fillStyle = procedimentoItem.color;
          const ultimo = divisao === numeroDivisoes;
          const primeiro = divisao === 0;
          const dentroAreaTriangular =
            larguraDivisao * (divisao + 1) < dimensionesTrapecio.lateral;
          contexto2.beginPath();
          contexto2.moveTo(larguraDivisao * divisao + posicionX, posicionY);
          contexto2.lineTo(
            larguraDivisao * (divisao + 1) + posicionX,
            posicionY
          );
          if (ultimo) {
            contexto2.lineTo(
              dimensionesTrapecio.baseMenor + posicionX,
              dimensionesTrapecio.lateral + posicionY
            );
            contexto2.lineTo(
              larguraDivisao * divisao + posicionX,
              dimensionesTrapecio.lateral + posicionY
            );
          } else if (!primeiro) {
            contexto2.lineTo(
              larguraDivisao * (divisao + 1) + posicionX,
              dimensionesTrapecio.lateral + posicionY
            );
            contexto2.lineTo(
              larguraDivisao * divisao + posicionX,
              dimensionesTrapecio.lateral + posicionY
            );
          } else {
            contexto2.lineTo(
              dimensionesTrapecio.baseMenor + posicionX,
              dimensionesTrapecio.lateral + posicionY
            );
            contexto2.lineTo(
              dimensionesTrapecio.lateral + posicionX,
              dimensionesTrapecio.lateral + posicionY
            );
          }
          contexto2.closePath();
          contexto2.fill();
          contexto2.stroke();
        });
      }
    }

    /* 2ª zona */
    if (procedimento.caraDiente === 2 && !dividir) {
      if (contexto) {
        contexto.beginPath();
        contexto.moveTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.lineTo(dimensionesTrapecio.baseMayor + posicionX, posicionY);
        contexto.lineTo(
          dimensionesTrapecio.baseMayor + posicionX,
          dimensionesTrapecio.baseMayor + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.closePath();
        contexto.fill();
        contexto.stroke();
      }
    } else if (procedimento.caraDiente === 2 && dividir) {
      if (contexto) {
        const larguraDivisao =
          dimensionesTrapecio.baseMayor / (numeroDivisoes + 1);
        prcdms.forEach((procedimentoItem, divisao) => {
          contexto.fillStyle = procedimentoItem.color;
          const ultimo = divisao === numeroDivisoes;
          const primeiro = divisao === 0;
          contexto.beginPath();
          contexto.moveTo(
            dimensionesTrapecio.baseMayor + posicionX,
            larguraDivisao * divisao + posicionY
          );
          contexto.lineTo(
            dimensionesTrapecio.baseMayor + posicionX,
            dimensionesTrapecio.baseMayor + posicionY
          );
          if (ultimo) {
            contexto.lineTo(
              dimensionesTrapecio.baseMenor + posicionX,
              dimensionesTrapecio.baseMenor + posicionY
            );
            contexto.lineTo(
              dimensionesTrapecio.baseMenor + posicionX,
              larguraDivisao * divisao + posicionY
            );
          } else if (!primeiro) {
            contexto.lineTo(
              dimensionesTrapecio.baseMenor + posicionX,
              dimensionesTrapecio.baseMenor + posicionY
            );
            contexto.lineTo(
              dimensionesTrapecio.baseMenor + posicionX,
              larguraDivisao * divisao + posicionY
            );
          } else {
            contexto.lineTo(
              dimensionesTrapecio.baseMenor + posicionX,
              dimensionesTrapecio.baseMenor + posicionY
            );
            contexto.lineTo(
              dimensionesTrapecio.baseMenor + posicionX,
              dimensionesTrapecio.lateral + posicionY
            );
          }
          contexto.closePath();
          contexto.fill();
          contexto.stroke();
        });
      }
    }

    /* 3ª zona */
    if (procedimento.caraDiente === 3 && !dividir) {
      if (contexto) {
        contexto.beginPath();
        contexto.moveTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMayor + posicionX,
          dimensionesTrapecio.baseMayor + posicionY
        );
        contexto.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contexto.closePath();
        contexto.fill();
        contexto.stroke();
      }
    } else if (procedimento.caraDiente === 3 && dividir) {
      if (contexto) {
        const larguraDivisao =
          dimensionesTrapecio.baseMayor / (numeroDivisoes + 1);
        prcdms.forEach((procedimentoItem, divisao) => {
          contexto.fillStyle = procedimentoItem.color;
          const ultimo = divisao === numeroDivisoes;
          const primeiro = divisao === 0;
          const dentroAreaTriangular =
            larguraDivisao * (divisao + 1) < dimensionesTrapecio.lateral;
          contexto.beginPath();
          contexto.moveTo(
            larguraDivisao * divisao + posicionX,
            posicionY + tamanoDiente
          );
          contexto.lineTo(
            larguraDivisao * (divisao + 1) + posicionX,
            posicionY + tamanoDiente
          );
          if (ultimo) {
            contexto.lineTo(
              dimensionesTrapecio.baseMenor + posicionX,
              dimensionesTrapecio.baseMenor + posicionY
            );
            contexto.lineTo(
              larguraDivisao * divisao + posicionX,
              dimensionesTrapecio.lateral +
                posicionY +
                dimensionesTrapecio.baseMenor
            );
          } else if (!primeiro) {
            contexto.lineTo(
              larguraDivisao * (divisao + 1) + posicionX,
              dimensionesTrapecio.baseMenor + posicionY
            );
            contexto.lineTo(
              larguraDivisao * divisao + posicionX,
              posicionY + dimensionesTrapecio.baseMenor
            );
          } else {
            contexto.lineTo(
              larguraDivisao * (divisao + 1) + posicionX,
              dimensionesTrapecio.baseMenor + posicionY
            );
            contexto.lineTo(
              posicionX,
              dimensionesTrapecio.lateral +
                posicionY +
                dimensionesTrapecio.baseMenor
            );
          }
          contexto.closePath();
          contexto.fill();
          contexto.stroke();
        });
      }
    }

    /* 4ª zona */
    if (procedimento.caraDiente === 4 && !dividir) {
      if (contexto) {
        contexto.beginPath();
        contexto.moveTo(posicionX, posicionY);
        contexto.lineTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.lineTo(posicionX, dimensionesTrapecio.baseMayor + posicionY);
        contexto.closePath();
        contexto.fill();
        contexto.stroke();
      }
    } else if (procedimento.caraDiente === 4 && dividir) {
      if (contexto) {
        const larguraDivisao =
          dimensionesTrapecio.baseMayor / (numeroDivisoes + 1);
        prcdms.forEach((procedimentoItem, divisao) => {
          contexto.fillStyle = procedimentoItem.color;
          const ultimo = divisao === numeroDivisoes;
          const primeiro = divisao === 0;
          contexto.beginPath();
          contexto.moveTo(posicionX, larguraDivisao * divisao + posicionY);
          contexto.lineTo(
            posicionX,
            larguraDivisao * (divisao + 1) + posicionY
          );
          if (ultimo) {
            contexto.lineTo(
              posicionX + dimensionesTrapecio.lateral,
              dimensionesTrapecio.baseMenor + posicionY
            );
            contexto.lineTo(
              posicionX + dimensionesTrapecio.lateral,
              larguraDivisao * divisao + posicionY
            );
          } else if (!primeiro) {
            contexto.lineTo(
              posicionX + dimensionesTrapecio.lateral,
              dimensionesTrapecio.baseMenor + posicionY
            );
            contexto.lineTo(
              posicionX + dimensionesTrapecio.lateral,
              larguraDivisao * divisao + posicionY
            );
          } else {
            contexto.lineTo(
              posicionX + dimensionesTrapecio.lateral,
              larguraDivisao * (divisao + 1) + posicionY
            );
            contexto.lineTo(
              posicionX + dimensionesTrapecio.lateral,
              dimensionesTrapecio.lateral + posicionY
            );
          }
          contexto.closePath();
          contexto.fill();
          contexto.stroke();
        });
      }
    }

    /* 5ª zona(medio) */
    if (procedimento.caraDiente === 5 && !dividir) {
      if (contexto) {
        contexto.beginPath();
        contexto.moveTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.lateral + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.baseMenor + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.lineTo(
          dimensionesTrapecio.lateral + posicionX,
          dimensionesTrapecio.baseMenor + posicionY
        );
        contexto.closePath();
        contexto.fill();
        contexto.stroke();
      }
    } else if (procedimento.caraDiente === 5 && dividir) {
      if (contexto) {
        const larguraDivisao =
          (dimensionesTrapecio.baseMenor - dimensionesTrapecio.lateral) /
          (numeroDivisoes + 1);
        prcdms.forEach((procedimentoItem, divisao) => {
          contexto.fillStyle = procedimentoItem.color;
          contexto.beginPath();
          contexto.moveTo(
            dimensionesTrapecio.lateral + divisao * larguraDivisao + posicionX,
            dimensionesTrapecio.lateral + posicionY
          );
          contexto.lineTo(
            dimensionesTrapecio.lateral +
              (divisao + 1) * larguraDivisao +
              posicionX,
            dimensionesTrapecio.lateral + posicionY
          );
          contexto.lineTo(
            dimensionesTrapecio.lateral +
              (divisao + 1) * larguraDivisao +
              posicionX,
            dimensionesTrapecio.baseMenor + posicionY
          );
          contexto.lineTo(
            dimensionesTrapecio.lateral + divisao * larguraDivisao + posicionX,
            dimensionesTrapecio.baseMenor + posicionY
          );
          contexto.closePath();
          contexto.fill();
          contexto.stroke();
        });
      }
    }
  };

  const resizeCanvas = (
    contexto1,
    contexto2,
    camada1,
    camada2,
    camada3,
    camada4
  ) => {
    // if (window.innerWidth >= 800) {
    //   document.querySelector("#canva-group").style.display = "display";
    // } else {
    //   alert(
    //     "TELA MUITO PEQUENA! Acesse o odontrograma através de um dispositivo com uma tela maior!"
    //   );
    //   document.querySelector("#canva-group").style.display = "none";
    // }

    camada1.width =
      camada2.width =
      camada3.width =
      camada4.width =
        window.innerWidth - 25;
    const altura =
      (camada1.width * alturaDeLaReferencia) / tamanoDeLaReferencia;
    camada1.height = camada2.height = camada3.height = camada4.height = altura;

    // let valoresBase = {
    //   x: (camada1.width * 24) / tamanoDeLaReferencia,
    //   y: (camada1.width * 20) / tamanoDeLaReferencia,
    //   largura: (camada1.width * 70) / tamanoDeLaReferencia,
    //   altura: (camada1.width * 150) / tamanoDeLaReferencia,
    // };

    // base_image = new Image();
    // base_image.src = "images/dentes/18.png";
    // base_image.onload = function () {
    //   contexto1.drawImage(
    //     base_image,
    //     valoresBase.x,
    //     valoresBase.y,
    //     valoresBase.largura,
    //     valoresBase.altura
    //   );
    // };

    posicionPadre.margenXEntreDientes =
      (camada1.width * 8) / tamanoDeLaReferencia;
    posicionPadre.margenYEntreDientes =
      (camada1.width * 200) / tamanoDeLaReferencia;
    posicionPadre.posicionYInicialDiente =
      (camada1.width * 180) / tamanoDeLaReferencia;

    tamanhoColuna = camada1.width / 16;
    tamanoDiente = tamanhoColuna - 2 * posicionPadre.margenXEntreDientes;

    dimensionesTrapecio = {
      baseMayor: tamanoDiente,
      lateral: tamanoDiente / 4,
      baseMenor: (tamanoDiente / 4) * 3,
    };

    exibeMarcacoes(contexto2);
    exibirEstrutura(contexto1);
  };

  const getInformacionDientePosicionActual = (procedimento, x, y) => {
    if (
      y >= posicionPadre.posicionYInicialDiente &&
      y <= posicionPadre.posicionYInicialDiente + tamanoDiente
    ) {
      if (
        x >= posicionPadre.margenXEntreDientes &&
        x <= posicionPadre.margenXEntreDientes + tamanoDiente
      )
        procedimento.numeroDiente = getNumeroDentePorOrdemExibicao(1);
      else if (
        x >= tamanoDiente + posicionPadre.margenXEntreDientes * 3 &&
        x <= 30 * posicionPadre.margenXEntreDientes + 16 * tamanoDiente
      ) {
        procedimento.indice = parseInt(
          x / (tamanoDiente + 2 * posicionPadre.margenXEntreDientes),
          10
        );
        ini =
          procedimento.indice * tamanoDiente +
          2 * posicionPadre.margenXEntreDientes * procedimento.indice +
          posicionPadre.margenXEntreDientes;
        fin = ini + tamanoDiente;
        if (x >= ini && x <= fin) {
          procedimento.numeroDiente = getNumeroDentePorOrdemExibicao(
            procedimento.indice + 1
          );
        }
      }
    } else if (
      y >=
        tamanoDiente +
          posicionPadre.margenYEntreDientes +
          posicionPadre.posicionYInicialDiente &&
      y <=
        2 * tamanoDiente +
          posicionPadre.margenYEntreDientes +
          posicionPadre.posicionYInicialDiente
    ) {
      if (
        x >= posicionPadre.margenXEntreDientes &&
        x <= posicionPadre.margenXEntreDientes + tamanoDiente
      ) {
        procedimento.numeroDiente = getNumeroDentePorOrdemExibicao(17);
      } else if (
        x >= tamanoDiente + posicionPadre.margenXEntreDientes * 3 &&
        x <= 30 * posicionPadre.margenXEntreDientes + 16 * tamanoDiente
      ) {
        procedimento.indice = parseInt(
          x / (tamanoDiente + 2 * posicionPadre.margenXEntreDientes),
          10
        );
        ini =
          procedimento.indice * tamanoDiente +
          2 * posicionPadre.margenXEntreDientes * procedimento.indice +
          posicionPadre.margenXEntreDientes;
        fin = ini + tamanoDiente;
        if (x >= ini && x <= fin)
          procedimento.numeroDiente = getNumeroDentePorOrdemExibicao(
            procedimento.indice + 17
          );
      }
    }

    let px =
      x -
      (procedimento.indice * tamanoDiente +
        2 * posicionPadre.margenXEntreDientes * procedimento.indice +
        posicionPadre.margenXEntreDientes);
    let py = y - posicionPadre.posicionYInicialDiente;

    if (obtenerPosicionPorNumeroDeDiente(procedimento.numeroDiente) > 16)
      py -= posicionPadre.margenYEntreDientes + tamanoDiente;

    if (py > 0 && py < tamanoDiente / 4 && px > py && py < tamanoDiente - px) {
      procedimento.caraDiente = 1;
    } else if (
      px > (tamanoDiente / 4) * 3 &&
      px < tamanoDiente &&
      py < px &&
      tamanoDiente - px < py
    ) {
      procedimento.caraDiente = 2;
    } else if (
      py > (tamanoDiente / 4) * 3 &&
      py < tamanoDiente &&
      px < py &&
      px > tamanoDiente - py
    ) {
      procedimento.caraDiente = 3;
    } else if (
      px > 0 &&
      px < tamanoDiente / 4 &&
      py > px &&
      px < tamanoDiente - py
    ) {
      procedimento.caraDiente = 4;
    } else if (
      px > tamanoDiente / 4 &&
      px < (tamanoDiente / 4) * 3 &&
      py > tamanoDiente / 4 &&
      py < (tamanoDiente / 4) * 3
    ) {
      procedimento.caraDiente = 5;
    }

    return procedimento;
  };

  /**
   * Exibe todos os procedimentos adicionados nos respectivos dentes e caras
   */
  const exibeMarcacoes = (contexto2) => {
    procedimentos.forEach((element) => {
      pintarCara(contexto2, element, "black", element.color);
    });
  };

  useEffect(() => {
    // Load procedimentos on mount
    const loadedProcedimentos = storage.load();
    setProcedimentos(loadedProcedimentos);

    // Initialize canvas contexts
    const contexto1 = camada1Ref.current
      ? camada1Ref.current.getContext("2d")
      : null;
    const contexto2 = camada2Ref.current
      ? camada2Ref.current.getContext("2d")
      : null;
    const contexto3 = camada3Ref.current
      ? camada3Ref.current.getContext("2d")
      : null; // Get context here
    const contexto4 = camada4Ref.current
      ? camada4Ref.current.getContext("2d")
      : null;

    iniciaOdontograma(
      contexto2,
      contexto1,
      camada1Ref,
      camada2Ref,
      camada3Ref,
      camada4Ref
    );
  }, []);

  useEffect(() => {
    actualizarTabla();
  }, [procedimentos]);

  const handleClose = () => {};

  return (
    <>
      <Navbar />
      <Container maxWidth="" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid2 container spacing={4}>
            <Grid2 item size={{ md: 12 }}>
              <Card>
                <CardContent>
                  <Grid2 container spacing={2} sx={{ marginTop: 1 }}>
                    <Grid2 item size={{ md: 6 }}>
                      <Typography variant="h1">
                        {state?.nombres.toUpperCase()}
                      </Typography>
                      <Typography variant="h1">
                        {state?.apellidos.toUpperCase()}
                      </Typography>
                      {/* <Typography variant="h4">{estudiante?.carrera}</Typography> */}
                    </Grid2>
                    <Grid2 item size={{ md: 6 }}>
                      <Typography variant="h6" sx={{ margin: "10px auto" }}>
                        Cédula: {state?.cedula}
                      </Typography>

                      <Typography variant="h6" sx={{ margin: "10px auto" }}>
                        Teléfono: {state?.telefonoPersona}
                      </Typography>
                      <Typography variant="h6">
                        Dirección: {state?.direccion}
                      </Typography>
                      <Typography variant="h6" sx={{ margin: "10px auto" }}>
                        Correo: {state?.correo}
                      </Typography>
                      <Typography variant="h6" sx={{ margin: "10px auto" }}>
                        Fecha Nacimiento: {fechaLegible(state?.fechaNacimiento)}
                      </Typography>
                    </Grid2>
                  </Grid2>
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 item size={{ md: 12 }} sx={{ marginBottom: 2 }}>
              <Card>
                <CardContent>
                  <div id="canva-group">
                    <canvas ref={camada1Ref} id="camada1Odontograma"></canvas>
                    <canvas ref={camada2Ref} id="camada2Odontograma"></canvas>
                    <canvas ref={camada3Ref} id="camada3Odontograma"></canvas>
                    <canvas
                      ref={camada4Ref}
                      id="camada4Odontograma"
                      onMouseMove={handleMouseMove}
                      onClick={handleClick}
                    ></canvas>
                  </div>
                  <div className="modal fade" id="modal">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="modalLabel">
                            Agregar Procedimiento
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="form-row">
                            <input
                              type="hidden"
                              id="procedimentosRemovidos"
                              th:field="*{procedimentosRemovidos}"
                            />
                            <div id="procedimentosDiv"></div>
                            <div className="form-group col-md-12">
                              <label htmlFor="nombreProcedimiento">
                                Nombre
                              </label>

                              <select
                                className="form-control"
                                id="nombreProcedimiento"
                              >
                                <option defaultValue={0} value="">
                                  -- Seleccione una opción --
                                </option>
                                {/* <!-- <option th:value="${null}" th:text="${'NÃO INFORMADO'}"></option> -->
                  <!-- <option th:each="model : ${modelEnums}" th:value="${model}" th:text="${model.denominacao}"></option> --> */}
                              </select>
                            </div>
                            <div
                              className="form-group col-12"
                              id="colOutroProcedimento"
                            >
                              <label htmlFor="outroProcedimento">
                                Otro procedimiento
                              </label>

                              <input
                                id="outroProcedimento"
                                className="form-control"
                                type="text"
                              />
                            </div>
                            <div className="form-group col-12">
                              <label
                                htmlFor="exampleColorInput"
                                className="form-label"
                              >
                                Color
                              </label>

                              <input
                                type="color"
                                id="color"
                                disabled
                                className="form-control form-control-color"
                                value="#563d7c"
                                title="Choose your color"
                              />
                            </div>
                            <div className="form-group col-12">
                              <label htmlFor="informacionAdicional">
                                Información Adicional
                              </label>

                              <textarea
                                rows="5"
                                id="informacionAdicional"
                                maxLength="5000"
                                className="form-control"
                              ></textarea>
                            </div>
                            <div
                              className="form-group col-md-1 d-inline mt-2"
                              style={{ textAlign: "center", margin: "auto" }}
                            >
                              <a
                                id="botaoAdicionar"
                                className="form-control btn-sigsaude btnCorNovo"
                              >
                                <i className="fas fa-plus"></i>
                              </a>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <div className="panel panel-default">
                                <div className="table-responsive">
                                  <table
                                    className="table display dataTable table-bordered table-striped"
                                    id="tabelaTestesEspecificosForm"
                                  >
                                    <thead>
                                      <tr>
                                        <th>Nombre</th>
                                        <th>Color</th>
                                        <th>Información Adicional</th>
                                        <th className="text-center">
                                          Acciones
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody id="bodyProcedimentos">
                                      <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </>
  );
};

export default Odontograma;
