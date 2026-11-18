function ler(formulario, nome) {
    return Number(new FormData(formulario).get(nome));
}

function mostrarResultado(formulario, mensagem) {
    const resultado = formulario.parentElement.querySelector(".resultado");
    resultado.textContent = mensagem;
    resultado.hidden = false;
}

const moeda = valor => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const decimal = valor => valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const form1 = document.getElementById("form1");
form1.addEventListener("submit", evento => {
    evento.preventDefault();
    const cotacao = ler(form1, "cotacao");
    const aumentos = [1, 2, 5, 10];
    const resultado = aumentos.map(percentual => `${percentual}%: ${moeda(cotacao * (1 + percentual / 100))}`);
    mostrarResultado(form1, resultado.join("\n"));
});

const form2 = document.getElementById("form2");
form2.addEventListener("submit", evento => {
    evento.preventDefault();
    const pessoas = ler(form2, "pessoas");
    mostrarResultado(form2, `Ovos: ${pessoas * 2}\nQueijo: ${pessoas * 50} gramas`);
});

const form3 = document.getElementById("form3");
form3.addEventListener("submit", evento => {
    evento.preventDefault();
    const numero1 = ler(form3, "numero1");
    const numero2 = ler(form3, "numero2");
    const divisao = numero2 === 0 ? "não é possível dividir por zero" : decimal(numero1 / numero2);
    mostrarResultado(form3, `Soma: ${numero1 + numero2}\nSubtração: ${numero1 - numero2}\nMultiplicação: ${numero1 * numero2}\nDivisão: ${divisao}`);
});

const form4 = document.getElementById("form4");
form4.addEventListener("submit", evento => {
    evento.preventDefault();
    const dados = new FormData(form4);
    const sabores = ["sabor1", "sabor2", "sabor3", "sabor4"].map(nome => dados.get(nome).trim());
    const refrigerantes = ler(form4, "refrigerantes");
    const total = 4 * 12 + refrigerantes * 7;
    mostrarResultado(form4, `Sabores: ${sabores.join(", ")}\nRefrigerantes: ${refrigerantes}\nTotal: ${moeda(total)}`);
});

const form5 = document.getElementById("form5");
form5.addEventListener("submit", evento => {
    evento.preventDefault();
    const dados = new FormData(form5);
    const anoAtual = new Date().getFullYear();
    const pessoas = [1, 2, 3].map(numero => ({
        nome: dados.get(`nome${numero}`).trim(),
        idade: anoAtual - ler(form5, `ano${numero}`)
    }));
    pessoas.sort((a, b) => b.idade - a.idade);
    const resultado = pessoas.map((pessoa, indice) => {
        const posicao = indice === 0 ? "Pessoa mais velha" : indice === 1 ? "Segunda pessoa" : "Terceira pessoa";
        return `${posicao}: ${pessoa.nome} - ${pessoa.idade} anos`;
    });
    mostrarResultado(form5, resultado.join("\n"));
});

const form6 = document.getElementById("form6");
form6.addEventListener("submit", evento => {
    evento.preventDefault();
    const nota = ler(form6, "nota");
    let resultado;
    if (nota < 6 && nota > 4) resultado = "precisa fazer prova substitutiva";
    else if (nota > 6) resultado = "aprovado";
    else resultado = "reprovado";
    mostrarResultado(form6, resultado);
});

const form7 = document.getElementById("form7");
form7.addEventListener("submit", evento => {
    evento.preventDefault();
    const numero1 = ler(form7, "numero1");
    const numero2 = ler(form7, "numero2");
    let resultado;
    if (numero1 > numero2) resultado = "O primeiro número é maior que o segundo.";
    else if (numero1 < numero2) resultado = "O primeiro número é menor que o segundo.";
    else resultado = "O primeiro número é igual ao segundo.";
    mostrarResultado(form7, resultado);
});

const form8 = document.getElementById("form8");
form8.addEventListener("submit", evento => {
    evento.preventDefault();
    const alunos = ler(form8, "alunos");
    const turmas = ler(form8, "turmas");
    mostrarResultado(form8, `Pessoas por turma: ${Math.floor(alunos / turmas)}\nPessoas sem turma: ${alunos % turmas}`);
});

const form9 = document.getElementById("form9");
form9.addEventListener("submit", evento => {
    evento.preventDefault();
    const vendido = ler(form9, "vendido");
    const meta = ler(form9, "meta");
    const metaMinima = ler(form9, "metaMinima");
    let situacao;
    if (vendido >= meta) situacao = "Atingiu a meta.";
    else if (vendido >= metaMinima) situacao = "Atingiu a meta mínima.";
    else situacao = "Não atingiu nenhuma das metas.";
    const percentualMeta = vendido / meta * 100;
    const percentualMinima = vendido / metaMinima * 100;
    mostrarResultado(form9, `${situacao}\nAtingimento da meta: ${decimal(percentualMeta)}%\nAtingimento da meta mínima: ${decimal(percentualMinima)}%`);
});
