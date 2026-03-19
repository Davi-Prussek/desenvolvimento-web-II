<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { faTrash, faPencil, faCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons';


const menu = ref(true)
const menuRef = ref(null)
const add_section = ref(false);
const completa_section = ref(false);
const delete_section = ref(false);
const deleteAll_section = ref(false);
const delCom_section = ref(false);
class tarefa {
  constructor(nome, desc, dataInicio, dataFinal, status, importancia) {
    this.nome = LMP(nome.trim());
    this.desc = desc || 'Sem descrição';
    this.dataInicio = dataInicio;
    this.dataFinal = dataFinal;
    this.status = 'incompleta';
    this.importancia = importancia || 'padrão';
  }
}
const tarefas = ref([
  new tarefa('Teste 1',
    '"a tecnologia transformou profundamente a maneira como vivemos, trabalhamos e nos comunicamos. no centro dessa revolução, a inteligência artificial e a conectividade constante oferecem soluções rápidas para desafios complexos, otimizando o tempo e abrindo novas possibilidades de aprendizado."',
    '1111-11-11T11:11',
    '1212-12-12T12:12',
    'incompleta',
    'Baixa'
  ),
  new tarefa(
    'Teste 2',
    'testando 2',
    '',
    '',
    'incompleta',
    'Média'
  ),
  new tarefa(
    'Teste 3',
    'testando 3',
    '',
    '',
    'incompleta',
    'Alta'
  )
]);
const tarefasConcluidas = ref([]);

for (let i = 1; i < 11; i++) {
  tarefasConcluidas.value.push(new tarefa(`Teste ${i}`,
    `testando ${i}`,
    '',
    '',
    'incompleta',
    'Baixa'
  ))
}
const nome = ref("");
const desc = ref("");
const dataInicio = ref('');
const dataFinal = ref('');
const importancia = ref('');
const aviso = ref("");
const tempo = 1700;
const tarefaConcluida = ref(null);
const tarefaEditada = ref(null);

function abrirConfig(tarefa) {
  if (menu.value === tarefa) {
    menu.value = null
  } else {
    menu.value = tarefa
  }
}
function LMP(nome) {
  return nome.charAt(0).toUpperCase() + nome.toLowerCase().substring(1)
}
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
function registrar() {
  if (validarNome(nome.value) && validarDesc(desc.value) && validarDatas(dataInicio.value, dataFinal.value)) {
    if (tarefaEditada.value) {
      tarefas.value.splice(tarefas.value.indexOf(tarefaEditada.value), 1);
      tarefaEditada.value = null;
    }
    tarefas.value.unshift(new tarefa(LMP(nome.value), LMP(desc.value), dataInicio.value, dataFinal.value, 'incompleta', importancia.value));
    [nome.value, desc.value, dataInicio.value, dataFinal.value, importancia.value] = ['', '', '', '', ''];
    add_section.value = !add_section.value;
  }
}
function concluirTarefa(tarefa) {
  tarefasConcluidas.value.unshift(tarefa);
  completa_section.value = !completa_section.value;
  tarefaConcluida.value = tarefa;
  tarefas.value.splice(tarefas.value.indexOf(tarefa), 1);
  setTimeout(() => {
    completa_section.value = !completa_section.value;
  }, 1500);
}
function excluirTarefa(tarefa) {
  tarefaConcluida.value = tarefa;
  delete_section.value = !delete_section.value;
}
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
    importancia: tarefaConcluida.value.importancia
  }
}
function converterDataBR(data) {
  if (!data) return '';

  const [dia, mes, anoHora] = data.split('/');
  const [ano, hora] = anoHora.split(' ');

  return `${ano}-${mes}-${dia}T${hora}`;
}
function dataBonitinha(data) {
  if (!data) return 'Sem data';

  // se vier no formato BR
  if (data.includes('/')) {
    data = converterDataBR(data);
  }

  const d = new Date(data);

  if (isNaN(d)) return 'Data inválida';

  return d.toLocaleString('pt-BR', {
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
    delete_section.value = false;
  }
}
function handleClickOutsideDeleteAll(event) {
  const clicouNoBotao = event.target.closest('.limparPrincipal')
  const clicouNoDeleteAll = event.target.closest('.deleteAll')

  if (!clicouNoBotao && !clicouNoDeleteAll) {
    deleteAll_section.value = false;
  }
}
function handleClickOutsideDeleteAllComplete(event) {
  const clicouNoBotao = event.target.closest('.limparConcluidas')
  const clicouNoDeleteAll = event.target.closest('.deleteAllComplete')

  if (!clicouNoBotao && !clicouNoDeleteAll) {
    delCom_section.value = false;
  }
}
function escBonitinho(event) {
  if (event.key === 'Escape' && tarefaEditada.value != null) {
    tarefaEditada.value = null;
  nome.value = '';
  desc.value = '';
  dataInicio.value = '';
  dataFinal.value = '';
  importancia.value = '';
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('click', handleClickOutsideDelete)
  document.addEventListener('click', handleClickOutsideDeleteAll)
  document.addEventListener('click', handleClickOutsideDeleteAllComplete)
  document.addEventListener('keydown', escBonitinho)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('click', handleClickOutsideDelete)
  document.removeEventListener('click', handleClickOutsideDeleteAll)
  document.removeEventListener('click', handleClickOutsideDeleteAllComplete)
  document.addEventListener('keydown', escBonitinho)
})
</script>
<template>
  <main style="display: flex; justify-content: space-around;">

    <div class="deleteAllComplete" v-if="delCom_section">
      <p>Deseja mesmo limpar todas as tarefas concluídas?</p>
      <div>
        <button @click="tarefasConcluidas = []; delCom_section = !delCom_section" class="simComplete">Sim</button>
        <button @click="delCom_section = !delCom_section" class="naoComplete">Não</button>
      </div>
    </div>

    <div class="deleteAll" v-if="deleteAll_section">
      <p>Deseja mesmo limpar todas as tarefas registradas?</p>
      <div>
        <button @click="tarefas = []; deleteAll_section = !deleteAll_section" class="sim">Sim</button>
        <button @click="deleteAll_section = !deleteAll_section" class="nao">Não</button>
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
      <p> {{ pegarValoresTarefa().desc }}</p>
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
          <button @click="deleteAll_section = !deleteAll_section" v-if="tarefas.length != 0"
            class="limparPrincipal">Limpar</button>
        </h2>

        <!-- Itens da lista de tarefas que serão exibidos na tela fixa -->
        <ul v-if="tarefas.length != 0 && !tarefaEditada">
          <li v-for="(tarefa, index) in tarefas" :key="index">
            <button @click="abrirConfig(tarefa)" class="more"><font-awesome-icon :icon="faEllipsis" /></button>
            <div class="menu" v-if="menu == tarefa" ref="menuRef">
              <button @click="menu = null; editarTarefa(tarefa)"><font-awesome-icon :icon="faPencil" />Editar</button>
              <button @click="menu = null; excluirTarefa(tarefa)" class="excluir"><font-awesome-icon
                  :icon="faTrash" />Excluir</button>
            </div>
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
            <div class="datas">
              <p v-if="tarefa.dataInicio.length !== 0" class="dataInicio"><strong></strong> {{
                dataBonitinha(tarefa.dataInicio)
              }}</p>
              <p v-else  class="dataInicio">Sem data inicial</p>
              <p v-if="tarefa.dataFinal.length !== 0" class="dataFinal"><strong></strong> {{ dataBonitinha(tarefadataFinal) }}</p>
              <p v-else class="dataFinal">Sem data final</p>
            </div>
            <div>
              <button class="pronto" @click="concluirTarefa(tarefa); tarefa.status = 'completa';"><font-awesome-icon
                  :icon="faCheck" />Concluir Tarefa</button>
            </div>
          </li>
        </ul>
        <p v-else-if="tarefas.length == 0 && !tarefaEditada" class="vazio">Não há tarefas registradas no momento</p>
        <p v-else class="vazio">Saia do modo de edição caso deseje voltar a ver suas tarefas</p>
      </div>
    </div>

    <div class="direita">
      <h2 class="listaPrincipalAll">
        lista de tarefas concluídas:
        <button @click="delCom_section = !delCom_section" class="limparConcluidas"
          :style="{ visibility: tarefasConcluidas.length == 0 ? 'hidden' : 'visible' }">Limpar</button>
      </h2>
      <ul v-if="tarefasConcluidas.length != 0 && tarefaEditada == null" style="list-style: none;">
        <li v-for="(tarefa, index) in tarefasConcluidas" :key="index">
          <div class="principalConcluida">
            <h4>{{ tarefa.nome }}</h4>
          <p>importncia: <span :style="{ backgroundColor: tarefa.importancia == 'Baixa' ? '#015201' : tarefa.importancia == 'Média' ? '#6d6d00' : tarefa.importancia == 'Alta' ? '#430000' : '#434343', color: tarefa.importancia == 'Baixa' ? '#01bb01' : tarefa.importancia == 'Média' ? '#ffff2b' : tarefa.importancia == 'Alta' ? 'red' : '#919191' }">{{ tarefa.importancia }}</span></p>
          </div>
          <p v-if="tarefa.desc.length !== 0">{{ tarefa.desc }}</p>
          <p v-else>Essa tarefa não tem descrição</p>
          <div class="datas">
              <p v-if="tarefa.dataInicio.length !== 0" class="dataInicio">Data final:<br> {{
                dataBonitinha(tarefa.dataInicio)
              }}</p>
              <p v-else  class="dataInicio">Sem data inicial</p>
              <p v-if="tarefa.dataFinal.length !== 0" class="dataFinal">Data final:<br> {{ dataBonitinha(tarefa.dataFinal) }}</p>
              <p v-else class="dataFinal">Sem data final</p>
            </div>
        </li>
      </ul>
      <p v-else-if="tarefasConcluidas.length == 0 && tarefaEditada == null" class="vazio">Não há tarefas concluídas registradas no momento</p>
      <p v-else class="vazio">Saia do modo de edição caso deseje voltar a ver suas tarefas concluídas</p>
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
        padding-top: 20vw;
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
      .datas {
          display: flex;
          justify-content: space-between;
          border-top: 0.5px solid white;
          padding-top: 1vw;
          margin-top: 1vw;
          margin-bottom: 2vw;
          font-size: 1.3vw;
          .dataInicio {
            text-align: center;
            background-color: rgb(85, 85, 85);
            color: white;
            padding: 0.7vw;
            border-radius: 24px;
          }
          .dataFinal {
            text-align: center;
            background-color: rgb(85, 85, 85);
            color: white;
            padding: 0.7vw;
            border-radius: 24px;
          }
        }
      }
    }

    h2 {
      font-size: 2vw;
      margin: 2vw;
    }
  }

  .direita {
    position: relative;
    max-height: 100vh;
    overflow-y: hidden;
    padding-inline: 2vw;
    box-shadow: -5px 0px 10px 10px rgba(12, 12, 12, 0.187);
    border-left: 0.5px solid rgb(41, 41, 41);

    ul {
      padding-bottom: 10vw;
      margin-bottom: 5vw;
      max-height: 80vh;
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

    .vazio {
      font-size: 1.5vw;
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }

    h2.listaPrincipalAll {
      font-size: 2vw;
      text-align: center;
      padding: 2vw 0 2vw 0;

      button {
        border: none;
        background-color: #3b0000;
        color: white;
        font-size: 1.5vw;
        padding: 0.5vw 0.8vw;
        border-radius: 20px;
      }

      button:hover {
        background-color: #1f0000;
        cursor: pointer;
      }
    }

    li {
      border: 2px solid rgb(38, 38, 38);
      padding: 2vw 2vw;
      width: 85%;
      border-radius: 24px;
      position: relative;

      .principalConcluida {
        width: 100%;
        border-bottom: 1px solid white;
        padding-bottom: 1vw;
        margin-bottom: 1vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
      h4 {
        font-size: 2vw;
        word-wrap: break-word;

      }
      p {
        width: fit-content;
        span {
              border-radius: 12px;
              padding: 0.3vw 0.6vw;
            }
      }
    }

      p {
        text-align: left;
        padding: 0 0.5vw;
        width: 100%;
        color: rgb(154, 154, 154);
        font-size: 1.2vw;
      }
      .datas {
          display: flex;
          justify-content: space-between;
          border-top: 0.5px solid white;
          padding-top: 1vw;
          margin-top: 1vw;
          margin-bottom: 2vw;
          font-size: 1.3vw;
          .dataInicio {
            text-align: center;
            background-color: rgb(85, 85, 85);
            color: white;
            padding: 0.7vw;
            border-radius: 24px;
          }
          .dataFinal {
            text-align: center;
            background-color: rgb(85, 85, 85);
            color: white;
            padding: 0.7vw;
            border-radius: 24px;
          }
        }
    }
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
    padding-bottom: 1vw;
    margin-bottom: 1vw;
    font-size: 1.6vw;
    border-bottom: 1px solid white;
  }

  p {
    color: rgb(154, 154, 154);
    line-height: 1.7vw;
    padding-left: 0.5vw;
  }
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
    margin-top: 2vw;
    width: 100%;
    justify-content: center;
    gap: 3vw;

    h3 {
      padding-bottom: 1vw;
      margin-bottom: 1vw;
      font-size: 1.6vw;
      border-bottom: 1px solid white;
    }

    p {
      color: rgb(154, 154, 154);
      padding-left: 0.5vw;
    }

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
  text-align: center;
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

    .nao {
      background-color: rgb(0, 107, 0);
    }

    .sim {
      background-color: rgb(152, 0, 0);
    }

    .nao:hover {
      cursor: pointer;
      background-color: rgb(0, 70, 0);
    }

    .sim:hover {
      cursor: pointer;
      background-color: rgb(70, 0, 0);
    }
  }
}

.deleteAllComplete {
  text-align: center;
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

    .naoComplete {
      background-color: rgb(0, 107, 0);
    }

    .simComplete {
      background-color: rgb(152, 0, 0);
    }

    .naoComplete:hover {
      cursor: pointer;
      background-color: rgb(0, 70, 0);
    }

    .simComplete:hover {
      cursor: pointer;
      background-color: rgb(70, 0, 0);
    }
  }
}
</style>
