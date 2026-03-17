<script setup>
import { ref,onMounted,onUnmounted } from 'vue';
import { faTrash,faPencil,faCheck,faEllipsis } from '@fortawesome/free-solid-svg-icons';

/*
Tabela de cores = [

Cores_escuras = {
color: #1f0000,
color: #015201,
color: #6d6d00}

Cores_claras = {
color: red,
color: #01bb01,
color: #ffff2b}
]
*/

// #region variáveis principais
const menu = ref(true)
const menuRef = ref(null)
const add_section = ref(false);
const completa_section = ref(false);
const delete_section = ref(false);
const deleteAll_section = ref(false);
const tarefas = ref([
  {
    nome: 'Testando',
    desc: '"a tecnologia transformou profundamente a maneira como vivemos, trabalhamos e nos comunicamos. no centro dessa revolução, a inteligência artificial e a conectividade constante oferecem soluções rápidas para desafios complexos, otimizando o tempo e abrindo novas possibilidades de aprendizado."',
    dataInicio: '',
    dataFinal: '',
    status: 'incompleta',
    importancia: 'Baixa'
  },
  {
    nome: 'Teste 2',
    desc: 'testando 2',
    dataInicio: '',
    dataFinal: '',
    status: 'incompleta',
    importancia: 'Média'
  },
  {
    nome: 'Teste 3',
    desc: 'testando 3',
    dataInicio: '',
    dataFinal: '',
    status: 'incompleta',
    importancia: 'Alta'
  }
]);
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

//Controla os (...) das opções
function abrirConfig(tarefa) {
  if (menu.value === tarefa) {
    menu.value = null
  } else {
    menu.value = tarefa
  }
}

//Função que deixa a primeira letra do nome da tarefa em maiúsculo
function LMP(nome) { return nome.charAt(0).toUpperCase() + nome.toLowerCase().substring(1) };

