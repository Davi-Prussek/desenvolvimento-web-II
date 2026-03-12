<script setup>
import { ref } from 'vue';
// #region variáveis principais
const add_section = ref(false);
const completa_section = ref(false);
const delete_section = ref(false);

const tarefas = ref([]);
const tarefasConcluidas = ref([]);

const nome = ref("");
const desc = ref("");
const dataInicio = ref('');
const dataFinal = ref('');
const importancia = ref('');

const aviso = ref("");
const tempo = 1700;
const tarefaConcluida = ref(null);
const tarefaEditada = ref(null);
// #endregion

// #region function

// #region validações
//Validação de nome
function validarNome(nome) {

  //Validação de nome vazio
  if (nome.length !== 0) {

    //Validação de nome com números
    if (!/[a-zA-Z]/.test(nome)) {
      aviso.value = 'O nome da tarefa deve ter apenas letras'
      setTimeout(() => {
        aviso.value = '';
      }, tempo);
      return false;
    }
    else {
      return true;
    }
  }
  else if (nome.length == 0) {
    aviso.value = 'O nome da tarefa não pode ficar em branco'
    setTimeout(() => {
      aviso.value = '';
    }, tempo);
    return false;
  }
}

//Validação se a descrição tem até 500 linhas
function validarDesc(desc) {
  if (desc.length > 500) {
    aviso.value = 'A descrição da tarefa deve ter até 500 carácteres'
    setTimeout(() => {
      aviso.value = '';
    }, tempo);
    return false;
  } else if (desc.length <= 500) {
    return true;
  }
}

//Validação se a data inicial é maior que a data final
function validarDatas(dataInicio, dataFinal) {
  if (dataInicio.length !== 0 && dataFinal.length !== 0) {
    if (Date.parse(dataInicio) >= Date.parse(dataFinal)) {
      aviso.value = 'A data limite da tarefa deve ser além da data inicial'
      setTimeout(() => {
        aviso.value = '';
      }, tempo);
      return false;}

    else if (Date.parse(dataInicio) < Date.parse(dataFinal)) {
      return true;}
    }

  else if (dataInicio.length !== 0 || dataFinal.length !== 0) {
    return true;
  }

  else if (dataInicio.length == 0 && dataFinal.length == 0) {
    return true;
  }
}
// #endregion

//Registra a tarefa caso todas as informações passem pela validação, zera as variáveis e fecha a aba de adicionar tarefa
function registrar() {

  if (validarNome(nome.value) && validarDesc(desc.value) && validarDatas(dataInicio.value, dataFinal.value)) {
    tarefas.value.push(
      {
        nome: nome.value,
        desc: desc.value,
        dataInicio: dataInicio.value,
        dataFinal: dataFinal.value,
        status: 'incompleta',
        importancia: importancia.value
      }
    );
    nome.value = '';
    desc.value = '';
    dataInicio.value = '';
    dataFinal.value = '';
    importancia.value = '';
    add_section.value = !add_section.value;
  }
}

//Função que conclui a tarefa e tira ela da lista
function concluirTarefa(tarefa) {
  tarefasConcluidas.value.push(tarefa);
  completa_section.value = !completa_section.value;
  tarefaConcluida.value = tarefa;
  tarefas.value.splice(tarefas.value.indexOf(tarefa), 1);
  setTimeout(() => {
    completa_section.value = !completa_section.value;
  }, 1500);
}

//Função que abre a opção de fonfirmação de apagar a tarefa
function excluirTarefa(tarefa) {
  tarefaConcluida.value = tarefa;
  delete_section.value = !delete_section.value;
}

//Função que exclui a tarefa do botão selecionado caso a resposta da confirmação seja sim
function confirmDelete() {
  tarefas.value.splice(tarefas.value.indexOf(tarefaConcluida.value), 1);
  delete_section.value = !delete_section.value;
}

function pegarValoresTarefa() {
  return {
    nome: tarefaConcluida.value.nome,
    desc: tarefaConcluida.value.desc,
    dataInicio: tarefaConcluida.value.dataInicio,
    dataFinal: tarefaConcluida.value.dataFinal,
  }
}

function controleRegistro() {
  nome.value = '';
  desc.value = '';
  dataInicio.value = '';
  dataFinal.value = '';
  importancia.value = '';
  add_section.value = !add_section.value;
}

