// objeto do usuário
const usuario = { nome: "Bissacot", matricula: "1363", pendencia: false, acessibilidade: false };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  // Verificar se o usuário tem pendências
  if (usuario.pendencia) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Você não pode reservar um armário enquanto tiver pendências.`;
    return;
  }

  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // na lista, filtrar apenas os armários que estão disponíveis e que são acessíveis ao usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário do tipo ${tipoSelecionado} está disponível.`;
    return;
  }
  
  // Caso exista armário(s) disponível, seguimos sorteando uma opção. 
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Obter a data e hora do momento da reserva
  let dataReserva = new Date();
  armarioSorteado.dataReserva = dataReserva;
  
  // Calcular a data e hora para entrega das chaves (prazo de 24h)
  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioSorteado.dataEntrega = dataEntrega;
  
  // Atualizar o status do armário sorteado
  armarioSorteado.status = false;
  
  // Finalmente, mudamos a pendência do usuário para verdadeira.
  usuario.pendencia = true;
  
  // Imprimimos uma mensagem de reserva para o usuário.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! Data e hora de entrega: ${dataEntrega.toLocaleString()}`;

  console.log(usuario);
  console.log(armarios);
}