# Conceitos:

- SFC (Single File Component)
> Em todos os arquivos .vue
- Composition API
> Nos <script setup lang="ts"></script>
- Importação de módulos
> Nas importações de ferramentas do vue como computed ou bibliotecas como useRouter
- Pinia (Gerenciamento de estado)
> Nas stores que guardam as variáveis fora dos componentes e além de guardar no local storage com uma extensão do pinia
- Reactividade
> Com o ref e os dados reativos nos componentes
- Dados computados
> Nas funções computadas para tornar dados reativos e atualizar eles nos templates quando forem alterados
- Diretivas
> Nos v-for, v-if, v-else
- Interpolação
> Com o double mustache usado em TODOS os arquivos.vue {{ }}
- v-Bind (:)
> Também usado em todos os arquivos.vue para juntar html ou css com javascript/typescript
- Eventos (@click)
> @click nos botões
- Métodos
> Funções como por exemplo: function medalClass(index: number) {}
- Router
> Nas rotas e no uso delas para criação de uma navbar escalável e para pegar dados via url para os detalhes sobre o café
- Tipagem com TypeScript
> Em quase todas as variáveis e constantes ou dados reativos foram tipados.
- Expressões JavaScript dentro do template
> Exemplo com uma expressão matemática: <p>{{ index + 1 }}</p>
- Renderização condicional de classes
> Se um valor for tal a classe vai ter tal valor, no caso é v-bind com expressão javascript, exempplo: :class="index % 2 === ? 'bg-[#FDFBF6]' : 'bg-white'" com ternário
- Props
> Para passar os dados para os componentes filhos
- Emits
> Para os componentes que são inputs devolverem valores para o pai
- Componentização
> Criaçao de componentes para tornar o código mais limpo e reutilizável para evitar ficar repetindo código
- tailwind
> Framework de CSS para otimizar estilização de páginas 
- ESlint 
> Usado para evitar certos erros
- Prettier 
> Somente para formatação de documentos

# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