function dataBonitinha(data) {
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function editarTarefa(tarefa) {
tarefaEditada.value = tarefa;
add_section.value = !add_section.value;
nome.value = tarefaEditada.value.nome;
desc.value = tarefaEditada.value.desc;
dataInicio.value = tarefaEditada.value.dataInicio;
dataFinal.value = tarefaEditada.value.dataFinal;
importancia.value = tarefaEditada.value.importancia;
tarefas.value.splice(tarefas.value.indexOf(tarefa),1);
}
// #endregion
</script>

<template>
   <main style="display: flex; justify-content: space-around;">
    <!-- Sessão de confirmação de tarefa -->
    <!-- #region delete_section -->
    <div v-if="delete_section" class="delete">
      <h2>Certeza que deseja apagar a seguinte tarefa?</h2>
      <div>
        <h2>{{ tarefaConcluida.nome }} </h2>
        <p>{{ tarefaConcluida.desc }}</p>
      </div>
      <div style="display: flex; justify-content: center; gap: 2vw;">
        <button @click="confirmDelete()">Sim</button>
        <button @click="delete_section = !delete_section">Não</button>
      </div>
    </div>
    <!-- #endregion -->

    <!-- Sessão de exibições de informações da tarefa concluída -->
    <!-- #region complete_region -->
    <div class="complete" v-if="completa_section">
      <h2>Tarefa concluída: {{ pegarValoresTarefa().nome }}</h2>
      <p>descrição da tarefa: {{ pegarValoresTarefa().desc }}</p>
    </div>
    <!-- endregion -->

    <!-- Sessão de registro de tarefas -->
    <!-- #region add_section -->
    <div v-if="add_section" class="form" @keypress.enter="registrar">
      <button @click="controleRegistro">fechar</button>
      <div>
        <label for="nome">Nome da tarefa:</label> <input id="nome" type="text" v-model="nome"
        placeholder="Nome da tarefa">
        <label for="importância">Prioridade</label>
        <select v-model="importancia" id="importância" name="importância">
          <option disabled value="">importância</option>
          <option value="verde">não importante</option>
          <option value="amarelo">pouco importante</option>
          <option value="vermelho">muito importante</option>
        </select>
      </div>
      <label for="desc">Descrição da tarefa:</label> <input id="desc" type="text" v-model="desc"
        placeholder="Descrição da tarefa">
      <div>
        <label for="data_inicio">Data de início:</label> <input id="data_inicio" type="datetime-local"
          v-model="dataInicio">
        <label for="Data_final">Data final:</label> <input id="Data_final" type="datetime-local" v-model="dataFinal">
      </div>
      <button @click="registrar">Registrar tarefa</button>
      <p>Teste: {{ aviso }}</p>
    </div>
    <!-- endregion -->

    <!-- Conteúdo fixo da tela -->
    <!-- #region add_section -->
    <div>
      <button @click="controleRegistro"
        style="font-size: 1.5vw; border-radius: 12px; border: none; box-shadow: 0px 5px 0px 0px black; padding: 0.5vw;">Adicionar
        tarefa ⬇</button>
      lista de tarefas

      <!-- Itens da lista de tarefas que serão exibidos na tela fixa -->
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 1.5vw;">
        <li v-for="(tarefa, index) in tarefas" :key="index" style="padding: 1vw;" :style="{border: tarefa.importancia == 'verde' ? '2px solid green' : tarefa.importancia == 'amarelo' ? '2px solid yellow' : tarefa.importancia == 'amarelo' ? '2px solid red' : '2px solid gray'}">
          <div style="display: flex; align-items: center; gap: 2vw;">
            <h2>{{ tarefa.nome }}</h2>
            <div style="display: flex; align-items: center; gap: 0.2vw;">
              <p><strong>importância:</strong> {{ tarefa.importancia == 'verde' ? 'não importante' : tarefa.importancia == 'amarelo' ? 'pouco importante' : tarefa.importancia == 'vermelho' ? 'muito importante' : 'padrão'}}</p>
              <div style="width: 1.3vw; height: 1.3vw;border-radius: 50%;" :style="{backgroundColor: tarefa.importancia == 'verde' ? 'green' : tarefa.importancia == 'amarelo' ? 'yellow' : tarefa.importancia == 'vermelho' ? 'red' : 'gray'}"></div>
            </div>
          </div>
          <p>{{ tarefa.desc }}</p>
          <div style="display: flex; gap: 2vw;">
            <p v-if="tarefa.dataInicio.length !== 0"><strong>data inicial:</strong> {{ dataBonitinha(tarefa.dataInicio) }}</p>
            <p v-if="tarefa.dataFinal.length !== 0"><strong>data final:</strong> {{ tarefa.dataFinal }}</p>
          </div>
          <div style="display: flex; gap: 1.5vw;">
            <button @click="concluirTarefa(tarefa); tarefa.status = 'completa';">Concluir Tarefa</button>
            <button @click="excluirTarefa(tarefa)">Excluir Tarefa</button>
            <button @click="editarTarefa(tarefa)">Editar Tarefa</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- #endregion -->

    <!-- Conteúdo das listas concluídas -->
     <!-- #region concluidas -->

    <div :style="{visibility: tarefasConcluidas.length == 0 ? 'hidden' : 'visible'}">
      <h2>
        lista de tarefas concluídas:
        <button @click="tarefasConcluidas = [];">Limpar</button>
      </h2>
      <ul style="list-style: none;">
      <li v-for="(tarefa, index) in tarefasConcluidas" :key="index">
        <h4><strong>Nome: </strong>{{ tarefa.nome }}</h4>
        <p>Descrição: {{ tarefa.desc }}</p>
      </li>
    </ul>
    </div>
    <!-- endregion -->
</main>
</template>

<style scoped>
body,
html,
main {
  display: flex;
}

.delete {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.132);
  padding: 2vw 1vw;
  border-radius: 24px;
  div button {
    border: none;
    font-size: 1.3vw;
    padding: 0.3vw;
    border-radius: 12px;
  }
}

.form {
  border-radius: 24px;
  padding: 3vw 2vw;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.132);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 2;

  #desc {
    padding: 1vw 0.5vw;
  }

  div {
    display: flex;
  }
}

.complete {
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.132);
  z-index: 3;
  padding: 2vw 1vw;
}
</style>