// #region validações
//Validação de nome
function validarNome(nome) {
  //Validação de nome vazio
  if (nome.length !== 0) {
    if (nome.length <= 40) {
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
    } else {
      aviso.value = 'O nome da tarefa deve ter até 40 caracteres'
      setTimeout(() => {
        aviso.value = '';
      }, tempo);
      return false;
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
      return false;
    }
    else if (Date.parse(dataInicio) < Date.parse(dataFinal)) {
      return true;
    }
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
    if (tarefaEditada.value) {
      tarefas.value.splice(tarefas.value.indexOf(tarefaEditada.value), 1);
      tarefaEditada.value = null;
    }
    tarefas.value.unshift(
      {
        nome: LMP(nome.value),
        desc: LMP(desc.value),
        dataInicio: dataInicio.value,
        dataFinal: dataFinal.value,
        status: 'incompleta',
        importancia: importancia.value == '' ? 'padrão' : importancia.value
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
}
function handleClickOutside(event) {
  const clicouNoBotao = event.target.closest('.more')
  const clicouNoMenu = event.target.closest('.menu')

  if (!clicouNoBotao && !clicouNoMenu) {
    menu.value = null
  }
}
function handleClickOutsideDelete(event) {
  const clicouNoBotao = event.target.closest('.excluir')
  const clicouNoDelete = event.target.closest('.limparPrincipal')

  if (!clicouNoBotao && !clicouNoDelete) {
    add_section.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('click', handleClickOutsideDelete)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('click', handleClickOutsideDelete)
})
// #endregion
</script>

<template>
  <main style="display: flex; justify-content: space-around;">

    <div class="deleteAll" v-if="deleteAll_section">
      <p>Deseja mesmo limpar todas as tarefas registradas?</p>
      <div>
        <button @click="tarefas = []; deleteAll_section = !deleteAll_section">Sim</button>
        <button @click="deleteAll_section = !deleteAll_section">Não</button>
      </div>
    </div>

    <div class="delete" v-if="delete_section">
      <h2>Certeza que deseja apagar a seguinte tarefa?</h2>
      <div>
        <h3>{{ tarefaConcluida.nome }} </h3>
        <p>{{ tarefaConcluida.desc }}</p>
      </div>
      <div style="display: flex; justify-content: center; gap: 2vw;">
        <button @click="confirmDelete()" class="confirm">Sim</button>
        <button @click="delete_section = false" class="desconfirm">Não</button>
      </div>
    </div>

    <div class="complete" v-if="completa_section">
      <h2>Tarefa concluída: {{ pegarValoresTarefa().nome }}</h2>
      <p>descrição da tarefa: {{ pegarValoresTarefa().desc }}</p>
    </div>

    <div class="esquerda">
      <h2 v-if="tarefaEditada == null">Criar tarefa</h2>
      <h2 v-if="tarefaEditada !== null">Editar tarefa</h2>
      <div class="form" @keypress.enter="registrar">
        <div>
          <label for="nome">Nome da tarefa:</label> <input id="nome" type="text" v-model="nome"
            placeholder="Nome da tarefa">
          <label for="importância">Prioridade</label>
          <select v-model="importancia" id="importância" name="importância">
            <option disabled value="">importância</option>
            <option value="Baixa">não importante</option>
            <option value="Média">pouco importante</option>
            <option value="Alta">muito importante</option>
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
    </div>

    <div class="meio">
      <div class="lista-principal">
        <h2>
          lista de tarefas:
          <button @click="deleteAll_section = !deleteAll_section" class="limparPrincipal">Limpar</button>
        </h2>

        <!-- Itens da lista de tarefas que serão exibidos na tela fixa -->
        <ul v-if="tarefas.length != 0">
          <li v-for="(tarefa, index) in tarefas" :key="index">
            <button @click="abrirConfig(tarefa)" class="more"><font-awesome-icon :icon="faEllipsis"/></button>
            <div class="menu" v-if="menu == tarefa" ref="menuRef">
              <button @click="editarTarefa(tarefa)"><font-awesome-icon :icon="faPencil"/>Editar</button>
              <button @click="excluirTarefa(tarefa)" class="excluir"><font-awesome-icon :icon="faTrash"/>Excluir</button>
            </div>
            <!-- :style="{ border: tarefa.importancia == 'Baixa' ? '2px solid #015201' : tarefa.importancia == 'Média' ? '2px solid #6d6d00' : tarefa.importancia == 'Alta' ? '2px solid #430000' : '2px solid gray' }" -->
            <div class="principal">
              <h3>{{ tarefa.nome }}</h3>
              <div>
                <p class="importancia">importância: <span
                    :style="{ backgroundColor: tarefa.importancia == 'Baixa' ? '#015201' : tarefa.importancia == 'Média' ? '#6d6d00' : tarefa.importancia == 'Alta' ? '#430000' : '#434343', color: tarefa.importancia == 'Baixa' ? '#01bb01' : tarefa.importancia == 'Média' ? '#ffff2b' : tarefa.importancia == 'Alta' ? 'red' : '#919191' }">{{
                    tarefa.importancia }}</span>
                </p>
              </div>
            </div>
            <p class="desc" v-if="tarefa.desc.length != 0">{{ tarefa.desc }}</p>
            <p class="desc" v-else>Sem descrição</p>
            <div>
              <p v-if="tarefa.dataInicio.length !== 0"><strong>data inicial:</strong> {{
                dataBonitinha(tarefa.dataInicio)
                }}</p>
              <p v-if="tarefa.dataFinal.length !== 0"><strong>data final:</strong> {{ tarefa.dataFinal }}</p>
            </div>
            <div>
              <button class="pronto" @click="concluirTarefa(tarefa); tarefa.status = 'completa';"><font-awesome-icon :icon="faCheck"/>Concluir Tarefa</button>
            </div>
          </li>
        </ul>
        <p v-else class="vazio">Não há tarefas registradas no momento</p>
      </div>
    </div>

    <div class="direita">
      <h2>
        lista de tarefas concluídas:
        <button @click="tarefasConcluidas = [];"
          :style="{ visibility: tarefasConcluidas.length == 0 ? 'hidden' : 'visible' }">Limpar</button>
      </h2>
      <ul style="list-style: none;">
        <li v-for="(tarefa, index) in tarefasConcluidas" :key="index">
          <h4>{{ tarefa.nome }}</h4>
          <p v-if="tarefa.desc.length !== 0">{{ tarefa.desc }}</p>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
body,
html,
main {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  color: white;

  .esquerda,
  .meio,
  .direita {
    flex: 1;
  }

  .esquerda {
    box-shadow: 5px 0px 10px 10px rgba(12, 12, 12, 0.187);
    border-right: 0.5px solid rgb(41, 41, 41);
  }

  .meio {
    max-height: 100vh;
    overflow-y: hidden;
    padding-inline: 2vw;
    text-align: center;
    .lista-principal {
      .vazio {
        font-size: 1.5vw;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
      }
      .limparPrincipal {
        border: none;
        background-color: #3b0000;
        color: white;
        font-size: 1.5vw;
        padding: 0.5vw 0.8vw;
        border-radius: 20px;
      }
      .limparPrincipal:hover {
        background-color: #1f0000;
        cursor: pointer;
      }
      ul {
        padding-bottom: 15vw;
        margin-bottom: 15vw;
        max-height: 75vh;
        overflow-y: auto;
        scrollbar-width: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 3vw;

        div {
          margin-top: 1vw;
          display: flex;
          gap: 2vw;
          .pronto {
            background-color: rgb(0, 71, 13);
            border: none;
            color: white;
            font-size: 1.1vw;
            padding: 0.5vw 0.8vw;
            border-radius: 14px;
            display: flex;
            justify-content: center;
            transition: 0.1s ease all;
            align-items: center;
          }

          .pronto:hover {
            cursor: pointer;
            background-color: rgb(0, 41, 7);
          }
        }
      }

      li {
        border: 2px solid rgb(38, 38, 38);
        padding: 2vw 2vw;
        padding-top: 4vw;
        width: 90%;
        border-radius: 24px;
        position: relative;

        h3 {
          font-size: 2vw;
          word-wrap: break-word;
        }
        .more {
          position: absolute;
          border: none;
          font-size: 1.5vw;
          padding: 0.5vw;
          background-color: transparent;
          color: white;
          top: 1vw;
          right: 1.5vw;
          transition: 0.2s ease all;
          border-radius: 15px;
        }
        .more:hover {
          cursor: pointer;
          background-color: rgb(41, 41, 41);
        }
        .menu {
          background-color: rgb(36, 36, 36);
          padding: 0.6vw 0.5vw;
          display: flex;
          gap: 1vw;
          border-radius: 24px;
          flex-direction: column;
          width: 8vw;
          position: absolute;
          right: 1.5vw;
          top: 3.5vw;
          box-shadow: 0px 0px 15px 15px rgba(0, 0, 0, 0.215);
          button {
            padding: 0.8vw;
            border-radius: 18px;
            font-size: 1.1vw;
            color: white;
            background-color: transparent;
            border: none;
            transition: 0.1s ease all;
          }
          button:hover {
            cursor: pointer;
            background-color: rgb(87, 87, 87);
          }
        }

        .principal {
          display: flex;
          gap: 2vw;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1vw;
          margin-bottom: 1vw;
          border-bottom: 1px solid white;

          p {
            font-size: 1.1vw;

            span {
              border-radius: 12px;
              padding: 0.3vw 0.6vw;
            }
          }

          div {
            display: flex;
            align-items: center;

            div {
              border-radius: 50%;
              height: 1.5vw;
              width: 1.5vw;
            }
          }
        }

        .desc {
          text-align: left;
          padding: 0.8vw 0.5vw;
          width: 100%;
          color: rgb(154, 154, 154);
          font-size: 1.2vw;
        }
      }
    }
    h2 {
      font-size: 2vw;
      margin: 2vw;
    }
  }

  .direita {
    box-shadow: -5px 0px 10px 10px rgba(12, 12, 12, 0.187);
    border-left: 0.5px solid rgb(41, 41, 41);
  }
}

.form {
  border-radius: 24px;
  padding: 3vw 2vw;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.132);
  width: min-content;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  position: relative;

  input {
    background-color: rgb(37, 37, 37);
    color: white;
  }

  button {
    background-color: gray;
  }

  #desc {
    padding: 1vw 0.5vw;
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

.delete {
  width: 70vh;
  font-size: 1.3vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 30px 10px rgba(21, 21, 21, 0.717);
  padding: 2vw 2vw;
  border-radius: 24px;
  background-color: rgb(18, 18, 18);
  z-index: 10;
  h2 {
    font-size: 2vw;
  }
  div {
  h3 {
    padding-bottom: 1vw;
    margin-bottom: 1vw;
    font-size: 1.6vw;
    border-bottom: 1px solid white;
  }
  p {
    color: rgb(154, 154, 154);
  }
  margin-top: 2vw;
  width: 100%;
  justify-content: center;
  gap: 3vw;
    button {
    background-color: transparent;
    color: white;
    border: none;
    font-size: 1.3vw;
    padding: 0.5vw 1vw;
    border-radius: 12px;
    transition: all 0.1s ease;
  }
  .desconfirm {
    background-color: rgb(0, 107, 0);
  }
  .confirm {
    background-color: rgb(152, 0, 0);
  }
  .desconfirm:hover {
    cursor: pointer;
    background-color: rgb(0, 70, 0);
  }
  .confirm:hover {
    cursor: pointer;
    background-color: rgb(70, 0, 0);
  }
  }
}

.deleteAll {
  font-size: 1.3vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 30px 10px rgba(21, 21, 21, 0.717);
  padding: 2vw 1vw;
  border-radius: 24px;
  background-color: rgb(18, 18, 18);
  z-index: 10;

  div {
    margin-top: 2vw;
    width: 100%;
  display: flex;
  justify-content: center;
  gap: 3vw;
    button {
    background-color: transparent;
    color: white;
    border: none;
    font-size: 1.3vw;
    padding: 0.5vw 1vw;
    border-radius: 12px;
  }
  button:hover {
    background-color: rgb(43, 43, 43);
  }
  }
}
</style>
